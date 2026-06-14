const {
  getEnterprises,
  getEnterprise,
  createEnterprise,
  deleteEnterprises,
  updateEnterprise,
  deleteEnterprise,
} = require('../controllers/enterprises');
const { protect } = require('../middleware/auth');
const { addClient } = require('../middleware/clientMiddleware');

const router = require('express').Router();

router.route('/client').get(addClient, getEnterprises);
router.route('/client/:id').get(addClient, getEnterprise);

router.use(protect);

router
  .route('/')
  .get(getEnterprises)
  .post(createEnterprise)
  .delete(deleteEnterprises);

router
  .route('/:id')
  .get(getEnterprise)
  .patch(updateEnterprise)
  .delete(deleteEnterprise);

module.exports = router;
