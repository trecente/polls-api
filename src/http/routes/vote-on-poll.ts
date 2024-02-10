import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';
import { redis } from '../../lib/redis';
import { randomUUID } from 'node:crypto';

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (req, reply) => {
    const voteOnPollBody = z.object({
      pollOptionsId: z.string().uuid(),
    });

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = voteOnPollParams.parse(req.params);
    const { pollOptionsId } = voteOnPollBody.parse(req.body);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
    });

    if (!poll) {
      return reply.status(400).send({ message: 'Poll not found.' });
    }

    let { sessionId } = req.cookies;

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          },
        },
      });

      if (userPreviousVoteOnPoll) {
        if (userPreviousVoteOnPoll.pollOptionsId !== pollOptionsId) {
          await prisma.vote.delete({
            where: {
              id: userPreviousVoteOnPoll.id,
            },
          });

          await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionsId);
        } else {
          return reply.status(400).send({ message: 'You already voted on this poll.' });
        }
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      });
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionsId,
      },
    });

    await redis.zincrby(pollId, 1, pollOptionsId);

    return reply.status(201).send({ message: 'Voted successfully!' });
  });
}
