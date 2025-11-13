// backend/chat-server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// Import routes
import chatRoutes from './routes/chat.js';

// Import controllers
import { 
  handleUserJoin, 
  handleSendMessage, 
  handleDeleteMessage, 
  handleUserDisconnect 
} from './controllers/chatController.js';

// Import Firestore
import { initializeFirestore } from './firebase-config.js';

const app = express();
const server = http.createServer(app);

// Parse multiple origins from environment variable
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173'];

console.log('🌐 Allowed CORS origins:', allowedOrigins);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Initialize Firestore
console.log('🔄 Initializing Firestore...');
await initializeFirestore().catch(error => {
  console.error('❌ Failed to initialize Firestore:', error);
  process.exit(1); // Exit if Firebase fails to initialize
});

// Routes
app.use('/api/chat', chatRoutes(io));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 HUFLIT Chat Server',
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: '✅ Server is running', 
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    memory: process.memoryUsage()
  });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('user-join', (data) => {
    handleUserJoin(socket, io, data);
  });

  socket.on('send-message', (data) => {
    handleSendMessage(socket, io, data);
  });

  socket.on('delete-message', (messageId) => {
    handleDeleteMessage(socket, io, messageId);
  });

  socket.on('disconnect', () => {
    handleUserDisconnect(socket, io);
  });
});

export { app, server, io };
export default server;