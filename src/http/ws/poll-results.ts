import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { realtimePollPublisher } from '../../utils/realtime-poll-publisher';

export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, async (connection, req) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = getPollParams.parse(req.params);

    realtimePollPublisher.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message));
    });
  });
}
