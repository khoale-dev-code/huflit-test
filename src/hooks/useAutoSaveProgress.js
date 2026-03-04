import { useEffect, useRef } from 'react';
import { useUserProgress } from './useUserProgress';

/**
 * Hook tự động lưu progress sau 30 giây không có thay đổi
 */
export const useAutoSaveProgress = (answers, selectedExam, selectedPart, partData) => {
  const { saveProgress, currentUser } = useUserProgress();
  const saveTimeoutRef        = useRef(null);
  const lastSavedAnswersRef   = useRef('{}');

  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    // ✅ FIX: chỉ cần check currentUser tồn tại và có id
    // KHÔNG check .provider vì currentUser từ hook chỉ có id/email/name/photoURL
    if (!currentUser?.id) {
      console.log('⏸️ Auto-save skipped: not logged in');
      return;
    }

    if (!partData?.questions) {
      console.log('⏸️ Auto-save skipped: no part data');
      return;
    }

    const currentAnswersStr = JSON.stringify(answers);
    const answersChanged    = currentAnswersStr !== lastSavedAnswersRef.current;
    const hasAnswers        = Object.keys(answers).length > 0;

    if (!answersChanged || !hasAnswers) return;

    console.log(`⏱️ Auto-save scheduled in 30s... (${Object.keys(answers).length} answers)`);

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const correct = Object.entries(answers).filter(([questionId, answerIndex]) => {
          const question = partData.questions.find((q) => q.id === questionId);
          return question && question.correct === answerIndex;
        }).length;

        const total      = partData.questions.length;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

        console.log('💾 Auto-saving...', { exam: selectedExam, part: selectedPart, score: percentage });

        const result = await saveProgress({
          exam:           selectedExam,
          part:           selectedPart,
          score:          percentage,   // số, không phải object
          answers,
          totalQuestions: total,
          correctAnswers: correct,
          isDraft:        true,
          testType:       'auto-save',
        });

        if (result) {
          lastSavedAnswersRef.current = currentAnswersStr;
          console.log('✅ Auto-save successful!');
        } else {
          console.warn('⚠️ Auto-save returned false');
        }
      } catch (err) {
        console.error('❌ Auto-save error:', err.message);
      }
    }, 30000);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [answers, selectedExam, selectedPart, partData, saveProgress, currentUser]);
};

export default useAutoSaveProgress;