const statusCode = require('http-status-codes').StatusCodes;
const { BlogPost } = require('../../models');
const { User } = require('../../models');
const { Categorie } = require('../../models');

const isTokenValid = require('../../middlewares/Users/isTokenValid');
const errorMessages = require('../../utils/ErrorMessages');

const getPostById = async (req, res, next) => {
  try {
    if (!isTokenValid(req.headers.authorization)) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.tokenNotFound });
    }

    if (typeof isTokenValid(req.headers.authorization) === 'string') {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.invalidToken });
    }

    const post = await BlogPost.findOne({
      where: { id: req.params.id },
      include: [{ model: User, as: 'user' }, { model: Categorie, as: 'categories' }],
    });

    if (!post) {
      return res.status(statusCode.NOT_FOUND).json({ message: errorMessages.postNotFound });
    }

    res.status(statusCode.OK).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/:id', getPostById);
};