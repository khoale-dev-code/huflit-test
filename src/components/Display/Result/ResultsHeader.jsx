// src/components/Display/Result/ResultsHeader.jsx
import React, { memo, useMemo } from 'react';
import {
  Trophy, Headphones, Award, BookOpen,
  Star, Zap, GraduationCap, Sparkles
} from 'lucide-react';
// 🚀 FIX: Alias Motion đã được thiết lập để pass ESLint
import { motion as Motion } from 'framer-motion';

/* ─── EXAM THEMES ─── */
const EXAM_THEMES = {
  toeic: {
    icon: Headphones,
    color: 'blue',
    badgeText: 'TOEIC',
    title: 'Chinh phục TOEIC!',
    subtitle: 'Bạn vừa hoàn thành bài luyện tập TOEIC. Tiếp tục luyện tập để nâng cao điểm số nhé!',
  },
  ielts: {
    icon: Award,
    color: 'purple',
    badgeText: 'IELTS',
    title: 'Hoàn thành IELTS!',
    subtitle: 'Xuất sắc! Hãy xem lại phần giải thích để củng cố những điểm còn yếu nhé.',
  },
  thpt: {
    icon: BookOpen,
    color: 'green',
    badgeText: 'THPT',
    title: 'Hoàn thành xuất sắc!',
    subtitle: 'Bạn vừa chinh phục thêm một đề luyện thi THPT. Tiếp tục phát huy nhé!',
  },
  huflit: {
    icon: GraduationCap,
    color: 'yellow',
    badgeText: 'HUFLIT',
    title: 'Hoàn thành đề HUFLIT!',
    subtitle: 'Tuyệt vời! Bạn vừa hoàn thành đề thi chuẩn đầu ra HUFLIT. Xem kết quả chi tiết bên dưới nhé.',
  },
  default: {
    icon: Trophy,
    color: 'yellow',
    badgeText: null,
    title: 'Hoàn thành xuất sắc!',
    subtitle: 'Tuyệt vời! Bạn vừa chinh phục thêm một thử thách mới.',
  },
};

function resolveTheme(examCategory) {
  if (!examCategory) return EXAM_THEMES.default;
  const k = examCategory.toLowerCase().trim();
  if (k.includes('toeic')) return EXAM_THEMES.toeic;
  if (k.includes('ielts')) return EXAM_THEMES.ielts;
  if (k.includes('thpt') || k.includes('đại học') || k.includes('dai hoc')) return EXAM_THEMES.thpt;
  if (k.includes('huflit') || k.includes('chuẩn đầu ra') || k.includes('chuan dau ra')) return EXAM_THEMES.huflit;
  return EXAM_THEMES.default;
}

/* ─── DecorativeSparkles ─── */
const DecorativeSparkles = memo(({ color }) => {
  const colorClass = `text-hub-${color}`; 

  return (
    <>
      {/* 🚀 FIX: Đổi motion.div thành Motion.div */}
      <Motion.div
        initial={{ opacity: 0, y: 10, scale: 0 }}
        animate={{ opacity: 1, y: -20, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        className="absolute -top-3 -left-6 md:-top-4 md:-left-8"
      >
        <Star className={`w-5 h-5 md:w-7 md:h-7 drop-shadow-sm fill-current ${colorClass}`} />
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 10, scale: 0 }}
        animate={{ opacity: 1, y: -24, scale: 1 }}
        transition={{ delay: 0.65, type: 'spring', stiffness: 300 }}
        className="absolute -top-5 -right-4 md:-top-6 md:-right-6"
      >
        <Star className={`w-6 h-6 md:w-8 md:h-8 drop-shadow-sm fill-current ${colorClass}`} />
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, type: 'spring', stiffness: 300 }}
        className="absolute -bottom-2 -right-6 md:-bottom-2 md:-right-8"
      >
        <Zap className={`w-4 h-4 md:w-6 md:h-6 drop-shadow-sm fill-current ${colorClass}`} />
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
        className="absolute -bottom-3 -left-5 md:-bottom-4 md:-left-6"
      >
        <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${colorClass}`} />
      </Motion.div>
    </>
  );
});
DecorativeSparkles.displayName = 'DecorativeSparkles';

/* ─── MAIN — ResultsHeader ─── */
const ResultsHeader = memo((props) => {
  const { examCategory, title, subtitle } = props;
  const theme = useMemo(() => resolveTheme(examCategory), [examCategory]);

  const displayTitle    = title    || theme.title;
  const displaySubtitle = subtitle || theme.subtitle;
  const IconComponent   = theme.icon;
  const color           = theme.color;

  return (
    <div className="w-full bg-white border-b-[4px] border-slate-200 pt-10 pb-14 sm:pt-14 sm:pb-20 px-4 text-center relative overflow-hidden rounded-b-[32px] md:rounded-b-[48px] shadow-sm z-20">
      
      {/* Dải màu accent trên cùng */}
      <div className={`absolute top-0 left-0 right-0 h-2 md:h-3 bg-hub-${color}`} />

      {/* Icon 3D Container */}
      <div className="relative inline-block mb-6 md:mb-8 mt-2">
        <div className={`absolute inset-0 rounded-full blur-[30px] md:blur-[40px] opacity-20 scale-[2.5] bg-hub-${color}`} />
        
        {/* 🚀 FIX: Đổi motion.div thành Motion.div */}
        <Motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
          className={`relative w-20 h-20 md:w-28 md:h-28 rounded-[24px] md:rounded-[32px] flex items-center justify-center mx-auto z-10 border-[4px] md:border-[6px] border-white bg-hub-${color} border-b-[6px] md:border-b-[10px] border-hub-${color}-dark shadow-sm`}
        >
          <IconComponent className="w-10 h-10 md:w-14 md:h-14 text-white" strokeWidth={2.5} />
          <DecorativeSparkles color={color} />
        </Motion.div>
      </div>

      {/* Badge loại đề */}
      {theme.badgeText && (
        <Motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 280 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full border-2 text-[12px] md:text-[14px] font-display font-black uppercase tracking-widest mb-4 bg-hub-${color}-bg border-hub-${color}-border text-hub-${color}-dark shadow-sm`}
        >
          <span className={`w-2 h-2 rounded-full shrink-0 bg-hub-${color}`} />
          {theme.badgeText}
        </Motion.div>
      )}

      {/* Title & Subtitle */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 24 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-[26px] sm:text-[32px] md:text-[40px] font-display font-black tracking-wide leading-tight mb-2 md:mb-3 text-slate-800">
          {displayTitle}
        </h1>
        <p className="text-[14px] sm:text-[16px] md:text-[18px] font-body font-bold text-slate-500 leading-relaxed px-4">
          {displaySubtitle}
        </p>
      </Motion.div>
    </div>
  );
});

ResultsHeader.displayName = 'ResultsHeader';

export default ResultsHeader;