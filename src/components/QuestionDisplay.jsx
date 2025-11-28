import React, { useMemo, useCallback, useState } from 'react';
import { Save, CheckCircle, AlertCircle, Volume2, Check } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useUnifiedAuth } from '../hooks/useUnifiedAuth';

// ✅ COMPONENTS OPTIMIZED FOR MOBILE

const ProgressBar = ({ percentage }) => (
  <div className="bg-gray-200 rounded-lg h-2 overflow-hidden">
    <div
      className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-500"
      style={{ width: `${percentage}%` }}
    />
  </div>
);

const StatusBadge = ({ isAnswered, answersCount, totalQuestions }) => {
  const isAllAnswered = answersCount === totalQuestions && totalQuestions > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm font-medium">
      <span className="text-gray-700">
        Đã trả lời: <span className="text-orange-600 font-bold">{answersCount}</span> / {totalQuestions}
      </span>
      {isAllAnswered ? (
        <span className="text-green-600 font-medium flex items-center gap-1 text-xs">
          <CheckCircle className="w-3.5 h-3.5" /> Hoàn thành
        </span>
      ) : (
        <span className="text-red-500 text-xs flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> Còn {totalQuestions - answersCount}
        </span>
      )}
    </div>
  );
};

const AuthNotice = ({ isSignedIn, authProvider }) => (
  <div className={`p-2 sm:p-3 border rounded-lg text-xs sm:text-sm ${
    isSignedIn
      ? 'bg-green-50 border-green-300'
      : 'bg-yellow-50 border-yellow-300'
  }`}>
    <div className="flex items-start gap-2">
      {isSignedIn ? (
        <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5 text-yellow-600 flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${
          isSignedIn ? 'text-green-800' : 'text-yellow-800'
        }`}>
          {isSignedIn
            ? `✅ Đã đăng nhập (${authProvider === 'clerk' ? 'Clerk' : 'Firebase'})`
            : '🔑 Đăng nhập để lưu'
          }
        </p>
        {!isSignedIn && (
          <p className="text-xs text-yellow-700 mt-0.5">
            Kết quả sẽ không được lưu nếu không đăng nhập.
          </p>
        )}
      </div>
    </div>
  </div>
);

const SubmitStatusNotification = ({ status }) => {
  if (!status.show) return null;

  const isSuccess = status.success;
  const isLoading = status.message.includes('Đang');

  return (
    <div className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs sm:text-sm ${
      isSuccess
        ? 'bg-green-50 border-green-300'
        : isLoading
        ? 'bg-amber-50 border-amber-300'
        : 'bg-red-50 border-red-300'
    }`}>
      {isSuccess || isLoading ? (
        <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
      )}
      <span className={`font-medium ${
        isSuccess ? 'text-green-800' : 'text-red-800'
      }`}>
        {status.message}
      </span>
    </div>
  );
};

const QuestionOption = ({ option, index, isSelected, onSelect, questionId }) => {
  const optionLabel = String.fromCharCode(65 + index);

  return (
    <label 
      htmlFor={`q${questionId}-opt${index}`}
      className={`
        group relative flex items-start p-2.5 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 border text-sm
        ${isSelected
          ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-400 shadow-sm'
          : 'bg-white border-gray-300 hover:border-orange-300 hover:bg-orange-50/50'
        }
      `}
    >
      <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
        <div className={`
          relative w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center font-semibold text-xs flex-shrink-0 transition-all
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

        <div className="flex-1 min-w-0 pt-0.5">
          <span className={`
            text-sm sm:text-[15px] leading-relaxed break-words block
            ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}
          `}>
            {option}
          </span>
          
          {isSelected && (
            <div className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
              <Check className="w-2.5 h-2.5" />
              <span>Chọn</span>
            </div>
          )}
        </div>
      </div>

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

const QuestionCard = ({ question, script, options, isAnswered, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="p-2.5 sm:p-4 bg-white rounded-lg border border-gray-200">
      {script && (
        <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 bg-blue-50 rounded-lg border-l-2 border-blue-400">
          <p className="text-xs sm:text-sm font-medium text-blue-800 mb-1.5 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Script:
          </p>
          <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed italic">{script}</p>
        </div>
      )}

      <div className="mb-3 sm:mb-4">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-sm sm:text-lg font-semibold text-gray-900 border-l-2 border-orange-500 pl-2 sm:pl-3 leading-snug">
            <span className="text-orange-600">Câu {question.id}:</span> {question.question}
          </h3>
          {isAnswered && (
            <div className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200 whitespace-nowrap">
              <CheckCircle className="w-3 h-3" />
              <span className="hidden sm:inline">Đã trả lời</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 sm:space-y-2.5">
        {options?.map((option, index) => (
          <QuestionOption
            key={`${question.id}-${index}`}
            questionId={question.id}
            option={option}
            index={index}
            isSelected={selectedAnswer === index}
            onSelect={() => {
              onAnswerSelect(question.id, index);
            }}
          />
        ))}
      </div>

      {isAnswered && selectedAnswer !== undefined && (
        <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-gray-600">Lựa chọn:</span>
            <span className="font-semibold text-orange-600 break-all">
              ({String.fromCharCode(65 + selectedAnswer)}) {options[selectedAnswer]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---

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
  const { user: clerkUser } = useUser();
  const { user: firebaseUser, authProvider, isSignedIn } = useUnifiedAuth();
  const [submitStatus, setSubmitStatus] = useState({ show: false, success: false, message: '' });

  const answersCount = useMemo(() => Object.keys(answers).length, [answers]);
  const totalQuestions = useMemo(() => partData?.questions?.length || 0, [partData?.questions?.length]);
  const progressPercentage = useMemo(() => {
    return totalQuestions > 0 ? (answersCount / totalQuestions) * 100 : 0;
  }, [answersCount, totalQuestions]);
  const isAllAnswered = useMemo(() => {
    return answersCount === totalQuestions && totalQuestions > 0;
  }, [answersCount, totalQuestions]);

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

  const handleSubmitWithSave = useCallback(async () => {
    try {
      onSubmit();

      if (!isSignedIn) {
        setSubmitStatus({
          show: true,
          success: false,
          message: '⚠️ Vui lòng đăng nhập để lưu'
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
        message: '⏳ Đang lưu...'
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

      await addDoc(collection(db, 'userProgress'), dataToSave);

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

  if (!partData || showResults || !partData.questions) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-8rem] right-[-8rem] w-96 h-96 bg-orange-200/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-2 sm:py-4 px-2 sm:px-4 space-y-2 sm:space-y-3">
        {/* Questions Section */}
        <div className="p-2.5 sm:p-4 bg-white/95 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2.5 sm:mb-3 pb-2 border-b border-gray-200">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-800">
              ❓ <span className="text-orange-600">Câu hỏi</span>
            </h2>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 whitespace-nowrap">
              {testType === 'listening' ? '🎧' : '📖'} {testType === 'listening' ? 'Nghe' : 'Đọc'}
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-4">
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

        {/* Progress Section */}
        <div className="p-2.5 sm:p-4 bg-white/95 rounded-lg border border-gray-200 space-y-2.5 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 pb-2 border-b border-gray-200">
            Tiến độ
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
              w-full py-2.5 sm:py-3 px-3 sm:px-4 font-semibold rounded-lg transition-all duration-150
              flex items-center justify-center gap-2 text-sm sm:text-base
              ${isAllAnswered
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 active:scale-95'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{isSignedIn ? 'NỘP & LƯU' : 'NỘP'}</span>
            {isAllAnswered && <span className="text-xs sm:text-sm">({totalQuestions})</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;