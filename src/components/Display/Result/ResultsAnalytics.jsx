import { memo } from 'react';
import { BrainCircuit } from 'lucide-react';
import { SCORE_THRESHOLDS } from '../../../utils/gradeUtils';

// ─── SkillBar ─────────────────────────────────────────────────────────────────

const SkillBar = memo(({ label, correct, total }) => {
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPassing = percent >= SCORE_THRESHOLDS.PASS;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-slate-600">{label}</span>
        <span className={isPassing ? 'text-emerald-600' : 'text-rose-500'}>
          {percent}%
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isPassing ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
});

SkillBar.displayName = 'SkillBar';

// ─── EmptyAnalytics ───────────────────────────────────────────────────────────

const EmptyAnalytics = () => (
  <div className="text-center py-8 text-slate-400">
    <p className="text-sm font-medium">Không có dữ liệu phân tích</p>
  </div>
);

// ─── ResultsAnalytics ─────────────────────────────────────────────────────────

/**
 * Phần phân tích kỹ năng theo category
 * @param {{ [category: string]: { correct: number, total: number } }} skillAnalytics
 */
const ResultsAnalytics = memo(({ skillAnalytics }) => {
  const entries = Object.entries(skillAnalytics);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit className="w-5 h-5 text-indigo-600" />
        <h2 className="font-bold text-slate-800">Phân tích kỹ năng</h2>
      </div>

      {entries.length === 0 ? (
        <EmptyAnalytics />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {entries.map(([label, data]) => (
            <SkillBar
              key={label}
              label={label}
              correct={data.correct}
              total={data.total}
            />
          ))}
        </div>
      )}
    </div>
  );
});

ResultsAnalytics.displayName = 'ResultsAnalytics';
export default ResultsAnalytics;