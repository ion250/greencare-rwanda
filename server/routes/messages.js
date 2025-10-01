// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// POST /api/messages - Create a new message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email is invalid'
      });
    }

    // Create new message
    const newMessage = new Message({
      name,
      email,
      phone,
      message
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      message: newMessage
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message'
    });
  }
});

// GET /api/messages - Get all messages (admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const messages = await Message.find()
      .sort({ createdAt: -1 });
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      message: 'Error fetching messages'
    });
  }
});

// GET /api/messages/unread - Get unread messages count (admin only)
router.get('/unread', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const count = await Message.countDocuments({ status: 'unread' });
    
    res.json({ count });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({
      message: 'Error fetching unread count'
    });
  }
});

// PUT /api/messages/:id/read - Mark message as read (admin only)
router.put('/:id/read', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'read',
        readAt: new Date()
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        message: 'Message not found'
      });
    }

    res.json(message);
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      message: 'Error updating message status'
    });
  }
});

// PUT /api/messages/:id/replied - Mark message as replied (admin only)
router.put('/:id/replied', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'replied',
        repliedAt: new Date()
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        message: 'Message not found'
      });
    }

    res.json(message);
  } catch (error) {
    console.error('Error marking message as replied:', error);
    res.status(500).json({
      message: 'Error updating message status'
    });
  }
});

// DELETE /api/messages/:id - Delete message (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: 'Message not found'
      });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      message: 'Error deleting message'
    });
  }
});

module.exports = router;