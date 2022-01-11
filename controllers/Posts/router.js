const express = require('express');
const postControllers = require('./index');

const isTokenValid = require('../../middlewares/Users/isTokenValid');

const router = express.Router({ mergeParams: true });

postControllers.createPost(router);
postControllers.getAllPosts(router);
postControllers.findByText(router);
postControllers.getPostById(router);
postControllers.updatePost(router);
postControllers.deletePost(router);

module.exports = (root) => {
  root.use('/post', isTokenValid, router);
};