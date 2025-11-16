import React, { useMemo, useCallback, useState, memo } from 'react';
import { ChevronLeft, ChevronRight, Save, History, CheckCircle, AlertCircle, Volume2, Check } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useUnifiedAuth } from '../hooks/useUnifiedAuth';

// --- Memoized Components ---

const ProgressBar = memo(({ percentage }) => (
  <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
    <div
      className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-500"
      style={{ width: `${percentage}%` }}
    />
  </div>
), (prev, next) => Math.abs(prev.percentage - next.percentage) < 1);

ProgressBar.displayName = 'ProgressBar';

const StatusBadge = memo(({ isAnswered, answersCount, totalQuestions }) => {
  const isAllAnswered = answersCount === totalQuestions && totalQuestions > 0;

  return (
    <div className="flex items-center justify-between text-sm font-bold gap-2 flex-wrap">
      <span className="text-gray-700">
        Đã trả lời: <span className="text-orange-600 text-base">{answersCount}</span> / {totalQuestions}
      </span>
      {isAllAnswered ? (
        <span className="text-green-600 font-bold flex items-center gap-1 text-xs sm:text-sm">
          <CheckCircle className="w-4 h-4" /> Hoàn thành
        </span>
      ) : (
        <span className="text-red-500 text-xs sm:text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> Còn {totalQuestions - answersCount}
        </span>
      )}
    </div>
  );
}, (prev, next) => prev.answersCount === next.answersCount && prev.totalQuestions === next.totalQuestions);

StatusBadge.displayName = 'StatusBadge';

