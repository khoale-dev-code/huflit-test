/* src/components/FullExam/components/Results/ScoreDisplay.jsx */

import React, { memo, useEffect, useState } from 'react';
import { Award, Trophy, Star, Target } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── HELPER: DATA CHO ĐỀ THƯỜNG (HUFLIT / THPT) ───
const getCEFRData = (score) => {
  if (score >= 90) return { level: 'C1', label: 'Advanced', color: '#58CC02', bg: '#f1faeb', border: '#46A302', description: 'Hiểu rộng các đoạn phức tạp, dài và nhận biết ý nghĩa ngầm.' };
  if (score >= 75) return { level: 'B2', label: 'Upper Intermediate', color: '#1CB0F6', bg: '#EAF6FE', border: '#1899D6', description: 'Hiểu ý chính của văn bản phức tạp cả cụ thể lẫn trừu tượng.' };
  if (score >= 50) return { level: 'B1', label: 'Intermediate', color: '#FF9600', bg: '#FFFBEA', border: '#E58700', description: 'Hiểu những điểm chính của thông tin tiêu chuẩn về chủ đề quen thuộc.' };
  if (score >= 30) return { level: 'A2', label: 'Elementary', color: '#FF4B4B', bg: '#fff0f0', border: '#E54343', description: 'Hiểu các cụm từ thường dùng liên quan đến những lĩnh vực trực tiếp.' };
  return { level: 'A1', label: 'Beginner', color: '#94A3B8', bg: '#F1F5F9', border: '#64748B', description: 'Hiểu và sử dụng các cụm từ hàng ngày và biểu thức cơ bản.' };
};

// ─── HELPER: DATA CHO ĐỀ TOEIC ───
const getToeicData = (score) => {
  if (score >= 900) return { level: 'Huyền thoại 👑', label: 'Bậc thầy', color: '#CE82FF', bg: '#F8EEFF', border: '#B975E5', description: 'Xuất sắc! Có thể giao tiếp và sử dụng tiếng Anh gần như người bản xứ.' };
  if (score >= 750) return { level: 'Cao thủ 💎', label: 'Thành thạo', color: '#1CB0F6', bg: '#EAF6FE', border: '#1899D6', description: 'Có khả năng giao tiếp rất hiệu quả trong môi trường làm việc quốc tế.' };
  if (score >= 600) return { level: 'Tinh anh ⚡', label: 'Khá giỏi', color: '#58CC02', bg: '#f1faeb', border: '#46A302', description: 'Đáp ứng tốt các yêu cầu giao tiếp và công việc cơ bản hàng ngày.' };
  if (score >= 450) return { level: 'Tiên phong 🚀', label: 'Trung bình', color: '#FF9600', bg: '#FFFBEA', border: '#E58700', description: 'Hiểu được các câu đơn giản, đủ để duy trì giao tiếp ở mức nền tảng.' };
  return { level: 'Tập sự 🌱', label: 'Cơ bản', color: '#94A3B8', bg: '#F1F5F9', border: '#64748B', description: 'Cần trau dồi thêm rất nhiều về từ vựng và ngữ pháp nền tảng.' };
};

export const ScoreDisplay = memo(({ results, convertedScore, examCategory }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  if (!results) return null;

  const isToeic = examCategory === 'toeic';
  
  // Xác định điểm số hiển thị
  const displayScore = isToeic 
    ? (convertedScore?.total || 0) 
    : (typeof results.averageScore === 'number' ? results.averageScore : parseFloat(results.averageScore) || 0);

  // Xác định tỷ lệ Progress Bar (0-100)
  const maxScore = isToeic ? 990 : 100;
  const progressPercent = Math.min(100, Math.max(0, (displayScore / maxScore) * 100));

  // Xác định Theme màu sắc
  const themeData = isToeic ? getToeicData(displayScore) : getCEFRData(displayScore);

  // Hiệu ứng chạy thanh tiến độ
  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedProgress(progressPercent), 300);
    return () => clearTimeout(timeout);
  }, [progressPercent]);

  // Thông số cho Vòng tròn SVG
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div 
      className="bg-white rounded-[32px] border-2 border-slate-200 p-6 md:p-8 text-center shadow-sm relative font-sans overflow-hidden"
      style={{ borderBottomWidth: '8px', borderBottomColor: themeData.border, fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      {/* Background Decor */}
      <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ backgroundColor: themeData.color }} />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ backgroundColor: themeData.color }} />

      <div className="relative z-10 flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[12px] mb-6" style={{ backgroundColor: themeData.bg, border: `2px solid ${themeData.color}40` }}>
          {isToeic ? <Target size={14} color={themeData.color} strokeWidth={3} /> : <Award size={14} color={themeData.color} strokeWidth={3} />}
          <span className="text-[12px] font-display font-black uppercase tracking-widest" style={{ color: themeData.color }}>
            {isToeic ? 'Tổng Điểm TOEIC' : 'Tổng Điểm Đánh Giá'}
          </span>
        </div>

        {/* ── CIRCULAR PROGRESS RING (Vòng tròn điểm 3D) ── */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 flex items-center justify-center drop-shadow-sm">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144">
            {/* Vòng nền */}
            <circle
              cx="72" cy="72" r={radius}
              fill="none" stroke="#F1F5F9" strokeWidth="12"
            />
            {/* Vòng chạy điểm */}
            <motion.circle
              cx="72" cy="72" r={radius}
              fill="none"
              stroke={themeData.color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          
          {/* Text Điểm bên trong vòng tròn */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[36px] md:text-[44px] font-display font-black text-slate-800 leading-none tracking-tighter">
              {isToeic ? displayScore : displayScore.toFixed(0)}
            </span>
            <span className="text-[14px] md:text-[16px] font-display font-bold text-slate-400 uppercase tracking-widest mt-1">
              {isToeic ? '/ 990' : '%'}
            </span>
          </div>
        </div>

        {/* ── RANK BADGE & DESCRIPTION ── */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
          className="px-5 py-2 rounded-[14px] mb-4 shadow-sm border-b-[3px]"
          style={{ backgroundColor: themeData.color, borderColor: themeData.border }}
        >
          <span className="text-[16px] md:text-[18px] font-display font-black text-white uppercase tracking-wider">
            {themeData.level}
          </span>
        </motion.div>

        <h3 className="text-[16px] md:text-[18px] font-display font-black text-slate-700 mb-2">
          {themeData.label}
        </h3>

        <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-[16px] p-4 relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-50 border-l-2 border-t-2 border-slate-100 rotate-45" />
          <p className="text-[13px] md:text-[14px] font-body font-bold text-slate-500 leading-relaxed m-0 italic relative z-10">
            "{themeData.description}"
          </p>
        </div>

      </div>
    </div>
  );
});

ScoreDisplay.displayName = 'ScoreDisplay';
export default ScoreDisplay;