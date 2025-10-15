const mongoose = require("mongoose");

const PublishedDocumentSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: { 
      type: String, 
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    fileUrl: { 
      type: String, 
      required: [true, 'File URL is required']
    },
    fileName: { 
      type: String, 
      required: [true, 'File name is required'],
      trim: true
    },
    fileSize: { 
      type: Number, 
      required: [true, 'File size is required'],
      min: [1, 'File size must be greater than 0']
    },
    fileType: { 
      type: String, 
      required: [true, 'File type is required'],
      enum: ['application/pdf'],
      default: 'application/pdf'
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [false, 'Uploaded by user is required']
    },
    downloadCount: {
      type: Number,
      default: 0
    },
    metadata: {
      pageCount: Number,
      author: String,
      producer: String,
      creator: String,
      creationDate: Date,
      modificationDate: Date
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for better query performance
PublishedDocumentSchema.index({ title: 'text', description: 'text' });
PublishedDocumentSchema.index({ createdAt: -1 });
PublishedDocumentSchema.index({ uploadedBy: 1 });

// Virtual to get full file path
PublishedDocumentSchema.virtual('fullFileUrl').get(function() {
  // Add base URL if not already present
  if (this.fileUrl && !this.fileUrl.startsWith('http')) {
    return `${process.env.BASE_URL}${this.fileUrl}`;
  }
  return this.fileUrl;
});

// Pre-save hook to validate PDF files
PublishedDocumentSchema.pre('save', function(next) {
  // Ensure the file type is correct
  if (this.fileType && this.fileType !== 'application/pdf') {
    const error = new Error('Only PDF files are allowed');
    return next(error);
  }
  
  // Validate file extension in fileName
  if (this.fileName) {
    const ext = this.fileName.toLowerCase().split('.').pop();
    if (ext !== 'pdf') {
      const error = new Error('Only PDF files are allowed');
      return next(error);
    }
  }
  
  next();
});

// Method to increment download count
PublishedDocumentSchema.methods.incrementDownloadCount = async function() {
  this.downloadCount += 1;
  return await this.save();
};

module.exports = mongoose.model("PublishedDocument", PublishedDocumentSchema);