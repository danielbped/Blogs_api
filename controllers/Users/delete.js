const statusCode = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const isTokenValid = require('../../middlewares/Users/isTokenValid');

const secret = process.env.SECRET || 'secret';

const deleteUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { data: { email } } = jwt.verify(token, secret);

    const { id } = await User.findOne({ where: { email } });

    await User.destroy({ 
      where: { id },
    });

    res.status(statusCode.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.delete('/me', isTokenValid, deleteUser);
};