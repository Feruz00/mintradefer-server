const { login, currentUser, logout } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = require('express').Router();

const rateLimit = require('express-rate-limit');
const messageLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 7,
  message: 'Too many messages, try again later',
});

router.route('/').post(messageLimiter, login).get(protect, currentUser);

router.route('/logout').post(protect, logout);

module.exports = router;
