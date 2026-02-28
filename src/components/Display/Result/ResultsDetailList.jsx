import { memo, useState, useCallback } from 'react';
import { BarChart3 } from 'lucide-react';
import AnswerReviewCard from './AnswerReviewCard';
import { FILTER_TYPES } from '../../../hooks/Result/useFilteredQuestions';

// ─── Empty States ──────────────────────────────────────────────────────────────

const EmptyAllQuestions = () => (
  <div className="text-center py-12 text-slate-400">
    <p className="text-sm font-medium">Không có câu hỏi nào</p>
  </div>
);

const EmptyWrongQuestions = () => (
  <div className="text-center py-12">
    <p className="text-4xl mb-3">🎉</p>
    <p className="text-slate-600 font-bold text-base">Tuyệt vời! Không có câu sai</p>
    <p className="text-slate-400 text-sm mt-1">Bạn đã trả lời đúng tất cả câu hỏi.</p>
  </div>
);

// ─── FilterTabs ───────────────────────────────────────────────────────────────

const FilterTabs = memo(({ activeFilter, onFilterChange }) => (
  <div className="flex bg-slate-200 p-1 rounded-lg">
    <button
      onClick={() => onFilterChange(FILTER_TYPES.ALL)}
      className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
        activeFilter === FILTER_TYPES.ALL
          ? 'bg-white text-slate-900 shadow-sm'
          : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      TẤT CẢ
    </button>
    <button
      onClick={() => onFilterChange(FILTER_TYPES.WRONG)}
      className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
        activeFilter === FILTER_TYPES.WRONG
          ? 'bg-white text-rose-600 shadow-sm'
          : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      CÂU SAI
    </button>
  </div>
));

FilterTabs.displayName = 'FilterTabs';

// ─── ResultsDetailList ────────────────────────────────────────────────────────

/**
 * Danh sách câu hỏi kèm filter và expand/collapse
 *
 * Quản lý `expandedId` tập trung tại đây (thay vì mỗi card giữ state riêng)
 * → Tránh N state instances cho N câu hỏi
 *
 * @param {{
 *   filteredQuestions: object[],
 *   answers: object,
 *   activeFilter: string,
 *   onFilterChange: (filter: string) => void
 * }} props
 */
const ResultsDetailList = memo(({ filteredQuestions, answers, activeFilter, onFilterChange }) => {
  // ✅ Quản lý expanded tập trung - chỉ 1 state dù có 100 câu
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const isEmpty = filteredQuestions.length === 0;

  return (
    <div className="space-y-4">
      {/* Sticky Header */}
      <div className="flex items-center justify-between sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm py-4">
        <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Chi tiết đáp án
        </h3>
        <FilterTabs activeFilter={activeFilter} onFilterChange={onFilterChange} />
      </div>

      {/* List or Empty State */}
      {isEmpty ? (
        activeFilter === FILTER_TYPES.WRONG ? (
          <EmptyWrongQuestions />
        ) : (
          <EmptyAllQuestions />
        )
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <AnswerReviewCard
              key={q.id}
              question={q}
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