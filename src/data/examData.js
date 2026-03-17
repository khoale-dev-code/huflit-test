import { supabase } from '../config/supabaseClient';

// ─────────────────────────────────────────────────────────────────────
// Cấu trúc data thực tế trong Supabase:
//
//   parts[]         — mảng jsonb chứa TOÀN BỘ nội dung part
//                     mỗi part đã có: id, type, title, questions, script...
//                     type = 'listening' | 'reading' | 'writing' | 'speaking'
//
//   listeningParts  — mảng string ID ["part1", "part2", ...]  (chỉ để tham chiếu)
//   readingParts    — mảng string ID ["part5", "part6", ...]  (chỉ để tham chiếu)
//
// Kết luận: partData.type là nguồn sự thật duy nhất cho section TOEIC.
// useExamResult đọc partData.type trực tiếp → không cần toeicSection riêng.
// ─────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────
// normalizeParts
//
// Đảm bảo currentExamData.parts luôn là mảng object đầy đủ,
// không phải mảng string ID.
//
// Với data hiện tại thì parts[] đã là mảng object → pass thẳng.
// Hàm này là lớp bảo vệ phòng khi có dữ liệu inconsistent.
// ─────────────────────────────────────────────────────────────────────
function normalizeParts(examData) {
  if (!examData) return null;

  const rawParts = examData.parts;

  // Trường hợp bình thường: parts[] là mảng object đầy đủ
  if (Array.isArray(rawParts) && rawParts.length > 0 && typeof rawParts[0] === 'object') {
    return examData; // không cần làm gì
  }

  // Edge case: parts[] rỗng hoặc là mảng string
  // → không có data để hiển thị, trả về examData với parts rỗng
  console.warn('[loadExamData] parts[] không đúng định dạng:', rawParts);
  return { ...examData, parts: [] };
}

// ─────────────────────────────────────────────────────────────────────
// getAllExamMetadataAsync
// Lấy danh sách metadata đề thi cho giao diện chọn đề
// ─────────────────────────────────────────────────────────────────────
export const getAllExamMetadataAsync = async () => {
  try {
    const { data, error } = await supabase
      .from('exams')
      .select('id, title, description, category, duration, questions, metadata, is_public, showResults, created_at')
      .eq('is_public', true) // 🔒 THÊM DÒNG NÀY: Chỉ lấy những đề đã được public
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Lỗi truy vấn Supabase:', error.message);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('🚨 Lỗi tải danh sách đề thi:', error.message);
    return [];
  }
};
// ─────────────────────────────────────────────────────────────────────
// loadExamData
// Lấy toàn bộ chi tiết 1 đề thi.
// Thêm tham số isAdmin (mặc định là false cho User)
// ─────────────────────────────────────────────────────────────────────
export const loadExamData = async (examId, isAdmin = false) => {
  if (!examId || typeof examId !== 'string') return null;

  // Chặn ID cũ không phải UUID
  const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(examId);
  if (!isValidUUID) {
    console.warn(`⚠️ Bỏ qua: ID "${examId}" không phải UUID hợp lệ.`);
    return null;
  }

  try {
    // Xây dựng câu query cơ bản
    let query = supabase
      .from('exams')
      .select('*')
      .eq('id', examId);

    // 🔒 NẾU KHÔNG PHẢI ADMIN: Bắt buộc đề thi phải đang public
    if (!isAdmin) {
      query = query.eq('is_public', true);
    }

    const { data, error } = await query.single();

    if (error) {
      // Nếu không tìm thấy (do sai ID hoặc do user truy cập đề bị ẩn)
      if (error.code === 'PGRST116') {
        console.warn('Đề thi không tồn tại hoặc đang bị ẩn.');
        return null;
      }
      console.error('❌ Lỗi truy vấn chi tiết đề thi:', error.message);
      throw error;
    }

    return normalizeParts(data);
  } catch (error) {
    console.error(`🚨 Lỗi tải đề thi ${examId}:`, error.message);
    return null;
  }
};
// Mock data — giữ tương thích với code cũ
export const examMetadata = []; 