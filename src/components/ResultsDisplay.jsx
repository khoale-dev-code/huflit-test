import React from 'react';

const ResultsDisplay = ({ score, partData, answers, onReset }) => {
  if (!partData) return null;

  return (
    <div className="section">
      <div className="section-title"> Kết quả</div>
      <div className="results">
        <div className="score-summary">
          <h3>Điểm số: {score.correct}/{score.total}</h3>
          <p>Tỷ lệ đúng: {score.percentage.toFixed(1)}%</p>
          <div className="score-bar">
            <div
              className="score-fill"
              style={{
                width: `${score.percentage}%`,
                backgroundColor: score.percentage >= 70 ? '#28a745' : score.percentage >= 50 ? '#ffa500' : '#dc3545'
              }}
            ></div>
          </div>
        </div>
        <div className="answers-review">
          <h4>Chi tiết đáp án:</h4>
          {partData.questions.map((q) => {
            const isCorrect = answers[q.id] === q.correct;
            return (
              <div key={q.id} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                <p><strong>Câu {q.id}:</strong> {q.question}</p>
                <p>
                  Đáp án của bạn: <strong>{answers[q.id] !== undefined ? String.fromCharCode(65 + answers[q.id]) : 'Chưa chọn'}</strong>
                  {!isCorrect && (
                    <span className="correct-answer">
                      {' '}(Đáp án đúng: {String.fromCharCode(65 + q.correct)})
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
        <button className="btn-reset" onClick={onReset}>
          🔄 Làm lại
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;