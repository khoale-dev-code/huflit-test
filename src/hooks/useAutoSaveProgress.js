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

    // Check if answers changed
    const currentAnswersStr = JSON.stringify(answers);
    const answersChanged = currentAnswersStr !== lastSavedAnswersRef.current;
    const hasAnswers = Object.keys(answers).length > 0;

    console.log('🔍 Auto-save check:', {
      hasAnswers,
      answersChanged,
      answerCount: Object.keys(answers).length,
      clerkUserId: clerkUser.id
    });

    if (answersChanged && hasAnswers) {
      console.log('⏱️ Auto-save scheduled in 30 seconds...');
      
      // Auto-save after 30 seconds of inactivity
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          // Calculate score
          const correct = Object.entries(answers).filter(
            ([questionId, answerIndex]) => {
              const question = partData.questions.find(q => q.id === questionId);
              return question && question.correct === answerIndex;
            }
          ).length;

          const total = partData.questions.length;
          const percentage = total > 0 ? (correct / total) * 100 : 0;

          console.log('💾 Auto-saving progress...', {
            exam: selectedExam,
            part: selectedPart,
            score: percentage,
            answersCount: Object.keys(answers).length,
            totalQuestions: total
          });

          await saveProgress({
            exam: selectedExam,
            part: selectedPart,
            score: percentage,
            answers: answers,
            totalQuestions: total,
            isDraft: true, // Mark as draft (not submitted)
          });

          lastSavedAnswersRef.current = currentAnswersStr;
          console.log('✅ Auto-save successful!');
        } catch (error) {
          console.error('❌ Error auto-saving:', error);
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