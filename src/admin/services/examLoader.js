// src/services/examLoader.js
import { collection, getDocs, doc, getDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Lấy danh sách tất cả exams đã published
 */
export const getPublishedExams = async () => {
  try {
    const q = query(
      collection(db, 'exams'),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    
    const exams = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, exams };
  } catch (error) {
    console.error('Error loading published exams:', error);
    return { success: false, exams: [], error: error.message };
  }
};

/**
 * Lấy metadata của exams để hiển thị trong dropdown
 */
export const getExamMetadata = async () => {
  try {
    const result = await getPublishedExams();
    
    if (!result.success) {
      return [];
    }
    
    // Chỉ lấy thông tin cần thiết cho dropdown
    return result.exams.map(exam => ({
      id: exam.id,
      title: exam.title,
      type: exam.type,
      duration: exam.duration,
      totalQuestions: exam.totalQuestions,
      difficulty: exam.difficulty
    }));
  } catch (error) {
    console.error('Error loading exam metadata:', error);
    return [];
  }
};

/**
 * Lấy chi tiết exam theo ID
 */
export const loadExamById = async (examId) => {
  try {
    const examRef = doc(db, 'exams', examId);
    const examSnap = await getDoc(examRef);
    
    if (!examSnap.exists()) {
      throw new Error('Exam not found');
    }
    
    const examData = examSnap.data();
    
    // Transform data để khớp với format App.jsx expect
    return {
      id: examSnap.id,
      title: examData.title,
      description: examData.description,
      type: examData.type,
      duration: examData.duration,
      totalQuestions: examData.totalQuestions,
      difficulty: examData.difficulty,
      parts: examData.parts || {}
    };
  } catch (error) {
    console.error('Error loading exam:', error);
    throw error;
  }
};

/**
 * Kiểm tra xem exam có tồn tại không
 */
export const examExists = async (examId) => {
  try {
    const examRef = doc(db, 'exams', examId);
    const examSnap = await getDoc(examRef);
    return examSnap.exists();
  } catch (error) {
    console.error('Error checking exam existence:', error);
    return false;
  }
};