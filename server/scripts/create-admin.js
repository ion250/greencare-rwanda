const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import the User model
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/greencare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      email: 'ishimwenolivier@gmail.com' 
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists with email: ishimwenolivier@gmail.com');
      console.log('User details:', {
        name: existingAdmin.name,
        email: existingAdmin.email,
        role: existingAdmin.role
      });
      mongoose.disconnect();
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('qwerty123', salt);

    // Create admin user with your specified credentials
    const admin = new User({
      name: 'olivier',
      email: 'ishimwenolivier@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    // Save to database
    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Name: olivier');
    console.log('Email: ishimwenolivier@gmail.com');
    console.log('Password: qwerty123');
    console.log('Role: admin');
    console.log('\nYou can now log in with these credentials.');
    
    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.disconnect();
  }
})
.catch(err => {
  console.error('Could not connect to MongoDB:', err);
});