const errorMessages = require('../../utils/ErrorMessages');

const isTitleValid = (title) => {
  if (!title) return { message: errorMessages.emptyPostTitle };

  return true;
};

const isContentValid = (content) => {
  if (!content) return { message: errorMessages.emptyPostContent };

  return true;
};

const isCategoryIdsValid = (categoryIds) => {
  if (!categoryIds) return { message: errorMessages.emptyPostCategoryId };

  return true;
};

module.exports = ({ title, content, categoryIds }) => {
  if (isTitleValid(title).message) return isTitleValid(title).message;
  if (isContentValid(content).message) return isContentValid(content).message;
  if (isCategoryIdsValid(categoryIds).message) return isCategoryIdsValid(categoryIds).message;

  return true;
};