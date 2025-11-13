// src/data/examData.js

import { EXAM1_DATA } from './exams/exam1';
import { EXAM2_DATA } from './exams/exam2';
import { EXAM3_DATA } from './exams/exam3';
import { EXAM4_DATA } from './exams/exam4';
import { EXAM5_DATA } from './exams/exam5';
import { EXAM6_DATA } from './exams/exam6';
import { EXAM7_DATA } from './exams/exam7';
import { EXAM8_DATA } from './exams/exam8';

export const EXAM_DATA = {
  exam1: EXAM1_DATA,
  exam2: EXAM2_DATA,
  exam3: EXAM3_DATA,
  exam4: EXAM4_DATA,
  exam5: EXAM5_DATA,
  exam6: EXAM6_DATA,
  exam7: EXAM7_DATA,
  exam8: EXAM8_DATA,
 // Khi thêm exam mới:
  // import { EXAM4_DATA } from './exams/exam4';
  // exam4: EXAM4_DATA,
};

// Helper functions
export const getExamById = (examId) => {
  return EXAM_DATA[examId] || null;
};

export const getAllExams = () => {
  return Object.values(EXAM_DATA);
};

export const getExamParts = (examId) => {
  const exam = EXAM_DATA[examId];
  return exam?.parts || {};
};

export const getExamQuestions = (examId, partId) => {
  const exam = EXAM_DATA[examId];
  const part = exam?.parts?.[partId];
  return part?.questions || [];
};