const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  category: { type: String, enum: ['Food', 'Medical', 'Grooming', 'Toys', 'Other'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  note: String
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);