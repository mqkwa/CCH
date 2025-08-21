# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app listens on
EXPOSE 4000

# Start the Node.js application
CMD ["node", "src/server.js"]
