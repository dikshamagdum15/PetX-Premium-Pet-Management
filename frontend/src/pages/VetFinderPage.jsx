import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Stethoscope, Navigation, Plus, Check } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const VetFinderPage = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVets();
  }, []);

  const fetchVets = async () => {
    try {
      const res = await api.get('/vets/nearby');
      setVets(res.data.vets);
    } catch (error) {
      toast.error('Failed to load vets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Nearby Vet Finder</h1>
            <p className="text-gray-600 dark:text-gray-400">Find trusted veterinarians near you</p>
          </div>
          <Link to="/add-vet" className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> Register a Vet
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vets.map((vet, i) => (
            <motion.div
              key={vet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-400 to-primary-400 flex items-center justify-center">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                {vet.emergency && (
                  <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold">
                    24/7
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{vet.name}</h3>
              
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.floor(vet.rating) ? 'text-warm-400 fill-warm-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{vet.rating}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  {vet.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 text-secondary-500" />
                  {vet.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 text-warm-500" />
                  {vet.hours}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Navigation className="w-4 h-4 text-green-500" />
                  {vet.distance}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {vet.services.map((service, j) => (
                  <span key={j} className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                    {service}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${vet.name} ${vet.address}`)}`, '_blank')}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-lg transition-shadow"
              >
                Get Directions
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default VetFinderPage;
