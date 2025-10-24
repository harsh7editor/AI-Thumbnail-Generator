const mongoose = require('mongoose');

const thumbnailSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  keywords: [{
    type: String,
    trim: true
  }],
  style: {
    type: String,
    default: 'modern'
  },
  imageUrl: {
    type: String,
    required: true
  },
  localPath: {
    type: String
  },
  aiGenerated: {
    type: Boolean,
    default: true
  },
  prompt: {
    type: String
  },
  metadata: {
    width: Number,
    height: Number,
    format: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Thumbnail', thumbnailSchema);
