import fastify from 'fastify';
import cookie from '@fastify/cookie';
import websocket from '@fastify/websocket';
import { Routes as routes } from './routes';

const app = fastify();

app.register(cookie, {
  secret: 'polls_app',
  hook: 'onRequest',
});

app.register(websocket);

app.register(routes);

app.listen({ port: 3333 }).then(() => {
  console.log('🔥 Server running at http://localhost:3333');
});
