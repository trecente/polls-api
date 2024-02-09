import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { FastifyInstance } from 'fastify';
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

      if(userPreviousVoteOnPoll) {
        if(userPreviousVoteOnPoll.pollOptionsId !== pollOptionsId) {
          // Delete previous vote
          await prisma.vote.delete({
            where: {
              id: userPreviousVoteOnPoll.id,
            },
          });
        } else {
          // User already voted on this poll
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

    return reply.status(201).send({ message: 'Voted successfully!' });
  });
}
