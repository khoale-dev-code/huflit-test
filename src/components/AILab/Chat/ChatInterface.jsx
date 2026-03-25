// src/components/AILab/Chat/ChatInterface.jsx
import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Send, Sparkles, Loader2, RefreshCcw, BookOpen, ArrowLeft, MessageCircle, Users, Bot, Construction } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { CHAT_PERSONAS, sendChatMessage } from '../../../services/chatService';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';

// 🚀 HÀM HELPER TẠO KEY TUYỆT ĐỐI DUY NHẤT
const generateSafeId = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// ==========================================
// 1. COMPONENT: BONG BÓNG CHAT
// ==========================================
const MessageBubble = memo(({ msg, persona, chatType }) => {
  const { isSystem, role, content, correction, slang_notes } = msg;
  const isUser = role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-2`}>
      <div className={`max-w-[85%] sm:max-w-[75%] flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && !isSystem && (
          <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center text-xl shrink-0 border-2 border-white shadow-md ${persona.color}`}>
            {persona.avatar}
          </div>
        )}
        
        <div className={`px-5 py-3.5 shadow-sm text-[15px] sm:text-[16px] leading-relaxed font-bold break-words whitespace-pre-wrap ${
          isSystem 
            ? 'bg-slate-100 text-slate-500 text-center w-full rounded-2xl text-[13px] italic border-2 border-dashed border-slate-200' 
            : isUser
              ? 'bg-[#1CB0F6] text-white rounded-[24px] rounded-br-[8px] border-b-[4px] border-[#159EE0]'
              : 'bg-white text-slate-700 rounded-[24px] rounded-bl-[8px] border-2 border-slate-100 border-b-[4px]'
        }`}>
          {content}
        </div>
      </div>

      {chatType === 'ai' && !isUser && (
        <AnimatePresence>
          {correction && (
            <Motion.div 
              key="correction-box" // Key tĩnh cho phần sửa lỗi
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              className="ml-14 mt-2 max-w-[85%] bg-[#FFFBEA] border-2 border-[#FFD8A8] text-[#D97706] px-4 py-3 rounded-[20px] rounded-tl-sm text-[13px] font-bold flex items-start gap-2 shadow-sm overflow-hidden"
            >
              <Sparkles size={18} className="shrink-0 mt-0.5" />
              <span>{correction}</span>
            </Motion.div>
          )}

          {Array.isArray(slang_notes) && slang_notes.length > 0 && (
            <Motion.div 
              key="slang-box" // Key tĩnh cho nguyên khối từ vựng
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              className="ml-14 mt-2 max-w-[85%] bg-[#F0FAE8] border-2 border-[#B2E58B] px-4 py-3 rounded-[20px] rounded-tl-sm text-[13px] flex flex-col gap-1.5 shadow-sm overflow-hidden"
            >
              <div className="font-black flex items-center gap-1.5 text-[#58CC02]"><BookOpen size={16} /> Từ vựng xịn:</div>
              {slang_notes.map((slang, i) => {
                // 🚀 FIX TRIỆT ĐỂ: Dùng Random String cho chắc cốp
                const uniqueKey = `slang-${i}-${Math.random().toString(36).substr(2, 6)}`;
                return (
                  <div key={uniqueKey} className="flex items-start gap-2 leading-snug">
                    <span className="font-black text-[#58CC02]">"{slang?.term || slang?.word || 'Word'}":</span>
                    <span className="font-bold text-[#46A302]">{slang?.meaning || 'Meaning'}</span>
                  </div>
                );
              })}
            </Motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
});
MessageBubble.displayName = 'MessageBubble';

// ==========================================
// 2. COMPONENT: KHUNG NHẬP LIỆU (Giữ nguyên)
// ==========================================
const ChatInputBox = memo(({ onSendMessage, isTyping, disabled, placeholder }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || isTyping || disabled) return;
    
    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const handleInputResize = (e) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 bg-white border-t-2 border-slate-100 shrink-0">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInputResize}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-700 font-bold focus:outline-none focus:border-[#1CB0F6] transition-all resize-none max-h-32 min-h-[50px] custom-scrollbar disabled:opacity-50 text-sm sm:text-base"
          rows={1}
        />
        <button 
          type="submit" 
          disabled={!text.trim() || isTyping || disabled} 
          className="w-12 h-12 shrink-0 bg-[#58CC02] border-b-4 border-[#46A302] text-white rounded-xl flex items-center justify-center active:border-0 active:translate-y-1 transition-all disabled:grayscale disabled:opacity-50"
        >
          {isTyping ? <Loader2 size={20} className="animate-spin text-slate-400" /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
});
ChatInputBox.displayName = 'ChatInputBox';

// ==========================================
// 3. COMPONENT: POPUP BẢO TRÌ (Giữ nguyên)
// ==========================================
const ComingSoonModal = memo(({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <Motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[60] rounded-[30px]"
        />
        <Motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="absolute z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[85%] max-w-[320px] p-8 rounded-3xl shadow-2xl border-2 border-slate-100 flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
            <Construction size={32} className="text-amber-500" />
          </div>
          <h3 className="font-black text-slate-800 text-lg mb-2">Đang xây dựng...</h3>
          <p className="text-slate-500 font-bold text-sm mb-6 leading-relaxed text-center">
            Tính năng kết nối cộng đồng đang được đúc code. Quay lại sau nhé! 🛠️
          </p>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-[#1CB0F6] border-b-4 border-[#159EE0] text-white font-black rounded-xl active:border-0 active:translate-y-1 transition-all"
          >
            ĐÃ HIỂU!
          </button>
        </Motion.div>
      </>
    )}
  </AnimatePresence>
));
ComingSoonModal.displayName = 'ComingSoonModal';

// ==========================================
// 4. MAIN INTERFACE
// ==========================================
const ChatInterface = () => {
  const { user } = useFirebaseAuth();
  const [currentScreen, setCurrentScreen] = useState('home'); 
  const [chatType, setChatType] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activePersona, setActivePersona] = useState(CHAT_PERSONAS.bestie.id);
  const [showDevPopup, setShowDevPopup] = useState(false);

  const scrollContainerRef = useRef(null);
  const persona = chatType === 'stranger' ? { id: 'stranger', name: 'Người lạ', avatar: '👤', color: 'bg-slate-800' } : CHAT_PERSONAS[activePersona];

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    if (currentScreen === 'chat') scrollToBottom();
  }, [messages, isTyping, currentScreen, scrollToBottom]);

  const handleStartAIChat = useCallback(() => {
    setChatType('ai');
    // 🚀 FIX: Dùng generateSafeId khi tạo tin nhắn mồi
    setMessages([{ 
      id: generateSafeId('ai-init'),
      role: 'assistant', 
      content: `Hey! I'm ${CHAT_PERSONAS[activePersona].name.split(' ')[0]}. Let's talk! ✨`, 
      correction: '', 
      slang_notes: [] 
    }]);
    setCurrentScreen('chat');
  }, [activePersona]);

  const handleBackToHome = useCallback(() => {
    setCurrentScreen('home');
    setChatType(null);
  }, []);

  const handleSendAI = useCallback(async (userText) => {
    // 🚀 FIX: Dùng generateSafeId cho tin nhắn của User
    const userMsgId = generateSafeId('user-msg');
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: userText }]);
    setIsTyping(true);

    try {
      const currentMsgs = await new Promise(res => setMessages(prev => { res(prev); return prev; }));
      const currentUserId = user?.email || 'anonymous';
      const aiResponse = await sendChatMessage(currentMsgs, activePersona, currentUserId);
      
      // 🚀 FIX: Dùng generateSafeId cho phản hồi của AI
      setMessages(prev => [...prev, { 
        id: generateSafeId('ai-reply'),
        role: 'assistant', 
        content: aiResponse.reply, 
        correction: aiResponse.correction, 
        slang_notes: aiResponse.slang_notes 
      }]);
    } catch {
      setMessages(prev => [...prev, { 
        id: generateSafeId('err'),
        role: 'assistant', 
        content: 'AI đang bận một chút, thử lại nhé! 😭', 
        isSystem: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [activePersona, user]);

  const renderHome = () => (
    <Motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center p-6 text-center relative h-full">
      {/* ... (Các phần UI giữ nguyên) ... */}
      <div className="w-20 h-20 bg-white rounded-[24px] shadow-lg border-b-[6px] border-slate-200 flex items-center justify-center mb-6">
        <MessageCircle size={36} className="text-[#1CB0F6]" strokeWidth={2.5} />
      </div>
      <h2 className="text-2xl font-black text-slate-800 mb-2">Trung Tâm Giao Tiếp</h2>
      <p className="text-slate-500 font-bold mb-10 max-w-xs">Chọn chế độ luyện tập tiếng Anh phù hợp với bạn hôm nay.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        <button onClick={() => setCurrentScreen('ai_lobby')} className="p-6 bg-white border-2 border-slate-200 border-b-[6px] rounded-3xl hover:border-[#1CB0F6] active:translate-y-1 transition-all group outline-none">
          <Bot size={40} className="mx-auto mb-3 text-[#1CB0F6] group-hover:scale-110 transition-transform" />
          <h3 className="font-black text-slate-800">Luyện với AI</h3>
          <p className="text-xs text-slate-400 font-bold mt-1">Được sửa lỗi & học từ vựng</p>
        </button>

        <button onClick={() => setShowDevPopup(true)} className="p-6 bg-white border-2 border-slate-200 border-b-[6px] rounded-3xl hover:border-slate-300 active:translate-y-1 transition-all group relative overflow-hidden outline-none">
          <div className="absolute top-2 right-[-20px] bg-slate-100 text-slate-400 text-[9px] font-black px-8 py-1 rotate-45 uppercase border-b border-slate-200 shadow-sm">Soon</div>
          <Users size={40} className="mx-auto mb-3 text-slate-300 group-hover:scale-110 transition-transform" />
          <h3 className="font-black text-slate-400">Người Lạ Ẩn Danh</h3>
          <p className="text-xs text-slate-300 font-bold mt-1">Giao tiếp thực tế P2P</p>
        </button>
      </div>
      <ComingSoonModal isOpen={showDevPopup} onClose={() => setShowDevPopup(false)} />
    </Motion.div>
  );

  const renderAILobby = () => (
    <Motion.div key="ai_lobby" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col items-center pt-10 px-6 h-full overflow-y-auto custom-scrollbar pb-10">
      <button onClick={handleBackToHome} className="self-start p-3 bg-white rounded-xl border-2 border-slate-200 mb-6 hover:border-[#1CB0F6] hover:text-[#1CB0F6] transition-colors outline-none"><ArrowLeft size={20} /></button>
      <div className="w-20 h-20 bg-[#EAF6FE] text-[#1CB0F6] rounded-3xl flex items-center justify-center mb-4"><Bot size={40} /></div>
      <h2 className="text-xl font-black text-slate-800 mb-6">Chọn Bạn Đồng Hành AI</h2>
      
      <div className="w-full max-w-sm space-y-3">
        {Object.values(CHAT_PERSONAS).map(p => (
          <button key={p.id} onClick={() => setActivePersona(p.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all outline-none ${activePersona === p.id ? 'border-[#1CB0F6] bg-[#F0F9FF] shadow-sm' : 'border-slate-100 bg-white hover:border-slate-300'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${p.color} border-2 border-white shadow-sm shrink-0`}>{p.avatar}</div>
            <div className="text-left">
              <p className="font-black text-slate-700 text-sm leading-tight mb-1">{p.name}</p>
              <p className="text-[11px] font-bold text-slate-400 leading-snug line-clamp-2">{p.desc}</p>
            </div>
          </button>
        ))}
      </div>
      <button onClick={handleStartAIChat} className={`w-full max-w-sm mt-8 py-4 ${persona.color} text-white font-black rounded-2xl border-b-4 border-black/20 uppercase tracking-widest active:translate-y-1 active:border-0 transition-all shadow-md outline-none`}>Bắt đầu trò chuyện</button>
    </Motion.div>
  );

  const renderChat = () => (
    <Motion.div key="chat" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="flex-1 flex flex-col min-h-0 h-full bg-[#F8FAFC]">
      <div className="shrink-0 bg-white px-4 py-3 border-b-2 border-slate-200 flex items-center justify-between shadow-sm z-30">
        <button onClick={handleBackToHome} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-500 hover:text-[#FF4B4B] transition-colors outline-none"><ArrowLeft size={20} /></button>
        <div className="flex flex-col items-center">
          <span className="font-black text-slate-800 flex items-center gap-2 text-sm sm:text-base">
            <span className="text-xl">{persona.avatar}</span> {persona.name.split(' ')[0]}
          </span>
          <span className="text-[10px] font-black text-[#58CC02] flex items-center gap-1 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-[#58CC02] rounded-full animate-pulse" /> Online
          </span>
        </div>
        <button onClick={() => setMessages([{ id: generateSafeId('reset'), role: 'assistant', content: `Hey! I'm ${persona.name.split(' ')[0]}. Let's talk! ✨` }])} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl border-2 border-slate-200 text-slate-400 hover:text-[#1CB0F6] hover:border-[#1CB0F6] transition-all outline-none"><RefreshCcw size={18} /></button>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 custom-scrollbar">
        {/* 🚀 ĐẢM BẢO CHẮC CHẮN MỖI MESSAGE CÓ KEY */}
        {messages.map((msg) => {
          // Fallback key nếu lỡ msg.id bị rớt
          const msgKey = msg.id || generateSafeId('fallback-msg');
          return <MessageBubble key={msgKey} msg={msg} persona={persona} chatType={chatType} />;
        })}
        
        {isTyping && (
          <Motion.div key="typing-indicator" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border-2 border-white shadow-sm ${persona.color}`}>{persona.avatar}</div>
            <div className="bg-white border-2 border-slate-100 px-4 py-3 rounded-2xl flex gap-1 shadow-sm italic text-slate-400 font-bold text-xs animate-pulse">Đang suy nghĩ...</div>
          </Motion.div>
        )}
      </div>

      <ChatInputBox onSendMessage={handleSendAI} isTyping={isTyping} placeholder={`Nhắn cho ${persona.name.split(' ')[0]}...`} />
    </Motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-2xl border-2 border-slate-200 overflow-hidden font-nunito h-[calc(100vh-140px)] flex flex-col relative">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && renderHome()}
        {currentScreen === 'ai_lobby' && renderAILobby()}
        {currentScreen === 'chat' && renderChat()}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;