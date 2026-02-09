/* src/components/FullExam/components/Results/PartResults.jsx */

import React, { memo } from 'react';
import { COLORS } from '../../constants/colors';

/**
 * Part Results - Show results for each part
 */
export const PartResults = memo(({ partResults }) => {
  if (!partResults) return null;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
      <h3 className="font-bold text-lg text-slate-900 mb-6">Part-by-Part Results</h3>

      {/* Listening Parts */}
      <div className="mb-8">
        <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">
          Listening Parts
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((p) => (
            <PartResultCard
              key={`listening-${p}`}
              label={`Listening ${p}`}
              score={partResults.listeningByPart[p] || 0}
              maxScore={5}
              color={COLORS.blue}
            />
          ))}
        </div>
      </div>

      {/* Reading Parts */}
      <div>
        <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">
          Reading Parts
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((p) => (
            <PartResultCard
              key={`reading-${p}`}
              label={`Reading ${p}`}
              score={partResults.readingByPart[p] || 0}
              maxScore={10}
              color={COLORS.orange}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

PartResults.displayName = 'PartResults';

/**
 * Single Part Result Card
 */
const PartResultCard = memo(({ label, score, maxScore, color }) => {
  const percentage = (score / maxScore) * 100;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;
  const isFair = percentage >= 40;

  let statusColor = '#DC2626'; // Red
  let statusText = 'Needs Work';

  if (isExcellent) {
    statusColor = '#059669'; // Green
    statusText = 'Excellent';
  } else if (isGood) {
    statusColor = '#0066CC'; // Blue
    statusText = 'Good';
  } else if (isFair) {
    statusColor = '#FF8C42'; // Orange
    statusText = 'Fair';
  }

  return (
    <div className="p-4 rounded-lg border border-slate-200 text-center bg-slate-50">
      <p className="text-sm font-bold text-slate-900 mb-2">{label}</p>

      {/* Score Display */}
      <div className="mb-3">
        <p className="text-2xl font-black" style={{ color }}>
          {score}/{maxScore}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full transition-all"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>

      {/* Status */}
      <p className="text-xs font-bold text-white rounded px-2 py-1 inline-block" style={{ backgroundColor: statusColor }}>
        {statusText}
      </p>

      {/* Percentage */}
      <p className="text-xs text-slate-600 mt-2">
        {percentage.toFixed(0)}%
      </p>
    </div>
  );
});

PartResultCard.displayName = 'PartResultCard';

export default PartResults;