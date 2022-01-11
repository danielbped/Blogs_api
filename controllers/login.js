const statusCode = require('http-status-codes').StatusCodes;

const tokenGenerator = require('../middlewares/Users/tokenGenerator');
const { isPasswordValid, isEmailValid } = require('../middlewares/Login/isValid');
const userExists = require('../middlewares/Users/userExists');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = { email, password };

    const token = await tokenGenerator(user);

    res.status(statusCode.OK).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/login',
    userExists,
    isPasswordValid,
    isEmailValid,
    login);
};