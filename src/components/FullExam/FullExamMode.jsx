/* src/components/FullExam/FullExamMode.jsx
 *
 * FIXES:
 * ✅ HMR: AnswersContext tách sang context/AnswersContext.js
 * ✅ Audio bug: isAudioPlaying reset TRƯỚC khi setPart
 * ✅ Navigation bug: dùng useRef cho playedParts tránh stale closure
 * ✅ handleNavigatePart chỉ block QUAY LẠI, không block TIẾN TỚI
 * ✅ Border styling: KHÔNG mix border shorthand với borderColor
 */

import React, {
  useState, useEffect, useCallback, useMemo, useRef,
} from 'react';
import { useUserProgress } from '../../hooks/useUserProgress';
import { COLORS } from './constants/colors';
import { EXAM_STRUCTURE, EXAM_MODES, EXAM_SECTIONS } from './constants/examConfig';
import { EXAM_TIMINGS } from './constants/timings';
import { calculateFullResults, countUnansweredQuestions } from './utils/examHelpers';
import { generateAnswerKey } from './utils/answerKey';
import { useExamState } from './hooks/useExamState';
import { useExamTimer } from './hooks/useExamTimer';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useNetworkStatus } from './hooks/useNetworkStatus';

// ✅ FIX HMR: import từ file riêng — không export thêm trong file này
import { AnswersContext } from './context/AnswersContext';

import StepIndicator from './StepIndicator';
import { ExamSetup } from './components/ExamSetup/ExamSetup';
import { ExamScreen } from './components/ExamScreen/ExamScreen';
import { ResultsScreen } from './components/Results/ResultsScreen';
import { Timer } from './components/Header/Timer';
import { AutosaveIndicator } from './components/Header/AutosaveIndicator';
import { TimeWarning } from './components/Warnings/TimeWarning';
import { OfflineWarning } from './components/Warnings/OfflineWarning';
import { SubmitModal } from './components/Modals/SubmitModal';
import { getExamById } from '../../data/examData';

const EXAM_DRAFT_KEY = 'exam-progress-draft';

