# Use a Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy lockfile and package.json
COPY backend/package.json backend/pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy source code
COPY backend ./

# Build TypeScript
RUN pnpm build

# Start the server
CMD ["pnpm", "start"]
