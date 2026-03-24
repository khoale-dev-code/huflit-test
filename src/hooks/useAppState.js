// src/hooks/useAppState.js
import { useReducer, useRef, useCallback, useEffect } from 'react';
import { useUserProgress } from './useUserProgress';
import { calculateToeicScore } from '../utils/gradeUtils';

/* ══════════════════════════════════════════════════════════
   STATE SHAPE
══════════════════════════════════════════════════════════ */
const initialState = {
  showInstructions: true,
  showVoiceControls: true,
  showAuthModal: false,
  // 🚀 FIX: Không để 'exam1' làm mặc định vì sẽ gây lỗi UUID trên Supabase
  selectedExam: null, 
  testType: 'listening',
  practiceType: '',
  selectedPart: 'part1',
  currentQuestionIndex: 0,
  rate: 1.0,
  answers: {},
  showResults: false,
  scoreResult: null,
  convertedScore: null,
  examCategory: null,
};

/* ══════════════════════════════════════════════════════════
   ACTION TYPES
══════════════════════════════════════════════════════════ */
const T = {
  SET_SHOW_INSTRUCTIONS: 'SET_SHOW_INSTRUCTIONS',
  SET_SHOW_VOICE_CONTROLS: 'SET_SHOW_VOICE_CONTROLS',
  SET_SHOW_AUTH_MODAL: 'SET_SHOW_AUTH_MODAL',
  SET_EXAM: 'SET_EXAM',
  SET_TEST_TYPE: 'SET_TEST_TYPE',
  SET_PRACTICE_TYPE: 'SET_PRACTICE_TYPE',
  SET_PART: 'SET_PART',
  SET_QUESTION_INDEX: 'SET_QUESTION_INDEX',
  SET_RATE: 'SET_RATE',
  SET_ANSWER: 'SET_ANSWER',
  RESET_ANSWERS: 'RESET_ANSWERS',
  SET_SHOW_RESULTS: 'SET_SHOW_RESULTS',
  SET_RESULTS: 'SET_RESULTS',
  RESET_TEST: 'RESET_TEST',
};

const resetTestState = {
  currentQuestionIndex: 0,
  answers: {},
  showResults: false,
  scoreResult: null,
  convertedScore: null,
  examCategory: null,
};

/* ══════════════════════════════════════════════════════════
   REDUCER
══════════════════════════════════════════════════════════ */
const reducer = (state, action) => {
  switch (action.type) {
    case T.SET_SHOW_INSTRUCTIONS: return { ...state, showInstructions: action.payload };
    case T.SET_SHOW_VOICE_CONTROLS: return { ...state, showVoiceControls: action.payload };
    case T.SET_SHOW_AUTH_MODAL: return { ...state, showAuthModal: action.payload };
    case T.SET_QUESTION_INDEX: return { ...state, currentQuestionIndex: action.payload };
    case T.SET_RATE: return { ...state, rate: action.payload };
    case T.SET_SHOW_RESULTS: return { ...state, showResults: action.payload };
    case T.SET_EXAM:
      return { ...state, ...resetTestState, selectedExam: action.payload, selectedPart: 'part1' };
    case T.SET_TEST_TYPE:
      return { 
        ...state, ...resetTestState, 
        testType: action.payload, 
        practiceType: '', 
        selectedPart: action.payload === 'listening' ? 'part1' : 'part5' 
      };
    case T.SET_PRACTICE_TYPE:
      return { ...state, ...resetTestState, practiceType: action.payload, testType: '', selectedPart: '' };
    case T.SET_PART:
      return { ...state, ...resetTestState, selectedPart: action.payload };
    case T.SET_ANSWER:
      return { ...state, answers: { ...state.answers, [action.payload.questionId]: action.payload.answer } };
    case T.RESET_ANSWERS:
      return { ...state, ...resetTestState };
    case T.SET_RESULTS:
      return {
        ...state,
        showResults: true,
        scoreResult: action.payload.scoreResult,
        convertedScore: action.payload.convertedScore,
        examCategory: action.payload.examCategory,
      };
    case T.RESET_TEST:
      return { ...state, ...resetTestState, selectedPart: 'part1', rate: 1.0 };
    default: return state;
  }
};

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
const cancelSpeech = () => {
  try {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  } catch { /* ignore */ }
};

function flattenValidQuestions(partData) {
  const result = [];
  if (!partData?.questions) return result;

  partData.questions.forEach((q) => {
    if (q.type === 'group') {
      (q.subQuestions ?? []).forEach((sq) => {
        if (!sq.isExample) result.push(sq);
      });
    } else {
      if (!q.isExample) result.push(q);
    }
  });
  return result;
}

