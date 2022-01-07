const errorMessages = require('../../utils/ErrorMessages');

const isEmailValid = (email) => {
  if (email === '') return { message: errorMessages.emptyEmailLogin };
  if (!email) return { message: errorMessages.emptyEmail };

  return true;
};

const isPasswordValid = (password) => {
  if (password === '') return { message: errorMessages.emptyPasswordLogin };
  if (!password) return { message: errorMessages.emptyPassword };

  return true;
};

module.exports = ({ email, password }) => {
  if (isEmailValid(email).message) return isEmailValid(email).message;
  if (isPasswordValid(password).message) return isPasswordValid(password).message;

  return true;
};