/**
 * @file user.controller.js
 * @description Controller layer handling HTTP requests for users.
 */

const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const config = require('../config/server.config');

/**
 * Generate JWT token for a user
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};

/**
 * Register a new user
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await userService.createUser({ name, email, password, role });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login a user
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get user profile
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, getProfile };
