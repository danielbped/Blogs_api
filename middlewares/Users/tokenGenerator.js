const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.SECRET;

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const tokenGenerator = async ({ email, password }) => {
  const payload = {
    email,
    password,
  };

  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  return token;
};

module.exports = tokenGenerator;
