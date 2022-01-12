const statusCode = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');

const errorMessages = require('../../utils/ErrorMessages');

const { User } = require('../../models');
const { BlogPost } = require('../../models');

const secret = process.env.SECRET || 'secret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const { userId } = await BlogPost.findOne({ id });

  const { data: { email: userEmail } } = jwt.verify(token, secret);

  const { email: editEmail } = await User.findOne({ id: userId });

  console.log(userEmail, editEmail);

  if (userEmail !== editEmail) {
    return res.status(statusCode.UNAUTHORIZED)
      .json({ message: errorMessages.unauthorizedUser });
  }

  next();
};