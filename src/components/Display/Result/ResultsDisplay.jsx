// src/components/Display/Result/ResultsDisplay.jsx
import { memo, useState } from 'react';
import { motion as Motion } from 'framer-motion';

import ResultsHeader     from './ResultsHeader';
import ResultsStats      from './ResultsStats';
import ResultsAnalytics  from './ResultsAnalytics';
import ResultsControls   from './ResultsControls';
import ResultsDetailList from './ResultsDetailList';

import { useScrollTop }                          from '../../../hooks/Result/useScrollTop';
import { useExamResult }                         from '../../../hooks/useExamResult';
import { useSkillAnalytics }                     from '../../../hooks/Result/useSkillAnalytics';
import { useFilteredQuestions, FILTER_TYPES }    from '../../../hooks/Result/useFilteredQuestions';

/* ─── ANIMATION VARIANTS ────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Khoảng thời gian xuất hiện giữa các khối
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 300, damping: 24 } 
  }
};

/* ══════════════════════════════════════════════════════════
   ResultsDisplay — Orchestrator

   Props:
     scoreResult    — { correct, total, percentage }   từ useAppState
     convertedScore — { listening, reading, total }    từ useAppState (TOEIC only)
     examCategory   — string                           từ useAppState
     score          — legacy fallback nếu cha chưa cập nhật
     partData       — dữ liệu đề thi
     answers        — { [questionId]: selectedIndex }
     onReset        — callback làm lại bài
══════════════════════════════════════════════════════════ */
const ResultsDisplay = memo(({
  scoreResult,
  convertedScore,
  examCategory,
  score,          // legacy fallback
  partData,
  answers,
  onReset,
}) => {
  useScrollTop();

  const [activeFilter, setActiveFilter] = useState(FILTER_TYPES.ALL);

  // Dùng lại allValidQuestions từ useExamResult để useSkillAnalytics
  // và useFilteredQuestions đều dùng chung 1 nguồn — không flatten 2 lần
  const { allValidQuestions } = useExamResult(partData, answers, examCategory);

  const skillAnalytics    = useSkillAnalytics(allValidQuestions, answers);
  const filteredQuestions = useFilteredQuestions(partData, answers, activeFilter);

  // Ưu tiên scoreResult (mới), fallback về score (legacy)
  const resolvedScore = scoreResult ?? score;

  if (!partData || !resolvedScore) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative min-h-[calc(100vh-80px)] bg-[#F4F7FA] w-full flex flex-col font-sans selection:bg-blue-200 overflow-x-hidden"
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      {/* 1. Hero Header — đổi icon/màu/title theo examCategory */}
      <motion.div variants={itemVariants} className="w-full z-0">
        <ResultsHeader examCategory={examCategory} />
      </motion.div>

      {/* 2. Main Content - Căn giữa, max-w-5xl cho Desktop, margin âm để đè lên Header */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 md:-mt-14 pb-24 flex flex-col gap-6 md:gap-8">

        {/* Điểm số — layout tự thay đổi theo loại đề */}
        <motion.div variants={itemVariants}>
          <ResultsStats
            score={resolvedScore}
            convertedScore={convertedScore}
            examCategory={examCategory}
          />
        </motion.div>

        {/* Phân tích kỹ năng */}
        <motion.div variants={itemVariants}>
          <ResultsAnalytics skillAnalytics={skillAnalytics} />
        </motion.div>

        {/* Nút điều hướng */}
        <motion.div variants={itemVariants}>
          <ResultsControls onReset={onReset} />
        </motion.div>

        {/* Divider trang trí Gamification */}
        <motion.div variants={itemVariants} className="w-full flex items-center justify-center py-4 md:py-6 opacity-80">
          <div className="w-2.5 h-2.5 rounded-full bg-hub-blue mx-1.5" />
          <div className="w-3.5 h-3.5 rounded-full bg-hub-green mx-1.5" />
          <div className="w-2.5 h-2.5 rounded-full bg-hub-yellow mx-1.5" />
        </motion.div>

        {/* Chi tiết đáp án + transcript */}
        <motion.div variants={itemVariants}>
          <ResultsDetailList
            filteredQuestions={filteredQuestions}
            answers={answers}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

ResultsDisplay.displayName = 'ResultsDisplay';
export default ResultsDisplay;