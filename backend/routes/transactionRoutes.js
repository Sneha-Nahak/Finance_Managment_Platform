const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const TransactionRouter = express.Router();

// Get all transactions for logged-in customer
TransactionRouter.get('/', auth, async (req, res) => {
  if (req.user.role !== 'customer') return res.status(403).json({ error: 'Access denied' });

  try {
    const transactions = await Transaction.find({ customerId: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

module.exports = TransactionRouter;
