import React from 'react';
import { EXAM_DATA } from '../data/examData';

const PartSelector = ({ selectedExam, onExamChange, testType, onTestTypeChange, selectedPart, onPartChange, examData, partData }) => {
  const getAvailableParts = () => {
    if (!examData) return [];
    const parts = Object.keys(examData.parts).filter(part => examData.parts[part].type === testType);
    return parts;
  };

  return (
    <div className="section">
      <div className="section-title">📝 Chọn Exam & Loại Bài Thi</div>
      <div className="controls">
        <div className="control-group">
          <label>Exam:</label>
          <select value={selectedExam} onChange={onExamChange}>
            <option value="">-- Chọn Exam --</option>
            {Object.keys(EXAM_DATA).map(exam => (
              <option key={exam} value={exam}>{EXAM_DATA[exam].title}</option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label>Loại Bài Thi:</label>
          <select value={testType} onChange={onTestTypeChange}>
            <option value="listening">Listening (20 câu)</option>
            <option value="reading">Reading (40 câu)</option>
          </select>
        </div>
      </div>
      <div className="section-title">📝 Chọn Part</div>
      <select className="part-select" value={selectedPart} onChange={onPartChange}>
        <option value="">-- Chọn Part --</option>
        {getAvailableParts().map(part => (
          <option key={part} value={part}>
            {examData.parts[part].title} ({examData.parts[part].questions?.length || 0} câu)
          </option>
        ))}
      </select>
      {partData && (
        <div className="part-info">
          <h3>{partData.title}</h3>
          <p>{partData.description}</p>
        </div>
      )}
    </div>
  );
};

export default PartSelector;