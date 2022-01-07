const express = require('express');
const categoriesControllers = require('./index');

const router = express.Router({ mergeParams: true });

categoriesControllers.createCategorie(router);

module.exports = (root) => {
  root.use('/categories', router);
};