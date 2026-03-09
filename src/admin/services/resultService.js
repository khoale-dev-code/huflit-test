import { supabase } from '../../config/supabaseClient';

export const submitExamResult = async (resultData) => {
  try {
    const { data, error } = await supabase
      .from('exam_results')
      .insert([{
        user_id: resultData.userId,
        exam_id: resultData.examId,
        score: resultData.score,
        correct_answers: resultData.correctAnswers,
        total_questions: resultData.totalQuestions,
        time_spent: resultData.timeSpent,
        answers_detail: resultData.answersDetail
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("🚨 Lỗi nộp bài:", error.message);
    return { success: false, error: error.message };
  }
};