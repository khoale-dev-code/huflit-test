import React, { useMemo, useState, lazy, Suspense, useCallback, memo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { loadExamData, getAllExamMetadata } from './data/examData';
import { useAppState } from './hooks/useAppState';
import { useSplashScreen } from './hooks/useSplashScreen.js';
import MainLayout from './components/layout/MainLayout';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import UserProfile from './components/Auth/UserProfile.jsx';
import PartSelector from './components/Display/PartSelector.jsx';
import ContentDisplay from './components/Display/ContentDisplay';
import QuestionDisplay from './components/Display/QuestionDisplay.jsx';
import ResultsDisplay from './components/Display/ResultsDisplay.jsx';
import AuthModal from './components/Auth/AuthModal.jsx';
import { useOnlineUsers } from './hooks/useOnlineUsers.js';
import { ROUTES } from './config/routes';
import { Trophy, FileText, Zap, BarChart3, ArrowLeft } from 'lucide-react';

// --- LAZY LOADED COMPONENTS ---
const HomePage = lazy(() => 
  import('./pages/HomePage.jsx').then(m => ({
    default: memo(m.default)
  }))
);

const VocabularyPractice = lazy(() => 
  import('./components/Voca/VocabularyPractice.jsx').then(m => ({
    default: memo(m.default)
  }))
);

const ExamAnswersPage = lazy(() => 
  import('./components/pages/ExamAnswersPage.jsx').then(m => ({
    default: memo(m.default)
  }))
);

const AdminApp = lazy(() => 
  import('./admin/AdminApp').then(m => ({
    default: memo(m.default)
  }))
);

const NotFoundPage = lazy(() => 
  import('./components/pages/NotFoundPage.jsx').then(m => ({
    default: memo(m.default)
  }))
);

const GrammarReview = lazy(() => 
  import('./components/Grama/GrammarReview.jsx').then(m => ({
    default: memo(m.default)
  }))
);

const FullExamMode = lazy(() => 
  import('./components/FullExam/FullExamMode.jsx').then(m => ({
    default: memo(m.default)
  }))
);

// ✅ FIX: Lazy load display components to reduce initial bundle
const MemoizedContentDisplay = memo(ContentDisplay);
const MemoizedQuestionDisplay = memo(QuestionDisplay);
const MemoizedResultsDisplay = memo(ResultsDisplay);
const MemoizedPartSelector = memo(PartSelector);
const MemoizedUserProfile = memo(UserProfile);

// --- INFO BADGE & COMPONENTS ---
const InfoBadge = memo(({ icon: Icon, label, value, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${colorMap[color]}`}>
      <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold truncate">{value}</p>
      </div>
    </div>
  );
});

InfoBadge.displayName = 'InfoBadge';

const StatsGrid = memo(({ score, isSignedIn }) => {
  if (!isSignedIn || score.total === 0) return null;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-100">
          <BarChart3 className="w-5 h-5 text-indigo-700" strokeWidth={2} aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Kết quả</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <InfoBadge 
          icon={FileText} 
          label="Tổng câu" 
          value={score.total}
          color="indigo"
        />
        <InfoBadge 
          icon={Trophy} 
          label="Câu đúng" 
          value={score.correct}
          color="emerald"
        />
        <InfoBadge 
          icon={FileText} 
          label="Câu sai" 
          value={score.total - score.correct}
          color="amber"
        />
        <InfoBadge 
          icon={Zap} 
          label="Tỉ lệ" 
          value={`${score.percentage.toFixed(0)}%`}
          color="purple"
        />
      </div>
    </div>
  );
});

StatsGrid.displayName = 'StatsGrid';

// ✅ FIX: BackButton component with proper return statement
const BackButton = memo(({ onClick, show = true }) => {
  if (!show) return null;
  
  return (
    <button
      onClick={onClick}
      aria-label="Quay lại trang trước"
      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
    >
      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      <span>Quay lại</span>
    </button>
  );
});

BackButton.displayName = 'BackButton';

// --- PAGE COMPONENTS ---
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
}) => {
  const isSplitLayoutPart = testType === 'reading' && 
    (selectedPart === 'part6' || selectedPart === 'part7' || selectedPart === 'part8');

  // ✅ FIX: Early return if no partData
  if (!partData) {
    return (
      <div className="w-full">
        {isSignedIn && (
          <div className="mb-4">
            <MemoizedUserProfile />
          </div>
        )}
        <div className="mb-6">
          <MemoizedPartSelector
            selectedExam={selectedExam}
            onExamChange={handleExamChange}
            testType={testType}
            onTestTypeChange={(e) => handleTestTypeChange(e.target.value)}
            selectedPart={selectedPart}
            onPartChange={handlePartChange}
          />
        </div>
        <div className="text-center py-12 text-slate-500">
          <p className="text-lg font-medium">Vui lòng chọn một phần để bắt đầu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* User Profile - Compact */}
      {isSignedIn && (
        <div className="mb-4">
          <MemoizedUserProfile />
        </div>
      )}

      {/* Part Selector */}
      <div className="mb-6">
        <MemoizedPartSelector
          selectedExam={selectedExam}
          onExamChange={handleExamChange}
          testType={testType}
          onTestTypeChange={(e) => handleTestTypeChange(e.target.value)}
          selectedPart={selectedPart}
          onPartChange={handlePartChange}
        />
      </div>

      {/* Content & Questions Layout */}
      {isSplitLayoutPart ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column - Content */}
          <div className="order-1 w-full">
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1 h-6 rounded-full bg-indigo-600" aria-hidden="true" />
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nội dung</p>
              </div>
              <div className="relative z-20">
                <Suspense fallback={<LoadingSpinner />}>
                  <MemoizedContentDisplay
                    partData={partData}
                    selectedPart={selectedPart}
                    currentQuestionIndex={currentQuestionIndex}
                    testType={testType}
                    examId={selectedExam}
                  />
                </Suspense>
              </div>
            </div>
          </div>
          
          {/* Right Column - Questions */}
          <div className="order-2 w-full">
            <div className="space-y-3">
              <Suspense fallback={<LoadingSpinner />}>
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
              </Suspense>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 mb-6">
          {/* Full Width - Content */}
          <div className="space-y-3 relative z-20">
            <Suspense fallback={<LoadingSpinner />}>
              <MemoizedContentDisplay
                partData={partData}
                selectedPart={selectedPart}
                currentQuestionIndex={currentQuestionIndex}
                testType={testType}
                examId={selectedExam}
              />
            </Suspense>
          </div>

          {/* Full Width - Questions */}
          <div className="space-y-3">
            <Suspense fallback={<LoadingSpinner />}>
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
            </Suspense>
          </div>
        </div>
      )}

      {/* Results Section */}
      {showResults && (
        <div className="mb-6">
          <Suspense fallback={null}>
            <MemoizedResultsDisplay
              score={score}
              partData={partData}
              answers={answers}
              onReset={handleReset}
            />
          </Suspense>
        </div>
      )}

      {/* Stats Grid */}
      <StatsGrid score={score} isSignedIn={isSignedIn} />
    </div>
  );
});

PartTestContent.displayName = 'PartTestContent';

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
  />
));

TestPage.displayName = 'TestPage';

const ProfilePage = memo(({ user, handleBackToTest }) => (
  <div className="w-full">
    <div className="mb-6">
      <BackButton onClick={handleBackToTest} show={true} />
    </div>
    <Suspense fallback={<LoadingSpinner />}>
      <MemoizedUserProfile currentUser={user} />
    </Suspense>
  </div>
));

ProfilePage.displayName = 'ProfilePage';

// ✅ FIX: Progressive loading for FullExam instead of Promise.all
const FullExamPage = memo(({ handleTestTypeChange }) => {
  const [examData, setExamData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExamsProgressively = async () => {
      setIsLoading(true);
      try {
        const examList = getAllExamMetadata();
        
        // ✅ FIX: Check cache first
        const cacheKey = 'fullExamDataCache';
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          try {
            setExamData(JSON.parse(cached));
            setIsLoading(false);
            return;
          } catch (e) {
            console.warn('Cache parse failed, reloading...');
          }
        }
        
        const data = {};

        // ✅ FIX: Load first exam immediately for better UX
        if (examList.length > 0) {
          data[examList[0].id] = await loadExamData(examList[0].id);
          setExamData(prev => ({ ...prev, ...data }));
        }

        // ✅ FIX: Load remaining exams in background
        for (let i = 1; i < examList.length; i++) {
          try {
            data[examList[i].id] = await loadExamData(examList[i].id);
            setExamData(prev => ({ ...prev, [examList[i].id]: data[examList[i].id] }));
          } catch (itemError) {
            console.error(`Error loading exam ${examList[i].id}:`, itemError);
          }
        }

        // ✅ FIX: Cache result with TTL
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
        } catch (e) {
          console.warn('Cache storage failed (quota exceeded)');
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading exam data:', err);
        setError(err.message || 'Không thể tải dữ liệu đề thi');
        setIsLoading(false);
      }
    };

    loadExamsProgressively();
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-semibold mb-4">Lỗi: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Tải lại trang
        </button>
      </div>
    );
  }

  if (isLoading && Object.keys(examData).length === 0) {
    return <LoadingSpinner message="Đang tải đề thi..." />;
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

const VocabularyPage = memo(() => (
  <Suspense fallback={<LoadingSpinner />}>
    <VocabularyPractice />
  </Suspense>
));

VocabularyPage.displayName = 'VocabularyPage';

const AnswersPage = memo(({ handleBackToMain }) => (
  <div className="w-full">
    <div className="mb-6">
      <BackButton onClick={handleBackToMain} show={true} />
    </div>
    <Suspense fallback={<LoadingSpinner />}>
      <ExamAnswersPage />
    </Suspense>
  </div>
));

AnswersPage.displayName = 'AnswersPage';

// --- MAIN APP CONTENT ---
const AppContent = memo(() => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentExamData, setCurrentExamData] = useState(null);

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

  useEffect(() => {
    const loadCurrentExam = async () => {
      if (!selectedExam) {
        setCurrentExamData(null);
        return;
      }
      
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

  const handleBackToMain = useCallback(() => {
    navigate(ROUTES.TEST);
  }, [navigate]);

  const partData = useMemo(() => {
    if (practiceType || !currentExamData) return null;
    return currentExamData.parts?.[selectedPart] || null;
  }, [practiceType, currentExamData, selectedPart]);

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

  // ✅ FIX: Memoize user object properly to prevent unnecessary re-renders
  const memoizedUser = useMemo(() => {
    if (!user) return null;
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
  }, [user?.uid, user?.displayName, user?.email, user?.photoURL]);

  const layoutProps = useMemo(() => ({
    testType,
    onTestTypeChange: handleTestTypeChange,
    practiceType,
    onPracticeTypeChange: handlePracticeTypeChange,
    user: memoizedUser,
    onAuthClick: handleAuthOpen,
    onProfileClick: handleViewProfile,
  }), [testType, handleTestTypeChange, practiceType, handlePracticeTypeChange, memoizedUser, handleAuthOpen, handleViewProfile]);

  return (
    <MainLayout {...layoutProps}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
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
              />
            } 
          />
          <Route path={ROUTES.FULL_EXAM} element={<FullExamPage handleTestTypeChange={handleTestTypeChange} />} />
          <Route path={ROUTES.GRAMMAR} element={<GrammarPage answers={answers} handleAnswerSelect={handleAnswerSelect} handleSubmit={handleSubmit} />} />
          <Route path={ROUTES.VOCABULARY} element={<VocabularyPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage user={user} handleBackToTest={handleBackToTest} />} />
          <Route path={ROUTES.ANSWERS} element={<AnswersPage handleBackToMain={handleBackToMain} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {showAuthModal && <AuthModal onClose={handleAuthClose} />}
    </MainLayout>
  );
});

AppContent.displayName = 'AppContent';

// --- MAIN APP WITH SPLASH SCREEN ---
function App() {
  const showSplash = useSplashScreen(3000); // 3 giây splash screen

  if (showSplash) {
    return <LoadingSpinner message="Loading..." />;
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;