const FullExamMode = ({ onComplete }) => {
  const { saveProgress, currentUser, loading: progressLoading } = useUserProgress();
  const { isOnline } = useNetworkStatus();

  const {
    state, setMode, setSection, setPart, setAnswers, addAnswer,
    setTimeLeft, tickTimer, pauseTimer, resumeTimer,
    setExamData, setExamId, markPartPlayed, reset: resetExam,
  } = useExamState();

  const [showWarning,     setShowWarning]     = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSaving,        setIsSaving]        = useState(false);
  const [lastSaved,       setLastSaved]       = useState(null);
  const [saveError,       setSaveError]       = useState(null);
  const [submitRetrying,  setSubmitRetrying]  = useState(false);

  // ✅ FIX: ref + state kép để tránh stale closure trong handlers
  const isAudioPlayingRef = useRef(false);
  const [isAudioPlaying,  setIsAudioPlaying]  = useState(false);
  const setAudioPlaying = useCallback((val) => {
    isAudioPlayingRef.current = val;
    setIsAudioPlaying(val);
  }, []);

  // ✅ FIX: playedParts qua ref để handleNavigatePart không bị stale closure
  const playedPartsRef = useRef(new Set());
  useEffect(() => {
    playedPartsRef.current = state.playedListeningParts || new Set();
  }, [state.playedListeningParts]);

  const mainContentRef = useRef(null);

  /* ── beforeunload ── */
  useEffect(() => {
    const handler = (e) => {
      if (state.mode === EXAM_MODES.EXAM && Object.keys(state.answers).length > 0) {
        e.preventDefault(); e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [state.mode, state.answers]);

  /* ── visibilitychange (mobile save) ── */
  useEffect(() => {
    const save = () => {
      if (document.visibilityState === 'hidden' && state.examId) {
        try {
          localStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify({
            examId: state.examId, answers: state.answers, timestamp: Date.now(),
          }));
        } catch (_) {}
      }
    };
    document.addEventListener('visibilitychange', save);
    return () => document.removeEventListener('visibilitychange', save);
  }, [state.examId, state.answers]);

  /* ── Draft restore với examId guard ── */
  useEffect(() => {
    if (!state.examId) return;
    try {
      const raw = localStorage.getItem(EXAM_DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft.examId === state.examId && draft.answers) setAnswers(draft.answers);
    } catch (_) {}
  }, [state.examId, setAnswers]);

  /* ── Persist answers ── */
  useEffect(() => {
    if (!state.examId) return;
    try {
      localStorage.setItem(EXAM_DRAFT_KEY, JSON.stringify({
        examId: state.examId, answers: state.answers, timestamp: Date.now(),
      }));
    } catch (_) {}
  }, [state.answers, state.examId]);

  /* ── Load exam data ── */
  useEffect(() => {
    if (state.mode === EXAM_MODES.SETUP || !state.examId) return;
    getExamById(state.examId)
      .then(data => {
        if (!data?.parts) throw new Error('Invalid exam data');
        setExamData(data);
      })
      .catch(err => { console.error(err); setSaveError(err.message); });
  }, [state.examId, state.mode, setExamData]);

  /* ── Section timer ── */
  useEffect(() => {
    if (state.mode === EXAM_MODES.EXAM) {
      setTimeLeft(state.section === EXAM_SECTIONS.LISTENING
        ? EXAM_TIMINGS.LISTENING : EXAM_TIMINGS.READING);
    }
  }, [state.section, state.mode, setTimeLeft]);

  /* ── Focus on part change ── */
  useEffect(() => {
    if (state.mode === EXAM_MODES.EXAM)
      mainContentRef.current?.focus({ preventScroll: false });
  }, [state.part, state.mode]);

  /* ── Timer callbacks — PHẢI dùng useCallback ──────────────────────────────
   * Root cause "Maximum update depth":
   *   inline arrow () => { ... } tạo reference mới mỗi render
   *   → useEffect trong useExamTimer thấy deps thay đổi → chạy lại
   *   → gọi setState → render → lặp vô tận
   * Fix: stable reference bằng useCallback, deps rõ ràng.
   * ──────────────────────────────────────────────────────────────────────── */
  const handleTimerComplete = useCallback(() => {
    if (state.section === EXAM_SECTIONS.LISTENING) {
      setSection(EXAM_SECTIONS.READING);
      setPart(5);
      setTimeLeft(EXAM_TIMINGS.READING);
    } else {
      setMode(EXAM_MODES.RESULTS);
    }
  }, [state.section, setSection, setPart, setTimeLeft, setMode]);

  const handleTimerWarning = useCallback(() => setShowWarning(true), []);

  /* ── Timer ── */
  useExamTimer({
    isActive: state.mode === EXAM_MODES.EXAM && !state.isPaused && !!state.examData,
    section:  state.section,
    timeLeft: state.timeLeft,
    onTick:   tickTimer,
    onComplete: handleTimerComplete,
    onWarning:  handleTimerWarning,
  });

  /* ── Autosave ── */
  useEffect(() => {
    if (state.mode !== EXAM_MODES.EXAM || !currentUser || progressLoading || !state.examData) return;
    const timer = setInterval(async () => {
      if (!isOnline) return;
      try {
        setIsSaving(true); setSaveError(null);
        const results = calculateFullResults(state.examData, state.answers);
        await saveProgress({
          exam: state.examId,
          part: state.section === EXAM_SECTIONS.LISTENING ? 'listening' : 'reading',
          score: parseFloat(results.averageScore),
          answers: state.answers, timestamp: Date.now(),
        });
        setLastSaved(Date.now());
      } catch (err) { setSaveError(err.message); }
      finally { setIsSaving(false); }
    }, EXAM_TIMINGS.AUTOSAVE);
    return () => clearInterval(timer);
  }, [state.mode, state.section, state.answers, state.examId, state.examData,
    currentUser, isOnline, progressLoading, saveProgress]);

  /* ── Keyboard shortcuts ── */
  useKeyboardShortcuts({
    isActive: state.mode === EXAM_MODES.EXAM, isAudioPlaying,
    onNavigatePrev: () => {
      const min = state.section === EXAM_SECTIONS.LISTENING ? 1 : 5;
      if (state.part > min) setPart(state.part - 1);
    },
    onNavigateNext: () => {
      const max = state.section === EXAM_SECTIONS.LISTENING ? 4 : 8;
      if (state.part < max) setPart(state.part + 1);
    },
    onTogglePause: () => state.isPaused ? resumeTimer() : pauseTimer(),
    onSelectAnswer: (idx) => {
      const key = generateAnswerKey({ section: state.section, part: state.part, question: 1 });
      addAnswer(key, idx);
    },
    onSubmit: () => {
      if (state.section === EXAM_SECTIONS.READING && state.part === 8) setShowSubmitModal(true);
    },
    onExit: () => {
      if (window.confirm('Bạn chắc chắn muốn thoát? Tiến độ đã được lưu.')) {
        resetExam(); onComplete?.();
      }
    },
  });

  /* ─────────────────────────────────────────────
     HANDLERS
     ───────────────────────────────────────────── */
  const handleStartExam = useCallback((examId) => {
    setExamId(examId); setMode(EXAM_MODES.EXAM);
    setTimeLeft(EXAM_TIMINGS.LISTENING); setShowWarning(false);
  }, [setExamId, setMode, setTimeLeft]);

  const handleSelectAnswer = useCallback((questionNum, optionIndex) => {
    const key = generateAnswerKey({ section: state.section, part: state.part, question: questionNum });
    addAnswer(key, optionIndex);
  }, [state.section, state.part, addAnswer]);

  // ✅ FIX: Chỉ block QUAY LẠI part đã nghe, KHÔNG block tiến tới
  const handleNavigatePart = useCallback((newPart) => {
    if (
      state.section === EXAM_SECTIONS.LISTENING &&
      newPart < state.part &&                      // chỉ khi đi ngược
      playedPartsRef.current.has(newPart)           // và part đó đã nghe
    ) {
      alert('❌ Không thể quay lại phần nghe đã hoàn thành.');
      return;
    }
    setPart(newPart);
  }, [state.section, state.part, setPart]);

  const handleNextSection = useCallback(() => {
    setSection(EXAM_SECTIONS.READING); setPart(5); setTimeLeft(EXAM_TIMINGS.READING);
  }, [setSection, setPart, setTimeLeft]);

  // ✅ FIX CHÍNH: setAudioPlaying(false) TRƯỚC setPart
  // Giải thích: nếu setIsAudioPlaying(false) và setPart() gọi cùng lúc,
  // React batch update nhưng ExamScreen nhận isAudioPlaying=true trong
  // render đầu tiên → nút Next bị disabled. setTimeout(0) đảm bảo
  // state audio flush xong trước khi chuyển part.
  const handleAudioEnd = useCallback(() => {
    if (state.section !== EXAM_SECTIONS.LISTENING) return;
    const currentPart = state.part;

    // Bước 1: tắt audio ngay
    setAudioPlaying(false);

    // Bước 2: mark played
    markPartPlayed(currentPart);

    // Bước 3: chuyển part sau khi state flush
    setTimeout(() => {
      if (currentPart < 4) setPart(currentPart + 1);
      else handleNextSection();
    }, 0);
  }, [state.section, state.part, setAudioPlaying, markPartPlayed, setPart, handleNextSection]);

  const handleFinalSubmit = useCallback(async () => {
    setSubmitRetrying(true); setSaveError(null);
    try {
      if (!state.examData) throw new Error('No exam data');
      const results = calculateFullResults(state.examData, state.answers);
      if (isOnline && currentUser) {
        await saveProgress({
          exam: state.examId,
          part: state.section === EXAM_SECTIONS.LISTENING ? 'listening' : 'reading',
          score: parseFloat(results.averageScore),
          answers: state.answers,
          totalQuestions: state.examData?.totalQuestions || 0,
          correctAnswers: results.correctAnswers || 0,
          isDraft: false, testType: 'full-exam', timestamp: Date.now(),
        });
      }
      localStorage.removeItem(EXAM_DRAFT_KEY);
      setMode(EXAM_MODES.RESULTS);
      setShowSubmitModal(false);
    } catch (err) {
      console.error('Submit failed:', err);
      setSaveError(err.message || 'Failed to submit test');
    } finally { setSubmitRetrying(false); }
  }, [state.examData, state.answers, state.examId, state.section,
    isOnline, currentUser, setMode, saveProgress]);

  /* ─────────────────────────────────────────────
     COMPUTED
     ───────────────────────────────────────────── */
  const unansweredCount = useMemo(() => {
    if (!state.examData) return 0;
    return countUnansweredQuestions(state.examData, state.answers, state.section);
  }, [state.examData, state.answers, state.section]);

  const isLastListeningPart = useMemo(
    () => state.section === EXAM_SECTIONS.LISTENING && state.part === 4,
    [state.section, state.part]);

  const isLastReadingPart = useMemo(
    () => state.section === EXAM_SECTIONS.READING && state.part === 8,
    [state.section, state.part]);

  const answersContextValue = useMemo(
    () => ({ answers: state.answers, addAnswer }),
    [state.answers, addAnswer]);

  /* ─────────────────────────────────────────────
     RENDER
     ───────────────────────────────────────────── */
  if (state.mode === EXAM_MODES.SETUP)
    return <ExamSetup onStartExam={handleStartExam} />;

  if (state.mode === EXAM_MODES.RESULTS)
    return (
      <ResultsScreen
        examData={state.examData} answers={state.answers}
        onRetry={() => { resetExam(); setShowWarning(false); }}
        onExit={() => { resetExam(); localStorage.removeItem(EXAM_DRAFT_KEY); onComplete?.(); }}
      />
    );

  return (
    <AnswersContext.Provider value={answersContextValue}>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white" style={{
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: '#cbd5e1',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: 'clamp(8px,2vw,16px) clamp(12px,4vw,32px)',
            gap: '12px', flexWrap: 'wrap',
          }}>
            <div>
              <h2 style={{ fontSize: 'clamp(14px,2.5vw,17px)', fontWeight: 700, color: '#1A2330', margin: 0 }}>
                {state.section.toUpperCase()} – Part {state.part}
              </h2>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Đề: {state.examId}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px,3vw,32px)' }}>
              <Timer timeLeft={state.timeLeft} isWarning={showWarning} />
              <AutosaveIndicator isSaving={isSaving} lastSaved={lastSaved}
                isOnline={isOnline} saveError={saveError} />
            </div>
          </div>
        </header>

        {/* Step Indicator */}
        <div className="bg-slate-50" style={{
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: '#e2e8f0',
          padding: 'clamp(10px,2vw,24px) clamp(12px,4vw,32px)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <StepIndicator
              currentMode={EXAM_MODES.EXAM}
              listeningComplete={state.section === EXAM_SECTIONS.READING}
            />
          </div>
        </div>

        <TimeWarning visible={showWarning} section={state.section}
          isLastListeningPart={isLastListeningPart} timeLeft={state.timeLeft} />
        <OfflineWarning isOnline={isOnline} />

        <main id="main-content" ref={mainContentRef} tabIndex={-1}
          aria-label={`${state.section} – Part ${state.part}`} style={{ outline: 'none' }}>
          {state.examData && (
            <ExamScreen
              examData={state.examData}
              section={state.section}
              part={state.part}
              answers={state.answers}
              onSelectAnswer={handleSelectAnswer}
              onNavigatePart={handleNavigatePart}
              onNextSection={handleNextSection}
              onSubmit={() => setShowSubmitModal(true)}
              onAudioStart={() => setAudioPlaying(true)}
              onAudioEnd={handleAudioEnd}
              isLastListeningPart={isLastListeningPart}
              isLastReadingPart={isLastReadingPart}
              playedParts={Array.from(state.playedListeningParts)}
              isAudioPlaying={isAudioPlaying}
            />
          )}
        </main>

        <SubmitModal
          visible={showSubmitModal} unansweredCount={unansweredCount}
          saveError={saveError} isOnline={isOnline} isSubmitting={submitRetrying}
          examData={state.examData} answers={state.answers} section={state.section}
          onConfirm={handleFinalSubmit} onCancel={() => setShowSubmitModal(false)}
        />
      </div>
    </AnswersContext.Provider>
  );
};

FullExamMode.displayName = 'FullExamMode';
export default FullExamMode;