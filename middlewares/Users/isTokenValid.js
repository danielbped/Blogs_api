const statusCode = require('http-status-codes').StatusCodes;
const errorMessages = require('../../utils/ErrorMessages');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
  
    if (!token || typeof token !== 'string') {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.tokenNotFound });
    }
  
    if (token.length < 210) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.invalidToken });
    }

    next();
  } catch (err) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.invalidToken });
  }
};