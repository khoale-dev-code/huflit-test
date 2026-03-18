import React, { memo, useEffect, useState } from 'react';
import { Award, Target } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const getCEFRData = (score) => {
  if (score >= 90) return { level: 'C1', label: 'Advanced', color: '#58CC02', bg: '#f1faeb', border: '#46A302', description: 'Hiểu rộng các đoạn phức tạp.' };
  if (score >= 75) return { level: 'B2', label: 'Upper Intermediate', color: '#1CB0F6', bg: '#EAF6FE', border: '#1899D6', description: 'Hiểu ý chính văn bản phức tạp.' };
  if (score >= 50) return { level: 'B1', label: 'Intermediate', color: '#FF9600', bg: '#FFFBEA', border: '#E58700', description: 'Hiểu điểm chính chủ đề quen thuộc.' };
  if (score >= 30) return { level: 'A2', label: 'Elementary', color: '#FF4B4B', bg: '#fff0f0', border: '#E54343', description: 'Hiểu cụm từ thông dụng.' };
  return { level: 'A1', label: 'Beginner', color: '#94A3B8', bg: '#F1F5F9', border: '#64748B', description: 'Hiểu biểu thức cơ bản.' };
};

const getToeicData = (score) => {
  if (score >= 900) return { level: 'Huyền thoại 👑', label: 'Bậc thầy', color: '#CE82FF', bg: '#F8EEFF', border: '#B975E5', description: 'Sử dụng tiếng Anh như người bản xứ.' };
  if (score >= 750) return { level: 'Cao thủ 💎', label: 'Thành thạo', color: '#1CB0F6', bg: '#EAF6FE', border: '#1899D6', description: 'Giao tiếp rất hiệu quả.' };
  if (score >= 600) return { level: 'Tinh anh ⚡', label: 'Khá giỏi', color: '#58CC02', bg: '#f1faeb', border: '#46A302', description: 'Đáp ứng tốt công việc.' };
  if (score >= 450) return { level: 'Tiên phong 🚀', label: 'Trung bình', color: '#FF9600', bg: '#FFFBEA', border: '#E58700', description: 'Giao tiếp mức nền tảng.' };
  return { level: 'Tập sự 🌱', label: 'Cơ bản', color: '#94A3B8', bg: '#F1F5F9', border: '#64748B', description: 'Cần trau dồi thêm nhiều.' };
};

export const ScoreDisplay = memo(({ results, convertedScore, examCategory }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // 🚀 TÍNH TOÁN DỮ LIỆU LUÔN LUÔN CHẠY
  const isToeic = examCategory === 'toeic';
  const displayScore = isToeic 
    ? (convertedScore?.total || 0) 
    : (typeof results?.averageScore === 'number' ? results.averageScore : 0);

  const maxScore = isToeic ? 990 : 100;
  const progressPercent = Math.min(100, Math.max(0, (displayScore / maxScore) * 100));
  const themeData = isToeic ? getToeicData(displayScore) : getCEFRData(displayScore);

  useEffect(() => {
    if (!results) return;
    const timeout = setTimeout(() => setAnimatedProgress(progressPercent), 300);
    return () => clearTimeout(timeout);
  }, [progressPercent, results]);

  // 🚀 CHECK RETURN SAU KHI ĐÃ KHAI BÁO HOOK
  if (!results) return null;

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="bg-white rounded-[32px] border-2 border-slate-200 p-6 text-center shadow-sm relative overflow-hidden"
      style={{ borderBottomWidth: '8px', borderBottomColor: themeData.border }}>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[12px] mb-6" style={{ backgroundColor: themeData.bg }}>
          {isToeic ? <Target size={14} color={themeData.color} /> : <Award size={14} color={themeData.color} />}
          <span className="text-[12px] font-display font-black uppercase" style={{ color: themeData.color }}>
            {isToeic ? 'Tổng Điểm TOEIC' : 'Tổng Điểm Đánh Giá'}
          </span>
        </div>

        <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144">
            <circle cx="72" cy="72" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="12" />
            <Motion.circle
              cx="72" cy="72" r={radius} fill="none" stroke={themeData.color} strokeWidth="12" strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[36px] font-display font-black text-slate-800 leading-none">
              {isToeic ? displayScore : displayScore.toFixed(0)}
            </span>
            <span className="text-[14px] font-display font-bold text-slate-400 uppercase">
              {isToeic ? '/ 990' : '%'}
            </span>
          </div>
        </div>

        <Motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-5 py-2 rounded-[14px] mb-4 border-b-[3px] text-white font-display font-black uppercase"
          style={{ backgroundColor: themeData.color, borderColor: themeData.border }}
        >
          {themeData.level}
        </Motion.div>

        <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-[16px] p-4 relative mt-4">
          <p className="text-[13px] font-body font-bold text-slate-500 italic">
            "{themeData.description}"
          </p>
        </div>
      </div>
    </div>
  );
});

ScoreDisplay.displayName = 'ScoreDisplay';