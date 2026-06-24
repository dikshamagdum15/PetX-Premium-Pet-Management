import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Heart, Trash2, Image as ImageIcon } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

// Double-check that 'pet-placeholder.png' exists in your src/assets folder.
// If your file is a .jpg, change the extension below.
import petPlaceholder from '../assets/pet.jpg';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState('');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [imagesRes, petsRes] = await Promise.all([
        api.get('/gallery'),
        api.get('/pets')
      ]);
      console.log('Fetched gallery images:', imagesRes.data.images); // Add this line for debugging
      console.log('Fetched pets for gallery:', petsRes.data.pets); // Add this line for debugging
      setImages(imagesRes.data.images);
      setPets(petsRes.data.pets);
    } catch (error) {
      toast.error('Failed to load gallery');
    }
  };

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedPet) {
      toast.error('Please select a pet and image');
      return;
    }
    try {
      const data = new FormData();
      data.append('image', file);
      data.append('petId', selectedPet);
      if (caption) data.append('caption', caption);
      await api.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Image uploaded');
      setFile(null);
      setPreview(null);
      setCaption('');
      fetchData();
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Image deleted');
      fetchData();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const handleLike = async (id) => {
    try {
      await api.post(`/gallery/${id}/like`);
      fetchData();
    } catch (error) {
      toast.error('Like failed');
    }
  };

  // Helper to get the full image URL from the backend
  const getImageUrl = (url) => {
    if (!url) return petPlaceholder;
    // If your backend is on port 5000, we prepend it. 
    // Adjust 'http://localhost:5000' if your server runs elsewhere.
    return `http://localhost:5000/uploads/${url}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pet Gallery</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Capture and cherish every moment</p>

        {/* Upload Form */}
        <div className="card mb-8">
          <form onSubmit={handleUpload} className="flex flex-col md:flex-row items-end gap-4">
            {preview && (
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-primary-500 mb-2 md:mb-0">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Pet</label>
              <select value={selectedPet} onChange={e => setSelectedPet(e.target.value)} className="input-field">
                {pets.length === 0 ? (
                  <option value="" disabled>No pets found. Add a pet first.</option>
                ) : (
                  <option value="">Choose a pet...</option>
                )}
                {pets.map(pet => (
                  <option key={pet._id} value={pet._id}>{pet.name} ({pet.species})</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Caption</label>
              <input value={caption} onChange={e => setCaption(e.target.value)} className="input-field" placeholder="Cute moment..." />
            </div>
            <div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="gallery-upload" />
              <label htmlFor="gallery-upload" className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-500 cursor-pointer transition-colors">
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{file ? file.name : 'Choose image'}</span>
              </label>
            </div>
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="card text-center py-16">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No photos yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Upload your first pet photo above</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, i) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 aspect-square"
              >
                <img 
                  src={getImageUrl(image.url)} 
                  alt={image.caption} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = petPlaceholder;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium truncate">{image.caption}</p>
                    <p className="text-white/70 text-xs capitalize">{image.pet?.name}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => handleLike(image._id)} className="flex items-center gap-1 text-white/80 hover:text-red-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">{image.likes}</span>
                      </button>
                      <button onClick={() => handleDelete(image._id)} className="text-white/80 hover:text-red-400 transition-colors ml-auto">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GalleryPage;
