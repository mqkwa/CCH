/**
 * @file user.routes.js
 * @description Routes for user registration, login, and profile.
 */

const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Route to register new user
router.post('/register', registerUser);

// Route to login
router.post('/login', loginUser);

// Route to get user profile (protected)
router.get('/profile', protect, getProfile);

module.exports = router;
