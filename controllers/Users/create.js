const statusCode = require('http-status-codes').StatusCodes;
const { User } = require('../../models');

const tokenGenerator = require('../../middlewares/Users/tokenGenerator');
const isUserValid = require('../../middlewares/Users/isValid');
const errorMessages = require('../../utils/ErrorMessages');
const userExists = require('../../middlewares/Users/userExists');

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = { displayName, email, password, image };

    if (typeof (isUserValid(user)) === 'string') {
      return res.status(statusCode.BAD_REQUEST)
        .json({ message: isUserValid(user) });
    }

    if (await userExists(email)) {
      return res.status(statusCode.CONFLICT)
        .json({ message: errorMessages.userAlreadyExists });
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