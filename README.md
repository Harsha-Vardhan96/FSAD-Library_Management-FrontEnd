# Library Management System - React Frontend

## Project Description
The Library Management System Frontend is a modern, responsive single-page web application built with React 19, Vite, Tailwind CSS, and Framer Motion. It provides role-based user interfaces for both general users (resource search, viewing, filtering, downloading) and system administrators (resource management, analytics, user access control).

---

## Architecture

```
[ Browser / Client ]
         |
         v
+-------------------------------------------------------+
|  Nginx Web Server (Port 80) / Vite Dev Server (5173)  |
|                                                       |
|  [ React Router ]  -> User Routes & Protected Routes  |
|  [ Components ]    -> Navbar, Sidebar, Resource Cards |
|  [ Pages ]         -> Login, Signup, Dashboard, Admin |
|  [ API Client ]    -> Axios/Fetch to Spring Boot API |
+-------------------------------------------------------+
         |
         | HTTP / REST API (JWT Header)
         v
[ Spring Boot Backend API ] (e.g. http://localhost:8080)
```

---

## Local Setup

### Prerequisites
- Node.js 20+
- npm 10+
- Running Spring Boot Backend API (or mock server)

### Environment Variables
Copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## Run Instructions

### Development Server
```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build & Preview
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Docker Container Run
```bash
# Build production Docker image
docker build -t library-frontend .

# Run container on port 80
docker run -p 80:80 library-frontend
```

---

## Deployment Information

### Production Web Server Configuration
- **Multi-stage Docker Build**: Node 20 build stage -> Nginx 1.25 Alpine runtime stage.
- **Nginx Configuration (`nginx.conf`)**: Configured with SPA client-side route fallback (`try_files $uri $uri/ /index.html;`), Gzip static asset compression, and HTTP 30-day cache headers.
- **CI/CD Pipeline**: GitHub Actions workflow (`.github/workflows/ci.yml`) installs dependencies (`npm ci`) and verifies clean production builds (`npm run build`) on push/PR.
