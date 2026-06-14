const {
  getTenders,
  getTender,
  createTender,
  deleteTenders,
  deleteTender,
  updateTender,
} = require('../controllers/tenders');
const { protect } = require('../middleware/auth');
const { addClient } = require('../middleware/clientMiddleware');

const router = require('express').Router();

router.route('/client').get(addClient, getTenders);
router.route('/client/:id').get(addClient, getTender);

router.use(protect);

router.route('/').get(getTenders).post(createTender).delete(deleteTenders);

router.route('/:id').get(getTender).patch(updateTender).delete(deleteTender);
module.exports = router;
