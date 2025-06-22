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
   - **IMPORTANT**: Set the **Root Directory** to `backend`
   - Railway will build using the `backend/Dockerfile`
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

## 🚨 IMPORTANT: Fix Railway Root Directory

**If your deployment failed, follow these steps:**

1. **Go to your Railway project dashboard**
2. **Click on "Settings" tab**
3. **Under "Service Settings" find "Root Directory"**
4. **Set Root Directory to: `backend`**
5. **Under "Build" section, ensure Builder is set to: `Dockerfile`**
6. **Click "Redeploy" or trigger a new deployment**

## 🚨 Troubleshooting

### Deployment Failed During Initialization

If you see "Deployment failed during the initialization process":

1. **Check Root Directory Setting**
   - Go to your Railway project settings
   - Under "Build" section, set **Root Directory** to `backend`
   - Redeploy the service

2. **Manual Fix Steps**
   - In Railway dashboard, go to your project
   - Click "Settings" → "Build"
   - Set **Root Directory**: `backend`
   - Set **Builder**: `Dockerfile`
   - Click "Redeploy"

3. **Alternative: Delete and Recreate**
   - Delete the current Railway service
   - Create new project
   - Make sure to set **Root Directory** to `backend` during setup

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
