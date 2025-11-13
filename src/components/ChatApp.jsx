import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Send, Trash2, Users, MessageCircle, X, Menu, Smile } from 'lucide-react';
  
// Giả định bạn đã import Socket.IO Client ở môi trường này
// const { io } = await import('socket.io-client'); // hoặc import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
const TYPING_TIMEOUT = 3000; // 3 giây không gõ sẽ dừng trạng thái 'typing'

// --- Helper functions (Cũng nên được tách ra file riêng nếu app lớn) ---

const getCurrentUserId = (user) => user?.id || user?.uid || 'currentUser';
const getCurrentUserName = (user) => user?.name || user?.email?.split('@')[0] || user?.username || 'Bạn';

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const diffInHours = (new Date() - date) / (1000 * 60 * 60);

  // Hiển thị giờ-phút nếu trong 24h, ngược lại hiển thị cả ngày
  if (diffInHours < 24) {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
};

// --- Sub Component: Message Bubble (Tách ra để tránh re-render) ---

const MessageBubble = React.memo(({ msg, isCurrentUser, currentUserId, onDeleteMessage, showAvatar }) => {
  if (msg.isSystem) {
    return (
      <div className="w-full flex justify-center animate-messageSlideIn">
        <div className="relative bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-sm text-gray-700 px-6 py-2.5 rounded-full text-sm shadow-md border border-purple-200 max-w-sm">
          <span className="font-semibold">✨ {msg.content}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-messageSlideIn`}
    >
      <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] md:max-w-[65%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        {!isCurrentUser && (
          <div className={`flex-shrink-0 ${showAvatar ? 'visible' : 'invisible'}`}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white">
                {msg.sender.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className="flex flex-col gap-1.5">
          {showAvatar && !isCurrentUser && (
            <span className="text-xs font-bold text-gray-600 ml-3">
              {msg.sender}
            </span>
          )}
          
          <div className="relative group">
            <div
              className={`relative px-5 py-3.5 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                isCurrentUser
                  ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 text-white rounded-br-lg'
                  : 'bg-white text-gray-800 rounded-bl-lg border-2 border-purple-100'
              }`}
            >
              <p className="text-sm sm:text-base break-words whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </p>
              <p className={`text-xs mt-2 flex items-center gap-1 ${isCurrentUser ? 'text-purple-100' : 'text-gray-400'}`}>
                {formatTime(msg.timestamp)}
                {isCurrentUser && <span className="ml-1">✓✓</span>}
              </p>
            </div>

            {/* Action buttons (Delete) */}
            {isCurrentUser && (
              <div className={`absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                <button
                  onClick={() => onDeleteMessage(msg.id)}
                  className="p-2.5 bg-red-50 hover:bg-red-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  title="Xóa tin nhắn"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// --- Main Component ---

const ChatApp = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showUsersList, setShowUsersList] = useState(false);
  const [typingUsers, setTypingUsers] = useState({}); // { 'userId': 'userName' }
  
  const socketRef = useRef(null);
  const typingTimerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Dùng useMemo để chỉ tính toán lại khi user thay đổi
  const currentUserId = useMemo(() => getCurrentUserId(user), [user]);
  const currentUserName = useMemo(() => getCurrentUserName(user), [user]);

  // Dùng useCallback để tránh việc hàm bị tạo lại mỗi lần re-render
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Cuộn xuống cuối khi messages thay đổi
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // --- Socket.IO Connection & Events (Cleaned up) ---
  useEffect(() => {
    let ioInstance;
    
    const initSocket = async () => {
      try {
        const { io } = await import('socket.io-client');
        
        ioInstance = io(SOCKET_URL, {
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionAttempts: 10,
        });

        socketRef.current = ioInstance;

        // 1. Load Messages (Initial)
        const loadMessages = async () => {
          try {
            const res = await fetch(`${SOCKET_URL}/api/chat/messages`);
            const data = await res.json();
            if (data.success) {
              setMessages(data.data || []);
            }
          } catch (err) {
            console.error('❌ Error loading messages:', err);
          } finally {
            setLoading(false);
          }
        };
        loadMessages();
        
        // 2. Event Listeners
        ioInstance.on('connect', () => {
          setIsConnected(true);
          console.log('✅ Connected to chat server');
          
          const userData = { userId: currentUserId, userName: currentUserName, avatar: user?.avatar || '👤' };
          ioInstance.emit('user-join', userData);
        });

        ioInstance.on('receive-message', (message) => {
          setMessages(prev => [...prev, message]);
        });

        ioInstance.on('user-joined', ({ user: joinedUser, users: activeUsers }) => {
          setOnlineUsers(activeUsers);
          setMessages(prev => [...prev, {
            id: Date.now() + Math.random(), // Đảm bảo ID hệ thống là duy nhất
            isSystem: true,
            content: `${joinedUser.userName} đã tham gia`,
            timestamp: new Date(),
          }]);
        });

        ioInstance.on('user-left', ({ users: activeUsers }) => {
          setOnlineUsers(activeUsers);
          setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            isSystem: true,
            content: 'Một người dùng đã rời phòng',
            timestamp: new Date(),
          }]);
        });

        ioInstance.on('message-deleted', (messageId) => {
          setMessages(prev => prev.filter(msg => msg.id !== messageId));
        });

        ioInstance.on('user-typing', ({ userId, userName }) => {
          if (userId !== currentUserId) {
            setTypingUsers(prev => ({ ...prev, [userId]: userName }));
          }
        });

        ioInstance.on('user-stop-typing', ({ userId }) => {
          setTypingUsers(prev => {
            const newState = { ...prev };
            delete newState[userId];
            return newState;
          });
        });

        ioInstance.on('disconnect', () => setIsConnected(false));
        ioInstance.on('connect_error', (error) => {
          console.error('❌ Connection error:', error);
          setLoading(false);
        });
        
      } catch (error) {
        console.error('❌ Socket.IO initialization error:', error);
        setLoading(false);
      }
    };

    initSocket();

    return () => {
      if (ioInstance) {
        ioInstance.off('connect');
        ioInstance.off('receive-message');
        ioInstance.off('user-joined');
        ioInstance.off('user-left');
        ioInstance.off('message-deleted');
        ioInstance.off('user-typing');
        ioInstance.off('user-stop-typing');
        ioInstance.off('disconnect');
        ioInstance.off('connect_error');
        ioInstance.disconnect();
      }
    };
  }, [currentUserId, currentUserName, user]); // Phụ thuộc vào user info

  // --- Handlers (Use useCallback) ---

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    const content = inputValue.trim();
    if (!content || !isConnected || !socketRef.current) return;

    const messageData = { content, sender: currentUserName, senderId: currentUserId };
    socketRef.current.emit('send-message', messageData);
    setInputValue('');
    
    // Đảm bảo trạng thái typing dừng lại ngay sau khi gửi
    clearTimeout(typingTimerRef.current);
    socketRef.current.emit('stop-typing', { userId: currentUserId });
    typingTimerRef.current = null;
  }, [inputValue, isConnected, currentUserName, currentUserId]);

  const handleDeleteMessage = useCallback((messageId) => {
    if (!socketRef.current) return;
    // Server sẽ kiểm tra quyền trước khi xóa
    socketRef.current.emit('delete-message', messageId); 
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!isConnected || !socketRef.current) return;

    // Logic Typing Indicator
    if (value.length > 0) {
      if (!typingTimerRef.current) {
        // Bắt đầu gõ
        socketRef.current.emit('typing', { userId: currentUserId, userName: currentUserName });
      } else {
        // Đã gõ, xóa timer cũ
        clearTimeout(typingTimerRef.current);
      }

      // Thiết lập timer mới
      typingTimerRef.current = setTimeout(() => {
        socketRef.current.emit('stop-typing', { userId: currentUserId });
        typingTimerRef.current = null;
      }, TYPING_TIMEOUT);

    } else if (typingTimerRef.current) {
      // Xóa hết chữ
      clearTimeout(typingTimerRef.current);
      socketRef.current.emit('stop-typing', { userId: currentUserId });
      typingTimerRef.current = null;
    }
  };

  // --- Rendering Helpers ---
  
  const typingUsersList = useMemo(() => {
    const names = Object.values(typingUsers);
    if (names.length === 0) return '';
    if (names.length === 1) return `${names[0]} đang gõ...`;
    if (names.length === 2) return `${names.join(' và ')} đang gõ...`;
    return 'Một số người đang gõ...';
  }, [typingUsers]);
  
  // --- JSX ---

  if (loading) {
    // ... (Loading state giữ nguyên)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-transparent border-t-purple-600 border-r-pink-500 border-b-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MessageCircle className="w-10 h-10 text-purple-600 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-800 text-xl font-bold mb-2">Đang kết nối chat...</p>
          <p className="text-gray-500 text-sm">Sắp xong rồi! ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 overflow-hidden relative">
      {/* Floating particles background (Tách CSS ra file riêng) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-2 h-2 bg-purple-300 rounded-full animate-float" style={{top: '10%', left: '10%', animationDelay: '0s'}}></div>
        {/* ... Thêm các phần tử khác nếu cần ... */}
      </div>

      {/* Sidebar Overlay */}
      {showUsersList && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
          onClick={() => setShowUsersList(false)}
        />
      )}

      {/* Users sidebar (Bố cục giữ nguyên, responsive tốt) */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-80 sm:w-96 lg:w-80 xl:w-96
        bg-white/95 backdrop-blur-xl shadow-2xl lg:shadow-xl
        transform transition-all duration-500 ease-out
        ${showUsersList ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
        border-r border-purple-100
      `}>
        {/* Sidebar Header */}
        <div className="relative p-5 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xl flex items-center gap-2 mb-1">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><Users className="w-5 h-5" /></div>
                Đang Online
              </h3>
              <p className="text-sm text-purple-100">{onlineUsers.length} người đang hoạt động</p>
            </div>
            <button
              onClick={() => setShowUsersList(false)}
              className="lg:hidden p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {onlineUsers.length > 0 ? (
            onlineUsers.map((u, idx) => (
              <div 
                key={u.socketId} 
                className="group relative p-4 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                style={{ animation: `slideIn 0.4s ease-out ${idx * 0.05}s both` }} // Tăng tốc độ animation
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white text-xl shadow-lg">
                      {u.avatar}
                    </div>
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate group-hover:text-purple-600 text-base">
                      {u.userName} {u.userId === currentUserId && '(Bạn)'}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                      <span className="w-2 h-2 bg-green-500 rounded-full absolute"></span>
                      Đang hoạt động
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-purple-400" />
              </div>
              <p className="text-base font-semibold text-gray-600">Chưa có ai online</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat section */}
      <div className="relative flex-1 flex flex-col min-w-0">
        {/* Header with glassmorphism */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white p-4 shadow-xl flex items-center justify-between overflow-hidden z-10">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-lg"></div>
          
          <div className="relative flex items-center gap-3 min-w-0 flex-1">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowUsersList(true)}
              className="lg:hidden p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3 truncate mb-0.5">
                <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Global Chat</span>
              </h1>
              {/* Typing Indicator */}
              <p className={`text-sm flex items-center gap-2 ${typingUsersList ? 'text-green-200' : 'text-purple-100'}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-400 shadow-lg shadow-green-400/50 animate-pulse' : 'bg-red-400'}`}></span>
                {typingUsersList || (isConnected ? `${onlineUsers.length} người online` : 'Đang kết nối...')}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowUsersList(!showUsersList)}
            className="hidden lg:flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-xl transition-all duration-200 backdrop-blur-sm font-semibold"
          >
            <Users className="w-5 h-5" />
            {onlineUsers.length}
          </button>
        </div>

        {/* Messages container */}
        <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0 scrollbar-thin">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center animate-fadeIn">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MessageCircle className="w-16 h-16 text-purple-500" />
                </div>
                <p className="text-gray-700 text-xl font-bold mb-2">Chưa có tin nhắn nào</p>
                <p className="text-gray-500 text-base">Hãy là người đầu tiên bắt đầu trò chuyện! 🚀</p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMsgFromCurrentUser = msg.senderId === currentUserId;
              const prevMsg = messages[index - 1];
              // Ẩn avatar nếu tin nhắn trước đó cũng là của người gửi này và không phải tin hệ thống
              const shouldShowAvatar = !prevMsg || prevMsg.senderId !== msg.senderId || prevMsg.isSystem;
              
              return (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  isCurrentUser={isMsgFromCurrentUser}
                  currentUserId={currentUserId}
                  onDeleteMessage={handleDeleteMessage}
                  showAvatar={shouldShowAvatar}
                />
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input section */}
        <div className="relative bg-white/80 backdrop-blur-xl border-t border-purple-200 p-4 shadow-2xl z-10">
          <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={handleInputChange} // Dùng handler mới
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder={isConnected ? "Nhập tin nhắn của bạn..." : "Đang kết nối lại..."}
                disabled={!isConnected}
                rows={1}
                className="w-full border-2 border-purple-200 rounded-2xl px-5 pr-16 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-md resize-none"
                style={{minHeight: '50px', maxHeight: '120px'}}
              />
              
              {/* Quick action buttons (Emoji, Attachment) */}
              <div className="absolute right-3 bottom-3 flex gap-2">
                <button type="button" className="p-2 hover:bg-purple-50 rounded-lg transition-colors" title="Emoji">
                  <Smile className="w-5 h-5 text-gray-400 hover:text-purple-500" />
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!isConnected || !inputValue.trim()}
              className="p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 hover:from-purple-700 hover:via-pink-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 active:scale-95 disabled:transform-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          {!isConnected && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-3 bg-red-50 px-4 py-2.5 rounded-xl shadow-md animate-pulse">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Đang kết nối lại tới máy chủ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;