import React, { useMemo, useState, lazy, Suspense, memo, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Data & Hooks
import { loadExamData, getAllExamMetadataAsync } from './data/examData';
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
import AuthPage from './components/Auth/AuthPage.jsx'; // ✅ ĐÃ THÊM IMPORT AUTHPAGE Ở ĐÂY
import { ROUTES } from './config/routes';

// Icons
import { Trophy, FileText, Zap, BarChart3, Lock, Star } from 'lucide-react';
import ExamManagement from './admin/pages/Exams/ExamManagement.jsx';
import CreateExam from './admin/pages/Exams/CreateExam.jsx';
import DetailsExam from './admin/pages/Exams/DetailsExam.jsx';
import EditExam from './admin/pages/Exams/EditExam.jsx';
import ImportExamsPage from './admin/scripts/importExamsToFirebase.jsx';
import MigrateData from './admin/scripts/MigrateFirestoreToSupabase.jsx';
import UserManagement from './admin/pages/Users/UserManagement.jsx';

// Lazy Loaded Components
// AdminApp has its own auth guard (ProtectedRoute → useAdminAuth)
const AdminApp      = lazy(() => import('./admin/AdminApp'));
const NotFoundPage  = lazy(() => import('./components/pages/NotFoundPage.jsx'));
const GrammarReview = lazy(() => import('./components/Grama/GrammarReview.jsx'));
const FullExamMode  = lazy(() => import('./components/FullExam/FullExamMode.jsx'));
const HistoryTest = lazy(() => import('./components/HistoryTest.jsx'));

// ─────────────────────────────────────────────────────────────────
// 🛡️ TRANSLATION PROTECTION
//
// Google Translate wraps text nodes in <font> tags and mutates the
// DOM directly, which causes React's reconciler to throw errors like:
//   "NotFoundError: Failed to execute 'removeChild' on 'Node'"
//
// Strategy (layered):
//   1. Prevent translate from starting (meta + html attrs)
//   2. Remove Google Translate scripts & UI elements proactively
//   3. Patch Node.prototype.removeChild & insertBefore to swallow
//       errors when the node has already been moved by the translator
//   4. MutationObserver to reverse any DOM mutations (<font> unwrap)
//   5. Periodic cleanup sweep every 3s as last resort
// ─────────────────────────────────────────────────────────────────

/**
 * Patches Node.prototype so React never crashes when Google Translate
 * has moved a node that React still holds a reference to.
 * Must be called ONCE before React mounts.
 */
function patchNodePrototype() {
  if (typeof window === 'undefined' || window.__translatePatchApplied) return;
  window.__translatePatchApplied = true;

  const origRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      // Node was already moved by translator — silently ignore
      return child;
    }
    return origRemoveChild.call(this, child);
  };

  const origInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, refNode) {
    if (refNode && refNode.parentNode !== this) {
      // Reference node was moved — append instead to avoid crash
      return this.appendChild(newNode);
    }
    return origInsertBefore.call(this, newNode, refNode);
  };
}

// Patch immediately (before any render)
patchNodePrototype();

/**
 * Hook — runs inside the React tree to watch for & undo translate mutations.
 */
