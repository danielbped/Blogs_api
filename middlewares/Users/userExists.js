const statusCode = require('http-status-codes').StatusCodes;
const { User } = require('../../models');
const errorMessages = require('../../utils/ErrorMessages');

module.exports = (req, res, next) => {
  const { email } = req.body;
  const user = User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(statusCode.BAD_REQUEST)
    .json({ message: errorMessages.invalidFields });
  }

  next();
};