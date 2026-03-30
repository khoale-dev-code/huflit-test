// src/services/geminiService.js
import { GoogleGenAI } from "@google/genai"; // 🚀 DÙNG SDK MỚI NHẤT

// ============================================================
// 0. CONFIG & SETUP GEMINI
// ============================================================
const getApiKey = () => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key) {
    throw new Error("⚠️ Thiếu VITE_GEMINI_API_KEY trong file .env!");
  }
  return key;
};

// Khởi tạo client theo chuẩn SDK mới
const ai = new GoogleGenAI({ apiKey: getApiKey() });

// 🚀 Khuyên dùng gemini-1.5-flash vì tốc độ siêu nhanh và cực kỳ ổn định với JSON
const GEMINI_MODEL = "gemini-2.5-flash"; 

// ============================================================
// 1. CONSTANTS — Lesson type definitions
// ============================================================
const LESSON_TYPES = {
  GRAMMAR:    "grammar",
  VOCABULARY: "vocabulary",
  EXAM_TIPS:  "exam_tips",
  SKILLS:     "skills",
};

// ============================================================
// 2. TEMPLATE LIBRARY (Optimized for JSON Content Blocks)
// LƯU Ý: Đã xóa phần "5. Mini-Test" bằng HTML để nhường chỗ cho Component MiniChallenge
// ============================================================
const TEMPLATES = {
  [LESSON_TYPES.GRAMMAR]: `
<h2>1. Tại Sao Quan Trọng? (Why It Matters)</h2>
<blockquote>
  {{Write 2-3 sentences explaining the real consequence of getting this wrong. Give 1 concrete formal scenario.}}
</blockquote>

<h2>2. Hiểu Bản Chất (The Logic Behind the Rule)</h2>
<p>{{Explain WHY this rule exists in Vietnamese}}</p>
<ul>
  {{Generate at least 3 rules. Wrap formulas in <mark>...</mark>. Wrap grammar terms in <strong>...</strong>. Provide a Vietnamese rationale for each.}}
</ul>

<h2>3. Bẫy Của Người Việt 🇻🇳 (Vietnamese L1 Interference)</h2>
<p>{{Write 1 sentence explaining WHY Vietnamese speakers make this specific mistake}}</p>
<table border='1' style='width:100%;border-collapse:collapse;'>
  <thead>
    <tr>
      <th style='padding:10px;background:#ffe5e5;'>❌ Incorrect</th>
      <th style='padding:10px;background:#e5ffe5;'>✅ Correct</th>
      <th style='padding:10px;'>💡 Giải thích (Vietnamese)</th>
    </tr>
  </thead>
  <tbody>
    {{Generate 3-4 rows of <tr>...</tr> reflecting real Vietnamese L1 mistakes in formal register}}
  </tbody>
</table>

<h2>4. Ghi Nhớ Theo Cấp Độ 🧠 (Level-Adaptive Tips)</h2>
<p style='background:#f0f9ff;padding:15px;border-left:4px solid #1CB0F6;border-radius:8px;'>
  <strong>🟢 Beginner:</strong> {{Simple mnemonic}}<br><br>
  <strong>🟡 Intermediate:</strong> {{Pattern-based shortcut}}<br><br>
  <strong>🔴 Advanced:</strong> {{Nuance or edge case}}
</p>`,

  [LESSON_TYPES.VOCABULARY]: `
<h2>1. Bức Tranh Chủ Đề 🗺️ (Topic Map)</h2>
<p>{{1 paragraph in Vietnamese: why this vocabulary cluster matters — real contexts where learners will encounter it: exams, workplace, daily life}}</p>

<h2>2. Từ Vựng Cốt Lõi 📚 (Core Word Bank)</h2>
<table border='1' style='width:100%;border-collapse:collapse;'>
  <thead>
    <tr>
      <th style='padding:10px;background:#f5f0ff;'>Word / Phrase</th>
      <th style='padding:10px;background:#f5f0ff;'>Part of Speech</th>
      <th style='padding:10px;background:#f5f0ff;'>Nghĩa tiếng Việt</th>
      <th style='padding:10px;background:#f5f0ff;'>Example Sentence (Formal)</th>
    </tr>
  </thead>
  <tbody>
    {{Generate 6-8 rows. Mix single words, collocations, and phrases. Formal register only in examples.}}
  </tbody>
</table>

<h2>3. Họ Hàng Từ Vựng 🔗 (Word Family & Collocations)</h2>
<ul>
  {{For each KEY word: show noun/verb/adj/adv forms and list 2-3 natural collocations. Wrap collocations in <mark>...</mark>.}}
</ul>

<h2>4. Dễ Nhầm Lẫn ⚠️ (Confusable Words)</h2>
<table border='1' style='width:100%;border-collapse:collapse;'>
  <thead>
    <tr>
      <th style='padding:10px;background:#fff8e5;'>Word A</th>
      <th style='padding:10px;background:#fff8e5;'>Word B</th>
      <th style='padding:10px;background:#fff8e5;'>Sự khác biệt (Vietnamese)</th>
      <th style='padding:10px;background:#fff8e5;'>Example pair</th>
    </tr>
  </thead>
  <tbody>
    {{Generate 3 confusable pairs specific to this topic. Vietnamese learners' most common mix-ups.}}
  </tbody>
</table>`,

  [LESSON_TYPES.EXAM_TIPS]: (examTarget) => `
<h2>1. Hiểu Đề Bài 🎯 (Know Your Enemy)</h2>
<blockquote>
  {{Describe this specific task for ${examTarget || "the exam"}: What does it test? Time/Marks? Common trap? Bilingual format.}}
</blockquote>

<h2>2. Quy Trình Làm Bài ⚙️ (Step-by-Step Strategy)</h2>
<ol>
  {{Generate minimum 4 steps. Wrap action keywords in <strong>...</strong>. Include time allocation. Be tactical.}}
</ol>

<h2>3. Bẫy Thường Gặp 🪤 (Trap Detector)</h2>
<table border='1' style='width:100%;border-collapse:collapse;'>
  <thead>
    <tr>
      <th style='padding:10px;background:#fff0f0;'>❌ Thí sinh hay làm</th>
      <th style='padding:10px;background:#f0fff0;'>✅ Cần làm thay vào</th>
      <th style='padding:10px;'>📉 Hậu quả</th>
    </tr>
  </thead>
  <tbody>
    {{Generate 3-4 specific traps for ${examTarget || "this exam"}}}
  </tbody>
</table>

<h2>4. Công Thức Ghi Điểm 💡 (Scoring Formula)</h2>
<p style='background:#f0f9ff;padding:15px;border-left:4px solid #1CB0F6;border-radius:8px;'>
  <strong>🏆 Band/Score Booster:</strong> {{1 high-impact technique}}<br><br>
  <strong>⏱️ Time Hack:</strong> {{1 concrete time-management trick}}<br><br>
  <strong>🔑 Keyword Strategy:</strong> {{How to use keywords/synonyms}}
</p>`,

  [LESSON_TYPES.SKILLS]: (skillFocus) => `
<h2>1. Kỹ Năng Này Thực Ra Là Gì? 🔍 (What This Skill Really Tests)</h2>
<blockquote>
  {{Reframe the skill ${skillFocus || "language skill"} beyond the obvious in bilingual format.}}
</blockquote>

<h2>2. Kỹ Thuật Cốt Lõi ⚙️ (Core Techniques)</h2>
<ul>
  {{Generate 3-4 specific techniques. Format: <strong>Name</strong> -> what it is (Eng) -> when to use (VN) -> 1 example <mark>phrase</mark>.}}
</ul>

<h2>3. Lỗi Thường Gặp Của Người Việt 🇻🇳 (Vietnamese Learner Pitfalls)</h2>
<table border='1' style='width:100%;border-collapse:collapse;'>
  <thead>
    <tr>
      <th style='padding:10px;background:#ffe5e5;'>❌ Thói quen sai</th>
      <th style='padding:10px;background:#e5ffe5;'>✅ Cần thay bằng</th>
      <th style='padding:10px;'>💡 Tại sao quan trọng</th>
    </tr>
  </thead>
  <tbody>
    {{Generate 3-4 rows specific to ${skillFocus || "this skill"}}}
  </tbody>
</table>

<h2>4. Lộ Trình Luyện Tập 📅 (Practice Roadmap)</h2>
<p style='background:#f0f9ff;padding:15px;border-left:4px solid #1CB0F6;border-radius:8px;'>
  <strong>🟢 Tuần 1-2 (Foundation):</strong> {{Specific daily activity}}<br><br>
  <strong>🟡 Tuần 3-4 (Development):</strong> {{Specific technique drill}}<br><br>
  <strong>🔴 Tuần 5+ (Exam-Ready):</strong> {{Timed practice format}}
</p>`,
};

