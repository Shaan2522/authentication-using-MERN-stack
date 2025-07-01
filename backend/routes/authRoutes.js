const express = require('express');
const router = express.Router();
const passport = require('passport');
const svgCaptcha = require('svg-captcha');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const rateLimit = require('express-rate-limit');

// Rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

router.use(['/login', '/signup'], authLimiter);
// Real-time validation endpoint example
router.post('/validate', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ valid: false, error: 'Email required.' });
  const exists = await User.findOne({ email });
  if (exists) return res.json({ valid: false, error: 'Email already registered.' });
  res.json({ valid: true });
});
// Signup
router.post('/signup', async (req, res) => {
  const { email, password, captcha } = req.body;
  if (!email || !password || !captcha) return res.status(400).json({ error: 'All fields required.' });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Invalid email format.' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  if (!req.session.captcha || captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    return res.status(400).json({ error: 'Invalid CAPTCHA.' });
  }
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered.' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    req.session.captcha = null;
    res.json({ success: true, message: 'Signup successful! Please log in.' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed.' });
  }
});

// Login
router.post('/login', async (req, res, next) => {
  const { email, password, captcha } = req.body;
  if (!email || !password || !captcha) return res.status(400).json({ error: 'All fields required.' });
  if (!req.session.captcha || captcha.toLowerCase() !== req.session.captcha.toLowerCase()) {
    return res.status(400).json({ error: 'Invalid CAPTCHA.' });
  }
  req.session.captcha = null;
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ error: 'Login failed.' });
    if (!user) return res.status(400).json({ error: info?.message || 'Invalid credentials.' });
    req.logIn(user, err => {
      if (err) return res.status(500).json({ error: 'Login failed.' });
      res.json({ user: { email: user.email }, message: 'Login successful!' });
    });
  })(req, res, next);
});

// Logout
router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: 'Logout failed.' });
    req.session.destroy(() => {
      res.json({ success: true, message: 'Logged out.' });
    });
  });
});

// CAPTCHA
router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    noise: 2,
    color: true,
    background: '#f0f0f0',
  });
  req.session.captcha = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
});

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/home',
}));

// GitHub OAuth
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/home',
}));

// Protected home route
router.get('/home', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ user: { email: req.user.email }, message: 'Welcome!' });
});

module.exports = router;
