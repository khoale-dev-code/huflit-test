// src/admin/utils/importExams.js
//
// TIỆN ÍCH: Import dữ liệu từ local JS files (exam1.js, exam2.js, ...)
// lên Firebase Firestore theo format chuẩn.
//
// Cách dùng (chạy 1 lần từ AdminDashboard hoặc trang admin riêng):
//
//   import { importAllExams, importSingleExam } from '../utils/importExams';
//
//   // Import toàn bộ
//   await importAllExams();
//
//   // Import 1 exam
//   import { EXAM1_DATA } from '../../data/exams/exam1';
//   await importSingleExam(EXAM1_DATA, { category: 'IELTS', level: 'Trung cấp (B1-B2)', duration: 120 });

import { importExamFromLocal } from '../services/examService';

const EXAM_META = {
  exam1: { category: 'IELTS', level: 'Trung cấp (B1-B2)', duration: 120 },
  exam2: { category: 'IELTS', level: 'Trung cấp (B1-B2)', duration: 120 },
  exam3: { category: 'IELTS', level: 'Nâng cao (C1-C2)',  duration: 120 },
  exam4: { category: 'TOEIC', level: 'Trung cấp (B1-B2)', duration: 90  },
  exam5: { category: 'TOEIC', level: 'Nâng cao (C1-C2)',  duration: 90  },
  exam6: { category: 'IELTS', level: 'Cơ bản (A1-A2)',    duration: 120 },
};

/**
 * Import 1 exam
 * @param {Object} rawData  - EXAM1_DATA object
 * @param {Object} meta     - { category, level, duration, showResults? }
 */
export const importSingleExam = async (rawData, meta = {}) => {
  try {
    const result = await importExamFromLocal(rawData, { showResults: true, ...meta });
    console.log(`✅ Imported "${result.title}" → ID: ${result.id}`);
    return result;
  } catch (err) {
    console.error(`❌ Import failed:`, err);
    throw err;
  }
};

/**
 * Import tất cả exams (exam1 → exam6)
 * Tự động lazy-load từng file để không làm nặng bundle
 */
export const importAllExams = async (onProgress = null) => {
  const results = [];
  const entries = Object.entries(EXAM_META);

  for (let i = 0; i < entries.length; i++) {
    const [examId, meta] = entries[i];
    try {
      onProgress?.({ current: i + 1, total: entries.length, examId });
      // Dynamic import — chỉ load file khi cần
      const mod = await import(`../../data/exams/${examId}.js`);
      const dataKey = `EXAM${examId.replace('exam', '')}_DATA`;
      const rawData = mod[dataKey] ?? mod.default;

      if (!rawData) {
        console.warn(`⚠️ Không tìm thấy ${dataKey} trong ${examId}.js — bỏ qua.`);
        continue;
      }

      const result = await importExamFromLocal(rawData, { showResults: true, ...meta });
      results.push(result);
      console.log(`✅ [${i + 1}/${entries.length}] Imported: ${result.title}`);

    } catch (err) {
      console.error(`❌ Lỗi import ${examId}:`, err.message);
    }
  }

  console.log(`\n🎉 Import hoàn tất: ${results.length}/${entries.length} exams.`);
  return results;
};