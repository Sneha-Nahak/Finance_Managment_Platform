const express = require('express');
const FAQ = require('../models/FAQ');
const SupportTicket = require('../models/SupportTicket');
const auth = require('../middleware/auth');

const SupportRouter = express.Router();

// Get all FAQs (public)
SupportRouter.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Submit a support ticket (customer only)
SupportRouter.post('/tickets', auth, async (req, res) => {
  if (req.user.role !== 'customer') return res.status(403).json({ error: 'Access denied' });

  const { subject, message } = req.body;
  if (!subject || !message) return res.status(400).json({ error: 'Subject and message are required' });

  try {
    const ticket = new SupportTicket({
      customerId: req.user._id,
      subject,
      message
    });
    await ticket.save();
    res.status(201).json({ message: 'Support ticket created', ticket });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create support ticket' });
  }
});

// Get all support tickets (agent only)
SupportRouter.get('/tickets', auth, async (req, res) => {
  if (req.user.role !== 'agent') return res.status(403).json({ error: 'Access denied' });

  try {
    const tickets = await SupportTicket.find().populate('customerId', 'name email');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch support tickets' });
  }
});

// Update support ticket status and assign agent (agent only)
SupportRouter.put('/tickets/:id', auth, async (req, res) => {
  if (req.user.role !== 'agent') return res.status(403).json({ error: 'Access denied' });

  const { status } = req.body;
  if (!['open', 'in-progress', 'closed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Support ticket not found' });

    ticket.status = status;
    ticket.agentId = req.user._id;
    await ticket.save();

    res.json({ message: 'Support ticket updated', ticket });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update support ticket' });
  }
});

module.exports = SupportRouter;
