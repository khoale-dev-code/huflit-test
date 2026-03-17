import { memo, useState } from 'react';
import { motion } from 'framer-motion';

import ResultsHeader     from './ResultsHeader';
import ResultsStats      from './ResultsStats';
import ResultsAnalytics  from './ResultsAnalytics';
import ResultsControls   from './ResultsControls';
import ResultsDetailList from './ResultsDetailList';

import { useScrollTop }                          from '../../../hooks/Result/useScrollTop';
import { useExamResult }                         from '../../../hooks/useExamResult';
import { useSkillAnalytics }                     from '../../../hooks/Result/useSkillAnalytics';
import { useFilteredQuestions, FILTER_TYPES }    from '../../../hooks/Result/useFilteredQuestions';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-[calc(100vh-80px)] bg-[#F4F7FA] w-full flex flex-col font-sans selection:bg-blue-200 overflow-x-hidden"
      style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}
    >
      {/* 1. Hero Header — đổi icon/màu/title theo examCategory */}
      <ResultsHeader examCategory={examCategory} />

      {/* 2. Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 pb-24 flex flex-col gap-5 sm:gap-6">

        {/* Điểm số — layout tự thay đổi theo loại đề */}
        <ResultsStats
          score={resolvedScore}
          convertedScore={convertedScore}
          examCategory={examCategory}
        />

        {/* Phân tích kỹ năng */}
        <ResultsAnalytics skillAnalytics={skillAnalytics} />

        {/* Nút điều hướng */}
        <ResultsControls onReset={onReset} />

        {/* Divider trang trí */}
        <div className="w-full flex items-center justify-center py-2 opacity-50">
          <div className="w-2 h-2 rounded-full bg-slate-300 mx-1" />
          <div className="w-3 h-3 rounded-full bg-slate-300 mx-1" />
          <div className="w-2 h-2 rounded-full bg-slate-300 mx-1" />
        </div>

        {/* Chi tiết đáp án + transcript */}
        <ResultsDetailList
          filteredQuestions={filteredQuestions}
          answers={answers}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    </motion.div>
  );
});

ResultsDisplay.displayName = 'ResultsDisplay';
export default ResultsDisplay;