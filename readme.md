Here's the updated README.md file based on your provided code:

# Article API with Node.js, Fastify, and MongoDB

A high-performance RESTful API for managing articles built with Node.js, Fastify framework, and MongoDB database.

## Features

- 🚀 Fastify for high-performance API endpoints
- 🍃 MongoDB for flexible data storage
- 🔐 Environment variable configuration
- 📝 Article management (CRUD operations)
- 🔍 Filtering by tags and date ranges
- ✅ Input validation
- 📊 Pagination support

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB instance
- Postman or similar API testing tool (optional)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/article-api.git
cd article-api
```

2. **Install dependencies**

```bash
npm install fastify @fastify/mongodb mongoose dotenv
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add your configuration:

```env
DB_URL=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/article-api?retryWrites=true&w=majority
PORT=3000
```

For local MongoDB, you can use:
```env
DB_URL=mongodb://localhost:27017/article-api
```

4. **Run the application**

```bash
node src/index.js
```

For development with logging:

```bash
npm start
```

## API Endpoints

### Articles

- `GET /articles` - Get all articles (with optional filtering)
  - Query parameters:
    - `tag` - Filter by tag
    - `startDate` - Filter articles published after this date (YYYY-MM-DD)
    - `endDate` - Filter articles published before this date (YYYY-MM-DD)
  
- `GET /articles/:id` - Get a specific article by ID
- `POST /articles` - Create a new article
- `PUT /articles/:id` - Update an existing article
- `DELETE /articles/:id` - Delete an article

## Request/Response Examples

### Create Article (POST /articles)
Request:
```json
{
  "title": "Getting Started with Fastify",
  "content": "Fastify is a fast and low overhead web framework for Node.js...",
  "tags": ["nodejs", "fastify", "backend"]
}
```

Response (201 Created):
```json
{
  "savedArticle": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with Fastify",
    "content": "Fastify is a fast and low overhead web framework for Node.js...",
    "tags": ["nodejs", "fastify", "backend"],
    "publishDate": "2023-07-20T12:00:00.000Z"
  }
}
```

### Filter Articles (GET /articles?tag=nodejs&startDate=2023-01-01)
Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with Fastify",
    "content": "Fastify is a fast and low overhead web framework for Node.js...",
    "tags": ["nodejs", "fastify", "backend"],
    "publishDate": "2023-07-20T12:00:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Node.js Performance Tips",
    "content": "Here are some tips to improve your Node.js application performance...",
    "tags": ["nodejs", "performance"],
    "publishDate": "2023-03-15T09:30:00.000Z"
  }
]
```

## Database Schema

### Article
```javascript
{
  title: { type: String, required: true },
  content: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  tags: [{ type: String }]
}
```

## Development Scripts

- `npm start` - Start the server with logging
- `node src/index.js` - Start the server

## Error Handling

The API returns appropriate HTTP status codes:
- 200 OK - Successful GET requests
- 201 Created - Successful POST requests
- 204 No Content - Successful DELETE requests
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server errors

## Debug Notes

For MongoDB connection options, you might want to add these to your `mongoose.connect()`:
```javascript
mongoose.connect(dburl, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});
```
These options:
- `useNewUrlParser`: Enables the new MongoDB connection string parser
- `useUnifiedTopology`: Enables the new server discovery and monitoring engine

## License

[MIT](https://choosealicense.com/licenses/mit/)