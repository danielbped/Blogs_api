const statusCode = require('http-status-codes').StatusCodes;
const { BlogPost } = require('../../models');

const isUserAuthorized = require('../../middlewares/Users/isUserAuthorized');

const errorMessages = require('../../utils/ErrorMessages');

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findOne({
      where: { id },
    });

    if (!post) {
      return res.status(statusCode.NOT_FOUND)
        .json({ message: errorMessages.postNotFound });
    }

    await BlogPost.destroy({
      where: { id },
    });

    res.status(statusCode.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.delete('/:id',
    isUserAuthorized,
    deletePost);
};