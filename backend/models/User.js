const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
 
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: { type: String, required: true },
   role: { type: String, enum: ['customer', 'agent'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);
