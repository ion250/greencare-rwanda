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

// Multer setup
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

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 
    files: 1
  }
});

// Multer error handler
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

// GET all documents — ✅ FIXED: fetch more by default for admin
router.get("/", async (req, res) => {
  try {
    let { page, limit } = req.query;

    // Default: fetch up to 50 documents (good for admin panels)
    // Allow 'all' to fetch up to 1000 (safe cap)
    let parsedLimit = this.all;
    let parsedPage = 1;

    if (limit === 'all') {
      parsedLimit = 1000; // Safe upper bound
    } else if (limit) {
      const numLimit = parseInt(limit, 10);
      if (!isNaN(numLimit) && numLimit > 0) {
        parsedLimit = Math.min(numLimit, 100); // Max 100 if not 'all'
      }
    }

    if (page) {
      const numPage = parseInt(page, 10);
      if (!isNaN(numPage) && numPage > 0) {
        parsedPage = numPage;
      }
    }

    const skip = (parsedPage - 1) * parsedLimit;

    const totalDocuments = await PublishedDocument.countDocuments();
    const documents = await PublishedDocument.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit);

    res.json({ 
      success: true, 
      documents,
      pagination: {
        currentPage: parsedPage,
        totalPages: Math.ceil(totalDocuments / parsedLimit),
        totalDocuments,
        hasNextPage: parsedPage < Math.ceil(totalDocuments / parsedLimit),
        hasPrevPage: parsedPage > 1
      }
    });
  } catch (err) {
    console.error("GET documents error:", err);
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
    // Cleanup file on error
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Cleanup failed:', unlinkErr);
      });
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

    if (req.file) {
      // Delete old file
      if (document.fileUrl) {
        const oldFilePath = path.join(__dirname, '..', document.fileUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      updateData.fileUrl = `/uploads/documents/${req.file.filename}`;
      updateData.fileName = req.file.originalname;
      updateData.fileSize = req.file.size;
      updateData.fileType = req.file.mimetype;
    }

    if (updateData.title) updateData.title = updateData.title.trim();
    if (updateData.description) updateData.description = updateData.description.trim();

    const updatedDoc = await PublishedDocument.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, document: updatedDoc });
  } catch (err) {
    // Cleanup new file on error
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Cleanup failed:', unlinkErr);
      });
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

    if (document.fileUrl) {
      const filePath = path.join(__dirname, '..', document.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
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