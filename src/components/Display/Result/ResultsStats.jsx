// src/components/Display/Result/ResultsStats.jsx
import React, { memo, useMemo } from 'react';
import {
  CheckCircle, TrendingUp, Flame, Award,
  Headphones, BookOpen, GraduationCap, Target
} from 'lucide-react';
// 🚀 FIX 1: Đồng bộ Alias Motion (Viết hoa)
import { motion as Motion } from 'framer-motion';
import {
  getGrade, getLevelLabel,
  getToeicGradeLabel,
} from '../../../utils/gradeUtils';

/* ══════════════════════════════════════════════════════════
   StatCard — Gamified 3D Compact
══════════════════════════════════════════════════════════ */
const StatCard = memo((props) => {
  const { icon: Icon, label, value, suffix, bg, border, index } = props;
  
  return (
    // 🚀 FIX 2: Đổi <motion.div> thành <Motion.div>
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 22 }}
      className="bg-white rounded-[20px] sm:rounded-[24px] border-2 border-b-[4px] p-4 sm:p-5 flex flex-col items-center text-center shadow-sm hover:-translate-y-1 transition-transform relative overflow-hidden"
      style={{ borderColor: border }}
    >
      {/* Glow Effect */}
      <div
        className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10 blur-xl"
        style={{ background: bg }}
      />

      {/* Icon 3D Container */}
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 mb-3 sm:mb-4 rounded-[14px] flex items-center justify-center border-b-[3px] text-white shadow-sm shrink-0"
        style={{ background: bg, borderColor: border }}
      >
        <Icon size={24} strokeWidth={2.5} className="sm:w-7 sm:h-7" />
      </div>

      <p className="text-[10px] sm:text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-1.5 leading-none">
        {label}
      </p>

      <p className="text-[22px] sm:text-[26px] font-display font-black text-slate-800 leading-none">
        {value}
        {suffix && (
          <span className="text-[14px] sm:text-[16px] font-bold text-slate-400 ml-1 inline-block -translate-y-0.5">
            {suffix}
          </span>
        )}
      </p>
    </Motion.div>
  );
});
StatCard.displayName = 'StatCard';

/* ─── Helper: Phân loại đề thi ─── */
function resolveCategory(examCategory) {
  if (!examCategory) return 'default';
  const k = examCategory.toLowerCase().trim();
  if (k.includes('toeic')) return 'toeic';
  if (k.includes('ielts')) return 'ielts';
  if (k.includes('thpt') || k.includes('đại học')) return 'thpt';
  if (k.includes('huflit')) return 'huflit';
  return 'default';
}

/* ─── Helper: Xây dựng mảng thông tin thẻ ─── */
function buildStatCards(score, convertedScore, category) {
  const { correct, total, percentage } = score;
  const roundedPct = Math.round(percentage);

  switch (category) {
    case 'toeic': {
      const cv = convertedScore ?? { listening: 0, reading: 0, total: 0 };
      return [
        { icon: Award, label: 'Xếp loại', value: getToeicGradeLabel(cv.total), bg: '#CE82FF', border: '#B975E5' },
        { icon: Headphones, label: 'Điểm Nghe', value: cv.listening, suffix: '/495', bg: '#1CB0F6', border: '#1899D6' },
        { icon: BookOpen, label: 'Điểm Đọc', value: cv.reading, suffix: '/495', bg: '#58CC02', border: '#46A302' },
        { icon: CheckCircle, label: 'Câu đúng', value: correct, suffix: `/${total}`, bg: '#FF9600', border: '#E58700' },
      ];
    }
    case 'ielts': {
      const rawBand = (percentage / 100) * 9;
      const band = Math.round(rawBand * 2) / 2;
      const grade = getGrade(percentage);
      return [
        { icon: Award, label: 'Band Score', value: band.toFixed(1), suffix: '/9.0', bg: '#CE82FF', border: '#B975E5' },
        { icon: CheckCircle, label: 'Câu đúng', value: correct, suffix: `/${total}`, bg: '#1CB0F6', border: '#1899D6' },
        { icon: TrendingUp, label: 'Tỷ lệ', value: roundedPct, suffix: '%', bg: '#58CC02', border: '#46A302' },
        { icon: Flame, label: 'Xếp loại', value: grade.label, bg: '#FF9600', border: '#E58700' },
      ];
    }
    case 'thpt':
    case 'huflit': {
      const score10 = ((correct / total) * 10).toFixed(2);
      const grade = getGrade(percentage);
      const IconBase = category === 'huflit' ? GraduationCap : Target;
      return [
        { icon: IconBase, label: 'Điểm số', value: score10, suffix: '/10', bg: '#FF9600', border: '#E58700' },
        { icon: TrendingUp, label: 'Tỷ lệ', value: roundedPct, suffix: '%', bg: '#1CB0F6', border: '#1899D6' },
        { icon: CheckCircle, label: 'Câu đúng', value: correct, suffix: `/${total}`, bg: '#58CC02', border: '#46A302' },
        { icon: Award, label: 'Xếp loại', value: grade.badge, bg: '#CE82FF', border: '#B975E5' },
      ];
    }
    default: {
      const grade = getGrade(percentage);
      return [
        { icon: CheckCircle, label: 'Chính xác', value: correct, suffix: `/${total}`, bg: '#1CB0F6', border: '#1899D6' },
        { icon: TrendingUp, label: 'Tỷ lệ', value: roundedPct, suffix: '%', bg: '#58CC02', border: '#46A302' },
        { icon: Flame, label: 'Cấp độ', value: getLevelLabel(percentage), bg: '#FF9600', border: '#E58700' },
        { icon: Award, label: 'Xếp loại', value: grade.badge, bg: '#CE82FF', border: '#B975E5' },
      ];
    }
  }
}

/* ══════════════════════════════════════════════════════════
   ResultsStats — Main Entry
══════════════════════════════════════════════════════════ */
const ResultsStats = memo((props) => {
  const { score, convertedScore, examCategory } = props;

  const category = useMemo(() => resolveCategory(examCategory), [examCategory]);

  const statCards = useMemo(
    () => buildStatCards(score, convertedScore, category),
    [score, convertedScore, category],
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-20">
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