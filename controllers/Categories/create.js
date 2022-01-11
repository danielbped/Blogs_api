const statusCode = require('http-status-codes').StatusCodes;
const { Categorie } = require('../../models');

const isCategorieValid = require('../../middlewares/Categories/isValid');
const errorMessages = require('../../utils/ErrorMessages');

const createCategorie = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!isCategorieValid(name)) {
      return res.status(statusCode.BAD_REQUEST)
        .json({ message: errorMessages.emptyCategorieName });
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