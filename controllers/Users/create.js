const statusCode = require('http-status-codes').StatusCodes;
const bcrypt = require('bcrypt');

const { User } = require('../../models');

const tokenGenerator = require('../../middlewares/Users/tokenGenerator');
const { isNameValid, isEmailValid, isPasswordValid } = require('../../middlewares/Users/isValid');
const userExists = require('../../middlewares/Users/userExists');

const SALT_ROUNDS = 10;

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const cryptedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const user = { displayName, email, password: cryptedPassword, image };

    await User.create(user);

    const token = await tokenGenerator(user);

    res.status(statusCode.CREATED).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/',
    isPasswordValid,
    isEmailValid,
    userExists,
    isNameValid,
    createUser);
};