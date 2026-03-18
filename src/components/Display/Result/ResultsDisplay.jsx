// src/components/Display/Result/ResultsDisplay.jsx
import React, { memo, useState, useMemo } from 'react';
// 🚀 FIX: Alias Motion (Viết hoa) để thỏa mãn quy tắc /^[A-Z_]/u của ESLint
import { motion as Motion } from 'framer-motion';

// Sub-components
import ResultsHeader from './ResultsHeader';
import ResultsStats from './ResultsStats';
import ResultsAnalytics from './ResultsAnalytics';
import ResultsControls from './ResultsControls';
import ResultsDetailList from './ResultsDetailList';

// Hooks
import { useScrollTop } from '../../../hooks/Result/useScrollTop';
import { useExamResult } from '../../../hooks/useExamResult';
import { useSkillAnalytics } from '../../../hooks/Result/useSkillAnalytics';
import { useFilteredQuestions, FILTER_TYPES } from '../../../hooks/Result/useFilteredQuestions';

/* ─── ANIMATION VARIANTS (3D & Smooth) ────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 } 
  }
};

/* ══════════════════════════════════════════════════════════
   ResultsDisplay — Orchestrator (Trang kết quả tổng thể)
══════════════════════════════════════════════════════════ */
const ResultsDisplay = memo((props) => {
  // 🚀 FIX ESLint: Nhận props tổng và bóc tách bên trong thân hàm 
  // giúp Linter theo dõi biến tốt hơn 100%.
  const { 
    scoreResult, 
    convertedScore, 
    examCategory, 
    score, 
    partData, 
    answers, 
    onReset 
  } = props;

  // Cuộn lên đầu trang khi xem kết quả
  useScrollTop();

  const [activeFilter, setActiveFilter] = useState(FILTER_TYPES.ALL);

  // Tính toán dữ liệu phân tích từ Hooks
  const { allValidQuestions } = useExamResult(partData, answers, examCategory);
  const skillAnalytics = useSkillAnalytics(allValidQuestions, answers);
  const filteredQuestions = useFilteredQuestions(partData, answers, activeFilter);

  // Ưu tiên kết quả mới từ state, fallback về legacy score
  const resolvedScore = useMemo(() => scoreResult ?? score, [scoreResult, score]);

  // Logging cho môi trường Development (Dùng import.meta.env cho Vite)
  useMemo(() => {
    if (import.meta.env.DEV && resolvedScore) {
      console.debug('[Results] Score summary:', resolvedScore);
    }
  }, [resolvedScore]);

  // Nếu không có dữ liệu, hiển thị trống (Ngăn lỗi trắng trang)
  if (!partData || !resolvedScore) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-hub-blue rounded-full animate-spin" />
        <p className="text-slate-400 font-display font-bold">Đang tổng hợp kết quả...</p>
      </div>
    );
  }

  return (
    <Motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative min-h-[calc(100vh-80px)] bg-[#F4F7FA] w-full flex flex-col font-sans selection:bg-blue-200 overflow-x-hidden"
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      {/* 1. HERO HEADER (Nền xanh & Icon loại bài thi) */}
      <Motion.div variants={itemVariants} className="w-full z-0">
        <ResultsHeader examCategory={examCategory} />
      </Motion.div>

      {/* 2. MAIN CONTENT (Căn giữa, Layer đè nhẹ lên Header) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 md:-mt-16 pb-24 flex flex-col gap-6 md:gap-8">

        {/* Khối Điểm Số (Score Cards) */}
        <Motion.div variants={itemVariants}>
          <ResultsStats
            score={resolvedScore}
            convertedScore={convertedScore}
            examCategory={examCategory}
          />
        </Motion.div>

        {/* Khối Phân Tích (Skill Radar/Chart) */}
        <Motion.div variants={itemVariants}>
          <ResultsAnalytics skillAnalytics={skillAnalytics} />
        </Motion.div>

        {/* Nút Điều Hướng (Làm lại/Thoát) */}
        <Motion.div variants={itemVariants}>
          <ResultsControls onReset={onReset} />
        </Motion.div>

        {/* Decorative Divider (Dấu chấm 3D đặc trưng) */}
        <Motion.div 
          variants={itemVariants} 
          className="w-full flex items-center justify-center py-2 md:py-4 opacity-60"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-hub-blue mx-2 animate-pulse" />
          <div className="w-4 h-4 rounded-full bg-hub-green mx-2 animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="w-2.5 h-2.5 rounded-full bg-hub-yellow mx-2 animate-pulse" />
        </Motion.div>

        {/* Danh Sách Chi Tiết (Đáp án đúng/sai & Giải thích) */}
        <Motion.div variants={itemVariants}>
          <ResultsDetailList
            filteredQuestions={filteredQuestions}
            answers={answers}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </Motion.div>
      </div>

      {/* Hiệu ứng Pháo hoa nhỏ khi đạt điểm cao (Optional) */}
      {resolvedScore.percentage >= 80 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
           {/* Bạn có thể thêm component Confetti ở đây nếu muốn */}
        </div>
      )}
    </Motion.div>
  );
});

ResultsDisplay.displayName = 'ResultsDisplay';

export default ResultsDisplay;