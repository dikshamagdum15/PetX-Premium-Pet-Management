const Gallery = require('../models/Gallery');
const Pet = require('../models/Pet');

exports.getGallery = async (req, res) => {
  try {
    const { petId } = req.query;
    let query = { user: req.user.id };
    if (petId) query.pet = petId;

    const images = await Gallery.find(query)
      .populate('pet', 'name photo')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: images.length, images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const image = await Gallery.create({
      user: req.user.id,
      pet: req.body.petId,
      url: req.file.filename,
      caption: req.body.caption || ''
    });

    console.log('Uploaded image details:', image); // Debugging line
    await Pet.findByIdAndUpdate(req.body.petId, {
      $push: { gallery: { url: req.file.filename, caption: req.body.caption || '' } }
    });

    res.status(201).json({ success: true, image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json({ success: true, image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
