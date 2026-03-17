import { memo, useMemo } from 'react';
import {
  Trophy, Headphones, Award, BookOpen,
  Star, Zap, GraduationCap, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ══════════════════════════════════════════════════════════
   EXAM THEMES — 1 entry per exam type
══════════════════════════════════════════════════════════ */
const EXAM_THEMES = {

  toeic: {
    icon: Headphones,
    bgColor: '#1CB0F6',
    shadowColor: '#1899D6',
    glowColor: '#1CB0F6',
    accentBar: 'linear-gradient(90deg, #1CB0F6, #1899D6)',
    badgeText: 'TOEIC',
    badgeBg: '#EAF6FE',
    badgeBorder: '#BAE3FB',
    badgeColor: '#1899D6',
    starColor: '#1CB0F6',
    title: 'Chinh phục TOEIC!',
    subtitle: 'Bạn vừa hoàn thành bài luyện tập TOEIC. Tiếp tục luyện tập để nâng cao điểm số nhé!',
  },

  ielts: {
    icon: Award,
    bgColor: '#CE82FF',
    shadowColor: '#B975E5',
    glowColor: '#CE82FF',
    accentBar: 'linear-gradient(90deg, #CE82FF, #B975E5)',
    badgeText: 'IELTS',
    badgeBg: '#F8EEFF',
    badgeBorder: '#eec9ff',
    badgeColor: '#B975E5',
    starColor: '#CE82FF',
    title: 'Hoàn thành IELTS!',
    subtitle: 'Xuất sắc! Hãy xem lại phần giải thích để củng cố những điểm còn yếu nhé.',
  },

  thpt: {
    icon: BookOpen,
    bgColor: '#58CC02',
    shadowColor: '#46A302',
    glowColor: '#58CC02',
    accentBar: 'linear-gradient(90deg, #58CC02, #46A302)',
    badgeText: 'THPT',
    badgeBg: '#F0FAE8',
    badgeBorder: '#bcf096',
    badgeColor: '#46A302',
    starColor: '#58CC02',
    title: 'Hoàn thành xuất sắc!',
    subtitle: 'Bạn vừa chinh phục thêm một đề luyện thi THPT. Tiếp tục phát huy nhé!',
  },

  huflit: {
    icon: GraduationCap,
    bgColor: '#FF9600',
    shadowColor: '#E58700',
    glowColor: '#FF9600',
    accentBar: 'linear-gradient(90deg, #FF9600, #E58700)',
    badgeText: 'HUFLIT',
    badgeBg: '#FFFBEA',
    badgeBorder: '#FFD8A8',
    badgeColor: '#D9A600',
    starColor: '#FF9600',
    title: 'Hoàn thành đề HUFLIT!',
    subtitle: 'Tuyệt vời! Bạn vừa hoàn thành đề thi chuẩn đầu ra HUFLIT. Xem kết quả chi tiết bên dưới nhé.',
  },

  // Đề tự chọn / Khác — fallback
  default: {
    icon: Trophy,
    bgColor: '#FFC200',
    shadowColor: '#D9A600',
    glowColor: '#FFC800',
    accentBar: 'linear-gradient(90deg, #FFC200, #D9A600)',
    badgeText: null,
    badgeBg: null,
    badgeBorder: null,
    badgeColor: null,
    starColor: '#FFC200',
    title: 'Hoàn thành xuất sắc!',
    subtitle: 'Tuyệt vời! Bạn vừa chinh phục thêm một thử thách mới.',
  },
};

/* ══════════════════════════════════════════════════════════
   resolveTheme
   Dùng includes() để match linh hoạt:
   "toeic-part3" / "TOEIC" / "toeic_full" → toeic
   "Đề Thi Chuẩn Đầu Ra HUFLIT" → huflit
══════════════════════════════════════════════════════════ */
function resolveTheme(examCategory) {
  if (!examCategory) return EXAM_THEMES.default;
  const k = examCategory.toLowerCase().trim();

  if (k.includes('toeic'))                                                              return EXAM_THEMES.toeic;
  if (k.includes('ielts'))                                                              return EXAM_THEMES.ielts;
  if (k.includes('thpt') || k.includes('đại học') || k.includes('dai hoc'))            return EXAM_THEMES.thpt;
  if (k.includes('huflit') || k.includes('chuẩn đầu ra') || k.includes('chuan dau ra')) return EXAM_THEMES.huflit;

  return EXAM_THEMES.default;
}

/* ══════════════════════════════════════════════════════════
   DecorativeSparkles
══════════════════════════════════════════════════════════ */
const DecorativeSparkles = memo(({ starColor }) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0 }}
      animate={{ opacity: 1, y: -16, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
      className="absolute -top-2 -left-5"
    >
      <Star className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" style={{ color: starColor, fill: starColor }} />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0 }}
      animate={{ opacity: 1, y: -20, scale: 1 }}
      transition={{ delay: 0.65, type: 'spring', stiffness: 300 }}
      className="absolute -top-4 -right-3"
    >
      <Star className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm" style={{ color: starColor, fill: starColor }} />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.75, type: 'spring', stiffness: 300 }}
      className="absolute -bottom-1 -right-5"
    >
      <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 drop-shadow-sm" style={{ color: starColor, fill: starColor }} />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.7, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
      className="absolute -bottom-2 -left-4"
    >
      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: starColor }} />
    </motion.div>
  </>
));
DecorativeSparkles.displayName = 'DecorativeSparkles';

