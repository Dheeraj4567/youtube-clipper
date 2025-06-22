#!/bin/bash

echo "🚀 YouTube Clipper Deployment Script"
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."

# Backend dependencies
echo "Installing backend dependencies..."
cd backend
if command -v bun &> /dev/null; then
    bun install
else
    npm install
fi

# Frontend dependencies  
echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "For LOCAL development:"
echo "1. Terminal 1: cd backend && bun run dev (or npm run dev)"
echo "2. Terminal 2: cd frontend && npm run dev"
echo "3. Open http://localhost:3000"
echo ""
echo "For PRODUCTION deployment:"
echo ""
echo "🚂 RAILWAY (Recommended - Free):"
echo "1. Push your code to GitHub"
echo "2. Go to railway.app and connect your repo"
echo "3. Railway will auto-deploy using railway.json config"
echo "4. Deploy frontend to Vercel with NEXT_PUBLIC_BACKEND_URL=your-railway-url"
echo ""
echo "🌊 VERCEL (Frontend Only):"
echo "1. cd frontend"
echo "2. vercel --prod"
echo "3. Note: Video processing won't work without backend server"
echo ""
echo "📖 Read DEPLOYMENT.md for detailed instructions"
echo ""

cd ..
echo "🎉 Setup complete! Happy coding!"
