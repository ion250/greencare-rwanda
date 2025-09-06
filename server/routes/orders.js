// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders - Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// GET /api/orders/count - Get total count of orders
router.get('/count', async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order count' });
  }
});

// GET /api/orders/:id - Get specific order
router.get('/:id', async (req, res) => {
  try {
    // Check if the ID is 'count' and handle it separately
    if (req.params.id === 'count') {
      const count = await Order.countDocuments();
      return res.json({ count });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Other routes (POST, PUT, DELETE) remain the same
// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      quantity,
      unit,
      deliveryAddress,
      deliveryDate,
      specialInstructions
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !quantity || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled'
      });
    }

    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0'
      });
    }

    // Create new order
    const order = new Order({
      name,
      email,
      phone,
      product: 'Grekompost',
      quantity: parseInt(quantity),
      unit,
      deliveryAddress,
      deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
      specialInstructions: specialInstructions || ''
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: order
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order'
    });
  }
});

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      message: 'Error updating order status'
    });
  }
});

module.exports = router;