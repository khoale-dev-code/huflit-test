// src/components/Display/Result/ResultsDetailList.jsx
import { memo, useState, useCallback } from 'react';
import { BarChart3, SearchX } from 'lucide-react';
import { motion } from 'framer-motion';
import AnswerReviewCard from './AnswerReviewCard';
import { FILTER_TYPES } from '../../../hooks/Result/useFilteredQuestions';

// ─── Empty States (Gamified 3D) ────────────────────────────────────────────────

const EmptyAllQuestions = () => (
  <div className="text-center py-12 bg-white border-2 border-dashed border-slate-300 rounded-[20px] shadow-sm">
    <div className="w-12 h-12 bg-slate-100 rounded-[12px] flex items-center justify-center mx-auto mb-3 border-b-[3px] border-slate-200">
      <SearchX className="w-6 h-6 text-slate-400" strokeWidth={2.5} />
    </div>
    <p className="text-[15px] font-display font-bold text-slate-600">Không có câu hỏi nào</p>
  </div>
);

const EmptyWrongQuestions = () => (
  <motion.div 
    initial={{ scale: 0.95, opacity: 0 }} 
    animate={{ scale: 1, opacity: 1 }} 
    transition={{ type: "spring", bounce: 0.4 }}
    className="text-center py-10 px-4 bg-[#f1faeb] border-2 border-[#bcf096] border-b-[4px] rounded-[24px] shadow-sm"
  >
    <p className="text-[40px] leading-none mb-3 drop-shadow-sm">🎉</p>
    <p className="text-[#58CC02] font-display font-black text-[20px] sm:text-[22px] leading-tight">
      Tuyệt vời! Không có câu sai
    </p>
    <p className="text-[#46A302]/80 font-body font-bold text-[14px] mt-1.5">
      Bạn đã trả lời đúng tất cả câu hỏi. Thật xuất sắc!
    </p>
  </motion.div>
);

// ─── FilterTabs (3D Compact Pills) ────────────────────────────────────────────

const FilterTabs = memo(({ activeFilter, onFilterChange }) => (
  <div className="flex p-1 bg-slate-200/60 border-2 border-slate-200/50 rounded-[12px] shrink-0">
    <button
      onClick={() => onFilterChange(FILTER_TYPES.ALL)}
      className={`px-4 py-1.5 text-[11px] sm:text-[12px] font-display font-bold rounded-[8px] transition-all outline-none border-2 ${
        activeFilter === FILTER_TYPES.ALL
          ? 'bg-white text-[#1CB0F6] border-slate-200 border-b-[3px] shadow-sm -translate-y-px'
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-300/50'
      }`}
    >
      TẤT CẢ
    </button>
    <button
      onClick={() => onFilterChange(FILTER_TYPES.WRONG)}
      className={`px-4 py-1.5 text-[11px] sm:text-[12px] font-display font-bold rounded-[8px] transition-all outline-none border-2 ${
        activeFilter === FILTER_TYPES.WRONG
          ? 'bg-white text-[#FF4B4B] border-slate-200 border-b-[3px] shadow-sm -translate-y-px'
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-300/50'
      }`}
    >
      CÂU SAI
    </button>
  </div>
));

FilterTabs.displayName = 'FilterTabs';

// ─── ResultsDetailList ────────────────────────────────────────────────────────

const ResultsDetailList = memo(({ filteredQuestions, answers, activeFilter, onFilterChange }) => {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const isEmpty = filteredQuestions.length === 0;

  return (
    <div className="space-y-4 font-sans" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      
      {/* ── Sticky Header (Gamified & Safe Z-index) ── */}
      <div className="sticky top-0 z-30 bg-[#F4F7FA]/90 backdrop-blur-xl py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-slate-200/50 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[8px] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[3px] flex items-center justify-center text-[#1CB0F6] shadow-sm shrink-0">
            <BarChart3 size={18} strokeWidth={2.5} />
          </div>
          <h3 className="font-display font-black text-[16px] sm:text-[18px] text-slate-800 uppercase tracking-wide pt-0.5">
            Chi tiết đáp án
          </h3>
        </div>
        <FilterTabs activeFilter={activeFilter} onFilterChange={onFilterChange} />
      </div>

      {/* ── List or Empty State ── */}
      {isEmpty ? (
        activeFilter === FILTER_TYPES.WRONG ? (
          <EmptyWrongQuestions />
        ) : (
          <EmptyAllQuestions />
        )
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => (
            <AnswerReviewCard
              key={q.id}
              question={q}
              questionNum={index + 1}  // <-- TRUYỀN SỐ THỨ TỰ XUỐNG
              isCorrect={answers[q.id] === q.correct}
              userAnswer={answers[q.id]}
              correctAnswer={q.correct}
              options={q.options}
              isExpanded={expandedId === q.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
});

ResultsDetailList.displayName = 'ResultsDetailList';
export default ResultsDetailList;