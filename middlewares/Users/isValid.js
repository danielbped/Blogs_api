const errorMessages = require('../../utils/ErrorMessages');

const isNameValid = (name) => {
  if (
    !(typeof (name) === 'string' && name.length >= 8)
  ) return { message: errorMessages.invalidName };

  return true;
};

const isEmailValid = (email) => {
  const emailRegex = /.+@\w+\.\w+(\.\w{2,3})?/;
  const validEmail = emailRegex.test(email);

  if (!email) return { message: errorMessages.emptyEmail };
  if (!validEmail) return { message: errorMessages.invalidEmail };

  return true;
};

const isPasswordValid = (password) => {
  if (!password) return { message: errorMessages.emptyPassword };
  if (password.length !== 6) return { message: errorMessages.invalidPassword };

  return true;
};

module.exports = ({ displayName, email, password }) => {
  if (isNameValid(displayName).message) return isNameValid(displayName).message;
  if (isEmailValid(email).message) return isEmailValid(email).message;
  if (isPasswordValid(password).message) return isPasswordValid(password).message;

  return true;
};