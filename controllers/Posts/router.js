const express = require('express');
const postControllers = require('./index');

const router = express.Router({ mergeParams: true });

postControllers.createPost(router);

module.exports = (root) => {
  root.use('/post', router);
};