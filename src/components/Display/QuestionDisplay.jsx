import React, { useMemo, useCallback, useState } from 'react';
import { Save, CheckCircle, AlertCircle, Volume2, Check } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';

// ========================================
// SUB-COMPONENT: Progress Bar
// ========================================
const ProgressBar = ({ percentage }) => (
  <div className="bg-gray-200 rounded-lg h-2.5 overflow-hidden shadow-inner">
    <div
      className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 h-full transition-all duration-500 ease-out"
      style={{ width: `${percentage}%` }}
    />
  </div>
);

// ========================================
// SUB-COMPONENT: Status Badge
// ========================================
const StatusBadge = ({ answersCount, totalQuestions }) => {
  const isAllAnswered = answersCount === totalQuestions && totalQuestions > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm font-medium">
      {/* Left side: Progress count */}
      <span className="text-gray-700">
        Đã trả lời: <span className="text-orange-600 font-bold">{answersCount}</span> / {totalQuestions}
      </span>
      
      {/* Right side: Status indicator */}
      {isAllAnswered ? (
        <span className="text-green-600 font-medium flex items-center gap-1 text-xs">
          <CheckCircle className="w-3.5 h-3.5" /> Hoàn thành
        </span>
      ) : (
        <span className="text-red-500 text-xs flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> Còn {totalQuestions - answersCount} câu
        </span>
      )}
    </div>
  );
};

// ========================================
// SUB-COMPONENT: Auth Notice
// ========================================
const AuthNotice = ({ isSignedIn, authProvider }) => (
  <div className={`p-2.5 sm:p-3 border rounded-lg text-xs sm:text-sm transition-all ${
    isSignedIn
      ? 'bg-green-50 border-green-300'
      : 'bg-yellow-50 border-yellow-300'
  }`}>
    <div className="flex items-start gap-2">
      {/* Icon */}
      {isSignedIn ? (
        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
      )}
      
      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${
          isSignedIn ? 'text-green-800' : 'text-yellow-800'
        }`}>
          {isSignedIn
            ? `✅ Đã đăng nhập qua ${authProvider === 'clerk' ? 'Clerk' : 'Firebase'}`
            : '🔑 Đăng nhập để lưu kết quả'
          }
        </p>
        {!isSignedIn && (
          <p className="text-xs text-yellow-700 mt-1">
            Kết quả sẽ không được lưu nếu bạn không đăng nhập.
          </p>
        )}
      </div>
    </div>
  </div>
);

// ========================================
// SUB-COMPONENT: Submit Status Notification
// ========================================
const SubmitStatusNotification = ({ status }) => {
  if (!status.show) return null;

  const isSuccess = status.success;
  const isLoading = status.message.includes('Đang');

  return (
    <div className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs sm:text-sm animate-in fade-in duration-200 ${
      isSuccess
        ? 'bg-green-50 border-green-300'
        : isLoading
        ? 'bg-amber-50 border-amber-300'
        : 'bg-red-50 border-red-300'
    }`}>
      {/* Icon */}
      {isSuccess || isLoading ? (
        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
      )}
      
      {/* Message */}
      <span className={`font-medium ${
        isSuccess ? 'text-green-800' : isLoading ? 'text-amber-800' : 'text-red-800'
      }`}>
        {status.message}
      </span>
    </div>
  );
};