const AuthNotice = memo(({ isSignedIn, authProvider }) => (
  <div className={`p-3 sm:p-4 border-2 rounded-xl shadow-md ${
    isSignedIn
      ? 'bg-green-50 border-green-300'
      : 'bg-yellow-50 border-yellow-400'
  }`}>
    <div className="flex items-start gap-3">
      {isSignedIn ? (
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-xs sm:text-sm font-bold ${
          isSignedIn ? 'text-green-800' : 'text-yellow-800'
        } mb-0.5`}>
          {isSignedIn
            ? `✅ Đã đăng nhập (${authProvider === 'clerk' ? '🔐 Clerk' : '🔥 Firebase'})`
            : '🔑 Đăng nhập để lưu kết quả'
          }
        </p>
        {!isSignedIn && (
          <p className="text-xs text-yellow-700">
            Kết quả sẽ không được lưu vào Profile nếu bạn không đăng nhập.
          </p>
        )}
      </div>
    </div>
  </div>
));

AuthNotice.displayName = 'AuthNotice';

const SubmitStatusNotification = memo(({ status }) => {
  if (!status.show) return null;

  const isSuccess = status.success;
  const isLoading = status.message.includes('Đang');

  return (
    <div className={`p-3 sm:p-4 rounded-xl border-2 flex items-center gap-3 animate-in fade-in duration-200 ${
      isSuccess
        ? 'bg-green-100 border-green-400'
        : isLoading
        ? 'bg-amber-100 border-amber-400'
        : 'bg-red-100 border-red-400'
    }`}>
      {isSuccess || isLoading ? (
        <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0" />
      )}
      <span className={`text-xs sm:text-sm font-bold ${
        isSuccess ? 'text-green-800' : 'text-red-800'
      }`}>
        {status.message}
      </span>
    </div>
  );
}, (prev, next) => prev.status.show === next.status.show && prev.status.message === next.status.message);

SubmitStatusNotification.displayName = 'SubmitStatusNotification';

const QuestionOption = memo(({ option, index, isSelected, onSelect }) => {
  const optionLabel = String.fromCharCode(65 + index);

  return (
    <label className={`
      flex items-start p-4 sm:p-5 rounded-xl cursor-pointer transition-all duration-200 border-2
      ${isSelected
        ? 'bg-gradient-to-r from-amber-300 to-yellow-300 border-orange-600 shadow-lg'
        : 'bg-white border-gray-300 hover:border-orange-400 hover:bg-yellow-50 shadow-sm hover:shadow-md'
      }
    `}>
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className={`
          w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all mt-0.5
          ${isSelected
            ? 'bg-orange-600 border-orange-700 text-white'
            : 'border-gray-400 text-gray-600 bg-gray-100'
          }
        `}>
          {isSelected ? <Check className="w-3.5 h-3.5" /> : optionLabel}
        </div>
        <span className="text-sm sm:text-base text-gray-800 break-words pt-0.5">{option}</span>
      </div>
      <input
        type="radio"
        name={`question-option-${index}`}
        checked={isSelected}
        onChange={onSelect}
        className="hidden"
      />
    </label>
  );
}, (prev, next) => prev.isSelected === next.isSelected && prev.option === next.option);

QuestionOption.displayName = 'QuestionOption';

const QuestionCard = memo(({
  question,
  script,
  options,
  isAnswered,
  selectedAnswer,
  onAnswerSelect
}) => {
  const handleSelect = useCallback((optIndex) => {
    onAnswerSelect(question.id, optIndex);
  }, [question.id, onAnswerSelect]);

  return (
    <div className="p-4 sm:p-6 bg-amber-50 rounded-2xl shadow-lg border-2 border-yellow-400 hover:border-orange-500 transition-all duration-300">
      {/* Script */}
      {script && (
        <div className="mb-5 p-3 sm:p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500 shadow-inner">
          <p className="text-xs sm:text-sm font-bold text-indigo-800 mb-2 flex items-center gap-2">
            <Volume2 className="w-4 h-4" /> Script:
          </p>
          <p className="text-sm text-gray-800 leading-relaxed italic">{script}</p>
        </div>
      )}

      {/* Question */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 border-l-4 border-orange-500 pl-3 sm:pl-4 leading-snug">
        <span className="text-orange-600">Câu {question.id}:</span> {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-2 sm:space-y-3 mb-4">
        {options?.map((option, index) => (
          <QuestionOption
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswer === index}
            onSelect={() => handleSelect(index)}
          />
        ))}
      </div>

      {/* Answer Saved */}
      {isAnswered && (
        <div className="flex items-center gap-2 text-xs sm:text-sm text-green-700 bg-green-100 p-2.5 sm:p-3 rounded-lg font-bold border border-green-300">
          <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600" />
          <span>Đã chọn: <span className="text-green-800">({String.fromCharCode(65 + selectedAnswer)})</span></span>
        </div>
      )}
    </div>
  );
});

QuestionCard.displayName = 'QuestionCard';

const NavigationArrows = memo(({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext
}) => {
  const handlePrev = useCallback(() => onPrevious(), [onPrevious]);
  const handleNext = useCallback(() => onNext(), [onNext]);

  return (
    <div className="flex items-center justify-between gap-2 p-3 bg-white rounded-lg shadow-md border border-gray-200">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="flex items-center gap-1 px-3 py-2 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold transition-all text-xs sm:text-sm text-amber-800 active:scale-95"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5" />
        <span className="hidden sm:inline">Trước</span>
      </button>

      <span className="text-center font-bold text-gray-700 text-xs sm:text-base">
        <span className="text-orange-600 text-lg sm:text-xl">{currentIndex + 1}</span> / {totalQuestions}
      </span>

      <button
        onClick={handleNext}
        disabled={currentIndex === totalQuestions - 1}
        className="flex items-center gap-1 px-3 py-2 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold transition-all text-xs sm:text-sm text-amber-800 active:scale-95"
      >
        <span className="hidden sm:inline">Sau</span>
        <ChevronRight className="w-4 h-4 sm:w-5" />
      </button>
    </div>
  );
});

NavigationArrows.displayName = 'NavigationArrows';

const QuestionNavigation = memo(({
  questions,
  answers,
  currentIndex,
  onQuestionChange
}) => {
  const answersCount = Object.keys(answers).length;

  const handleClick = useCallback((index) => {
    onQuestionChange(index);
  }, [onQuestionChange]);

  return (
    <div className="mb-6 p-3 sm:p-5 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-2xl shadow-lg border-4 border-amber-400/70">
      <div className="flex items-center justify-between mb-3 gap-2 pb-3 border-b-2 border-amber-300 flex-wrap">
        <div className="flex items-center gap-2 sm:gap-3">
          <History className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm sm:text-base font-bold text-amber-800">Điều hướng</h3>
        </div>
        <div className="text-xs sm:text-sm text-gray-700 font-bold bg-amber-200 px-2.5 py-1 rounded-full">
          <span className="text-amber-700">{answersCount}</span> / {questions.length}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {questions.map((q, index) => {
          const isAnswered = answers[q.id] !== undefined;
          const isCurrent = currentIndex === index;

          return (
            <button
              key={q.id}
              onClick={() => handleClick(index)}
              title={isAnswered ? 'Đã trả lời' : 'Chưa trả lời'}
              className={`
                px-2.5 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-1
                ${isCurrent
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg ring-2 ring-orange-300/50'
                  : isAnswered
                  ? 'bg-green-500 text-white hover:bg-green-600 shadow-md'
                  : 'bg-white text-gray-800 hover:bg-amber-100 border border-gray-300 shadow-sm'
                }
              `}
            >
              {isAnswered && <Check className="w-3 h-3" />}
              <span>Câu {index + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

QuestionNavigation.displayName = 'QuestionNavigation';

// --- Main Component ---

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
  const { user: clerkUser } = useUser();
  const { user: firebaseUser, authProvider, isSignedIn } = useUnifiedAuth();
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });

  // Memoized calculations
  const answersCount = useMemo(() => Object.keys(answers).length, [answers]);
  
  const totalQuestions = useMemo(() => partData?.questions?.length || 0, [partData?.questions?.length]);

  const progressPercentage = useMemo(() => {
    return totalQuestions > 0 ? (answersCount / totalQuestions) * 100 : 0;
  }, [answersCount, totalQuestions]);

  const isAllAnswered = useMemo(() => {
    return answersCount === totalQuestions && totalQuestions > 0;
  }, [answersCount, totalQuestions]);

  const currentQuestion = useMemo(() => {
    return partData?.questions?.[currentQuestionIndex] || null;
  }, [partData?.questions, currentQuestionIndex]);

  const score = useMemo(() => {
    if (!partData?.questions) return { correct: 0, total: 0, percentage: 0 };
    
    let correct = 0;
    for (let i = 0; i < partData.questions.length; i++) {
      if (answers[partData.questions[i].id] === partData.questions[i].correct) {
        correct++;
      }
    }
    
    return {
      correct,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? (correct / totalQuestions) * 100 : 0
    };
  }, [answers, partData?.questions, totalQuestions]);

  // Get user identifier
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

  // Handle submit with save
  const handleSubmitWithSave = useCallback(async () => {
    try {
      onSubmit();

      if (!isSignedIn) {
        setSubmitStatus({
          show: true,
          success: false,
          message: '⚠️ Vui lòng đăng nhập để lưu kết quả'
        });
        setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
        return;
      }

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

      setSubmitStatus({
        show: true,
        success: false,
        message: '⏳ Đang lưu kết quả...'
      });

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

      if (userIdentifier.clerkId) dataToSave.clerkId = userIdentifier.clerkId;
      if (userIdentifier.firebaseUid) dataToSave.firebaseUid = userIdentifier.firebaseUid;

      const docRef = await addDoc(collection(db, 'userProgress'), dataToSave);

      setSubmitStatus({
        show: true,
        success: true,
        message: `✅ Đã lưu! ${score.correct}/${score.total} (${score.percentage.toFixed(0)}%)`
      });

      setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
    } catch (error) {
      setSubmitStatus({
        show: true,
        success: false,
        message: `❌ Lỗi: ${error.message}`
      });
      setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
    }
  }, [isSignedIn, getUserIdentifier, onSubmit, selectedExam, selectedPart, score, answers, testType]);

  // Handlers
  const handlePrevious = useCallback(() => {
    onQuestionChange(Math.max(0, currentQuestionIndex - 1));
  }, [currentQuestionIndex, onQuestionChange]);

  const handleNext = useCallback(() => {
    onQuestionChange(Math.min(totalQuestions - 1, currentQuestionIndex + 1));
  }, [currentQuestionIndex, totalQuestions, onQuestionChange]);

  const handleAnswerChange = useCallback((qId, optIndex) => {
    onAnswerSelect(qId, optIndex);
  }, [onAnswerSelect]);

  if (!partData || showResults || !partData.questions) return null;

  const shouldShowNavigation = selectedPart === 'part1' && testType === 'listening';
  const shouldShowArrows = shouldShowNavigation;
  const questionsToRender = shouldShowNavigation
    ? [partData.questions[currentQuestionIndex]]
    : partData.questions;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Static Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-4rem] left-[-4rem] w-72 h-72 bg-yellow-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-6rem] w-80 h-80 bg-orange-200/15 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto my-4 sm:my-8 px-3 sm:px-4 space-y-4">
        {shouldShowNavigation && (
          <QuestionNavigation
            questions={partData.questions}
            answers={answers}
            currentIndex={currentQuestionIndex}
            onQuestionChange={onQuestionChange}
          />
        )}

        {shouldShowArrows && (
          <NavigationArrows
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}

        {/* Questions */}
        <div className="p-3 sm:p-6 bg-white/80 backdrop-blur rounded-2xl sm:rounded-3xl shadow-lg border-3 sm:border-4 border-amber-300/50">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 pb-3 border-b-2 sm:border-b-4 border-orange-500/80">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
              ❓ <span className="text-orange-600">Câu hỏi</span>
            </h2>
            <span className="text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full border-2 flex-shrink-0 bg-indigo-100 text-indigo-700 border-indigo-300">
              {testType === 'listening' ? '🎧 Nghe' : '📖 Đọc'}
            </span>
          </div>

          <div className="space-y-6">
            {questionsToRender.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                script={q.script}
                options={q.options}
                isAnswered={answers[q.id] !== undefined}
                selectedAnswer={answers[q.id]}
                onAnswerSelect={handleAnswerChange}
              />
            ))}
          </div>
        </div>

        {/* Submit Section */}
        <div className="p-4 sm:p-6 bg-white/80 backdrop-blur rounded-2xl sm:rounded-3xl shadow-lg border-3 sm:border-4 border-gray-100/50 space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 border-b pb-2">
            Tiến độ làm bài
          </h3>

          <ProgressBar percentage={progressPercentage} />
          
          <StatusBadge
            isAnswered={answersCount > 0}
            answersCount={answersCount}
            totalQuestions={totalQuestions}
          />

          <SubmitStatusNotification status={submitStatus} />

          <AuthNotice isSignedIn={isSignedIn} authProvider={authProvider} />

          <button
            onClick={handleSubmitWithSave}
            disabled={!isAllAnswered}
            className={`
              w-full py-3 sm:py-4 px-4 font-bold rounded-xl transition-all duration-200 transform
              flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg
              ${isAllAnswered
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:shadow-lg shadow-md active:scale-95'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-60 shadow-sm'
              }
            `}
          >
            <Save className="w-5 h-5 sm:w-6" />
            <span>{isSignedIn ? 'NỘP BÀI & LƯU' : 'NỘP BÀI'}</span>
            {isAllAnswered && <span className="text-xs sm:text-sm">({totalQuestions} câu)</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;