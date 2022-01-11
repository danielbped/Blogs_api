const statusCode = require('http-status-codes').StatusCodes;
const { Categorie } = require('../../models');

const getAllCategories = async (_req, res, next) => {
  try {
    const categories = await Categorie.findAll();

    res.status(statusCode.OK).json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/', getAllCategories);
};