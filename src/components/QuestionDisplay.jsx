import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Save, History, CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import PreviousResults from './PreviousResults';
import { usePreviousAttempts } from '../hooks/usePreviousAttempts';
import { useUserProgress } from '../hooks/useUserProgress';

const QuestionDisplay = ({
  selectedPart,
  selectedExam,
  partData,
  currentQuestionIndex,
  onQuestionChange,
  answers,
  onAnswerSelect,
  showResults,
  onSubmit,
  testType
}) => {
  const { user, isSignedIn } = useUser();
  const { saveProgress } = useUserProgress();
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [answersCount, setAnswersCount] = useState(0);
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });
  
  // Get previous attempts
  const { attempts, loading: attemptsLoading } = usePreviousAttempts(selectedExam, selectedPart);

  // Calculate progress
  useEffect(() => {
    setAnswersCount(Object.keys(answers).length);
  }, [answers]);

  // Calculate score
  const calculateScore = () => {
    if (!partData?.questions) return { correct: 0, total: 0, percentage: 0 };
    
    let correct = 0;
    partData.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    
    const total = partData.questions.length;
    const percentage = total > 0 ? (correct / total) * 100 : 0;
    return { correct, total, percentage };
  };

  // Handle submit with save to profile
  const handleSubmitWithSave = async () => {
    try {
      // First call the original onSubmit to show results
      onSubmit();

      // If user is signed in, save to Firebase
      if (isSignedIn && user) {
        const score = calculateScore();
        
        setSubmitStatus({
          show: true,
          success: false,
          message: 'Đang lưu kết quả...'
        });

        await saveProgress({
          exam: selectedExam,
          part: selectedPart,
          score: score.percentage,
          answers: answers,
          totalQuestions: score.total,
          isDraft: false, // Mark as final submission
        });

        console.log('✅ Results saved to profile:', {
          exam: selectedExam,
          part: selectedPart,
          score: score.percentage,
          correct: score.correct,
          total: score.total
        });

        setSubmitStatus({
          show: true,
          success: true,
          message: `✅ Đã lưu kết quả vào Profile! Điểm: ${score.percentage.toFixed(1)}%`
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ show: false, success: false, message: '' });
        }, 5000);
      } else {
        // Not signed in - just show results without saving
        setSubmitStatus({
          show: true,
          success: false,
          message: '⚠️ Đăng nhập để lưu kết quả vào Profile'
        });

        setTimeout(() => {
          setSubmitStatus({ show: false, success: false, message: '' });
        }, 5000);
      }
    } catch (error) {
      console.error('❌ Error saving results:', error);
      
      setSubmitStatus({
        show: true,
        success: false,
        message: '❌ Lỗi khi lưu kết quả. Vui lòng thử lại!'
      });

      setTimeout(() => {
        setSubmitStatus({ show: false, success: false, message: '' });
      }, 5000);
    }
  };

  if (!partData || showResults || !partData.questions) return null;

  // ============================================
  // Render Navigation (Part 1 only)
  // ============================================
  const renderNavigation = () => {
    if (selectedPart !== 'part1' || testType !== 'listening') return null;

    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl shadow-lg border-2 border-orange-400">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-orange-700">📍 Chọn câu hỏi (Part 1)</h3>
            <span className="text-xs font-bold bg-orange-500 text-white px-3 py-1 rounded-full">
              {currentQuestionIndex + 1}/{partData.questions.length}
            </span>
          </div>
          <div className="text-sm text-gray-700">
            ✅ <span className="font-bold">{answersCount}</span> / {partData.questions.length} đã trả lời
          </div>
        </div>

        {/* Question Navigation Buttons */}
        <div className="flex flex-wrap gap-2">
          {partData.questions.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = currentQuestionIndex === index;

            return (
              <button
                key={q.id}
                className={`
                  px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 transform
                  ${isCurrent
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105 ring-2 ring-orange-300'
                    : isAnswered
                    ? 'bg-green-400 text-white hover:bg-green-500 shadow-md'
                    : 'bg-yellow-200 text-gray-800 hover:bg-yellow-300 hover:shadow-md'
                  }
                `}
                onClick={() => onQuestionChange(index)}
                title={isAnswered ? 'Đã trả lời' : 'Chưa trả lời'}
              >
                {isAnswered ? '✓' : ''} Q{q.id}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // ============================================
  // Render Question Navigation Arrows
  // ============================================
  const renderQuestionArrows = () => {
    if (selectedPart !== 'part1' || testType !== 'listening') return null;
    if (!partData.questions || partData.questions.length === 0) return null;

    return (
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => onQuestionChange(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all"
        >
          <ChevronLeft className="w-5 h-5" /> Câu trước
        </button>

        <span className="text-center font-bold text-gray-700">
          Câu <span className="text-orange-600 text-lg">{currentQuestionIndex + 1}</span> / {partData.questions.length}
        </span>

        <button
          onClick={() => onQuestionChange(Math.min(partData.questions.length - 1, currentQuestionIndex + 1))}
          disabled={currentQuestionIndex === partData.questions.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all"
        >
          Câu sau <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  // ============================================
  // Render Questions
  // ============================================
  const renderQuestions = () => (
    <div className="p-6 bg-white rounded-xl shadow-2xl border-2 border-orange-200">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b-4 border-orange-400">
        <h2 className="text-2xl font-black text-orange-700">❓ Câu hỏi</h2>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
          testType === 'listening' 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {testType === 'listening' ? '🎧 Listening' : '📖 Reading'}
        </span>
      </div>

      <div className="space-y-6">
        {partData.questions
          .filter((_, qIndex) => 
            selectedPart === 'part1' && testType === 'listening' 
              ? qIndex === currentQuestionIndex 
              : true
          )
          .map((q) => (
            <div 
              key={q.id} 
              className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg border-2 border-yellow-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Question Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-4 leading-relaxed">
                <span className="text-orange-600">Câu {q.id}:</span> {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-4">
                {q.options.map((option, optIndex) => {
                  const isSelected = answers[q.id] === optIndex;
                  const optionLabel = String.fromCharCode(65 + optIndex); // A, B, C, D

                  return (
                    <label
                      key={optIndex}
                      className={`
                        flex items-start p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                        ${isSelected
                          ? 'bg-gradient-to-r from-yellow-300 to-yellow-200 border-orange-500 shadow-lg'
                          : 'bg-white border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-sm
                          ${isSelected
                            ? 'bg-orange-500 border-orange-600 text-white'
                            : 'border-gray-400 text-gray-600'
                          }
                        `}>
                          {isSelected ? '✓' : optionLabel}
                        </div>
                        <span className="text-base text-gray-800">{option}</span>
                      </div>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={isSelected}
                        onChange={() => onAnswerSelect(q.id, optIndex)}
                        className="hidden"
                      />
                    </label>
                  );
                })}
              </div>

              {/* Answer Status */}
              {answers[q.id] !== undefined && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                  <Save className="w-4 h-4" />
                  <span>Đã lưu lựa chọn</span>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );

  // ============================================
  // Render Submit Button
  // ============================================
  const renderSubmitButton = () => {
    const totalQuestions = partData.questions?.length || 0;
    const answeredCount = Object.keys(answers).length;
    const allAnswered = answeredCount === totalQuestions;

    return (
      <div className="mt-8 space-y-4">
        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-md">
          <div
            className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full transition-all duration-500"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Status Text */}
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="text-gray-700">
            ✅ <span className="text-orange-600">{answeredCount}</span> / {totalQuestions} câu
          </span>
          {allAnswered ? (
            <span className="text-green-600">✓ Đã trả lời hết</span>
          ) : (
            <span className="text-orange-600">⚠️ Còn {totalQuestions - answeredCount} câu</span>
          )}
        </div>

        {/* Save Status Notification */}
        {submitStatus.show && (
          <div className={`p-4 rounded-xl border-2 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            submitStatus.success 
              ? 'bg-green-50 border-green-300' 
              : submitStatus.message.includes('Đang')
              ? 'bg-blue-50 border-blue-300'
              : 'bg-orange-50 border-orange-300'
          }`}>
            {submitStatus.success ? (
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
            )}
            <span className={`text-sm font-bold ${
              submitStatus.success ? 'text-green-800' : 'text-orange-800'
            }`}>
              {submitStatus.message}
            </span>
          </div>
        )}

        {/* Sign In Reminder */}
        {!isSignedIn && (
          <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-yellow-800 mb-1">
                  💡 Đăng nhập để lưu kết quả
                </p>
                <p className="text-xs text-yellow-700">
                  Kết quả sẽ được lưu vào Profile và bạn có thể xem lại bất kỳ lúc nào
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmitWithSave}
          disabled={!allAnswered}
          className={`
            w-full py-4 px-6 font-bold rounded-xl transition-all duration-300 transform
            flex items-center justify-center gap-2 text-lg
            ${allAnswered
              ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-60'
            }
          `}
        >
          <span>📝</span>
          {isSignedIn ? 'Nộp bài & Lưu kết quả' : 'Nộp bài'}
          {allAnswered && <span className="text-sm">(Đủ {totalQuestions} câu)</span>}
        </button>

        {autoSaveStatus && (
          <div className="text-center text-xs text-green-600 font-semibold">
            💾 {autoSaveStatus}
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // Main Render
  // ============================================
  return (
    <div className="space-y-8 max-w-5xl mx-auto my-8">
      {/* Previous Results */}
      {attempts && attempts.length > 0 && !attemptsLoading && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-900">📊 Kết quả lần trước</h3>
          </div>
          <PreviousResults
            attempts={attempts}
            loading={attemptsLoading}
            selectedExam={selectedExam}
            selectedPart={selectedPart}
          />
        </div>
      )}

      {/* Navigation */}
      {renderNavigation()}

      {/* Question Navigation Arrows */}
      {renderQuestionArrows()}

      {/* Questions */}
      {renderQuestions()}

      {/* Submit */}
      {renderSubmitButton()}
    </div>
  );
};

export default QuestionDisplay;