function useTranslationProtection() {
  useEffect(() => {
    // ── 1. Purge cookies & storage ────────────────────────────
    const clearTranslateCookies = () => {
      try {
        ['', `; domain=${window.location.hostname}`, `; domain=.${window.location.hostname}`].forEach((suffix) => {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${suffix}`;
        });
        sessionStorage.removeItem('googtrans');
        localStorage.removeItem('googtrans');
      } catch { /* ignore */ }
    };
    clearTranslateCookies();

    // ── 2. Lock <html> attributes ─────────────────────────────
    const lockHtmlAttrs = () => {
      const html = document.documentElement;
      html.setAttribute('translate', 'no');
      if (!html.classList.contains('notranslate')) html.classList.add('notranslate');
      // Remove any "translated-*" classes Google injects
      [...html.classList].filter((c) => c.startsWith('translated-')).forEach((c) => html.classList.remove(c));
      if (html.lang !== 'vi') html.setAttribute('lang', 'vi');
    };
    lockHtmlAttrs();

    // ── 3. Remove translator scripts & UI elements ────────────
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
        try { el.remove(); } catch { /* ignore */ }
      });
    };
    killGTElements();

    // ── 4. Unwrap <font> nodes injected by Google Translate ───
    // Google wraps every text node: "Hello" → <font>Hello</font>
    // We reverse this by hoisting children back to the parent.
    const unwrapFontNodes = (root = document.getElementById('root')) => {
      if (!root) return;
      // querySelectorAll is live-ish, iterate a static copy
      [...root.querySelectorAll('font')].forEach((font) => {
        const parent = font.parentNode;
        if (!parent) return;
        // Move all children out before removing the wrapper
        while (font.firstChild) {
          try { parent.insertBefore(font.firstChild, font); } catch { /* ignore */ }
        }
        try { parent.removeChild(font); } catch { /* ignore */ }
      });
    };

    // Debounce the observer callback to batch rapid mutations
    let restoreTimer = null;
    const scheduleRestore = (flags) => {
      clearTimeout(restoreTimer);
      restoreTimer = setTimeout(() => {
        if (flags.lock)    lockHtmlAttrs();
        if (flags.unwrap)  unwrapFontNodes();
        if (flags.kill)    killGTElements();
        clearTranslateCookies();
      }, 50);
    };

    // ── 5. MutationObserver ───────────────────────────────────
    const observer = new MutationObserver((mutations) => {
      const flags = { lock: false, unwrap: false, kill: false };

      for (const mutation of mutations) {
        // Attribute changes on <html> (class, lang, translate)
        if (mutation.type === 'attributes' && mutation.target === document.documentElement) {
          flags.lock = true;
        }

        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (node.nodeName === 'FONT') {
              flags.unwrap = true;
            }
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Microsoft Translator attr
              if (node.hasAttribute?.('_mstmutation')) {
                try { node.remove(); } catch { /* ignore */ }
              }
              // GT script injection
              if (node.nodeName === 'SCRIPT' &&
                  (node.src?.includes('translate.google') || node.src?.includes('translate.googleapis'))) {
                flags.kill = true;
                try { node.remove(); } catch { /* ignore */ }
              }
            }
          }
        }
      }

      if (flags.lock || flags.unwrap || flags.kill) {
        scheduleRestore(flags);
      }
    });

    observer.observe(document.documentElement, {
      childList:       true,
      subtree:         true,
      attributes:      true,
      attributeFilter: ['class', 'lang', 'translate'],
    });

    // ── 6. Periodic sweep (fallback) ──────────────────────────
    const interval = setInterval(() => {
      killGTElements();
      clearTranslateCookies();
      lockHtmlAttrs();
    }, 3000);

    // ── 7. Visibility change (tab re-focus) ───────────────────
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

// ─────────────────────────────────────────────────────────────────
// 🛡️ NoTranslate wrapper
// Wraps any text that must NOT be translated (scores, code, names…)
// ─────────────────────────────────────────────────────────────────
export const NoTranslate = memo(({ children, as: Tag = 'span', className = '', style }) => (
  <Tag
    translate="no"
    className={`notranslate ${className}`.trim()}
    style={style}
    data-nosnippet
  >
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
// ExamLockedBanner
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
  canAccessExam, getExamLockInfo, level,
}) => {
  useEffect(() => {
    if (showResults) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showResults]);

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
        const list       = await getAllExamMetadataAsync(); 
        const accessible = list.filter((ex) => canAccessExam(ex.id));
        const loaded     = await Promise.all(accessible.map((ex) => loadExamData(ex.id)));
        const dataMap    = {};
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

  // 🛡️ Activate translation protection inside the React tree
  useTranslationProtection();

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

  const handleExamChange = useMemo(() => (examIdOrEvent) => {
    const examId = examIdOrEvent?.target?.value ?? examIdOrEvent;
    if (!canAccessExam(examId)) {
      console.warn(`[ExamAccess] Exam "${examId}" bị khóa ở level ${level}`);
      return;
    }
    _handleExamChange(examIdOrEvent);
  }, [canAccessExam, _handleExamChange, level]);

  useEffect(() => {
    if (selectedExam) {
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
            <Route path={ROUTES.HISTORY || "/history/:id"} element={<HistoryTest />} />
          </Routes>
        </Suspense>

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </MainLayout>

      <WelcomeModal isOpen={showWelcome} onClose={closeWelcome} />
    </>
  );
});

export default function App() {
  const showSplash = useSplashScreen(2000);
  if (showSplash) return <LoadingSpinner message="Khởi động hệ thống..." />;

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* ✅ THÊM ROUTE ĐĂNG NHẬP Ở ĐÂY ĐỂ NÓ ĐỘC LẬP VỚI MAIN LAYOUT */}
          <Route path="/login" element={<AuthPage />} />

          {/* Admin — isolated, no MainLayout, no user Navbar */}
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/admin/exams" element={<ExamManagement />} />
          <Route path="/admin/exams/create" element={<CreateExam />} />
          <Route path="/admin/exams/detail/:id" element={<DetailsExam />} />
          <Route path="/admin/exams/edit/:id" element={<EditExam />} />
          <Route path="/migrate-data" element={<MigrateData />} />
          <Route path="/admin/users" element={<UserManagement />} />
          
          {/* Main app — all user-facing routes */}
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Suspense>
    </Router>
  );
}