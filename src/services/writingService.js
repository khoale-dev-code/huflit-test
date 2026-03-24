// src/services/writingService.js
// AI Writing Services - Tách riêng để tối ưu performance

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const callGroqAPI = async (systemPrompt, userPrompt, temperature = 0.3) => {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature,
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Lỗi kết nối AI');
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content?.trim();
  
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : content);
  } catch {
    throw new Error('AI trả về định dạng không hợp lệ');
  }
};

// Generate Writing Prompt
export const generateWritingPrompt = async (type, level, wordCount, topic = null) => {
  const levelInfo = { IELTS_5: 'IELTS 5.0-5.5', IELTS_6: 'IELTS 6.0-6.5', IELTS_7: 'IELTS 7.0-7.5', IELTS_8: 'IELTS 8.0+' };
  const typeInfo = { essay: 'Essay', email: 'Email', letter: 'Letter', report: 'Report', paragraph: 'Paragraph' };
  
  let topicPrompt = topic ? `Chủ đề cụ thể: "${topic.prompt}"` : '';

  const systemPrompt = `Bạn là giáo viên IELTS Writing chuyên nghiệp. 
Tạo đề bài writing phù hợp với trình độ học viên.
LUÔN trả về JSON format:
{
  "title": "Tiêu đề bài viết",
  "prompt": "Nội dung đề bài chi tiết (LUÔN bằng TIẾNG ANH)",
  "prompt_vi": "Dịch đề bài sang TIẾNG VIỆT",
  "topic": "Chủ đề chính",
  "task_type": "Loại bài",
  "structure": {
    "introduction": "Hướng dẫn viết mở bài",
    "body1": "Hướng dẫn viết đoạn 1",
    "body2": "Hướng dẫn viết đoạn 2",
    "conclusion": "Hướng dẫn viết kết bài"
  },
  "tips": ["Gợi ý 1", "Gợi ý 2", "Gợi ý 3"],
  "vocabulary": ["từ vựng 1", "từ vựng 2"],
  "sample_intro": "Ví dụ mở bài"
}`;

  const userPrompt = `Tạo đề bài Writing IELTS loại: ${typeInfo[type] || 'Essay'}
Trình độ: ${levelInfo[level] || 'IELTS 6.0-6.5'}
Số từ: ${wordCount.min}-${wordCount.max} từ
${topicPrompt}

Hãy tạo đề bài thực tế, bằng TIẾNG ANH.`;

  return await callGroqAPI(systemPrompt, userPrompt, 0.7);
};

// Translate Text
export const translateText = async (text) => {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: 'Dịch tiếng Anh sang tiếng Việt tự nhiên, dễ hiểu. Chỉ trả về bản dịch.' },
        { role: 'user', content: `Dịch đoạn sau sang tiếng Việt:\n\n${text}` }
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    throw new Error('Lỗi khi dịch');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content?.trim() || text;
};

// Get AI Hints for Writing - BẰNG TIẾNG ANH
export const getAIHints = async (prompt, writingType) => {
  const systemPrompt = `You are an IELTS Writing expert teacher guiding students.
Provide step-by-step hints like "life buoys" to help students.
ALL CONTENT MUST BE IN ENGLISH.

JSON format:
{
  "steps": [
    { 
      "step": 1, 
      "title": "Step title (English)", 
      "content": "Detailed guidance in English with examples",
      "example": "Example phrase or sentence in English"
    }
  ],
  "vocabulary": ["useful word 1", "useful word 2", "academic phrase 1"],
  "phrases": [
    "On the one hand...",
    "Furthermore...",
    "In conclusion..."
  ],
  "connectors": ["Moreover", "However", "Nevertheless", "Therefore", "In addition"],
  "common_mistakes": ["Mistake 1", "Mistake 2"],
  "quick_tips": ["Quick tip 1", "Quick tip 2"]
}`;

  const userPrompt = `Guide me through this IELTS ${writingType} writing task:\n\nTopic: ${prompt}\n\nProvide helpful hints, vocabulary, phrases, and connectors IN ENGLISH to help me write a better essay.`;

  return await callGroqAPI(systemPrompt, userPrompt, 0.6);
};

// Grade Writing
export const gradeWriting = async (text, prompt, type, level) => {
  const systemPrompt = `Bạn là giáo viên IELTS Writing chấm bài theo tiêu chí IELTS:
1. Task Achievement (25%)
2. Coherence and Cohesion (25%)  
3. Lexical Resource (25%)
4. Grammatical Range and Accuracy (25%)

JSON format:
{
  "overall_score": 6.5,
  "task_achievement": { "score": 6, "comment": "..." },
  "coherence": { "score": 6.5, "comment": "..." },
  "lexical": { "score": 6, "comment": "..." },
  "grammar": { "score": 7, "comment": "..." },
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "suggestions": ["...", "..."],
  "sample_improved": "Bài viết được cải thiện..."
}`;

  const userPrompt = `Đề bài: ${prompt}\n\nBài viết của học sinh:\n${text}\n\nHãy chấm điểm chi tiết theo tiêu chí IELTS.`;

  return await callGroqAPI(systemPrompt, userPrompt, 0.2);
};
