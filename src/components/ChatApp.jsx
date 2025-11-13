import React, { useState, useEffect, useRef } from 'react';
import { Send, Trash2, Users, MessageCircle, X, Menu } from 'lucide-react';

const ChatApp = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showUsersList, setShowUsersList] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

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
    
    // Import socket.io-client dynamically (if available)
    const initSocket = async () => {
      try {
        const { io } = await import('socket.io-client');
        
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
          setLoading(false);
        });
      } catch (error) {
        console.error('❌ Socket.IO not available:', error);
        setLoading(false);
      }
    };

    initSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  const getCurrentUserId = () => {
    return user?.id || user?.uid || 'currentUser';
  };

  const getCurrentUserName = () => {
    return user?.name || user?.email?.split('@')[0] || user?.username || 'Bạn';
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !isConnected || !socketRef.current) return;

    const messageData = {
      content: inputValue,
      sender: getCurrentUserName(),
      senderId: getCurrentUserId(),
    };

    console.log('📤 Sending message:', messageData);
    socketRef.current.emit('send-message', messageData);
    setInputValue('');
  };

  const handleDeleteMessage = (messageId) => {
    if (!socketRef.current) return;
    console.log('🗑️ Deleting message:', messageId);
    socketRef.current.emit('delete-message', messageId);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
            <MessageCircle className="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-700 text-base sm:text-lg font-semibold">Đang tải chat...</p>
          <p className="text-gray-500 text-sm mt-2">Vui lòng chờ giây lát</p>
        </div>
      </div>
    );
  }

  const currentUserId = getCurrentUserId();

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar Overlay for mobile */}
      {showUsersList && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowUsersList(false)}
        />
      )}

      {/* Users sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-72 sm:w-80 lg:w-72 xl:w-80
        bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${showUsersList ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Online ({onlineUsers.length})
          </h3>
          <button
            onClick={() => setShowUsersList(false)}
            className="lg:hidden p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-3">
          {onlineUsers.length > 0 ? (
            <div className="space-y-2">
              {onlineUsers.map((u) => (
                <div 
                  key={u.socketId} 
                  className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl shadow-lg">
                      {u.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                        {u.userName}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Đang hoạt động
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Users className="w-16 h-16 mb-3 opacity-50" />
              <p className="text-sm text-center">Chưa có người online</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white p-3 sm:p-4 shadow-lg flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => setShowUsersList(true)}
              className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2 truncate">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Global Chat</span>
              </h1>
              <p className="text-xs sm:text-sm flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                {isConnected ? 'Đã kết nối' : 'Mất kết nối'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowUsersList(!showUsersList)}
            className="hidden lg:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">{onlineUsers.length}</span>
          </button>
        </div>

        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 min-h-0 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-indigo-500" />
                </div>
                <p className="text-gray-600 text-base sm:text-lg font-semibold">Chưa có tin nhắn</p>
                <p className="text-gray-400 text-sm mt-2">Hãy bắt đầu cuộc trò chuyện!</p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isCurrentUser = msg.senderId === currentUserId;
              const prevMsg = messages[index - 1];
              const showAvatar = !prevMsg || prevMsg.senderId !== msg.senderId || prevMsg.isSystem;
              
              return (
                <div
                  key={msg.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  style={{
                    animation: 'fadeIn 0.3s ease-in-out'
                  }}
                >
                  {msg.isSystem ? (
                    <div className="w-full flex justify-center">
                      <div className="bg-white/80 backdrop-blur-sm text-gray-600 px-4 py-2 rounded-full text-xs sm:text-sm shadow-sm border border-gray-200 max-w-xs">
                        <span className="font-medium">{msg.content}</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`flex gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-[65%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      {!isCurrentUser && (
                        <div className={`flex-shrink-0 ${showAvatar ? 'visible' : 'invisible'}`}>
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                            {msg.sender.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}

                      {/* Message bubble */}
                      <div className="flex flex-col gap-1">
                        {showAvatar && !isCurrentUser && (
                          <span className="text-xs font-semibold text-gray-600 ml-2">
                            {msg.sender}
                          </span>
                        )}
                        
                        <div className="relative group">
                          <div
                            className={`px-4 py-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
                              isCurrentUser
                                ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-md'
                                : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                            }`}
                          >
                            <p className="text-sm sm:text-base break-words whitespace-pre-wrap leading-relaxed">
                              {msg.content}
                            </p>
                            <p className={`text-xs mt-1.5 ${isCurrentUser ? 'text-indigo-100' : 'text-gray-400'}`}>
                              {formatTime(msg.timestamp)}
                            </p>
                          </div>

                          {/* Delete button */}
                          {isCurrentUser && (
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 bg-red-50 hover:bg-red-100 rounded-lg"
                              title="Xóa tin nhắn"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
        <div className="bg-white border-t border-gray-200 p-3 sm:p-4 shadow-lg flex-shrink-0">
          <div className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Nhập tin nhắn..."
              disabled={!isConnected}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!isConnected || !inputValue.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:transform-none"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Gửi</span>
            </button>
          </div>
          {!isConnected && (
            <div className="flex items-center gap-2 text-red-500 text-xs sm:text-sm mt-3 bg-red-50 px-3 py-2 rounded-lg">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Đang kết nối lại...
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #a5b4fc;
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #818cf8;
        }
      `}</style>
    </div>
  );
};

export default ChatApp;