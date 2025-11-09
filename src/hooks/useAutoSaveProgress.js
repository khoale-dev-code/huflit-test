import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useUserProgress } from './useUserProgress';

export const useAutoSaveProgress = (answers, selectedExam, selectedPart, partData) => {
  const { user: clerkUser } = useUser();
  const { saveProgress } = useUserProgress();
  const saveTimeoutRef = useRef(null);
  const lastSavedAnswersRef = useRef('{}');

  useEffect(() => {
    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Don't auto-save if not logged in
    if (!clerkUser) {
      console.log('⏸️ Auto-save skipped: User not logged in');
      return;
    }

    // Don't auto-save if no part data
    if (!partData || !partData.questions) {
      console.log('⏸️ Auto-save skipped: No part data');
      return;
    }

    // Validate inputs
    if (!selectedExam || !selectedPart) {
      console.log('⏸️ Auto-save skipped: Missing exam or part');
      return;
    }

    // Check if answers changed
    const currentAnswersStr = JSON.stringify(answers);
    const answersChanged = currentAnswersStr !== lastSavedAnswersRef.current;
    const hasAnswers = Object.keys(answers).length > 0;

    console.log('🔍 Auto-save check:', {
      hasAnswers,
      answersChanged,
      answerCount: Object.keys(answers).length,
      clerkUserId: clerkUser.id,
    });

    if (answersChanged && hasAnswers) {
      console.log('⏱️ Auto-save scheduled in 30 seconds...');
      
      // Auto-save after 30 seconds of inactivity
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          // Calculate score from answers
          let correct = 0;
          const total = partData.questions.length;

          // answers is an object: { questionId: answerIndex, ... }
          // Convert to proper format for saving
          const answersList = [];
          
          partData.questions.forEach((question) => {
            const answerIndex = answers[question.id];
            if (answerIndex !== undefined) {
              answersList.push({
                questionId: question.id,
                answerIndex: answerIndex,
              });
              
              // Check if correct
              if (question.correct === answerIndex) {
                correct++;
              }
            }
          });

          const percentage = total > 0 ? (correct / total) * 100 : 0;

          console.log('💾 Auto-saving progress...', {
            exam: selectedExam,
            part: selectedPart,
            score: Math.round(percentage),
            answersCount: answersList.length,
            totalQuestions: total,
          });

          // Save with all required fields
          const success = await saveProgress({
            exam: selectedExam,
            part: selectedPart,
            score: Math.round(percentage),
            answers: answersList, // Send as array of objects
            totalQuestions: total,
            isDraft: true, // Mark as draft (not submitted)
          });

          if (success) {
            lastSavedAnswersRef.current = currentAnswersStr;
            console.log('✅ Auto-save successful!');
          } else {
            console.warn('⚠️ Auto-save returned false');
          }
        } catch (error) {
          console.error('❌ Error auto-saving:', error.message);
        }
      }, 30000); // 30 seconds
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [answers, selectedExam, selectedPart, partData, saveProgress, clerkUser]);
};