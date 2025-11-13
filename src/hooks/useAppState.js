import { useState, useCallback } from 'react';

export const useAppState = () => {
  // UI States
  const [showInstructions, setShowInstructions] = useState(true);
  const [showVoiceControls, setShowVoiceControls] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Test States
  const [selectedExam, setSelectedExam] = useState('exam1');
  const [testType, setTestType] = useState('listening');
  const [practiceType, setPracticeType] = useState('');
  const [selectedPart, setSelectedPart] = useState('part1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [rate, setRate] = useState(1.0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Event Handlers
  const handleExamChange = useCallback((e) => {
    setSelectedExam(e.target.value);
    setSelectedPart('part1');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    window.speechSynthesis.cancel();
  }, []);

  const handleTestTypeChange = useCallback((value) => {
    setTestType(value);
    setPracticeType('');
    setSelectedPart(value === 'listening' ? 'part1' : 'part5');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    window.speechSynthesis.cancel();
  }, []);

  const handlePracticeTypeChange = useCallback((value) => {
    setPracticeType(value);
    setTestType('');
    setSelectedPart('');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    window.speechSynthesis.cancel();
  }, []);

  const handlePartChange = useCallback((e) => {
    setSelectedPart(e.target.value);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    window.speechSynthesis.cancel();
  }, []);

  const handleAnswerSelect = useCallback((questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  }, []);

  const handleSubmit = useCallback(() => {
    setShowResults(true);
  }, []);

  const handleReset = useCallback(() => {
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    window.speechSynthesis.cancel();
  }, []);

  return {
    // UI States
    showInstructions,
    setShowInstructions,
    showVoiceControls,
    setShowVoiceControls,
    showAuthModal,
    setShowAuthModal,
    // Test States
    selectedExam,
    setSelectedExam,
    testType,
    setTestType,
    practiceType,
    setPracticeType,
    selectedPart,
    setSelectedPart,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    rate,
    setRate,
    answers,
    setAnswers,
    showResults,
    setShowResults,
    // Handlers
    handleExamChange,
    handleTestTypeChange,
    handlePracticeTypeChange,
    handlePartChange,
    handleAnswerSelect,
    handleSubmit,
    handleReset,
  };
};
export default useAppState;
