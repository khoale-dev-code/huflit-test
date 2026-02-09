/* src/components/FullExam/components/Results/BreakdownChart.jsx */

import React, { memo } from 'react';
import { COLORS } from '../../constants/colors';

/**
 * Breakdown Chart - Show Listening vs Reading scores
 */
export const BreakdownChart = memo(({ results }) => {
  if (!results) return null;

  const { listening, reading } = results;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8">
      <h3 className="font-bold text-lg text-slate-900 mb-6">Score Breakdown</h3>

      <div className="space-y-6">
        {/* Listening */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">Listening</span>
              <span className="text-xs text-slate-500">({listening.correct}/20)</span>
            </div>
            <span className="text-sm font-bold text-slate-900">
              {listening.points.toFixed(1)} / 100
            </span>
          </div>
          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(listening.correct / 20) * 100}%`,
                backgroundColor: COLORS.blue,
              }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {listening.percentage.toFixed(1)}% correct
          </p>
        </div>

        {/* Reading */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">Reading</span>
              <span className="text-xs text-slate-500">({reading.correct}/40)</span>
            </div>
            <span className="text-sm font-bold text-slate-900">
              {reading.points.toFixed(1)} / 100
            </span>
          </div>
          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(reading.correct / 40) * 100}%`,
                backgroundColor: COLORS.orange,
              }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {reading.percentage.toFixed(1)}% correct
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xs text-slate-600 mb-1">Total Correct</p>
          <p className="text-lg font-bold text-slate-900">
            {results.totalCorrect}/60
          </p>
        </div>
        <div className="text-center border-l border-r border-slate-200">
          <p className="text-xs text-slate-600 mb-1">Accuracy</p>
          <p className="text-lg font-bold text-slate-900">
            {((results.totalCorrect / 60) * 100).toFixed(1)}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-600 mb-1">Level</p>
          <p className="text-lg font-bold" style={{ color: results.cefr.color }}>
            {results.cefr.level}
          </p>
        </div>
      </div>
    </div>
  );
});

BreakdownChart.displayName = 'BreakdownChart';
export default BreakdownChart;