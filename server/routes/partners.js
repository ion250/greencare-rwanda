// routes/partners.js
const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');
const auth = require('../middleware/auth');

// GET /api/partners - Get all partners
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find()
      .sort({ createdAt: -1 });
    
    res.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({
      message: 'Error fetching partners'
    });
  }
});

// POST /api/partners - Create a new partner (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const { name, logo, website, description } = req.body;

    // Validate required fields
    if (!name || !logo) {
      return res.status(400).json({
        message: 'Name and logo are required'
      });
    }

    // Create new partner
    const newPartner = new Partner({
      name,
      logo,
      website,
      description
    });

    await newPartner.save();

    res.status(201).json(newPartner);
  } catch (error) {
    console.error('Error creating partner:', error);
    res.status(500).json({
      message: 'Error creating partner'
    });
  }
});

// PUT /api/partners/:id - Update partner (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const { name, logo, website, description } = req.body;

    const partner = await Partner.findByIdAndUpdate(
      req.params.id,
      { 
        name,
        logo,
        website,
        description,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!partner) {
      return res.status(404).json({
        message: 'Partner not found'
      });
    }

    res.json(partner);
  } catch (error) {
    console.error('Error updating partner:', error);
    res.status(500).json({
      message: 'Error updating partner'
    });
  }
});

// DELETE /api/partners/:id - Delete partner (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const partner = await Partner.findByIdAndDelete(req.params.id);

    if (!partner) {
      return res.status(404).json({
        message: 'Partner not found'
      });
    }

    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    res.status(500).json({
      message: 'Error deleting partner'
    });
  }
});

module.exports = router;