/* src/components/FullExam/hooks/useExamState.js */

import { useReducer, useCallback } from 'react';
import { EXAM_MODES, EXAM_SECTIONS } from '../constants/examConfig';
import { EXAM_TIMINGS } from '../constants/timings';

/**
 * Action types for exam state management
 * ✅ Centralized, testable, debuggable with Redux DevTools
 */
export const EXAM_ACTIONS = {
  // Navigation
  SET_MODE: 'SET_MODE',
  SET_SECTION: 'SET_SECTION',
  SET_PART: 'SET_PART',

  // Data
  SET_ANSWERS: 'SET_ANSWERS',
  ADD_ANSWER: 'ADD_ANSWER',
  SET_EXAM_DATA: 'SET_EXAM_DATA',
  SET_EXAM_ID: 'SET_EXAM_ID',

  // Timer
  SET_TIME_LEFT: 'SET_TIME_LEFT',
  TICK_TIMER: 'TICK_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESUME_TIMER: 'RESUME_TIMER',

  // UI State
  MARK_PART_PLAYED: 'MARK_PART_PLAYED',
  SET_LOADING: 'SET_LOADING',

  // Reset
  RESET_EXAM: 'RESET_EXAM',
};

const INITIAL_STATE = {
  // Navigation
  mode: EXAM_MODES.SETUP,
  section: EXAM_SECTIONS.LISTENING,
  part: 1,

  // Data
  answers: {},
  examId: 'exam1',
  examData: null,

  // Timer
  timeLeft: 0,
  isPaused: false,

  // UI
  playedListeningParts: new Set(),
  loading: false,
};

/**
 * Exam reducer function
 * Pure, predictable state transitions
 */
function examReducer(state, action) {
  switch (action.type) {
    // Navigation
    case EXAM_ACTIONS.SET_MODE:
      return { ...state, mode: action.payload };

    case EXAM_ACTIONS.SET_SECTION:
      return { ...state, section: action.payload };

    case EXAM_ACTIONS.SET_PART:
      return { ...state, part: action.payload };

    // Data
    case EXAM_ACTIONS.SET_ANSWERS:
      return { ...state, answers: action.payload };

    case EXAM_ACTIONS.ADD_ANSWER: {
      const { key, value } = action.payload;
      return {
        ...state,
        answers: { ...state.answers, [key]: value },
      };
    }

    case EXAM_ACTIONS.SET_EXAM_DATA:
      return { ...state, examData: action.payload, loading: false };

    case EXAM_ACTIONS.SET_EXAM_ID:
      return { ...state, examId: action.payload };

    // Timer
    case EXAM_ACTIONS.SET_TIME_LEFT:
      return { ...state, timeLeft: Math.max(0, action.payload) };

    case EXAM_ACTIONS.TICK_TIMER:
      return { ...state, timeLeft: Math.max(0, state.timeLeft - 1) };

    case EXAM_ACTIONS.PAUSE_TIMER:
      return { ...state, isPaused: true };

    case EXAM_ACTIONS.RESUME_TIMER:
      return { ...state, isPaused: false };

    // UI
    case EXAM_ACTIONS.MARK_PART_PLAYED: {
      const newSet = new Set(state.playedListeningParts);
      newSet.add(action.payload);
      return { ...state, playedListeningParts: newSet };
    }

    case EXAM_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    // Reset
    case EXAM_ACTIONS.RESET_EXAM:
      return INITIAL_STATE;

    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
}

/**
 * Custom hook for exam state management
 * 
 * ✅ Benefits:
 * - Single source of truth for state
 * - Easier to debug (can log all actions)
 * - Better performance (fewer re-renders)
 * - Testable actions
 * - Easy to add undo/redo
 * 
 * Usage:
 * const { state, setMode, setPart, addAnswer, ... } = useExamState();
 */
export const useExamState = () => {
  const [state, dispatch] = useReducer(examReducer, INITIAL_STATE);

  // Memoized action creators
  const actions = {
    // Navigation
    setMode: useCallback(
      (mode) => dispatch({ type: EXAM_ACTIONS.SET_MODE, payload: mode }),
      []
    ),

    setSection: useCallback(
      (section) => dispatch({ type: EXAM_ACTIONS.SET_SECTION, payload: section }),
      []
    ),

    setPart: useCallback(
      (part) => dispatch({ type: EXAM_ACTIONS.SET_PART, payload: part }),
      []
    ),

    // Data
    setAnswers: useCallback(
      (answers) => dispatch({ type: EXAM_ACTIONS.SET_ANSWERS, payload: answers }),
      []
    ),

    addAnswer: useCallback(
      (key, value) => dispatch({ type: EXAM_ACTIONS.ADD_ANSWER, payload: { key, value } }),
      []
    ),

    setExamData: useCallback(
      (data) => dispatch({ type: EXAM_ACTIONS.SET_EXAM_DATA, payload: data }),
      []
    ),

    setExamId: useCallback(
      (id) => dispatch({ type: EXAM_ACTIONS.SET_EXAM_ID, payload: id }),
      []
    ),

    // Timer
    setTimeLeft: useCallback(
      (time) => dispatch({ type: EXAM_ACTIONS.SET_TIME_LEFT, payload: time }),
      []
    ),

    tickTimer: useCallback(
      () => dispatch({ type: EXAM_ACTIONS.TICK_TIMER }),
      []
    ),

    pauseTimer: useCallback(
      () => dispatch({ type: EXAM_ACTIONS.PAUSE_TIMER }),
      []
    ),

    resumeTimer: useCallback(
      () => dispatch({ type: EXAM_ACTIONS.RESUME_TIMER }),
      []
    ),

    // UI
    markPartPlayed: useCallback(
      (part) => dispatch({ type: EXAM_ACTIONS.MARK_PART_PLAYED, payload: part }),
      []
    ),

    setLoading: useCallback(
      (loading) => dispatch({ type: EXAM_ACTIONS.SET_LOADING, payload: loading }),
      []
    ),

    // Reset
    reset: useCallback(
      () => dispatch({ type: EXAM_ACTIONS.RESET_EXAM }),
      []
    ),
  };

  return { state, ...actions };
};

/**
 * Selectors (optional, for better performance)
 */
export const selectExamMode = (state) => state.mode;
export const selectSection = (state) => state.section;
export const selectPart = (state) => state.part;
export const selectAnswers = (state) => state.answers;
export const selectTimeLeft = (state) => state.timeLeft;
export const selectIsTimerRunning = (state) => state.mode === EXAM_MODES.EXAM && !state.isPaused;
export const selectIsListeningComplete = (state) => state.section === EXAM_SECTIONS.READING;