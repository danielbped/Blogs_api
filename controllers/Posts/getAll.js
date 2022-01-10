const statusCode = require('http-status-codes').StatusCodes;
const { BlogPost } = require('../../models');
const { User } = require('../../models');
const { Categorie } = require('../../models');

const isTokenValid = require('../../middlewares/Users/isTokenValid');
const errorMessages = require('../../utils/ErrorMessages');

const getAllPosts = async (req, res, next) => {
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

    const posts = await BlogPost.findAll({
      include: [{ model: User, as: 'user' }, { model: Categorie, as: 'categories' }],
    });

    res.status(statusCode.OK).json(posts);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/', getAllPosts);
};