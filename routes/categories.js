const { getCategories } = require('../controllers/categories');

const router = require('express').Router();

router.route('/').get(getCategories);
module.exports = router;
