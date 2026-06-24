import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Stethoscope, Tag, X } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ pet: '', title: '', content: '', category: 'general', tags: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [notesRes, petsRes] = await Promise.all([
        api.get('/notes'),
        api.get('/pets')
      ]);
      setNotes(notesRes.data.notes);
      setPets(petsRes.data.pets);
    } catch (error) {
      toast.error('Failed to load notes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      if (editingNote) {
        await api.put(`/notes/${editingNote._id}`, data);
        toast.success('Note updated');
      } else {
        await api.post('/notes', data);
        toast.success('Note created');
      }
      setShowForm(false);
      setEditingNote(null);
      setFormData({ pet: '', title: '', content: '', category: 'general', tags: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to save note');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted');
      fetchData();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const startEdit = (note) => {
    setEditingNote(note);
    setFormData({
      pet: note.pet?._id || '',
      title: note.title,
      content: note.content,
      category: note.category,
      tags: note.tags?.join(', ') || ''
    });
    setShowForm(true);
  };

  const categoryColors = {
    behavior: 'bg-purple-100 text-purple-600',
    health: 'bg-red-100 text-red-600',
    training: 'bg-blue-100 text-blue-600',
    general: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pet Notes</h1>
            <p className="text-gray-600 dark:text-gray-400">Keep track of behaviors, health observations, and training progress</p>
          </div>
          <button onClick={() => { setShowForm(!showForm); setEditingNote(null); setFormData({ pet: '', title: '', content: '', category: 'general', tags: '' }); }} className="btn-primary flex items-center gap-2">
            {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {showForm ? 'Cancel' : 'New Note'}
          </button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="card mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{editingNote ? 'Edit Note' : 'Create Note'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pet *</label>
                  <select required value={formData.pet} onChange={e => setFormData({...formData, pet: e.target.value})} className="input-field">
                    <option value="">Select pet...</option>
                    {pets.map(pet => <option key={pet._id} value={pet._id}>{pet.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="input-field">
                    {['general', 'behavior', 'health', 'training'].map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-field" placeholder="Note title..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content *</label>
                <textarea required rows={4} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="input-field" placeholder="Write your observations..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma separated)</label>
                <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="input-field" placeholder="playful, anxious, training..." />
              </div>
              <button type="submit" className="btn-primary w-full">{editingNote ? 'Update Note' : 'Create Note'}</button>
            </form>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 card text-center py-16">
              <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notes yet</h3>
              <p className="text-gray-500 dark:text-gray-400">Create your first note to track pet behaviors and health</p>
            </div>
          ) : (
            notes.map((note, i) => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[note.category]}`}>
                    {note.category}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => startEdit(note)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-primary-500 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(note._id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{note.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{note.content}</p>

                {note.pet && (
                  <p className="text-xs text-primary-500 mb-3">{note.pet.name}</p>
                )}

                {note.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-3">{new Date(note.createdAt).toLocaleDateString()}</p>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NotesPage;
