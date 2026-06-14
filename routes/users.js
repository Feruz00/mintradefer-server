const {
  getUsers,
  createUser,
  deleteUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

const router = require('express').Router();

router.use(protect);

router.route('/').get(getUsers).post(createUser).delete(deleteUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
