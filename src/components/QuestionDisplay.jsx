import React, { useMemo, useEffect, useState, useCallback } from 'react';
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
  // AUTH HOOKS & STATE (Giữ nguyên logic)
  // ============================================
  const { user: clerkUser, isSignedIn: isClerkSignedIn } = useUser();
  const { user: firebaseUser, authProvider, isSignedIn } = useUnifiedAuth();
  
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });

  // ... (Giữ nguyên useMemo, useCallback, handleSubmitWithSave logic) ...

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
  // RENDER: Question Navigation (Part 1 Listening) - CẢI TIẾN
  // ============================================
  const renderNavigation = () => {
    // Chỉ hiển thị cho Part 1 Listening (vì các part khác câu hỏi thường liên tiếp)
    if (selectedPart !== 'part1' || testType !== 'listening') return null;

    return (
      <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-2xl shadow-xl border-4 border-amber-400/70">
        <div className="flex items-center justify-between mb-4 gap-2 pb-3 border-b-2 border-amber-300 flex-wrap">
          <div className="flex items-center gap-3">
            <History className='w-5 h-5 text-amber-600' />
            <h3 className="text-base sm:text-lg font-bold text-amber-800">Điều hướng câu hỏi</h3>
          </div>
          <div className="text-sm text-gray-700 font-semibold bg-amber-200 px-3 py-1 rounded-full">
            Tiến độ: <span className="text-amber-700 font-black">{answersCount}</span> / {partData.questions.length}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {partData.questions.map((q, index) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = currentQuestionIndex === index;

            return (
              <button
                key={q.id}
                onClick={() => onQuestionChange(index)}
                title={isAnswered ? 'Đã trả lời' : 'Chưa trả lời'}
                className={`
                  px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 transform flex items-center justify-center gap-1
                  ${isCurrent
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg scale-105 ring-4 ring-orange-300/50'
                    : isAnswered
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-md'
                    : 'bg-white text-gray-800 hover:bg-amber-100 border border-gray-300'
                  }
                `}
              >
                {isAnswered ? <Check className="w-4 h-4" /> : null}
                <span>Câu {index + 1}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER: Question Navigation Arrows - CẢI TIẾN
  // ============================================
  const renderQuestionArrows = () => {
    if (selectedPart !== 'part1' || testType !== 'listening') return null;
    if (!partData.questions || partData.questions.length === 0) return null;

    const handlePrevious = () => onQuestionChange(Math.max(0, currentQuestionIndex - 1));
    const handleNext = () => onQuestionChange(Math.min(partData.questions.length - 1, currentQuestionIndex + 1));

    return (
      <div className="flex items-center justify-between mb-6 gap-2 p-3 bg-white rounded-xl shadow-lg border border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-1 sm:gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all text-sm sm:text-base text-amber-800 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Câu trước</span>
        </button>

        <span className="text-center font-bold text-gray-700 text-sm sm:text-lg">
          <span className="text-orange-600 text-xl sm:text-2xl">{currentQuestionIndex + 1}</span> / {partData.questions.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === partData.questions.length - 1}
          className="flex items-center gap-1 sm:gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all text-sm sm:text-base text-amber-800 active:scale-95"
        >
          <span className="hidden sm:inline">Câu sau</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  // ============================================
  // RENDER: Questions - CẢI TIẾN
  // ============================================
  const renderQuestions = () => {
    return (
      <div className="p-4 sm:p-8 bg-white rounded-3xl shadow-2xl border-4 border-amber-300/50">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-orange-500/80 flex-wrap gap-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            ❓ <span className="text-orange-600">Nội dung</span> Câu hỏi
          </h2>
          <span className={`text-sm font-bold px-3 py-1.5 rounded-full flex-shrink-0 shadow-md ${
            testType === 'listening' 
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
              : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
          }`}>
            {testType === 'listening' ? '🎧 Kỹ năng Nghe' : '📖 Kỹ năng Đọc'}
          </span>
        </div>

        <div className="space-y-8">
          {partData.questions
            .filter((_, qIndex) => 
              selectedPart === 'part1' && testType === 'listening' 
                ? qIndex === currentQuestionIndex 
                : true
            )
            .map((q) => (
              <div 
                key={q.id} 
                className="p-5 sm:p-6 bg-amber-50 rounded-2xl shadow-xl border-2 border-yellow-400 hover:border-orange-500 transition-all duration-300"
              >
                {/* Script Box */}
                {q.script && (
                  <div className="mb-5 p-4 sm:p-5 bg-indigo-50 rounded-xl border-l-4 border-indigo-500 shadow-inner">
                    <p className="text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2">
                      <Volume2 className='w-4 h-4' /> Script (Chỉ hiển thị khi cần):
                    </p>
                    <p className="text-base text-gray-800 leading-relaxed italic">{q.script}</p>
                  </div>
                )}

                {/* Question Text */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 border-l-8 border-orange-500 pl-4 sm:pl-5 leading-snug">
                  <span className="text-orange-600">Câu {q.id}:</span> {q.question}
                </h3>

                {/* Options */}
                <div className="space-y-3 sm:space-y-4 mb-4">
                  {q.options?.map((option, optIndex) => {
                    const isSelected = answers[q.id] === optIndex;
                    const optionLabel = String.fromCharCode(65 + optIndex);

                    return (
                      <label
                        key={optIndex}
                        className={`
                          flex items-start p-4 sm:p-5 rounded-xl cursor-pointer transition-all duration-200 border-2
                          ${isSelected
                            ? 'bg-gradient-to-r from-amber-300 to-yellow-300 border-orange-600 shadow-xl'
                            : 'bg-white border-gray-300 hover:border-orange-400 hover:bg-yellow-50 shadow-md'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className={`
                            w-7 h-7 rounded-full border-2 flex items-center justify-center font-extrabold text-sm flex-shrink-0 transition-all mt-0.5
                            ${isSelected
                              ? 'bg-orange-600 border-orange-700 text-white'
                              : 'border-gray-400 text-gray-600 bg-gray-100'
                            }
                          `}>
                            {isSelected ? <Check className="w-4 h-4" /> : optionLabel}
                          </div>
                          <span className="text-base text-gray-800 break-words pt-0.5">{option}</span>
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

                {/* Answer Saved Info */}
                {answers[q.id] !== undefined && (
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 p-3 rounded-xl font-bold border-2 border-green-300">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                    <span>Đã chọn đáp án: <span className="text-green-800">({String.fromCharCode(65 + answers[q.id])})</span>. Lựa chọn đã được tự động lưu.</span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER: Submit Button & Progress - CẢI TIẾN
  // ============================================
  const renderSubmitButton = () => {
    const totalQuestions = partData?.questions?.length || 0;

    return (
      <div className="mt-8 sm:mt-10 p-5 bg-white rounded-3xl shadow-2xl border-4 border-gray-100 space-y-5">
        
        <h3 className='text-xl font-bold text-gray-800 border-b pb-3 mb-2'>Tiến độ làm bài</h3>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-500 shadow-lg"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Status Text */}
        <div className="flex items-center justify-between text-sm sm:text-base font-bold gap-2">
          <span className="text-gray-700">
            Đã trả lời: <span className="text-orange-600 text-lg">{answersCount}</span> / {totalQuestions} câu
          </span>
          {isAllAnswered ? (
            <span className="text-green-600 font-extrabold flex items-center gap-1">
              <CheckCircle className='w-4 h-4' /> Hoàn thành
            </span>
          ) : (
            <span className="text-red-500 flex items-center gap-1">
              <AlertCircle className='w-4 h-4' /> Còn {totalQuestions - answersCount} câu
            </span>
          )}
        </div>

        {/* Save Status Notification */}
        {submitStatus.show && (
          <div className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all animate-slideDown ${
            submitStatus.success 
              ? 'bg-green-100 border-green-400' 
              : submitStatus.message.includes('Đang')
              ? 'bg-amber-100 border-amber-400'
              : 'bg-red-100 border-red-400'
          }`}>
            {submitStatus.success ? (
              <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-700 flex-shrink-0" />
            )}
            <span className={`text-sm font-bold ${
              submitStatus.success ? 'text-green-800' : 'text-red-800'
            }`}>
              {submitStatus.message}
            </span>
          </div>
        )}

        {/* Sign In Reminder & Auth Provider Info */}
        {!isSignedIn ? (
          <div className="p-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl shadow-md">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-yellow-800 mb-1">
                  🔑 Đăng nhập để lưu kết quả
                </p>
                <p className="text-xs text-yellow-700">
                  Kết quả sẽ không được lưu vào Profile nếu bạn không đăng nhập.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-green-50 border-2 border-green-300 rounded-xl shadow-md">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm font-bold text-green-800">
                ✅ Đã đăng nhập ({authProvider === 'clerk' ? '🔐 Clerk' : '🔥 Firebase'}) - Kết quả sẽ được lưu.
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmitWithSave}
          disabled={!isAllAnswered}
          className={`
            w-full py-4 px-6 font-extrabold rounded-xl transition-all duration-300 transform
            flex items-center justify-center gap-3 text-lg sm:text-xl
            ${isAllAnswered
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 shadow-2xl shadow-orange-400/70 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-70 shadow-md'
            }
          `}
        >
          <Save className='w-6 h-6' />
          <span>{isSignedIn ? 'NỘP BÀI & LƯU KẾT QUẢ' : 'NỘP BÀI'}</span>
          {isAllAnswered && <span className="text-sm font-medium">({totalQuestions} câu)</span>}
        </button>
      </div>
    );
  };

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="relative min-h-screen"> 
      
      {/* Blob Background (Tạo sự thú vị) */}
      <style>{`
        @keyframes blob-animate {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0, 0) scale(1); }
          50% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; transform: translate(-20px, 20px) scale(1.05); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1: Yellow */}
        <div className="absolute top-[-5rem] left-[-5rem] w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl opacity-60" style={{ animation: 'blob-animate 12s infinite ease-in-out' }} />
        {/* Blob 2: Orange */}
        <div className="absolute bottom-[-8rem] right-[-8rem] w-96 h-96 bg-orange-300/30 rounded-full blur-3xl opacity-60" style={{ animation: 'blob-animate 16s infinite reverse ease-in-out' }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto my-6 sm:my-10 p-4">
        {renderSharedScript()}
        {renderNavigation()}
        {renderQuestionArrows()}
        {renderQuestions()}
        {renderSubmitButton()}
      </div>

      {/* Animation CSS for submit status */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
          `,
        }}
      />
    </div>
  );
};

export default QuestionDisplay;