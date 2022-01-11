const statusCode = require('http-status-codes').StatusCodes;
const { BlogPost } = require('../../models');

const isPostValid = require('../../middlewares/Posts/isValid');

const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = { title, content };
    const { id } = req.params;

    if (typeof await isPostValid(req.body) === 'string') {
      return res.status(statusCode.BAD_REQUEST)
        .json({ message: await isPostValid(post) });
    }

    await BlogPost.update(
      { title, content },
      { where: { id } },
    );
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.put('/', updatePost);
};