const statusCode = require('http-status-codes').StatusCodes;

const errorMessages = require('../../utils/ErrorMessages');

module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(statusCode.BAD_REQUEST)
      .json({ message: errorMessages.emptyCategorieName });
  }

  next();
};