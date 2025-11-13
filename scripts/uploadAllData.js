/**
 * Upload ALL Data (Exam, Vocabulary, Grammar) to Firebase
 * File: scripts/uploadAllData.js
 * Run: node scripts/uploadAllData.js
 * Or add to package.json: "upload:all": "node scripts/uploadAllData.js"
 * 
 * NO SHEBANG - Windows Compatible!
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
  console.error('📝 How to fix:');
  console.error('   1. Go to Firebase Console');
  console.error('   2. Project Settings → Service Accounts');
  console.error('   3. Click "Generate New Private Key"');
  console.error('   4. Save it as: scripts/serviceAccountKey.json\n');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'huflit-test-4ce25'
});

const db = admin.firestore();

// ============================================
// Import Data - With Error Handling
// ============================================

let EXAM_DATA = {};
let VOCABULARY_DATA = {};
let GRAMMAR_DATA = {};

try {
  console.log('📋 Loading data files...\n');
  
  try {
    const examModule = await import('../src/data/examData.js');
    EXAM_DATA = examModule.EXAM_DATA || examModule.default || {};
    if (Object.keys(EXAM_DATA).length > 0) {
      console.log('✅ Exam data loaded:', Object.keys(EXAM_DATA).length, 'exams');
    } else {
      console.log('⚠️  Exam data is empty');
    }
  } catch (e) {
    console.log('⚠️  Could not load exam data:', e.message);
  }

  try {
    const vocabModule = await import('../src/data/vocabularyData.js');
    VOCABULARY_DATA = vocabModule.VOCABULARY_DATA || vocabModule.default || {};
    if (Object.keys(VOCABULARY_DATA).length > 0) {
      console.log('✅ Vocabulary data loaded:', Object.keys(VOCABULARY_DATA).length, 'levels');
    } else {
      console.log('⚠️  Vocabulary data is empty');
    }
  } catch (e) {
    console.log('⚠️  Could not load vocabulary data:', e.message);
  }

  try {
    const grammarModule = await import('../src/data/grammarData.js');
    GRAMMAR_DATA = grammarModule.GRAMMAR_DATA || grammarModule.default || {};
    if (Object.keys(GRAMMAR_DATA).length > 0) {
      console.log('✅ Grammar data loaded:', Object.keys(GRAMMAR_DATA).length, 'levels');
    } else {
      console.log('⚠️  Grammar data is empty');
    }
  } catch (e) {
    console.log('⚠️  Could not load grammar data:', e.message);
  }

  if (Object.keys(EXAM_DATA).length === 0 && Object.keys(VOCABULARY_DATA).length === 0 && Object.keys(GRAMMAR_DATA).length === 0) {
    throw new Error('No data loaded! Check your data files.');
  }

} catch (error) {
  console.error('\n❌ Fatal error loading data:', error.message);
  process.exit(1);
}

// ============================================
// Utility Functions
// ============================================

function cleanData(obj, maxDepth = 3, currentDepth = 0) {
  if (currentDepth > maxDepth) return '[Data truncated]';
  if (obj === null || obj === undefined) return null;
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => cleanData(item, maxDepth, currentDepth + 1)).filter(item => item !== null);
  }

  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      cleaned[key] = cleanData(value, maxDepth, currentDepth + 1);
    }
  }
  return cleaned;
}

function logSection(title) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`  ${title}`);
  console.log(`${'═'.repeat(70)}\n`);
}

function logSuccess(msg, details = '') {
  console.log(`  ✅ ${msg}${details ? ` - ${details}` : ''}`);
}

function logInfo(msg) {
  console.log(`  ℹ️  ${msg}`);
}

function logError(msg) {
  console.log(`  ❌ ${msg}`);
}

// ============================================
// Upload Exam Data
// ============================================

async function uploadExamData() {
  logSection('📚 Uploading Exam Data');

  if (!EXAM_DATA || Object.keys(EXAM_DATA).length === 0) {
    logInfo('No exam data to upload');
    return 0;
  }

  let totalParts = 0;

  for (const [examId, examData] of Object.entries(EXAM_DATA)) {
    console.log(`  📖 ${examId}:`);

    try {
      // Upload exam metadata
      await db.collection('examData').doc(examId).set(
        cleanData({
          id: examId,
          title: examData.title || examId,
          description: examData.description || '',
          type: 'exam',
          partsCount: Object.keys(examData.parts || {}).length,
          createdAt: new Date()
        }),
        { merge: true }
      );
      logSuccess(`${examId} metadata`);

      // Upload parts
      if (examData.parts) {
        for (const [partId, partData] of Object.entries(examData.parts)) {
          const docId = `${examId}__${partId}`;
          const questionCount = (partData.questions || []).length;

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
              questionsCount: questionCount,
              createdAt: new Date()
            }),
            { merge: true }
          );

          totalParts++;
          logSuccess(`${partId}`, `${questionCount} questions`);
        }
      }
    } catch (error) {
      logError(`${examId}: ${error.message}`);
    }
  }

  console.log(`\n  📊 Total exam parts: ${totalParts}`);
  return totalParts;
}

// ============================================
// Upload Vocabulary Data
// ============================================

async function uploadVocabularyData() {
  logSection('📖 Uploading Vocabulary Data');

  if (!VOCABULARY_DATA || Object.keys(VOCABULARY_DATA).length === 0) {
    logInfo('No vocabulary data to upload');
    return 0;
  }

  let totalCategories = 0;
  let totalWords = 0;

  for (const [levelId, levelData] of Object.entries(VOCABULARY_DATA)) {
    console.log(`  📚 Level: ${levelId}`);

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
          const wordCount = (catData.words || []).length;

          await db.collection('vocabularyData').doc(docId).set(
            cleanData({
              level: levelId,
              levelName: levelData.level,
              categoryId: catId,
              title: catData.title || catId,
              description: catData.description || '',
              type: 'category',
              wordsCount: wordCount,
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
          totalWords += wordCount;
          logSuccess(`${catData.title}`, `${wordCount} words`);
        }
      }
    } catch (error) {
      logError(`${levelId}: ${error.message}`);
    }
  }

  console.log(`\n  📊 Total categories: ${totalCategories} | Total words: ${totalWords}`);
  return { categories: totalCategories, words: totalWords };
}

// ============================================
// Upload Grammar Data
// ============================================

async function uploadGrammarData() {
  logSection('📝 Uploading Grammar Data');

  if (!GRAMMAR_DATA || Object.keys(GRAMMAR_DATA).length === 0) {
    logInfo('No grammar data to upload');
    return 0;
  }

  let totalTopics = 0;
  let totalLessons = 0;
  let totalExercises = 0;

  for (const [levelId, levelData] of Object.entries(GRAMMAR_DATA)) {
    console.log(`  📚 Level: ${levelId}`);

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
          totalLessons += cleanLessons.length;
          totalExercises += cleanExercises.length;
          logSuccess(`${topicData.title}`, `${cleanLessons.length}L ${cleanExercises.length}E`);
        }
      }
    } catch (error) {
      logError(`${levelId}: ${error.message}`);
    }
  }

  console.log(`\n  📊 Total topics: ${totalTopics} | Lessons: ${totalLessons} | Exercises: ${totalExercises}`);
  return { topics: totalTopics, lessons: totalLessons, exercises: totalExercises };
}

// ============================================
// Upload Statistics
// ============================================

async function uploadStatistics(examStats, vocabStats, grammarStats) {
  logSection('📊 Uploading Statistics');

  try {
    const stats = {
      exam: {
        totalParts: examStats || 0
      },
      vocabulary: {
        totalCategories: vocabStats.categories || 0,
        totalWords: vocabStats.words || 0
      },
      grammar: {
        totalTopics: grammarStats.topics || 0,
        totalLessons: grammarStats.lessons || 0,
        totalExercises: grammarStats.exercises || 0
      },
      updatedAt: new Date()
    };

    await db.collection('metadata').doc('allStatistics').set(stats, { merge: true });

    logSuccess('Statistics updated');
    console.log(`   📚 Exam parts: ${stats.exam.totalParts}`);
    console.log(`   📖 Vocabulary categories: ${stats.vocabulary.totalCategories} (${stats.vocabulary.totalWords} words)`);
    console.log(`   📝 Grammar topics: ${stats.grammar.totalTopics} (${stats.grammar.totalLessons}L ${stats.grammar.totalExercises}E)`);
  } catch (error) {
    logError(`Statistics: ${error.message}`);
  }
}

// ============================================
// Main
// ============================================

async function main() {
  logSection('🚀 Firebase - Upload All Data (HUFLIT)');
  logInfo('Uploading Exam, Vocabulary, and Grammar data...');

  try {
    const examParts = await uploadExamData();
    const vocabData = await uploadVocabularyData();
    const grammarData = await uploadGrammarData();
    await uploadStatistics(examParts, vocabData, grammarData);

    logSection('✨ Upload Complete!');
    console.log(`\n🎉 All data successfully uploaded to Firebase Firestore!\n`);
    console.log(`📍 View your data:`);
    console.log(`   https://console.firebase.google.com/u/0/project/huflit-test-4ce25/firestore\n`);
    console.log(`📊 Summary:`);
    console.log(`   ✅ Exam data: ${examParts} parts`);
    console.log(`   ✅ Vocabulary: ${vocabData.categories} categories, ${vocabData.words} words`);
    console.log(`   ✅ Grammar: ${grammarData.topics} topics, ${grammarData.lessons} lessons, ${grammarData.exercises} exercises\n`);

    process.exit(0);
  } catch (error) {
    logSection('❌ Upload Failed!');
    console.error('\n🔴 Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    // Close Firebase connection
    await admin.app().delete();
  }
}

// Run
main();