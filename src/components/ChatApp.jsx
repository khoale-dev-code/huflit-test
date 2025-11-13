// components/ChatApp.jsx (React Component)
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, Trash2, Users, MessageCircle } from 'lucide-react';

const ChatApp = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [showUsersList, setShowUsersList] = useState(false);

  // Get current user ID (support both Clerk and Firebase)
  const getCurrentUserId = () => {
    return user?.id || user?.uid || 'anonymous';
  };

  // Get current user name
  const getCurrentUserName = () => {
    return user?.name || user?.email?.split('@')[0] || user?.username || 'Guest';
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Connect Socket.IO
  useEffect(() => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    
    console.log('🔌 Connecting to:', SOCKET_URL);
    
    socketRef.current = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
    });

    // Load history messages
    const loadMessages = async () => {
      try {
        const res = await fetch(`${SOCKET_URL}/api/chat/messages`);
        const data = await res.json();
        
        if (data.success) {
          setMessages(data.data || []);
        }
        setLoading(false);
      } catch (err) {
        console.error('❌ Error loading messages:', err);
        setLoading(false);
      }
    };

    loadMessages();

    // Connection events
    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('✅ Connected to chat server');

      // Emit user join event
      const userData = {
        userId: getCurrentUserId(),
        userName: getCurrentUserName(),
        avatar: user?.avatar || '👤',
      };

      console.log('👤 User joining:', userData);
      socketRef.current.emit('user-join', userData);
    });

    // Receive messages
    socketRef.current.on('receive-message', (message) => {
      console.log('💬 Received message:', message);
      setMessages(prev => [...prev, message]);
    });

    // User joined
    socketRef.current.on('user-joined', ({ user: joinedUser, users: activeUsers }) => {
      console.log('👥 User joined:', joinedUser.userName);
      setOnlineUsers(activeUsers);
      setMessages(prev => [...prev, {
        id: Date.now(),
        isSystem: true,
        content: `${joinedUser.userName} đã tham gia`,
        timestamp: new Date(),
      }]);
    });

    // User left
    socketRef.current.on('user-left', ({ users: activeUsers }) => {
      console.log('👋 User left');
      setOnlineUsers(activeUsers);
      setMessages(prev => [...prev, {
        id: Date.now(),
        isSystem: true,
        content: 'Một người dùng đã rời phòng',
        timestamp: new Date(),
      }]);
    });

    // Message deleted
    socketRef.current.on('message-deleted', (messageId) => {
      console.log('🗑️ Message deleted:', messageId);
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ Disconnected from chat server');
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('❌ Connection error:', error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!inputValue.trim() || !isConnected) return;

    const messageData = {
      content: inputValue,
      sender: getCurrentUserName(),
      senderId: getCurrentUserId(),
    };

    console.log('📤 Sending message:', messageData);
    socketRef.current.emit('send-message', messageData);
    setInputValue('');
  };

  // Delete message
  const handleDeleteMessage = (messageId) => {
    console.log('🗑️ Deleting message:', messageId);
    socketRef.current.emit('delete-message', messageId);
  };

  // Format time
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-600 mx-auto" />
          </div>
          <p className="text-gray-600 text-sm sm:text-base font-semibold">Đang tải chat...</p>
        </div>
      </div>
    );
  }

  const currentUserId = getCurrentUserId();

  return (
    <div className="flex h-full bg-gray-100">
      {/* Users sidebar */}
      {showUsersList && (
        <div className="w-48 sm:w-64 bg-white border-r border-gray-300 overflow-y-auto">
          <div className="p-3 sm:p-4 border-b border-gray-300 sticky top-0 bg-white">
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              Online ({onlineUsers.length})
            </h3>
          </div>
          <div className="p-2 sm:p-3">
            {onlineUsers.length > 0 ? (
              onlineUsers.map((u) => (
                <div key={u.socketId} className="p-2 sm:p-3 mb-2 bg-indigo-50 rounded-lg border border-indigo-200 text-xs sm:text-sm">
                  <p className="font-semibold text-gray-800">{u.avatar} {u.userName}</p>
                  <p className="text-gray-500 text-xs">Online</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xs text-center py-4">Chưa có người online</p>
            )}
          </div>
        </div>
      )}

      {/* Chat section */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-3 sm:p-4 shadow-lg flex items-center justify-between flex-shrink-0">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold flex items-center gap-2 truncate">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span className="hidden sm:inline">Global Chat</span>
              <span className="sm:hidden">Chat</span>
            </h1>
            <p className={`text-xs sm:text-sm ${isConnected ? 'text-green-300' : 'text-red-300'}`}>
              {isConnected ? '🟢 Đã kết nối' : '🔴 Mất kết nối'}
            </p>
          </div>
          <button
            onClick={() => setShowUsersList(!showUsersList)}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors flex-shrink-0 text-sm sm:text-base"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            {onlineUsers.length}
          </button>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 min-h-0">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm sm:text-base">Hãy bắt đầu cuộc trò chuyện!</p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {msg.isSystem ? (
                  <div className="bg-gray-300 text-gray-700 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm text-center max-w-xs">
                    {msg.content}
                  </div>
                ) : (
                  <div
                    className={`max-w-xs px-3 py-2 sm:px-4 sm:py-3 rounded-lg group relative text-sm sm:text-base ${
                      msg.senderId === currentUserId
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-300 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-xs font-semibold mb-1 opacity-75">
                      {msg.sender}
                    </p>
                    <p className="break-words">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === currentUserId ? 'text-indigo-200' : 'text-gray-500'}`}>
                      {formatTime(msg.timestamp)}
                    </p>

                    {/* Delete button */}
                    {msg.senderId === currentUserId && (
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Xóa tin nhắn"
                      >
                        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
        <div className="bg-white border-t border-gray-300 p-3 sm:p-4 shadow-lg flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhắn tin..."
              disabled={!isConnected}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!isConnected || !inputValue.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm sm:text-base flex-shrink-0"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Gửi</span>
              <span className="sm:hidden">OK</span>
            </button>
          </form>
          {!isConnected && (
            <p className="text-red-500 text-xs sm:text-sm mt-2">⚠️ Đang kết nối lại...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;