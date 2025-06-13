# Backend/Dockerfile

# Use official Node image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build if you have build step, otherwise skip
# RUN npm run build

# Expose backend port (change if needed)
EXPOSE 5000

# Start the backend app
CMD ["npm", "start"]
