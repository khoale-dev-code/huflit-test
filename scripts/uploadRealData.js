#!/usr/bin/env node

/**
 * Upload REAL Data from Local Files to Firebase
 * File: scripts/uploadRealData.js
 * Run: npm run upload:real
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// Initialize Firebase
// ============================================
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('\n❌ ERROR: serviceAccountKey.json not found!');
  console.error('📍 Expected: scripts/serviceAccountKey.json\n');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'huflit-test-4ce25'
});

const db = admin.firestore();

// ============================================
// Import Real Data
// ============================================

// Dynamically import data files
let EXAM_DATA = {};
let VOCABULARY_DATA = {};
let GRAMMAR_DATA = {};

try {
  const examModule = await import('../src/data/examData.js');
  EXAM_DATA = examModule.EXAM_DATA || examModule.default || {};
  console.log('✅ Exam data loaded');
} catch (e) {
  console.warn('⚠️  Could not load exam data:', e.message);
}

try {
  const vocabModule = await import('../src/data/vocabularyData.js');
  VOCABULARY_DATA = vocabModule.VOCABULARY_DATA || vocabModule.default || {};
  console.log('✅ Vocabulary data loaded');
} catch (e) {
  console.warn('⚠️  Could not load vocabulary data:', e.message);
}

try {
  const grammarModule = await import('../src/data/grammarData.js');
  GRAMMAR_DATA = grammarModule.GRAMMAR_DATA || grammarModule.default || {};
  console.log('✅ Grammar data loaded');
} catch (e) {
  console.warn('⚠️  Could not load grammar data:', e.message);
}

// ============================================
// Utility Functions
// ============================================

function cleanData(obj) {
  if (obj === null || obj === undefined) return null;
  if (Array.isArray(obj)) {
    return obj.map(item => cleanData(item)).filter(item => item !== null);
  }
  if (typeof obj !== 'object') return obj;
  
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        cleaned[key] = cleanData(value);
      } else {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
}

function logSection(title) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(title);
  console.log(`${'='.repeat(60)}`);
}

function logSuccess(msg) {
  console.log(`  ✅ ${msg}`);
}

function logInfo(msg) {
  console.log(`  ℹ️  ${msg}`);
}

function logError(msg) {
  console.log(`  ❌ ${msg}`);
}

// ============================================
// Upload Functions
// ============================================

async function uploadExamData() {
  logSection('📚 Uploading Exam Data');

  if (!EXAM_DATA || Object.keys(EXAM_DATA).length === 0) {
    logInfo('No exam data to upload');
    return 0;
  }

  let totalParts = 0;

  for (const [examId, examData] of Object.entries(EXAM_DATA)) {
    console.log(`\n  📖 ${examId}:`);

    try {
      // Upload exam metadata
      await db.collection('examData').doc(examId).set(
        cleanData({
          id: examId,
          title: examData.title || examId,
          description: examData.description || '',
          type: 'exam',
          createdAt: new Date()
        }),
        { merge: true }
      );
      logSuccess(`${examId} metadata`);

      // Upload parts
      if (examData.parts) {
        for (const [partId, partData] of Object.entries(examData.parts)) {
          const docId = `${examId}__${partId}`;

          await db.collection('examData').doc(docId).set(
            cleanData({
              examId,
              partId,
              title: partData.title || partId,
              description: partData.description || '',
              type: 'part',
              testType: partData.testType || 'listening',
              script: partData.script || '',
              content: partData.content || '',
              questions: partData.questions || [],
              questionsCount: (partData.questions || []).length,
              createdAt: new Date()
            }),
            { merge: true }
          );

          totalParts++;
          logSuccess(`${partId} (${(partData.questions || []).length} questions)`);
        }
      }
    } catch (error) {
      logError(`${examId}: ${error.message}`);
    }
  }

  console.log(`\n✨ Total exam parts uploaded: ${totalParts}`);
  return totalParts;
}

async function uploadVocabularyData() {
  logSection('📖 Uploading Vocabulary Data');

  if (!VOCABULARY_DATA || Object.keys(VOCABULARY_DATA).length === 0) {
    logInfo('No vocabulary data to upload');
    return 0;
  }

  let totalCategories = 0;

  for (const [levelId, levelData] of Object.entries(VOCABULARY_DATA)) {
    console.log(`\n  📚 Level: ${levelId}`);

    try {
      // Upload level metadata
      await db.collection('vocabularyData').doc(levelId).set(
        cleanData({
          id: levelId,
          level: levelData.level || levelId,
          type: 'level',
          categoriesCount: Object.keys(levelData.categories || {}).length,
          createdAt: new Date()
        }),
        { merge: true }
      );
      logSuccess(`${levelId} metadata`);

      // Upload categories
      if (levelData.categories) {
        for (const [catId, catData] of Object.entries(levelData.categories)) {
          const docId = `${levelId}__${catId}`;

          await db.collection('vocabularyData').doc(docId).set(
            cleanData({
              level: levelId,
              levelName: levelData.level,
              categoryId: catId,
              title: catData.title || catId,
              description: catData.description || '',
              type: 'category',
              wordsCount: (catData.words || []).length,
              words: (catData.words || []).map(w => ({
                id: w.id,
                word: w.word,
                pronunciation: w.pronunciation || '',
                definition: w.definition,
                example: w.example || '',
                vietnamese: w.vietnamese,
                alternatives: w.alternatives || []
              })),
              createdAt: new Date()
            }),
            { merge: true }
          );

          totalCategories++;
          logSuccess(`${catData.title} (${(catData.words || []).length} words)`);
        }
      }
    } catch (error) {
      logError(`${levelId}: ${error.message}`);
    }
  }

  console.log(`\n✨ Total vocabulary categories uploaded: ${totalCategories}`);
  return totalCategories;
}

async function uploadGrammarData() {
  logSection('📝 Uploading Grammar Data');

  if (!GRAMMAR_DATA || Object.keys(GRAMMAR_DATA).length === 0) {
    logInfo('No grammar data to upload');
    return 0;
  }

  let totalTopics = 0;

  for (const [levelId, levelData] of Object.entries(GRAMMAR_DATA)) {
    console.log(`\n  📚 Level: ${levelId}`);

    try {
      // Upload level metadata
      await db.collection('grammarData').doc(levelId).set(
        cleanData({
          id: levelId,
          level: levelData.level || levelId,
          description: levelData.description || '',
          type: 'level',
          topicsCount: Object.keys(levelData.topics || {}).length,
          createdAt: new Date()
        }),
        { merge: true }
      );
      logSuccess(`${levelId} metadata`);

      // Upload topics
      if (levelData.topics) {
        for (const [topicId, topicData] of Object.entries(levelData.topics)) {
          const docId = `${levelId}__${topicId}`;

          const cleanLessons = (topicData.lessons || [])
            .map(lesson => ({
              lessonId: lesson.lessonId || '',
              title: lesson.title || '',
              duration: lesson.duration || '',
              content: (lesson.content || '').substring(0, 5000),
              examples: lesson.examples || []
            }))
            .filter(l => l.title);

          const cleanExercises = (topicData.exercises || [])
            .map(ex => ({
              exerciseId: ex.exerciseId || '',
              type: ex.type || '',
              difficulty: ex.difficulty || 'Easy',
              question: ex.question || '',
              options: ex.options || [],
              correctAnswer: ex.correctAnswer || '',
              hints: ex.hints || [],
              explanation: ex.explanation || ''
            }))
            .filter(e => e.question);

          await db.collection('grammarData').doc(docId).set(
            cleanData({
              level: levelId,
              levelName: levelData.level,
              topicId,
              title: topicData.title || topicId,
              description: topicData.description || '',
              difficulty: topicData.difficulty || 'Beginner',
              icon: topicData.icon || '📚',
              type: 'topic',
              lessonsCount: cleanLessons.length,
              exercisesCount: cleanExercises.length,
              lessons: cleanLessons,
              exercises: cleanExercises,
              vocabulary: topicData.vocabulary || [],
              createdAt: new Date()
            }),
            { merge: true }
          );

          totalTopics++;
          logSuccess(`${topicData.title} (${cleanLessons.length} lessons, ${cleanExercises.length} exercises)`);
        }
      }
    } catch (error) {
      logError(`${levelId}: ${error.message}`);
    }
  }

  console.log(`\n✨ Total grammar topics uploaded: ${totalTopics}`);
  return totalTopics;
}

async function uploadMetadata() {
  logSection('📊 Uploading Statistics');

  try {
    const stats = {
      totalExams: Object.keys(EXAM_DATA).length,
      totalExamParts: Object.values(EXAM_DATA).reduce(
        (acc, exam) => acc + Object.keys(exam.parts || {}).length, 0
      ),
      totalVocabularyLevels: Object.keys(VOCABULARY_DATA).length,
      totalVocabularyCategories: Object.values(VOCABULARY_DATA).reduce(
        (acc, level) => acc + Object.keys(level.categories || {}).length, 0
      ),
      totalVocabularyWords: Object.values(VOCABULARY_DATA).reduce((acc, level) => {
        return acc + Object.values(level.categories || {}).reduce(
          (catAcc, cat) => catAcc + (cat.words || []).length, 0
        );
      }, 0),
      totalGrammarLevels: Object.keys(GRAMMAR_DATA).length,
      totalGrammarTopics: Object.values(GRAMMAR_DATA).reduce(
        (acc, level) => acc + Object.keys(level.topics || {}).length, 0
      ),
      updatedAt: new Date()
    };

    await db.collection('metadata').doc('statistics').set(stats, { merge: true });
    
    logSuccess('Statistics updated');
    console.log(`   📈 Exams: ${stats.totalExams}`);
    console.log(`   📝 Exam Parts: ${stats.totalExamParts}`);
    console.log(`   📖 Vocabulary Categories: ${stats.totalVocabularyCategories}`);
    console.log(`   📚 Vocabulary Words: ${stats.totalVocabularyWords}`);
    console.log(`   🎓 Grammar Topics: ${stats.totalGrammarTopics}`);
  } catch (error) {
    logError(`Statistics: ${error.message}`);
  }
}

// ============================================
// Main
// ============================================

async function main() {
  logSection('🚀 Firebase Real Data Upload');
  logInfo('This will upload ALL your local data to Firebase');

  try {
    console.log('\n📋 Loading data files...\n');

    const exams = await uploadExamData();
    const vocab = await uploadVocabularyData();
    const grammar = await uploadGrammarData();
    await uploadMetadata();

    logSection('✨ Upload Complete!');
    console.log(`\n📊 Summary:`);
    console.log(`   📚 Exam parts: ${exams}`);
    console.log(`   📖 Vocabulary categories: ${vocab}`);
    console.log(`   📝 Grammar topics: ${grammar}`);
    console.log(`\n🎉 All data successfully uploaded to Firebase Firestore!`);
    console.log(`\n📍 View your data:`);
    console.log(`   https://console.firebase.google.com/u/0/project/huflit-test-4ce25/firestore\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();