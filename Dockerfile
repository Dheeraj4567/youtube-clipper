FROM node:18-alpine

# Install system dependencies required for video processing
RUN apk add --no-cache \
    python3 \
    py3-pip \
    ffmpeg \
    curl

# Install yt-dlp
RUN pip3 install yt-dlp

# Set working directory
WORKDIR /app

# Copy package files
COPY backend/package.json backend/bun.lock* ./

# Install dependencies (use npm since bun might not be available in alpine)
RUN npm install

# Copy source code
COPY backend/ ./

# Create uploads directory
RUN mkdir -p uploads

# Expose port (Railway will set the PORT environment variable)
EXPOSE $PORT

# Start the application
CMD ["npm", "run", "dev"]
