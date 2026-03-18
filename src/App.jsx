// App.jsx
import React, { useState, useEffect, useCallback, useMemo, memo, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// 🚀 FIX 1: Import Motion để tránh lỗi ReferenceError trong toàn bộ hệ thống App
import { motion as Motion, AnimatePresence } from 'framer-motion';

// Data & Hooks
import { loadExamData } from './data/examData';
import { useAppState } from './hooks/useAppState';
import { useExamResult } from './hooks/useExamResult';
import { useSplashScreen } from './hooks/useSplashScreen.js';
import { useWelcomeModal } from './hooks/useWelcomeModal.js';
import { useTranslationProtection } from './hooks/useTranslationProtection.jsx';

// Components (Common)
import MainLayout from './components/layout/MainLayout';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import UserProfile from './components/Auth/UserProfile.jsx';
import PartSelector from './components/Display/PartSelector.jsx';
import ContentDisplay from './components/Display/ContentDisplay';
import QuestionDisplay from './components/Display/QuestionDisplay.jsx';
import ResultsDisplay from './components/Display/Result/ResultsDisplay.jsx';
import AuthModal from './components/Auth/AuthModal.jsx';
import WelcomeModal from './components/modals/WelcomeModal.jsx';
import ExamAnswersPage from './components/pages/ExamAnswersPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AuthPage from './components/Auth/AuthPage.jsx';
import { ROUTES } from './config/routes';

// Icons
import { Trophy, FileText, Zap, BarChart3 } from 'lucide-react';

// Lazy load Components
const AdminApp = lazy(() => import('./admin/AdminApp'));
const ExamManagement = lazy(() => import('./admin/pages/Exams/ExamManagement.jsx'));
const CreateExam = lazy(() => import('./admin/pages/Exams/CreateExam.jsx'));
const DetailsExam = lazy(() => import('./admin/pages/Exams/DetailsExam.jsx'));
const EditExam = lazy(() => import('./admin/pages/Exams/Edit-Exam/EditExam.jsx'));
const MigrateData = lazy(() => import('./admin/scripts/MigrateFirestoreToSupabase.jsx'));
const UserManagement = lazy(() => import('./admin/pages/Users/UserManagement.jsx'));
const LessonManagement = lazy(() => import('./admin/pages/Lessons/LessonManagement.jsx'));
const LessonForm = lazy(() => import('./admin/pages/Lessons/LessonForm.jsx'));
const AdminLessonDetails = lazy(() => import('./admin/pages/Lessons/LessonDetails.jsx'));

const LessonList = lazy(() => import('./components/Lessons/LessonList.jsx'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage.jsx'));
const FullExamMode = lazy(() => import('./components/FullExam/FullExamMode.jsx'));
const HistoryTest = lazy(() => import('./components/HistoryTest.jsx'));
const LessonDetailUser = lazy(() => import('./components/Lessons/LessonDetail.jsx'));

// ─────────────────────────────────────────────
// Sub-components (Dùng Motion để mượt hơn)
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

const StatsGrid = memo(({ scoreResult, isSignedIn }) => {
  if (!isSignedIn || !scoreResult || scoreResult.total === 0) return null;
  return (
    <Motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm mt-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-100">
          <BarChart3 className="w-5 h-5 text-indigo-700" strokeWidth={2} />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Kết quả bài làm</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <InfoBadge icon={FileText} label="Tổng câu"  value={scoreResult.total} color="indigo"  />
        <InfoBadge icon={Trophy}   label="Câu đúng"  value={scoreResult.correct} color="emerald" />
        <InfoBadge icon={FileText} label="Câu sai"   value={scoreResult.total - scoreResult.correct} color="amber"   />
        <InfoBadge icon={Zap}      label="Tỉ lệ"     value={`${scoreResult.percentage.toFixed(0)}%`} color="purple"  />
      </div>
    </Motion.div>
  );
});

const PartTestContent = memo((props) => {
  const {
    isSignedIn, selectedExam, handleExamChange, testType, handleTestTypeChange,
    selectedPart, handlePartChange, partData, currentExamData,
    currentQuestionIndex, setCurrentQuestionIndex, answers, handleAnswerSelect,
    showResults, handleSubmit, handleReset, scoreResult, convertedScore,
    examCategory, isLoadingExam,
  } = props;

  useEffect(() => {
    if (!currentExamData?.parts) return;
    let availableParts = [];
    if (Array.isArray(currentExamData.parts)) {
      availableParts = currentExamData.parts.filter(p => p.type === testType).map(p => String(p.id));
    } else {
      availableParts = Object.entries(currentExamData.parts).filter(([, data]) => data.type === testType).map(([key]) => String(key));
    }
    if (availableParts.length === 0) return;
    const isCurrentPartValid = availableParts.includes(String(selectedPart));
    if (!isCurrentPartValid) handlePartChange({ target: { value: availableParts[0] } });
  }, [testType, currentExamData, selectedPart, handlePartChange]);

  useEffect(() => {
    if (showResults) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showResults]);

  const handleSelectPart = useCallback(() => {
    const selector = document.querySelector('[role="listbox"]');
    if (selector) selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div className="w-full space-y-6">
      <PartSelector
        selectedExam={selectedExam}    onExamChange={handleExamChange}
        testType={testType}            onTestTypeChange={handleTestTypeChange}
        selectedPart={selectedPart}    onPartChange={handlePartChange}
      />

      <AnimatePresence mode="wait">
        {showResults ? (
          <Motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="duration-500"
          >
            <ResultsDisplay
              scoreResult={scoreResult}
              convertedScore={convertedScore}
              examCategory={examCategory}
              partData={partData}
              answers={answers}
              onReset={handleReset}
            />
            <StatsGrid scoreResult={scoreResult} isSignedIn={isSignedIn} />
          </Motion.div>
        ) : (
          <Motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full space-y-8 min-h-[100vh] relative transition-all duration-300"
          >
            <ContentDisplay
              partData={partData}
              selectedPart={selectedPart}
              currentQuestionIndex={currentQuestionIndex}
              testType={testType}
              examId={selectedExam}
              isLoading={isLoadingExam}
              onSelectPart={handleSelectPart}
              data-testid="content-display"
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
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ─────────────────────────────────────────────
// AppContent
// ─────────────────────────────────────────────
const AppContent = memo(() => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal]     = useState(false);
  const [currentExamData, setCurrentExamData] = useState(null);
  const [isLoadingExam, setIsLoadingExam]     = useState(false);
  const { isOpen: showWelcome, onClose: closeWelcome } = useWelcomeModal();

  useTranslationProtection();

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
    if (!selectedExam) return;
    setIsLoadingExam(true);
    
    loadExamData(selectedExam)
      .then((data) => {
        if (data && data.is_public === false) {
          alert("Đề thi này tạm thời không khả dụng do đang bảo trì!");
          handleExamChange({ target: { value: null } });
          setCurrentExamData(null);
          return;
        }
        setCurrentExamData(data);
      })
      .catch(() => setCurrentExamData(null))
      .finally(() => setIsLoadingExam(false));
  }, [selectedExam, handleExamChange]);

  const partData = useMemo(() => {
    if (practiceType || !currentExamData?.parts) return null;
    const safeSelectedPart = String(selectedPart);

    if (Array.isArray(currentExamData.parts)) {
      const found = currentExamData.parts.find((p) => String(p.id) === safeSelectedPart) || null;
      // 🚀 FIX 2: Sửa process.env thành import.meta.env.DEV cho môi trường Vite
      if (import.meta.env.DEV && !found) {
        console.warn(`[partData] Không tìm thấy part "${safeSelectedPart}".`);
      }
      return found;
    }
    return currentExamData.parts[safeSelectedPart] || currentExamData.parts[selectedPart] || null;
  }, [practiceType, currentExamData, selectedPart]);

  const examCategory = useMemo(() => currentExamData?.category ?? null, [currentExamData]);
  const { scoreResult, convertedScore } = useExamResult(partData, answers, examCategory);

  const handleSubmitWithData = useCallback(
    () => handleSubmit(partData, scoreResult, convertedScore, examCategory),
    [handleSubmit, partData, scoreResult, convertedScore, examCategory]
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
        <Suspense fallback={<LoadingSpinner message="Đang tải dữ liệu..." />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.TEST} element={
              <PartTestContent
                isSignedIn={isSignedIn}
                selectedExam={selectedExam}          handleExamChange={handleExamChange}
                testType={testType}                   handleTestTypeChange={handleTestTypeChange}
                selectedPart={selectedPart}          handlePartChange={handlePartChange}
                partData={partData}
                currentExamData={currentExamData}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                answers={answers}                    handleAnswerSelect={handleAnswerSelect}
                showResults={showResults}
                handleSubmit={handleSubmitWithData}
                handleReset={handleReset}
                scoreResult={scoreResult}
                convertedScore={convertedScore}
                examCategory={examCategory}
                isLoadingExam={isLoadingExam}
              />
            } />
            <Route path={ROUTES.FULL_EXAM} element={<FullExamMode onComplete={() => handleTestTypeChange('')} />} />
            <Route path="/learn"         element={<LessonList />} />
            <Route path="/learn/:slug"  element={<LessonDetailUser />} />
            <Route path={ROUTES.PROFILE} element={<UserProfile />} />
            <Route path={ROUTES.ANSWERS} element={<ExamAnswersPage />} />
            <Route path="/history/:id"  element={<HistoryTest />} />
            <Route path="*"             element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </MainLayout>
      <WelcomeModal isOpen={showWelcome} onClose={closeWelcome} />
    </>
  );
});

// ─────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────
export default function App() {
  const showSplash = useSplashScreen(2000);
  if (showSplash) return <LoadingSpinner message="Khởi động hệ thống..." />;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<div className="flex h-screen items-center justify-center"><LoadingSpinner message="Đang tải hệ thống..." /></div>}>
        <Routes>
          <Route path="/login"                    element={<AuthPage />} />
          <Route path="/admin/*"                  element={<AdminApp />} />
          {/* Group Routes Admin để gọn hơn */}
          <Route path="/admin/exams"              element={<ExamManagement />} />
          <Route path="/admin/exams/create"       element={<CreateExam />} />
          <Route path="/admin/exams/detail/:id"   element={<DetailsExam />} />
          <Route path="/admin/exams/edit/:id"     element={<EditExam />} />
          <Route path="/admin/users"              element={<UserManagement />} />
          <Route path="/admin/lessons"            element={<LessonManagement />} />
          <Route path="/admin/lessons/create"     element={<LessonForm />} />
          <Route path="/admin/lessons/edit/:id"   element={<LessonForm />} />
          <Route path="/admin/lessons/detail/:id" element={<AdminLessonDetails />} />
          <Route path="/migrate-data"             element={<MigrateData />} />
          <Route path="/*"                        element={<AppContent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}