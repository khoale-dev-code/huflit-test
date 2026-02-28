import { memo, useState } from 'react';

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
 * ResultsDisplay — Orchestrator Component
 *
 * Trách nhiệm duy nhất: Kết hợp các section thành 1 layout hoàn chỉnh.
 * Mọi logic đã được tách vào hooks, mọi UI đã được tách vào sub-components.
 *
 * @param {{
 *   score: { correct: number, total: number, percentage: number },
 *   partData: object,
 *   answers: object,
 *   onReset: () => void
 * }} props
 */
const ResultsDisplay = ({ score, partData, answers, onReset }) => {
  // ── Hooks ──────────────────────────────────────────────────────────────────
  useScrollTop(); // Scroll lên đầu khi mount

  const [activeFilter, setActiveFilter] = useState(FILTER_TYPES.ALL);

  const skillAnalytics = useSkillAnalytics(partData, answers);
  const filteredQuestions = useFilteredQuestions(partData, answers, activeFilter);

  // ── Guard ──────────────────────────────────────────────────────────────────
  if (!partData) return null;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="relative isolate z-[50] min-h-screen bg-slate-50 w-full animate-in fade-in duration-500">
      <ResultsHeader />

      <div className="max-w-4xl mx-auto px-4 -mt-8 pb-24 space-y-6">
        <ResultsStats score={score} />

        <ResultsAnalytics skillAnalytics={skillAnalytics} />

        <ResultsControls onReset={onReset} />

        <ResultsDetailList
          filteredQuestions={filteredQuestions}
          answers={answers}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    </div>
  );
};

export default memo(ResultsDisplay);