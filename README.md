# URLX — Distributed URL Shortener

A highly available production-grade distributed URL shortening service designed for high concurrency, viral traffic spikes, and scalable backend infrastructure.

URLX uses:
- Horizontal API scaling
- Redis caching
- RedisBloom probabilistic filtering
- Distributed Base62 ID generation
- Async analytics processing
- JWT authentication
- Dockerized infrastructure
- Nginx reverse proxy load balancing

---

# Key Features

- Distributed Base62 short URL generation
- Stateless horizontally scalable API architecture
- Redis-backed caching layer
- Bloom Filter protection against cache penetration attacks
- Asynchronous click analytics processing using BullMQ
- JWT authentication & protected analytics routes
- Nginx Round-Robin load balancing
- Docker Compose microservice orchestration
- Shared Redis infrastructure across all API clones
- Background worker architecture

---

# System Architecture

<img width="631" height="614" alt="image" src="https://github.com/user-attachments/assets/df8a61ba-c22b-42d8-8e02-307e636c0062" />


<p align="center">
  

</p>

---

# Core Distributed Concepts

| Concept | Implementation | Benefit |
|---|---|---|
| Load Balancing | Nginx distributes requests across API clones | Horizontal scalability |
| Distributed ID Generation | Redis atomic counter + range allocation | O(1) short URL generation |
| Redis Cache | Cache-aside pattern for redirects | Fast URL resolution |
| RedisBloom Filter | Checks fake/non-existent IDs before DB lookup | Prevents cache penetration |
| Async Analytics | BullMQ queue + worker processing | Non-blocking redirects |
| Stateless Auth | JWT-based authentication | No shared server memory |

---

# Performance Metrics

| Operation | Complexity |
|---|---|
| URL Generation | O(1) |
| Redis Cache Lookup | O(1) |
| Bloom Filter Check | O(1) |
| Queue Push | O(1) |
| MongoDB Indexed Lookup | O(log n) |

---

# Tech Stack

## Languages
- TypeScript
- JavaScript

## Backend
- Node.js
- Express.js

## Database & Storage
- MongoDB
- Redis Stack

## Distributed System Tools
- RedisBloom
- BullMQ

## Infrastructure
- Docker
- Docker Compose
- Nginx

## Authentication & Security
- JWT
- bcrypt

---

# Project Structure

```bash
URLX/
│
├── nginx/
│
├── node_modules/
│
├── src/
│
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
└── tsconfig.json
```

---

# Distributed ID Generation

URLX avoids database bottlenecks using Redis-based range allocation.

Example:

```text
API 1 → IDs 1-500
API 2 → IDs 501-1000
API 3 → IDs 1001-1500
```

Each API:
1. fetches a range from Redis
2. increments locally in memory
3. converts integers into Base62 strings

Example:

```text
125 -> cb
5000 -> 1Ie
```

Benefits:
- O(1) ID generation
- minimal Redis calls
- no database locking
- high concurrency support

---

# How to run this app

## Prerequisites

- Docker
- Docker Compose

---

# Clone Repository

```bash
git clone https://github.com/aftabbhussain/urlx.git

cd urlx
```

---

# Environment Variables

Create `.env`

```env
PORT=4000

# Leave blank to use Docker MongoDB container(local)
MONGO_URI=

JWT_SECRET=your_secret_key
```

---

# Start Infrastructure

```bash
docker-compose up --build --scale api=3
```

This launches:
- Nginx
- MongoDB
- Redis Stack
- 3 API replicas
- Analytics Worker

---

# API Reference

## Public Routes

### Create Short URL

```http
POST /shorten
```

Body:

```json
{
  "longUrl": "https://example.com"
}
```

Optional Header:

```http
Authorization: Bearer <token>
```

---

### Redirect URL

```http
GET /:shortId
```

Flow:
- Bloom filter validation
- Redis cache lookup
- MongoDB fallback
- analytics queue push
- redirect response

---

# Authentication Routes

## Register

```http
POST /auth/register
```

Body:

```json
{
  "email": "user@test.com",
  "password": "securepassword"
}
```

---

## Login

```http
POST /auth/login
```

Returns signed JWT token.

---

# Protected Routes

## Analytics

```http
GET /analytics/:shortId
```

Required Header:

```http
Authorization: Bearer <token>
```

Security:
- validates JWT
- verifies ownership
- protects analytics access

---

# Scaling APIs

Increase replicas:

```bash
docker-compose up --scale api=5
```

Nginx automatically distributes traffic across all containers.

---

# Future Improvements

- Kubernetes deployment
- Prometheus + Grafana monitoring
- Distributed tracing
- Rate limiting
- URL expiration
- Geo analytics
- Kafka/RabbitMQ migration
- CI/CD pipelines
- Multi-region deployment

---

# Engineering Concepts Demonstrated

- Distributed systems
- Backend scalability
- Reverse proxies
- Load balancing
- Queue systems
- Redis internals
- Probabilistic data structures
- Stateless authentication
- Docker networking
- Production-grade backend design

---

# Deployment Targets

- AWS ECS
- Kubernetes
- Railway
- Render
- Fly.io
- DigitalOcean

---

# Author

Aftab Hussain

GitHub:
https://github.com/aftabbhussain

---
