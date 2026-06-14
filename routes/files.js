const {
  uploadFile,
  recoverFile,
  permanentlyDeleteFile,
  getOne,
  deleteFile,
} = require('../controllers/files');
const multerOptions = require('../middleware/multer');

const router = require('express').Router();

router.route('/').post(multerOptions.single('file'), uploadFile);

router.put('/restore/:id', recoverFile);
router.delete('/permanently/:id', permanentlyDeleteFile);

router.route('/:id').delete(deleteFile).get(getOne);

module.exports = router;
