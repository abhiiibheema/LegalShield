# App-v1/Dockerfile

# 1. Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build production optimized assets
RUN npm run build

# 2. Serve stage
FROM nginx:alpine

# Copy built files from build stage to nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
