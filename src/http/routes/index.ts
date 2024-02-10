import { FastifyInstance } from 'fastify';
import { getPoll } from './get-poll';
import { pollResults } from '../ws/poll-results';
import { createPoll } from './create-poll';
import { voteOnPoll } from './vote-on-poll';
import { deletePoll } from './delete-poll';

export async function Routes(app: FastifyInstance) {
  app.register(getPoll);
  app.register(pollResults);
  app.register(createPoll);
  app.register(voteOnPoll);
  app.register(deletePoll);
}
