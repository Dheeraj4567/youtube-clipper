# YouTube Clipper Deployment Guide

## The Reality: Video Processing Needs a Server

YouTube clipping requires server-side processing with `yt-dlp` and `ffmpeg`. Here are your deployment options:

## 🚀 Recommended: Railway (Free + Easy)

Railway is perfect for this project because it:
- ✅ Supports Docker containers
- ✅ Can install system dependencies (yt-dlp, ffmpeg)
- ✅ Has a free tier ($5 credit/month)
- ✅ One-click deployment from GitHub
- ✅ Automatic HTTPS and custom domains
- ✅ Great developer experience

### Deploy to Railway:

1. **Push your code to GitHub**

2. **Deploy Backend to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the backend and deploy it
   - Your backend will be available at `https://your-app.railway.app`

3. **Deploy Frontend to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Set **Root Directory:** `frontend`
   - Add environment variable: `NEXT_PUBLIC_BACKEND_URL=https://your-app.railway.app`

## 🌐 Alternative: Full Stack on Railway (One Service)

Deploy both frontend and backend on Railway:

1. Create `Dockerfile` in project root:
```dockerfile
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache python3 py3-pip ffmpeg

# Install yt-dlp
RUN pip3 install yt-dlp

WORKDIR /app

# Copy and install backend dependencies
COPY backend/package.json backend/bun.lock ./backend/
WORKDIR /app/backend
RUN npm install

# Copy and install frontend dependencies  
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy source code
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm run build

# Expose port
EXPOSE $PORT

# Start both services
WORKDIR /app
CMD ["sh", "-c", "cd backend && npm start & cd frontend && npm start"]
```

## 💰 Other Hosting Options

### Render.com (Free Tier)
- Similar to Railway
- Good Docker support
- Free tier with 750 hours/month

### DigitalOcean App Platform (~$5/month)
- Reliable and fast
- Easy Docker deployment
- Affordable pricing

### Traditional VPS ($5-10/month)
- DigitalOcean Droplet, Linode, Vultr
- Full control
- Install dependencies manually
- Good for learning server management

## 🔧 Local Development (Always Works)

For development and personal use:

1. **Install dependencies:**
   ```bash
   # macOS
   brew install yt-dlp ffmpeg bun node
   
   # Ubuntu/Debian
   sudo apt update && sudo apt install yt-dlp ffmpeg nodejs npm
   curl -fsSL https://bun.sh/install | bash
   
   # Windows (with chocolatey)
   choco install yt-dlp ffmpeg nodejs
   ```

2. **Run the application:**
   ```bash
   # Terminal 1: Backend
   cd backend
   bun install
   bun run dev
   
   # Terminal 2: Frontend  
   cd frontend
   npm install
   npm run dev
   ```

## 📋 Current Vercel Setup

The current Vercel deployment:
- ✅ Shows the beautiful UI
- ✅ Demonstrates functionality
- ❌ Can't actually process videos
- ✅ Provides setup instructions

Perfect for:
- Showcasing your project
- Getting feedback on UI/UX
- Portfolio demonstrations

## 🎯 Recommendation

**For a free, fully functional deployment:**
1. **Backend:** Deploy to Railway.app (free tier)
2. **Frontend:** Deploy to Vercel (free tier) 
3. **Total cost:** $0/month (Railway gives $5 free credit)
4. **Setup time:** ~10 minutes

This gives you a professional deployment that actually works for video processing!

## 🔗 Next Steps

1. Create Railway account
2. Push code to GitHub
3. Deploy backend to Railway
4. Update frontend environment variables
5. Deploy frontend to Vercel
6. Share your working YouTube clipper! 🎉
