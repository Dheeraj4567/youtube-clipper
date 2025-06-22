# YouTube Clipper Deployment Guide

## The Reality: Video Processing Needs a Server

YouTube clipping requires server-side processing with `yt-dlp` and `ffmpeg`. Here are your deployment options:

## 🚀 Recommended: Render.com (Free + Reliable)

Render.com is perfect for this project because it:
- ✅ Supports Docker containers perfectly
- ✅ Can install system dependencies (yt-dlp, ffmpeg)
- ✅ Has a generous free tier (750 hours/month)
- ✅ Easy CLI deployment
- ✅ More reliable than Railway for Docker
- ✅ Better documentation and support

### Quick CLI Deployment:

```bash
# Install CLIs
curl -fsSL https://cli-releases.render.com/install.sh | sh
npm install -g vercel

# Login to both services
render auth login
vercel login

# Run our deployment script
./deploy-render.sh
```

📖 **See [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md) for detailed CLI instructions**

### Manual Deployment:

1. **Deploy Backend to Render:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Set **Root Directory:** `backend`
   - Set **Environment:** `Docker`
   - Deploy on **Free** plan

2. **Deploy Frontend to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Set **Root Directory:** `frontend`
   - Add environment variable: `NEXT_PUBLIC_BACKEND_URL=https://your-render-app.onrender.com`

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
1. **Backend:** Deploy to Render.com (free 750 hours/month)
2. **Frontend:** Deploy to Vercel (free tier) 
3. **Total cost:** $0/month
4. **Setup time:** ~10 minutes

This gives you a professional deployment that actually works for video processing!

## 🔗 Next Steps

1. Create Render and Vercel accounts
2. Push code to GitHub
3. Run `./deploy-render.sh` for automated deployment
4. Configure environment variables
5. Share your working YouTube clipper! 🎉
