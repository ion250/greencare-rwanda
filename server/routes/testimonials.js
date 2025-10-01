// routes/testimonials.js
const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// GET /api/testimonials - Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 });
    
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      message: 'Error fetching testimonials'
    });
  }
});

// GET /api/testimonials/featured - Get featured testimonials
router.get('/featured', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ featured: true })
      .sort({ createdAt: -1 });
    
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching featured testimonials:', error);
    res.status(500).json({
      message: 'Error fetching featured testimonials'
    });
  }
});

// POST /api/testimonials - Create a new testimonial (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const { name, position, company, content, image, rating, featured } = req.body;

    // Validate required fields
    if (!name || !content || !image) {
      return res.status(400).json({
        message: 'Name, content, and image are required'
      });
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        message: 'Rating must be between 1 and 5'
      });
    }

    // Create new testimonial
    const newTestimonial = new Testimonial({
      name,
      position,
      company,
      content,
      image,
      rating: rating || 5,
      featured: featured || false
    });

    await newTestimonial.save();

    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({
      message: 'Error creating testimonial'
    });
  }
});

// PUT /api/testimonials/:id - Update testimonial (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const { name, position, company, content, image, rating, featured } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { 
        name,
        position,
        company,
        content,
        image,
        rating,
        featured,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        message: 'Testimonial not found'
      });
    }

    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({
      message: 'Error updating testimonial'
    });
  }
});

// DELETE /api/testimonials/:id - Delete testimonial (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.'
      });
    }

    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        message: 'Testimonial not found'
      });
    }

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({
      message: 'Error deleting testimonial'
    });
  }
});

module.exports = router;