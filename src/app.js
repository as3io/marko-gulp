const express = require('express');
const marko = require('marko/express');
const path = require('path');

const app = express();
app.use(marko());

// Serve built files
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

// Serve public files
app.use(express.static(path.resolve(__dirname, './public')));

module.exports = app;
