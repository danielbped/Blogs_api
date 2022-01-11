const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = process.env.SECRET || 'secret';

module.exports = async (token) => {
  const { data: { email } } = jwt.verify(token, secret);

  const user = await User.findOne({ email });

  const userId = user.dataValues.id;

  return userId;
};