const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getNearbyVets, getVetById, createVet } = require('../controllers/vetController');

router.get('/nearby', auth, getNearbyVets);
router.get('/:id', auth, getVetById);
router.post('/', auth, createVet);

module.exports = router;
