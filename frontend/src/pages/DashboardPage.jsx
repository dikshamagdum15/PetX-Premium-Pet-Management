import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Heart, 
  Activity, 
  Calendar, 
  TrendingUp,
  Award,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

// Ensure the extension matches your file in src/assets
import petPlaceholder from '../assets/pet.jpg';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const DashboardPage = () => {
  const [pets, setPets] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [stats, setStats] = useState({ points: 0, badges: [], level: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [petsRes, remindersRes, statsRes] = await Promise.all([
        api.get('/pets'),
        api.get('/reminders?upcoming=true'),
        api.get('/gamification/stats')
      ]);
      setPets(petsRes.data.pets);
      setReminders(remindersRes.data.reminders);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div {...fadeInUp} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your pets.</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Pets', value: pets.length, icon: Heart, color: 'from-primary-500 to-pink-400' },
          { label: 'Upcoming Reminders', value: reminders.length, icon: Calendar, color: 'from-secondary-500 to-blue-400' },
          { label: 'Health Logs', value: pets.reduce((acc, p) => acc + (p.healthLogs?.length || 0), 0), icon: Activity, color: 'from-green-500 to-emerald-400' },
          { label: 'Points', value: stats.points, icon: Award, color: 'from-warm-500 to-orange-400' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pet Cards */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Pets</h2>
            <Link to="/add-pet" className="btn-primary text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Pet
            </Link>
          </div>

          {pets.length === 0 ? (
            <div className="card text-center py-12">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No pets yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Add your first pet to start tracking their health</p>
              <Link to="/add-pet" className="btn-primary text-sm inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Your First Pet
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {pets.map((pet, i) => (
                <motion.div
                  key={pet._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card group cursor-pointer"
                >
                  <Link to={`/pets/${pet._id}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-2xl">
                        <img 
                          src={pet.photo && pet.photo !== 'default-pet.png' ? `http://localhost:5000/uploads/${pet.photo}` : petPlaceholder} 
                          alt={pet.name} 
                          className="w-full h-full object-cover rounded-2xl" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = petPlaceholder;
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                          {pet.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{pet.breed}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                            {pet.age?.years || 0}y {pet.age?.months || 0}m
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
                            {pet.weight?.value || 0} {pet.weight?.unit || 'kg'}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Reminders */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Reminders</h3>
            </div>
            {reminders.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming reminders</p>
            ) : (
              <div className="space-y-3">
                {reminders.slice(0, 5).map((reminder) => (
                  <div key={reminder._id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <div className={`w-2 h-2 rounded-full ${
                      reminder.priority === 'high' ? 'bg-red-500' : 
                      reminder.priority === 'medium' ? 'bg-warm-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{reminder.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(reminder.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link to="/reminders" className="text-sm text-primary-500 hover:text-primary-600 mt-4 inline-flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Gamification */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-warm-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Your Progress</h3>
            </div>
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-gradient">Level {stats.level}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stats.points} points</p>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-warm-400 to-warm-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((stats.points % 100) / 100) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {stats.nextBadge} points to next level
            </p>
            {stats.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {stats.badges.map((badge, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-warm-100 dark:bg-warm-900/30 text-warm-700 dark:text-warm-400 capitalize">
                    {badge.replace('_', ' ')}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
