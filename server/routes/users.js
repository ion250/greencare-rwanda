const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, async (req, res) => {
  try {
    // Only admin can access all users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server errors' });
  }
});

// Get users count
router.get('/count', authenticate, async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server errorr' });
  }
});

// Get user by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    // Admin can access any user, others can only access their own profile
    if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
      return res.status(403).json({ 
        message: 'Access denied' 
      });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server errora' });
  }
});

// Create new user
router.post('/', authenticate, async (req, res) => {
  try {
    // Only admin can create users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      permissions: getUserPermissions(role)
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server errores' });
  }
});

// Update user
router.put('/:id', authenticate, async (req, res) => {
  try {
    // Only admin can update other users
    if (req.user.role !== 'admin' && req.user.userId !== req.params.id) {
      return res.status(403).json({ 
        message: 'Access denied' 
      });
    }

    const { name, email, role, status } = req.body;
    const updates = { name, email, role, status, updatedAt: Date.now() };

    // Only admin can change role and status
    if (req.user.role !== 'admin') {
      delete updates.role;
      delete updates.status;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true, select: '-password' }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Only admin can delete users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    // Prevent admin from deleting themselves
    if (req.user.userId === req.params.id) {
      return res.status(400).json({ 
        message: 'You cannot delete your own account' 
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error3' });
  }
});

// Helper function to set permissions based on role
function getUserPermissions(role) {
  switch (role) {
    case 'admin':
      return ['read', 'write', 'delete', 'manage_users', 'publish_content'];
    case 'editor':
      return ['read', 'write', 'publish_content'];
    case 'staff':
      return ['read'];
    default:
      return ['read'];
  }
}

module.exports = router;