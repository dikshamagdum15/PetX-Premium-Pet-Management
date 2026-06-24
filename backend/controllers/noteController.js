const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  try {
    const { petId, category } = req.query;
    let query = { user: req.user.id };
    if (petId) query.pet = petId;
    if (category) query.category = category;

    const notes = await Note.find(query)
      .populate('pet', 'name photo')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: notes.length, notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ success: true, note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ success: true, message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

