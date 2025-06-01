const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['payment', 'renewal', 'claim_payout'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: String,  // Optional description or details
});

module.exports = mongoose.model('Transaction', TransactionSchema);
