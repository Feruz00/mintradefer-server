const { getExpo, updateExpo } = require('../controllers/expo');
const { protect } = require('../middleware/auth');

const router = require('express').Router();

router.route('/client').get(getExpo);

router.use(protect);
router.route('/').get(getExpo).patch(updateExpo);

module.exports = router;
