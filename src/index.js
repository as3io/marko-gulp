require('marko/node-require');
const log = require('fancy-log');
const {
  green,
  yellow,
  cyan,
} = require('chalk');
const pkg = require('../package.json');
const app = require('./app');

const port = process.env.PORT || 4999;

log(`Starting '${cyan(`${pkg.name} v${pkg.version}`)}'...`);
app.listen(port, () => {
  log(`Server ${green('ready')} on ${yellow(`http://0.0.0.0:${port}`)}`);
  if (process.send) process.send('ready');
});
