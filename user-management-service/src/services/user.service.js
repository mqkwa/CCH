/**
 * @file user.service.js
 * @description Service layer handling user-related database operations.
 */

const User = require('../models/user.model');

/**
 * Find a user by email
 * @param {string} email
 * @returns {Promise<User|null>}
 */
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

/**
 * Find a user by ID
 * @param {string} id
 * @returns {Promise<User|null>}
 */
const findUserById = async (id) => {
  return await User.findById(id);
};

/**
 * Create a new user
 * @param {Object} userData
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} userData.role
 * @returns {Promise<User>}
 */
const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

module.exports = { findUserByEmail, findUserById, createUser };
