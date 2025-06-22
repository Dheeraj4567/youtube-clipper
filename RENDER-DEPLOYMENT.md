# YouTube Clipper - Render Deployment Guide

## 🎨 Quick Render Deployment via CLI

### Step 1: Install Render CLI

```bash
# Install Render CLI (correct method)
curl https://render.com/install-cli | sh

# Add to PATH
export PATH="$HOME/.render:$PATH"

# Verify installation
render --version
```

Or download directly:
```bash
# For Linux/macOS
curl -fsSL https://cli-releases.render.com/install.sh | sh
```

### Step 2: Login to Render

```bash
render auth login
```

This will open your browser to authenticate with Render.

### Step 3: Deploy Backend to Render

```bash
# Navigate to backend directory
cd backend

# Create and deploy the service
render services create web \
  --name youtube-clipper-backend \
  --runtime docker \
  --repo https://github.com/Dheeraj4567/youtube-clipper \
  --branch master \
  --root-dir backend \
  --plan free

# Deploy
render services deploy youtube-clipper-backend
```

### Step 4: Get Your Backend URL

```bash
# Get service info
render services list

# Get the URL (will be something like: https://youtube-clipper-backend.onrender.com)
```

### Step 5: Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd ../frontend

# Deploy to Vercel
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_BACKEND_URL
# Enter your Render backend URL: https://youtube-clipper-backend.onrender.com

vercel env add NODE_ENV
# Enter: production

# Redeploy with environment variables
vercel --prod
```

## 🚀 Alternative: One-Command Deployment

Create this deployment script and run it:

```bash
#!/bin/bash
echo "🎨 Deploying YouTube Clipper to Render + Vercel..."

# Deploy backend to Render
cd backend
render services create web \
  --name youtube-clipper-backend \
  --runtime docker \
  --repo https://github.com/Dheeraj4567/youtube-clipper \
  --branch master \
  --root-dir backend \
  --plan free

render services deploy youtube-clipper-backend

echo "✅ Backend deployed to Render!"
echo "🔗 Check your Render dashboard for the backend URL"

# Deploy frontend to Vercel
cd ../frontend
vercel --prod

echo "✅ Frontend deployed to Vercel!"
echo ""
echo "📋 Next steps:"
echo "1. Get your backend URL from Render dashboard"  
echo "2. Add NEXT_PUBLIC_BACKEND_URL to Vercel environment variables"
echo "3. Redeploy frontend: vercel --prod"
```

## 💰 Cost Breakdown

- **Render**: Free tier (750 hours/month)
- **Vercel**: Free tier (unlimited for personal projects)
- **Total**: $0/month

## 🎯 Why Render CLI?

✅ **Advantages:**
- More reliable than Railway for Docker deployments
- Better free tier (750 hours vs Railway's $5 credit)
- Simpler CLI commands
- Better documentation
- Handles Docker builds more reliably

## 🔧 Manual Render Deployment (Web UI)

If you prefer the web interface:

1. **Go to [render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure:**
   - **Name**: `youtube-clipper-backend`
   - **Environment**: `Docker`
   - **Root Directory**: `backend`
   - **Plan**: `Free`
6. **Deploy**

## 🚨 Troubleshooting

### CLI Authentication Issues
```bash
# If login fails
render auth logout
render auth login
```

### Service Creation Issues
```bash
# Check if service already exists
render services list

# Delete if needed
render services delete youtube-clipper-backend
```

### Build Failures
- Check Render dashboard logs
- Ensure Dockerfile is in `/backend` directory
- Verify GitHub repository is accessible

Ready to deploy? Let's go! 🚀
