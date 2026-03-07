import React, { useMemo, useState, lazy, Suspense, memo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Data & Hooks
import { loadExamData, getAllExamMetadata } from './data/examData';
import { useAppState } from './hooks/useAppState';
import { useSplashScreen } from './hooks/useSplashScreen.js';
import { useWelcomeModal } from './hooks/useWelcomeModal.js';
import { useExamAccess } from './hooks/useExamAccess.js';

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
import { Trophy, FileText, Zap, BarChart3, Lock, Star } from 'lucide-react';

// Lazy Loaded Components
const AdminApp      = lazy(() => import('./admin/AdminApp'));
const NotFoundPage  = lazy(() => import('./components/pages/NotFoundPage.jsx'));
const GrammarReview = lazy(() => import('./components/Grama/GrammarReview.jsx'));
const FullExamMode  = lazy(() => import('./components/FullExam/FullExamMode.jsx'));

// ─────────────────────────────────────────────
// 🛡️ TRANSLATION PROTECTION HOOK
// ─────────────────────────────────────────────
function useTranslationProtection() {
  useEffect(() => {
    const clearTranslateCookies = () => {
      try {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
        sessionStorage.removeItem('googtrans');
        localStorage.removeItem('googtrans');
      } catch { /* ignore */ }
    };
    clearTranslateCookies();

    const lockHtmlAttrs = () => {
      const html = document.documentElement;
      html.setAttribute('translate', 'no');
      html.setAttribute('class', 'notranslate');
      if (html.className.includes('translated-')) {
        html.className = html.className.replace(/\btranslated-\S+/g, '').trim();
      }
      if (html.lang !== 'vi') html.setAttribute('lang', 'vi');
    };
    lockHtmlAttrs();

    const killGTScript = () => {
      document.querySelectorAll('script[src*="translate.google"]').forEach((s) => s.remove());
      document.querySelectorAll('[id^="goog-gt-"]').forEach((el) => el.remove());
      document.querySelectorAll('.goog-te-banner-frame').forEach((el) => el.remove());
      document.querySelectorAll('.skiptranslate').forEach((el) => el.remove());
      document.querySelectorAll('iframe[id^="deepl"]').forEach((el) => el.remove());
    };

    const restoreFontNodes = (root = document.getElementById('root')) => {
      if (!root) return;
      root.querySelectorAll('font').forEach((font) => {
        const parent = font.parentNode;
        if (!parent) return;
        while (font.firstChild) parent.insertBefore(font.firstChild, font);
        font.remove();
      });
    };

    let restoreTimer = null;

    const observer = new MutationObserver((mutations) => {
      let needsRestore = false;
      let needsLock = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.nodeName === 'FONT') needsRestore = true;
            if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute?.('_mstmutation')) node.remove();
            if (node.nodeName === 'SCRIPT' && node.src?.includes('translate.google')) node.remove();
          }
        }
        if (mutation.type === 'attributes' && mutation.target === document.documentElement) needsLock = true;
      }
      if (needsRestore || needsLock) {
        clearTimeout(restoreTimer);
        restoreTimer = setTimeout(() => {
          if (needsLock) lockHtmlAttrs();
          if (needsRestore) restoreFontNodes();
          killGTScript();
          clearTranslateCookies();
        }, 50);
      }
    });

    observer.observe(document.documentElement, {
      childList: true, subtree: true, attributes: true,
      attributeFilter: ['class', 'lang', 'translate'],
    });

    const interval = setInterval(() => {
      killGTScript();
      clearTranslateCookies();
      lockHtmlAttrs();
    }, 3000);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        clearTranslateCookies();
        lockHtmlAttrs();
        killGTScript();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      clearTimeout(restoreTimer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
}

// ─────────────────────────────────────────────
// 🛡️ TRANSLATE-SAFE TEXT WRAPPER
// ─────────────────────────────────────────────
export const NoTranslate = memo(({ children, as: Tag = 'span', className = '', style }) => (
  <Tag translate="no" className={`notranslate ${className}`} style={style} data-nosnippet>
    {children}
  </Tag>
));
NoTranslate.displayName = 'NoTranslate';

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
// 🔒 ExamLockedBanner
// Hiển thị khi người dùng cố truy cập exam bị khóa
// ─────────────────────────────────────────────
const ExamLockedBanner = memo(({ examId, requiredLevel, currentLevel, onGoBack }) => (
  <div className="w-full flex flex-col items-center justify-center py-20 px-6 text-center">
    <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center mb-6">
      <Lock className="w-9 h-9 text-slate-400" strokeWidth={1.5} />
    </div>
    <h2 className="text-2xl font-black text-slate-900 mb-2">
      {examId?.replace('exam', 'Đề thi ')} chưa mở khóa
    </h2>
    <p className="text-slate-500 text-sm max-w-sm mb-1">
      Bạn cần đạt <strong className="text-indigo-600">Level {requiredLevel}</strong> để truy cập đề thi này.
    </p>
    <div className="flex items-center gap-2 mt-2 mb-8 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200">
      <Star className="w-4 h-4 text-indigo-500" />
      <span className="text-sm font-semibold text-indigo-700">
        Level hiện tại: {currentLevel} · Cần thêm {requiredLevel - currentLevel} level
      </span>
    </div>
    <button
      onClick={onGoBack}
      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors"
    >
      ← Quay lại đề thi được mở
    </button>
  </div>
));
ExamLockedBanner.displayName = 'ExamLockedBanner';

