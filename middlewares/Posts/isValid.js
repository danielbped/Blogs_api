const errorMessages = require('../../utils/ErrorMessages');
const { Categorie } = require('../../models');

const isTitleValid = (title) => {
  if (!title) return { message: errorMessages.emptyPostTitle };

  return true;
};

const isContentValid = (content) => {
  if (!content) return { message: errorMessages.emptyPostContent };

  return true;
};

const isCategoryIdValid = (categoryIds) => {
  if (!categoryIds) return { message: errorMessages.emptyPostCategoryId };

  return true;
};

const categoriesExist = async (categoryIds) => {
  const categories = await Categorie.findAll();

  if (categoryIds.length > 1) {
    const categoryExists = await categories.every(
      (category) => categoryIds.some((categoryId) => category.id === categoryId),
    );
    if (!categoryExists) return errorMessages.categoryNotFound;
  }

  const categoryExists = categories.find((category) => category.id === categoryIds[0]);

  if (!categoryExists) return errorMessages.categoryNotFound;

  return true;
};

module.exports = async ({ title, content, categoryIds }) => {
  if (isTitleValid(title).message) return isTitleValid(title).message;
  if (isContentValid(content).message) return isContentValid(content).message;
  if (isCategoryIdValid(categoryIds).message) return isCategoryIdValid(categoryIds).message;
  if (typeof categoriesExist(categoryIds) === 'object') return categoriesExist(categoryIds);

  return true;
};