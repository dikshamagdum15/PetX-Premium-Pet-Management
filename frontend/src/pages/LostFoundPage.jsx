import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, AlertTriangle, Mail } from 'lucide-react';
import api from '../utils/api';
import petPlaceholder from '../assets/pet.jpg';

const LostFoundPage = () => {
  const [lostPets, setLostPets] = useState([]);

  useEffect(() => {
    api.get('/pets/lost-and-found').then(res => {
      setLostPets(res?.data?.pets || []);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Lost & Found Alert System</h1>
        <p className="text-gray-600">Help reunite these pets with their families.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostPets.map((pet, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card border-2 border-red-100 overflow-hidden">
            <div className="relative h-48 -mx-8 -mt-8 mb-6">
              <img 
                src={pet.photo && pet.photo !== 'default-pet.png' ? `http://localhost:5000/uploads/${pet.photo}` : petPlaceholder} 
                className="w-full h-full object-cover" 
                alt={pet.name} 
              />
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">MISSING</div>
              {pet.status === 'lost' && pet.lastSeenLocation && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm">
                  <MapPin className="inline-block w-4 h-4 mr-1" /> Last seen: {pet.lastSeenLocation}
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{pet.name} ({pet.breed})</h3>
            <div className="space-y-2 mb-4">
              {pet.color && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: pet.color.toLowerCase() }}></span> Color: {pet.color}
                </div>
              )}
              {pet.gender && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="capitalize">{pet.gender}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <AlertTriangle className="w-4 h-4 text-warm-500" /> Reward offered by owner
              </div>
            </div>
            <button 
              onClick={() => {
                if (pet.contactInfo.includes('@')) {
                  window.location.href = `mailto:${pet.contactInfo}`;
                } else {
                  window.location.href = `tel:${pet.contactInfo}`;
                }
              }}
              disabled={!pet.contactInfo}
              className="btn-primary w-full bg-red-600 hover:bg-red-700 border-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pet.contactInfo?.includes('@') ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />} Contact Owner
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default LostFoundPage;