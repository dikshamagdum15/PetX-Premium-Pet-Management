import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Plus, Filter, PieChart } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ExpenseTrackerPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ pet: '', category: 'Food', amount: '', note: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expRes, petsRes] = await Promise.all([api.get('/expenses'), api.get('/pets')]);
      setExpenses(expRes.data.expenses);
      setPets(petsRes.data.pets);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/expenses', formData);
      toast.success('Expense logged');
      setFormData({ ...formData, amount: '', note: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to log expense');
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Pet Expense Tracker</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="card h-fit">
          <h3 className="font-bold mb-4">Log New Expense</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select required value={formData.pet} onChange={e => setFormData({...formData, pet: e.target.value})} className="input-field">
              <option value="">Select Pet</option>
              {pets.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="input-field">
              {['Food', 'Medical', 'Grooming', 'Toys', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" required placeholder="Amount ($)" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="input-field" />
            <input placeholder="Note (optional)" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="input-field" />
            <button className="btn-primary w-full flex justify-center gap-2"><Plus className="w-5 h-5" /> Log Expense</button>
          </form>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="card flex items-center justify-between">
            <span className="text-gray-600">Total Monthly Spending</span>
            <span className="text-2xl font-bold text-primary-500">${expenses.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}</span>
          </div>
          {expenses.map((exp, i) => (
            <div key={i} className="card flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600"><DollarSign className="w-5 h-5" /></div>
                <div>
                  <p className="font-bold">{exp.category} - {exp.pet?.name}</p>
                  <p className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()} {exp.note && `• ${exp.note}`}</p>
                </div>
              </div>
              <span className="font-bold text-gray-900">${exp.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ExpenseTrackerPage;