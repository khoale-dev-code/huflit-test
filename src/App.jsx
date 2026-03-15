import React, { useState, useEffect, useCallback, useMemo, memo, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Data & Hooks
import { loadExamData } from './data/examData';
import { useAppState } from './hooks/useAppState';
import { useSplashScreen } from './hooks/useSplashScreen.js';
import { useWelcomeModal } from './hooks/useWelcomeModal.js';

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

// Admin Components
import AdminApp from './admin/AdminApp';
import ExamManagement from './admin/pages/Exams/ExamManagement.jsx';
import CreateExam from './admin/pages/Exams/CreateExam.jsx';
import DetailsExam from './admin/pages/Exams/DetailsExam.jsx';
import EditExam from './admin/pages/Exams/EditExam.jsx';
import MigrateData from './admin/scripts/MigrateFirestoreToSupabase.jsx';
import UserManagement from './admin/pages/Users/UserManagement.jsx';
import LessonManagement from './admin/pages/Lessons/LessonManagement.jsx';
import LessonForm from './admin/pages/Lessons/LessonForm.jsx';
import AdminLessonDetails from './admin/pages/Lessons/LessonDetails.jsx'; // Đổi tên import để không nhầm với User

// User Components (Lazy Loaded)
const NotFoundPage  = lazy(() => import('./components/pages/NotFoundPage.jsx'));
const FullExamMode  = lazy(() => import('./components/FullExam/FullExamMode.jsx'));
const HistoryTest   = lazy(() => import('./components/HistoryTest.jsx'));

// 🔥 SỬA LỖI: Import đúng component Lesson của Người Dùng
import LessonList from './components/Lessons/LessonList.jsx';
// ĐẢM BẢO BẠN ĐÃ TẠO FILE NÀY DỰA THEO CODE MÌNH CUNG CẤP Ở BƯỚC TRƯỚC
const LessonDetailUser = lazy(() => import('./components/Lessons/LessonDetail.jsx')); 


// ─────────────────────────────────────────────────────────────────
// 🛡️ TRANSLATION PROTECTION (Giữ nguyên)
// ─────────────────────────────────────────────────────────────────
function patchNodePrototype() {
  if (typeof window === 'undefined' || window.__translatePatchApplied) return;
  window.__translatePatchApplied = true;

  const origRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return origRemoveChild.call(this, child);
  };

  const origInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, refNode) {
    if (refNode && refNode.parentNode !== this) return this.appendChild(newNode);
    return origInsertBefore.call(this, newNode, refNode);
  };
}
patchNodePrototype();

