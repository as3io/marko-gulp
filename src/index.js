require('marko/node-require');
const app = require('./app');

const port = process.env.PORT || 4999;
app.listen(port, () => {
  if (process.send) process.send({ event: 'ready', location: `http://0.0.0.0:${port}` });
});