// ============================================================
// 3. CALL 1 — Fast classifier & Validator
// ============================================================
const classifyTopic = async (topicPrompt) => {
  const prompt = `You are an expert English Education Analyst.
Analyze the user's topic and return ONLY a valid JSON object.

Rule 1 (Validation): If the topic is completely unrelated to learning English, language skills, or exams, set "isValidTopic" to false.
Rule 2 (Classification):
- "grammar"    → rules, tenses, clauses, sentence structures
- "vocabulary" → words, idioms, collocations, phrasal verbs
- "exam_tips"  → IELTS, TOEIC, THPTQG, Cambridge, test strategies
- "skills"     → reading, listening, writing, speaking techniques

Return EXACTLY this JSON format:
{
  "isValidTopic": boolean,
  "lessonType": "grammar" | "vocabulary" | "exam_tips" | "skills",
  "examTarget": "IELTS" | "TOEIC" | "THPTQG" | "Cambridge" | null,
  "skillFocus": "reading" | "listening" | "writing" | "speaking" | null
}

Topic to classify: "${topicPrompt}"`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.0,
      }
    });

    const parsed = JSON.parse(response.text);
    
    if (!parsed.isValidTopic) {
      throw new Error("Chủ đề không hợp lệ. Vui lòng nhập một chủ đề liên quan đến tiếng Anh.");
    }
    
    if (!Object.values(LESSON_TYPES).includes(parsed.lessonType)) {
      parsed.lessonType = LESSON_TYPES.GRAMMAR; 
    }
    return parsed;
  } catch (error) {
    if (error.message.includes("Chủ đề không hợp lệ")) throw error;
    console.error("Classification Error:", error);
    return { isValidTopic: true, lessonType: LESSON_TYPES.GRAMMAR, examTarget: null, skillFocus: null };
  }
};

