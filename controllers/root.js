const express = require('express');

const users = require('./Users/router');
const login = require('./login');
const categories = require('./Categories/router');
const posts = require('./Posts/router');

const root = express.Router({ mergeParams: true });

users(root);
login(root);
categories(root);
posts(root);

module.exports = (app) => {
  app.use('/', root);
};