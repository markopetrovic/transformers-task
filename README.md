# Transformer Monitoring Dashboard

A modern Vue 3 application for monitoring transformer assets, featuring an interactive data table and real-time voltage readings chart.

## 🚀 Features

- **Interactive Data Table**: Advanced filtering with dynamic parameters and searching
- **Real-time Voltage Readings**: Dynamic chart with transformer selection
- **Modern UI**: Professional components with PrimeVue
- **Type Safety**: Full TypeScript support
- **API Integration**: RESTful API with JSON Server

## 📋 Prerequisites

- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **Docker**: 24.x or higher (for containerized deployment)
- **Docker Compose**: 2.x or higher

## 🛠️ Development Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/markopetrovic/transformers-task.git
cd transformers-task

# Install dependencies
npm install
```

### 2. Start Development Environment

```bash
# Start the development server (Vue app)
npm run dev

# In another terminal, start the API server
npm run api
```

The application will be available at:

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000

### 3. Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server
npm run api          # Start JSON Server API
npm run preview      # Preview production build

# Building
npm run build        # Build for production with type checking
npm run build-only   # Build without type checking
npm run type-check   # Run TypeScript type checking

# Code Quality
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
```

## 🐳 Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build the Docker image
docker build -t transformers-task .

# Run the container
docker run -d -p 8080:80 transformers-task

# Access the application
open http://localhost:8080
```

## 📦 Build and Package

### 1. Local Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Docker Build Process

The Docker build uses a multi-stage approach:

1. **Build Stage**: Compiles Vue application with Node.js
2. **Production Stage**: Serves static files with Nginx

```bash
# Build with specific target
docker build --target production -t transformers-task:latest .

# Build with build arguments
docker build \
  --build-arg NODE_ENV=production \
  --build-arg VITE_API_URL=http://api:3000 \
  -t transformers-task:latest .
```

### 3. Package for Distribution

```bash
# Create production build
npm run build

# Create Docker image
docker build -t transformers-task:latest .

# Save image to tar file
docker save transformers-task:latest > transformers-task.tar

# Load image from tar file
docker load < transformers-task.tar
```

## 🚀 Deployment

### 1. Single Container Deployment

```bash
# Deploy to production server
docker run -d \
  --name transformers-task \
  -p 80:80 \
  --restart unless-stopped \
  transformers-task:latest
```

### 2. Docker Compose Deployment

```bash

# Scale services
docker-compose up -d --scale frontend=3
```

### 3. Production Environment Variables

Create `.env.production`:

```env
NODE_ENV=production
VITE_API_URL=https://api.yourdomain.com
VITE_APP_TITLE=Transformer Dashboard
```

### 4. Reverse Proxy Configuration (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run type-check
      - run: npm run lint
```

## 📄 License

This project is licensed under the MIT License.