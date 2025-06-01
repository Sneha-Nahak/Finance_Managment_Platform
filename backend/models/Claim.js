const mongoose = require('mongoose');

const ClaimSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy' },
  description: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  documentPath: String, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Claim', ClaimSchema);
