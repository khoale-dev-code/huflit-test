import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  addDoc,
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../config/firebase';

/**
 * Lấy danh sách exams với filters mở rộng
 */
export const getExams = async (filters = {}) => {
  try {
    let q = collection(db, 'exams');
    
    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }
    
    if (filters.difficulty) {
      q = query(q, where('difficulty', '==', filters.difficulty));
    }
    
    if (filters.isPublished !== undefined) {
      q = query(q, where('isPublished', '==', filters.isPublished));
    }
    
    q = query(q, orderBy('createdAt', 'desc'));
    
    const snapshot = await getDocs(q);
    const exams = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, exams };
  } catch (error) {
    console.error('❌ Error getting exams:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Lấy danh sách các loại exam unique (để hỗ trợ dynamic select với custom types)
 */
export const getExamTypes = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'exams'));
    const typesSet = new Set(snapshot.docs.map(doc => doc.data().type).filter(type => type)); // Lọc bỏ undefined/null
    const types = Array.from(typesSet).sort(); // Sort alphabetically
    
    return { success: true, types };
  } catch (error) {
    console.error('❌ Error getting exam types:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Lấy chi tiết exam
 */
export const getExamById = async (examId) => {
  try {
    const examRef = doc(db, 'exams', examId);
    const examSnap = await getDoc(examRef);
    
    if (!examSnap.exists()) {
      return { success: false, error: 'Exam không tồn tại' };
    }
    
    return { 
      success: true, 
      exam: { id: examSnap.id, ...examSnap.data() } 
    };
  } catch (error) {
    console.error('❌ Error getting exam:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Tạo exam mới
 */
export const createExam = async (examData) => {
  try {
    const docRef = await addDoc(collection(db, 'exams'), {
      ...examData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('❌ Error creating exam:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Cập nhật exam
 */
export const updateExam = async (examId, updates) => {
  try {
    const examRef = doc(db, 'exams', examId);
    await updateDoc(examRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error updating exam:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Xóa exam
 */
export const deleteExam = async (examId) => {
  try {
    const examRef = doc(db, 'exams', examId);
    await deleteDoc(examRef);
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error deleting exam:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Toggle publish status
 */
export const toggleExamPublish = async (examId, isPublished) => {
  try {
    const examRef = doc(db, 'exams', examId);
    await updateDoc(examRef, {
      isPublished: !isPublished,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error toggling exam publish:', error);
    return { success: false, error: error.message };
  }
};