const express = require('express');
const categoriesControllers = require('./index');

const isTokenValid = require('../../middlewares/Users/isTokenValid');

const router = express.Router({ mergeParams: true });

categoriesControllers.createCategorie(router);
categoriesControllers.getAllCategories(router);

module.exports = (root) => {
  root.use('/categories', isTokenValid, router);
};