var bcrypt = require("bcryptjs");

const cryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return { salt, hash };
};

module.exports = { cryptPassword };
