const statusCode = require('http-status-codes').StatusCodes;
const { User } = require('../../models');
const errorMessages = require('../../utils/ErrorMessages');

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (user) {
    return res.status(statusCode.CONFLICT)
    .json({ message: errorMessages.userAlreadyExists });
  }

  next();
};