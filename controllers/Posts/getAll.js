const statusCode = require('http-status-codes').StatusCodes;
const { BlogPost } = require('../../models');
const { User } = require('../../models');
const { Categorie } = require('../../models');

const getAllPosts = async (_req, res, next) => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Categorie, as: 'categories' },
      ],
    });

    res.status(statusCode.OK).json(posts);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/', getAllPosts);
};