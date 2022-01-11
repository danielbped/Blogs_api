const statusCode = require('http-status-codes').StatusCodes;
const { BlogPost } = require('../../models');
const { User } = require('../../models');
const { Categorie } = require('../../models');

const errorMessages = require('../../utils/ErrorMessages');

const getPostById = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, as: 'user' },
        { model: Categorie, as: 'categories' },
      ],
    });

    if (!post) {
      return res.status(statusCode.NOT_FOUND)
        .json({ message: errorMessages.postNotFound });
    }

    res.status(statusCode.OK).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/:id', getPostById);
};