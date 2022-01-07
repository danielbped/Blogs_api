const statusCode = require('http-status-codes').StatusCodes;
const { Categorie } = require('../../models');

const isCategorieValid = require('../../middlewares/Categories/isValid');
const isTokenValid = require('../../middlewares/Users/isTokenValid');
const errorMessages = require('../../utils/ErrorMessages');

const createCategorie = async (req, res, next) => {
  try {
    const { name } = req.body;
    const token = req.headers.authorization;

    if (!isTokenValid(token)) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.tokenNotFound });
    }

    if (typeof isTokenValid(token) === 'string') {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.invalidToken });
    }

    if (!isCategorieValid(name)) {
      return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.emptyCategorieName });
    }

    const { id } = await Categorie.create({ name });

    res.status(statusCode.CREATED).json({ id, name });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/', createCategorie);
};