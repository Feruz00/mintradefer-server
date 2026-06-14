const {
  getBanner,
  createBanner,
  deleteBanner,
} = require('../controllers/banner');
const { protect } = require('../middleware/auth');

const router = require('express').Router();

router.route('/client').get(getBanner);

router.use(protect);

router.route('/').get(getBanner).post(createBanner);
router.route('/:id').delete(deleteBanner);

module.exports = router;
