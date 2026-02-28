import { memo, useMemo } from 'react';
import { CheckCircle, TrendingUp, Flame, Award } from 'lucide-react';
import { getGrade, getLevelLabel } from '../../../utils/gradeUtils';

// ─── StatCard ── 

const StatCard = memo(({ icon: Icon, label, value, suffix, accentColor }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm hover:shadow-md transition-all">
    <div
      className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-sm`}
    >
      <Icon className="w-6 h-6 text-white" />
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-3xl font-black text-slate-900">
      {value}
      <span className="text-lg text-slate-400 ml-0.5">{suffix}</span>
    </p>
  </div>
));

StatCard.displayName = 'StatCard';

// ─── ResultsStats ─────────────────────────────────────────────────────────────

/**
 * Grid hiển thị 4 stat cards chính
 * @param {{ correct: number, total: number, percentage: number }} score
 */
const ResultsStats = memo(({ score }) => {
  // Pre-compute một lần, tránh tính lại khi render
  const roundedPercentage = useMemo(
    () => Math.round(score.percentage),
    [score.percentage]
  );
  const grade = useMemo(() => getGrade(score.percentage), [score.percentage]);
  const levelLabel = useMemo(() => getLevelLabel(score.percentage), [score.percentage]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={CheckCircle}
        label="Chính xác"
        value={score.correct}
        suffix={`/${score.total}`}
        accentColor="from-blue-600 to-indigo-500"
      />
      <StatCard
        icon={TrendingUp}
        label="Tỷ lệ"
        value={roundedPercentage}
        suffix="%"
        accentColor="from-emerald-600 to-teal-500"
      />
      <StatCard
        icon={Flame}
        label="Cấp độ"
        value={levelLabel}
        suffix=""
        accentColor="from-orange-500 to-amber-400"
      />
      <StatCard
        icon={Award}
        label="Xếp loại"
        value={grade.badge}
        suffix=""
        accentColor={grade.color}
      />
    </div>
  );
});

ResultsStats.displayName = 'ResultsStats';
export default ResultsStats;