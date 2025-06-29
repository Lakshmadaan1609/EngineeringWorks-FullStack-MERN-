const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';

// Admin credentials
const ADMIN_USER = {
  username: process.env.ADMIN_USERNAME || 'Laksh',
  password: process.env.ADMIN_PASSWORD || '12345'
};

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '15m' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// @route   GET api/auth/validate
// @desc    Validate token
// @access  Private
router.get('/validate', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router; 