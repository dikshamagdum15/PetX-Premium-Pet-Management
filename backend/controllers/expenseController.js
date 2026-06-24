const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const { petId } = req.query;
    let query = { user: req.user.id };
    if (petId) query.pet = petId;

    const expenses = await Expense.find(query).populate('pet', 'name').sort({ date: -1 });
    res.json({ success: true, count: expenses.length, expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, user: req.user.id });
    res.status(201).json({ success: true, expense });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};