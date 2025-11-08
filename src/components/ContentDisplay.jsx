import React from 'react';

const ContentDisplay = ({ partData, selectedPart, currentQuestionIndex, testType }) => {
  if (!partData) return null;

  let content = '';
  if (testType === 'listening') {
    content = selectedPart === 'part1' ? partData.questions[currentQuestionIndex]?.script || '' : partData.script || '';
  } else {
    content = partData.text || 'No text available for this part.';
  }

  return (
    <div className="section">
      <div className="section-title">{testType === 'listening' ? '📄 Script' : '📖 Text'}</div>
      <div className={testType === 'listening' ? 'script-content' : 'text-content'}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ContentDisplay;