const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const CustomerRouter = express.Router();

CustomerRouter.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

CustomerRouter.put('/me', auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
  res.send(user);
});

module.exports = CustomerRouter;