function useTranslationProtection() {
  useEffect(() => {
    const clearTranslateCookies = () => {
      try {
        ['', `; domain=${window.location.hostname}`, `; domain=.${window.location.hostname}`].forEach((suffix) => {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${suffix}`;
        });
        sessionStorage.removeItem('googtrans');
        localStorage.removeItem('googtrans');
      } catch { }
    };
    clearTranslateCookies();

    const lockHtmlAttrs = () => {
      const html = document.documentElement;
      html.setAttribute('translate', 'no');
      if (!html.classList.contains('notranslate')) html.classList.add('notranslate');
      [...html.classList].filter((c) => c.startsWith('translated-')).forEach((c) => html.classList.remove(c));
      if (html.lang !== 'vi') html.setAttribute('lang', 'vi');
    };
    lockHtmlAttrs();

    const killGTElements = () => {
      document.querySelectorAll([
        'script[src*="translate.google"]',
        'script[src*="translate.googleapis"]',
        '[id^="goog-gt-"]',
        '.goog-te-banner-frame',
        '.skiptranslate',
        'iframe[id^="deepl"]',
        '#google_translate_element',
        '.goog-te-gadget',
      ].join(',')).forEach((el) => {
        try { el.remove(); } catch { }
      });
    };
    killGTElements();

    const unwrapFontNodes = (root = document.getElementById('root')) => {
      if (!root) return;
      [...root.querySelectorAll('font')].forEach((font) => {
        const parent = font.parentNode;
        if (!parent) return;
        while (font.firstChild) {
          try { parent.insertBefore(font.firstChild, font); } catch { }
        }
        try { parent.removeChild(font); } catch { }
      });
    };

    let restoreTimer = null;
    const scheduleRestore = (flags) => {
      clearTimeout(restoreTimer);
      restoreTimer = setTimeout(() => {
        if (flags.lock)   lockHtmlAttrs();
        if (flags.unwrap) unwrapFontNodes();
        if (flags.kill)   killGTElements();
        clearTranslateCookies();
      }, 50);
    };

    const observer = new MutationObserver((mutations) => {
      const flags = { lock: false, unwrap: false, kill: false };
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.target === document.documentElement) {
          flags.lock = true;
        }
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.nodeName === 'FONT') flags.unwrap = true;
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.hasAttribute?.('_mstmutation')) {
                try { node.remove(); } catch { }
              }
              if (node.nodeName === 'SCRIPT' &&
                  (node.src?.includes('translate.google') || node.src?.includes('translate.googleapis'))) {
                flags.kill = true;
                try { node.remove(); } catch { }
              }
            }
          }
        }
      }
      if (flags.lock || flags.unwrap || flags.kill) scheduleRestore(flags);
    });

    observer.observe(document.documentElement, {
      childList: true, subtree: true, attributes: true,
      attributeFilter: ['class', 'lang', 'translate'],
    });

    const interval = setInterval(() => {
      killGTElements();
      clearTranslateCookies();
      lockHtmlAttrs();
    }, 3000);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        clearTranslateCookies();
        lockHtmlAttrs();
        killGTElements();
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

export const NoTranslate = memo(({ children, as: Tag = 'span', className = '', style }) => (
  <Tag translate="no" className={`notranslate ${className}`.trim()} style={style} data-nosnippet>
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
InfoBadge.displayName = 'InfoBadge';

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
StatsGrid.displayName = 'StatsGrid';

// ─────────────────────────────────────────────
// PartTestContent
// ─────────────────────────────────────────────
const PartTestContent = memo(({
  isSignedIn,
  selectedExam, handleExamChange,
  testType, handleTestTypeChange,
  selectedPart, handlePartChange,
  partData,
  currentExamData,
  currentQuestionIndex, setCurrentQuestionIndex,
  answers, handleAnswerSelect,
  showResults, handleSubmit, handleReset,
  score,
  isLoadingExam,
}) => {

  useEffect(() => {
    if (!currentExamData?.parts) return;

    let availableParts = [];
    if (Array.isArray(currentExamData.parts)) {
      availableParts = currentExamData.parts
        .filter(p => p.type === testType)
        .map(p => String(p.id));
    } else {
      availableParts = Object.entries(currentExamData.parts)
        .filter(([, data]) => data.type === testType)
        .map(([key]) => String(key));
    }

    if (availableParts.length === 0) return;
    const isCurrentPartValid = availableParts.includes(String(selectedPart));
    if (!isCurrentPartValid) {
      handlePartChange({ target: { value: availableParts[0] } });
    }
  }, [testType, currentExamData, selectedPart, handlePartChange]);

  useEffect(() => {
    if (showResults) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showResults]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const contentDisplay = document.querySelector('[data-testid="content-display"]');
      if (contentDisplay) {
        contentDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedPart, testType]);

  const handleSelectPart = useCallback(() => {
    const selector = document.querySelector('[role="listbox"]');
    if (selector) selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div className="w-full space-y-6">
      <PartSelector
        selectedExam={selectedExam}
        onExamChange={handleExamChange}
        testType={testType}
        onTestTypeChange={handleTestTypeChange}
        selectedPart={selectedPart}
        onPartChange={handlePartChange}
      />
      {showResults ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultsDisplay score={score} partData={partData} answers={answers} onReset={handleReset} />
          <StatsGrid score={score} isSignedIn={isSignedIn} />
        </div>
      ) : (
        <div className="w-full space-y-8 min-h-[100vh] relative transition-all duration-300">
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
        </div>
      )}
    </div>
  );
});
PartTestContent.displayName = 'PartTestContent';

// ─────────────────────────────────────────────
// FullExamContainer
// ─────────────────────────────────────────────
const FullExamContainer = memo(({ onComplete }) => (
  <FullExamMode onComplete={onComplete} />
));
FullExamContainer.displayName = 'FullExamContainer';

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
      .then(setCurrentExamData)
      .catch(() => setCurrentExamData(null))
      .finally(() => setIsLoadingExam(false));
  }, [selectedExam]);

  const partData = useMemo(() => {
    if (practiceType || !currentExamData?.parts) return null;
    const safeSelectedPart = String(selectedPart);
    if (Array.isArray(currentExamData.parts)) {
      return currentExamData.parts.find(p => String(p.id) === safeSelectedPart) || null;
    }
    return currentExamData.parts[safeSelectedPart] || currentExamData.parts[selectedPart] || null;
  }, [practiceType, currentExamData, selectedPart]);

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
            
            {/* Luyện Test */}
            <Route path={ROUTES.TEST} element={
              <PartTestContent
                isSignedIn={isSignedIn}
                selectedExam={selectedExam}          handleExamChange={handleExamChange}
                testType={testType}                  handleTestTypeChange={handleTestTypeChange}
                selectedPart={selectedPart}          handlePartChange={handlePartChange}
                partData={partData}
                currentExamData={currentExamData}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                answers={answers}                    handleAnswerSelect={handleAnswerSelect}
                showResults={showResults}
                handleSubmit={handleSubmitWithData}
                handleReset={handleReset}
                score={score}
                isLoadingExam={isLoadingExam}
              />
            } />
            
            {/* Thi Thử */}
            <Route path={ROUTES.FULL_EXAM} element={
              <FullExamContainer onComplete={() => handleTestTypeChange('')} />
            } />
            
            {/* Bài Học (Lessons) */}
            <Route path="/learn" element={<LessonList />} />
            <Route path="/learn/:slug" element={<LessonDetailUser />} /> {/* Dùng component của User */}
            
            {/* Account & Other */}
            <Route path={ROUTES.PROFILE}    element={<UserProfile />} />
            <Route path={ROUTES.ANSWERS}    element={<ExamAnswersPage />} />
            <Route path="/history/:id"      element={<HistoryTest />} />
            <Route path="*"                 element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </MainLayout>

      <WelcomeModal isOpen={showWelcome} onClose={closeWelcome} />
    </>
  );
});
AppContent.displayName = 'AppContent';

// ─────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────
export default function App() {
  const showSplash = useSplashScreen(2000);
  if (showSplash) return <LoadingSpinner message="Khởi động hệ thống..." />;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/admin/exams" element={<ExamManagement />} />
          <Route path="/admin/exams/create" element={<CreateExam />} />
          <Route path="/admin/exams/detail/:id" element={<DetailsExam />} />
          <Route path="/admin/exams/edit/:id" element={<EditExam />} />
          <Route path="/admin/users" element={<UserManagement />} />
          
          {/* Admin Lessons Routes */}
          <Route path="/admin/lessons" element={<LessonManagement />} />
          <Route path="/admin/lessons/create" element={<LessonForm />} />
          <Route path="/admin/lessons/edit/:id" element={<LessonForm />} />
          <Route path="/admin/lessons/detail/:id" element={<AdminLessonDetails />} /> 
          
          {/* Tool Route */}
          <Route path="/migrate-data" element={<MigrateData />} />
          
          {/* User Routes (Catch all) */}
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}