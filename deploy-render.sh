#!/bin/bash

echo "🎨 Deploying YouTube Clipper to Render + Vercel..."

# Check if Render CLI is installed
if ! command -v render &> /dev/null; then
    echo "Installing Render CLI..."
    npm install -g @render/cli
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo "📋 Please make sure you're logged in to both services:"
echo "1. Run: render auth login"
echo "2. Run: vercel login"
echo ""
read -p "Press Enter when you're logged in to both services..."

# Deploy backend to Render
echo "🚀 Deploying backend to Render..."
cd backend

render services create web \
  --name youtube-clipper-backend \
  --runtime docker \
  --repo https://github.com/Dheeraj4567/youtube-clipper \
  --branch master \
  --root-dir backend \
  --plan free

echo "⏳ Deploying backend service..."
render services deploy youtube-clipper-backend

echo "✅ Backend deployed to Render!"
echo ""
echo "🔗 Getting backend URL..."
render services list

echo ""
echo "📋 Next steps:"
echo "1. Copy your backend URL from above (something like: https://youtube-clipper-backend.onrender.com)"
echo "2. We'll now deploy the frontend to Vercel"
echo ""
read -p "Press Enter to continue with frontend deployment..."

# Deploy frontend to Vercel
echo "🚀 Deploying frontend to Vercel..."
cd ../frontend

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔧 Final configuration:"
echo "1. Go to your Vercel dashboard"
echo "2. Add environment variable: NEXT_PUBLIC_BACKEND_URL = your-render-backend-url"
echo "3. Redeploy: vercel --prod"
echo ""
echo "🎉 Your YouTube Clipper is now live!"
