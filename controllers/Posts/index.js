const createPost = require('./create');
const getAllPosts = require('./getAll');
const getPostById = require('./getById');
const updatePost = require('./update');
const deletePost = require('./delete');
const findByText = require('./findByText');

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  findByText,
};