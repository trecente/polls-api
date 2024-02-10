import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma';
import { redis } from '../../lib/redis';

export async function deletePoll(app: FastifyInstance) {
  app.delete('/polls/:pollId', async (req, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = getPollParams.parse(req.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
    });

    if (!poll) {
      return reply.status(400).send({ message: 'Poll not found.' });
    }

    await prisma.poll.delete({
      where: {
        id: pollId,
      },
    });

    await redis.del(pollId);

    return reply.send({ message: 'Poll deleted successfully!' });
  });
}
