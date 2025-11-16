import React, { useMemo, useState, lazy, Suspense, memo, useCallback, useRef } from 'react';
import { EXAM_DATA } from './data/examData';
import { useAppState } from './hooks/useAppState';
import MainLayout from './components/layout/MainLayout';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import HeaderSection from './components/sections/HeaderSection';
import UserProfile from './components/UserProfile';
import PartSelector from './components/PartSelector';
import ContentDisplay from './components/ContentDisplay';
import QuestionDisplay from './components/QuestionDisplay';
import ResultsDisplay from './components/ResultsDisplay';
import VocabularyPractice from './components/VocabularyPractice';
import AuthModal from './components/AuthModal';

import { Target, Trophy, FileText, Zap, GraduationCap, MessageCircle, X } from 'lucide-react';

// ✅ Lazy load components
const GrammarReview = lazy(() => import('./components/GrammarReview'));
const FullExamMode = lazy(() => import('./components/FullExamMode'));
const ChatApp = lazy(() => import('./components/ChatApp.jsx'));

// --- Memoized Sub-Components ---

// ✅ StatCard - Custom comparison tối ưu
const StatCard = memo(({ icon: Icon, label, value, color }) => {
  const colorMap = {
    orange: 'border-orange-300 text-orange-700 bg-orange-50',
    green: 'border-green-300 text-green-700 bg-green-50',
    red: 'border-red-300 text-red-700 bg-red-50',
    brown: 'border-amber-300 text-amber-700 bg-amber-50',
  };

  return (
    <div className={`rounded-xl p-3 sm:p-4 shadow-sm border-2 transition-shadow hover:shadow-md ${colorMap[color]} text-center`}>
      <Icon className="w-5 h-5 sm:w-6 mx-auto mb-1.5 opacity-80" />
      <p className="text-xs text-gray-600 font-semibold uppercase tracking-tight">{label}</p>
      <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}, (prev, next) => prev.value === next.value && prev.color === next.color);

StatCard.displayName = 'StatCard';

// ✅ StatsSection - Tối ưu comparison
const StatsSection = memo(({ score, isSignedIn }) => {
  if (!isSignedIn || score.total === 0) return null;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
      <StatCard icon={Target} label="Câu" value={score.total} color="brown" />
      <StatCard icon={Trophy} label="Đúng" value={score.correct} color="green" />
      <StatCard icon={FileText} label="Sai" value={score.total - score.correct} color="red" />
      <StatCard icon={Zap} label="%" value={`${score.percentage.toFixed(0)}%`} color="orange" />
    </section>
  );
}, (prev, next) => {
  return prev.score.total === next.score.total &&
    prev.score.correct === next.score.correct &&
    prev.isSignedIn === next.isSignedIn;
});

StatsSection.displayName = 'StatsSection';

// ✅ FullExamPrompt - Không cần thay đổi khi parent re-render
const FullExamPrompt = memo(({ onStartFullExam }) => (
  <section className="bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-amber-300 p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-200">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <div className="p-3 sm:p-4 rounded-full bg-amber-100 border-2 border-amber-500">
          <GraduationCap className="w-6 h-6 sm:w-8 text-amber-700" />
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
          Thi Thử <span className="text-amber-600">Toàn Phần</span>
        </h3>
      </div>

      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
          Thi mô phỏng 60 câu với timer chuẩn
        </p>
        <button
          onClick={onStartFullExam}
          className="w-full sm:w-auto px-5 sm:px-8 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-sm sm:text-base"
        >
          🚀 Bắt đầu ngay
        </button>
      </div>
    </div>
  </section>
), () => true);

FullExamPrompt.displayName = 'FullExamPrompt';

