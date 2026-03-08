import { useCallback, useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';

// ─────────────────────────────────────────────
// useGroqAdvisor — Using Groq Llama 3.3 API
// PRO & STABLE VERSION
// ─────────────────────────────────────────────

const FALLBACK_ADVICE = {
  message: 'Có vẻ bạn chọn chưa chính xác. Hãy ôn lại lý thuyết phần này để hiểu rõ hơn nhé!',
  tips: [
    'Nhìn kỹ vào từ khóa (keyword) trong câu hỏi',
    'So sánh với ví dụ trong bài học',
    'Hỏi lại giáo viên nếu vẫn còn thắc mắc'
  ]
};

// Helper: convert 0-based index → letter (0→A, 1→B, 2→C, 3→D)
const indexToLetter = (index) => {
  if (index === undefined || index === null || index < 0) return '?';
  return String.fromCharCode(65 + index);
};

let groqClient = null;

// Initialize Groq once
const initGroq = () => {
  if (groqClient) return groqClient;
  
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    console.error('❌ VITE_GROQ_API_KEY not found in .env.local');
    return null;
  }
  
  console.log('✅ Initializing Groq with API key:', apiKey.slice(0, 10) + '...');
  groqClient = new Groq({ apiKey, dangerouslyAllowBrowser: true });
  return groqClient;
};

export const useGroqAdvisor = () => {
  const [aiAdvice, setAiAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const abortControllerRef = useRef(null);
  const cacheRef = useRef(new Map());

  useEffect(() => {
    const client = initGroq();
    if (!client) {
      console.warn('⚠️ Groq not initialized - check API key');
      setError('API key not configured');
    }
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const getAdvice = useCallback(async (question, userAnswer, correctAnswer, explanation, options = []) => {
    if (!groqClient) {
      console.warn('⚠️ Groq not initialized, using fallback');
      setAiAdvice(FALLBACK_ADVICE);
      return;
    }

    const cacheKey = `${question}|${userAnswer}|${correctAnswer}`;
    
    if (cacheRef.current.has(cacheKey)) {
      console.log('📦 [Groq] Using cached response');
      setAiAdvice(cacheRef.current.get(cacheKey));
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setLoading(true);
    setError(null);
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // ✅ FIX: Use letter labels (A/B/C/D) instead of raw index numbers
      const userAnswerLetter = indexToLetter(userAnswer);
      const correctAnswerLetter = indexToLetter(correctAnswer);
      const userAnswerText = options[userAnswer]?.text || options[userAnswer] || 'Không chọn';
      const correctAnswerText = options[correctAnswer]?.text || options[correctAnswer] || 'Không có';

      console.log('⚡ [Groq] Calling Groq API (Llama 3.3)...');

      const systemPrompt = `Bạn là một giáo viên tiếng Anh tận tâm, xuất sắc và hài hước. Học sinh của bạn vừa làm sai một câu.
Nhiệm vụ của bạn là giải thích lỗi sai thật dễ hiểu, mang tính khích lệ, và KHÔNG bao giờ chê bai.

QUAN TRỌNG: Khi đề cập đến các đáp án, LUÔN dùng chữ cái (A, B, C, D) thay vì số (0, 1, 2, 3).
Ví dụ: "Bạn đã chọn đáp án A" hoặc "Đáp án đúng là B", KHÔNG nói "bạn chọn đáp án 0" hay "đáp án 1".

BẠN BẮT BUỘC PHẢI TRẢ VỀ DỮ LIỆU DƯỚI DẠNG JSON với đúng 2 trường sau:
{
  "message": "Viết một đoạn văn hoàn chỉnh (khoảng 3-4 câu). Bao gồm: 1. Tại sao đáp án của học sinh sai (dùng tên chữ cái đáp án). 2. Tại sao đáp án kia mới đúng (kèm ví dụ cụ thể). 3. Lời động viên. (Hãy dùng Markdown như in đậm **từ khóa** để làm nổi bật).",
  "tips": [
    "Mẹo 1: Một mẹo ngắn gọn để nhớ quy tắc này",
    "Mẹo 2: Dấu hiệu nhận biết trong câu",
    "Mẹo 3: Một bước hành động nhỏ"
  ]
}

Tuyệt đối không giải thích gì thêm ngoài cấu trúc JSON này.`;

      const userPrompt = `Câu hỏi: "${question}"
Người học chọn: Đáp án ${userAnswerLetter} - "${userAnswerText}"
Đáp án đúng: Đáp án ${correctAnswerLetter} - "${correctAnswerText}"
Giải thích gốc của bài học: "${explanation}"`;

      const response = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama-3.3-70b-versatile',
        response_format: { type: 'json_object' },
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
      });

      if (signal.aborted) return;

      const aiText = response.choices[0]?.message?.content || '{}';
      const adviceObj = parseGroqResponse(aiText);
      
      cacheRef.current.set(cacheKey, adviceObj);
      setAiAdvice(adviceObj);

    } catch (err) {
      if (err.name === 'AbortError' || signal.aborted) {
        console.log('🛑 [Groq] Request aborted by user action');
        return;
      }
      console.error('❌ [Groq] Error:', err.message);
      setError(err.message);
      setAiAdvice(FALLBACK_ADVICE);
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const clearAdvice = useCallback(() => {
    setAiAdvice(null);
    setError(null);
  }, []);

  const clearCache = useCallback(() => {
    cacheRef.current.clear();
    console.log('🗑️ [Groq] Cache cleared');
  }, []);

  return { aiAdvice, loading, error, getAdvice, clearAdvice, clearCache };
};

function parseGroqResponse(aiText) {
  try {
    const parsedData = JSON.parse(aiText);
    return {
      message: parsedData.message || FALLBACK_ADVICE.message,
      tips: Array.isArray(parsedData.tips) && parsedData.tips.length > 0 
        ? parsedData.tips 
        : FALLBACK_ADVICE.tips
    };
  } catch (error) {
    console.error('❌ [Groq] Failed to parse JSON response:', error);
    return {
      message: aiText,
      tips: FALLBACK_ADVICE.tips
    };
  }
}

export default useGroqAdvisor;