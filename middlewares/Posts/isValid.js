const statusCode = require('http-status-codes').StatusCodes;
const errorMessages = require('../../utils/ErrorMessages');
const { Categorie } = require('../../models');

const isTitleValid = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyPostTitle });
  }

  next();
};

const isContentValid = (req, res, next) => {
  const { content } = req.body;

  if (!content) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyPostContent });
  } 

  next();
};

const categoriesExist = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categories = await Categorie.findAll();

  if (categoryIds.length > 1) {
    const categoryExists = await categories.every(
      (category) => categoryIds.some((categoryId) => category.id === categoryId),
    );
    if (!categoryExists) {
      return res.status(statusCode.BAD_REQUEST)
        .json({ message: errorMessages.categoryNotFound });
    }
  }

  const categoryExists = categories.find((category) => category.id === categoryIds[0]);

  if (!categoryExists) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.categoryNotFound });
  }

  next();
};

const isCategoryIdValid = (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyPostCategoryId });
  }

  next();
};

const cannotUpdateCategories = (req, res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.cannotUpdateCategories });
  }

  next();
};

module.exports = {
  isTitleValid,
  isContentValid,
  isCategoryIdValid,
  categoriesExist,
  cannotUpdateCategories,
};