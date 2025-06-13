# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY Backend/package*.json ./
RUN npm install

# Copy rest of backend files
COPY Backend .

# Expose the port your server runs on
EXPOSE 3000

# Run your app
CMD ["npm", "start"]
