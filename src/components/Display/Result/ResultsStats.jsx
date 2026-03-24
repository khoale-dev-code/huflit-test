// src/components/Display/Result/ResultsStats.jsx
import React, { memo, useMemo } from 'react';
import {
  CheckCircle, TrendingUp, Flame, Award,
  Headphones, BookOpen, GraduationCap, Target
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';

// Đảm bảo bạn đã có các hàm này trong file utils/gradeUtils.js
import {
  getGrade, 
  getLevelLabel,
  getToeicGradeLabel,
} from '../../../utils/gradeUtils';

/* ══════════════════════════════════════════════════════════
   StatCard — Gamified 3D Compact (Đã tối ưu UI)
══════════════════════════════════════════════════════════ */
// eslint-disable-next-line no-unused-vars
const StatCard = memo(({ icon: Icon, label, value, suffix, bg, border, index }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 280, damping: 20 }}
      className="bg-white rounded-[24px] border-2 p-5 sm:p-6 flex flex-col items-center text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all relative overflow-hidden"
      style={{ borderColor: border, borderBottomWidth: '6px' }}
    >
      {/* Glow Effect nền (Tạo ánh sáng mờ phía sau icon) */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ background: bg }}
      />

      {/* Icon 3D Container */}
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 mb-4 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0 relative z-10"
        style={{ backgroundColor: bg, borderBottom: `4px solid ${border}` }}
      >
        <Icon size={28} strokeWidth={3} className="sm:w-8 sm:h-8" />
      </div>

      <p className="text-[11px] sm:text-[12px] font-display font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none relative z-10">
        {label}
      </p>

      <div className="flex items-baseline justify-center gap-1 relative z-10">
        <p className="text-[26px] sm:text-[32px] font-black text-slate-800 leading-none m-0" style={{ color: border }}>
          {value}
        </p>
        {suffix && (
          <span className="text-[14px] sm:text-[16px] font-bold text-slate-400 mb-0.5">
            {suffix}
          </span>
        )}
      </div>
    </Motion.div>
  );
});
StatCard.displayName = 'StatCard';

/* ─── Helper: Phân loại đề thi một cách an toàn ─── */
function resolveCategory(examCategory) {
  if (!examCategory || typeof examCategory !== 'string') return 'default';
  const k = examCategory.toLowerCase().trim();
  if (k.includes('toeic')) return 'toeic';
  if (k.includes('ielts')) return 'ielts';
  if (k.includes('thpt') || k.includes('đại học')) return 'thpt';
  if (k.includes('huflit')) return 'huflit';
  return 'default';
}

/* ─── Helper: Xây dựng mảng thông tin thẻ & Chống lỗi NaN ─── */
function buildStatCards(score, convertedScore, category) {
  // Ràng buộc an toàn: Tránh trường hợp score bị null/undefined
  const safeScore = score || {};
  const correct = safeScore.correct || 0;
  const total = safeScore.total || 0;
  const percentage = safeScore.percentage || 0;
  const roundedPct = Math.round(percentage);

  switch (category) {
    case 'toeic': {
      const cv = convertedScore || { listening: 0, reading: 0, total: 0 };
      const toeicLabel = getToeicGradeLabel ? getToeicGradeLabel(cv.total) : 'Hoàn thành';
      return [
        { icon: Award, label: 'Xếp loại', value: toeicLabel, bg: '#CE82FF', border: '#B975E5' },
        { icon: Headphones, label: 'Điểm Nghe', value: cv.listening, suffix: '/495', bg: '#1CB0F6', border: '#1899D6' },
        { icon: BookOpen, label: 'Điểm Đọc', value: cv.reading, suffix: '/495', bg: '#58CC02', border: '#46A302' },
        { icon: CheckCircle, label: 'Câu đúng', value: correct, suffix: `/${total}`, bg: '#FF9600', border: '#E58700' },
      ];
    }
    
    case 'ielts': {
      const rawBand = (percentage / 100) * 9;
      // Làm tròn Band score chuẩn IELTS (làm tròn đến 0.5)
      const band = Math.round(rawBand * 2) / 2;
      const grade = getGrade ? getGrade(percentage) : { label: 'Hoàn thành' };
      return [
        { icon: Award, label: 'Band Score', value: band.toFixed(1), suffix: '/9.0', bg: '#CE82FF', border: '#B975E5' },
        { icon: CheckCircle, label: 'Câu đúng', value: correct, suffix: `/${total}`, bg: '#1CB0F6', border: '#1899D6' },
        { icon: TrendingUp, label: 'Tỷ lệ', value: roundedPct, suffix: '%', bg: '#58CC02', border: '#46A302' },
        { icon: Flame, label: 'Xếp loại', value: grade.label || grade.badge || 'N/A', bg: '#FF9600', border: '#E58700' },
      ];
    }
    
    case 'thpt':
    case 'huflit': {
      // Đảm bảo không chia cho 0 gây ra lỗi NaN
      const score10 = total > 0 ? ((correct / total) * 10).toFixed(1) : "0.0";
      const grade = getGrade ? getGrade(percentage) : { badge: 'Hoàn thành' };
      const IconBase = category === 'huflit' ? GraduationCap : Target;
      return [
        { icon: IconBase, label: 'Điểm hệ 10', value: score10, suffix: '/10', bg: '#FF9600', border: '#E58700' },
        { icon: TrendingUp, label: 'Tỷ lệ đúng', value: roundedPct, suffix: '%', bg: '#1CB0F6', border: '#1899D6' },
        { icon: CheckCircle, label: 'Câu chính xác', value: correct, suffix: `/${total}`, bg: '#58CC02', border: '#46A302' },
        { icon: Award, label: 'Xếp loại', value: grade.badge || grade.label || 'N/A', bg: '#CE82FF', border: '#B975E5' },
      ];
    }
    
    default: {
      const grade = getGrade ? getGrade(percentage) : { badge: 'Hoàn thành' };
      const level = getLevelLabel ? getLevelLabel(percentage) : 'N/A';
      return [
        { icon: CheckCircle, label: 'Chính xác', value: correct, suffix: `/${total}`, bg: '#1CB0F6', border: '#1899D6' },
        { icon: TrendingUp, label: 'Tỷ lệ', value: roundedPct, suffix: '%', bg: '#58CC02', border: '#46A302' },
        { icon: Flame, label: 'Cấp độ', value: level, bg: '#FF9600', border: '#E58700' },
        { icon: Award, label: 'Xếp loại', value: grade.badge || grade.label || 'N/A', bg: '#CE82FF', border: '#B975E5' },
      ];
    }
  }
}

/* ══════════════════════════════════════════════════════════
   ResultsStats — Main Entry
══════════════════════════════════════════════════════════ */
const ResultsStats = memo(({ score, convertedScore, examCategory }) => {
  const category = useMemo(() => resolveCategory(examCategory), [examCategory]);

  const statCards = useMemo(
    () => buildStatCards(score, convertedScore, category),
    [score, convertedScore, category]
  );

  // Nếu chưa có dữ liệu điểm, không render để tránh lỗi hiển thị
  if (!score) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-20 font-nunito">
      {statCards.map((card, index) => (
        <StatCard
          key={`${category}-${index}`}
          index={index}
          icon={card.icon}
          label={card.label}
          value={card.value}
          suffix={card.suffix}
          bg={card.bg}
          border={card.border}
        />
      ))}
    </div>
  );
});

ResultsStats.displayName = 'ResultsStats';

export default ResultsStats;