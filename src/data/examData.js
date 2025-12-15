// src/data/examData.js
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Lazy Loading Exam Data - Hybrid Mode
 * - Firebase: exams mới được tạo từ admin
 * - Local: exams cũ từ static files
 * - Tự động merge + cache
 */

// Cache để tránh load lại
const examCache = new Map();
const metadataCache = new Map();

// --- Local Data (Static Files) ---

/**
 * Load local exam data từ static files
 * Format: exam1.js, exam2.js, ..., exam22.js
 */
const loadLocalExamMetadata = async () => {
  try {
    const localMetadata = [];
    
    // Load metadata cho 22 exams cục bộ
    for (let i = 1; i <= 22; i++) {
      localMetadata.push({
        id: `exam${i}`,
        title: `Đề thi ${i}`,
        source: 'local',  // ⭐ Mark as local
        loaded: false,
        loading: false,
        loadPromise: null
      });
    }
    
    return localMetadata;
  } catch (error) {
    console.error('❌ Error loading local metadata:', error);
    return [];
  }
};

/**
 * Load local exam data từ file
 */
const loadLocalExamData = async (examId) => {
  try {
    const examNumber = examId.replace('exam', '');
    const dataKey = `EXAM${examNumber}_DATA`;
    
    const module = await import(`./exams/exam${examNumber}.js`);
    const data = module[dataKey];
    
    if (!data) {
      throw new Error(`❌ Không tìm thấy ${dataKey} trong module`);
    }

    return {
      id: examId,
      title: data.title || `Exam ${examId}`,
      source: 'local',
      type: data.type || 'toeic',
      difficulty: data.difficulty || 'medium',
      description: data.description || '',
      parts: normalizeParts(data.parts || {})
    };
  } catch (error) {
    console.error(`❌ Error loading local exam ${examId}:`, error);
    return null;
  }
};

// --- Firebase Data ---

/**
 * Fetch exams từ Firebase
 */
