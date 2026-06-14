const {
  getEvents,
  getEvent,
  createEvent,
  deleteEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { protect } = require('../middleware/auth');
const { addClient } = require('../middleware/clientMiddleware');

const router = require('express').Router();

router.route('/client').get(addClient, getEvents);
router.route('/client/:id').get(addClient, getEvent);

router.use(protect);

router.route('/').get(getEvents).post(createEvent).delete(deleteEvents);

router.route('/:id').get(getEvent).patch(updateEvent).delete(deleteEvent);

module.exports = router;
