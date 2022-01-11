const statusCode = require('http-status-codes').StatusCodes;
const errorMessages = require('../../utils/ErrorMessages');

const isNameValid = (req, res, next) => {
  const { displayName } = req.body;
  if (!(typeof (displayName) === 'string' && displayName.length >= 8)) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.invalidName });
  }

  next();
};

const isEmailValid = (req, res, next) => {
  const { email } = req.body;

  const emailRegex = /.+@\w+\.\w+(\.\w{2,3})?/;
  const validEmail = emailRegex.test(email);

  if (!email) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyEmail });
  }

  if (!validEmail) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.invalidEmail });
  }

  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyPassword });
  }

  if (password.length !== 6) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.invalidPassword });
  }

  next();
};

module.exports = {
  isNameValid,
  isEmailValid,
  isPasswordValid,
};