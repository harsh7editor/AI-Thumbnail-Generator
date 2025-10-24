# 🎨 AI-Powered YouTube Thumbnail Generator

A full-stack application that leverages OpenAI's DALL-E API to generate stunning YouTube thumbnails with customizable text overlays, colors, and styles.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![OpenAI](https://img.shields.io/badge/OpenAI-DALL--E-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-Optional-brightgreen)

## ✨ Features

### Core Functionality
- 🤖 **AI-Powered Generation**: Create unique thumbnail backgrounds using OpenAI DALL-E
- 🎨 **Custom Text Overlay**: Add your video title with customizable fonts and colors
- 🖼️ **Image Upload**: Upload your own background images or let AI generate them
- 🎭 **Multiple Styles**: Choose from Modern, Bold, Minimal, Vibrant, and Professional styles
- 🌈 **Color Customization**: Full control over text and background colors
- 📥 **Download Feature**: Save thumbnails locally in high quality (1280x720 PNG)

### Advanced Features
- 🔄 **Multiple Suggestions**: Generate 3-5 thumbnail variations at once
- 🎨 **AI Theme Suggestions**: Get AI-powered color palette recommendations
- 📊 **Thumbnail History**: Optional MongoDB integration to store generated thumbnails
- ⚡ **Real-time Preview**: See your thumbnail before downloading
- 🎯 **Responsive UI**: Works seamlessly on desktop, tablet, and mobile
- 🔔 **Toast Notifications**: User-friendly feedback for all actions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Toastify** - Notification system
- **React Icons** - Icon library

### Backend
- **Node.js + Express** - Server framework
- **OpenAI API** - DALL-E image generation
- **Canvas** - Image manipulation and text overlay
- **Sharp** - Image processing
- **Multer** - File upload handling
- **Mongoose** - MongoDB ODM (optional)

### Database (Optional)
- **MongoDB** - Store thumbnail history and metadata

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **OpenAI API Key** (Get one at https://platform.openai.com/api-keys)
- **MongoDB** (Optional - for thumbnail history)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
cd ai-thumbnail-generator
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
BASE_URL=http://localhost:5000

# Required for AI generation
OPENAI_API_KEY=your_openai_api_key_here
USE_AI_GENERATION=true

# Optional - leave empty to run without database
MONGODB_URI=mongodb://localhost:27017/thumbnail-generator
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage Guide

### Basic Thumbnail Generation

1. **Enter Video Title** (required)
2. **Add Description** (optional - helps AI understand context)
3. **Add Keywords** (optional - comma-separated)
4. **Choose Style** (Modern, Bold, Minimal, Vibrant, Professional)
5. **Customize Colors** (text and background)
6. **Upload Image** (optional - or let AI generate one)
7. **Click "Generate Thumbnail"**

### Advanced Features

#### Get Multiple Suggestions
Click **"Get Suggestions"** to generate 3 thumbnail variations with different styles.

#### AI Theme Suggestions
Click **"Get Themes"** to receive AI-powered color palette recommendations based on your content.

#### Download Thumbnail
Once generated, click **"Download Thumbnail"** to save the image locally.

## 📁 Project Structure

```
ai-thumbnail-generator/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── thumbnailController.js  # Business logic
│   ├── models/
│   │   └── Thumbnail.js         # MongoDB schema
│   ├── routes/
│   │   └── thumbnailRoutes.js   # API endpoints
│   ├── services/
│   │   └── thumbnailService.js  # Core generation logic
│   ├── uploads/                 # User uploaded images
│   ├── generated/               # Generated thumbnails
│   ├── .env.example            # Environment template
│   ├── package.json
│   └── server.js               # Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── ThumbnailForm.js
│   │   │   ├── ThumbnailPreview.js
│   │   │   ├── ThumbnailSuggestions.js
│   │   │   └── ThemeSelector.js
│   │   ├── services/
│   │   │   └── api.js          # API client
│   │   ├── App.js              # Main component
│   │   ├── index.js            # Entry point
│   │   └── index.css           # Tailwind styles
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── Dockerfile                   # Docker configuration
├── docker-compose.yml          # Multi-container setup
└── README.md
```

## 🔌 API Endpoints

### Generate Single Thumbnail
```http
POST /api/thumbnails/generate
Content-Type: multipart/form-data

{
  "title": "string",
  "description": "string",
  "keywords": "string",
  "style": "modern|bold|minimal|vibrant|professional",
  "textColor": "#FFFFFF",
  "backgroundColor": "#6366F1",
  "backgroundImage": "file"
}
```

### Get Multiple Suggestions
```http
POST /api/thumbnails/suggestions
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "keywords": "string",
  "count": 3
}
```

### Get Theme Suggestions
```http
POST /api/thumbnails/themes
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "keywords": "string"
}
```

### Get Thumbnail History
```http
GET /api/thumbnails/history?limit=20&skip=0
```

### Delete Thumbnail
```http
DELETE /api/thumbnails/:id
```

## 🐳 Docker Deployment

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:5000`
- MongoDB on `localhost:27017` (if configured)

### Individual Docker Build

Backend:
```bash
cd backend
docker build -t thumbnail-backend .
docker run -p 5000:5000 --env-file .env thumbnail-backend
```

Frontend:
```bash
cd frontend
docker build -t thumbnail-frontend .
docker run -p 3000:3000 thumbnail-frontend
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)

1. Connect your GitHub repository
2. Set environment variables:
   - `REACT_APP_API_URL=your_backend_url/api`
3. Deploy!

### Backend (Render/Heroku/Railway)

1. Connect your GitHub repository
2. Set environment variables (all from `.env.example`)
3. Ensure OpenAI API key is set
4. Deploy!

### Environment Variables for Production

Backend:
```env
PORT=5000
NODE_ENV=production
BASE_URL=https://your-backend-url.com
OPENAI_API_KEY=your_key
MONGODB_URI=your_mongodb_connection_string
```

Frontend:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 💰 Cost Considerations

### OpenAI API Costs
- **DALL-E 3**: ~$0.04 per image (standard quality, 1024x1024)
- **GPT-3.5-turbo**: ~$0.002 per 1K tokens (for theme suggestions)

### Running Without AI (Free Mode)
Set `USE_AI_GENERATION=false` in backend `.env` to use gradient backgrounds instead of AI-generated images.

## 🔧 Troubleshooting

### Backend won't start
- Ensure Node.js v16+ is installed
- Check if port 5000 is available
- Verify `.env` file exists and has correct format

### AI generation fails
- Verify OpenAI API key is valid
- Check OpenAI API quota/credits
- Ensure internet connection is stable

### Canvas/Sharp installation issues
- On Windows: May need Visual Studio Build Tools
- On Linux: `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
- On Mac: Usually works out of the box

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Ensure CORS is enabled (already configured)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for DALL-E API
- React team for the amazing framework
- Tailwind CSS for beautiful styling
- All open-source contributors

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ for YouTube creators**
