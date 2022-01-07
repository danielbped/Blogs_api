const { User } = require('../../models');

module.exports = (email) => User.findOne({
  where: { email },
});