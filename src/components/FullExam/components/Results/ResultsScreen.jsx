/* src/components/FullExam/components/Results/ResultsScreen.jsx */

import React, { memo, useMemo } from 'react';
import { Trophy, TrendingUp, Target, RotateCcw, ChevronLeft, AlertCircle } from 'lucide-react';
import StepIndicator from '../../StepIndicator';
import { COLORS } from '../../constants/colors';
import { calculateFullResults, getResultsByPart } from '../../utils/examHelpers';
import { ScoreDisplay } from './ScoreDisplay';
import { BreakdownChart } from './BreakdownChart';
import { PartResults } from './PartResults';

/**
 * Results Screen - Display exam results and scores
 * Shows:
 * - Overall score and CEFR level
 * - Section breakdown (Listening vs Reading)
 * - Part-by-part results
 * - Strengths and weaknesses
 */
export const ResultsScreen = memo(({
  examData,
  answers,
  onRetry,
  onExit,
}) => {
  if (!examData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Loading results...</p>
        </div>
      </div>
    );
  }

  // Calculate results
  const results = useMemo(() => calculateFullResults(examData, answers), [examData, answers]);
  const partResults = useMemo(() => getResultsByPart(examData, answers), [examData, answers]);

  // Find strongest and weakest parts
  const allParts = [
    { name: 'Listening 1', score: partResults.listeningByPart[1] || 0, max: 5, section: 'listening' },
    { name: 'Listening 2', score: partResults.listeningByPart[2] || 0, max: 5, section: 'listening' },
    { name: 'Listening 3', score: partResults.listeningByPart[3] || 0, max: 5, section: 'listening' },
    { name: 'Listening 4', score: partResults.listeningByPart[4] || 0, max: 5, section: 'listening' },
    { name: 'Reading 1', score: partResults.readingByPart[1] || 0, max: 10, section: 'reading' },
    { name: 'Reading 2', score: partResults.readingByPart[2] || 0, max: 10, section: 'reading' },
    { name: 'Reading 3', score: partResults.readingByPart[3] || 0, max: 10, section: 'reading' },
    { name: 'Reading 4', score: partResults.readingByPart[4] || 0, max: 10, section: 'reading' },
  ];

  const weakest = allParts.reduce((a, b) => (a.score / a.max < b.score / b.max) ? a : b);
  const strongest = allParts.reduce((a, b) => (a.score / a.max > b.score / b.max) ? a : b);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-4xl font-black text-slate-900">Test Results</h1>
          <p className="text-lg text-slate-600 mt-2">
            HUFLIT Proficiency Assessment - Score Report
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <StepIndicator currentMode="results" listeningComplete={true} />
        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Completion Message */}
        <div className="bg-white rounded-lg border-2 border-emerald-200 bg-emerald-50 p-8 text-center mb-8">
          <Trophy className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-emerald-900 mb-2">Test Complete!</h2>
          <p className="text-emerald-800">
            Your test has been successfully submitted and graded.
          </p>
        </div>

        {/* Main Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Overall Score */}
          <div className="lg:col-span-1">
            <ScoreDisplay results={results} />
          </div>

          {/* Section Breakdown */}
          <div className="lg:col-span-2">
            <BreakdownChart results={results} />
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Your Strengths
            </h3>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm font-semibold text-emerald-900 mb-2">
                🎯 {strongest.name}
              </p>
              <p className="text-xs text-emerald-800">
                Excellent performance: {strongest.score}/{strongest.max} correct
              </p>
              <div className="mt-2 w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all"
                  style={{ width: `${(strongest.score / strongest.max) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Areas for Improvement
            </h3>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-semibold text-orange-900 mb-2">
                📚 {weakest.name}
              </p>
              <p className="text-xs text-orange-800">
                Focus on: {weakest.score}/{weakest.max} correct - Practice more in this area
              </p>
              <div className="mt-2 w-full h-2 bg-orange-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-600 transition-all"
                  style={{ width: `${(weakest.score / weakest.max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Part-by-Part Results */}
        <PartResults partResults={partResults} />

        {/* Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg text-blue-900 mb-4">📝 Recommendations</h3>
          <ul className="space-y-2 text-sm text-blue-900">
            {results.averageScore >= 75 ? (
              <>
                <li>✅ Excellent proficiency level! You're ready for advanced English tasks.</li>
                <li>✅ Focus on maintaining your skills and expanding vocabulary in specialized areas.</li>
              </>
            ) : results.averageScore >= 50 ? (
              <>
                <li>✅ Good progress! Continue practicing to improve your overall proficiency.</li>
                <li>✅ Focus especially on {weakest.name.toLowerCase()} - this is your growth area.</li>
                <li>✅ Try to take more practice tests to reinforce your learning.</li>
              </>
            ) : (
              <>
                <li>✅ Keep practicing! Regular exposure to English will help you improve.</li>
                <li>✅ Consider focused study on {weakest.name.toLowerCase()}.</li>
                <li>✅ Take practice tests regularly to track your progress.</li>
              </>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onRetry}
            className="flex-1 py-4 rounded-lg font-bold text-white transition-all duration-200 flex items-center justify-center gap-2"
            style={{ backgroundColor: COLORS.blue }}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Take Test Again</span>
          </button>
          <button
            onClick={onExit}
            className="flex-1 py-4 rounded-lg font-bold text-slate-900 bg-slate-200 border border-slate-300 transition-all duration-200 flex items-center justify-center gap-2 hover:bg-slate-300"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
});

ResultsScreen.displayName = 'ResultsScreen';
export default ResultsScreen;