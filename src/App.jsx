import React, { useMemo, useState, lazy, Suspense, useCallback, memo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { loadExamData, getAllExamMetadata } from './data/examData'; // ✅ Fixed import
import { useAppState } from './hooks/useAppState';
import MainLayout from './components/layout/MainLayout';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import HeaderSection from './components/sections/HeaderSection';
import UserProfile from './components/Auth/UserProfile.jsx';
import PartSelector from './components/Display/PartSelector.jsx';
import ContentDisplay from './components/Display/ContentDisplay';
import QuestionDisplay from './components/Display/QuestionDisplay.jsx';
import ResultsDisplay from './components/Display/ResultsDisplay.jsx';
import VocabularyPractice from './components/Voca/VocabularyPractice.jsx';
import AuthModal from './components/Auth/AuthModal.jsx';
import { useOnlineUsers } from './hooks/useOnlineUsers.js';
import ExamAnswersPage from './components/pages/ExamAnswersPage.jsx';
import { ROUTES } from './config/routes';
import HomePage from './pages/HomePage.jsx';
const AdminApp = lazy(() => import('./admin/AdminApp'));

// ✅ Lazy load components
const GrammarReview = lazy(() => import('./components/Grama/GrammarReview.jsx'));
const FullExamMode = lazy(() => import('./components/FullExam/FullExamMode.jsx'));

import { Target, Trophy, FileText, Zap, GraduationCap, ArrowLeft } from 'lucide-react';

// ========================================
// StatCard (Mobile Optimized)
// ========================================
const StatCard = memo(({ icon: Icon, label, value, color }) => {
  const colorMap = {
    orange: 'border-orange-300 text-orange-700 bg-orange-50',
    green: 'border-green-300 text-green-700 bg-green-50',
    red: 'border-red-300 text-red-700 bg-red-50',
    brown: 'border-amber-300 text-amber-700 bg-amber-50',
  };

  return (
    <div className={`rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 shadow-sm border-2 transition-shadow hover:shadow-md ${colorMap[color]} text-center will-change-auto`}>
      <Icon className="w-4 h-4 sm:w-5 md:w-6 mx-auto mb-1 opacity-80" />
      <p className="text-xs font-semibold uppercase tracking-tight text-gray-600">{label}</p>
      <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
    </div>
  );
});

StatCard.displayName = 'StatCard';

// ========================================
// StatsSection (Mobile Optimized)
// ========================================
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

// ========================================
// FullExamPrompt (Mobile Optimized)
// ========================================
const FullExamPrompt = memo(({ onStartFullExam }) => (
  <section className="bg-white rounded-lg sm:rounded-2xl border border-gray-200 p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
      <div className="p-2.5 sm:p-3 md:p-4 rounded-full bg-amber-100 border border-amber-300 flex-shrink-0">
        <GraduationCap className="w-5 h-5 sm:w-6 md:w-8 text-amber-700" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800 mb-1.5 sm:mb-2">
          Thi Thử <span className="text-amber-600">Toàn Phần</span>
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2 sm:mb-3">
          Thi mô phỏng 60 câu với timer chuẩn
        </p>
      </div>

      <button
        onClick={onStartFullExam}
        className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg sm:rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-xs sm:text-sm md:text-base whitespace-nowrap"
      >
        Bắt đầu
      </button>
    </div>
  </section>
));

FullExamPrompt.displayName = 'FullExamPrompt';

// ========================================
// BackButton (Mobile Optimized)
// ========================================
const BackButton = memo(({ onClick, show = true }) => {
  if (!show) return null;
  
  return (
   <div className="w-full mb-6 mt-4"> {/* w-full để chiếm hết hàng, mb-6 và mt-4 để tạo khoảng cách */}
    <button
        onClick={onClick}
        // Giữ lại mr-auto để đẩy nút sang trái, bỏ mb-4 cũ (vì đã có ở div cha)
        className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-blue-900 to-blue-900 hover:from-blue-700 hover:to-blue-700 text-yellow-400 rounded-lg sm:rounded-lg md:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md text-xs sm:text-sm md:text-base mr-auto"
    >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 md:w-5 transition-transform duration-300 group-hover:-translate-x-1" />
        <span>Quay lại</span>
    </button>
</div>
  );
});

BackButton.displayName = 'BackButton';

// ========================================
// Memoized Components
// ========================================
const MemoizedHeaderSection = memo(HeaderSection);
const MemoizedUserProfile = memo(UserProfile);
const MemoizedPartSelector = memo(PartSelector);
const MemoizedContentDisplay = memo(ContentDisplay);
const MemoizedQuestionDisplay = memo(QuestionDisplay);
const MemoizedResultsDisplay = memo(ResultsDisplay);

// ========================================
// PartTestContent (Mobile Optimized)
// ========================================
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
}) => {
  const isSplitLayoutPart = testType === 'reading' && 
    (selectedPart === 'part6' || selectedPart === 'part7' || selectedPart === 'part8');

  return (
    <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
      {/* ===== HEADER SECTION ===== */}
      <MemoizedHeaderSection isSignedIn={isSignedIn} user={user} />
      
      {/* ===== USER PROFILE (if signed in) ===== */}
      {isSignedIn && <MemoizedUserProfile />}
      
      {/* ===== PART SELECTOR ===== */}
      <MemoizedPartSelector
        selectedExam={selectedExam}
        onExamChange={handleExamChange}
        testType={testType}
        onTestTypeChange={(e) => handleTestTypeChange(e.target.value)}
        selectedPart={selectedPart}
        onPartChange={handlePartChange}
      />

      {/* ========================================
          LAYOUT CHIA ĐÔI CHO READING PART 6, 7, 8
          ======================================== */}
      {isSplitLayoutPart ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          
          {/* ===== CỘT TRÁI: VĂN BẢN ===== */}
          <div className="order-1 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <MemoizedContentDisplay
              partData={partData}
              selectedPart={selectedPart}
              currentQuestionIndex={currentQuestionIndex}
              testType={testType}
            />
          </div>
          
          {/* ===== CỘT PHẢI: CÂU HỎI ===== */}
          <div className="order-2">
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
          </div>
        </div>
      ) : (
        /* ========================================
           LAYOUT THÔNG THƯỜNG (LISTENING & READING PART 1-5)
           ======================================== */
        <>
          {/* ===== VĂN BẢN / SCRIPT ===== */}
          <MemoizedContentDisplay
            partData={partData}
            selectedPart={selectedPart}
            currentQuestionIndex={currentQuestionIndex}
            testType={testType}
          />

          {/* ===== CÂU HỎI ===== */}
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
        </>
      )}

      {/* ===== RESULTS DISPLAY (after submit) ===== */}
      {showResults && (
        <MemoizedResultsDisplay
          score={score}
          partData={partData}
          answers={answers}
          onReset={handleReset}
        />
      )}

      {/* ===== STATS SECTION ===== */}
      <StatsSection score={score} isSignedIn={isSignedIn} />
      
      {/* ===== FULL EXAM PROMPT ===== */}
      <FullExamPrompt onStartFullExam={onStartFullExam} />
    </div>
  );
});

