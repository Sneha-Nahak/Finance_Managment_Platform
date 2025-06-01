const express = require('express');
const Policy = require('../models/Policy');
const auth = require('../middleware/auth'); // Assuming this middleware populates req.user

const PolicyRouter = express.Router();

// Create Policy (Agent only)
PolicyRouter.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'agent')
      return res.status(403).json({ message: 'Access denied' });

    const { type, coverage, premium, terms } = req.body;

    // Basic validation
    if (!type || !coverage || !premium || !terms) {
      return res.status(400).json({ message: 'Missing required policy fields' });
    }

    const policy = new Policy({
      type,
      coverage,
      premium,
      terms,
      agentId: req.user._id,
    });

    await policy.save();
    res.status(201).json(policy);
  } catch (err) {
    console.error('Create policy error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all policies (any authenticated user) - General list
PolicyRouter.get('/', auth, async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (err) {
    console.error('Fetch policies error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// NEW: Get policies created by the logged-in agent - MORE SPECIFIC, placed BEFORE /:id
PolicyRouter.get('/my', auth, async (req, res) => {
  try {
    if (req.user.role !== 'agent') {
      return res.status(403).json({ message: 'Access denied. Only agents can view their own policies.' });
    }
    const policies = await Policy.find({ agentId: req.user._id });
    res.json(policies);
  } catch (err) {
    console.error('Fetch agent policies error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single policy by ID (any authenticated user) - LESS SPECIFIC, placed AFTER /my
PolicyRouter.get('/:id', auth, async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy)
      return res.status(404).json({ message: 'Policy not found' });

    res.json(policy);
  } catch (err) {
    console.error('Fetch single policy error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Policy (Agent only, must own policy)
PolicyRouter.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'agent')
      return res.status(403).json({ message: 'Access denied' });

    const policy = await Policy.findById(req.params.id);
    if (!policy)
      return res.status(404).json({ message: 'Policy not found' });

    if (policy.agentId.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You can only update your own policies' });
    }

    const updates = ['type', 'coverage', 'premium', 'terms'];
    updates.forEach(field => {
      if (req.body[field] !== undefined) {
        policy[field] = req.body[field];
      }
    });

    await policy.save();
    res.json(policy);
  } catch (err) {
    console.error('Update policy error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Policy (Agent only, must own policy)
PolicyRouter.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'agent')
      return res.status(403).json({ message: 'Access denied' });

    const policy = await Policy.findById(req.params.id);
    if (!policy)
      return res.status(404).json({ message: 'Policy not found' });

    if (String(policy.agentId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only delete your own policies' });
    }

    await Policy.findByIdAndDelete(req.params.id);
    res.json({ message: 'Policy deleted successfully' });
  } catch (err) {
    console.error('Delete policy error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = PolicyRouter;
