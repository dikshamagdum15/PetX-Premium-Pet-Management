require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const auth = require('./middleware/auth'); // Import auth middleware
// Route imports
const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/pets');
const reminderRoutes = require('./routes/reminders');
const noteRoutes = require('./routes/notes');
const galleryRoutes = require('./routes/gallery');
const vetRoutes = require('./routes/vets');

const User = require('./models/User'); // Import User model at the top
// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => { // Added timestamp for consistency
  res.json({ status: 'OK', message: 'PetX V API is running', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/vets', vetRoutes);

// AI Assistant mock endpoint
app.post('/api/ai/ask', (req, res) => {
  const { question } = req.body;
  
  const responses = [
    "Based on your question, I recommend consulting with a veterinarian for personalized advice.",
    "Regular exercise and a balanced diet are key to your pet's health!",
    "Make sure your pet stays hydrated, especially during hot weather.",
    "Vaccinations are crucial for preventing serious diseases. Keep them up to date!",
    "If you notice any unusual behavior, it's always best to consult a professional vet.",
    "Grooming isn't just about looks - it's essential for your pet's hygiene and comfort."
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  res.json({
    success: true,
    answer: randomResponse,
    suggestion: "For more detailed advice, please visit a licensed veterinarian."
  });
});

// Gamification endpoint
app.get('/api/gamification/stats', auth, async (req, res) => { // Added auth middleware
  try {
    const user = await User.findById(req.user?.id);
    
    res.json({
      success: true,
      points: user?.points || 0,
      badges: user?.badges || [],
      nextBadge: 100 - (user?.points % 100),
      level: Math.floor((user?.points || 0) / 100) + 1
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Error handler
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 PetX V Server running on port ${PORT}`);
  console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads')}`);
});
