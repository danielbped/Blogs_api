const statusCode = require('http-status-codes').StatusCodes;
const { User } = require('../../models');

const isTokenValid = require('../../middlewares/Users/isTokenValid');
const errorMessages = require('../../utils/ErrorMessages');

const getUserById = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;

    if (!isTokenValid(token)) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.tokenNotFound });
    }

    if (typeof isTokenValid(token) === 'string') {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.invalidToken });
    }

    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

    if (!user) {
      return res.status(statusCode.NOT_FOUND).json({ message: errorMessages.userNotFound });
    }

    res.status(statusCode.OK).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/:id', getUserById);
};