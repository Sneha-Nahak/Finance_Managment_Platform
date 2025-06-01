const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const Claim = require('../models/Claim');
const User = require('../models/User');

const ClaimRouter = express.Router();

// Ensure uploads/claims folder exists
const uploadDir = path.join(__dirname, '../uploads/claims');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Optional: file type filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed'));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

// ====== Routes ====== //

// POST: Submit a new claim (with file)
ClaimRouter.post('/', auth, upload.single('document'), async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ error: 'Only customers can file claims.' });
    }

    const { policyId, description } = req.body;

    const claim = new Claim({
      customerId: req.user._id,
      policyId,
      description,
      status: 'pending',
      documentPath: req.file ? `/uploads/claims/${req.file.filename}` : null
    });

    await claim.save();
    res.status(201).json({ message: 'Claim submitted successfully', claim });
  } catch (err) {
    console.error('Claim submission error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: List all claims for current customer or all claims for agent
ClaimRouter.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'agent' ? {} : { customerId: req.user._id };
    const claims = await Claim.find(query).populate('policyId', 'type');
    res.json(claims);
  } catch (err) {
    console.error('Error fetching claims:', err);
    res.status(500).json({ error: 'Failed to fetch claims' });
  }
});

// GET: Get claim by ID
ClaimRouter.get('/:id', auth, async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id).populate('policyId');

    if (!claim) return res.status(404).json({ error: 'Claim not found' });
    if (req.user.role !== 'agent' && claim.customerId.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(claim);
  } catch (err) {
    console.error('Error fetching claim:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT: Approve/Reject Claim (agent only)
ClaimRouter.put('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'agent') {
      return res.status(403).json({ error: 'Only agents can update claim status' });
    }

    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be "approved" or "rejected"' });
    }

    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ error: 'Claim not found' });

    claim.status = status;
    await claim.save();

    res.json({ message: `Claim ${status}`, claim });
  } catch (err) {
    console.error('Error updating claim status:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE: Delete claim and remove uploaded file (customer or agent)
ClaimRouter.delete('/:id', auth, async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ error: 'Claim not found' });

    if (req.user.role !== 'agent' && claim.customerId.toString() !== req.user._id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (claim.documentPath) {
      const filePath = path.join(__dirname, '..', claim.documentPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Claim.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Claim deleted successfully' });
  } catch (err) {
    console.error('Error deleting claim:', err);
    res.status(500).json({ error: 'Failed to delete claim' });
  }
});

module.exports = ClaimRouter;