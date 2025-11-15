// src/data/vocabularyData.js
import { vocabularyDataLevel1 } from './vocabulary/vocabularyDataLevel1.js';
import { vocabularyDataLevel2 } from './vocabulary/vocabularyDataLevel2.js';
import { vocabularyDataLevel3 } from './vocabulary/vocabularyDataLevel3.js';
import { vocabularyDataLevel4 } from './vocabulary/vocabularyDataLevel4.js';
import { vocabularyDataLevel5 } from './vocabulary/vocabularyDataLevel5.js';

const mergeData = () => {
  const result = {};
  [vocabularyDataLevel1, vocabularyDataLevel2, vocabularyDataLevel3, vocabularyDataLevel4, vocabularyDataLevel5].forEach(data => {
    Object.entries(data).forEach(([topic, subtopics]) => {
      if (!result[topic]) result[topic] = {};
      Object.entries(subtopics).forEach(([sub, words]) => {
        if (!result[topic][sub]) result[topic][sub] = [];
        result[topic][sub].push(...words);
      });
    });
  });
  return result;
};

export const vocabularyData = mergeData();