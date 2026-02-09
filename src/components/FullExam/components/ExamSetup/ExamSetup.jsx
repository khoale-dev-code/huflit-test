/* src/components/FullExam/components/ExamSetup/ExamSetup.jsx */

import React, { useState, memo } from 'react';
import { Play, BookOpen, Clock, Users } from 'lucide-react';
import StepIndicator from '../../StepIndicator';
import { COLORS } from '../../constants/colors';
import { EXAM_MODES } from '../../constants/examConfig';
import { EXAM_LIST } from '../../../../data/examData';

/**
 * Exam Setup Screen - User selects exam and starts
 * Shows available exams with info
 */
export const ExamSetup = memo(({ onStartExam }) => {
  const [selectedExam, setSelectedExam] = useState('exam1');
  const [isStarting, setIsStarting] = useState(false);

  const handleStartExam = async () => {
    setIsStarting(true);
    try {
      onStartExam?.(selectedExam);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            HUFLIT Proficiency Assessment
          </h1>
          <p className="text-lg text-slate-600">
            Comprehensive English Proficiency Test
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <StepIndicator currentMode="setup" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Exam Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Test Information</h2>

              <div className="space-y-6">
                {/* Listening */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.blue }}>
                      <span className="text-white font-bold">🎧</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Listening</p>
                      <p className="text-sm text-slate-600">30 minutes</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    4 parts, 20 questions
                  </p>
                </div>

                {/* Reading */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.orange }}>
                      <span className="text-white font-bold">📖</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Reading</p>
                      <p className="text-sm text-slate-600">60 minutes</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    4 parts, 40 questions
                  </p>
                </div>

                {/* Total */}
                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-600" />
                    <div>
                      <p className="text-sm text-slate-600">Total Time</p>
                      <p className="font-bold text-slate-900">1 hour 30 minutes</p>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Once you start, you cannot go back to previous listening parts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main - Exam Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Select an Exam to Begin
              </h2>

              <div className="space-y-4 mb-8">
                {EXAM_LIST && EXAM_LIST.length > 0 ? (
                  EXAM_LIST.map((exam) => (
                    <label
                      key={exam.id}
                      className={`
                        flex items-start p-6 rounded-lg border-2 cursor-pointer
                        transition-all duration-200
                        ${selectedExam === exam.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="exam"
                        value={exam.id}
                        checked={selectedExam === exam.id}
                        onChange={(e) => setSelectedExam(e.target.value)}
                        className="w-5 h-5 mt-1 cursor-pointer"
                        style={{ accentColor: COLORS.blue }}
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-slate-900">
                            {exam.title || `Exam ${exam.id}`}
                          </h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded-full">
                            NEW
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">
                          {exam.description || 'A complete proficiency assessment covering all skill areas'}
                        </p>
                        <div className="flex gap-6 text-xs text-slate-600">
                          <span>📋 {exam.questions || 60} questions</span>
                          <span>⏱️ {exam.duration || 90} minutes</span>
                          {exam.difficulty && <span>📊 {exam.difficulty} level</span>}
                        </div>
                      </div>
                    </label>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">No exams available</p>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                <h4 className="font-bold text-amber-900 mb-3">Before You Start:</h4>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li>✓ Make sure you have a quiet environment</li>
                  <li>✓ Ensure your internet connection is stable</li>
                  <li>✓ You can save and resume your test (auto-saved)</li>
                  <li>✓ Use arrow keys (← →) to navigate parts</li>
                  <li>✓ Use number keys (1-4) to select answers</li>
                </ul>
              </div>

              {/* Start Button */}
              <div className="flex gap-4">
                <button
                  onClick={handleStartExam}
                  disabled={isStarting || !selectedExam}
                  className="flex-1 py-4 rounded-lg font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: isStarting ? '#ccc' : COLORS.blue }}
                >
                  {isStarting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Starting...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Start Test</span>
                    </>
                  )}
                </button>
              </div>

              {/* Footer Note */}
              <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
                <Users className="w-4 h-4 inline mr-2" />
                <span>Trusted by thousands of English learners worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ExamSetup.displayName = 'ExamSetup';
export default ExamSetup;