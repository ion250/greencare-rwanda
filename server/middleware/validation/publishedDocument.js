// middleware/publishedDocument.js
const validator = require('validator');
const path = require('path');

/**
 * Middleware to validate published document data
 * Validates title, description, and file upload for published documents
 */
const validatePublishedDocument = (req, res, next) => {
  const errors = [];
  
  // Validate title
  if (!req.body.title || !req.body.title.trim()) {
    errors.push('Title is required');
  } else if (req.body.title.trim().length > 200) {
    errors.push('Title cannot exceed 200 characters');
  }
  
  // Validate description
  if (!req.body.description || !req.body.description.trim()) {
    errors.push('Description is required');
  } else if (req.body.description.trim().length > 1000) {
    errors.push('Description cannot exceed 1000 characters');
  }
  
  // Validate file upload
  if (!req.file && !req.body.existingFileId) {
    errors.push('PDF file is required');
  } else if (req.file) {
    const allowedTypes = ['application/pdf'];
    
    // Check file type
    if (!allowedTypes.includes(req.file.mimetype)) {
      errors.push('Only PDF files are allowed');
    }
    
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (req.file.size > maxSize) {
      errors.push('File size cannot exceed 10MB');
    }
    
    // Check file extension
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (ext !== '.pdf') {
      errors.push('Only PDF files are allowed');
    }
  }
  
  // Return validation errors if any
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: Array.from(new Set(errors)) // Remove duplicates
    });
  }
  
  // Add trimmed values to req.body for consistency
  if (req.body.title) {
    req.body.title = req.body.title.trim();
  }
  
  if (req.body.description) {
    req.body.description = req.body.description.trim();
  }
  
  next();
};

/**
 * Enhanced validation middleware with additional security checks
 * Use this for more comprehensive validation
 */
const validatePublishedDocumentEnhanced = (req, res, next) => {
  const errors = [];
  
  try {
    // Input sanitization and validation
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    
    // Validate title
    if (!title) {
      errors.push('Title is required');
    } else {
      // XSS prevention - basic check for script tags
      if (/<script/i.test(title)) {
        errors.push('Title contains invalid characters');
      }
      
      if (title.length > 200) {
        errors.push('Title cannot exceed 200 characters');
      }
    }
    
    // Validate description
    if (!description) {
      errors.push('Description is required');
    } else {
      // XSS prevention - basic check for script tags
      if (/<script/i.test(description)) {
        errors.push('Description contains invalid characters');
      }
      
      if (description.length > 1000) {
        errors.push('Description cannot exceed 1000 characters');
      }
    }
    
    // Validate file upload
    if (!req.file && !req.body.existingFileId) {
      errors.push('PDF file is required');
    } else if (req.file) {
      const allowedTypes = ['application/pdf'];
      
      // Security checks
      if (!allowedTypes.includes(req.file.mimetype)) {
        errors.push('Only PDF files are allowed');
      }
      
      // File size limit (10MB)
      const maxSize = 10 * 1024 * 1024;
      if (req.file.size > maxSize) {
        errors.push('File size cannot exceed 10MB');
      }
      
      // File name validation
      const fileName = req.file.originalname;
      if (fileName.length > 255) {
        errors.push('File name is too long');
      }
      
      // Extension validation
      const ext = path.extname(fileName).toLowerCase();
      if (ext !== '.pdf') {
        errors.push('Only PDF files are allowed');
      }
      
      // Check for potentially dangerous characters in filename
      const dangerousChars = /[<>:"|?*\\]/;
      if (dangerousChars.test(fileName)) {
        errors.push('File name contains invalid characters');
      }
    }
    
    // Return validation errors if any
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Array.from(new Set(errors))
      });
    }
    
    // Attach sanitized values to request object
    req.body.title = title;
    req.body.description = description;
    
    next();
  } catch (error) {
    console.error('Validation middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during validation'
    });
  }
};

module.exports = {
  validatePublishedDocument,
  validatePublishedDocumentEnhanced
};