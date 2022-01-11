const statusCode = require('http-status-codes').StatusCodes;
const { User } = require('../../models');

const isTokenValid = require('../../middlewares/Users/isTokenValid');
const errorMessages = require('../../utils/ErrorMessages');

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne(
      { where: { id },
        attributes: { exclude: ['password'] },
      },
    );

    if (!user) {
      return res.status(statusCode.NOT_FOUND)
        .json({ message: errorMessages.userNotFound });
    }

    res.status(statusCode.OK).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/:id', isTokenValid, getUserById);
};