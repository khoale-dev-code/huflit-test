// backend/controllers/chatController.js
import { db } from '../firebase-config.js';
import admin from 'firebase-admin';

// In-memory storage for online users only
let users = new Map();

/**
 * Handle user join event
 */
export const handleUserJoin = async (socket, io, data) => {
  try {
    const { userId, userName, avatar } = data;

    const user = {
      socketId: socket.id,
      userId,
      userName,
      avatar,
      joinedAt: new Date(),
    };

    users.set(socket.id, user);

    // Broadcast user joined
    io.emit('user-joined', {
      message: `${userName} đã tham gia phòng chat`,
      user,
      users: Array.from(users.values()),
    });

    console.log('👥 Online users:', users.size);
  } catch (error) {
    console.error('❌ Error in handleUserJoin:', error);
  }
};

/**
 * Handle send message event - Save to Firestore
 */
export const handleSendMessage = async (socket, io, data) => {
  try {
    const { content, sender, senderId } = data;

    const message = {
      id: Date.now(),
      content,
      sender,
      senderId,
      timestamp: admin.firestore.Timestamp.now(),
      socketId: socket.id,
    };

    // Save to Firestore
    await db.collection('messages').doc(String(message.id)).set(message);

    // Broadcast message
    io.emit('receive-message', {
      ...message,
      timestamp: new Date(message.timestamp.toMillis()),
    });

    console.log('💬 Message saved:', sender, '-', content);
  } catch (error) {
    console.error('❌ Error in handleSendMessage:', error);
  }
};

/**
 * Handle delete message event
 */
export const handleDeleteMessage = async (socket, io, messageId) => {
  try {
    // Delete from Firestore
    await db.collection('messages').doc(String(messageId)).delete();

    io.emit('message-deleted', messageId);
    console.log('🗑️ Message deleted:', messageId);
  } catch (error) {
    console.error('❌ Error in handleDeleteMessage:', error);
  }
};

/**
 * Handle user disconnect event
 */
export const handleUserDisconnect = (socket, io) => {
  try {
    const user = users.get(socket.id);

    if (user) {
      users.delete(socket.id);
      io.emit('user-left', {
        message: `${user.userName} đã rời phòng chat`,
        userId: user.userId,
        users: Array.from(users.values()),
      });

      console.log('❌ User disconnected:', socket.id);
      console.log('👥 Remaining users:', users.size);
    }
  } catch (error) {
    console.error('❌ Error in handleUserDisconnect:', error);
  }
};

/**
 * Get all messages from Firestore
 */
export const getAllMessages = async () => {
  try {
    const snapshot = await db.collection('messages')
      .orderBy('timestamp', 'asc')
      .limit(100)
      .get();

    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      timestamp: new Date(doc.data().timestamp.toMillis()),
    }));
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    return [];
  }
};

/**
 * Get all online users
 */
export const getAllUsers = () => {
  return Array.from(users.values());
};

/**
 * Clear all messages (admin only)
 */
export const clearMessages = async () => {
  try {
    const batch = db.batch();
    const snapshot = await db.collection('messages').get();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('🗑️ All messages cleared');
  } catch (error) {
    console.error('❌ Error clearing messages:', error);
  }
};

/**
 * Clear all users (admin only)
 */
export const clearUsers = () => {
  users.clear();
  console.log('🗑️ All users cleared');
};