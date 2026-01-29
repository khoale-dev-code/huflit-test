import { useReducer, useRef, useCallback } from 'react';

const initialState = {
  // UI States
  showInstructions: true,
  showVoiceControls: true,
  showAuthModal: false,
  
  // Test States
  selectedExam: 'exam1',
  testType: 'listening',
  practiceType: '',
  selectedPart: 'part1',
  currentQuestionIndex: 0,
  rate: 1.0,
  answers: {},
  showResults: false,
};

const actionTypes = {
  // UI Actions
  SET_SHOW_INSTRUCTIONS: 'SET_SHOW_INSTRUCTIONS',
  SET_SHOW_VOICE_CONTROLS: 'SET_SHOW_VOICE_CONTROLS',
  SET_SHOW_AUTH_MODAL: 'SET_SHOW_AUTH_MODAL',
  
  // Test Actions
  SET_EXAM: 'SET_EXAM',
  SET_TEST_TYPE: 'SET_TEST_TYPE',
  SET_PRACTICE_TYPE: 'SET_PRACTICE_TYPE',
  SET_PART: 'SET_PART',
  SET_QUESTION_INDEX: 'SET_QUESTION_INDEX',
  SET_RATE: 'SET_RATE',
  SET_ANSWER: 'SET_ANSWER',
  RESET_ANSWERS: 'RESET_ANSWERS',
  SET_SHOW_RESULTS: 'SET_SHOW_RESULTS',
  RESET_TEST: 'RESET_TEST',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SHOW_INSTRUCTIONS:
      return { ...state, showInstructions: action.payload };
    
    case actionTypes.SET_SHOW_VOICE_CONTROLS:
      return { ...state, showVoiceControls: action.payload };
    
    case actionTypes.SET_SHOW_AUTH_MODAL:
      return { ...state, showAuthModal: action.payload };
    
    case actionTypes.SET_EXAM:
      return {
        ...state,
        selectedExam: action.payload,
        selectedPart: 'part1',
        currentQuestionIndex: 0,
        answers: {},
        showResults: false,
      };
    
    case actionTypes.SET_TEST_TYPE:
      return {
        ...state,
        testType: action.payload,
        practiceType: '',
        selectedPart: action.payload === 'listening' ? 'part1' : 'part5',
        currentQuestionIndex: 0,
        answers: {},
        showResults: false,
      };
    
    case actionTypes.SET_PRACTICE_TYPE:
      return {
        ...state,
        practiceType: action.payload,
        testType: '',
        selectedPart: '',
        currentQuestionIndex: 0,
        answers: {},
        showResults: false,
      };
    
    case actionTypes.SET_PART:
      return {
        ...state,
        selectedPart: action.payload,
        currentQuestionIndex: 0,
        answers: {},
        showResults: false,
      };
    
    case actionTypes.SET_QUESTION_INDEX:
      return { ...state, currentQuestionIndex: action.payload };
    
    case actionTypes.SET_RATE:
      return { ...state, rate: action.payload };
    
    case actionTypes.SET_ANSWER:
      return {
        ...state,
        answers: { ...state.answers, [action.payload.questionId]: action.payload.answer },
      };
    
    case actionTypes.RESET_ANSWERS:
      return { ...state, answers: {}, showResults: false, currentQuestionIndex: 0 };
    
    case actionTypes.SET_SHOW_RESULTS:
      return { ...state, showResults: action.payload };
    
    case actionTypes.RESET_TEST:
      return {
        ...state,
        selectedPart: 'part1',
        currentQuestionIndex: 0,
        answers: {},
        showResults: false,
        rate: 1.0,
      };
    
    default:
      return state;
  }
};

// Helper to clear speech synthesis
const cancelSpeech = () => {
  try {
    window.speechSynthesis?.cancel();
  } catch (e) {
    console.error('Error canceling speech:', e);
  }
};

export const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const callbackCacheRef = useRef({});

  // Create callbacks only once - stored in ref to maintain stable references
  if (!callbackCacheRef.current.handleExamChange) {
    callbackCacheRef.current = {
      handleExamChange: (e) => {
        cancelSpeech();
        dispatch({ type: actionTypes.SET_EXAM, payload: e.target.value });
      },
      
      handleTestTypeChange: (value) => {
        cancelSpeech();
        dispatch({ type: actionTypes.SET_TEST_TYPE, payload: value });
      },
      
      handlePracticeTypeChange: (value) => {
        cancelSpeech();
        dispatch({ type: actionTypes.SET_PRACTICE_TYPE, payload: value });
      },
      
      handlePartChange: (e) => {
        cancelSpeech();
        dispatch({ type: actionTypes.SET_PART, payload: e.target.value });
      },
      
      handleAnswerSelect: (questionId, answerIndex) => {
        dispatch({ 
          type: actionTypes.SET_ANSWER, 
          payload: { questionId, answer: answerIndex } 
        });
      },
      
      handleSubmit: () => {
        dispatch({ type: actionTypes.SET_SHOW_RESULTS, payload: true });
      },
      
      handleReset: () => {
        cancelSpeech();
        dispatch({ type: actionTypes.RESET_ANSWERS });
      },
      
      // UI Handlers
      toggleInstructions: (value) => {
        dispatch({ type: actionTypes.SET_SHOW_INSTRUCTIONS, payload: value });
      },
      
      toggleVoiceControls: (value) => {
        dispatch({ type: actionTypes.SET_SHOW_VOICE_CONTROLS, payload: value });
      },
      
      toggleAuthModal: (value) => {
        dispatch({ type: actionTypes.SET_SHOW_AUTH_MODAL, payload: value });
      },
      
      setRate: (rate) => {
        dispatch({ type: actionTypes.SET_RATE, payload: rate });
      },
      
      setCurrentQuestionIndex: (index) => {
        dispatch({ type: actionTypes.SET_QUESTION_INDEX, payload: index });
      },
    };
  }

  return {
    // UI States
    showInstructions: state.showInstructions,
    showVoiceControls: state.showVoiceControls,
    showAuthModal: state.showAuthModal,
    
    // Test States
    selectedExam: state.selectedExam,
    testType: state.testType,
    practiceType: state.practiceType,
    selectedPart: state.selectedPart,
    currentQuestionIndex: state.currentQuestionIndex,
    rate: state.rate,
    answers: state.answers,
    showResults: state.showResults,
    
    // Event Handlers - stable references
    handleExamChange: callbackCacheRef.current.handleExamChange,
    handleTestTypeChange: callbackCacheRef.current.handleTestTypeChange,
    handlePracticeTypeChange: callbackCacheRef.current.handlePracticeTypeChange,
    handlePartChange: callbackCacheRef.current.handlePartChange,
    handleAnswerSelect: callbackCacheRef.current.handleAnswerSelect,
    handleSubmit: callbackCacheRef.current.handleSubmit,
    handleReset: callbackCacheRef.current.handleReset,
    toggleInstructions: callbackCacheRef.current.toggleInstructions,
    toggleVoiceControls: callbackCacheRef.current.toggleVoiceControls,
    toggleAuthModal: callbackCacheRef.current.toggleAuthModal,
    setRate: callbackCacheRef.current.setRate,
    setCurrentQuestionIndex: callbackCacheRef.current.setCurrentQuestionIndex,
  };
};

export default useAppState;