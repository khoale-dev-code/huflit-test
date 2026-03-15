import { memo, useState } from 'react';
import { motion } from 'framer-motion';

// Layout sections
import ResultsHeader from './ResultsHeader';
import ResultsStats from './ResultsStats';
import ResultsAnalytics from './ResultsAnalytics';
import ResultsControls from './ResultsControls';
import ResultsDetailList from './ResultsDetailList';

// Custom hooks
import { useScrollTop } from '../../../hooks/Result/useScrollTop';
import { useSkillAnalytics } from '../../../hooks/Result/useSkillAnalytics';
import { useFilteredQuestions, FILTER_TYPES } from '../../../hooks/Result/useFilteredQuestions';

/**
 * ResultsDisplay — Orchestrator Component (Gamified 3D UI)
 *
 * @param {{
 * score: { correct: number, total: number, percentage: number },
 * convertedScore: { listening: number, reading: number, total: number } | null,
 * examCategory: string,
 * partData: object,
 * answers: object,
 * onReset: () => void
 * }} props
 */
const ResultsDisplay = ({ score, convertedScore, examCategory, partData, answers, onReset }) => {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  useScrollTop(); // Scroll lên đầu khi mount

  const [activeFilter, setActiveFilter] = useState(FILTER_TYPES.ALL);

  const skillAnalytics = useSkillAnalytics(partData, answers);
  const filteredQuestions = useFilteredQuestions(partData, answers, activeFilter);

  // ── Guard ──────────────────────────────────────────────────────────────────
  if (!partData) return null;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-[calc(100vh-80px)] bg-[#F4F7FA] w-full flex flex-col font-sans selection:bg-blue-200 overflow-x-hidden"
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      {/* 1. Hero Header (Cúp vàng rực rỡ) */}
      <ResultsHeader examCategory={examCategory} />

      {/* 2. Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 pb-24 flex flex-col gap-5 sm:gap-6">
        
        {/* Box 1: Điểm số tổng quan (Tự động thay đổi giao diện theo examCategory) */}
        <ResultsStats 
          score={score} 
          convertedScore={convertedScore} 
          examCategory={examCategory} 
        />

        {/* Box 2: Phân tích kỹ năng chi tiết */}
        <ResultsAnalytics skillAnalytics={skillAnalytics} />

        {/* Box 3: Cụm Nút Điều hướng 3D */}
        <ResultsControls onReset={onReset} />

        {/* Cầu nối trang trí (Decorative divider) */}
        <div className="w-full flex items-center justify-center py-2 opacity-50">
          <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-slate-300 mx-1"></div>
          <div className="w-2 h-2 rounded-full bg-slate-300 mx-1"></div>
        </div>

        {/* Box 4: Danh sách bộ lọc & Cấu trúc câu hỏi chi tiết */}
        <ResultsDetailList
          filteredQuestions={filteredQuestions}
          answers={answers}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        
      </div>
    </motion.div>
  );
};

export default memo(ResultsDisplay);