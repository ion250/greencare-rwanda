const express = require('express');
const multer = require('multer');
const path = require('path');
const Article = require('../models/Article');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get article by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get articles count
router.get('/count', async (req, res) => {
  try {
    const count = await Article.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching articles count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new article (protected)
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { title, description, content, author } = req.body;
    
    // Validate required fields
    if (!title || !description || !content || !author) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Create slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Check if slug already exists
    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      return res.status(400).json({ message: 'An article with this title already exists' });
    }
    
    // Handle image upload
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const article = new Article({
      title,
      description,
      content,
      author,
      slug,
      image: imageUrl
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    if (error.message && error.message.includes('Only image files are allowed')) {
      res.status(400).json({ message: 'Only image files are allowed' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Update article (protected)
router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, author } = req.body;
    
    // Find the article
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Update fields
    if (title) {
      // If title changed, update slug
      if (title !== article.title) {
        article.slug = title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      article.title = title;
    }
    
    if (description) article.description = description;
    if (content) article.content = content;
    if (author) article.author = author;
    
    // Handle image upload
    if (req.file) {
      article.image = `/uploads/${req.file.filename}`;
    }
    
    await article.save();
    res.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete article (protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;