const {
  getMessages,
  createMessage,
  getMessage,
  deleteMessages,
  deleteMessage,
} = require('../controllers/messages');

const router = require('express').Router();

const rateLimit = require('express-rate-limit');
const { protect } = require('../middleware/auth');

const messageLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Too many messages, try again later',
});
router
  .route('/')
  .get(protect, getMessages)
  .post(messageLimiter, createMessage)
  .delete(protect, deleteMessages);

router.use(protect);
router.route('/:id').get(getMessage).delete(deleteMessage);
module.exports = router;
