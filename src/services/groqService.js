// src/services/groqService.js

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
// 🚀 NÂNG CẤP LÕI: Dùng model 70B siêu thông minh, xử lý đa luồng logic cực đỉnh
const DEFAULT_MODEL = "llama-3.3-70b-versatile"; 


/* ════════════════════════════════════════════════════════════════
   1. UTILS - TIỆN ÍCH BẢO MẬT & XỬ LÝ DỮ LIỆU
════════════════════════════════════════════════════════════════ */

const getApiKey = () => {
  const key = import.meta.env.VITE_GROQ_API_KEY;
  if (!key) {
    console.error("⚠️ LỖI CHÍ MẠNG: Không tìm thấy VITE_GROQ_API_KEY trong môi trường!");
    throw new Error("Hệ thống chưa được cấu hình API Key. Vui lòng kiểm tra lại file .env"); 
  }
  return key;
};

// 🚀 HÀM NÀY PHẢI NẰM Ở ĐÂY (TRƯỚC KHI GỌI FETCH)
const parseSafeJSON = (rawText) => {
  try {
    const jsonMatch = rawText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    const cleanText = jsonMatch ? jsonMatch[0] : rawText;
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("❌ Lỗi Parse JSON từ Giáo sư AI:", error, "\nRaw Text:", rawText);
    throw new Error("Giáo sư AI đang bị lag định dạng. Vui lòng thử lại!");
  }
};

/* ════════════════════════════════════════════════════════════════
   2. CORE - HÀM GỐC GỌI API
════════════════════════════════════════════════════════════════ */

const fetchFromGroq = async (systemPrompt, userPrompt, temperature = 0.2) => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${getApiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: temperature,
        response_format: { type: "json_object" } 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Lỗi HTTP: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim() || "{}";
    
    // 🚀 LÚC NÀY NÓ MỚI GỌI HÀM BÊN TRÊN
    return parseSafeJSON(content);
  } catch (error) {
    console.error("🌐 [Groq API Error]:", error);
    throw new Error(error.message || "Mạng lưới AI đang tắc nghẽn, vui lòng thử lại sau!");
  }
};
/* ════════════════════════════════════════════════════════════════
   3. SERVICES - CÁC TÍNH NĂNG NGHIỆP VỤ
════════════════════════════════════════════════════════════════ */

export const analyzeGrammarWithGroq = async (text) => {
  const systemPrompt = `Bạn là chuyên gia ngôn ngữ học. Trả về JSON DUY NHẤT phân tích câu:
{
  "translation": "Dịch...",
  "grammar_points": [{ "point": "...", "explanation": "..." }],
  "vocabulary": [{ "word": "...", "type": "...", "meaning": "..." }],
  "advice": "..."
}`;
  const userPrompt = `Hãy phân tích: "${text}"`;
  return await fetchFromGroq(systemPrompt, userPrompt, 0.1);
};


// ─── TÍNH NĂNG 2: GIÁO SƯ AI - GIẢNG BÀI & RA 7 DẠNG ĐỀ STORY ───
export const generateGrammarLesson = async (topic, level) => {
  // 🚀 TỐI ƯU PROMPT CHO MODEL 70B: Dùng "Template Dictionary" cực kỳ rõ ràng
  const systemPrompt = `Bạn là một Giáo sư Tiếng Anh Gen Z 'mỏ hỗn'.
Nhiệm vụ: Tạo 1 bài giảng và 10 câu bài tập về "${topic}" (Trình độ: ${level}).

🌟 QUY TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ):
1. NGÔN NGỮ: "theory", "story_context", "hint" -> Tiếng Việt Gen Z (lầy lội, cà khịa). "exercises" -> 100% TIẾNG ANH.
2. CỐT TRUYỆN: 10 câu bài tập tạo thành MỘT DRAMA LIÊN TỤC (vd: bắt cá hai tay, đánh ghen...).
3. XUẤT ĐÚNG 10 CÂU, trộn lẫn ngẫu nhiên các loại bài tập từ TỪ ĐIỂN KHUÔN MẪU dưới đây.

📚 TỪ ĐIỂN KHUÔN MẪU BÀI TẬP (COPY CHÍNH XÁC ĐỊNH DẠNG NÀY):

[Loại 1: multiple_choice] (Phải có "___" và 4 options)
{"id": "q1", "type": "multiple_choice", "question": "He ___ my heart yesterday.", "options": ["break", "broke", "broken", "breaks"], "hint": "Nhắc nhẹ...", "correct_answer": "broke"}

[Loại 2: fill_in_the_blank] (Phải có "___", KHÔNG có options)
{"id": "q2", "type": "fill_in_the_blank", "question": "I saw him ___ the street.", "hint": "Nhắc nhẹ...", "correct_answer": "crossing"}

[Loại 3: error_identification] (Đánh dấu [A], [B], [C], [D] NGAY SAU TỪ LỖI. options phải là A, B, C, D)
{"id": "q3", "type": "error_identification", "question": "She love [A] him very [B] much [C] yesterday [D].", "options": ["A", "B", "C", "D"], "hint": "Nhắc nhẹ...", "correct_answer": "A"}

[Loại 4: sentence_transformation] (Phải có dấu "->" để bắt đầu câu mới)
{"id": "q4", "type": "sentence_transformation", "question": "He is very rich. -> Despite...", "hint": "Nhắc nhẹ...", "correct_answer": "Despite being very rich"}

[Loại 5: word_formation] (Phải có "___" và (TỪ GỐC) viết hoa)
{"id": "q5", "type": "word_formation", "question": "His action was completely ___ (ACCEPT).", "hint": "Nhắc nhẹ...", "correct_answer": "unacceptable"}

[Loại 6: sentence_ordering] (Phải có các từ cách nhau bằng " / ")
{"id": "q6", "type": "sentence_ordering", "question": "you / do / love / me / ?", "hint": "Nhắc nhẹ...", "correct_answer": "do you love me?"}

[Loại 7: translation] (Đề bài Tiếng Việt drama, đáp án Tiếng Anh)
{"id": "q7", "type": "translation", "question": "Anh ta đã cắm sừng tôi hôm qua.", "hint": "Nhắc nhẹ...", "correct_answer": "He cheated on me yesterday."}

JSON FORMAT BẮT BUỘC TRẢ VỀ:
{
  "theory": "...",
  "story_context": "...",
  "exercises": [ { CHÈN CÁC OBJECT THEO KHUÔN MẪU Ở TRÊN VÀO ĐÂY (ĐÚNG 10 CÂU) } ]
}`;

  const userPrompt = `Tạo bài giảng và 10 câu bài tập drama tiếng Anh cho chủ đề: "${topic}". Trộn lẫn đa dạng các dạng bài từ Từ điển. CHỈ XUẤT JSON DUY NHẤT.`;
  
  // Model 70B xử lý logic cực tốt, temperature 0.35 giúp nó sáng tạo drama mặn mòi mà không làm vỡ format
  return await fetchFromGroq(systemPrompt, userPrompt, 0.35); 
};


