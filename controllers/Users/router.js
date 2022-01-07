const express = require('express');
const userControllers = require('./index');

const router = express.Router({ mergeParams: true });

userControllers.createUser(router);
userControllers.getAllUsers(router);

module.exports = (root) => {
  root.use('/user', router);
};