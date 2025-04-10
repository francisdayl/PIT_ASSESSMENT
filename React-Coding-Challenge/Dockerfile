# Use Node.js base image
FROM node:16-slim

# Set working directory
WORKDIR /app

# Copy package files first for layer cachingdocker build -t react15-app .

COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port (default for React dev server)
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