const loadFirebaseExamMetadata = async () => {
  try {
    const q = query(
      collection(db, 'exams'),
      where('isPublished', '==', true)
    );

    const snapshot = await getDocs(q);
    
    const firebaseMetadata = snapshot.docs
      .map(doc => ({
        id: doc.id,
        title: doc.data().title || `Exam ${doc.id}`,
        source: 'firebase', // ⭐ Mark as firebase
        type: doc.data().type || 'toeic',
        difficulty: doc.data().difficulty || 'medium',
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        loaded: false,
        loading: false,
        loadPromise: null
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
    
    console.log(`✅ Loaded ${firebaseMetadata.length} exams from Firebase`);
    return firebaseMetadata;
  } catch (error) {
    console.error('❌ Error loading Firebase metadata:', error);
    return [];
  }
};

/**
 * Load Firebase exam data
 */
const loadFirebaseExamData = async (examId) => {
  try {
    const q = query(
      collection(db, 'exams'),
      where('__name__', '==', examId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error(`Exam "${examId}" không tìm thấy trong database`);
    }

    const examDocData = snapshot.docs[0].data();

    return {
      id: examId,
      title: examDocData.title,
      source: 'firebase',
      type: examDocData.type,
      difficulty: examDocData.difficulty,
      description: examDocData.description || '',
      parts: normalizeParts(examDocData.parts || {})
    };
  } catch (error) {
    console.error(`❌ Error loading Firebase exam ${examId}:`, error);
    return null;
  }
};

// --- 🎯 CORE FUNCTIONS ---

/**
 * Fetch ALL exams metadata (Local + Firebase merged)
 */
export const fetchExamMetadata = async () => {
  try {
    if (metadataCache.has('all')) {
      return metadataCache.get('all');
    }

    // Load cả 2 nguồn
    const [localMeta, firebaseMeta] = await Promise.all([
      loadLocalExamMetadata(),
      loadFirebaseExamMetadata()
    ]);

    // Merge: Firebase trước (mới hơn), sau đó Local
    const allMetadata = [...firebaseMeta, ...localMeta];

    metadataCache.set('all', allMetadata);
    console.log(
      `✅ Total exams: ${allMetadata.length} (Firebase: ${firebaseMeta.length}, Local: ${localMeta.length})`
    );
    
    return allMetadata;
  } catch (error) {
    console.error('❌ Error fetching exam metadata:', error);
    return [];
  }
};

/**
 * Load exam data (tự động detect source)
 */
export const loadExamData = async (examId) => {
  // 1. Check cache
  if (examCache.has(examId)) {
    return examCache.get(examId);
  }

  // Lấy metadata để check source
  const allMetadata = await fetchExamMetadata();
  const metadata = allMetadata.find(m => m.id === examId);

  if (!metadata) {
    console.warn(`⚠️ Exam "${examId}" không tồn tại`);
    return null;
  }

  // 2. Nếu đang load, đợi promise hiện tại
  if (metadata.loading && metadata.loadPromise) {
    return metadata.loadPromise;
  }

  // 3. Bắt đầu load
  metadata.loading = true;

  metadata.loadPromise = (async () => {
    try {
      let examData;

      // Load từ source tương ứng
      if (metadata.source === 'firebase') {
        examData = await loadFirebaseExamData(examId);
      } else {
        examData = await loadLocalExamData(examId);
      }

      if (!examData) {
        throw new Error(`Không thể load exam ${examId}`);
      }

      // Cache
      examCache.set(examId, examData);
      metadata.data = examData;
      metadata.loaded = true;

      console.log(`✅ Đã load exam: ${examId} (source: ${metadata.source})`);
      return examData;
    } catch (error) {
      console.error(`❌ Lỗi khi load ${examId}:`, error);
      return null;
    } finally {
      metadata.loading = false;
      metadata.loadPromise = null;
    }
  })();

  return metadata.loadPromise;
};

/**
 * Normalize parts structure
 */
const normalizeParts = (partsData) => {
  if (!partsData || typeof partsData !== 'object') {
    return {};
  }

  const normalized = {};

  Object.entries(partsData).forEach(([partKey, partValue]) => {
    normalized[partKey] = {
      title: partValue.title || partKey,
      description: partValue.description || '',
      type: partValue.type || 'listening',
      questions: Array.isArray(partValue.questions) ? partValue.questions : [],
      duration: partValue.duration || 0
    };
  });

  return normalized;
};

/**
 * Preload exam (chạy ngầm)
 */
export const preloadExamData = (examId) => {
  if (!examCache.has(examId)) {
    loadExamData(examId);
  }
};

// --- ⚡ ASYNC GETTERS ---

export const getExamById = async (examId) => {
  return await loadExamData(examId);
};

export const getExamParts = async (examId) => {
  const exam = await loadExamData(examId);
  return exam?.parts || {};
};

export const getExamQuestions = async (examId, partId) => {
  const exam = await loadExamData(examId);
  const part = exam?.parts?.[partId];
  return part?.questions || [];
};

// --- 🔄 SYNC GETTERS ---

export const getExamByIdSync = (examId) => {
  return examCache.get(examId) || null;
};

export const getExamPartsSync = (examId) => {
  const exam = examCache.get(examId);
  return exam?.parts || {};
};

// --- ℹ️ UTILITIES ---

export const getAllExamMetadata = async () => {
  return await fetchExamMetadata();
};

export const getAllLoadedExams = () => {
  return Array.from(examCache.values());
};

export const clearExamCache = () => {
  examCache.clear();
  metadataCache.clear();
  console.log('🗑️ Đã xóa cache exams');
};

export const invalidateMetadataCache = () => {
  metadataCache.delete('all');
  console.log('🔄 Invalidated metadata cache');
};

export const getCacheStats = () => {
  return {
    cachedExams: Array.from(examCache.keys()),
    cachedExamCount: examCache.size,
    metadataCached: metadataCache.has('all')
  };
};

/**
 * Export EXAM_LIST untuk backward compatibility
 * (dùng trong các component cũ)
 */
export const EXAM_LIST = [];

/**
 * Initialize EXAM_LIST (async)
 */
export const initializeExamList = async () => {
  const metadata = await fetchExamMetadata();
  // Update EXAM_LIST reference nếu cần, hoặc dùng fetchExamMetadata() thay thế
  return metadata;
};