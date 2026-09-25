# farm-nodejs

A lightweight server-side rendered Node.js web application and simple REST API serving an organic produce store without external web frameworks.

## Project Overview

`farm-nodejs` demonstrates fundamental Node.js architectural concepts using built-in modules (`http`, `fs`, `url`) alongside custom template interpolation (`replaceTemplate`). The application serves dynamic overview cards and individual product pages reading directly from local JSON datasets, as well as an API endpoint exposing raw product data.

## Features

- **Framework-Free HTTP Server**: Built entirely using Node's standard `http` and `url` modules.
- **Server-Side Template Engine**: Dynamic placeholder replacement (`replaceTemplate.js`) hydrating HTML templates with JSON data.
- **REST API Endpoint**: Serves product data at `/api` in JSON format.
- **SEO & Clean URL Slugs**: Automatic slug generation using `slugify` for clean product routing.
- **Synchronous Initialization & Non-blocking Serving**: Preloads static template assets into memory synchronously on server boot for low-latency request handling.

## Prerequisites

- Node.js (version 16.x or newer).
- npm (Node Package Manager).

## Installation/Build

1. Clone the repository:
   ```bash
   git clone https://github.com/AntonioHellin/farm-nodejs.git
   cd farm-nodejs
   ```

2. Install runtime and development dependencies:
   ```bash
   npm install
   ```

## Usage

Start the development server with automatic file watching:
```bash
npm start
```

Or run directly with Node:
```bash
node index.js
```

The server listens on `http://127.0.0.1:8000/`.
- Overview page: `http://127.0.0.1:8000/` or `http://127.0.0.1:8000/overview`
- Individual product: `http://127.0.0.1:8000/product?id=0`
- API endpoint: `http://127.0.0.1:8000/api`
