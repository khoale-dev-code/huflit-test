  // src/data/examData.js

  /**
   * Lazy Loading Exam Data
   * - Chỉ load exam khi người dùng chọn
   * - Giảm bundle size ban đầu
   * - Cache data sau lần load đầu tiên
   */

  // Metadata cho tất cả các exams (lightweight)
  const EXAM_METADATA = {};
  for (let i = 1; i <= 22; i++) {
    EXAM_METADATA[`exam${i}`] = {
      id: `exam${i}`,
      title: `Đề thi ${i}`,
      loaded: false,
      data: null,
      loading: false,
      loadPromise: null
    };
  }

  // Cache để tránh load lại
  const examCache = new Map();

  /**
   * Load exam data dynamically
   * @param {string} examId - ID của exam (exam1, exam2, ...)
   * @returns {Promise<Object>} Exam data
   */
  export const loadExamData = async (examId) => {
    // Kiểm tra cache trước
    if (examCache.has(examId)) {
      return examCache.get(examId);
    }

    const metadata = EXAM_METADATA[examId];
    if (!metadata) {
      console.warn(`⚠️ Exam "${examId}" không tồn tại`);
      return null;
    }

    // Nếu đang load, đợi promise hiện tại
    if (metadata.loading && metadata.loadPromise) {
      return metadata.loadPromise;
    }

    // Bắt đầu load
    metadata.loading = true;
    
    const examNumber = examId.replace('exam', '');
    
    metadata.loadPromise = import(`./exams/exam${examNumber}.js`)
      .then(module => {
        const dataKey = `EXAM${examNumber}_DATA`;
        const data = module[dataKey];
        
        if (!data) {
          throw new Error(`❌ Không tìm thấy ${dataKey} trong module`);
        }

        // Lưu vào cache
        examCache.set(examId, data);
        metadata.data = data;
        metadata.loaded = true;
        metadata.loading = false;
        
        console.log(`✅ Đã load ${examId}`);
        return data;
      })
      .catch(error => {
        console.error(`❌ Lỗi khi load ${examId}:`, error);
        metadata.loading = false;
        metadata.loadPromise = null;
        return null;
      });

    return metadata.loadPromise;
  };

  /**
   * Preload exam để tăng tốc (optional)
   * @param {string} examId 
   */
  export const preloadExamData = (examId) => {
    if (!examCache.has(examId)) {
      loadExamData(examId);
    }
  };

  /**
   * Get exam by ID (async)
   * @param {string} examId 
   * @returns {Promise<Object|null>}
   */
  export const getExamById = async (examId) => {
    return await loadExamData(examId);
  };

  /**
   * Get all exam metadata (synchronous - chỉ trả về thông tin cơ bản)
   * @returns {Array<Object>}
   */
  export const getAllExamMetadata = () => {
    return Object.values(EXAM_METADATA).map(({ id, title, loaded }) => ({
      id,
      title,
      loaded
    }));
  };

  /**
   * Get all loaded exams (synchronous)
   * @returns {Array<Object>}
   */
  export const getAllLoadedExams = () => {
    return Array.from(examCache.values());
  };

  /**
   * Get exam parts (async)
   * @param {string} examId 
   * @returns {Promise<Object>}
   */
  export const getExamParts = async (examId) => {
    const exam = await loadExamData(examId);
    return exam?.parts || {};
  };

  /**
   * Get exam questions (async)
   * @param {string} examId 
   * @param {string} partId 
   * @returns {Promise<Array>}
   */
  export const getExamQuestions = async (examId, partId) => {
    const exam = await loadExamData(examId);
    const part = exam?.parts?.[partId];
    return part?.questions || [];
  };

  /**
   * Clear cache (dùng khi cần reset)
   */
  export const clearExamCache = () => {
    examCache.clear();
    Object.values(EXAM_METADATA).forEach(meta => {
      meta.loaded = false;
      meta.data = null;
      meta.loading = false;
      meta.loadPromise = null;
    });
    console.log('🗑️ Đã xóa cache exams');
  };

  /**
   * Get cache stats (debug)
   */
  export const getCacheStats = () => {
    return {
      totalExams: Object.keys(EXAM_METADATA).length,
      loadedExams: examCache.size,
      exams: Array.from(examCache.keys())
    };
  };

  // Export metadata để dùng cho dropdown
  export const EXAM_LIST = getAllExamMetadata();
  