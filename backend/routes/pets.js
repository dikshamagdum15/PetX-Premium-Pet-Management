const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  addHealthLog,
  addGalleryImage,
  getLostPets
} = require('../controllers/petController');

router.get('/', auth, getAllPets);
router.get('/lost-and-found', auth, getLostPets);
router.get('/:id', auth, getPetById);
router.post('/', auth, upload.single('photo'), createPet);
router.put('/:id', auth, upload.single('photo'), updatePet);
router.delete('/:id', auth, deletePet);
router.post('/:id/health', auth, addHealthLog);
router.post('/:id/gallery', auth, upload.single('image'), addGalleryImage);
router.patch('/:id/status', auth, updatePet); // Reusing updatePet for 'Lost' status

module.exports = router;
