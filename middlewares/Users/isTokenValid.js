const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'secret';

module.exports = (token) => {
  if (!token || typeof token !== 'string') return false;

  if (token.length < 210) return 'invalid token';

  const { data: { email } } = jwt.verify(token, secret);

  if (!email) return 'invalid token';

  return true;
};