import { FastifyInstance } from 'fastify';
import { getPoll } from './get-poll';
import { createPoll } from './create-poll';
import { voteOnPoll } from './vote-on-poll';

export async function Routes(app: FastifyInstance) {
  app.register(getPoll);
  app.register(createPoll);
  app.register(voteOnPoll);
}