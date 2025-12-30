FROM ghcr.io/puppeteer/puppeteer:21.6.1

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install --production --no-optional

# Copy application files
COPY . .

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "index.js"]
