const User = require('../models/user.model');

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async ({ name, email, password, role }) => {
  const user = new User({ name, email, password, role });
  return await user.save();
};

const findUserById = async (id) => {
  return await User.findById(id);
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
};
