# Build Stage: Production Build using Node 20
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies based on lockfile
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files and build bundle
COPY . .
RUN npm run build

# Runtime Stage: High Performance Production Web Server (Nginx)
FROM nginx:1.25-alpine

# Copy built static files to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for Single Page Application routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
