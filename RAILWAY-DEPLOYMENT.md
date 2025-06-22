# YouTube Clipper - Railway Deployment Guide

## 🚄 Quick Railway Deployment

### Step 0: Prepare and Push Your Code

1. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Setup for Railway + Vercel deployment"
   ```

2. **Push to GitHub**
   ```bash
   git push origin main
   ```
   
   *Note: Make sure your repository is public or Railway has access to it*

### Step 1: Deploy Backend to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `youtube-clipper` repository
   - Railway will automatically detect the backend
   - Click "Deploy"

3. **Configure Backend**
   - Railway will build using the `backend/Dockerfile`
   - Wait for deployment to complete
   - Copy your Railway app URL (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Repository**
   - Click "New Project"
   - Import your `youtube-clipper` repository
   - Set **Root Directory** to `frontend`

3. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
   NEXT_PUBLIC_BACKEND_URL=https://your-railway-app.railway.app
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Step 3: Test Your Deployment

1. Visit your Vercel app URL
2. Try clipping a YouTube video
3. The frontend will send requests to your Railway backend
4. Videos will be processed and downloaded

## 💰 Cost Breakdown

- **Railway**: $5 free credit per month (more than enough for personal use)
- **Vercel**: Free tier (unlimited for personal projects)
- **Total**: $0/month for most users

## 🔧 Local Development

If you want to develop locally:

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

## 🎯 Architecture

```
User Request → Vercel Frontend → Railway Backend → yt-dlp/ffmpeg → Video File
```

1. User submits YouTube URL and timestamps
2. Vercel frontend sends request to Railway backend
3. Railway backend uses yt-dlp and ffmpeg to process video
4. Processed video is returned to user

## 🚨 Troubleshooting

### Backend Issues
- Check Railway logs for build errors
- Ensure Dockerfile builds successfully
- Verify environment variables

### Frontend Issues
- Check Vercel deployment logs
- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Test backend URL directly

### Video Processing Issues
- Some videos may be blocked by YouTube
- Large videos may timeout (Railway has limits)
- Check Railway service logs for detailed errors

## 🌟 Features

✅ **Working on Railway + Vercel:**
- YouTube video clipping
- Custom start/end times
- Direct video download
- Free hosting
- Automatic HTTPS
- Custom domains (if you upgrade)

❌ **Not included in free version:**
- User authentication
- Premium subscriptions
- Database storage
- Advanced video processing options

Perfect for personal use and sharing with friends! 🎉
