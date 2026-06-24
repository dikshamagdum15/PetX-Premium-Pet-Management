const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getExpenses, addExpense } = require('../controllers/expenseController');

router.get('/', auth, getExpenses);
router.post('/', auth, addExpense);

module.exports = router;