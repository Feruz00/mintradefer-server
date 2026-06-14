const {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  deleteDocuments,
  createDocumentItem,
  updateDocumentItem,
  deleteDocumentItem,
} = require('../controllers/papers');
const { protect } = require('../middleware/auth');

const router = require('express').Router();

router.route('/client').get(getDocuments);
router.route('/client/:id').get(getDocument);

router.use(protect);

router
  .route('/')
  .get(getDocuments)
  .post(createDocument)
  .delete(deleteDocuments);

router.route('/item').post(createDocumentItem);
router.route('/item/:id').patch(updateDocumentItem).delete(deleteDocumentItem);

router
  .route('/:id')
  .get(getDocument)
  .patch(updateDocument)
  .delete(deleteDocument);
module.exports = router;
