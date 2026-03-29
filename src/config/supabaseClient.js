// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 🚀 TỐI ƯU: Ném thẳng lỗi để chặn app crash trắng màn hình với lỗi khó hiểu
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "❌ Supabase Configuration Error: URL hoặc Anon Key bị thiếu trong file .env!\n" +
    "Hãy đảm bảo bạn đã tạo file .env ở thư mục gốc và có 2 dòng:\n" +
    "VITE_SUPABASE_URL=...\n" +
    "VITE_SUPABASE_ANON_KEY=..."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // persistSession và autoRefreshToken mặc định đã là true trong Supabase v2, 
    // nhưng ghi rõ ra thế này rất tốt để dễ kiểm soát.
    persistSession: true, 
    autoRefreshToken: true,
  },
  global: {
    headers: { 'x-application-name': 'hubstudy' },
  }
});

if (import.meta.env.DEV) {
  console.log("🚀 Supabase Client Initialized: Ready to roll!");
}