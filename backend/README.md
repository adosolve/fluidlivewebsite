# Fluid.Live Backend

Node.js backend for Fluid.Live website - handles chatbot and blog APIs.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fluidlive
JWT_SECRET=your_jwt_secret_key_here
CORS_ORIGIN=http://localhost:5173
```

### Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Chatbot API
- `POST /api/chatbot/message` - Send a message to the chatbot
- `GET /api/chatbot/history/:userId` - Get chat history for a user
- `DELETE /api/chatbot/history/:userId` - Clear chat history

### Blog API
- `GET /api/blog` - Get all blog posts (with pagination)
- `GET /api/blog/:id` - Get a single blog post
- `POST /api/blog` - Create a new blog post (admin only)
- `PUT /api/blog/:id` - Update a blog post (admin only)
- `DELETE /api/blog/:id` - Delete a blog post (admin only)

### Health Check
- `GET /api/health` - Check if backend is running

## Project Structure

```
backend/
├── server.js           # Main server file
├── routes/
│   ├── chatbot.js     # Chatbot API routes
│   └── blog.js        # Blog API routes
├── models/            # Database models (to be added)
├── middleware/        # Custom middleware (to be added)
├── controllers/       # Route controllers (to be added)
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Next Steps

- [ ] Set up MongoDB connection
- [ ] Create database models for Blog and ChatHistory
- [ ] Implement authentication middleware
- [ ] Integrate AI chatbot service
- [ ] Add input validation
- [ ] Add error handling
- [ ] Add logging
- [ ] Deploy to production

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGIN` - Frontend URL for CORS

## License

MIT
