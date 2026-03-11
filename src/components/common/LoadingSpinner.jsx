import React, { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Zap, Target, BookOpen } from 'lucide-react';

const VOCAB_PAIRS = [
  { word: 'eloquent',  hint: 'hùng hồn · lưu loát', icon: Sparkles, color: 'text-amber-500' },
  { word: 'persevere', hint: 'kiên trì · bền bỉ',   icon: Target,   color: 'text-blue-500' },
  { word: 'ephemeral', hint: 'ngắn ngủi',           icon: Zap,      color: 'text-rose-500' },
  { word: 'meticulous',hint: 'tỉ mỉ · cẩn thận',    icon: Brain,    color: 'text-emerald-500' },
  { word: 'resilient', hint: 'kiên cường',          icon: Target,   color: 'text-indigo-500' },
];

const MESSAGES = [
  'Đang nạp kho báu từ vựng...',
  'Khởi động bộ não chinh phục...',
  'Sắp xếp từng viên gạch tri thức...',
  'Tập hợp đội quân tinh nhuệ...',
];

const LoadingSpinner = memo(({ message }) => {
  const [vIdx, setVIdx] = useState(0);
  const [mIdx, setMIdx] = useState(0);

  // Đảo từ vựng mỗi 3s
  useEffect(() => {
    const t = setInterval(() => setVIdx((prev) => (prev + 1) % VOCAB_PAIRS.length), 3000);
    return () => clearInterval(t);
  }, []);

  // Đảo Message mỗi 4s
  useEffect(() => {
    const t = setInterval(() => setMIdx((prev) => (prev + 1) % MESSAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const currentVocab = VOCAB_PAIRS[vIdx];
  const VocabIcon = currentVocab.icon;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F4F7FA] flex flex-col items-center justify-center selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* ── Background Trang trí (Pattern Caro) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Các khối màu mờ bay lơ lửng */}
      <motion.div 
        animate={{ y: [-20, 20, -20], x: [-20, 20, -20] }} 
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-[60px]" 
      />
      <motion.div 
        animate={{ y: [20, -20, 20], x: [20, -20, 20] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#58CC02]/20 rounded-full blur-[60px]" 
      />

      {/* ── Main Loading Card (Gamified 3D Box) ── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-10 bg-white border-2 border-slate-200 border-b-[8px] rounded-[36px] p-8 md:p-10 w-[90vw] max-w-[420px] shadow-xl flex flex-col items-center text-center"
      >
        {/* Animated Mascot / Icon */}
        <motion.div 
          animate={{ y: [-10, 5, -10] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="relative w-24 h-24 bg-[#1CB0F6] rounded-[24px] border-b-[6px] border-[#1899D6] flex items-center justify-center mb-8 shadow-md"
        >
          {/* Vòng sáng xoay đằng sau Icon */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-0 rounded-[24px] border-4 border-dashed border-white/30"
          />
          <BookOpen size={48} className="text-white relative z-10" strokeWidth={2.5} />
        </motion.div>

        {/* Message Chữ chạy */}
        <div className="h-8 relative w-full mb-6 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={mIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute text-[16px] md:text-[18px] font-quick font-black text-slate-800 m-0"
            >
              {message || MESSAGES[mIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Thanh Progress sọc vằn kiểu Game */}
        <div className="w-full h-6 bg-slate-100 border-2 border-slate-200 rounded-full overflow-hidden relative mb-8">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "95%" }}
            transition={{ duration: 15, ease: "easeOut" }} // Giả lập loading 15s
            className="absolute top-0 left-0 h-full bg-[#58CC02] rounded-full"
          >
            {/* Sọc chéo ánh sáng lướt qua */}
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2 skew-x-12"
            />
          </motion.div>
        </div>

        {/* Flashcard Từ vựng nhỏ (Did you know?) */}
        <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-[20px] p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFC800]" />
          <p className="text-[11px] font-quick font-extrabold text-slate-400 uppercase tracking-widest mb-2 text-left pl-2">
            Học một từ mới
          </p>
          
          <div className="h-[40px] relative w-full pl-2 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={vIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute flex items-center gap-3 w-full"
              >
                <div className={`p-1.5 rounded-lg bg-white border border-slate-200 ${currentVocab.color}`}>
                  <VocabIcon size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[16px] font-black text-slate-800 leading-none mb-1">
                    {currentVocab.word}
                  </p>
                  <p className="text-[13px] font-bold text-slate-500 leading-none">
                    {currentVocab.hint}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
export { LoadingSpinner };
export default LoadingSpinner;