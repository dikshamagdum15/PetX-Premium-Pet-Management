const Reminder = require('../models/Reminder');

const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id }).sort({ date: 1 });
    res.json({ success: true, count: reminders.length, reminders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json({ success: true, reminder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.json({ success: true, reminder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    res.json({ success: true, message: 'Reminder deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleComplete = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ _id: req.params.id, user: req.user.id });
    if (!reminder) return res.status(404).json({ message: 'Reminder not found' });
    
    reminder.completed = !reminder.completed;
    await reminder.save();
    res.json({ success: true, reminder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  toggleComplete
};