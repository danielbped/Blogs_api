const express = require('express');

const users = require('./Users/router');
// const categories = require('./Categories/router');

const root = express.Router({ mergeParams: true });

users(root);
// categories(root);

module.exports = (app) => {
  app.use('/', root);
};