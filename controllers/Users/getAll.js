const statusCode = require('http-status-codes').StatusCodes;
const { User } = require('../../models');

const isTokenValid = require('../../middlewares/Users/isTokenValid');
const errorMessages = require('../../utils/ErrorMessages');

const getAllUsers = async (req, res, next) => {
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

    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    res.status(statusCode.OK).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/', getAllUsers);
};