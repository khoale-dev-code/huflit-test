import React, { useMemo, useState, lazy, Suspense, useCallback, memo } from 'react';
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
import { useOnlineUsers } from './hooks/useOnlineUsers.js'; // ✅ ĐÃ SỬA: thêm .js

import { Target, Trophy, FileText, Zap, GraduationCap } from 'lucide-react';

// ✅ Lazy load components
const GrammarReview = lazy(() => import('./components/GrammarReview'));
const FullExamMode = lazy(() => import('./components/FullExamMode'));

// --- StatCard được memo hóa ---
const StatCard = memo(({ icon: Icon, label, value, color }) => {
  const colorMap = {
    orange: 'border-orange-300 text-orange-700 bg-orange-50',
    green: 'border-green-300 text-green-700 bg-green-50',
    red: 'border-red-300 text-red-700 bg-red-50',
    brown: 'border-amber-300 text-amber-700 bg-amber-50',
  };

  return (
    <div className={`rounded-xl p-3 sm:p-4 shadow-sm border-2 transition-shadow hover:shadow-md ${colorMap[color]} text-center will-change-auto`}>
      <Icon className="w-5 h-5 sm:w-6 mx-auto mb-1.5 opacity-80" />
      <p className="text-xs text-gray-600 font-semibold uppercase tracking-tight">{label}</p>
      <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
});

StatCard.displayName = 'StatCard';

// --- StatsSection được memo hóa ---
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
});

StatsSection.displayName = 'StatsSection';

// --- FullExamPrompt được memo hóa ---
const FullExamPrompt = memo(({ onStartFullExam }) => (
  <section className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <div className="p-3 sm:p-4 rounded-full bg-amber-100 border border-amber-300">
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
          Bắt đầu ngay
        </button>
      </div>
    </div>
  </section>
));

FullExamPrompt.displayName = 'FullExamPrompt';

// ✅ Memoized versions của các component để tránh re-render không cần thiết
const MemoizedHeaderSection = memo(HeaderSection);
const MemoizedUserProfile = memo(UserProfile);
const MemoizedPartSelector = memo(PartSelector);
const MemoizedContentDisplay = memo(ContentDisplay);
const MemoizedQuestionDisplay = memo(QuestionDisplay);
const MemoizedResultsDisplay = memo(ResultsDisplay);

// --- PartTestContent được memo hóa ---
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
  <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
    <MemoizedHeaderSection isSignedIn={isSignedIn} user={user} />
    {isSignedIn && <MemoizedUserProfile />}
    
    <MemoizedPartSelector
      selectedExam={selectedExam}
      onExamChange={handleExamChange}
      testType={testType}
      onTestTypeChange={(e) => handleTestTypeChange(e.target.value)}
      selectedPart={selectedPart}
      onPartChange={handlePartChange}
    />

    <MemoizedContentDisplay
      partData={partData}
      selectedPart={selectedPart}
      currentQuestionIndex={currentQuestionIndex}
      testType={testType}
    />

    <MemoizedQuestionDisplay
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
      <MemoizedResultsDisplay
        score={score}
        partData={partData}
        answers={answers}
        onReset={handleReset}
      />
    )}

    <StatsSection score={score} isSignedIn={isSignedIn} />
    <FullExamPrompt onStartFullExam={onStartFullExam} />
  </div>
));

PartTestContent.displayName = 'PartTestContent';

// --- Main App Component ---
function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [viewMode, setViewMode] = useState('test'); // 'test', 'profile'

  // ✅ BẮT BUỘC: GỌI HOOK ONLINE USERS Ở CẤP CAO NHẤT
  const { onlineCount, totalUsers } = useOnlineUsers();

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

  const handleAuthClose = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  const handleAuthOpen = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  const handleViewProfile = useCallback(() => {
    setViewMode('profile');
  }, []);

  const handleBackToTest = useCallback(() => {
    setViewMode('test');
  }, []);

  const partData = useMemo(() => {
    if (practiceType) return null;
    return EXAM_DATA[selectedExam]?.parts?.[selectedPart] || null;
  }, [practiceType, selectedExam, selectedPart]);

  const score = useMemo(() => {
    if (practiceType || !partData?.questions) {
      return { correct: 0, total: 0, percentage: 0 };
    }

    let correct = 0;
    const total = partData.questions.length;

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

  const handleStartFullExam = useCallback(() => {
    handleTestTypeChange('full');
  }, [handleTestTypeChange]);

  const renderMainContent = useCallback(() => {
    if (viewMode === 'profile') {
      return (
        <div className="max-w-7xl mx-auto">
          <button
            onClick={handleBackToTest}
            className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
          >
            ← Quay lại
          </button>
          <MemoizedUserProfile currentUser={user} />
        </div>
      );
    }

    if (practiceType === 'vocabulary') {
      return <VocabularyPractice />;
    }

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
    viewMode, handleBackToTest, user, practiceType, testType, answers, handleAnswerSelect, 
    handleSubmit, handleTestTypeChange, isSignedIn, selectedExam, handleExamChange,
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
      onProfileClick={handleViewProfile}
      viewMode={viewMode}
      // ✅ TRUYỀN DỮ LIỆU ONLINE USERS XUỐNG NAVBAR
      onlineCount={onlineCount}   // ✅ TRUYỀN
      totalUsers={totalUsers}     // ✅ TRUYỀN
    >
      <div className="relative z-10 p-4 sm:p-6">
        <Suspense fallback={<LoadingSpinner />}>
          {renderMainContent()}
        </Suspense>
        {showAuthModal && <AuthModal onClose={handleAuthClose} />}
      </div>
    </MainLayout>
  );
}

export default App;