// src/test/gradeUtils.test.js
import { expect, test, describe } from 'vitest';

// 🚀 SỬA TẠI ĐÂY: Dùng @ để trỏ thẳng vào thư mục src/utils
import { calculateToeicScore } from '@/utils/gradeUtils'; 

describe('Hàm tính điểm TOEIC', () => {
  test('Tính đúng điểm khi đúng 50 câu nghe và 50 câu đọc', () => {
    const score = calculateToeicScore(50, 50);
    // Kiểm tra xem kết quả có trả về đúng object mong muốn không
    expect(score).toHaveProperty('total');
    expect(score.total).toBeGreaterThan(0);
  });

  test('Xử lý trường hợp không có câu đúng', () => {
    const score = calculateToeicScore(0, 0);
    expect(score.total).toBeLessThanOrEqual(10); // Thường TOEIC tối thiểu là 10
  });
});