// backend/routes/chat.js
import express from 'express';
import {
  getAllMessages,
  getAllUsers,
  clearMessages,
  clearUsers,
} from '../controllers/chatController.js';

const router = express.Router();

/**
 * GET /api/chat/messages
 * Get all chat messages from Firestore
 */
router.get('/messages', async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.json({
      success: true,
      data: messages,
      count: messages.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/chat/users
 * Get all online users
 */
router.get('/users', (req, res) => {
  try {
    const users = getAllUsers();
    res.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/chat/stats
 * Get chat statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const messages = await getAllMessages();
    const users = getAllUsers();

    res.json({
      success: true,
      stats: {
        totalMessages: messages.length,
        onlineUsers: users.length,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * DELETE /api/chat/messages (Admin only)
 * Clear all messages
 */
router.delete('/messages', async (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    await clearMessages();
    res.json({
      success: true,
      message: 'All messages cleared',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * DELETE /api/chat/users (Admin only)
 * Clear all users
 */
router.delete('/users', (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    clearUsers();
    res.json({
      success: true,
      message: 'All users cleared',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Export route factory function
 */
export default (io) => {
  return router;
};