const register = require("./register");
const login = require("./login");
const getUserById = require("./getUserById");
const { default: mongoose } = require("mongoose");



mongoose.set("strictQuery", false);

module.exports = {
  register,
  login,
  getUserById,
};
