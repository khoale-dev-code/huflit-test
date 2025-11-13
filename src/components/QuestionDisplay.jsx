import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Save, History, CheckCircle, AlertCircle, Volume2, Check } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useUnifiedAuth } from '../hooks/useUnifiedAuth';

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
  // ============================================
  // AUTH HOOKS - Support both Clerk & Firebase
  // ============================================
  const { user: clerkUser, isSignedIn: isClerkSignedIn } = useUser();
  const { user: firebaseUser, authProvider, isSignedIn } = useUnifiedAuth();
  
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });

  // ============================================
  // MEMOIZED CALCULATIONS
  // ============================================
  const answersCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  const score = useMemo(() => {
    if (!partData?.questions) return { correct: 0, total: 0, percentage: 0 };
    
    let correct = 0;
    partData.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    
    const total = partData.questions.length;
    const percentage = total > 0 ? (correct / total) * 100 : 0;
    return { correct, total, percentage };
  }, [answers, partData?.questions]);

  const progressPercentage = useMemo(() => {
    const total = partData?.questions?.length || 0;
    return total > 0 ? (answersCount / total) * 100 : 0;
  }, [answersCount, partData?.questions?.length]);

  const isAllAnswered = useMemo(() => {
    const total = partData?.questions?.length || 0;
    return answersCount === total && total > 0;
  }, [answersCount, partData?.questions?.length]);

  // ============================================
  // GET USER IDENTIFIER - Support both Clerk & Firebase
  // ============================================
  const getUserIdentifier = useCallback(() => {
    if (authProvider === 'clerk' && clerkUser) {
      return {
        clerkId: clerkUser.id,
        firebaseUid: null,
        provider: 'clerk',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        displayName: clerkUser.fullName || clerkUser.firstName || 'Unknown'
      };
    } else if (authProvider === 'firebase' && firebaseUser) {
      return {
        clerkId: null,
        firebaseUid: firebaseUser.uid,
        provider: 'firebase',
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Unknown'
      };
    }
    return null;
  }, [authProvider, clerkUser, firebaseUser]);

  // ============================================
  // SUBMIT WITH FIREBASE SAVE - Updated for both providers
  // ============================================
  const handleSubmitWithSave = useCallback(async () => {
    try {
      onSubmit();

      if (!isSignedIn) {
        setSubmitStatus({
          show: true,
          success: false,
          message: '⚠️ Vui lòng đăng nhập để lưu kết quả'
        });

        setTimeout(() => {
          setSubmitStatus({ show: false, success: false, message: '' });
        }, 5000);
        return;
      }

      const userIdentifier = getUserIdentifier();
      
      if (!userIdentifier) {
        setSubmitStatus({
          show: true,
          success: false,
          message: '❌ Không thể xác định người dùng'
        });
        setTimeout(() => {
          setSubmitStatus({ show: false, success: false, message: '' });
        }, 5000);
        return;
      }

      setSubmitStatus({
        show: true,
        success: false,
        message: '⏳ Đang lưu kết quả...'
      });

      console.log('💾 Saving to Firebase:', {
        provider: userIdentifier.provider,
        clerkId: userIdentifier.clerkId,
        firebaseUid: userIdentifier.firebaseUid,
        exam: selectedExam,
        part: selectedPart,
        score: score.percentage,
        totalQuestions: score.total,
        correctAnswers: score.correct
      });

      // ✅ FIX: Build data object with ONLY non-undefined/non-null fields
      const dataToSave = {
        // User Identification - ONLY add fields that have actual values
        provider: userIdentifier.provider,
        email: userIdentifier.email || '',
        displayName: userIdentifier.displayName || 'Anonymous',
        
        // Test Data
        exam: selectedExam,
        part: selectedPart,
        score: score.percentage,
        answers: answers,
        totalQuestions: score.total,
        correctAnswers: score.correct,
        
        // Status
        isDraft: false,
        testType: testType,
        
        // Timestamps
        createdAt: serverTimestamp(),
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // ✅ FIX: Only add clerkId if it has a value
      if (userIdentifier.clerkId) {
        dataToSave.clerkId = userIdentifier.clerkId;
      }
      
      // ✅ FIX: Only add firebaseUid if it has a value
      if (userIdentifier.firebaseUid) {
        dataToSave.firebaseUid = userIdentifier.firebaseUid;
      }

      // ✅ SAFETY CHECK: Remove any undefined fields
      for (const key in dataToSave) {
        if (dataToSave[key] === undefined) {
          console.warn(`⚠️ Removing undefined field: ${key}`);
          delete dataToSave[key];
        }
      }

      console.log('📋 Final data to save:', dataToSave);

      const docRef = await addDoc(collection(db, 'userProgress'), dataToSave);

      console.log('✅ Saved successfully with ID:', docRef.id);

      setSubmitStatus({
        show: true,
        success: true,
        message: `✅ Đã lưu kết quả! Điểm: ${score.percentage.toFixed(1)}% (${score.correct}/${score.total} câu đúng)`
      });

      setTimeout(() => {
        setSubmitStatus({ show: false, success: false, message: '' });
      }, 5000);
    } catch (error) {
      console.error('❌ Error saving results:', error);
      
      setSubmitStatus({
        show: true,
        success: false,
        message: `❌ Lỗi khi lưu: ${error.message}`
      });

      setTimeout(() => {
        setSubmitStatus({ show: false, success: false, message: '' });
      }, 5000);
    }
  }, [isSignedIn, getUserIdentifier, onSubmit, selectedExam, selectedPart, score, answers, testType]);

  if (!partData || showResults || !partData.questions) return null;

  // ============================================
  // RENDER: Shared Script Section
  // ============================================
  const renderSharedScript = () => {
    return null;
  };

  // ============================================
  // RENDER: Question Navigation (Part 1 Listening)
  // ============================================
  const renderNavigation = () => {
    if (selectedPart !== 'part1' || testType !== 'listening') return null;

    return (
      <div className="mb-6 p-3 sm:p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl shadow-lg border-2 border-orange-400">
        <div className="flex items-center justify-between mb-4 gap-2 pb-3 border-b-2 border-orange-300 flex-wrap">
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-orange-700">📍 Chọn câu</h3>
            <span className="text-xs font-bold bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full">
              {currentQuestionIndex + 1}/{partData.questions.length}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-gray-700 font-semibold">
            ✅ <span className="text-orange-600 font-black">{answersCount}</span> / {partData.questions.length}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {partData.questions.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = currentQuestionIndex === index;

            return (
              <button
                key={q.id}
                onClick={() => onQuestionChange(index)}
                title={isAnswered ? 'Đã trả lời' : 'Chưa trả lời'}
                className={`
                  px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 transform flex items-center justify-center gap-1
                  ${isCurrent
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105 ring-2 ring-orange-300'
                    : isAnswered
                    ? 'bg-green-400 text-white hover:bg-green-500 shadow-md hover:shadow-lg'
                    : 'bg-yellow-200 text-gray-800 hover:bg-yellow-300 hover:shadow-md'
                  }
                `}
              >
                {isAnswered && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                <span>Q{q.id}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER: Question Navigation Arrows
  // ============================================
  const renderQuestionArrows = () => {
    if (selectedPart !== 'part1' || testType !== 'listening') return null;
    if (!partData.questions || partData.questions.length === 0) return null;

    const handlePrevious = () => onQuestionChange(Math.max(0, currentQuestionIndex - 1));
    const handleNext = () => onQuestionChange(Math.min(partData.questions.length - 1, currentQuestionIndex + 1));

    return (
      <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all text-sm sm:text-base active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Câu trước</span>
        </button>

        <span className="text-center font-bold text-gray-700 text-sm sm:text-base">
          Câu <span className="text-orange-600 text-lg sm:text-xl">{currentQuestionIndex + 1}</span> / {partData.questions.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === partData.questions.length - 1}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all text-sm sm:text-base active:scale-95"
        >
          <span className="hidden sm:inline">Câu sau</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    );
  };

  // ============================================
  // RENDER: Questions
  // ============================================
  const renderQuestions = () => {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-2xl border-2 border-orange-200">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b-4 border-orange-400 flex-wrap gap-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-orange-700">❓ Câu hỏi</h2>
          <span className={`text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full flex-shrink-0 ${
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
                className="p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg border-2 border-yellow-300 hover:shadow-xl transition-all duration-300"
              >
                {q.script && (
                  <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">🎧 Script:</p>
                    <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{q.script}</p>
                  </div>
                )}

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3 sm:pl-4 leading-relaxed">
                  <span className="text-orange-600">Câu {q.id}:</span> {q.question}
                </h3>

                <div className="space-y-2 sm:space-y-3 mb-4">
                  {q.options?.map((option, optIndex) => {
                    const isSelected = answers[q.id] === optIndex;
                    const optionLabel = String.fromCharCode(65 + optIndex);

                    return (
                      <label
                        key={optIndex}
                        className={`
                          flex items-start p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                          ${isSelected
                            ? 'bg-gradient-to-r from-yellow-300 to-yellow-200 border-orange-500 shadow-lg'
                            : 'bg-white border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                          }
                        `}
                      >
                        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                          <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 transition-all
                            ${isSelected
                              ? 'bg-orange-500 border-orange-600 text-white'
                              : 'border-gray-400 text-gray-600'
                            }
                          `}>
                            {isSelected ? <Check className="w-3.5 h-3.5" /> : optionLabel}
                          </div>
                          <span className="text-sm sm:text-base text-gray-800 break-words">{option}</span>
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

                {answers[q.id] !== undefined && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-green-700 bg-green-50 p-2 sm:p-3 rounded-lg font-semibold">
                    <Save className="w-4 h-4 flex-shrink-0" />
                    <span>Đã lưu lựa chọn</span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER: Submit Button & Progress
  // ============================================
  const renderSubmitButton = () => {
    const totalQuestions = partData?.questions?.length || 0;

    return (
      <div className="mt-6 sm:mt-8 space-y-4">
        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden shadow-md">
          <div
            className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Status Text */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold gap-2">
          <span className="text-gray-700">
            ✅ <span className="text-orange-600 font-black">{answersCount}</span> / {totalQuestions} câu
          </span>
          {isAllAnswered ? (
            <span className="text-green-600 font-bold">✓ Đã trả lời hết</span>
          ) : (
            <span className="text-orange-600">⚠️ Còn {totalQuestions - answersCount} câu</span>
          )}
        </div>

        {/* Save Status Notification */}
        {submitStatus.show && (
          <div className={`p-3 sm:p-4 rounded-xl border-2 flex items-center gap-2 sm:gap-3 transition-all animate-slideDown ${
            submitStatus.success 
              ? 'bg-green-50 border-green-300' 
              : submitStatus.message.includes('Đang')
              ? 'bg-blue-50 border-blue-300'
              : 'bg-orange-50 border-orange-300'
          }`}>
            {submitStatus.success ? (
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" />
            )}
            <span className={`text-xs sm:text-sm font-bold ${
              submitStatus.success ? 'text-green-800' : 'text-orange-800'
            }`}>
              {submitStatus.message}
            </span>
          </div>
        )}

        {/* Sign In Reminder */}
        {!isSignedIn && (
          <div className="p-3 sm:p-4 bg-red-50 border-2 border-red-300 rounded-xl">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-red-800 mb-1">
                  🔑 Vui lòng đăng nhập để lưu kết quả
                </p>
                <p className="text-xs text-red-700">
                  Kết quả sẽ được lưu vào Profile của bạn
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Auth Provider Info */}
        {isSignedIn && (
          <div className="p-3 sm:p-4 bg-green-50 border-2 border-green-300 rounded-xl">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-green-800">
                ✅ Đã đăng nhập ({authProvider === 'clerk' ? '🔐 Clerk' : '🔥 Firebase'}) - Kết quả sẽ được lưu
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmitWithSave}
          disabled={!isAllAnswered}
          className={`
            w-full py-3 sm:py-4 px-4 sm:px-6 font-bold rounded-xl transition-all duration-300 transform
            flex items-center justify-center gap-2 text-base sm:text-lg
            ${isAllAnswered
              ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-60'
            }
          `}
        >
          <span>📝</span>
          <span>{isSignedIn ? 'Nộp bài & Lưu kết quả' : 'Nộp bài'}</span>
          {isAllAnswered && <span className="text-xs sm:text-sm">({totalQuestions} câu)</span>}
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
  // MAIN RENDER
  // ============================================
  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto my-6 sm:my-8 p-3 sm:p-4">
      {renderSharedScript()}
      {renderNavigation()}
      {renderQuestionArrows()}
      {renderQuestions()}
      {renderSubmitButton()}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slideDown {
              animation: slideDown 0.3s ease-out forwards;
            }
          `,
        }}
      />
    </div>
  );
};

export default QuestionDisplay;