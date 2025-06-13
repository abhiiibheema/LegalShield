# Step 1: Use node image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /usr/src/app

# Step 3: Copy dependencies and install with pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Step 4: Copy source code and build it
COPY . .
RUN pnpm build

# Step 5: Run the server
CMD ["node", "dist/index.js"]
