import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft, Stethoscope, MapPin, Phone, Clock } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AddVetPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    hours: '9:00 AM - 6:00 PM',
    services: '',
    emergency: false,
    rating: 5.0
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        services: formData.services.split(',').map(s => s.trim()).filter(Boolean)
      };
      await api.post('/vets', data);
      toast.success('Veterinarian registered successfully!');
      navigate('/vet-finder');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register vet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-6">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary-400 to-primary-400 flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Register Veterinarian</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Clinic/Vet Name *</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field" placeholder="Happy Paws Veterinary Clinic" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="input-field pl-12" placeholder="123 Pet Lane, Animal City" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input-field pl-12" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Operating Hours</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={formData.hours} onChange={e => setFormData({...formData, hours: e.target.value})} className="input-field pl-12" placeholder="Mon-Fri: 9AM - 6PM" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Services Offered (comma separated)</label>
                <input value={formData.services} onChange={e => setFormData({...formData, services: e.target.value})} className="input-field" placeholder="Vaccinations, Surgery, Dental, Grooming" />
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <input 
                  type="checkbox" 
                  id="emergency"
                  checked={formData.emergency} 
                  onChange={e => setFormData({...formData, emergency: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="emergency" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Offers 24/7 Emergency Services
                </label>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50 flex items-center justify-center gap-2 py-4">
              {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Plus className="w-5 h-5" /> Add Veterinarian</>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddVetPage;