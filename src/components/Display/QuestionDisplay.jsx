import React, { useMemo, useCallback, useState } from 'react';
import { Save, CheckCircle, AlertCircle, Volume2, Check, BookOpen, Award } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useUnifiedAuth } from '../../hooks/useUnifiedAuth';

// ========================================
// SUB-COMPONENT: Progress Bar
// ========================================
const ProgressBar = ({ percentage }) => (
  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
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
    <div className="flex items-center justify-between text-sm">
      {/* Left side: Progress count */}
      <span className="text-slate-600 font-medium">
        Đã trả lời: <span className="text-cyan-700 font-bold">{answersCount}</span> / {totalQuestions}
      </span>
      
      {/* Right side: Status indicator */}
      {isAllAnswered ? (
        <div className="flex items-center gap-1.5 text-green-600 font-semibold text-xs">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          Hoàn thành
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-amber-600 font-medium text-xs">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          Còn {totalQuestions - answersCount} câu
        </div>
      )}
    </div>
  );
};

// ========================================
// SUB-COMPONENT: Auth Notice
// ========================================
const AuthNotice = ({ isSignedIn }) => (
  <div className={`p-3 border rounded-xl text-sm transition-all ${
    isSignedIn
      ? 'bg-green-50 border-green-200'
      : 'bg-amber-50 border-amber-200'
  }`}>
    <div className="flex items-start gap-2.5">
      {/* Icon */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isSignedIn 
          ? 'bg-green-100' 
          : 'bg-amber-100'
      }`}>
        {isSignedIn ? (
          <CheckCircle className="w-4 h-4 text-green-600" strokeWidth={2} />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-600" strokeWidth={2} />
        )}
      </div>
      
      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className={`font-semibold mb-0.5 ${
          isSignedIn ? 'text-green-900' : 'text-amber-900'
        }`}>
          {isSignedIn
            ? 'Đã đăng nhập - Kết quả sẽ được lưu tự động'
            : 'Vui lòng đăng nhập để lưu kết quả'
          }
        </p>
        {!isSignedIn && (
          <p className="text-xs text-amber-700 leading-relaxed">
            Kết quả sẽ không được lưu nếu bạn chưa đăng nhập.
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
    <div className={`p-3 rounded-xl border flex items-start gap-2.5 text-sm animate-in fade-in duration-200 ${
      isSuccess
        ? 'bg-green-50 border-green-200'
        : isLoading
        ? 'bg-blue-50 border-blue-200'
        : 'bg-red-50 border-red-200'
    }`}>
      {/* Icon */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isSuccess 
          ? 'bg-green-100' 
          : isLoading 
          ? 'bg-blue-100' 
          : 'bg-red-100'
      }`}>
        {isSuccess ? (
          <CheckCircle className="w-4 h-4 text-green-600" strokeWidth={2} />
        ) : isLoading ? (
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <AlertCircle className="w-4 h-4 text-red-600" strokeWidth={2} />
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
// SUB-COMPONENT: Question Option (Single Choice)
// ========================================
const QuestionOption = ({ option, index, isSelected, onSelect, questionId }) => {
  const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

  return (
    <label 
      htmlFor={`q${questionId}-opt${index}`}
      className={`
        group relative flex items-start p-3.5 rounded-xl cursor-pointer 
        transition-all duration-200 border
        ${isSelected
          ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-300 shadow-sm'
          : 'bg-white border-slate-200 hover:border-cyan-200 hover:bg-slate-50'
        }
      `}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {/* Radio Circle */}
        <div className={`
          relative w-7 h-7 rounded-full border-2 
          flex items-center justify-center font-semibold text-xs flex-shrink-0 
          transition-all
          ${isSelected
            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-600 text-white shadow-md'
            : 'border-slate-300 text-slate-500 bg-white group-hover:border-cyan-300 group-hover:bg-cyan-50'
          }
        `}>
          {isSelected ? (
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          ) : (
            <span className="text-xs font-bold">{optionLabel}</span>
          )}
        </div>

        {/* Option Text */}
        <div className="flex-1 min-w-0 pt-0.5">
          <span className={`
            text-sm leading-relaxed break-words block
            ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-700'}
          `} style={{ lineHeight: '1.6' }}>
            {option}
          </span>
          
          {/* Selected Badge */}
          {isSelected && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 bg-cyan-100 px-2.5 py-1 rounded-full">
              <Check className="w-3 h-3" />
              Đã chọn
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
    <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
      
      {/* Script Section (if exists) */}
      {script && (
        <div className="mb-4 p-3.5 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-blue-600" strokeWidth={2} />
            </div>
            <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
              Script
            </p>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed italic pl-9">
            {script}
          </p>
        </div>
      )}

      {/* Question Header */}
      <div className="mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-700 font-bold text-base">Câu {question.id}</span>
              {/* Answered Badge */}
              {isAnswered && (
                <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  <CheckCircle className="w-3 h-3" />
                  <span className="hidden sm:inline">Đã trả lời</span>
                </div>
              )}
            </div>
            <h3 className="text-sm font-medium text-slate-900 leading-relaxed">
              {question.question}
            </h3>
          </div>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
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
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-sm bg-slate-50 p-3 rounded-lg">
            <span className="text-slate-600 font-medium">Lựa chọn của bạn:</span>
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
  // Firebase authentication via unified auth hook (Clerk removed)
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
  
  // Lấy thông tin user identifier từ Firebase
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
          message: 'Vui lòng đăng nhập để lưu kết quả'
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
          message: 'Không thể xác định người dùng'
        });
        setTimeout(() => setSubmitStatus({ show: false, success: false, message: '' }), 4000);
        return;
      }

      // 4. Hiển thị trạng thái đang lưu
      setSubmitStatus({
        show: true,
        success: false,
        message: 'Đang lưu kết quả...'
      });

      // 5. Chuẩn bị dữ liệu để lưu
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

      // 6. Lưu vào Firestore
      await addDoc(collection(db, 'userProgress'), dataToSave);

      // 7. Hiển thị thông báo thành công
      setSubmitStatus({
        show: true,
        success: true,
        message: `Đã lưu thành công! Điểm: ${score.correct}/${score.total} (${score.percentage.toFixed(0)}%)`
      });

      // 8. Tự động ẩn thông báo sau 4 giây
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
  
  // Không hiển thị nếu không có data hoặc đã show results
  if (!partData || showResults || !partData.questions) {
    return null;
  }

  // ===== MAIN RENDER =====
  return (
    <div className={`relative bg-slate-50 ${
      isSplitLayoutPart ? '' : 'min-h-screen py-6 px-4'
    }`}>
      
      {/* ===== MAIN CONTAINER (Conditional Scroll) ===== */}
      <div className={`relative max-w-4xl mx-auto space-y-4 ${
        isSplitLayoutPart 
          ? 'max-h-[calc(100vh-8rem)] lg:max-h-[calc(100vh-7rem)] overflow-y-auto px-4 py-4' 
          : ''
      }`}>
        
        {/* ===== QUESTIONS SECTION ===== */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Gradient accent */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-1.5" />
          
          {/* Content */}
          <div className="p-5">
            {/* Header (Sticky only for split layout) */}
            <div className={`flex items-center justify-between mb-4 pb-4 border-b border-slate-200 ${
              isSplitLayoutPart ? 'sticky top-0 bg-white z-10 -mx-5 px-5 pt-5' : ''
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-slate-900 font-bold text-base">Câu hỏi</h2>
                  <p className="text-slate-500 text-xs font-medium">
                    {testType === 'listening' ? 'Phần nghe' : 'Phần đọc'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                <span className="text-slate-700 text-sm font-semibold">{answersCount}/{totalQuestions}</span>
              </div>
            </div>

            {/* Questions List (Scroll only for split layout) */}
            <div className={`space-y-3 ${
              isSplitLayoutPart 
                ? 'max-h-[50vh] lg:max-h-[55vh] overflow-y-auto pr-2'
                : ''
            }`} style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}>
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

        {/* ===== PROGRESS & SUBMIT SECTION (Sticky only for split layout) ===== */}
        <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${
          isSplitLayoutPart ? 'sticky bottom-4 z-10' : ''
        }`}>
          {/* Gradient accent */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-1.5" />
          
          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Section Title */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
                <Award className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-base">Tiến độ làm bài</h3>
                <p className="text-slate-500 text-xs font-medium">Theo dõi quá trình hoàn thành</p>
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
            <SubmitStatusNotification status={submitStatus} />

            {/* Auth Notice - Updated to not show authProvider */}
            <AuthNotice isSignedIn={isSignedIn} />

            {/* Submit Button */}
            <button
              onClick={handleSubmitWithSave}
              disabled={!isAllAnswered}
              className={`
                w-full py-3.5 px-4 font-semibold rounded-full 
                transition-all duration-300
                flex items-center justify-center gap-2.5 text-sm shadow-lg
                ${isAllAnswered
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 active:scale-95 hover:shadow-xl'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              <Save className="w-5 h-5" strokeWidth={2} />
              <span className="font-bold">
                {isSignedIn ? 'Nộp bài & Lưu kết quả' : 'Nộp bài'}
              </span>
              {isAllAnswered && (
                <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-medium">
                  {totalQuestions} câu
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;