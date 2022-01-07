const statusCode = require('http-status-codes').StatusCodes;

const tokenGenerator = require('../middlewares/Users/tokenGenerator');
const isLoginValid = require('../middlewares/Login/isValid');
const errorMessages = require('../utils/ErrorMessages');
const userExists = require('../middlewares/Users/userExists');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = { email, password };

    if (typeof (isLoginValid(user)) === 'string') {
      return res.status(statusCode.BAD_REQUEST)
        .json({ message: isLoginValid(user) });
    }

    if (!await userExists(email)) {
      return res.status(statusCode.BAD_REQUEST)
        .json({ message: errorMessages.invalidFields });
    }

    const token = await tokenGenerator(user);

    res.status(statusCode.OK).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/login', login);
};