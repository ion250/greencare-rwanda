// controllers/publishedDocumentController.js
const asyncHandler = require('express-async-handler');
const PublishedDocument = require('../models/PublishedDocument');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get all published documents
// @route   GET /api/documents/published
// @access  Public
const getPublishedDocuments = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const totalDocuments = await PublishedDocument.countDocuments();
    const documents = await PublishedDocument.find()
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: documents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments,
        hasNextPage: page < Math.ceil(totalDocuments / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error in getPublishedDocuments:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Get published document by ID
// @route   GET /api/documents/published/:id
// @access  Public
const getPublishedDocumentById = asyncHandler(async (req, res) => {
  try {
    const document = await PublishedDocument.findById(req.params.id)
      .populate('uploadedBy', 'name email');

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    console.error('Error in getPublishedDocumentById:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// @desc    Create a new published document
// @route   POST /api/documents/published
// @access  Private/Admin
const createPublishedDocument = asyncHandler(async (req, res) => {
  try {
    // Validate required fields
    const { title, description } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Description is required'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'PDF file is required'
      });
    }

    // Validate file type
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      // Clean up the uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Only PDF files are allowed'
      });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (req.file.size > maxSize) {
      // Clean up the uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'File size cannot exceed 10MB'
      });
    }

    const document = await PublishedDocument.create({
      title: title.trim(),
      description: description.trim(),
      fileUrl: `/uploads/documents/${req.file.filename}`,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      uploadedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: document,
      message: 'Document created successfully'
    });
  } catch (error) {
    console.error('Error in createPublishedDocument:', error);
    
    // Clean up file if creation fails
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Failed to cleanup uploaded file:', unlinkError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create document',
      error: error.message
    });
  }
});

// @desc    Update a published document
// @route   PUT /api/documents/published/:id
// @access  Private/Admin
const updatePublishedDocument = asyncHandler(async (req, res) => {
  try {
    const document = await PublishedDocument.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    const { title, description } = req.body;

    // Update fields if provided
    if (title !== undefined) document.title = title.trim();
    if (description !== undefined) document.description = description.trim();

    let oldFilePath = null;

    // If new file is uploaded, update file information
    if (req.file) {
      // Store old file path for cleanup
      if (document.fileUrl) {
        oldFilePath = path.join(__dirname, '..', document.fileUrl);
      }

      // Validate file type
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        // Clean up the newly uploaded file
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'Only PDF files are allowed'
        });
      }

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (req.file.size > maxSize) {
        // Clean up the newly uploaded file
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'File size cannot exceed 10MB'
        });
      }

      // Update document with new file info
      document.fileUrl = `/uploads/documents/${req.file.filename}`;
      document.fileName = req.file.originalname;
      document.fileSize = req.file.size;
      document.fileType = req.file.mimetype;
    }

    const updatedDocument = await document.save();

    // Clean up old file after successful save
    if (oldFilePath && fs.existsSync(oldFilePath)) {
      try {
        fs.unlinkSync(oldFilePath);
      } catch (unlinkError) {
        console.error('Failed to cleanup old file:', unlinkError);
      }
    }

    res.json({
      success: true,
      data: updatedDocument,
      message: 'Document updated successfully'
    });
  } catch (error) {
    console.error('Error in updatePublishedDocument:', error);
    
    // Clean up new file if update fails
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Failed to cleanup uploaded file:', unlinkError);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update document',
      error: error.message
    });
  }
});

// @desc    Delete a published document
// @route   DELETE /api/documents/published/:id
// @access  Private/Admin
const deletePublishedDocument = asyncHandler(async (req, res) => {
  try {
    const document = await PublishedDocument.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Store file path for cleanup
    const filePath = document.fileUrl ? path.join(__dirname, '..', document.fileUrl) : null;

    // Remove document from database
    await document.remove();

    // Clean up file from filesystem
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (unlinkError) {
        console.error('Failed to cleanup file:', unlinkError);
        // Continue with response even if file cleanup fails
      }
    }

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    console.error('Error in deletePublishedDocument:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete document',
      error: error.message
    });
  }
});

module.exports = {
  getPublishedDocuments,
  getPublishedDocumentById,
  createPublishedDocument,
  updatePublishedDocument,
  deletePublishedDocument
};