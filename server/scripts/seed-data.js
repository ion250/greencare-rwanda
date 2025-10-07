const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Article = require('../models/Article');
const Product = require('../models/Product');
const User = require('../models/User');
const articlesData = require('../data/articles');
const productsData = require('../data/products');
const usersData = require('../data/users');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/greencare', )
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing data
    await Article.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');
    
    // Hash passwords for users
    const salt = await bcrypt.genSalt(10);
    const usersWithHashedPasswords = await Promise.all(
      usersData.map(async (user) => {
        const hashedPassword = await bcrypt.hash('password123', salt);
        return { ...user, password: hashedPassword };
      })
    );
    
    // Insert data
    const articles = await Article.insertMany(articlesData);
    console.log(`Inserted ${articles.length} articles`);
    
    const products = await Product.insertMany(productsData);
    console.log(`Inserted ${products.length} products`);
    
    const users = await User.insertMany(usersWithHashedPasswords);
    console.log(`Inserted ${users.length} users`);
    
    console.log('Database seeded successfully!');
    
    // Display some statistics
    console.log('\nDashboard Statistics:');
    console.log(`Articles: ${articles.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Users: ${users.length}`);
    
    // Create recent activity data
    const recentActivity = [
      { type: 'article', action: 'Published', details: articles[0].title, time: '2 hours ago' },
      { type: 'user', action: 'Registered', details: users[1].name, time: '1 day ago' },
      { type: 'product', action: 'Added', details: products[0].name, time: '3 days ago' },
      { type: 'article', action: 'Published', details: articles[1].title, time: '5 days ago' },
      { type: 'user', action: 'Registered', details: users[2].name, time: '1 week ago' }
    ];
    
    console.log('\nRecent Activity:');
    recentActivity.forEach(activity => {
      console.log(`${activity.action} ${activity.details} - ${activity.time}`);
    });
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
})
.catch(err => {
  console.error('Could not connect to MongoDB:', err);
});