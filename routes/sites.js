const { getSite } = require('../controllers/sites');

const router = require('express').Router();
router.route('/client').get(getSite);

module.exports = router;
