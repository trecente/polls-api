import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';
import { getVotes } from '../../utils/voteUtils';

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (req, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = getPollParams.parse(req.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!poll) {
      return reply.status(400).send({ message: 'Poll not found.' });
    }

    const votes = await getVotes(pollId);

    return reply.send({
      poll: {
        id: poll.id,
        title: poll.title,
        createdAt: poll.createdAt,
        options: poll.options.map(({ id, title }) => ({
          id,
          title,
          score: votes[id] || 0,
        })),
      },
    });
  });
}
