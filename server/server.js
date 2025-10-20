const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const publishedDocumentRoutes = require('./routes/publishedDocumentRoutes');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files - Make sure this is correct
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// API routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', require('./routes/orders'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/documents', require('./routes/publishedDocumentRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/greencare',)

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Root routes
app.get('/', (req, res) => {
  res.json({ message: 'GreenCare Rwanda API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;