/* ══════════════════════════════════════════════════════════
   MAIN — ResultsHeader
══════════════════════════════════════════════════════════ */
const ResultsHeader = memo(({ examCategory, title, subtitle }) => {
  const theme = useMemo(() => resolveTheme(examCategory), [examCategory]);

  const displayTitle    = title    || theme.title;
  const displaySubtitle = subtitle || theme.subtitle;
  const IconComponent   = theme.icon;

  return (
    <div
      className="w-full border-b-[4px] border-slate-200 pt-8 pb-10 sm:pt-10 sm:pb-12 px-4 text-center relative overflow-hidden"
      style={{ background: '#FFFFFF', fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      {/* Dải màu accent trên cùng */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ background: theme.accentBar }}
      />

      {/* Icon 3D */}
      <div className="relative inline-block mb-4 sm:mb-5">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-20 scale-[2.2]"
          style={{ background: theme.glowColor }}
        />
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
          className="relative w-[68px] h-[68px] sm:w-[84px] sm:h-[84px] rounded-[22px] sm:rounded-[26px] flex items-center justify-center mx-auto z-10 border-4 border-white"
          style={{
            background: theme.bgColor,
            boxShadow: `0 6px 0 ${theme.shadowColor}, 0 12px 28px ${theme.glowColor}30`,
          }}
        >
          <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
          <DecorativeSparkles starColor={theme.starColor} />
        </motion.div>
      </div>

      {/* Badge loại đề */}
      {theme.badgeText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.28, type: 'spring', stiffness: 280 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 text-[11px] font-black uppercase tracking-widest mb-3"
          style={{
            background: theme.badgeBg,
            borderColor: theme.badgeBorder,
            color: theme.badgeColor,
            fontFamily: '"Baloo 2", "Nunito", sans-serif',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: theme.badgeColor }} />
          {theme.badgeText}
        </motion.div>
      )}

      {/* Title & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
      >
        <h1
          className="text-[22px] sm:text-[26px] font-black tracking-tight leading-tight mb-1.5 sm:mb-2 text-slate-800"
          style={{ fontFamily: '"Baloo 2", "Nunito", sans-serif' }}
        >
          {displayTitle}
        </h1>
        <p
          className="text-[13px] sm:text-[15px] font-bold text-slate-500 max-w-md mx-auto leading-relaxed"
          style={{ fontFamily: '"Nunito", sans-serif' }}
        >
          {displaySubtitle}
        </p>
      </motion.div>
    </div>
  );
});

ResultsHeader.displayName = 'ResultsHeader';
export default ResultsHeader;