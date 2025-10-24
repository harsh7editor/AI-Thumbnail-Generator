const OpenAI = require('openai');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

// Initialize OpenAI client
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

/**
 * Generate a thumbnail based on input parameters
 */
exports.generateThumbnail = async (options) => {
  const {
    title,
    description = '',
    keywords = [],
    style = 'modern',
    textColor = '#FFFFFF',
    backgroundColor = '#FF0000',
    backgroundImage = null
  } = options;

  try {
    let image;

    // Generate AI background if no image provided and OpenAI is configured
    if (!backgroundImage && openai && process.env.USE_AI_GENERATION !== 'false') {
      try {
        image = await generateAIBackground(title, description, keywords, style);
      } catch (aiError) {
        console.log('AI generation failed, using gradient background:', aiError.message);
        image = await createGradientBackground(backgroundColor);
      }
    } else if (backgroundImage) {
      // Load uploaded background image
      image = await Jimp.read(backgroundImage);
      image.resize(1280, 720);
    } else {
      // Create gradient background
      image = await createGradientBackground(backgroundColor);
    }

    // Add text overlay
    await addTextOverlay(image, title, textColor);

    // Save thumbnail
    const filename = `thumbnail-${uuidv4()}.png`;
    const filepath = path.join(__dirname, '../generated', filename);
    await image.writeAsync(filepath);

    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    
    return {
      success: true,
      url: `${baseUrl}/generated/${filename}`,
      path: filepath,
      filename,
      aiGenerated: !backgroundImage && openai && process.env.USE_AI_GENERATION !== 'false',
      prompt: !backgroundImage && openai ? generatePrompt(title, description, keywords, style) : null,
      metadata: {
        width: 1280,
        height: 720,
        format: 'png'
      }
    };
  } catch (error) {
    console.error('Thumbnail generation error:', error);
    throw new Error(`Failed to generate thumbnail: ${error.message}`);
  }
};

/**
 * Generate multiple thumbnail suggestions
 */
exports.generateMultipleSuggestions = async (options) => {
  const { title, description, keywords, count = 3 } = options;
  
  const styles = ['modern', 'bold', 'minimal', 'vibrant', 'professional'];
  const suggestions = [];

  for (let i = 0; i < count; i++) {
    const style = styles[i % styles.length];
    const colors = getColorPalette(style);
    
    try {
      const thumbnail = await this.generateThumbnail({
        title,
        description,
        keywords,
        style,
        textColor: colors.textColor,
        backgroundColor: colors.backgroundColor
      });
      
      suggestions.push({
        ...thumbnail,
        style,
        colors
      });
    } catch (error) {
      console.error(`Failed to generate suggestion ${i + 1}:`, error);
    }
  }

  return suggestions;
};

/**
 * Get AI-powered theme suggestions
 */
exports.getThemeSuggestions = async (options) => {
  const { title, description, keywords } = options;

  // If OpenAI is available, use it for intelligent suggestions
  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: 'You are a designer specializing in YouTube thumbnails. Suggest color themes and styles based on video content. Return JSON only.'
        }, {
          role: 'user',
          content: `Suggest 3 color themes for a YouTube thumbnail with title: "${title}", description: "${description}", keywords: ${keywords.join(', ')}. Return as JSON array with objects containing: name, primaryColor, secondaryColor, textColor, description.`
        }],
        temperature: 0.8,
        max_tokens: 500
      });

      const suggestions = JSON.parse(completion.choices[0].message.content);
      return suggestions;
    } catch (error) {
      console.error('AI theme suggestion failed:', error);
    }
  }

  // Fallback to predefined themes
  return getPredefinedThemes();
};

/**
 * Generate AI background using DALL-E
 */
async function generateAIBackground(title, description, keywords, style) {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = generatePrompt(title, description, keywords, style);
  
  console.log('Generating AI image with prompt:', prompt);

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1792x1024',
    quality: 'standard',
    response_format: 'url'
  });

  const imageUrl = response.data[0].url;
  
  // Download the image
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const imageBuffer = Buffer.from(imageResponse.data);

  // Load with Jimp and resize
  const image = await Jimp.read(imageBuffer);
  image.resize(1280, 720);

  return image;
}

/**
 * Create gradient background
 */
