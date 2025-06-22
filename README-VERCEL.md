# YouTube Clipper - Free Vercel Deployment

This is a simplified version of the YouTube Clipper that can be deployed for free on Vercel.

## Features

- **Frontend:** NextJS + TailwindCSS (with Shadcn/UI)
- **Deployment:** Vercel (Free Tier)
- **No Authentication:** Direct access to the clipper interface
- **No Database:** Simplified setup without user management
- **Demo Purpose:** Shows UI and provides local setup instructions

## Quick Vercel Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/youtube-clipper&project-name=youtube-clipper-free&root-directory=frontend)

## Manual Deployment Steps

1. **Fork this repository**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your forked repository
   - Set the **Root Directory** to `frontend`

3. **Environment Variables:**
   - `NEXT_PUBLIC_APP_URL`: Your Vercel app URL (e.g., `https://your-app.vercel.app`)
   - `NODE_ENV`: `production`

4. **Deploy**

## Important Notes

⚠️ **This Vercel version is a DEMO ONLY**

- The actual video clipping functionality **cannot work** on Vercel's serverless environment
- You cannot install `yt-dlp` and `ffmpeg` on Vercel's free tier
- The app shows the interface and provides instructions for local setup

## For Full Functionality (Local Development)

To actually clip videos, you need to run the app locally:

### Prerequisites

- **[Bun](https://bun.sh/):** `bun` (v1.2.7 or later)
- **[Node.js](https://nodejs.org/):** `node` (v18+ recommended)
- **[yt-dlp](https://github.com/yt-dlp/yt-dlp):** Command-line tool for downloading YouTube videos
- **[ffmpeg](https://ffmpeg.org/):** Command-line tool for video processing

### Installation

```bash
# Install yt-dlp
pip install yt-dlp

# Install ffmpeg
# macOS
brew install ffmpeg
# Ubuntu/Debian
sudo apt install ffmpeg
# Windows
# Download from https://ffmpeg.org/download.html

# Clone and setup
git clone https://github.com/your-username/youtube-clipper
cd youtube-clipper

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
bun install
```

### Running Locally

```bash
# Terminal 1: Start backend
cd backend
bun run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and the clipping functionality will work!

## Project Structure

```
youtube-clipper/
├── frontend/           # Next.js app (Vercel deployment)
│   ├── app/           # Next.js 13+ app directory
│   ├── components/    # React components
│   └── lib/          # Utilities
├── backend/           # Node.js/Bun server (local only)
│   └── src/          # Backend source
└── vercel.json       # Vercel configuration
```

## Why This Approach?

1. **Free Demo**: Show the UI and concept without server costs
2. **Easy Setup**: One-click Vercel deployment for demo purposes
3. **Local Development**: Full functionality when run locally
4. **Open Source**: Anyone can fork and modify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with both frontend and backend
5. Submit a pull request

## License

MIT License - feel free to use this code for your own projects!
