import fastify from 'fastify';

const app = fastify();

app.get('/', () => {
  return 'Polls'
});

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log('🔥 Server running at http://localhost:3333');
  });