function computeScore(partData, answers) {
  const allQ = flattenValidQuestions(partData);
  const total = allQ.length;
  const correct = allQ.filter((q) => answers[q.id] === q.correct).length;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const scoreResult = { correct, total, percentage };
  const category = (partData?.examCategory ?? '').toLowerCase();

  // Logic tính điểm TOEIC
  if (category.includes('toeic')) {
    const section = (partData?.toeicSection ?? '').toLowerCase();
    let listeningCorrect = 0;
    let readingCorrect = 0;

    if (section === 'listening') {
      listeningCorrect = correct;
    } else if (section === 'reading') {
      readingCorrect = correct;
    } else {
      listeningCorrect = partData?.listeningCorrect ?? Math.round(correct / 2);
      readingCorrect = partData?.readingCorrect ?? (correct - listeningCorrect);
    }

    const convertedScore = calculateToeicScore(listeningCorrect, readingCorrect);
    return { scoreResult, convertedScore };
  }

  return { scoreResult, convertedScore: null };
}

/* ══════════════════════════════════════════════════════════
   HOOK EXPORT
══════════════════════════════════════════════════════════ */
export const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { saveProgress, currentUser } = useUserProgress();

  // Dùng Ref để handleSubmit luôn có state mới nhất mà không bị re-render vô ích
  const stateRef = useRef(state);
  const saveProgressRef = useRef(saveProgress);

  useEffect(() => {
    stateRef.current = state;
    saveProgressRef.current = saveProgress;
  }, [state, saveProgress]);

  const handleExamChange = useCallback((e) => {
    cancelSpeech();
    dispatch({ type: T.SET_EXAM, payload: e.target.value });
  }, []);

  const handleTestTypeChange = useCallback((value) => {
    cancelSpeech();
    dispatch({ type: T.SET_TEST_TYPE, payload: value });
  }, []);

  const handlePracticeTypeChange = useCallback((value) => {
    cancelSpeech();
    dispatch({ type: T.SET_PRACTICE_TYPE, payload: value });
  }, []);

  const handlePartChange = useCallback((e) => {
    cancelSpeech();
    dispatch({ type: T.SET_PART, payload: e.target.value });
  }, []);

  const handleAnswerSelect = useCallback((questionId, answerIndex) => {
    dispatch({ type: T.SET_ANSWER, payload: { questionId, answer: answerIndex } });
  }, []);

  const handleReset = useCallback(() => {
    cancelSpeech();
    dispatch({ type: T.RESET_ANSWERS });
  }, []);

  const toggleInstructions = useCallback((val) => dispatch({ type: T.SET_SHOW_INSTRUCTIONS, payload: val }), []);
  const toggleVoiceControls = useCallback((val) => dispatch({ type: T.SET_SHOW_VOICE_CONTROLS, payload: val }), []);
  const toggleAuthModal = useCallback((val) => dispatch({ type: T.SET_SHOW_AUTH_MODAL, payload: val }), []);
  const setRate = useCallback((rate) => dispatch({ type: T.SET_RATE, payload: rate }), []);
  const setCurrentQuestionIndex = useCallback((idx) => dispatch({ type: T.SET_QUESTION_INDEX, payload: idx }), []);

  const handleSubmit = useCallback((partData) => {
    const { answers, selectedExam, selectedPart, testType } = stateRef.current;
    const save = saveProgressRef.current;

    if (!partData || !partData.questions || partData.questions.length === 0) {
      dispatch({ type: T.SET_SHOW_RESULTS, payload: true });
      return;
    }

    const { scoreResult, convertedScore } = computeScore(partData, answers);
    const examCategory = partData.examCategory ?? null;

    dispatch({
      type: T.SET_RESULTS,
      payload: { scoreResult, convertedScore, examCategory },
    });

    if (!save || !currentUser) return;

    // Lưu kết quả vào DB
    save({
      exam: selectedExam,
      part: selectedPart,
      score: scoreResult.percentage,
      answers,
      totalQuestions: scoreResult.total,
      correctAnswers: scoreResult.correct,
      examCategory,
      testType: testType || 'practice',
      isDraft: false,
      timestamp: new Date().toISOString(), // 🚀 Thêm timestamp chuẩn ISO
      ...(convertedScore && {
        toeicListening: convertedScore.listening,
        toeicReading: convertedScore.reading,
        toeicTotal: convertedScore.total,
      }),
    })
    .then((ok) => {
      if (ok && import.meta.env.DEV) console.log('✅ Progress saved to Supabase');
    })
    .catch((err) => {
      console.error('❌ Save error:', err);
    });
  }, [currentUser]); // currentUser thay đổi thì cần khởi tạo lại hàm này

  return {
    ...state,
    isSignedIn: !!currentUser,
    user: currentUser,
    handleExamChange,
    handleTestTypeChange,
    handlePracticeTypeChange,
    handlePartChange,
    handleAnswerSelect,
    handleSubmit,
    handleReset,
    toggleInstructions,
    toggleVoiceControls,
    toggleAuthModal,
    setRate,
    setCurrentQuestionIndex,
  };
};

export default useAppState;