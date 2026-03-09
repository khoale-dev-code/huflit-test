import { supabase } from '../config/supabaseClient';

/**
 * ─── DỮ LIỆU ĐỀ THI CHO HỌC VIÊN (USER FRONTEND) ─────────────────────
 */

// 1. LẤY DANH SÁCH METADATA ĐỀ THI (Dùng cho giao diện chọn đề)
export const getAllExamMetadataAsync = async () => {
  try {
    const { data, error } = await supabase
      .from('exams')
      .select('id, title, description, duration, questions, metadata, is_public, showResults, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("❌ Lỗi truy vấn Supabase:", error.message);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("🚨 Lỗi tải danh sách đề thi (Học viên):", error.message);
    return []; 
  }
};

// 2. LẤY TOÀN BỘ CHI TIẾT 1 ĐỀ THI
// Đã thêm lớp khiên bảo vệ (Validation) chặn lỗi UUID
export const loadExamData = async (examId) => {
  // A. BẢO VỆ: Nếu không có ID, trả về null luôn
  if (!examId || typeof examId !== 'string') return null;

  // B. BẢO VỆ: Kiểm tra xem examId có đúng chuẩn UUID không 
  // (Chặn ngay lập tức các chữ linh tinh như "exam1", "exam2")
  const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(examId);
  
  if (!isValidUUID) {
    console.warn(`⚠️ Bỏ qua tải đề thi: ID "${examId}" là dữ liệu cũ (không phải UUID).`);
    return null; // Trả về null mà không gọi API để tránh làm sập Supabase
  }

  // C. GỌI API CHÍNH THỨC
  try {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('id', examId)
      .single();

    if (error) {
      console.error("❌ Lỗi truy vấn chi tiết đề thi:", error.message);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`🚨 Lỗi tải dữ liệu đề thi ${examId}:`, error.message);
    return null;
  }
};

// 3. Mock data (Để giữ tương thích với code cũ)
export const examMetadata = [];