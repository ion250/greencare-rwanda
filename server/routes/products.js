const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const authenticate = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get all products
router.get('/', authenticate, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products count
router.get('/count', authenticate, async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    // Handle image upload
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const product = new Product({
      name,
      description,
      price: price ? parseFloat(price) : 0,
      category: category || 'compost',
      image: imageUrl
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    // Handle image upload
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updateData = {
      name,
      description,
      price: price ? parseFloat(price) : 0,
      category,
      updatedAt: Date.now()
    };

    // Only update image if a new one is provided
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;