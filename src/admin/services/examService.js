import { supabase } from '../../config/supabaseClient';

/**
 * ─── QUẢN LÝ ĐỀ THI BẰNG SUPABASE (ADMIN) ──────────────────────────────
 */

// 1. LẤY DANH SÁCH TẤT CẢ ĐỀ THI
export const getExams = async () => {
  try {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { exams: data || [] };
  } catch (error) {
    console.error('❌ Lỗi lấy danh sách đề thi:', error.message);
    throw error;
  }
};

// 2. LẤY CHI TIẾT 1 ĐỀ THI
export const getExamById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`❌ Lỗi lấy chi tiết đề thi ID ${id}:`, error.message);
    throw error;
  }
};

// 3. TẠO ĐỀ THI MỚI (Tự động đếm câu hỏi)
export const createExam = async (examData) => {
  try {
    // Tự động đếm tổng số câu hỏi từ tất cả các part
    const totalQuestions = Object.values(examData.parts || {}).reduce(
      (acc, part) => acc + (part.questions?.length || 0), 0
    );

    const finalData = {
      ...examData,
      questions: totalQuestions,
    };

    const { data, error } = await supabase
      .from('exams')
      .insert([finalData])
      .select();

    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('❌ Lỗi tạo đề thi mới:', error.message);
    throw error;
  }
};

// 4. CẬP NHẬT ĐỀ THI (Fix lỗi 406 và lỗi ID)
export const updateExam = async (id, examData) => {
  try {
    // Loại bỏ id ra khỏi payload để tránh lỗi của PostgreSQL
    const { id: _, created_at, ...cleanData } = examData;

    // Tự động đếm lại câu hỏi để đảm bảo số liệu luôn chính xác
    const totalQuestions = Object.values(cleanData.parts || {}).reduce(
      (acc, part) => acc + (part.questions?.length || 0), 0
    );
    
    cleanData.questions = totalQuestions;
    cleanData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('exams')
      .update(cleanData)
      .eq('id', id)
      .select(); // Dùng .select() trả về mảng để tránh lỗi 406 Not Acceptable

    if (error) throw error;
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error(`❌ Lỗi cập nhật đề thi ID ${id}:`, error.message);
    throw error;
  }
};

// 5. XÓA ĐỀ THI & FILE AUDIO LIÊN QUAN
export const deleteExam = async (examId, examData) => {
  try {
    // A. Xóa Audio trên Storage (nếu có)
    if (examData?.parts) {
      const filePaths = Object.values(examData.parts)
        .map(part => part.audioStoragePath)
        .filter(path => Boolean(path));

      if (filePaths.length > 0) {
        const { error: storageError } = await supabase.storage.from('exams').remove(filePaths);
        if (storageError) console.warn('⚠️ Lỗi xóa audio (bỏ qua):', storageError.message);
      }
    }

    // B. Xóa Record trong Database
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', examId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`❌ Lỗi xóa đề thi ID ${examId}:`, error.message);
    throw error;
  }
};

/**
 * ─── QUẢN LÝ FILE AUDIO (SUPABASE STORAGE) ─────────────────────────────
 */

// 6. UPLOAD AUDIO
// 6. UPLOAD AUDIO (Bản fix lỗi File Name và Lệch Tham Số)
export const uploadAudio = async (file, examId, partId, onProgress) => {
  try {
    // 1. Lấy đuôi file gốc (vd: mp3, wav, ogg)
    const fileExt = file.name.split('.').pop();
    
    // 2. Tạo tên file duy nhất để không bị trùng (vd: part1_1701234567.mp3)
    const fileName = `${partId}_${Date.now()}.${fileExt}`;
    
    // 3. Xử lý Thư mục: Nếu đang tạo đề mới (examId là 'new' hoặc undefined) thì lưu vào thư mục 'drafts'
    const folderName = (examId && examId !== 'new' && examId !== 'create') ? examId : 'drafts';
    
    // 4. Đường dẫn chuẩn xác trên Supabase
    const filePath = `${folderName}/${fileName}`;

    // Gọi hàm giả lập tiến trình (nếu giao diện cần)
    if (onProgress) onProgress(10); 

    const { data, error } = await supabase.storage
      .from('exams')
      .upload(filePath, file, { 
        cacheControl: '3600', 
        upsert: true // Ghi đè nếu trùng tên
      });

    if (error) throw error;
    if (onProgress) onProgress(100); // Báo hoàn thành 100%
    
    // Lấy link Public URL để trình duyệt phát được nhạc
    const { data: { publicUrl } } = supabase.storage
      .from('exams')
      .getPublicUrl(data.path);

    // Trả về đúng 3 trường mà EditExam.jsx / CreateExam.jsx đang cần
    return { path: data.path, url: publicUrl, name: file.name };
    
  } catch (error) {
    console.error('❌ Lỗi upload audio:', error.message);
    if (onProgress) onProgress(0); // Reset tiến trình nếu lỗi
    throw error;
  }
};
// 7. XÓA AUDIO TỪNG PART
export const deleteAudio = async (path) => {
  if (!path) return;
  try {
    let filePath = path;
    if (path.includes('http')) {
      const urlParts = path.split('/exams/');
      if (urlParts.length > 1) filePath = urlParts[1].split('?')[0];
    }

    const { error } = await supabase.storage.from('exams').remove([filePath]);
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('❌ Lỗi xóa file audio:', error.message);
    throw error;
  }
};
// 8. UPLOAD HÌNH ẢNH
export const uploadImage = async (file, examId, prefixId) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `img_${prefixId}_${Date.now()}.${fileExt}`;
    const folderName = (examId && examId !== 'new' && examId !== 'create') ? examId : 'drafts';
    
    // Gom ảnh vào thư mục con 'images' cho gọn
    const filePath = `${folderName}/images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('exams')
      .upload(filePath, file, { 
        cacheControl: '3600', 
        upsert: true 
      });

    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('exams')
      .getPublicUrl(data.path);

    return { path: data.path, url: publicUrl, name: file.name };
  } catch (error) {
    console.error('❌ Lỗi upload hình ảnh:', error.message);
    throw error;
  }
};

// 9. XÓA HÌNH ẢNH
export const deleteImage = async (path) => {
  if (!path) return;
  try {
    let filePath = path;
    if (path.includes('http')) {
      const urlParts = path.split('/exams/');
      if (urlParts.length > 1) filePath = urlParts[1].split('?')[0];
    }
    const { error } = await supabase.storage.from('exams').remove([filePath]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ Lỗi xóa hình ảnh:', error.message);
    throw error;
  }
};