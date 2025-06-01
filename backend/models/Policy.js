const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  type: { type: String, enum: ['health', 'auto', 'home'], required: true },
  coverage: { type: String, required: true },
  premium: { type: Number, required: true },
  terms: { type: String, required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PolicySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Policy', PolicySchema);
