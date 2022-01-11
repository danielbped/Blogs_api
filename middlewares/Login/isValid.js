const statusCode = require('http-status-codes').StatusCodes;
const errorMessages = require('../../utils/ErrorMessages');

const isEmailValid = (req, res, next) => {
  const { email } = req.body;
  
  if (email === '') {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyEmailLogin });
  }
  
  if (!email) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyEmail });
  }

  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyPasswordLogin });
  }

  if (!password) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyPassword });
  }

  next();
};

module.exports = {
  isPasswordValid,
  isEmailValid,
};