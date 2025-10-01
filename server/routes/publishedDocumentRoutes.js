const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const PublishedDocument = require("../models/PublishedDocument");

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads/documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup with enhanced configuration
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

// File filter for PDF files only
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

// Multer instance with limits and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1
  }
});

// Error handling middleware for multer
const multerErrorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        message: 'File size cannot exceed 10MB' 
      });
    }
    return res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  } else if (error.message === 'Only PDF files are allowed') {
    return res.status(400).json({ 
      success: false, 
      message: 'Only PDF files are allowed' 
    });
  }
  next(error);
};

// GET all documents with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalDocuments = await PublishedDocument.countDocuments();
    const documents = await PublishedDocument.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ 
      success: true, 
      documents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalDocuments / limit),
        totalDocuments,
        hasNextPage: page < Math.ceil(totalDocuments / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET document by ID
router.get("/:id", async (req, res) => {
  try {
    const document = await PublishedDocument.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }
    
    // Increment download count when document is accessed
    if (req.query.incrementDownload) {
      document.downloadCount += 1;
      await document.save();
    }
    
    res.json({ success: true, document });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }
    console.error("GET by ID error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST create new document
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    // Validate required fields
    if (!title || !title.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Title is required" 
      });
    }
    
    if (!description || !description.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: "Description is required" 
      });
    }
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "PDF file is required" 
      });
    }

    // Get user from request (assuming auth middleware sets req.user)
    const uploadedBy = req.user ? req.user._id : null;

    const newDoc = new PublishedDocument({
      title: title.trim(),
      description: description.trim(),
      fileUrl: `/uploads/documents/${req.file.filename}`,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      uploadedBy: uploadedBy
    });

    const savedDoc = await newDoc.save();
    res.status(201).json({ success: true, document: savedDoc });
  } catch (err) {
    // Clean up uploaded file if document creation fails
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkErr) {
        console.error('Failed to cleanup uploaded file:', unlinkErr);
      }
    }
    
    console.error("POST error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}, multerErrorHandler);

// PUT update document
router.put("/:id", upload.single("file"), async (req, res, next) => {
  try {
    const document = await PublishedDocument.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }

    const updateData = { ...req.body };

    // Handle file update
    if (req.file) {
      // Remove old file
      if (document.fileUrl) {
        const oldFilePath = path.join(__dirname, '..', document.fileUrl);
        try {
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        } catch (err) {
          console.error('Failed to delete old file:', err);
        }
      }

      // Update file information
      updateData.fileUrl = `/uploads/documents/${req.file.filename}`;
      updateData.fileName = req.file.originalname;
      updateData.fileSize = req.file.size;
      updateData.fileType = req.file.mimetype;
    }

    // Update other fields
    if (updateData.title) updateData.title = updateData.title.trim();
    if (updateData.description) updateData.description = updateData.description.trim();

    const updatedDoc = await PublishedDocument.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, document: updatedDoc });
  } catch (err) {
    // Clean up newly uploaded file if update fails
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkErr) {
        console.error('Failed to cleanup uploaded file:', unlinkErr);
      }
    }
    
    if (err.name === 'CastError') {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }
    
    console.error("PUT error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}, multerErrorHandler);

// DELETE document
router.delete("/:id", async (req, res) => {
  try {
    const document = await PublishedDocument.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }

    // Remove file from filesystem
    if (document.fileUrl) {
      const filePath = path.join(__dirname, '..', document.fileUrl);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error('Failed to delete file:', err);
        // Continue with deletion even if file deletion fails
      }
    }

    await PublishedDocument.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Document deleted successfully" });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ 
        success: false, 
        message: "Document not found" 
      });
    }
    console.error("DELETE error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;