async function createGradientBackground(color) {
  const image = new Jimp(1280, 720, color);
  
  // Add simple gradient effect by darkening bottom
  for (let y = 0; y < 720; y++) {
    const darkenFactor = y / 720 * 0.3;
    for (let x = 0; x < 1280; x++) {
      const pixelColor = image.getPixelColor(x, y);
      const rgba = Jimp.intToRGBA(pixelColor);
      const newColor = Jimp.rgbaToInt(
        Math.floor(rgba.r * (1 - darkenFactor)),
        Math.floor(rgba.g * (1 - darkenFactor)),
        Math.floor(rgba.b * (1 - darkenFactor)),
        rgba.a
      );
      image.setPixelColor(newColor, x, y);
    }
  }
  
  return image;
}

/**
 * Add text overlay to image
 */
async function addTextOverlay(image, title, textColor) {
  try {
    // Add semi-transparent overlay for better text readability
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      this.bitmap.data[idx + 0] = this.bitmap.data[idx + 0] * 0.7; // R
      this.bitmap.data[idx + 1] = this.bitmap.data[idx + 1] * 0.7; // G
      this.bitmap.data[idx + 2] = this.bitmap.data[idx + 2] * 0.7; // B
    });

    // Load font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    
    // Calculate text position (centered)
    const textWidth = Jimp.measureText(font, title);
    const textHeight = Jimp.measureTextHeight(font, title, 1180);
    
    const x = (1280 - Math.min(textWidth, 1180)) / 2;
    const y = (720 - textHeight) / 2;
    
    // Print text with black shadow
    image.print(font, x + 4, y + 4, {
      text: title,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, 1180, 720);
    
    // Print main text
    image.print(font, x, y, {
      text: title,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, 1180, 720);
    
  } catch (error) {
    console.error('Text overlay error:', error);
    // Continue without text if there's an error
  }
}

/**
 * Generate prompt for AI image generation
 */
function generatePrompt(title, description, keywords, style) {
  const styleDescriptors = {
    modern: 'modern, clean, professional, high-tech, sleek design',
    bold: 'bold, dramatic, high contrast, energetic, eye-catching',
    minimal: 'minimalist, simple, elegant, subtle, refined',
    vibrant: 'vibrant, colorful, energetic, dynamic, bright',
    professional: 'professional, corporate, sophisticated, polished, refined'
  };

  const descriptor = styleDescriptors[style] || styleDescriptors.modern;
  const keywordText = keywords.length > 0 ? keywords.join(', ') : '';

  return `Create a YouTube thumbnail background image that is ${descriptor}. Topic: ${title}. ${description ? 'Context: ' + description + '.' : ''} ${keywordText ? 'Keywords: ' + keywordText + '.' : ''} The image should be visually striking, suitable as a background for text overlay, without any text or words in the image itself. Professional quality, 16:9 aspect ratio.`;
}

/**
 * Get color palette based on style
 */
function getColorPalette(style) {
  const palettes = {
    modern: { backgroundColor: '#6366F1', textColor: '#FFFFFF' },
    bold: { backgroundColor: '#DC2626', textColor: '#FFFF00' },
    minimal: { backgroundColor: '#374151', textColor: '#F9FAFB' },
    vibrant: { backgroundColor: '#EC4899', textColor: '#FFFFFF' },
    professional: { backgroundColor: '#1E40AF', textColor: '#FFFFFF' }
  };

  return palettes[style] || palettes.modern;
}

/**
 * Get predefined themes
 */
function getPredefinedThemes() {
  return [
    {
      name: 'Energetic Red',
      primaryColor: '#DC2626',
      secondaryColor: '#FCA5A5',
      textColor: '#FFFFFF',
      description: 'Bold and attention-grabbing, perfect for high-energy content'
    },
    {
      name: 'Tech Blue',
      primaryColor: '#2563EB',
      secondaryColor: '#60A5FA',
      textColor: '#FFFFFF',
      description: 'Professional and modern, ideal for tech and educational content'
    },
    {
      name: 'Creative Purple',
      primaryColor: '#7C3AED',
      secondaryColor: '#C4B5FD',
      textColor: '#FFFFFF',
      description: 'Artistic and creative, great for design and lifestyle content'
    }
  ];
}
