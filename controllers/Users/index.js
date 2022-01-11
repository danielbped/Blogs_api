const createUser = require('./create');
const getAllUsers = require('./getAll');
const getUserById = require('./getById');
const deleteUser = require('./delete');

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};