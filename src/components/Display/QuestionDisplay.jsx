import React, { useMemo, useCallback, useState } from 'react';
import { Save, CheckCircle, AlertCircle, Volume2, Check, BookOpen, Award } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';

// ========================================
// SUB-COMPONENT: Progress Bar
// ========================================
const ProgressBar = ({ percentage }) => (
  <div className="h-2 bg-slate-200 rounded-full overflow-hidden shadow-sm">
    <div
      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out"
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
    <div className="flex items-center justify-between text-xs md:text-sm gap-3">
      {/* Left side: Progress count */}
      <span className="text-slate-600 font-medium whitespace-nowrap">
        Đã trả lời: <span className="text-cyan-700 font-bold">{answersCount}</span> / {totalQuestions}
      </span>
      
      {/* Right side: Status indicator */}
      {isAllAnswered ? (
        <div className="flex items-center gap-1 text-green-600 font-semibold text-xs whitespace-nowrap">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          Hoàn thành
        </div>
      ) : (
        <div className="flex items-center gap-1 text-amber-600 font-medium text-xs whitespace-nowrap">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          Còn {totalQuestions - answersCount}
        </div>
      )}
    </div>
  );
};

// ========================================
// SUB-COMPONENT: Auth Notice
// ========================================
const AuthNotice = ({ isSignedIn }) => (
  <div className={`p-2.5 md:p-3 border rounded-lg md:rounded-xl text-xs md:text-sm transition-all ${
    isSignedIn
      ? 'bg-green-50 border-green-200'
      : 'bg-amber-50 border-amber-200'
  }`}>
    <div className="flex items-start gap-2">
      {/* Icon */}
      <div className={`w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isSignedIn 
          ? 'bg-green-100' 
          : 'bg-amber-100'
      }`}>
        {isSignedIn ? (
          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" strokeWidth={2} />
        ) : (
          <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" strokeWidth={2} />
        )}
      </div>
      
      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold mb-0.5 leading-tight ${
          isSignedIn ? 'text-green-900' : 'text-amber-900'
        }`}>
          {isSignedIn
            ? 'Đã đăng nhập'
            : 'Đăng nhập để lưu'
          }
        </p>
        {!isSignedIn && (
          <p className="text-xs text-amber-700 leading-snug hidden sm:block">
            Kết quả sẽ không được lưu nếu chưa đăng nhập.
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
    <div className={`p-2.5 md:p-3 rounded-lg md:rounded-xl border flex items-start gap-2 text-xs md:text-sm animate-in fade-in duration-200 ${
      isSuccess
        ? 'bg-green-50 border-green-200'
        : isLoading
        ? 'bg-blue-50 border-blue-200'
        : 'bg-red-50 border-red-200'
    }`}>
      {/* Icon */}
      <div className={`w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isSuccess 
          ? 'bg-green-100' 
          : isLoading 
          ? 'bg-blue-100' 
          : 'bg-red-100'
      }`}>
        {isSuccess ? (
          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" strokeWidth={2} />
        ) : isLoading ? (
          <div className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-600" strokeWidth={2} />
        )}
      </div>
      
      {/* Message */}
      <span className={`font-medium flex-1 ${
        isSuccess ? 'text-green-900' : isLoading ? 'text-blue-900' : 'text-red-900'
      }`}>
        {status.message}
      </span>
    </div>
  );
};

// ========================================
// SUB-COMPONENT: Question Option
// ========================================
const QuestionOption = ({ option, index, isSelected, onSelect, questionId }) => {
  const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

  return (
    <label 
      htmlFor={`q${questionId}-opt${index}`}
      className={`
        group relative flex items-start p-2.5 md:p-3 rounded-lg md:rounded-xl cursor-pointer 
        transition-all duration-200 border
        ${isSelected
          ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-300 shadow-sm'
          : 'bg-white border-slate-200 hover:border-cyan-200 hover:bg-slate-50'
        }
      `}
    >
      <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
        {/* Radio Circle */}
        <div className={`
          relative w-6 h-6 md:w-7 md:h-7 rounded-full border-2 
          flex items-center justify-center font-semibold text-xs flex-shrink-0 
          transition-all mt-0.5
          ${isSelected
            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-600 text-white shadow-md'
            : 'border-slate-300 text-slate-500 bg-white group-hover:border-cyan-300 group-hover:bg-cyan-50'
          }
        `}>
          {isSelected ? (
            <Check className="w-3 h-3 stroke-[3]" />
          ) : (
            <span className="text-xs font-bold">{optionLabel}</span>
          )}
        </div>

        {/* Option Text */}
        <div className="flex-1 min-w-0 pt-0.5">
          <span className={`
            text-xs md:text-sm leading-relaxed break-words block
            ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-700'}
          `}>
            {option}
          </span>
          
          {/* Selected Badge */}
          {isSelected && (
            <div className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">
              <Check className="w-2.5 h-2.5" />
              <span className="hidden sm:inline">Đã chọn</span>
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
    <div className="p-3 md:p-4 bg-white rounded-lg md:rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
      
      {/* Script Section (if exists) */}
      {script && (
        <div className="mb-3 p-2.5 md:p-3 bg-blue-50 rounded-lg md:rounded-xl border border-blue-200">
          <div className="flex items-center gap-1.5 md:gap-2 mb-2">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-600" strokeWidth={2} />
            </div>
            <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
              Script
            </p>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed italic pl-6 md:pl-7">
            {script}
          </p>
        </div>
      )}

      {/* Question Header */}
      <div className="mb-3">
        <div className="flex items-start gap-2 md:gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-cyan-700 font-bold text-sm md:text-base">Câu {question.id}</span>
              {/* Answered Badge */}
              {isAnswered && (
                <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  <span className="hidden sm:inline">Đã trả lời</span>
                </div>
              )}
            </div>
            <h3 className="text-xs md:text-sm font-medium text-slate-900 leading-relaxed">
              {question.question}
            </h3>
          </div>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-2">
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
        <div className="mt-3 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs md:text-sm bg-slate-50 p-2 rounded-lg">
            <span className="text-slate-600 font-medium whitespace-nowrap">Lựa chọn:</span>
            <span className="font-semibold text-cyan-700">
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
  const { user: firebaseUser, isSignedIn } = useUnifiedAuth();
  const [submitStatus, setSubmitStatus] = useState({ 
    show: false, 
    success: false, 
    message: '' 
  });

  // ===== CHECK IF SPLIT LAYOUT PART (6, 7, 8) =====
  const isSplitLayoutPart = testType === 'reading' && 
    (selectedPart === 'part6' || selectedPart === 'part7' || selectedPart === 'part8');

  // ===== COMPUTED VALUES =====
  const answersCount = useMemo(() => 
    Object.keys(answers).length, 
    [answers]
  );
  
  const totalQuestions = useMemo(() => 
    partData?.questions?.length || 0, 
    [partData?.questions?.length]
  );
  
  const progressPercentage = useMemo(() => {
    return totalQuestions > 0 ? (answersCount / totalQuestions) * 100 : 0;
  }, [answersCount, totalQuestions]);
  
  const isAllAnswered = useMemo(() => {
    return answersCount === totalQuestions && totalQuestions > 0;
  }, [answersCount, totalQuestions]);

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
  const getUserIdentifier = useCallback(() => {
    if (firebaseUser) {
      return {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Anonymous'
      };
    }
    return null;
  }, [firebaseUser]);

  // ===== EVENT HANDLERS =====
  const handleSubmitWithSave = useCallback(async () => {
    try {
      onSubmit();

      if (!isSignedIn) {
        setSubmitStatus({
          show: true,
          success: false,
          message: 'Vui lòng đăng nhập để lưu kết quả'
        });
        setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
        return;
      }

      const userIdentifier = getUserIdentifier();
      if (!userIdentifier) {
        setSubmitStatus({
          show: true,
          success: false,
          message: 'Không thể xác định người dùng'
        });
        setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
        return;
      }

      setSubmitStatus({
        show: true,
        success: false,
        message: 'Đang lưu kết quả...'
      });

      const dataToSave = {
        firebaseUid: userIdentifier.firebaseUid,
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

      await addDoc(collection(db, 'userProgress'), dataToSave);

      setSubmitStatus({
        show: true,
        success: true,
        message: `Đã lưu thành công! Điểm: ${score.correct}/${score.total} (${score.percentage.toFixed(0)}%)`
      });

      setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);

    } catch (error) {
      console.error('Error saving progress:', error);
      setSubmitStatus({
        show: true,
        success: false,
        message: `Lỗi khi lưu: ${error.message}`
      });
      setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
    }
  }, [isSignedIn, getUserIdentifier, onSubmit, selectedExam, selectedPart, score, answers, testType]);

  // ===== RENDER CONDITIONS =====
  if (!partData || showResults || !partData.questions) {
    return null;
  }

  // ===== MAIN RENDER =====
  return (
    <div className={`relative bg-transparent ${
      isSplitLayoutPart ? '' : 'w-full'
    }`}>
      
      {/* ===== MAIN CONTAINER ===== */}
      <div className={`relative space-y-3 md:space-y-4 ${
        isSplitLayoutPart 
          ? 'h-full flex flex-col' 
          : 'w-full'
      }`}>
        
        {/* ===== QUESTIONS SECTION ===== */}
        <div className={`bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col ${
          isSplitLayoutPart ? 'min-h-0' : ''
        }`}>
          
          {/* Gradient accent */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-1" />
          
          {/* Content */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Header (Sticky) */}
            <div className="sticky top-0 z-10 bg-white px-3 md:px-4 py-2.5 md:py-3 border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-slate-900 font-bold text-sm md:text-base truncate">Câu hỏi</h2>
                  <p className="text-slate-500 text-xs font-medium">
                    {testType === 'listening' ? 'Phần nghe' : 'Phần đọc'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 rounded-full bg-slate-100 border border-slate-200 flex-shrink-0">
                <span className="text-slate-700 text-xs md:text-sm font-semibold">{answersCount}/{totalQuestions}</span>
              </div>
            </div>

            {/* Questions List (Scrollable) */}
            <div className={`flex-1 min-h-0 overflow-y-auto px-3 md:px-4 py-3 md:py-4 space-y-2 md:space-y-3`} style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}>
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
        </div>

        {/* ===== PROGRESS & SUBMIT SECTION (Sticky Bottom) ===== */}
        <div className={`bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${
          isSplitLayoutPart ? 'flex-shrink-0' : ''
        }`}>
          {/* Gradient accent */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-1" />
          
          {/* Content */}
          <div className="p-3 md:p-4 space-y-3">
            {/* Section Title */}
            <div className="flex items-center gap-2 md:gap-3 pb-2.5 md:pb-3 border-b border-slate-200">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                <Award className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h3 className="text-slate-900 font-bold text-sm md:text-base">Tiến độ</h3>
                <p className="text-slate-500 text-xs font-medium hidden sm:block">Theo dõi quá trình</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <ProgressBar percentage={progressPercentage} />
              <StatusBadge
                answersCount={answersCount}
                totalQuestions={totalQuestions}
              />
            </div>

            {/* Submit Status Notification */}
            {submitStatus.show && <SubmitStatusNotification status={submitStatus} />}

            {/* Auth Notice */}
            <AuthNotice isSignedIn={isSignedIn} />

            {/* Submit Button */}
            <button
              onClick={handleSubmitWithSave}
              disabled={!isAllAnswered}
              className={`
                w-full py-2.5 md:py-3 px-3 md:px-4 font-semibold rounded-lg md:rounded-xl 
                transition-all duration-300
                flex items-center justify-center gap-2 text-xs md:text-sm shadow-lg
                ${isAllAnswered
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 active:scale-95 hover:shadow-xl'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              <Save className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
              <span className="font-bold truncate">
                {isSignedIn ? 'Nộp & Lưu' : 'Nộp bài'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;