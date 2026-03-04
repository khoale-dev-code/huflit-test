import React, { useMemo, useState, lazy, Suspense, memo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Data & Hooks
import { loadExamData, getAllExamMetadata } from './data/examData';
import { useAppState } from './hooks/useAppState';
import { useSplashScreen } from './hooks/useSplashScreen.js';
import { useWelcomeModal } from './hooks/useWelcomeModal.js';

// Components
import MainLayout from './components/layout/MainLayout';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import UserProfile from './components/Auth/UserProfile.jsx';
import PartSelector from './components/Display/PartSelector.jsx';
import ContentDisplay from './components/Display/ContentDisplay';
import QuestionDisplay from './components/Display/QuestionDisplay.jsx';
import ResultsDisplay from './components/Display/Result/ResultsDisplay.jsx';
import VocabularyPractice from './components/Voca/VocabularyPractice.jsx';
import AuthModal from './components/Auth/AuthModal.jsx';
import WelcomeModal from './components/modals/WelcomeModal.jsx';
import ExamAnswersPage from './components/pages/ExamAnswersPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { ROUTES } from './config/routes';

// Icons
import { Trophy, FileText, Zap, BarChart3 } from 'lucide-react';

// Lazy Loaded Components
const AdminApp      = lazy(() => import('./admin/AdminApp'));
const NotFoundPage  = lazy(() => import('./components/pages/NotFoundPage.jsx'));
const GrammarReview = lazy(() => import('./components/Grama/GrammarReview.jsx'));
const FullExamMode  = lazy(() => import('./components/FullExam/FullExamMode.jsx'));

// ─────────────────────────────────────────────
// InfoBadge
// ─────────────────────────────────────────────
const InfoBadge = memo(({ icon: Icon, label, value, color = 'indigo' }) => {
  const colorMap = {
    indigo:  'bg-indigo-50 border-indigo-200 text-indigo-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    amber:   'bg-amber-50 border-amber-200 text-amber-700',
    purple:  'bg-purple-50 border-purple-200 text-purple-700',
  };
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${colorMap[color]}`}>
      <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold truncate">{value}</p>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// StatsGrid
// ─────────────────────────────────────────────
const StatsGrid = memo(({ score, isSignedIn }) => {
  if (!isSignedIn || score.total === 0) return null;
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-100">
          <BarChart3 className="w-5 h-5 text-indigo-700" strokeWidth={2} />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Kết quả bài làm</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <InfoBadge icon={FileText} label="Tổng câu" value={score.total}                       color="indigo"  />
        <InfoBadge icon={Trophy}   label="Câu đúng" value={score.correct}                     color="emerald" />
        <InfoBadge icon={FileText} label="Câu sai"  value={score.total - score.correct}       color="amber"   />
        <InfoBadge icon={Zap}      label="Tỉ lệ"    value={`${score.percentage.toFixed(0)}%`} color="purple"  />
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// PartTestContent — chỉ chứa phần làm bài
// ✅ UserProfile đã được xóa khỏi đây
// ─────────────────────────────────────────────
const PartTestContent = memo(({
  isSignedIn,
  selectedExam, handleExamChange,
  testType, handleTestTypeChange,
  selectedPart, handlePartChange,
  partData,
  currentQuestionIndex, setCurrentQuestionIndex,
  answers, handleAnswerSelect,
  showResults, handleSubmit, handleReset,
  score,
}) => {
  useEffect(() => {
    if (showResults) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showResults]);

  return (
    <div className="w-full space-y-6">
      {/* ✅ KHÔNG còn <UserProfile /> ở đây nữa */}

      <PartSelector
        selectedExam={selectedExam}
        onExamChange={handleExamChange}
        testType={testType}
        onTestTypeChange={(e) => handleTestTypeChange(e.target.value)}
        selectedPart={selectedPart}
        onPartChange={handlePartChange}
      />

      {showResults ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultsDisplay score={score} partData={partData} answers={answers} onReset={handleReset} />
          <StatsGrid score={score} isSignedIn={isSignedIn} />
        </div>
      ) : (
        <div className="w-full space-y-8">
          <ContentDisplay
            partData={partData} selectedPart={selectedPart}
            currentQuestionIndex={currentQuestionIndex}
            testType={testType} examId={selectedExam}
          />
          <QuestionDisplay
            selectedPart={selectedPart} selectedExam={selectedExam}
            partData={partData} currentQuestionIndex={currentQuestionIndex}
            onQuestionChange={setCurrentQuestionIndex}
            answers={answers} onAnswerSelect={handleAnswerSelect}
            showResults={showResults}
            onSubmit={handleSubmit}
            testType={testType}
          />
        </div>
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// FullExamContainer
// ─────────────────────────────────────────────
const FullExamContainer = memo(({ onComplete }) => {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const list   = getAllExamMetadata();
        const loaded = await Promise.all(list.map((ex) => loadExamData(ex.id)));
        const dataMap = {};
        list.forEach((ex, i) => { dataMap[ex.id] = loaded[i]; });
        setExamData(dataMap);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  if (loading) return <LoadingSpinner message="Đang tải dữ liệu toàn bộ đề thi..." />;
  return <FullExamMode examData={examData} onComplete={onComplete} />;
});

// ─────────────────────────────────────────────
// AppContent
// ─────────────────────────────────────────────
const AppContent = memo(() => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal]     = useState(false);
  const [currentExamData, setCurrentExamData] = useState(null);
  const { isOpen: showWelcome, onClose: closeWelcome } = useWelcomeModal();

  const {
    selectedExam, testType, handleTestTypeChange,
    practiceType, handlePracticeTypeChange,
    selectedPart, currentQuestionIndex, setCurrentQuestionIndex,
    answers, handleAnswerSelect,
    handleSubmit, showResults, handleReset,
    handleExamChange, handlePartChange,
    isSignedIn, user,
  } = useAppState();

  useEffect(() => {
    if (selectedExam) {
      loadExamData(selectedExam)
        .then(setCurrentExamData)
        .catch(() => setCurrentExamData(null));
    }
  }, [selectedExam]);

  const partData = useMemo(() =>
    (!practiceType && currentExamData)
      ? (currentExamData.parts?.[selectedPart] || null)
      : null
  , [practiceType, currentExamData, selectedPart]);

  const score = useMemo(() => {
    if (!partData?.questions) return { correct: 0, total: 0, percentage: 0 };
    const total   = partData.questions.length;
    const correct = partData.questions.filter((q) => answers[q.id] === q.correct).length;
    return { correct, total, percentage: total > 0 ? (correct / total) * 100 : 0 };
  }, [partData, answers]);

  // ✅ Bake partData vào handleSubmit để useAppState tính điểm + saveProgress
  const handleSubmitWithData = useMemo(
    () => () => handleSubmit(partData),
    [handleSubmit, partData]
  );

  return (
    <>
      <MainLayout
        testType={testType}
        onTestTypeChange={handleTestTypeChange}
        practiceType={practiceType}
        onPracticeTypeChange={handlePracticeTypeChange}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
        onProfileClick={() => navigate(ROUTES.PROFILE)}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />

            {/* ✅ /test — chỉ làm bài, không có dashboard */}
            <Route path={ROUTES.TEST} element={
              <PartTestContent
                isSignedIn={isSignedIn}
                selectedExam={selectedExam}          handleExamChange={handleExamChange}
                testType={testType}                  handleTestTypeChange={handleTestTypeChange}
                selectedPart={selectedPart}          handlePartChange={handlePartChange}
                partData={partData}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                answers={answers}                    handleAnswerSelect={handleAnswerSelect}
                showResults={showResults}
                handleSubmit={handleSubmitWithData}
                handleReset={handleReset}
                score={score}
              />
            } />

            <Route path={ROUTES.FULL_EXAM} element={
              <FullExamContainer onComplete={() => handleTestTypeChange('')} />
            } />

            <Route path={ROUTES.GRAMMAR} element={
              <GrammarReview
                answers={answers}
                onAnswerSelect={handleAnswerSelect}
                onSubmit={handleSubmitWithData}
              />
            } />

            <Route path={ROUTES.VOCABULARY} element={<VocabularyPractice />} />

            {/* ✅ /profile — nơi duy nhất hiển thị UserProfile / Dashboard */}
            <Route path={ROUTES.PROFILE} element={<UserProfile />} />

            <Route path={ROUTES.ANSWERS} element={<ExamAnswersPage />} />
            <Route path="*"              element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </MainLayout>

      <WelcomeModal isOpen={showWelcome} onClose={closeWelcome} />
    </>
  );
});

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function App() {
  const showSplash = useSplashScreen(2000);
  if (showSplash) return <LoadingSpinner message="Khởi động hệ thống..." />;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*"       element={<AppContent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}