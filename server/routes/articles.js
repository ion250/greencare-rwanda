const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Article = require('../models/Article');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🧱 Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `article-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

// ✅ GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ success: true, articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ GET total article count (must be above slug route)
router.get('/count', async (req, res) => {
  try {
    const count = await Article.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    console.error('Error fetching article count:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ GET article by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ CREATE new article (protected)
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { title, description, content, author } = req.body;

    // Validation
    if (!title || !description || !content || !author) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Generate slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    // Check if article exists
    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      return res.status(400).json({ success: false, message: 'An article with this title already exists' });
    }

    // Handle uploaded image
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const article = new Article({
      title,
      description,
      content,
      author,
      slug,
      image: imageUrl
    });

    await article.save();
    res.status(201).json({ success: true, article });
  } catch (error) {
    console.error('Error creating article:', error);
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to remove uploaded file:', err);
      });
    }
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// ✅ UPDATE article (protected)
router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, author } = req.body;

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    if (title) {
      article.title = title;
      article.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }
    if (description) article.description = description;
    if (content) article.content = content;
    if (author) article.author = author;

    if (req.file) {
      if (article.image) {
        const oldPath = path.join(__dirname, '..', article.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      article.image = `/uploads/${req.file.filename}`;
    }

    await article.save();
    res.json({ success: true, article });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ DELETE article (protected)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    if (article.image) {
      const imagePath = path.join(__dirname, '..', article.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
