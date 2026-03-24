// src/components/PartTestContent/PartTestContent.jsx
import { memo, useEffect, useCallback } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import PartSelector from '../Display/PartSelector';
import ContentDisplay from '../Display/ContentDisplay';
import QuestionDisplay from '../Display/QuestionDisplay';
import ResultsDisplay from '../Display/Result/ResultsDisplay';
import { StatsGrid } from '../StatsGrid';

/**
 * PartTestContent - Practice mode exam content area
 * Handles part selection, content display, and results
 */
const PartTestContent = memo((props) => {
  const {
    selectedExam, handleExamChange, testType, handleTestTypeChange,
    selectedPart, handlePartChange, partData, currentExamData,
    currentQuestionIndex, setCurrentQuestionIndex, answers, handleAnswerSelect,
    showResults, handleSubmit, handleReset, scoreResult, convertedScore,
    examCategory, isLoadingExam, isSignedIn
  } = props;

  // Auto-select first available part when testType changes
  useEffect(() => {
    if (!currentExamData?.parts) return;
    
    let availableParts = [];
    if (Array.isArray(currentExamData.parts)) {
      availableParts = currentExamData.parts.filter(p => p.type === testType).map(p => String(p.id));
    } else {
      availableParts = Object.entries(currentExamData.parts).filter(([, data]) => data.type === testType).map(([key]) => String(key));
    }

    if (availableParts.length === 0) return;
    if (!availableParts.includes(String(selectedPart))) {
      handlePartChange({ target: { value: availableParts[0] } });
    }
  }, [testType, currentExamData, selectedPart, handlePartChange]);

  // Scroll to top when showing results
  useEffect(() => {
    if (showResults) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showResults]);

  const handleSelectPart = useCallback(() => {
    const selector = document.querySelector('[role="listbox"]');
    if (selector) selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div className="w-full space-y-8 font-nunito">
      <PartSelector
        selectedExam={selectedExam} onExamChange={handleExamChange}
        testType={testType}         onTestTypeChange={handleTestTypeChange}
        selectedPart={selectedPart} onPartChange={handlePartChange}
      />

      <AnimatePresence mode="wait">
        {showResults ? (
          <Motion.div 
            key="results" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
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
            className="w-full space-y-8 min-h-[100vh]"
          >
            <ContentDisplay
              partData={partData} 
              selectedPart={selectedPart} 
              currentQuestionIndex={currentQuestionIndex}
              testType={testType} 
              examId={selectedExam} 
              isLoading={isLoadingExam} 
              onSelectPart={handleSelectPart}
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

PartTestContent.displayName = "PartTestContent";

export default PartTestContent;
