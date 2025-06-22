# Dockerfile for Railway deployment
FROM node:18-alpine

# Install system dependencies for yt-dlp and ffmpeg
RUN apk add --no-cache \
    python3 \
    py3-pip \
    ffmpeg \
    && pip3 install --break-system-packages yt-dlp

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install Node.js dependencies
# Note: Using npm instead of bun for better Railway compatibility
RUN npm install

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose port (Render will set this automatically)
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
