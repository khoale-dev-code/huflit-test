import React, { useMemo } from 'react';
import { Save, Check } from 'lucide-react';

const FullExamQuestions = ({ 
  partData, 
  answers, 
  onAnswerSelect,
  currentSection,
  currentPart
}) => {
  // Calculate progress
  const answeredCount = useMemo(() => {
    if (!partData?.questions) return 0;
    return partData.questions.filter(q => {
      const key = `${currentSection}-part${currentPart}-q${q.id || partData.questions.indexOf(q) + 1}`;
      return answers[key] !== undefined;
    }).length;
  }, [partData, answers, currentSection, currentPart]);

  const totalQuestions = partData?.questions?.length || 0;
  const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  if (!partData || !partData.questions || partData.questions.length === 0) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-gray-200 text-center">
        <p className="text-gray-500 text-lg">⚠️ Không có câu hỏi cho part này</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-amber-300 p-4 sticky top-44 z-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            {currentSection === 'listening' ? '🎧' : '📖'} Part {currentPart}
          </h2>
          <span className="text-sm font-bold text-gray-700">
            ✅ {answeredCount}/{totalQuestions} câu
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-yellow-500 h-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Part Description */}
      {partData.description && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
          <p className="text-sm text-gray-700 italic">📖 {partData.description}</p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {partData.questions.map((question, qIndex) => {
          const questionNum = qIndex + 1;
          const key = `${currentSection}-part${currentPart}-q${questionNum}`;
          const selectedAnswer = answers[key];
          const isAnswered = selectedAnswer !== undefined;

          return (
            <div
              key={key}
              className="p-5 bg-white rounded-xl shadow-lg border-2 border-amber-200 hover:shadow-xl transition-all"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between mb-4 gap-3">
                <h3 className="text-lg font-bold text-gray-900 flex-1 leading-relaxed">
                  <span className="text-amber-600">Câu {questionNum}:</span>{' '}
                  {question.question || question.text || 'Không có nội dung'}
                </h3>
                {isAnswered && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full whitespace-nowrap flex items-center gap-1">
                    <Check className="w-3 h-3" /> Đã chọn
                  </span>
                )}
              </div>

              {/* Individual Question Script (if exists) */}
              {question.script && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-xs font-semibold text-blue-900 mb-2">🎧 Script:</p>
                  <p className="text-sm text-gray-800 leading-relaxed">{question.script}</p>
                </div>
              )}

              {/* Answer Options */}
              <div className="space-y-2">
                {question.options?.map((option, optIndex) => {
                  const isSelected = selectedAnswer === optIndex;
                  const optionLabel = String.fromCharCode(65 + optIndex);

                  return (
                    <label
                      key={optIndex}
                      className={`
                        flex items-start p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                        ${isSelected
                          ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-500 shadow-md'
                          : 'bg-gray-50 border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Option Letter/Check */}
                        <div
                          className={`
                            w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all
                            ${isSelected
                              ? 'bg-amber-500 border-amber-600 text-white'
                              : 'border-gray-400 text-gray-600'
                            }
                          `}
                        >
                          {isSelected ? <Check className="w-4 h-4" /> : optionLabel}
                        </div>

                        {/* Option Text */}
                        <span
                          className={`text-base flex-1 break-words leading-relaxed ${
                            isSelected ? 'text-gray-900 font-semibold' : 'text-gray-700'
                          }`}
                        >
                          {option}
                        </span>
                      </div>

                      {/* Hidden Radio Input */}
                      <input
                        type="radio"
                        name={key}
                        value={optIndex}
                        checked={isSelected}
                        onChange={() => onAnswerSelect(questionNum, optIndex)}
                        className="hidden"
                      />
                    </label>
                  );
                })}
              </div>

              {/* Save Indicator */}
              {isAnswered && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg font-semibold mt-3">
                  <Save className="w-4 h-4" />
                  <span>Đã lưu lựa chọn: {String.fromCharCode(65 + selectedAnswer)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Summary */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-300 p-4 sticky bottom-4 z-20">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">
            📊 Tiến độ Part {currentPart}:
          </span>
          <span className="text-lg font-black text-amber-600">
            {answeredCount}/{totalQuestions}
          </span>
        </div>
        {answeredCount === totalQuestions ? (
          <p className="text-xs text-green-600 font-semibold mt-2 text-center">
            ✅ Đã hoàn thành part này!
          </p>
        ) : (
          <p className="text-xs text-orange-600 font-semibold mt-2 text-center">
            ⚠️ Còn {totalQuestions - answeredCount} câu chưa trả lời
          </p>
        )}
      </div>
    </div>
  );
};

export default FullExamQuestions;