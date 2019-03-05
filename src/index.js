require('marko/node-require');
const app = require('./app');

const { log } = console;
const port = process.env.PORT || 4999;

app.get('/', (req, res) => {
  res.json({ ping: 'pong' });
});

app.listen(port, () => {
  log(`Listening on http://0.0.0.0:${port}`);
  if (process.send) process.send('running');
});
