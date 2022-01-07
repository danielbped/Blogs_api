const statusCode = require('http-status-codes').StatusCodes;
const { User } = require('../../models');

const tokenGenerator = require('../../middlewares/Users/tokenGenerator');
const isUserValid = require('../../middlewares/Users/isValid');
const errorMessages = require('../../utils/ErrorMessages');

const createUser = async (req, res, next) => {
  try {
    const user = req.body;

    if (typeof (isUserValid(user)) === 'string') {
      return res.status(statusCode.BAD_REQUEST).json({ message: isUserValid(user) });
    }

    const { email } = user;

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(statusCode.CONFLICT).json({ message: errorMessages.userAlreadyExists });
    }

    await User.create(user);

    const token = await tokenGenerator(user);

    res.status(statusCode.CREATED).json(token);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/', createUser);
};