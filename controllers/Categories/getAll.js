const statusCode = require('http-status-codes').StatusCodes;
const { Categorie } = require('../../models');

const isTokenValid = require('../../middlewares/Users/isTokenValid');
const errorMessages = require('../../utils/ErrorMessages');

const getAllCategories = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!isTokenValid(token)) {
      return res.status(statusCode.UNAUTHORIZED)
        .json({ message: errorMessages.tokenNotFound });
    }

    if (typeof isTokenValid(token) === 'string') {
      return res.status(statusCode.UNAUTHORIZED)
        .json({ message: errorMessages.invalidToken });
    }

    const categories = await Categorie.findAll();

    res.status(statusCode.OK).json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/', getAllCategories);
};