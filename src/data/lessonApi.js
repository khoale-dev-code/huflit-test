import { supabase } from '../config/supabaseClient';

// Lấy danh sách bài học (Dành cho Admin)
export const getAdminLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title, category, order_index, is_published, created_at')
    .order('category', { ascending: true })
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data;
};

// Lấy chi tiết 1 bài học
export const getLessonById = async (id) => {
  const { data, error } = await supabase.from('lessons').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

// Thêm mới bài học
export const createLesson = async (lessonData) => {
  const { data, error } = await supabase.from('lessons').insert([lessonData]).select();
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
  const { error } = await supabase.from('lessons').delete().eq('id', id);
  if (error) throw error;
  return true;
};
// Lấy danh sách các bài học công khai
export const getPublishedLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true }) // Sắp xếp theo order
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Lấy chi tiết bài học qua slug
export const getLessonBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true) // Chỉ cho xem bài đã xuất bản
    .single();

  if (error) throw error;
  return data;
};