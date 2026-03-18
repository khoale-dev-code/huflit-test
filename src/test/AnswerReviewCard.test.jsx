import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import AnswerReviewCard from '../components/Display/Result/AnswerReviewCard';
import '@testing-library/jest-dom'; // Để dùng các câu lệnh như toBeInTheDocument

test('Hiển thị đúng số thứ tự câu hỏi và trạng thái Đúng', () => {
  const mockQuestion = { id: 'q1', question: 'Hello nghĩa là gì?', correct: 0 };
  
  render(
    <AnswerReviewCard 
      question={mockQuestion}
      questionNum={1}
      isCorrect={true}
      userAnswer={0}
      correctAnswer={0}
    />
  );

  // Kiểm tra xem có hiện chữ "Câu 1" không
  expect(screen.getByText(/Câu 1/i)).toBeInTheDocument();
  
  // Kiểm tra xem nội dung câu hỏi có hiện ra không
  expect(screen.getByText(/Hello nghĩa là gì/i)).toBeInTheDocument();
});