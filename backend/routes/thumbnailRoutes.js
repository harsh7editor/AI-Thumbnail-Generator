const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const thumbnailController = require('../controllers/thumbnailController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
    }
  }
});

// Generate thumbnail with AI
router.post('/generate', upload.single('backgroundImage'), thumbnailController.generateThumbnail);

// Get thumbnail suggestions (multiple variations)
router.post('/suggestions', thumbnailController.getThumbnailSuggestions);

// Get color/theme suggestions
router.post('/themes', thumbnailController.getThemeSuggestions);

// Get all thumbnails (if using database)
router.get('/history', thumbnailController.getThumbnailHistory);

// Get single thumbnail by ID
router.get('/:id', thumbnailController.getThumbnailById);

// Delete thumbnail
router.delete('/:id', thumbnailController.deleteThumbnail);

module.exports = router;
