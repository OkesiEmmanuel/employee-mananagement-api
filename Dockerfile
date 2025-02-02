# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project and build
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:18-slim

WORKDIR /usr/src/app

# Copy built files and node_modules from build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
