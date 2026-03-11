/* src/components/FullExam/components/Results/PartResults.jsx */

import React, { memo } from 'react';
import { Headphones, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Part Results - Bảng điểm chi tiết từng phần
 */
export const PartResults = memo(({ partResults }) => {
  if (!partResults) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <h3 className="font-quick font-bold text-[18px] md:text-[22px] text-slate-800">
          Phân tích chi tiết từng phần
        </h3>
      </div>

      {/* ─── Listening Parts ─── */}
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-2 mb-4 pl-1">
          <Headphones size={20} className="text-[#1CB0F6]" strokeWidth={2.5} />
          <h4 className="font-quick font-bold text-slate-700 text-[15px] md:text-[16px] uppercase tracking-wider">
            Phần Nghe (Listening)
          </h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4].map((p, index) => (
            <motion.div 
              key={`listening-${p}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PartResultCard
                label={`Part ${p}`}
                score={partResults.listeningByPart[p] || 0}
                maxScore={5} // Chú ý: Nếu dữ liệu thật có tổng câu khác, bạn nên truyền từ props vào
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Reading Parts ─── */}
      <div>
        <div className="flex items-center gap-2 mb-4 pl-1">
          <BookOpen size={20} className="text-[#58CC02]" strokeWidth={2.5} />
          <h4 className="font-quick font-bold text-slate-700 text-[15px] md:text-[16px] uppercase tracking-wider">
            Phần Đọc (Reading)
          </h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4].map((p, index) => (
            <motion.div 
              key={`reading-${p}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <PartResultCard
                label={`Part ${p}`}
                score={partResults.readingByPart[p] || 0}
                maxScore={10} // Chú ý: Nếu dữ liệu thật có tổng câu khác, bạn nên truyền từ props vào
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

PartResults.displayName = 'PartResults';

/**
 * Single Part Result Card (Gamified 3D Card)
 */
const PartResultCard = memo(({ label, score, maxScore }) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  
  // Xác định Theme theo điểm số
  let theme = {
    color: 'text-[#FF4B4B]', 
    bg: 'bg-[#fff0f0]', 
    border: 'border-[#FF4B4B]', 
    bar: 'bg-[#FF4B4B]', 
    badgeBg: 'bg-[#FF4B4B]',
    text: 'Cần ôn lại'
  };

  if (percentage >= 80) {
    theme = { color: 'text-[#58CC02]', bg: 'bg-[#f1faeb]', border: 'border-[#58CC02]', bar: 'bg-[#58CC02]', badgeBg: 'bg-[#58CC02]', text: 'Xuất sắc' };
  } else if (percentage >= 60) {
    theme = { color: 'text-[#1CB0F6]', bg: 'bg-[#EAF6FE]', border: 'border-[#1CB0F6]', bar: 'bg-[#1CB0F6]', badgeBg: 'bg-[#1CB0F6]', text: 'Khá tốt' };
  } else if (percentage >= 40) {
    theme = { color: 'text-[#FF9600]', bg: 'bg-[#fff4e5]', border: 'border-[#FF9600]', bar: 'bg-[#FF9600]', badgeBg: 'bg-[#FF9600]', text: 'Tạm ổn' };
  }

  return (
    <div className="group bg-white p-4 rounded-[20px] border-2 border-slate-200 border-b-[4px] hover:-translate-y-1 hover:border-slate-300 transition-transform flex flex-col items-center justify-center text-center">
      
      {/* Label */}
      <p className="text-[14px] font-quick font-bold text-slate-500 mb-1 uppercase tracking-wider">
        {label}
      </p>

      {/* Score */}
      <div className="flex items-baseline gap-1 mb-2">
        <span className={`text-[26px] font-black leading-none ${theme.color}`}>
          {score}
        </span>
        <span className="text-[14px] font-bold text-slate-400">
          /{maxScore}
        </span>
      </div>

      {/* Gamified Fat Progress Bar */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3 border border-slate-200 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full relative ${theme.bar}`}
        >
          {/* Highlight effect */}
          <div className="absolute top-0.5 left-1 right-1 h-1 bg-white/30 rounded-full" />
        </motion.div>
      </div>

      {/* Status Badge */}
      <div className={`px-3 py-1 rounded-[10px] text-[11px] font-extrabold text-white uppercase tracking-widest ${theme.badgeBg}`}>
        {theme.text}
      </div>
      
    </div>
  );
});

PartResultCard.displayName = 'PartResultCard';

export default PartResults;