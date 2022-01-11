const statusCode = require('http-status-codes').StatusCodes;
const { BlogPost } = require('../../models');

const isPostValid = require('../../middlewares/Posts/isValid');
const findUserId = require('../../middlewares/Users/findUserId');

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const userId = await findUserId(req.headers.authorization);

    const post = { ...req.body, userId, published: new Date(), updated: new Date() };
    
    if (typeof await isPostValid(post) === 'string') {
      return res.status(statusCode.BAD_REQUEST)
        .json({ message: await isPostValid(post) });
    }
    
    const { id } = await BlogPost.create(post);
    
    res.status(statusCode.CREATED).json({ id, userId, title, content });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/', createPost);
};