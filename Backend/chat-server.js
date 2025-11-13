// Backend/chat-server.js
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

// ============================================
// CORS Configuration
// ============================================

// Parse allowed origins from environment variable
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173'];

console.log('🌐 Allowed CORS origins:', allowedOrigins);

// CORS options với wildcard support
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) {
      console.log('✅ Request with no origin allowed');
      return callback(null, true);
    }
    
    // Check exact match first
    if (allowedOrigins.includes(origin)) {
      console.log('✅ CORS allowed (exact match):', origin);
      return callback(null, true);
    }
    
    // Check wildcard patterns (*.vercel.app, *.onrender.com)
    const wildcardMatch = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Convert wildcard to regex pattern
        const pattern = allowedOrigin
          .replace(/\./g, '\\.')  // Escape dots
          .replace(/\*/g, '.*');  // Replace * with .*
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(origin);
      }
      return false;
    });
    
    if (wildcardMatch) {
      console.log('✅ CORS allowed (wildcard match):', origin);
      return callback(null, true);
    }
    
    // Origin not allowed
    console.warn('❌ CORS blocked origin:', origin);
    console.warn('   Allowed origins:', allowedOrigins);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// ============================================
// Socket.IO Configuration
// ============================================

const io = new Server(server, {
  cors: corsOptions,
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling']
});

// ============================================
// Middleware
// ============================================

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path} - Origin: ${req.get('origin') || 'no origin'}`);
  next();
});

// ============================================
// Initialize Firestore
// ============================================

console.log('🔄 Initializing Firestore...');
try {
  await initializeFirestore();
  console.log('✅ Firestore initialization complete');
} catch (error) {
  console.error('❌ Failed to initialize Firestore:', error);
  console.error('   Server will continue but database features may not work');
  // Don't exit - let server run for health checks
}

// ============================================
// Routes
// ============================================

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 HUFLIT Chat Server',
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: '✅ Server is running',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/chat', chatRoutes(io));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    path: req.path,
    message: 'The requested endpoint does not exist'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// Socket.IO Connection Handling
// ============================================

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);
  console.log('   Transport:', socket.conn.transport.name);
  console.log('   Total connections:', io.engine.clientsCount);

  // User join room
  socket.on('user-join', (data) => {
    try {
      console.log('👤 User joining:', data);
      handleUserJoin(socket, io, data);
    } catch (error) {
      console.error('❌ Error in user-join:', error);
      socket.emit('error', { message: 'Failed to join chat' });
    }
  });

  // Send message
  socket.on('send-message', (data) => {
    try {
      console.log('💬 Message received:', { from: data.username, length: data.message?.length });
      handleSendMessage(socket, io, data);
    } catch (error) {
      console.error('❌ Error in send-message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Delete message
  socket.on('delete-message', (messageId) => {
    try {
      console.log('🗑️ Deleting message:', messageId);
      handleDeleteMessage(socket, io, messageId);
    } catch (error) {
      console.error('❌ Error in delete-message:', error);
      socket.emit('error', { message: 'Failed to delete message' });
    }
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    socket.broadcast.emit('user-typing', data);
  });

  socket.on('stop-typing', (data) => {
    socket.broadcast.emit('user-stop-typing', data);
  });

  // User disconnect
  socket.on('disconnect', (reason) => {
    console.log('⚪ User disconnected:', socket.id);
    console.log('   Reason:', reason);
    console.log('   Remaining connections:', io.engine.clientsCount);
    
    try {
      handleUserDisconnect(socket, io);
    } catch (error) {
      console.error('❌ Error in disconnect handler:', error);
    }
  });

  // Handle errors
  socket.on('error', (error) => {
    console.error('❌ Socket error:', socket.id, error);
  });
});

// Socket.IO error handling
io.engine.on('connection_error', (err) => {
  console.error('❌ Socket.IO connection error:', err);
});

// ============================================
// Graceful Shutdown
// ============================================

const gracefulShutdown = async (signal) => {
  console.log(`\n📴 ${signal} received: closing server gracefully...`);
  
  // Stop accepting new connections
  server.close(() => {
    console.log('✅ HTTP server closed');
  });

  // Close all socket connections
  io.close(() => {
    console.log('✅ Socket.IO server closed');
  });

  // Give existing connections time to finish
  setTimeout(() => {
    console.log('⏱️ Forcing shutdown after timeout');
    process.exit(0);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// ============================================
// Export
// ============================================

export { app, server, io };
export default server;