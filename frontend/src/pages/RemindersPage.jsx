import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Check, Trash2, Bell } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    pet: '', type: 'vaccination', title: '', description: '', date: '', repeat: 'none', priority: 'medium'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [remindersRes, petsRes] = await Promise.all([
        api.get('/reminders'),
        api.get('/pets')
      ]);
      setReminders(remindersRes.data.reminders);
      setPets(petsRes.data.pets);
    } catch (error) {
      toast.error('Failed to load reminders');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reminders', formData);
      toast.success('Reminder created');
      setShowForm(false);
      setFormData({ pet: '', type: 'vaccination', title: '', description: '', date: '', repeat: 'none', priority: 'medium' });
      fetchData();
    } catch (error) {
      toast.error('Failed to create reminder');
    }
  };

  const toggleComplete = async (id) => {
    try {
      await api.patch(`/reminders/${id}/toggle`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this reminder?')) return;
    try {
      await api.delete(`/reminders/${id}`);
      toast.success('Reminder deleted');
      fetchData();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const typeColors = {
    vaccination: 'bg-green-100 text-green-600',
    feeding: 'bg-warm-100 text-warm-600',
    medication: 'bg-red-100 text-red-600',
    grooming: 'bg-purple-100 text-purple-600',
    walk: 'bg-blue-100 text-blue-600',
    vet_appointment: 'bg-secondary-100 text-secondary-600',
    other: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Smart Reminders</h1>
            <p className="text-gray-600 dark:text-gray-400">Never miss an important pet care task</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Reminder
          </button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="card mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Create Reminder</h3>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pet *</label>
                <select required value={formData.pet} onChange={e => setFormData({...formData, pet: e.target.value})} className="input-field">
                  <option value="">Select pet...</option>
                  {pets.map(pet => <option key={pet._id} value={pet._id}>{pet.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type *</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="input-field">
                  {['vaccination', 'feeding', 'medication', 'grooming', 'walk', 'vet_appointment', 'other'].map(t => (
                    <option key={t} value={t}>{t.replace('_', ' ').charAt(0).toUpperCase() + t.slice(1).replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-field" placeholder="Annual vaccination" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-field" placeholder="Additional details..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date & Time *</label>
                <input type="datetime-local" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="input-field">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="btn-primary w-full">Create Reminder</button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="space-y-4">
          {reminders.length === 0 ? (
            <div className="card text-center py-16">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No reminders</h3>
              <p className="text-gray-500 dark:text-gray-400">Create your first reminder above</p>
            </div>
          ) : (
            reminders.map((reminder, i) => (
              <motion.div
                key={reminder._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`card flex items-center gap-4 ${reminder.isCompleted ? 'opacity-60' : ''}`}
              >
                <button
                  onClick={() => toggleComplete(reminder._id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    reminder.isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  {reminder.isCompleted && <Check className="w-4 h-4" />}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${reminder.isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                      {reminder.title}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[reminder.type]}`}>
                      {reminder.type.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      reminder.priority === 'high' ? 'bg-red-100 text-red-600' :
                      reminder.priority === 'medium' ? 'bg-warm-100 text-warm-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {reminder.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{reminder.description}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(reminder.date).toLocaleString()}
                    </span>
                    {reminder.pet && (
                      <span className="text-xs text-primary-500">{reminder.pet.name}</span>
                    )}
                  </div>
                </div>

                <button onClick={() => handleDelete(reminder._id)} className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RemindersPage;
