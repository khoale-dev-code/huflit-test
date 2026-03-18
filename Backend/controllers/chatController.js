// // backend/controllers/chatController.js
// import { db, isFirebaseEnabled } from '../firebase-config.js';
// import admin from 'firebase-admin';

// // In-memory storage for online users only
// let users = new Map();

// // In-memory message cache (fallback when Firebase unavailable)
// let messageCache = [];

// /**
//  * Handle user join event
//  */
// export const handleUserJoin = async (socket, io, data) => {
//   try {
//     const { userId, userName, avatar } = data;

//     const user = {
//       socketId: socket.id,
//       userId,
//       userName,
//       avatar,
//       joinedAt: new Date(),
//       isOnline: true,
//     };

//     users.set(socket.id, user);

//     // Broadcast user joined
//     io.emit('user-joined', {
//       message: `${userName} đã tham gia phòng chat`,
//       user,
//       users: Array.from(users.values()),
//       timestamp: new Date(),
//     });

//     console.log('👥 Online users:', users.size);
//     console.log('✅ User joined:', userName);
//   } catch (error) {
//     console.error('❌ Error in handleUserJoin:', error.message);
//   }
// };

// /**
//  * Handle send message event - Save to Firestore or cache
//  */
// export const handleSendMessage = async (socket, io, data) => {
//   try {
//     const { content, sender, senderId } = data;

//     const message = {
//       id: Date.now(),
//       content,
//       sender,
//       senderId,
//       timestamp: isFirebaseEnabled ? admin.firestore.Timestamp.now() : new Date(),
//       socketId: socket.id,
//     };

//     // Try to save to Firestore
//     if (isFirebaseEnabled) {
//       try {
//         await db.collection('messages').doc(String(message.id)).set(message);
//         console.log('✅ Message saved to Firestore:', sender);
//       } catch (firestoreError) {
//         console.warn('⚠️ Firestore save failed, using cache:', firestoreError.message);
//         messageCache.push(message);
//       }
//     } else {
//       // Use cache if Firebase disabled
//       messageCache.push(message);
//       console.log('📝 Message cached (Firebase disabled)');
//     }

//     // Broadcast message to all clients
//     const broadcastMessage = {
//       ...message,
//       timestamp: message.timestamp instanceof admin.firestore.Timestamp 
//         ? new Date(message.timestamp.toMillis())
//         : message.timestamp,
//     };

//     io.emit('receive-message', broadcastMessage);
//     console.log('💬 Message broadcast:', sender, '-', content);
//   } catch (error) {
//     console.error('❌ Error in handleSendMessage:', error.message);
//   }
// };

// /**
//  * Handle delete message event
//  */
// export const handleDeleteMessage = async (socket, io, messageId) => {
//   try {
//     // Delete from Firestore if enabled
//     if (isFirebaseEnabled) {
//       try {
//         await db.collection('messages').doc(String(messageId)).delete();
//         console.log('✅ Message deleted from Firestore:', messageId);
//       } catch (firestoreError) {
//         console.warn('⚠️ Firestore delete failed:', firestoreError.message);
//       }
//     }

//     // Delete from cache
//     messageCache = messageCache.filter(msg => msg.id !== messageId);
//     console.log('📝 Message removed from cache');

//     io.emit('message-deleted', messageId);
//     console.log('🗑️ Message deleted:', messageId);
//   } catch (error) {
//     console.error('❌ Error in handleDeleteMessage:', error.message);
//   }
// };

// /**
//  * Handle user disconnect event
//  */
// export const handleUserDisconnect = (socket, io) => {
//   try {
//     const user = users.get(socket.id);

//     if (user) {
//       users.delete(socket.id);
      
//       io.emit('user-left', {
//         message: `${user.userName} đã rời phòng chat`,
//         userId: user.userId,
//         userName: user.userName,
//         users: Array.from(users.values()),
//         timestamp: new Date(),
//       });

//       console.log('👋 User disconnected:', user.userName, `(${socket.id})`);
//       console.log('👥 Remaining online users:', users.size);
//     }
//   } catch (error) {
//     console.error('❌ Error in handleUserDisconnect:', error.message);
//   }
// };

// /**
//  * Get all messages from Firestore or cache
//  */
// export const getAllMessages = async () => {
//   try {
//     let messages = [];

//     // Try to fetch from Firestore if enabled
//     if (isFirebaseEnabled) {
//       try {
//         const snapshot = await db.collection('messages')
//           .orderBy('timestamp', 'asc')
//           .limit(100)
//           .get();

//         messages = snapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             ...data,
//             timestamp: data.timestamp instanceof admin.firestore.Timestamp
//               ? new Date(data.timestamp.toMillis())
//               : data.timestamp,
//           };
//         });

//         console.log('✅ Fetched', messages.length, 'messages from Firestore');
//       } catch (firestoreError) {
//         console.warn('⚠️ Firestore fetch failed, using cache:', firestoreError.message);
//         messages = messageCache;
//       }
//     } else {
//       // Use cache if Firebase disabled
//       messages = messageCache;
//       console.log('📝 Using cached messages:', messages.length);
//     }

//     return messages;
//   } catch (error) {
//     console.error('❌ Error fetching messages:', error.message);
//     return messageCache; // Fallback to cache
//   }
// };

// /**
//  * Get all online users
//  */
// export const getAllUsers = () => {
//   const userArray = Array.from(users.values());
//   console.log('👥 Active users:', userArray.length);
//   return userArray;
// };

// /**
//  * Clear all messages from Firestore and cache
//  */
// export const clearMessages = async () => {
//   try {
//     // Clear from Firestore if enabled
//     if (isFirebaseEnabled) {
//       try {
//         const batch = db.batch();
//         const snapshot = await db.collection('messages').get();

//         snapshot.docs.forEach((doc) => {
//           batch.delete(doc.ref);
//         });

//         await batch.commit();
//         console.log('✅ Cleared messages from Firestore');
//       } catch (firestoreError) {
//         console.warn('⚠️ Firestore clear failed:', firestoreError.message);
//       }
//     }

//     // Clear cache
//     const count = messageCache.length;
//     messageCache = [];
//     console.log('🗑️ Cleared', count, 'messages from cache');
//   } catch (error) {
//     console.error('❌ Error clearing messages:', error.message);
//   }
// };

// /**
//  * Clear all users (admin only)
//  */
// export const clearUsers = () => {
//   try {
//     const count = users.size;
//     users.clear();
//     console.log('🗑️ Cleared all', count, 'users');
//   } catch (error) {
//     console.error('❌ Error clearing users:', error.message);
//   }
// };

// /**
//  * Get message count
//  */
// export const getMessageCount = () => {
//   return messageCache.length;
// };

// /**
//  * Get user count
//  */
// export const getUserCount = () => {
//   return users.size;
// };

// /**
//  * Get system stats
//  */
// export const getSystemStats = () => {
//   return {
//     onlineUsers: users.size,
//     cachedMessages: messageCache.length,
//     firebaseEnabled: isFirebaseEnabled,
//     timestamp: new Date(),
//   };
// };