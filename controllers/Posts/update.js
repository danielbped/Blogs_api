const statusCode = require('http-status-codes').StatusCodes;

const { BlogPost } = require('../../models');
const { Categorie } = require('../../models');

const { 
  isTitleValid,
  isContentValid,
  cannotUpdateCategories,
 } = require('../../middlewares/Posts/isValid');

const isUserAuthorized = require('../../middlewares/Users/isUserAuthorized');

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    await BlogPost.update(
      { title, content },
      { where: { id } },
    );

    const updatedPost = await BlogPost.findOne({
      where: { id },
      attributes: { exclude: ['id', 'updated', 'published'] },
      include: { model: Categorie, as: 'categories' },
    });

    res.status(statusCode.OK).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.put('/:id',
    isUserAuthorized,
    isTitleValid,
    isContentValid,
    cannotUpdateCategories,
    updatePost);
};