// ============================================================
// 4. CALL 2 — Main lesson generator
// ============================================================
const generateLesson = async (topicPrompt, classification) => {
  const { lessonType, examTarget, skillFocus } = classification;

  const templateStr = TEMPLATES[lessonType];
  const template = typeof templateStr === "function" ? templateStr(examTarget || skillFocus) : templateStr;
  const safeTemplate = template || TEMPLATES[LESSON_TYPES.GRAMMAR];

  const fullPrompt = `You are a world-class English educator creating content for HubStudy (for Vietnamese learners A2-C1).

## UNIVERSAL RULES
- Language: ALL English examples MUST be formal/academic or neutral. NO slang in English examples. Vietnamese explanations must be clear, professional, yet approachable.
- Formatting: ONLY use SINGLE QUOTES (') for HTML attributes (e.g., <table class='test'>). NEVER use double quotes (") inside the HTML text.
- Content Generation: Replace all {{...}} instructions in the template with high-quality educational content.
- Mini Challenge: Generate 3 realistic multiple choice questions related to this lesson.

Generate a ${lessonType} lesson about: "${topicPrompt}"
${examTarget ? `Exam target: ${examTarget}` : ""}
${skillFocus ? `Skill focus: ${skillFocus}` : ""}

## OUTPUT FORMAT (JSON ONLY)
{
  "title": "Bilingual Title (Mix English + Vietnamese, Max 12 words, not clickbait)",
  "category": "${lessonType}",
  "content_blocks": [
    "<h2>...</h2>",
    "<blockquote>...</blockquote>",
    "<ul>...</ul>",
    "<table border='1'>...</table>"
  ],
  "mini_challenge": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "Question text here?",
      "image_url": "", 
      "audio_url": "",
      "transcript": "Bản dịch audio nếu có...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Correct option",
      "explanation": "Explanation..."
    }
  ]
}

## TEMPLATE TO FOLLOW & FILL OUT (For content_blocks):
${safeTemplate}`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, 
      }
    });
    
    const parsedData = JSON.parse(response.text);

    // 1. Nén mảng HTML thành chuỗi content
    if (parsedData.content_blocks && Array.isArray(parsedData.content_blocks)) {
      parsedData.content = parsedData.content_blocks.join('\n\n');
      delete parsedData.content_blocks; 
    }

    // 2. Đảm bảo ID của mini_challenge là duy nhất
    if (parsedData.mini_challenge && Array.isArray(parsedData.mini_challenge)) {
      parsedData.mini_challenge = parsedData.mini_challenge.map((q, index) => ({
        ...q,
        id: `gen_${Date.now()}_${index}`, // Sinh ID an toàn cho React render
      }));
    }

    // 3. Map Category chuẩn xác
    const validCategories = ['grammar', 'vocabulary', 'tips', 'strategy'];
    let finalCategory = parsedData.category;
    if (finalCategory === 'exam_tips') finalCategory = 'tips';
    if (finalCategory === 'skills') finalCategory = 'strategy';
    if (!validCategories.includes(finalCategory)) finalCategory = 'grammar';
    
    parsedData.category = finalCategory;

    return parsedData;
  } catch (error) {
    console.error("Failed to generate/parse Final Lesson:", error);
    throw new Error("Gemini gặp khó khăn khi biên soạn bài giảng. Vui lòng thử lại!");
  }
};

// ============================================================
// 5. PUBLIC API
// ============================================================
export const generateLessonWithGemini = async (topicPrompt) => {
  const classification = await classifyTopic(topicPrompt);
  return await generateLesson(topicPrompt, classification);
};