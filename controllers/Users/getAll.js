const statusCode = require('http-status-codes').StatusCodes;
const { User } = require('../../models');

const isTokenValid = require('../../middlewares/Users/isTokenValid');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    res.status(statusCode.OK).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/', isTokenValid, getAllUsers);
};