const thumbnailService = require('../services/thumbnailService');
const Thumbnail = require('../models/Thumbnail');
const path = require('path');
const fs = require('fs').promises;

/**
 * Generate a single thumbnail
 */
exports.generateThumbnail = async (req, res) => {
  try {
    const { title, description, keywords, style, textColor, backgroundColor } = req.body;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Parse keywords if it's a string
    let keywordsArray = [];
    if (keywords) {
      keywordsArray = typeof keywords === 'string' ? keywords.split(',').map(k => k.trim()) : keywords;
    }

    const backgroundImage = req.file ? req.file.path : null;

    // Generate thumbnail
    const thumbnailData = await thumbnailService.generateThumbnail({
      title,
      description,
      keywords: keywordsArray,
      style: style || 'modern',
      textColor,
      backgroundColor,
      backgroundImage
    });

    // Save to database if MongoDB is connected
    if (thumbnailData.success) {
      try {
        const thumbnail = new Thumbnail({
          title,
          description,
          keywords: keywordsArray,
          style: style || 'modern',
          imageUrl: thumbnailData.url,
          localPath: thumbnailData.path,
          aiGenerated: thumbnailData.aiGenerated,
          prompt: thumbnailData.prompt,
          metadata: thumbnailData.metadata
        });
        await thumbnail.save();
        thumbnailData.id = thumbnail._id;
      } catch (dbError) {
        console.log('Database save failed, continuing without DB:', dbError.message);
      }
    }

    res.json(thumbnailData);
  } catch (error) {
    console.error('Generate thumbnail error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate thumbnail',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Generate multiple thumbnail suggestions
 */
exports.getThumbnailSuggestions = async (req, res) => {
  try {
    const { title, description, keywords, count = 3 } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const keywordsArray = typeof keywords === 'string' ? keywords.split(',').map(k => k.trim()) : keywords || [];

    const suggestions = await thumbnailService.generateMultipleSuggestions({
      title,
      description,
      keywords: keywordsArray,
      count: Math.min(parseInt(count) || 3, 5) // Max 5 suggestions
    });

    res.json({ suggestions });
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate suggestions'
    });
  }
};

/**
 * Get color/theme suggestions based on content
 */
exports.getThemeSuggestions = async (req, res) => {
  try {
    const { title, description, keywords } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const themes = await thumbnailService.getThemeSuggestions({
      title,
      description,
      keywords: typeof keywords === 'string' ? keywords.split(',').map(k => k.trim()) : keywords || []
    });

    res.json({ themes });
  } catch (error) {
    console.error('Get themes error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate theme suggestions'
    });
  }
};

/**
 * Get thumbnail history
 */
exports.getThumbnailHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;

    const thumbnails = await Thumbnail.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Thumbnail.countDocuments();

    res.json({
      thumbnails,
      total,
      limit,
      skip
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch thumbnail history. Database may not be connected.'
    });
  }
};

/**
 * Get single thumbnail by ID
 */
exports.getThumbnailById = async (req, res) => {
  try {
    const thumbnail = await Thumbnail.findById(req.params.id);
    
    if (!thumbnail) {
      return res.status(404).json({ error: 'Thumbnail not found' });
    }

    res.json({ thumbnail });
  } catch (error) {
    console.error('Get thumbnail error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch thumbnail'
    });
  }
};

/**
 * Delete thumbnail
 */
exports.deleteThumbnail = async (req, res) => {
  try {
    const thumbnail = await Thumbnail.findById(req.params.id);
    
    if (!thumbnail) {
      return res.status(404).json({ error: 'Thumbnail not found' });
    }

    // Delete file from disk if it exists
    if (thumbnail.localPath) {
      try {
        await fs.unlink(thumbnail.localPath);
      } catch (fileError) {
        console.log('File deletion failed:', fileError.message);
      }
    }

    await Thumbnail.findByIdAndDelete(req.params.id);

    res.json({ message: 'Thumbnail deleted successfully' });
  } catch (error) {
    console.error('Delete thumbnail error:', error);
    res.status(500).json({ 
      error: 'Failed to delete thumbnail'
    });
  }
};
