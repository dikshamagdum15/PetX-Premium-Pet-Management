const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  species: {
    type: String,
    required: [true, 'Species is required'],
    enum: ['dog', 'cat', 'bird', 'rabbit', 'fish', 'hamster', 'other']
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
    trim: true
  },
  age: {
    years: { type: Number, default: 0, min: 0 },
    months: { type: Number, default: 0, min: 0, max: 11 }
  },
  weight: {
    value: { type: Number, default: 0 },
    unit: { type: String, enum: ['kg', 'lbs'], default: 'kg' }
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unknown'],
    default: 'unknown'
  },
  color: {
    type: String,
    trim: true
  },
  photo: {
    type: String,
    default: 'default-pet.png'
  },
  status: { 
    type: String, 
    enum: ['active', 'lost'], 
    default: 'active' 
  },
  lastSeenLocation: { type: String, trim: true },
  contactInfo: { type: String, trim: true },
  medicalHistory: [{
    condition: String,
    date: Date,
    vet: String,
    notes: String
  }],
  healthLogs: [{
    date: { type: Date, default: Date.now },
    weight: Number,
    activity: String,
    diet: String,
    mood: {
      type: String,
      enum: ['happy', 'neutral', 'sad', 'sick']
    }
  }],
  gallery: [{
    url: String,
    caption: String,
    uploadedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
