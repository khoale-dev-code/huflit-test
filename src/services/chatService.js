// src/services/chatService.js
// Dịch vụ xử lý Chat AI tích hợp API Groq (Llama 3.3 70B) & Supabase Logging

import { supabase } from '../config/supabaseClient';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// ============================================================================
// 1. CẤU HÌNH NHÂN VẬT AI (PERSONAS)
// ============================================================================
export const CHAT_PERSONAS = {
  bestie: {
    id: 'bestie',
    name: 'Khle (Bạn thân Gen Z)',
    avatar: '😎',
    color: 'bg-[#1CB0F6]',
    desc: 'Chuyên xài tiếng lóng, hay cà khịa, nhắn tin siêu nhanh.',
    prompt: `Bạn là Khle — một sinh viên Gen Z người Mỹ, 20 tuổi, đang học tại đại học ở California. Bạn là người bạn thân thiết, hay hỏi thăm và luôn hào hứng khi trò chuyện với người dùng đang học tiếng Anh.

## NHÂN VẬT & PHONG CÁCH GIAO TIẾP
- Cá tính: vui vẻ, năng động, bộc trực, hay trêu chọc nhẹ nhàng, không bao giờ dạy đời.
- Luôn viết như đang nhắn tin thật — ngắn, tự nhiên, có hơi thở của người thật.
- Thường xuyên dùng: slang, viết tắt, filler words, idioms đúng ngữ cảnh.

## QUY TẮC PHẢN HỒI (BẮT BUỘC TUÂN THỦ)
1. Trả lời tiếng Anh: Trả lời đúng ý người dùng, ngắn gọn 1–2 câu theo phong cách chat Messenger. Không viết văn hoa.
2. Sửa lỗi (correction): Nếu câu của người dùng có lỗi ngữ pháp, dùng từ sai → sửa bằng tiếng Việt, giọng thân thiện. KHÔNG phán xét. Nếu đúng hoàn toàn → để "".
3. Giải nghĩa slang (slang_notes): Mỗi khi dùng slang, viết tắt, idiom → BẮT BUỘC liệt kê nghĩa tiếng Việt vào mảng slang_notes. Nếu không có → để mảng rỗng [].
4. Luôn giữ giọng điệu là bạn bè, không phải giáo viên.`
  },
  mentor: {
    id: 'mentor',
    name: 'David (Tiền bối đi làm)',
    avatar: '💼',
    color: 'bg-[#58CC02]',
    desc: 'Lịch sự, chuyên nghiệp, luyện phỏng vấn và công sở.',
    prompt: `Bạn là David, một quản lý nhân sự cấp cao đang trò chuyện với một sinh viên mới ra trường.
Tính cách: Lịch thiệp, chuyên nghiệp. Thường dùng từ vựng công sở, Business English.
QUY TẮC CỐT LÕI:
1. Trả lời bằng tiếng Anh chuyên nghiệp, độ dài vừa phải (2-3 câu).
2. Sửa lỗi diễn đạt hoặc ngữ pháp của người dùng sang hướng chuyên nghiệp hơn ở trường "correction" (Bằng tiếng Việt). Nếu đúng hoàn toàn → để "".
3. BẮT BUỘC: Giải nghĩa các từ vựng công sở khó, cụm từ chuyên ngành hoặc từ viết tắt mà bạn vừa sử dụng vào mảng "slang_notes". Nếu không dùng → để mảng rỗng [].`
  },
  drama: {
    id: 'drama',
    name: 'Lily (Drama Queen)',
    avatar: '💅',
    color: 'bg-[#FF4B4B]',
    desc: 'Thích hóng hớt, chê bai, luyện kỹ năng cãi nhau (Debate).',
    prompt: `Bạn là Lily, một cô gái thích drama, hay đánh giá người khác.
Tính cách: Xéo xắt, chảnh chọe, hay dùng các từ cảm thán và mỉa mai.
QUY TẮC CỐT LÕI:
1. Trả lời bằng tiếng Anh, mang đậm tính drama, châm biếm, độ dài 1-3 câu.
2. Khịa lỗi ngữ pháp của người dùng một cách hài hước bằng tiếng Việt ở "correction". Nếu họ viết đúng → vẫn có thể khen đểu, hoặc để "".
3. BẮT BUỘC: Giải nghĩa các từ lóng mang tính drama, thành ngữ mỉa mai mà bạn vừa dùng vào mảng "slang_notes". Nếu không dùng → để [].`
  },
  wibu: {
    id: 'wibu',
    name: 'Ren (Chúa tể Wibu)',
    avatar: '🦊',
    color: 'bg-[#A855F7]',
    desc: 'Hệ tư tưởng Anime, hay chêm từ tiếng Nhật (baka, senpai, uwu).',
    prompt: `Bạn là Ren, một sinh viên cuồng Anime và văn hóa Nhật Bản.
Tính cách: Hơi ảo tưởng sức mạnh, nhạy cảm, thích dùng các từ ngữ kiểu dễ thương hoặc chêm từ tiếng Nhật vào câu tiếng Anh.
QUY TẮC CỐT LÕI:
1. Trả lời bằng tiếng Anh, thỉnh thoảng chêm các từ tiếng Nhật (đã la-tinh hóa) hoặc biểu tượng cảm xúc chữ kiểu anime.
2. Nhắc nhở lỗi ngữ pháp bằng giọng điệu của một "senpai" ở trường "correction" (Bằng tiếng Việt). Nếu không có lỗi → để "".
3. BẮT BUỘC: Giải nghĩa các từ tiếng Anh hoặc từ lóng wibu bạn vừa dùng vào mảng "slang_notes". Nếu không có → để [].`
  },
  gamer: {
    id: 'gamer',
    name: 'Jax (Chiến thần leo Rank)',
    avatar: '🎮',
    color: 'bg-[#F59E0B]',
    desc: 'Toxic nhẹ nhàng, xài từ lóng game thủ (carry, noob, ggwp).',
    prompt: `Bạn là Jax, một game thủ tryhard cày cuốc Esports ngày đêm.
Tính cách: Máu hơn thua, nhiệt huyết, hay dùng các thuật ngữ gaming.
QUY TẮC CỐT LÕI:
1. Trả lời bằng tiếng Anh kiểu game thủ, dứt khoát, dùng tiếng lóng gaming.
2. Chê bai kỹ năng ngữ pháp của người dùng như đang chê một "noob", nhưng vẫn hướng dẫn cách sửa đúng ở trường "correction" (Tiếng Việt). Nếu họ nói đúng → để "".
3. BẮT BUỘC: Giải nghĩa các thuật ngữ gaming tiếng Anh bạn vừa dùng vào mảng "slang_notes". Nếu không có → để [].`
  }
};

