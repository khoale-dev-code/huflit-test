// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

/**
 * 1. Lấy cấu hình từ file .env (Sử dụng chuẩn của Vite)
 * Lưu ý: Bạn PHẢI đặt tên biến bắt đầu bằng VITE_ để Vite có thể nhận diện.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * 2. Kiểm tra tính hợp lệ của cấu hình
 * Giúp debug nhanh nếu bạn quên chưa setup .env hoặc đặt sai tên biến.
 */
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ Supabase Configuration Error: URL hoặc Anon Key bị thiếu trong file .env!\n" +
    "Hãy đảm bảo bạn đã tạo file .env ở thư mục gốc và có 2 dòng:\n" +
    "VITE_SUPABASE_URL=...\n" +
    "VITE_SUPABASE_ANON_KEY=..."
  );
}

/**
 * 3. Khởi tạo Supabase Client
 * Instance này sẽ được dùng xuyên suốt project để làm việc với Storage và Database.
 */
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // Giữ phiên đăng nhập (nếu sau này dùng Auth)
    autoRefreshToken: true,
  },
  global: {
    headers: { 'x-application-name': 'hubstudy' }, // Định danh ứng dụng của bạn
  }
});

// Log nhẹ một cái để biết client đã được khởi tạo thành công (chỉ hiện khi dev)
if (import.meta.env.DEV) {
  console.log("🚀 Supabase Client Initialized: Ready to roll!");
}