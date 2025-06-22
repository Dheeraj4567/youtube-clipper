#!/bin/bash

echo "🚀 Preparing YouTube Clipper for Railway + Vercel deployment..."

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🔨 Building frontend..."
npm run build

echo "✅ Frontend build complete!"
echo ""
echo "🚄 Next steps for Railway + Vercel deployment:"
echo ""
echo "1. BACKEND (Railway):"
echo "   - Go to https://railway.app"
echo "   - Connect your GitHub repository"
echo "   - Deploy from /backend directory"
echo "   - Copy your Railway app URL"
echo ""
echo "2. FRONTEND (Vercel):"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set Root Directory to 'frontend'"
echo "   - Add environment variables:"
echo "     • NEXT_PUBLIC_APP_URL: https://your-app.vercel.app"
echo "     • NEXT_PUBLIC_BACKEND_URL: https://your-railway-app.railway.app"
echo "     • NODE_ENV: production"
echo ""
echo "3. DEPLOY!"
echo ""
echo "💡 Total cost: $0/month (Railway $5 free credit + Vercel free tier)"
