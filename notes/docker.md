# Comprehensive Docker & Containerization Guide

## Introduction
Docker is an open-source containerization platform that allows developers to package applications, runtimes, system dependencies, libraries, and configuration files together into lightweight, portable containers. Docker Compose simplifies orchestrating multi-container applications (e.g. Node API + MongoDB + React).

## Why We Need It
"It works on my machine" is a famous software engineering dilemma caused by differences in Operating Systems, Node.js versions, database configurations, and environment dependencies across developer laptops and production servers. Docker solves this by running applications inside identical, isolated container environments everywhere.

## Syntax
Example `Dockerfile`:
```dockerfile
# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package manifests and install
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port and start command
EXPOSE 5000
CMD ["npm", "start"]
```

## Explanation
- **Image**: Read-only blueprint containing application source code, dependencies, and environment instructions.
- **Container**: Runnable isolated instance of a Docker Image.
- **Dockerfile**: Text file containing step-by-step instructions to assemble a Docker Image.
- **Docker Compose (`docker-compose.yml`)**: Tool for defining and running multi-container Docker applications with linked networks and volume mounts.
- **Volumes**: Persistent storage mechanism for retaining database data outside container lifecycles.

## Example 1: Multi-Stage Dockerfile for React Frontend
```dockerfile
# Stage 1: Build React Production Bundle
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve Bundle via Lightweight Nginx Server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Example 2: Complete `docker-compose.yml` for MERN Stack
```yaml
version: '3.8'

services:
  # MongoDB Database Service
  mongodb:
    image: mongo:6.0
    container_name: mern_lms_db
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secretpassword
    volumes:
      - mongo_data:/data/db

  # Node.js Express Backend API Service
  backend:
    build: ./backend
    container_name: mern_lms_api
    restart: always
    ports:
      - "5000:5000"
    environment:
      PORT: 5000
      MONGO_URI: mongodb://admin:secretpassword@mongodb:27017/mern_lms?authSource=admin
      JWT_SECRET: docker_super_secret_key_2026
    depends_on:
      - mongodb

  # React 19 Frontend Web Service
  frontend:
    build: ./frontend
    container_name: mern_lms_web
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo_data:
```

## Real World Example
Enterprise cloud infrastructures run container orchestrators like **Kubernetes** or **AWS ECS**. During high traffic spikes (e.g. course launch sales), Kubernetes automatically spins up 50 additional Docker instances of the Node.js backend API container, distributing traffic smoothly via load balancers.

## Best Practices
1. **Use Alpine Base Images**: Use `node:20-alpine` instead of full OS images to shrink container size from 1GB+ down to ~100MB.
2. **Leverage Docker Layer Caching**: Copy `package.json` and run `npm install` *before* copying source code so rebuilds skip dependency installation when packages haven't changed.
3. **Never Run as Root User**: Add `USER node` inside Dockerfile for production security.
4. **Use Persistent Volumes for Databases**: Mount host directories or named volumes so MongoDB data survives container restarts.

## Common Mistakes
- Including `node_modules/` or build artifacts in Docker build contexts (always add `.dockerignore`).
- Hardcoding `localhost` inside container environment variables instead of referencing service names defined in `docker-compose.yml`.
- Running multi-stage builds without cleaning up temporary build dependencies.

## Interview Questions
1. **What is the difference between a Docker Image and a Docker Container?**
   *Answer*: A Docker Image is an immutable read-only template with instructions for creating a container. A Docker Container is a runnable live instance of an image executing in an isolated runtime environment.
2. **What is the purpose of `.dockerignore`?**
   *Answer*: `.dockerignore` prevents unnecessary local files (such as `node_modules`, `.git`, `.env`, build logs) from being copied into the Docker build context, speeding up build times and keeping image sizes compact.
3. **How do containers communicate with each other in Docker Compose?**
   *Answer*: Docker Compose automatically creates a shared default network. Containers can reach each other using their defined service names (e.g. `backend` can connect to database at `mongodb:27017`).

## Practice Problems
1. Write a `Dockerfile` for a Node.js API using `node:20-alpine`, setting non-root user permissions.
2. Construct a `.dockerignore` file suitable for a MERN stack workspace.

## Assignment
Create a complete Docker setup for the MERN LMS repository, including `backend/Dockerfile`, `frontend/Dockerfile`, `.dockerignore`, and a root `docker-compose.yml` that boots MongoDB, Express API, and React Frontend with a single `docker compose up` command.

## Summary
Docker containerization standardizes environment configuration, simplifies local development, and enables cloud microservice deployment. Master Dockerfiles, layer caching, and Docker Compose to containerize modern full stack applications.