// ─────────────────────────────────────────────
// PartTestContent
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
  // exam access
  canAccessExam, getExamLockInfo, level,
}) => {
  useEffect(() => {
    if (showResults) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showResults]);

  // 🔒 Chặn render nếu exam bị khóa
  const lockInfo = getExamLockInfo(selectedExam);
  if (lockInfo.locked) {
    return (
      <ExamLockedBanner
        examId={selectedExam}
        requiredLevel={lockInfo.requiredLevel}
        currentLevel={level}
        onGoBack={() => handleExamChange('exam1')}
      />
    );
  }

  return (
    <div className="w-full space-y-6">
      <PartSelector
        selectedExam={selectedExam}
        onExamChange={handleExamChange}
        testType={testType}
        onTestTypeChange={(e) => handleTestTypeChange(e.target.value)}
        selectedPart={selectedPart}
        onPartChange={handlePartChange}
        // Pass access info so PartSelector can show lock icons in dropdown
        canAccessExam={canAccessExam}
        getExamLockInfo={getExamLockInfo}
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
const FullExamContainer = memo(({ onComplete, canAccessExam, level }) => {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const list   = getAllExamMetadata();
        // 🔒 Chỉ load exam mà user có quyền truy cập
        const accessible = list.filter((ex) => canAccessExam(ex.id));
        const loaded = await Promise.all(accessible.map((ex) => loadExamData(ex.id)));
        const dataMap = {};
        accessible.forEach((ex, i) => { dataMap[ex.id] = loaded[i]; });
        setExamData(dataMap);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, [canAccessExam]);

  if (loading) return <LoadingSpinner message="Đang tải dữ liệu toàn bộ đề thi..." />;

  if (!examData || Object.keys(examData).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2">Chưa có đề thi nào</h2>
        <p className="text-slate-500 text-sm">Hoàn thành bài tập để tăng level và mở khóa đề thi.</p>
      </div>
    );
  }

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

  // 🛡️ Translation protection
  useTranslationProtection();

  // 🔒 Exam access control
  const { canAccessExam, getExamLockInfo, level } = useExamAccess();

  const {
    selectedExam, testType, handleTestTypeChange,
    practiceType, handlePracticeTypeChange,
    selectedPart, currentQuestionIndex, setCurrentQuestionIndex,
    answers, handleAnswerSelect,
    handleSubmit, showResults, handleReset,
    handleExamChange: _handleExamChange, handlePartChange,
    isSignedIn, user,
  } = useAppState();

  // 🔒 Wrap handleExamChange — chặn nếu exam bị khóa
  // Xử lý cả 2 dạng: string 'exam2' và event object { target: { value: 'exam2' } }
  const handleExamChange = useMemo(() => (examIdOrEvent) => {
    const examId = examIdOrEvent?.target?.value ?? examIdOrEvent;
    if (!canAccessExam(examId)) {
      console.warn(`[ExamAccess] Exam "${examId}" bị khóa ở level ${level}`);
      return;
    }
    // Truyền nguyên dạng gốc để useAppState xử lý đúng
    _handleExamChange(examIdOrEvent);
  }, [canAccessExam, _handleExamChange, level]);

  useEffect(() => {
    if (selectedExam) {
      // 🔒 Không load data nếu exam bị khóa
      if (!canAccessExam(selectedExam)) return;
      loadExamData(selectedExam)
        .then(setCurrentExamData)
        .catch(() => setCurrentExamData(null));
    }
  }, [selectedExam, canAccessExam]);

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
                canAccessExam={canAccessExam}
                getExamLockInfo={getExamLockInfo}
                level={level}
              />
            } />
            <Route path={ROUTES.FULL_EXAM} element={
              <FullExamContainer
                onComplete={() => handleTestTypeChange('')}
                canAccessExam={canAccessExam}
                level={level}
              />
            } />
            <Route path={ROUTES.GRAMMAR} element={
              <GrammarReview
                answers={answers}
                onAnswerSelect={handleAnswerSelect}
                onSubmit={handleSubmitWithData}
              />
            } />
            <Route path={ROUTES.VOCABULARY} element={<VocabularyPractice />} />
            <Route path={ROUTES.PROFILE}    element={<UserProfile />} />
            <Route path={ROUTES.ANSWERS}    element={<ExamAnswersPage />} />
            <Route path="*"                 element={<NotFoundPage />} />
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