// ✅ Chat Modal - Optimized with proper memo
const ChatModal = memo(({ onClose, user }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center sm:justify-end">
    <div className="w-full sm:w-[600px] h-screen sm:h-[600px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 rounded-t-3xl sm:rounded-t-2xl flex-shrink-0">
        <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 truncate">
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span className="truncate">Trò Chuyện Chung</span>
        </h2>
        <button
          onClick={onClose}
          className="hover:bg-orange-400 p-2 rounded-lg transition-colors flex-shrink-0 ml-2"
          aria-label="Đóng chat"
        >
          <X className="w-5 h-5 sm:w-6" />
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <ChatApp user={user} />
        </Suspense>
      </div>
    </div>
  </div>
), (prev, next) => prev.user?.id === next.user?.id);

ChatModal.displayName = 'ChatModal';

// ✅ Chat Button - Tách riêng để tránh re-render
const ChatButton = memo(({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 z-40"
    title="Mở chat"
    aria-label="Mở trò chuyện"
  >
    <MessageCircle className="w-5 h-5 sm:w-6" />
  </button>
));

ChatButton.displayName = 'ChatButton';

// 🔥 FIX: Part Test Content - BỎ MEMO HOẶC FIX COMPARISON
// Cách 1: Bỏ memo (đơn giản nhất)
const PartTestContent = ({
  isSignedIn,
  user,
  selectedExam,
  handleExamChange,
  testType,
  handleTestTypeChange,
  selectedPart,
  handlePartChange,
  partData,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  answers,
  handleAnswerSelect,
  showResults,
  handleSubmit,
  handleReset,
  score,
  onStartFullExam
}) => (
  <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
    <HeaderSection isSignedIn={isSignedIn} user={user} />
    {isSignedIn && <UserProfile />}
    
    <PartSelector
      selectedExam={selectedExam}
      onExamChange={handleExamChange}
      testType={testType}
      onTestTypeChange={(e) => handleTestTypeChange(e.target.value)}
      selectedPart={selectedPart}
      onPartChange={handlePartChange}
    />

    <ContentDisplay
      partData={partData}
      selectedPart={selectedPart}
      currentQuestionIndex={currentQuestionIndex}
      testType={testType}
    />

    <QuestionDisplay
      selectedPart={selectedPart}
      selectedExam={selectedExam}
      partData={partData}
      currentQuestionIndex={currentQuestionIndex}
      onQuestionChange={setCurrentQuestionIndex}
      answers={answers}
      onAnswerSelect={handleAnswerSelect}
      showResults={showResults}
      onSubmit={handleSubmit}
      testType={testType}
    />

    {showResults && (
      <ResultsDisplay
        score={score}
        partData={partData}
        answers={answers}
        onReset={handleReset}
      />
    )}

    <StatsSection score={score} isSignedIn={isSignedIn} />
    <FullExamPrompt onStartFullExam={onStartFullExam} />
  </div>
);

PartTestContent.displayName = 'PartTestContent';

// 🔥 NẾU MUỐN GIỮ MEMO, DÙNG CÁCH NÀY:
/*
const PartTestContent = memo(({
  isSignedIn,
  user,
  selectedExam,
  handleExamChange,
  testType,
  handleTestTypeChange,
  selectedPart,
  handlePartChange,
  partData,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  answers,
  handleAnswerSelect,
  showResults,
  handleSubmit,
  handleReset,
  score,
  onStartFullExam
}) => (
  // ... same JSX ...
), (prev, next) => {
  // ✅ PHẢI CHECK ANSWERS!
  return prev.selectedExam === next.selectedExam &&
    prev.selectedPart === next.selectedPart &&
    prev.currentQuestionIndex === next.currentQuestionIndex &&
    prev.showResults === next.showResults &&
    prev.isSignedIn === next.isSignedIn &&
    prev.answers === next.answers; // ← THIẾU DÒNG NÀY!
});
*/

// --- Main App Component ---

function App() {
  const [showChat, setShowChat] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ✅ useRef for handlers to avoid recreating functions
  const modalStateRef = useRef({ chat: false, auth: false });

  const {
    selectedExam,
    testType,
    handleTestTypeChange,
    practiceType,
    handlePracticeTypeChange,
    selectedPart,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    handleAnswerSelect,
    handleSubmit,
    showResults,
    handleReset,
    handleExamChange,
    handlePartChange,
    isSignedIn,
    user,
  } = useAppState();

  // ✅ Optimized callbacks - giữ reference
  const handleChatClose = useCallback(() => {
    setShowChat(false);
  }, []);

  const handleChatOpen = useCallback(() => {
    setShowChat(true);
  }, []);

  const handleAuthClose = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  const handleAuthOpen = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  // ✅ Memoized partData - efficient
  const partData = useMemo(() => {
    if (practiceType) return null;
    return EXAM_DATA[selectedExam]?.parts?.[selectedPart] || null;
  }, [practiceType, selectedExam, selectedPart]);

  // ✅ Optimized score calculation - for loop instead of forEach
  const score = useMemo(() => {
    if (practiceType || !partData?.questions) {
      return { correct: 0, total: 0, percentage: 0 };
    }

    let correct = 0;
    const total = partData.questions.length;

    // ✅ for loop là nhanh nhất
    for (let i = 0; i < total; i++) {
      const q = partData.questions[i];
      if (answers[q.id] === q.correct) {
        correct++;
      }
    }

    return {
      correct,
      total,
      percentage: total > 0 ? (correct / total) * 100 : 0
    };
  }, [practiceType, partData, answers]);

  // ✅ Start full exam handler - memoized
  const handleStartFullExam = useCallback(() => {
    handleTestTypeChange('full');
  }, [handleTestTypeChange]);

  // ✅ Render main content - optimized logic
  const renderMainContent = useCallback(() => {
    // Practice Mode - Vocabulary
    if (practiceType === 'vocabulary') {
      return <VocabularyPractice />;
    }

    // Practice Mode - Grammar
    if (practiceType === 'grammar') {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <GrammarReview
            answers={answers}
            onAnswerSelect={handleAnswerSelect}
            onSubmit={handleSubmit}
          />
        </Suspense>
      );
    }

    // Full Exam Mode
    if (testType === 'full') {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <FullExamMode
            examData={EXAM_DATA}
            onComplete={() => handleTestTypeChange('')}
          />
        </Suspense>
      );
    }

    // Part Test Mode (Default)
    return (
      <PartTestContent
        isSignedIn={isSignedIn}
        user={user}
        selectedExam={selectedExam}
        handleExamChange={handleExamChange}
        testType={testType}
        handleTestTypeChange={handleTestTypeChange}
        selectedPart={selectedPart}
        handlePartChange={handlePartChange}
        partData={partData}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        answers={answers}
        handleAnswerSelect={handleAnswerSelect}
        showResults={showResults}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        score={score}
        onStartFullExam={handleStartFullExam}
      />
    );
  }, [
    practiceType, testType, answers, handleAnswerSelect, handleSubmit,
    handleTestTypeChange, isSignedIn, user, selectedExam, handleExamChange,
    selectedPart, handlePartChange, partData, currentQuestionIndex,
    setCurrentQuestionIndex, showResults, handleReset, score, handleStartFullExam
  ]);

  return (
    <MainLayout
      testType={testType}
      onTestTypeChange={handleTestTypeChange}
      practiceType={practiceType}
      onPracticeTypeChange={handlePracticeTypeChange}
      user={user}
      onAuthClick={handleAuthOpen}
      onChatClick={handleChatOpen}
    >
      {/* Main Content */}
      <div className="relative z-10 p-4 sm:p-6">
        <Suspense fallback={<LoadingSpinner />}>
          {renderMainContent()}
        </Suspense>
        {showAuthModal && <AuthModal onClose={handleAuthClose} />}
      </div>

      {/* Chat Button - Memoized */}
      <ChatButton onClick={handleChatOpen} />

      {/* Chat Modal */}
      {showChat && (
        <ChatModal onClose={handleChatClose} user={user} />
      )}
    </MainLayout>
  );
}

export default App;