PartTestContent.displayName = 'PartTestContent';

// ========================================
// PAGE COMPONENTS
// ========================================

// Test Page
const TestPage = memo(({
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
    onStartFullExam={onStartFullExam}
  />
));

TestPage.displayName = 'TestPage';

// Profile Page
const ProfilePage = memo(({ user, handleBackToTest }) => (
  <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4">
    <BackButton onClick={handleBackToTest} show={true} />
    <MemoizedUserProfile currentUser={user} />
  </div>
));

ProfilePage.displayName = 'ProfilePage';

// ✅ Full Exam Page - Load exam data dynamically
const FullExamPage = memo(({ handleTestTypeChange }) => {
  const [examData, setExamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllExams = async () => {
      setIsLoading(true);
      try {
        // Load all exams metadata
        const examList = getAllExamMetadata();
        
        // Load all exam data in parallel
        const loadPromises = examList.map(exam => loadExamData(exam.id));
        const loadedExams = await Promise.all(loadPromises);
        
        // Convert to EXAM_DATA format
        const data = {};
        examList.forEach((exam, index) => {
          data[exam.id] = loadedExams[index];
        });
        
        setExamData(data);
      } catch (error) {
        console.error('Error loading exam data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllExams();
  }, []);

  if (isLoading || !examData) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FullExamMode
        examData={examData}
        onComplete={() => handleTestTypeChange('')}
      />
    </Suspense>
  );
});

FullExamPage.displayName = 'FullExamPage';

// Grammar Page
const GrammarPage = memo(({ answers, handleAnswerSelect, handleSubmit }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <GrammarReview
      answers={answers}
      onAnswerSelect={handleAnswerSelect}
      onSubmit={handleSubmit}
    />
  </Suspense>
));

GrammarPage.displayName = 'GrammarPage';

// Vocabulary Page
const VocabularyPage = memo(() => <VocabularyPractice />);

VocabularyPage.displayName = 'VocabularyPage';

// Answers Page
const AnswersPage = memo(({ handleBackToMain }) => (
  <div>
    <BackButton onClick={handleBackToMain} show={true} />
    <ExamAnswersPage />
  </div>
));

AnswersPage.displayName = 'AnswersPage';

// ========================================
// AppContent Component (với Routes)
// ========================================
const AppContent = memo(() => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentExamData, setCurrentExamData] = useState(null);

  // ✅ Hook online users
  const { onlineCount, totalUsers } = useOnlineUsers();

  // ✅ App state từ custom hook
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

  // ✅ Load current exam data
  useEffect(() => {
    const loadCurrentExam = async () => {
      if (!selectedExam) return;
      
      try {
        const data = await loadExamData(selectedExam);
        setCurrentExamData(data);
      } catch (error) {
        console.error('Error loading exam:', error);
        setCurrentExamData(null);
      }
    };

    loadCurrentExam();
  }, [selectedExam]);

  // ===== EVENT HANDLERS =====
  const handleAuthClose = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  const handleAuthOpen = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  const handleViewProfile = useCallback(() => {
    navigate(ROUTES.PROFILE);
  }, [navigate]);

  const handleBackToTest = useCallback(() => {
    navigate(ROUTES.TEST);
  }, [navigate]);

  const handleGoToAnswers = useCallback(() => {
    navigate(ROUTES.ANSWERS);
  }, [navigate]);

  const handleBackToMain = useCallback(() => {
    navigate(ROUTES.TEST);
  }, [navigate]);

  const handleStartFullExam = useCallback(() => {
    handleTestTypeChange('full');
    navigate(ROUTES.FULL_EXAM);
  }, [handleTestTypeChange, navigate]);

  // ===== COMPUTED VALUES =====
  
  // Lấy dữ liệu part hiện tại
  const partData = useMemo(() => {
    if (practiceType || !currentExamData) return null;
    return currentExamData.parts?.[selectedPart] || null;
  }, [practiceType, currentExamData, selectedPart]);

  // Tính điểm số
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

  // ===== MAIN RENDER =====
  return (
    <MainLayout
      testType={testType}
      onTestTypeChange={handleTestTypeChange}
      practiceType={practiceType}
      onPracticeTypeChange={handlePracticeTypeChange}
      user={user}
      onAuthClick={handleAuthOpen}
      onProfileClick={handleViewProfile}
      viewMode="test"
      onlineCount={onlineCount}
      totalUsers={totalUsers}
      onAnswersClick={handleGoToAnswers}
    >
      <div className="relative z-10 p-2 sm:p-4 md:p-6">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* ===== HOME PAGE ===== */}
            <Route 
              path={ROUTES.HOME}
              element={<HomePage />}
            />

            {/* ===== TEST PAGE ===== */}
            <Route 
              path={ROUTES.TEST}
              element={
                <TestPage
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
              }
            />

            {/* ===== FULL EXAM PAGE ===== */}
            <Route 
              path={ROUTES.FULL_EXAM}
              element={<FullExamPage handleTestTypeChange={handleTestTypeChange} />}
            />

            {/* ===== GRAMMAR PAGE ===== */}
            <Route 
              path={ROUTES.GRAMMAR}
              element={
                <GrammarPage 
                  answers={answers}
                  handleAnswerSelect={handleAnswerSelect}
                  handleSubmit={handleSubmit}
                />
              }
            />

            {/* ===== VOCABULARY PAGE ===== */}
            <Route 
              path={ROUTES.VOCABULARY}
              element={<VocabularyPage />}
            />

            {/* ===== PROFILE PAGE ===== */}
            <Route 
              path={ROUTES.PROFILE}
              element={
                <ProfilePage 
                  user={user}
                  handleBackToTest={handleBackToTest}
                />
              }
            />

            {/* ===== ANSWERS PAGE ===== */}
            <Route 
              path={ROUTES.ANSWERS}
              element={
                <AnswersPage 
                  handleBackToMain={handleBackToMain}
                />
              }
            />
          </Routes>
        </Suspense>

        {/* ===== AUTH MODAL ===== */}
        {showAuthModal && <AuthModal onClose={handleAuthClose} />}
      </div>
    </MainLayout>
  );
});

AppContent.displayName = 'AppContent';

// ========================================
// Main App Component (with Router)
// ========================================
function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />
          
          {/* User Routes */}
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;