// ─── TÍNH NĂNG 3: GIÁO SƯ AI - CHẤM ĐIỂM & PHONG THẦN ───
export const evaluateGrammarPractice = async (topic, level, exercises, userAnswers) => {
  const systemPrompt = `Bạn là Giáo sư Gen Z chấm bài 'mỏ hỗn'. 

🚀 THUẬT TOÁN CHẤM ĐIỂM (BẮT BUỘC TUÂN THỦ CHÍNH XÁC 100%):
1. Tôi sẽ cung cấp mảng "exercises" (Đề bài gốc chứa "correct_answer") và "userAnswers" (Đáp án học sinh).
2. KIỂM TRA ĐÚNG/SAI (isCorrect): 
   - NẾU đáp án học sinh TRÙNG KHỚP với correct_answer -> isCorrect: true.
   - NẾU KHÁC -> isCorrect: false.
3. TÍNH TOÁN (score_percentage): Đếm số lượng isCorrect = true chia cho tổng số câu, nhân 100.
4. PHẢN HỒI ("explanation"): 
   - Nếu đúng: Khen xéo xắt.
   - Nếu sai: Mắng mỏ lầy lội bằng Tiếng Việt, GIẢI THÍCH RÕ TẠI SAO SAI dựa vào ngữ pháp.

CHỈ TRẢ VỀ JSON DUY NHẤT THEO FORMAT SAU (Mảng results NẰM TRÊN CÙNG ĐỂ CHẤM TRƯỚC):
{
  "results": [
    {
      "id": "q1",
      "isCorrect": true,
      "correct_answer": "broke",
      "explanation": "Biết xài V2 'broke' là cũng có tí não đấy, không uổng công tôi dạy.",
      "tip": "Cứ thấy 'yesterday' thì chia quá khứ đơn nha."
    }
  ],
  "score_percentage": 100,
  "title": "Chiến thần IELTS",
  "overall_feedback": "Đỉnh chóp! Giữ vững phong độ này thì 9.0 IELTS không còn xa!"
}`;

  // Tiền xử lý đáp án cực kỳ chặt chẽ trước khi gửi cho AI (Bảo vệ UI)
  const cleanedAnswers = {};
  for (const key in userAnswers) {
    if (typeof userAnswers[key] === 'string') {
      cleanedAnswers[key] = userAnswers[key].trim().toLowerCase().replace(/[.,!?]+$/, '');
    } else {
      cleanedAnswers[key] = userAnswers[key];
    }
  }

  const cleanedExercises = exercises.map(ex => ({
    ...ex,
    correct_answer: typeof ex.correct_answer === 'string' 
      ? ex.correct_answer.trim().toLowerCase().replace(/[.,!?]+$/, '') 
      : ex.correct_answer
  }));

  const userPrompt = `Đề bài gốc: ${JSON.stringify(cleanedExercises)}\nĐáp án học sinh: ${JSON.stringify(cleanedAnswers)}\n\nHãy đối chiếu và chấm điểm. XUẤT JSON NGAY LẬP TỨC.`;
  
  // Chấm điểm là Toán Học & Logic cứng -> Temperature = 0
  return await fetchFromGroq(systemPrompt, userPrompt, 0);
};