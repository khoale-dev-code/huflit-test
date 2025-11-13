import { useEffect, useRef } from 'react';
import { useUserProgress } from './useUserProgress';

/**
 * Hook tự động lưu progress sau 30 giây không có thay đổi
 * Hỗ trợ cả Clerk và Firebase Authentication
 */
export const useAutoSaveProgress = (answers, selectedExam, selectedPart, partData) => {
  const { saveProgress, currentUser } = useUserProgress();
  const saveTimeoutRef = useRef(null);
  const lastSavedAnswersRef = useRef('{}');

  useEffect(() => {
    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // ✅ FIX 1: Kiểm tra currentUser đúng cách
    if (!currentUser || !currentUser.provider) {
      console.log('⏸️ Auto-save skipped: User not logged in or provider missing', {
        currentUser,
      });
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
      userId: currentUser.id,
      provider: currentUser.provider,
      clerkId: currentUser.clerkId,
      firebaseUid: currentUser.firebaseUid,
    });

    if (answersChanged && hasAnswers) {
      console.log(`⏱️ Auto-save scheduled in 30 seconds (${currentUser.provider})...`);

      // Auto-save after 30 seconds of inactivity
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          // Calculate score
          const correct = Object.entries(answers).filter(([questionId, answerIndex]) => {
            const question = partData.questions.find(q => q.id === questionId);
            return question && question.correct === answerIndex;
          }).length;

          const total = partData.questions.length;
          const percentage = total > 0 ? (correct / total) * 100 : 0;
          const correctAnswers = correct;

          console.log(`💾 Auto-saving progress (${currentUser.provider})...`, {
            exam: selectedExam,
            part: selectedPart,
            score: percentage,
            correctAnswers,
            totalQuestions: total,
            answersCount: Object.keys(answers).length,
            userId: currentUser.id,
            clerkId: currentUser.clerkId,
            firebaseUid: currentUser.firebaseUid,
          });

          // ✅ FIX 2: Pass correct data structure
          const result = await saveProgress({
            exam: selectedExam,
            part: selectedPart,
            score: percentage,
            answers: answers,
            totalQuestions: total,
            correctAnswers: correctAnswers,
            isDraft: true, // Mark as draft (not submitted)
            testType: 'auto-save',
          });

          if (result) {
            lastSavedAnswersRef.current = currentAnswersStr;
            console.log(`✅ Auto-save successful (${currentUser.provider})!`);
          } else {
            console.warn(`⚠️ Auto-save returned false (${currentUser.provider})`);
          }
        } catch (error) {
          console.error('❌ Error auto-saving:', {
            message: error.message,
            code: error.code,
            provider: currentUser.provider,
          });
        }
      }, 30000); // 30 seconds
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [answers, selectedExam, selectedPart, partData, saveProgress, currentUser]);
};

export default useAutoSaveProgress;