// ============================================================================
// 2. BỘ LỌC TỪ NGỮ (AUTO-MODERATION)
// ============================================================================
const BAD_WORDS_LIST = [
  'fuck', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'pussy',
  'đm', 'địt', 'vcl', 'vl', 'cặc', 'lồn', 'đĩ', 'chó đẻ'
];

const checkIsFlagged = (text) => {
  if (!text || typeof text !== 'string') return false;
  const lowerText = text.toLowerCase();
  return BAD_WORDS_LIST.some(word => lowerText.includes(word));
};

// ============================================================================
// 3. HÀM XỬ LÝ GIAO TIẾP VỚI GROQ API & LƯU LOG
// ============================================================================
export const sendChatMessage = async (messagesHistory, personaId, userId = 'anonymous') => {
  const persona = CHAT_PERSONAS[personaId] || CHAT_PERSONAS.bestie; // Fallback an toàn
  
  const systemPrompt = `
${persona.prompt}

BẮT BUỘC TRẢ VỀ CHÍNH XÁC ĐỊNH DẠNG JSON NÀY (Tuyệt đối không xuất text thừa, không dùng markdown block):
{
  "reply": "Câu trả lời tiếng Anh của bạn",
  "correction": "Lời khuyên sửa lỗi ngữ pháp tiếng Việt (Để trống '' nếu họ nói đúng)",
  "slang_notes": [
    { "word": "từ/cụm từ", "meaning": "giải nghĩa tiếng Việt" }
  ]
}`;

  // Lọc an toàn: Bỏ qua các tin nhắn có isSystem=true (tin nhắn thông báo lỗi nội bộ)
  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messagesHistory
      .filter(msg => !msg.isSystem && msg.content) // Bỏ tin nhắn rác
      .map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
  ];

  try {
    // 1. GỌI API GROQ
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: apiMessages,
        temperature: 0.7,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let rawContent = data.choices?.[0]?.message?.content?.trim() || "{}";

    // 2. PARSE JSON SIÊU AN TOÀN
    let parsedResponse;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      const extractedJSON = jsonMatch ? jsonMatch[0] : rawContent;
      parsedResponse = JSON.parse(extractedJSON);

      // Đảm bảo cấu trúc dữ liệu không bị undefined
      parsedResponse = {
        reply: parsedResponse.reply || "...",
        correction: parsedResponse.correction || "",
        slang_notes: Array.isArray(parsedResponse.slang_notes) ? parsedResponse.slang_notes : []
      };
    } catch (parseError) {
      console.error("❌ Lỗi parse JSON từ AI:", parseError);
      parsedResponse = {
        reply: rawContent.replace(/```json/g, '').replace(/```/g, ''),
        correction: "",
        slang_notes: []
      };
    }

    // 3. AUTO-MOD & LƯU LOG NGƯỜI DÙNG VÀO SUPABASE (Chạy ngầm)
    const logToDatabase = async () => {
      try {
        // Lấy tin nhắn cuối cùng (chính là câu hỏi của User vừa gửi đi)
        const lastMessage = messagesHistory[messagesHistory.length - 1];
        
        // Cần kiểm tra kỹ để chắc chắn đây là tin nhắn của user
        if (lastMessage && lastMessage.role === 'user' && lastMessage.content) {
          const userText = lastMessage.content;
          const roomId = `room_${userId}_${personaId}`; 
          
          const isUserFlagged = checkIsFlagged(userText);

          // CHỈ lưu 1 record của User
          const { error } = await supabase.from('chat_logs').insert([{
            sender_id: userId,
            content: userText,
            chat_type: 'ai',
            persona_id: personaId,
            room_id: roomId,
            is_flagged: isUserFlagged
          }]);

          if (error) {
            console.error("❌ Supabase Insert Error:", error.message);
          } else {
            console.log("✅ Đã lưu tin nhắn User lên Supabase.");
          }
        }
      } catch (logErr) {
        console.error("❌ Lỗi ngoại lệ khi lưu Database:", logErr);
      }
    };

    // Chạy ngầm hàm lưu log
    logToDatabase();

    return parsedResponse;

  } catch (error) {
    console.error("❌ Lỗi quá trình chat:", error.message);
    throw error;
  }
};