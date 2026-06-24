const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['vaccination', 'feeding', 'medication', 'grooming', 'walk', 'vet_appointment', 'other']
  },
  title: {
    type: String,
    required: [true, 'Reminder title is required'],
    trim: true
  },
  description: String,
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  repeat: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly'],
    default: 'none'
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reminder', reminderSchema);

