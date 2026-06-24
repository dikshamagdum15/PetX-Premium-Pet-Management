const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getGallery,
  uploadImage,
  deleteImage,
  likeImage
} = require('../controllers/galleryController');

router.get('/', auth, getGallery);
router.post('/', auth, upload.single('image'), uploadImage);
router.delete('/:id', auth, deleteImage);
router.post('/:id/like', auth, likeImage);

module.exports = router;

