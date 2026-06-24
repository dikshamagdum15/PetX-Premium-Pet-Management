const Pet = require('../models/Pet');
const User = require('../models/User');

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({ user: req.user.id });
    res.json({ success: true, count: pets.length, pets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findOne({ _id: req.params.id, user: req.user.id });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPet = async (req, res) => {
  try {
    // Parse stringified JSON objects from FormData
    const parsedBody = {};
    for (const key in req.body) {
      try {
        parsedBody[key] = JSON.parse(req.body[key]);
      } catch (e) {
        parsedBody[key] = req.body[key];
      }
    }
    const petData = { ...parsedBody, user: req.user.id };
    if (req.file) petData.photo = req.file.filename;

    const pet = await Pet.create(petData);

    await User.findByIdAndUpdate(req.user.id, {
      $push: { pets: pet._id },
      $inc: { points: 10 }
    });

    res.status(201).json({ success: true, pet });
  } catch (error) {
    console.error('Error creating pet:', error); // Log the full error for debugging
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message, errors: error.errors });
    }
    // Generic server error for other types of errors
    res.status(500).json({ message: 'Failed to create pet', error: error.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    // Parse stringified JSON objects from FormData for updates
    const parsedUpdates = {};
    for (const key in req.body) {
      try {
        parsedUpdates[key] = JSON.parse(req.body[key]);
      } catch (e) {
        parsedUpdates[key] = req.body[key];
      }
    }
    const updates = parsedUpdates;
    if (req.file) updates.photo = req.file.filename;

    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updates,
      { new: true }
    );

    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    await User.findByIdAndUpdate(req.user.id, { $pull: { pets: req.params.id } });
    res.json({ success: true, message: 'Pet deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addHealthLog = async (req, res) => {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $push: { healthLogs: req.body } },
      { new: true }
    );
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addGalleryImage = async (req, res) => {
  try {
    const imageData = {
      url: req.file.filename,
      caption: req.body.caption || ''
    };

    const pet = await Pet.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $push: { gallery: imageData } },
      { new: true }
    );

    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ success: true, pet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLostPets = async (req, res) => {
  try {
    // Fetch all pets across the database that are marked as 'lost'
    const pets = await Pet.find({ status: 'lost' }).select('name breed photo status color lastSeenLocation contactInfo gender');
    res.json({ success: true, count: pets.length, pets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