// ========================================
// SUB-COMPONENT: Question Option (Single Choice)
// ========================================
const QuestionOption = ({ option, index, isSelected, onSelect, questionId }) => {
  const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

  return (
    <label 
      htmlFor={`q${questionId}-opt${index}`}
      className={`
        group relative flex items-start p-2.5 sm:p-3 rounded-lg cursor-pointer 
        transition-all duration-200 border text-sm
        ${isSelected
          ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-400 shadow-sm'
          : 'bg-white border-gray-300 hover:border-orange-300 hover:bg-orange-50/50'
        }
      `}
    >
      <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
        {/* Radio Circle */}
        <div className={`
          relative w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 
          flex items-center justify-center font-semibold text-xs flex-shrink-0 
          transition-all
          ${isSelected
            ? 'bg-orange-500 border-orange-600 text-white shadow-sm'
            : 'border-gray-400 text-gray-600 bg-white group-hover:border-orange-400 group-hover:bg-orange-50'
          }
        `}>
          {isSelected ? (
            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
          ) : (
            <span className="text-xs">{optionLabel}</span>
          )}
        </div>

        {/* Option Text */}
        <div className="flex-1 min-w-0 pt-0.5">
          <span className={`
            text-sm sm:text-[15px] leading-relaxed break-words block
            ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}
          `}>
            {option}
          </span>
          
          {/* Selected Badge */}
          {isSelected && (
            <div className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
              <Check className="w-2.5 h-2.5" />
              <span>Đã chọn</span>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Radio Input */}
      <input
        type="radio"
        id={`q${questionId}-opt${index}`}
        name={`question-${questionId}`}
        checked={isSelected}
        onChange={onSelect}
        className="sr-only"
      />
    </label>
  );
};

// ========================================
// SUB-COMPONENT: Question Card
// ========================================
const QuestionCard = ({ 
  question, 
  script, 
  options, 
  isAnswered, 
  selectedAnswer, 
  onAnswerSelect 
}) => {
  return (
    <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      
      {/* Script Section (if exists) */}
      {script && (
        <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <p className="text-xs sm:text-sm font-medium text-blue-800 mb-1.5 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Script:
          </p>
          <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed italic">
            {script}
          </p>
        </div>
      )}

      {/* Question Header */}
      <div className="mb-3 sm:mb-4">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-sm sm:text-base font-semibold text-gray-900 border-l-4 border-orange-500 pl-2.5 sm:pl-3 leading-snug">
            <span className="text-orange-600 font-bold">Câu {question.id}:</span>{' '}
            {question.question}
          </h3>
          
          {/* Answered Badge */}
          {isAnswered && (
            <div className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200 whitespace-nowrap">
              <CheckCircle className="w-3 h-3" />
              <span className="hidden sm:inline">Đã trả lời</span>
            </div>
          )}
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-2 sm:space-y-2.5">
        {options?.map((option, index) => (
          <QuestionOption
            key={`${question.id}-${index}`}
            questionId={question.id}
            option={option}
            index={index}
            isSelected={selectedAnswer === index}
            onSelect={() => onAnswerSelect(question.id, index)}
          />
        ))}
      </div>

      {/* Selected Answer Summary */}
      {isAnswered && selectedAnswer !== undefined && (
        <div className="mt-3 sm:mt-3.5 pt-3 sm:pt-3.5 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-gray-600 font-medium">Lựa chọn của bạn:</span>
            <span className="font-semibold text-orange-600 break-all">
              ({String.fromCharCode(65 + selectedAnswer)}) {options[selectedAnswer]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// MAIN COMPONENT: QuestionDisplay
// ========================================
const QuestionDisplay = ({
  selectedPart,
  selectedExam,
  partData,
  answers,
  onAnswerSelect,
  showResults,
  onSubmit,
  testType
}) => {
  // ===== HOOKS =====
  const { user: clerkUser } = useUser();
  const { user: firebaseUser, authProvider, isSignedIn } = useUnifiedAuth();
  const [submitStatus, setSubmitStatus] = useState({ 
    show: false, 
    success: false, 
    message: '' 
  });

  // ===== CHECK IF SPLIT LAYOUT PART (6, 7, 8) =====
  const isSplitLayoutPart = testType === 'reading' && 
    (selectedPart === 'part6' || selectedPart === 'part7' || selectedPart === 'part8');

  // ===== COMPUTED VALUES =====
  
  // Đếm số câu đã trả lời
  const answersCount = useMemo(() => 
    Object.keys(answers).length, 
    [answers]
  );
  
  // Tổng số câu hỏi
  const totalQuestions = useMemo(() => 
    partData?.questions?.length || 0, 
    [partData?.questions?.length]
  );
  
  // Phần trăm hoàn thành
  const progressPercentage = useMemo(() => {
    return totalQuestions > 0 ? (answersCount / totalQuestions) * 100 : 0;
  }, [answersCount, totalQuestions]);
  
  // Kiểm tra đã trả lời hết chưa
  const isAllAnswered = useMemo(() => {
    return answersCount === totalQuestions && totalQuestions > 0;
  }, [answersCount, totalQuestions]);

  // Tính điểm số
  const score = useMemo(() => {
    if (!partData?.questions) {
      return { correct: 0, total: 0, percentage: 0 };
    }
    
    let correct = 0;
    for (let i = 0; i < partData.questions.length; i++) {
      const question = partData.questions[i];
      if (answers[question.id] === question.correct) {
        correct++;
      }
    }
    
    return {
      correct,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? (correct / totalQuestions) * 100 : 0
    };
  }, [answers, partData?.questions, totalQuestions]);

  // ===== HELPER FUNCTIONS =====
  
  // Lấy thông tin user identifier
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

  // ===== EVENT HANDLERS =====
  
  // Xử lý nộp bài và lưu vào Firebase
  const handleSubmitWithSave = useCallback(async () => {
    try {
      // 1. Gọi callback onSubmit từ parent
      onSubmit();

      // 2. Kiểm tra đăng nhập
      if (!isSignedIn) {
        setSubmitStatus({
          show: true,
          success: false,
          message: '⚠️ Vui lòng đăng nhập để lưu kết quả'
        });
        setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
        return;
      }

      // 3. Lấy thông tin user
      const userIdentifier = getUserIdentifier();
      if (!userIdentifier) {
        setSubmitStatus({
          show: true,
          success: false,
          message: '❌ Không thể xác định người dùng'
        });
        setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
        return;
      }

      // 4. Hiển thị trạng thái đang lưu
      setSubmitStatus({
        show: true,
        success: false,
        message: '⏳ Đang lưu kết quả...'
      });

      // 5. Chuẩn bị dữ liệu để lưu
      const dataToSave = {
        provider: userIdentifier.provider,
        email: userIdentifier.email || '',
        displayName: userIdentifier.displayName || 'Anonymous',
        exam: selectedExam,
        part: selectedPart,
        score: score.percentage,
        answers: answers,
        totalQuestions: score.total,
        correctAnswers: score.correct,
        isDraft: false,
        testType: testType,
        createdAt: serverTimestamp(),
        completedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Thêm ID tùy theo provider
      if (userIdentifier.clerkId) dataToSave.clerkId = userIdentifier.clerkId;
      if (userIdentifier.firebaseUid) dataToSave.firebaseUid = userIdentifier.firebaseUid;

      // 6. Lưu vào Firestore
      await addDoc(collection(db, 'userProgress'), dataToSave);

      // 7. Hiển thị thông báo thành công
      setSubmitStatus({
        show: true,
        success: true,
        message: `✅ Đã lưu thành công! Điểm: ${score.correct}/${score.total} (${score.percentage.toFixed(0)}%)`
      });

      // 8. Tự động ẩn thông báo sau 4 giây
      setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);

    } catch (error) {
      console.error('Error saving progress:', error);
      setSubmitStatus({
        show: true,
        success: false,
        message: `❌ Lỗi khi lưu: ${error.message}`
      });
      setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
    }
  }, [isSignedIn, getUserIdentifier, onSubmit, selectedExam, selectedPart, score, answers, testType]);

  // ===== RENDER CONDITIONS =====
  
  // Không hiển thị nếu không có data hoặc đã show results
  if (!partData || showResults || !partData.questions) {
    return null;
  }

  // ===== MAIN RENDER =====
  return (
    <div className={`relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg sm:rounded-xl overflow-hidden ${
      isSplitLayoutPart ? '' : 'min-h-screen'
    }`}>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-8rem] right-[-8rem] w-96 h-96 bg-orange-200/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-6rem] w-80 h-80 bg-amber-200/6 rounded-full blur-3xl" />
      </div>

      {/* ===== MAIN CONTAINER (Conditional Scroll) ===== */}
      <div className={`relative z-10 max-w-4xl mx-auto space-y-2 sm:space-y-3 ${
        isSplitLayoutPart 
          ? 'max-h-[calc(100vh-8rem)] lg:max-h-[calc(100vh-7rem)] overflow-y-auto' 
          : 'py-2 sm:py-4 px-2 sm:px-4'
      }`}>
        
        {/* ===== QUESTIONS SECTION ===== */}
        <div className={`p-2.5 sm:p-4 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md ${
          isSplitLayoutPart ? 'm-2 sm:m-4' : ''
        }`}>
          
          {/* Header (Sticky only for split layout) */}
          <div className={`flex items-center gap-2 mb-2.5 sm:mb-3 pb-2 border-b border-gray-200 ${
            isSplitLayoutPart ? 'sticky top-0 bg-white z-10 -mx-2.5 sm:-mx-4 px-2.5 sm:px-4 pt-2.5 sm:pt-4' : ''
          }`}>
            <h2 className="text-sm sm:text-lg font-semibold text-gray-800">
              ❓ <span className="text-orange-600">Câu hỏi</span>
            </h2>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 whitespace-nowrap">
              {testType === 'listening' ? '🎧 Nghe' : '📖 Đọc'}
            </span>
            <span className="ml-auto text-xs font-medium text-gray-500">
              {answersCount}/{totalQuestions}
            </span>
          </div>

          {/* Questions List (Scroll only for split layout) */}
          <div className={`space-y-2.5 sm:space-y-4 ${
            isSplitLayoutPart 
              ? 'max-h-[50vh] lg:max-h-[55vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100'
              : ''
          }`}>
            {partData.questions.map((q) => {
              const selectedAns = answers[q.id];
              
              return (
                <QuestionCard
                  key={q.id}
                  question={q}
                  script={q.script}
                  options={q.options}
                  isAnswered={selectedAns !== undefined}
                  selectedAnswer={selectedAns}
                  onAnswerSelect={onAnswerSelect}
                />
              );
            })}
          </div>
        </div>

        {/* ===== PROGRESS & SUBMIT SECTION (Sticky only for split layout) ===== */}
        <div className={`p-2.5 sm:p-4 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 space-y-2.5 sm:space-y-3 shadow-lg ${
          isSplitLayoutPart ? 'm-2 sm:m-4 sticky bottom-0 z-10' : ''
        }`}>
          
          {/* Section Title */}
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 pb-2 border-b border-gray-200 flex items-center gap-2">
            <span>📊 Tiến độ làm bài</span>
          </h3>

          {/* Progress Bar */}
          <ProgressBar percentage={progressPercentage} />
          
          {/* Status Badge */}
          <StatusBadge
            answersCount={answersCount}
            totalQuestions={totalQuestions}
          />

          {/* Submit Status Notification */}
          <SubmitStatusNotification status={submitStatus} />

          {/* Auth Notice */}
          <AuthNotice isSignedIn={isSignedIn} authProvider={authProvider} />

          {/* Submit Button */}
          <button
            onClick={handleSubmitWithSave}
            disabled={!isAllAnswered}
            className={`
              w-full py-2.5 sm:py-3 px-3 sm:px-4 font-semibold rounded-lg 
              transition-all duration-200
              flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg
              ${isAllAnswered
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 active:scale-95 hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
              }
            `}
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-bold">
              {isSignedIn ? 'NỘP BÀI & LƯU KẾT QUẢ' : 'NỘP BÀI'}
            </span>
            {isAllAnswered && (
              <span className="text-xs sm:text-sm bg-white/20 px-2 py-0.5 rounded-full">
                ({totalQuestions} câu)
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;