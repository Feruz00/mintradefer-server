const {
  getPosts,
  getPost,
  createPost,
  deletePosts,
  updatePost,
  deletePost,
} = require('../controllers/posts');
const { protect } = require('../middleware/auth');
const { addClient } = require('../middleware/clientMiddleware');

const router = require('express').Router();

router.route('/client').get(addClient, getPosts);
router.route('/client/:id').get(addClient, getPost);

router.use(protect);

router.route('/').get(getPosts).post(createPost).delete(deletePosts);

router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);
module.exports = router;
