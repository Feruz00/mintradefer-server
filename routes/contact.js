const { getContact, updateContact } = require('../controllers/contact');
const { protect } = require('../middleware/auth');
const router = require('express').Router();

router.route('/client').get(getContact);

router.use(protect);

router.route('/').get(getContact).patch(updateContact);
module.exports = router;
