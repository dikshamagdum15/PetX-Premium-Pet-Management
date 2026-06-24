import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Activity, Calendar, Weight, Image, Stethoscope, Trash2, AlertCircle, MapPin, Phone, Check } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

// Ensure the extension matches your file in src/assets
import petPlaceholder from '../assets/pet.jpg';

const PetProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLostForm, setShowLostForm] = useState(false);
  const [lostFormLocation, setLostFormLocation] = useState('');
  const [lostFormContact, setLostFormContact] = useState('');

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      const res = await api.get(`/pets/${id}`);
      setPet(res.data.pet);
    } catch (error) {
      toast.error('Failed to load pet profile');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this pet?')) return;
    try {
      await api.delete(`/pets/${id}`);
      toast.success('Pet deleted');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to delete pet');
    }
  };

  const handleReportLost = async () => {
    if (!lostFormLocation || !lostFormContact) {
      toast.error('Please provide last seen location and contact info.');
      return;
    }
    try {
      await api.patch(`/pets/${id}/status`, { status: 'lost', lastSeenLocation: lostFormLocation, contactInfo: lostFormContact });
      setPet({ ...pet, status: 'lost', lastSeenLocation: lostFormLocation, contactInfo: lostFormContact });
      toast.success('Pet marked as LOST');
      setShowLostForm(false);
    } catch (error) {
      toast.error('Failed to mark pet as lost');
    }
  };

  const handleReportFound = async () => {
    try {
      await api.patch(`/pets/${id}/status`, { status: 'active', lastSeenLocation: '', contactInfo: '' });
      setPet({ ...pet, status: 'active', lastSeenLocation: '', contactInfo: '' });
      toast.success('Pet marked as home');
      setShowLostForm(false);
      setLostFormLocation('');
      setLostFormContact('');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const toggleLostStatus = () => {
    if (pet.status === 'lost') {
      handleReportFound();
    } else {
      setShowLostForm(!showLostForm);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" /></div>;
  if (!pet) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-6">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-4xl shadow-xl">
                    <img 
                      src={pet.photo && pet.photo !== 'default-pet.png' ? `http://localhost:5000/uploads/${pet.photo}` : petPlaceholder} 
                      alt={pet.name} 
                      className="w-full h-full object-cover rounded-3xl" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = petPlaceholder;
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pet.name}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 capitalize">{pet.breed}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium">{pet.species}</span>
                      <span className="px-3 py-1 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 text-sm font-medium">{pet.gender}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={toggleLostStatus}
                    className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors ${pet.status === 'lost' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
                  >
                    <AlertCircle className="w-4 h-4" /> {pet.status === 'lost' ? 'Report Found' : 'Report Lost'}
                  </button>
                  <button onClick={handleDelete} className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {showLostForm && pet.status !== 'lost' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                  <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" /> Report {pet.name} as Lost
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Seen Location</label>
                      <input value={lostFormLocation} onChange={e => setLostFormLocation(e.target.value)} className="input-field" placeholder="e.g. Central Park, North Gate" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Info</label>
                      <input value={lostFormContact} onChange={e => setLostFormContact(e.target.value)} className="input-field" placeholder="Phone or email" />
                    </div>
                  </div>
                  <button onClick={handleReportLost} className="btn-primary w-full bg-red-600 hover:bg-red-700 border-none">Mark as Missing</button>
                </motion.div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Calendar, label: 'Age', value: `${pet.age?.years || 0}y ${pet.age?.months || 0}m` },
                  { icon: Weight, label: 'Weight', value: `${pet.weight?.value || 0} ${pet.weight?.unit || 'kg'}` },
                  { icon: Heart, label: 'Color', value: pet.color || 'N/A' },
                  { icon: Activity, label: 'Logs', value: pet.healthLogs?.length || 0 },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50">
                    <stat.icon className="w-5 h-5 text-primary-500 mx-auto mb-2" />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Logs */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Health Logs</h2>
              {pet.healthLogs?.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No health logs yet</p>
              ) : (
                <div className="space-y-3">
                  {pet.healthLogs.slice(-5).map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{log.activity || 'General checkup'}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{log.diet && `Diet: ${log.diet}`}</p>
                      </div>
                      <div className="text-right">
                        {log.weight && <p className="text-sm font-medium text-gray-900 dark:text-white">{log.weight} kg</p>}
                        <p className="text-xs text-gray-500">{new Date(log.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-4">
            <Link to={`/health/${id}`} className="card flex items-center gap-4 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">Track Health</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add weight, diet, activity</p>
              </div>
            </Link>

            <Link to="/gallery" className="card flex items-center gap-4 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">Photo Gallery</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">View pet photos</p>
              </div>
            </Link>

            <Link to="/reminders" className="card flex items-center gap-4 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-warm-100 dark:bg-warm-900/30 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warm-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-warm-600 transition-colors">Reminders</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Set schedules</p>
              </div>
            </Link>

            <Link to="/notes" className="card flex items-center gap-4 hover:shadow-xl transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-secondary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-secondary-600 transition-colors">Notes</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Behavior & health notes</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PetProfilePage;
