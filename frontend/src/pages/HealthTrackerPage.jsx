import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Activity } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../utils/api';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HealthTrackerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ weight: '', activity: '', diet: '', mood: 'happy' });

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const res = await api.get(`/pets/${id}`);
      setPet(res.data.pet);
    } catch (error) {
      toast.error('Failed to load pet');
      navigate('/dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/pets/${id}/health`, formData);
      toast.success('Health log added');
      setShowForm(false);
      setFormData({ weight: '', activity: '', diet: '', mood: 'happy' });
      fetchPet();
    } catch (error) {
      toast.error('Failed to add log');
    }
  };

  const chartData = {
    labels: pet?.healthLogs?.map(l => new Date(l.date).toLocaleDateString()) || [],
    datasets: [{
      label: 'Weight (kg)',
      data: pet?.healthLogs?.map(l => l.weight) || [],
      borderColor: 'rgb(236, 72, 153)',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Weight History' }
    },
    scales: {
      y: { beginAtZero: false }
    }
  };

  if (!pet) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-6">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400">{pet.name} - {pet.breed}</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Log
          </button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="card mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">New Health Log</h3>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
                <input type="number" step="0.1" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="input-field" placeholder="10.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mood</label>
                <select value={formData.mood} onChange={e => setFormData({...formData, mood: e.target.value})} className="input-field">
                  {['happy', 'neutral', 'sad', 'sick'].map(m => (
                    <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Activity</label>
                <input value={formData.activity} onChange={e => setFormData({...formData, activity: e.target.value})} className="input-field" placeholder="Walk, Play, Rest..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Diet</label>
                <input value={formData.diet} onChange={e => setFormData({...formData, diet: e.target.value})} className="input-field" placeholder="Dry food, Wet food..." />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="btn-primary w-full">Save Log</button>
              </div>
            </form>
          </motion.div>
        )}

        {pet.healthLogs?.length > 0 && (
          <div className="card mb-6">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}

        <div className="card">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">All Health Logs</h3>
          {pet.healthLogs?.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No health logs yet. Add your first one!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...pet.healthLogs].reverse().map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      log.mood === 'happy' ? 'bg-green-100 text-green-600' :
                      log.mood === 'sad' ? 'bg-blue-100 text-blue-600' :
                      log.mood === 'sick' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {log.mood === 'happy' ? '😊' : log.mood === 'sad' ? '😢' : log.mood === 'sick' ? '🤒' : '😐'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{log.activity || 'General'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{log.diet && `Diet: ${log.diet}`}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {log.weight && <p className="font-semibold text-gray-900 dark:text-white">{log.weight} kg</p>}
                    <p className="text-xs text-gray-500">{new Date(log.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HealthTrackerPage;
