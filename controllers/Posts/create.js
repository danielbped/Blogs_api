const statusCode = require('http-status-codes').StatusCodes;
const { Posts } = require('../../models');

const isTokenValid = require('../../middlewares/Users/isTokenValid');
const isPostValid = require('../../middlewares/Posts/isValid');
const errorMessages = require('../../utils/ErrorMessages');

const createPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const token = req.headers.authorization;

    const post = { title, content, categoryIds };

    if (typeof (isPostValid(post)) === 'string') {
      return res.status(statusCode.BAD_REQUEST).json({ message: isPostValid(post) });
    }

    if (!isTokenValid(token)) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.tokenNotFound });
    }

    if (typeof isTokenValid(token) === 'string') {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.invalidToken });
    }

    const { id } = await Posts.create(post);

    res.status(statusCode.CREATED).json({ id, title, content });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/', createPost);
};