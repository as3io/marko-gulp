require('marko/node-require');
const pkg = require('../package.json');
const app = require('./app');

const { log } = console;
const port = process.env.PORT || 4999;

app.get('/', (req, res) => {
  res.json({ ping: 'pong' });
});

log(`> Starting ${pkg.name} v${pkg.version}...`);
app.listen(port, () => {
  log(`> Server ready on http://0.0.0.0:${port}`);
  if (process.send) process.send('ready');
});
