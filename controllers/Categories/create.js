const statusCode = require('http-status-codes').StatusCodes;
const { Categorie } = require('../../models');

const isCategorieValid = require('../../middlewares/Categories/isValid');

const createCategorie = async (req, res, next) => {
  try {
    const { name } = req.body;

    const { id } = await Categorie.create({ name });

    res.status(statusCode.CREATED).json({ id, name });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/',
    isCategorieValid,
    createCategorie);
};