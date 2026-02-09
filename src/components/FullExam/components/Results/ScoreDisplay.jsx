/* src/components/FullExam/components/Results/ScoreDisplay.jsx */

import React, { memo } from 'react';
import { Award } from 'lucide-react';
export const ScoreDisplay = memo(({ results }) => {
  if (!results) return null;

  const { averageScore, cefr } = results;

  const score =
    typeof averageScore === 'number'
      ? averageScore
      : parseFloat(averageScore) || 0;

  return (
    <div
      className="bg-white rounded-lg border-t-4 p-8 text-center"
      style={{ borderTopColor: cefr.color }}
    >
      <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-3">
        Overall Score
      </p>

      <div className="text-5xl font-black text-slate-900 mb-6">
        {score.toFixed(1)}
      </div>

      <div
        className="w-20 h-20 rounded-full flex items-center justify-center font-black text-white text-2xl shadow-lg mx-auto mb-4"
        style={{ backgroundColor: cefr.color }}
      >
        {cefr.level}
      </div>

      <p className="text-lg font-bold text-slate-900 mb-2">
        {cefr.label}
      </p>

      <p className="text-sm text-slate-600 mb-6">
        Score: {cefr.range}
      </p>

      <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg mb-4">
        {cefr.description}
      </p>

      <div className="mb-6">
        <p className="text-xs text-slate-600 mb-2">Performance</p>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${Math.min(score, 100)}%`,
              backgroundColor: cefr.color,
            }}
          />
        </div>
      </div>

      <Award className="w-8 h-8 text-amber-500 mx-auto" />
    </div>
  );
});

ScoreDisplay.displayName = 'ScoreDisplay';
export default ScoreDisplay;