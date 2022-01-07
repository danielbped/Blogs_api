const express = require('express');
const categoriesControllers = require('./index');

const router = express.Router({ mergeParams: true });

categoriesControllers.createCategorie(router);
categoriesControllers.getAllCategories(router);

module.exports = (root) => {
  root.use('/categories', router);
};