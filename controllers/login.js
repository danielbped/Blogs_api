const statusCode = require('http-status-codes').StatusCodes;

const { User } = require('../models');

const tokenGenerator = require('../middlewares/Users/tokenGenerator');
const {
  isPasswordValid,
  isEmailValid,
  isPasswordCorrect } = require('../middlewares/Login/isValid');
const userNotExists = require('../middlewares/Users/userNotExists');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;

    const { password } = await User.findOne({ where: { email } });

    const user = { email, password };

    const token = await tokenGenerator(user);

    res.status(statusCode.OK).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/login',
    isPasswordValid,
    isEmailValid,
    userNotExists,
    isPasswordCorrect,
    login);
};