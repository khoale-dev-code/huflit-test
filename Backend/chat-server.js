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
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firestore
await initializeFirestore();

// Routes
app.use('/api/chat', chatRoutes(io));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: '✅ Server is running', timestamp: new Date() });
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // User join
  socket.on('user-join', (data) => {
    handleUserJoin(socket, io, data);
  });

  // Send message
  socket.on('send-message', (data) => {
    handleSendMessage(socket, io, data);
  });

  // Delete message
  socket.on('delete-message', (messageId) => {
    handleDeleteMessage(socket, io, messageId);
  });

  // User disconnect
  socket.on('disconnect', () => {
    handleUserDisconnect(socket, io);
  });
});

export { app, server, io };
export default server;