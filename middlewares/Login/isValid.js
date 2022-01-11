const statusCode = require('http-status-codes').StatusCodes;
const bcrypt = require('bcrypt');

const errorMessages = require('../../utils/ErrorMessages');

const { User } = require('../../models');

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

const isPasswordCorrect = async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ where: { email } });
  
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.invalidFields });
  }

  next();
};

module.exports = {
  isPasswordValid,
  isEmailValid,
  isPasswordCorrect,
};