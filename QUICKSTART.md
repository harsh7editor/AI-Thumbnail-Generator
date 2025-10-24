# 🚀 Quick Start Guide

Get your AI Thumbnail Generator running in 5 minutes!

## ⚡ Fast Setup (Without AI - Free Mode)

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

**Backend** - Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
BASE_URL=http://localhost:5000
USE_AI_GENERATION=false
```

**Frontend** - Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 4. Open Browser
Visit: `http://localhost:3000`

---

## 🤖 Full Setup (With AI Generation)

### 1. Get OpenAI API Key
- Visit: https://platform.openai.com/api-keys
- Create a new API key
- Copy it for the next step

### 2. Install Dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure Environment

**Backend** - Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
BASE_URL=http://localhost:5000
OPENAI_API_KEY=sk-your-actual-api-key-here
USE_AI_GENERATION=true
```

**Frontend** - Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Test It Out!
1. Open `http://localhost:3000`
2. Enter a video title like "How to Code in Python"
3. Click "Generate Thumbnail"
4. Wait 10-30 seconds for AI generation
5. Download your thumbnail!

---

## 🐳 Docker Setup (Easiest)

### 1. Create Environment File
Create `.env` in the root directory:
```env
OPENAI_API_KEY=your_key_here
USE_AI_GENERATION=true
```

### 2. Run with Docker Compose
```bash
docker-compose up --build
```

### 3. Access the Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MongoDB: `localhost:27017`

---

## 📝 First Thumbnail

Try these example inputs:

**Title:** "10 Python Tips for Beginners"
**Description:** "Learn essential Python programming tips"
**Keywords:** "python, tutorial, coding, programming"
**Style:** Modern
**Colors:** Use default (Blue background, White text)

Click **Generate Thumbnail** and wait for your AI-powered thumbnail!

---

## 🆘 Common Issues

### Port Already in Use
**Problem:** Port 5000 or 3000 is already in use

**Solution:**
- Backend: Change `PORT=5001` in `backend/.env`
- Frontend: The React app will automatically suggest port 3001

### Canvas/Sharp Installation Fails
**Windows:**
```bash
npm install --global windows-build-tools
```

**Linux:**
```bash
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

**Mac:**
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

### OpenAI API Errors
- Check your API key is correct
- Ensure you have credits in your OpenAI account
- Try setting `USE_AI_GENERATION=false` to test without AI

---

## 💡 Tips

1. **Without OpenAI API**: Set `USE_AI_GENERATION=false` to use gradient backgrounds
2. **MongoDB Optional**: Leave `MONGODB_URI` empty to run without database
3. **Test Mode**: Use the free mode first before adding your API key
4. **Cost Control**: Each AI generation costs ~$0.04. Monitor your usage!

---

## 🎉 You're Ready!

Your AI Thumbnail Generator is now running. Create amazing thumbnails for your YouTube videos!

Need help? Check the main [README.md](README.md) for detailed documentation.
