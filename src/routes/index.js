const home = require('../templates/home');
const section = require('../templates/section');
const content = require('../templates/content');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.marko(home);
  });

  app.get('/section', (req, res) => {
    res.marko(section);
  });

  app.get('/content', (req, res) => {
    res.marko(content);
  });
};
