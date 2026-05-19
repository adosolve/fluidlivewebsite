import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import pool from './db.js';
import chatbotRoutes from './routes/chatbot.js';
import blogRoutes from './routes/blog.js';
import contactRoutes from './routes/contact.js';
import newsletterRoutes from './routes/newsletter.js';
import sitemapRoutes from './routes/sitemap.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const httpServer = createServer(app);

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,https://fluidlivewebsite.vercel.app').split(',').map(s => s.trim());

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST']
  }
});

// Make io and db accessible to routes
app.set('io', io);
app.set('db', pool);

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/sitemap', sitemapRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('📡 Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('📡 Client disconnected:', socket.id);
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Chatbot API: http://localhost:${PORT}/api/chatbot`);
  console.log(`📰 Blog API: http://localhost:${PORT}/api/blog`);
  console.log(`🔌 Socket.IO ready`);
});
