import { supabase } from '../config/supabaseClient';

// Lấy danh sách bài học (Dành cho Admin)
export const getAdminLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    // Admin list cũng không cần tải 'content' để load cho lẹ
    .select('id, title, category, order_index, is_published, created_at') 
    .order('category', { ascending: true })
    .order('order_index', { ascending: true });
    
  if (error) throw error;
  return data;
};

// Lấy chi tiết 1 bài học (Dùng trong Admin Form - Lấy Full data)
export const getLessonById = async (id) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};

// Thêm mới bài học
export const createLesson = async (lessonData) => {
  const { data, error } = await supabase
    .from('lessons')
    .insert([lessonData])
    .select();
    
  if (error) throw error;
  return data[0];
};

// Cập nhật bài học
export const updateLesson = async (id, lessonData) => {
  const { data, error } = await supabase
    .from('lessons')
    .update({ ...lessonData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data[0];
};

// Xóa bài học
export const deleteLesson = async (id) => {
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
};

/* ==============================================================================
   API DÀNH CHO HỌC VIÊN (USER FRONTEND)
   ============================================================================== */

// ✅ ĐỘT PHÁ HIỆU NĂNG: Lấy danh sách các bài học công khai
export const getPublishedLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    // 🔥 TUYỆT ĐỐI KHÔNG DÙNG select('*') Ở ĐÂY. Chỉ lấy các trường cần cho thẻ Card!
    .select('id, title, slug, category, thumbnail_url, video_url, created_at')
    .eq('is_published', true)
    .order('order_index', { ascending: true }) 
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Lỗi lấy danh sách bài học:", error.message);
    throw error;
  }
  return data;
};

// Lấy chi tiết bài học qua slug (Dùng trong LessonDetail - Cần Full data để đọc)
export const getLessonBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*') // Ở trang chi tiết thì mới cần lấy content
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error("Lỗi lấy chi tiết bài học:", error.message);
    throw error;
  }
  return data;
};