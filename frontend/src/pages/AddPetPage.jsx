import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Upload, ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AddPetPage = () => {
  const [formData, setFormData] = useState({
    name: '', species: 'dog', breed: '', age: { years: 0, months: 0 },
    weight: { value: '', unit: 'kg' }, gender: 'unknown', color: ''
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setPhoto(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'object') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });
      if (photo) data.append('photo', photo);

      await api.post('/pets', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Pet added successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add pet');
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Add New Pet</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field" placeholder="Buddy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Species *</label>
                <select value={formData.species} onChange={e => setFormData({...formData, species: e.target.value})} className="input-field">
                  {['dog', 'cat', 'bird', 'rabbit', 'fish', 'hamster', 'other'].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Breed *</label>
                <input required value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} className="input-field" placeholder="Golden Retriever" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
                <input value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="input-field" placeholder="Golden" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age (Years)</label>
                  <input type="number" min="0" value={formData.age.years} onChange={e => setFormData({...formData, age: {...formData.age, years: parseInt(e.target.value) || 0}})} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age (Months)</label>
                  <input type="number" min="0" max="11" value={formData.age.months} onChange={e => setFormData({...formData, age: {...formData.age, months: parseInt(e.target.value) || 0}})} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight</label>
                  <input type="number" step="0.1" value={formData.weight.value} onChange={e => setFormData({...formData, weight: {...formData.weight, value: e.target.value}})} className="input-field" placeholder="10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label>
                  <select value={formData.weight.unit} onChange={e => setFormData({...formData, weight: {...formData.weight, unit: e.target.value}})} className="input-field">
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="input-field">
                  <option value="unknown">Unknown</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photo</label>
                {preview && (
                  <div className="mb-3">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-xl object-cover border-2 border-primary-500" 
                    />
                  </div>
                )}
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="pet-photo" />
                  <label htmlFor="pet-photo" className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-500 cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]">{photo ? photo.name : 'Upload photo'}</span>
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Plus className="w-5 h-5" /> Add Pet</>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddPetPage;
