import ReadingTextDisplay from '../components/ReadingTextDisplay';

// Trong component ExamPage, thay thế phần hiển thị text:

{currentQuestion.text && (
  <div className="mb-6">
    <ReadingTextDisplay 
      text={currentQuestion.text} 
      type="reading" 
    />
  </div>
)}