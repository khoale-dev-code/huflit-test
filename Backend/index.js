// // backend/index.js
// import dotenv from 'dotenv';
// dotenv.config();

// import app from './chat-server.js';

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
//   console.log(`📡 Socket.IO ready for connections`);
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM signal received: closing HTTP server');
//   server.close(() => {
//     console.log('HTTP server closed');
//   });
// });

// export default app;