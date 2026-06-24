# PetX V - Premium Pet Management Platform

A modern, feature-rich pet management web application built with React, Node.js, Express, and MongoDB. Designed for pet lovers who want to track health, manage schedules, and create lasting memories with their furry friends.

## Features

### Core Features
- **User Authentication** - JWT-based secure login/register system
- **Pet Management** - Add, edit, delete pets with photos
- **Health Tracking** - Weight, diet, activity, and mood monitoring with Chart.js visualization
- **Vaccination Records** - Track vaccination history and upcoming shots
- **Smart Reminders** - Customizable reminders for feeding, medication, grooming, walks, and vet appointments
- **Photo Gallery** - Upload and organize pet photos with captions
- **AI Pet Assistant** - Chatbot for instant pet care advice
- **Vet Finder** - Find nearby veterinarians with ratings and services
- **Notes Section** - Document behaviors, health observations, and training progress
- **Gamification** - Points and badges system for engagement

### UI/UX Features
- **Modern Design** - Glassmorphism, neumorphism, and gradient effects
- **Dark/Light Mode** - Toggle between themes with persistent preference
- **Framer Motion Animations** - Smooth page transitions and micro-interactions
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Loading Skeletons** - Better perceived performance
- **Toast Notifications** - User-friendly feedback with react-hot-toast
- **Lucide Icons** - Consistent, beautiful iconography

## Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Chart.js for data visualization
- React Router for navigation
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Bcrypt.js for password hashing
- CORS enabled

## Project Structure

```
PetX-V/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth, error handling, upload
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── uploads/        # File upload directory
│   ├── .env            # Environment variables
│   ├── package.json
│   └── server.js       # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React contexts (Auth, Theme)
│   │   ├── pages/      # Page components
│   │   ├── utils/      # API client, helpers
│   │   ├── App.jsx     # Main app with routing
│   │   ├── main.jsx    # Entry point
│   │   └── index.css   # Tailwind + custom styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
# Create .env file with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables (Backend .env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/petx_v
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Pets
- `GET /api/pets` - Get all pets
- `GET /api/pets/:id` - Get pet by ID
- `POST /api/pets` - Create pet (with photo upload)
- `PUT /api/pets/:id` - Update pet
- `DELETE /api/pets/:id` - Delete pet
- `POST /api/pets/:id/health` - Add health log
- `POST /api/pets/:id/vaccinations` - Add vaccination

### Reminders
- `GET /api/reminders` - Get reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder
- `PATCH /api/reminders/:id/toggle` - Toggle completion

### Notes
- `GET /api/notes` - Get notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Gallery
- `GET /api/gallery` - Get images
- `POST /api/gallery` - Upload image
- `DELETE /api/gallery/:id` - Delete image
- `POST /api/gallery/:id/like` - Like image

### Vets
- `GET /api/vets/nearby` - Get nearby vets (mock data)
- `GET /api/vets/:id` - Get vet by ID

### AI Assistant
- `POST /api/ai/ask` - Ask AI question

## Design System

### Colors
- Primary: Pink/Rose gradient
- Secondary: Blue gradient
- Warm: Amber/Orange accents
- Success: Green
- Background: Light/Dark mode support

### Typography
- Display: Poppins
- Body: Inter

### Components
- Glass cards with backdrop blur
- Gradient buttons with hover effects
- Custom input fields with focus rings
- Animated loading states

## License

MIT License - feel free to use for personal or commercial projects.

## Credits

Built with love for pet lovers everywhere. 🐾

