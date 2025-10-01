// middleware/fileUpload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads/documents');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `document-${uniqueSuffix}${ext}`);
  }
});

// File filter with enhanced PDF validation
const fileFilter = (req, file, cb) => {
  // Check file type
  const allowedTypes = ['application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    // Additional check for .pdf extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

// Multer instance with comprehensive configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1 // Limit to 1 file per upload
  }
});

// Middleware to serve uploaded files
const serveUploadedFiles = (app) => {
  // Serve static files from uploads directory
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  
  // Add headers for PDF viewing in browser
  app.use('/uploads/documents/*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    next();
  });
};

// Utility function to get file info
const getFileInfo = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return {
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime
    };
  } catch (error) {
    return null;
  }
};

// Utility function to validate PDF file integrity
const validatePdfFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return { valid: false, error: 'File does not exist' };
    }
    
    const buffer = fs.readFileSync(filePath);
    // Check if file starts with PDF header
    if (buffer.length < 4 || 
        buffer[0] !== 0x25 || 
        buffer[1] !== 0x50 || 
        buffer[2] !== 0x44 || 
        buffer[3] !== 0x46) {
      return { valid: false, error: 'Invalid PDF file format' };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

module.exports = {
  upload,
  serveUploadedFiles,
  getFileInfo,
  validatePdfFile,
  uploadDir
};