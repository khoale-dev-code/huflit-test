// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import process from 'process'; // 🚀 FIX: Khai báo rõ ràng process cho ESLint khỏi bắt bẻ

// 1. Cấu hình & Khởi tạo
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // Để nhận dữ liệu từ API log AI

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Trong sản xuất hãy thay bằng domain của bạn (ví dụ: localhost:5173)
    methods: ["GET", "POST"]
  }
});

// Khởi tạo Supabase Admin Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 2. Cấu hình Kiểm duyệt (Moderation)
const BLACKLIST = ['gái gọi', 'sex', 'show hàng', 'đâm thuê', 'ma túy', 'pỏn', 'vcl', 'đcm', 'đm'];
const violationRecords = new Map(); // Lưu tạm số lần vi phạm: { userId: count }

// Hàm lưu nhật ký chat vào Supabase (Chỉ Admin thấy)
async function saveChatLog({ roomId, senderId, content, type, personaId = null, isFlagged = false }) {
  try {
    const { error } = await supabase
      .from('chat_logs')
      .insert([{ 
        room_id: roomId, 
        sender_id: senderId, 
        content, 
        chat_type: type, 
        persona_id: personaId,
        is_flagged: isFlagged 
      }]);
    if (error) throw error;
  } catch (err) {
    console.error("❌ Supabase Log Error:", err.message);
  }
}

// Hàm kiểm tra nội dung bằng Llama 3.3
async function checkContentAI(text) {
  // Check nhanh bằng danh sách từ cấm trước
  const isBadWord = BLACKLIST.some(word => text.toLowerCase().includes(word));
  if (isBadWord) return { is_safe: false, reason: "Sử dụng từ ngữ thô tục bị cấm." };

  // Gửi sang Llama để check ngữ cảnh (Gạ gẫm, mại dâm, bạo lực)
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{
          role: "system",
          content: "Bạn là bot kiểm duyệt chat sinh viên. Kiểm tra xem nội dung có liên quan đến: mại dâm, gạ gẫm tình dục, chất cấm, bạo lực hoặc thù ghét không. Trả về JSON: { 'is_safe': boolean, 'reason': 'lý do ngắn gọn' }"
        }, {
          role: "user", content: text
        }],
        response_format: { type: "json_object" }
      })
    });
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    // 🚀 FIX: Dùng biến error để log ra, ESLint sẽ không báo lỗi unused-vars nữa
    console.error("❌ Groq AI Moderation Error:", error.message); 
    return { is_safe: true }; // Dự phòng nếu API Groq lỗi thì vẫn cho nhắn
  }
}

// 3. API dành cho Chat với AI (Log lại câu trả lời của Bot)
app.post('/api/log-ai-chat', async (req, res) => {
  const { userId, userText, aiResponse, personaId } = req.body;
  await saveChatLog({ roomId: 'AI_ROOM', senderId: userId, content: userText, type: 'ai', personaId });
  await saveChatLog({ roomId: 'AI_ROOM', senderId: `BOT_${personaId}`, content: aiResponse, type: 'ai', personaId });
  res.status(200).json({ success: true });
});

// 4. Logic Socket.IO (Matchmaking & P2P Chat)
let waitingUser = null;

io.on('connection', (socket) => {
  // Lấy userId (email) từ query của frontend
  const userId = socket.handshake.query.userId || "anonymous";
  console.log(`🟢 Connected: ${socket.id} (User: ${userId})`);

  // Ghép cặp người lạ
  socket.on('find_stranger', () => {
    // Check ban status (3 gậy)
    const violations = violationRecords.get(userId) || 0;
    if (violations >= 3) {
      return socket.emit('account_locked', { message: 'Tài khoản của bạn đã bị khóa vĩnh viễn do vi phạm quy tắc cộng đồng quá 3 lần.' });
    }

    if (waitingUser && waitingUser.id !== socket.id) {
      const roomId = `room_${Date.now()}`;
      socket.join(roomId);
      waitingUser.join(roomId);
      io.to(roomId).emit('match_found', { roomId });
      console.log(`🎉 Matched: ${socket.id} & ${waitingUser.id}`);
      waitingUser = null;
    } else {
      waitingUser = socket;
      console.log(`⏳ Waiting: ${socket.id}`);
    }
  });

  // Gửi tin nhắn P2P
  socket.on('send_message', async (data) => {
    const { roomId, text } = data;
    
    // Kiểm duyệt
    const check = await checkContentAI(text);

    // Lưu Log (Bất kể sạch hay bẩn)
    saveChatLog({ roomId, senderId: userId, content: text, type: 'stranger', isFlagged: !check.is_safe });

    if (check.is_safe) {
      socket.to(roomId).emit('receive_message', { text, senderId: socket.id });
    } else {
      // Xử lý vi phạm
      let count = (violationRecords.get(userId) || 0) + 1;
      violationRecords.set(userId, count);

      if (count >= 3) {
        socket.emit('account_locked', { message: `Bạn đã vi phạm lần thứ ${count}. Hệ thống đã khóa quyền truy cập của bạn.` });
        socket.disconnect();
      } else {
        socket.emit('receive_message', { 
          text: `[HỆ THỐNG]: Tin nhắn bị chặn do vi phạm: ${check.reason}. Cảnh báo: ${count}/3 lần.`, 
          isSystem: true 
        });
      }
    }
  });

  socket.on('leave_room', (data) => {
    socket.leave(data.roomId);
    socket.to(data.roomId).emit('stranger_disconnected');
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Disconnected: ${socket.id}`);
    if (waitingUser && waitingUser.id === socket.id) waitingUser = null;
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Trạm thu phát sóng HubStudy đang chạy tại port ${PORT}!`);
});