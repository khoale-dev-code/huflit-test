#!/usr/bin/env node

/**
 * Upload Grammar Data to Firebase Firestore
 * File: scripts/uploadGrammarData.js
 * Run: node scripts/uploadGrammarData.js
 * Or add to package.json: "upload:grammar": "node scripts/uploadGrammarData.js"
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GRAMMAR_DATA, COMMON_MISTAKES, STUDY_TIPS, REAL_WORLD_EXAMPLES, GRAMMAR_QUIZZES } from '../src/data/grammarData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// Configuration
// ============================================

const FIREBASE_CONFIG = {
  projectId: 'huflit-test-4ce25',
  databaseURL: 'https://huflit-test-4ce25.firebaseio.com'
};

const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'serviceAccountKey.json');

// ============================================
// Initialize Firebase
// ============================================

function initializeFirebase() {
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error('\n❌ ERROR: serviceAccountKey.json not found!');
    console.error(`📍 Expected path: ${SERVICE_ACCOUNT_PATH}\n`);
    console.error('📝 Steps to fix:');
    console.error('   1. Go to Firebase Console');
    console.error('   2. Project Settings → Service Accounts');
    console.error('   3. Click "Generate New Private Key"');
    console.error('   4. Save it as: scripts/serviceAccountKey.json\n');
    process.exit(1);
  }

  try {
    const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: FIREBASE_CONFIG.projectId
    });

    console.log('✅ Firebase initialized successfully\n');
    return admin.firestore();
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
    process.exit(1);
  }
}

// ============================================
// Utility Functions
// ============================================

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

function logWarning(msg) {
  console.log(`  ⚠️  ${msg}`);
}

function cleanData(obj, maxDepth = 3, currentDepth = 0) {
  if (currentDepth > maxDepth) return '[Data truncated]';
  if (obj === null || obj === undefined) return null;
  if (typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj
      .map(item => cleanData(item, maxDepth, currentDepth + 1))
      .filter(item => item !== null);
  }

  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      cleaned[key] = cleanData(value, maxDepth, currentDepth + 1);
    }
  }
  return cleaned;
}

function truncateString(str, maxLength = 5000) {
  if (typeof str !== 'string') return str;
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

// ============================================
// Upload Grammar Data
// ============================================

async function uploadGrammarTopics(db) {
  logSection('📚 Uploading Grammar Topics');

  let totalTopics = 0;
  let totalLessons = 0;
  let totalExercises = 0;

  for (const [levelKey, levelData] of Object.entries(GRAMMAR_DATA)) {
    const level = levelData.level || levelKey;
    console.log(`\n  📖 Level: ${level}`);

    try {
      const topics = levelData.topics || {};

      for (const [topicKey, topicData] of Object.entries(topics)) {
        const docId = `${level}_${topicData.id}`;

        // Process lessons
        const lessons = (topicData.lessons || []).map(lesson => ({
          lessonId: lesson.lessonId || '',
          title: lesson.title || '',
          duration: lesson.duration || '',
          content: truncateString(lesson.content || ''),
          examples: (lesson.examples || []).slice(0, 10), // Limit to 10 examples
          // Omit vocabulary field to save space
        }));

        // Process exercises
        const exercises = (topicData.exercises || []).map(exercise => ({
          exerciseId: exercise.exerciseId || '',
          type: exercise.type || 'multiple_choice',
          difficulty: exercise.difficulty || 'Easy',
          question: exercise.question || '',
          options: (exercise.options || []).slice(0, 6),
          correctAnswer: exercise.correctAnswer || '',
          hints: exercise.hints || [],
          explanation: truncateString(exercise.explanation || '', 1000),
        }));

        // Upload topic
        const topicDoc = {
          level: level,
          levelKey: levelKey,
          topicId: topicData.id,
          title: topicData.title || '',
          description: topicData.description || '',
          difficulty: topicData.difficulty || 'Beginner',
          icon: topicData.icon || '📚',
          lessonsCount: lessons.length,
          exercisesCount: exercises.length,
          lessons: lessons,
          exercises: exercises,
          createdAt: new Date(),
          updatedAt: new Date(),
          // Metadata
          type: 'grammar_topic',
          searchKeywords: [
            (topicData.title || '').toLowerCase(),
            (level).toLowerCase(),
            (topicData.difficulty || 'beginner').toLowerCase()
          ]
        };

        await db.collection('grammarData').doc(docId).set(cleanData(topicDoc), { merge: true });

        totalTopics++;
        totalLessons += lessons.length;
        totalExercises += exercises.length;

        logSuccess(
          `${topicData.title}`,
          `${lessons.length} lessons, ${exercises.length} exercises`
        );
      }
    } catch (error) {
      logError(`Failed to upload ${level} topics: ${error.message}`);
    }
  }

  console.log(`\n  📊 Summary:`);
  console.log(`     • Topics: ${totalTopics}`);
  console.log(`     • Lessons: ${totalLessons}`);
  console.log(`     • Exercises: ${totalExercises}`);

  return { totalTopics, totalLessons, totalExercises };
}

// ============================================
// Upload Common Mistakes
// ============================================

async function uploadCommonMistakes(db) {
  logSection('⚠️  Uploading Common Mistakes');

  if (!COMMON_MISTAKES || COMMON_MISTAKES.length === 0) {
    logWarning('No common mistakes data found');
    return 0;
  }

  try {
    const mistakes = COMMON_MISTAKES.map((mistake, index) => ({
      id: mistake.id || `mistake_${index}`,
      mistake: mistake.mistake || '',
      correct: mistake.correct || '',
      explanation: truncateString(mistake.explanation || '', 2000),
      topic: mistake.topic || '',
      createdAt: new Date(),
      type: 'common_mistake'
    }));

    for (const mistake of mistakes) {
      await db.collection('grammarData').doc(`mistake_${mistake.id}`).set(
        cleanData(mistake),
        { merge: true }
      );
    }

    logSuccess(`${mistakes.length} common mistakes uploaded`);
    return mistakes.length;
  } catch (error) {
    logError(`Failed to upload common mistakes: ${error.message}`);
    return 0;
  }
}

// ============================================
// Upload Study Tips
// ============================================

async function uploadStudyTips(db) {
  logSection('💡 Uploading Study Tips');

  if (!STUDY_TIPS || STUDY_TIPS.length === 0) {
    logWarning('No study tips data found');
    return 0;
  }

  try {
    const tips = STUDY_TIPS.map((tip, index) => ({
      id: tip.id || `tip_${index}`,
      title: tip.title || '',
      description: truncateString(tip.description || '', 2000),
      relatedTopics: tip.relatedTopics || [],
      createdAt: new Date(),
      type: 'study_tip'
    }));

    for (const tip of tips) {
      await db.collection('grammarData').doc(`tip_${tip.id}`).set(
        cleanData(tip),
        { merge: true }
      );
    }

    logSuccess(`${tips.length} study tips uploaded`);
    return tips.length;
  } catch (error) {
    logError(`Failed to upload study tips: ${error.message}`);
    return 0;
  }
}

// ============================================
// Upload Real World Examples
// ============================================

async function uploadRealWorldExamples(db) {
  logSection('🌍 Uploading Real World Examples');

  if (!REAL_WORLD_EXAMPLES || REAL_WORLD_EXAMPLES.length === 0) {
    logWarning('No real world examples found');
    return 0;
  }

  try {
    const examples = REAL_WORLD_EXAMPLES.map((example, index) => ({
      id: example.id || `example_${index}`,
      context: example.context || '',
      original: example.original || '',
      explanation: truncateString(example.explanation || '', 2000),
      topic: example.topic || '',
      createdAt: new Date(),
      type: 'real_world_example'
    }));

    for (const example of examples) {
      await db.collection('grammarData').doc(`example_${example.id}`).set(
        cleanData(example),
        { merge: true }
      );
    }

    logSuccess(`${examples.length} real world examples uploaded`);
    return examples.length;
  } catch (error) {
    logError(`Failed to upload real world examples: ${error.message}`);
    return 0;
  }
}

// ============================================
// Upload Grammar Quizzes
// ============================================

async function uploadGrammarQuizzes(db) {
  logSection('🎯 Uploading Grammar Quizzes');

  if (!GRAMMAR_QUIZZES || GRAMMAR_QUIZZES.length === 0) {
    logWarning('No grammar quizzes found');
    return 0;
  }

  try {
    const quizzes = GRAMMAR_QUIZZES.map((quiz, index) => ({
      id: quiz.quizId || `quiz_${index}`,
      quizId: quiz.quizId || `quiz_${index}`,
      title: quiz.title || '',
      difficulty: quiz.difficulty || 'Beginner',
      duration: quiz.duration || 0,
      passingScore: quiz.passingScore || 70,
      topics: quiz.topics || [],
      questions: (quiz.questions || []).map(q => ({
        id: q.id || '',
        question: q.question || '',
        type: q.type || 'multiple_choice',
        options: q.options || [],
        explanation: truncateString(q.explanation || '', 1000)
      })).slice(0, 50), // Limit to 50 questions
      questionsCount: (quiz.questions || []).length,
      createdAt: new Date(),
      type: 'grammar_quiz'
    }));

    for (const quiz of quizzes) {
      await db.collection('grammarData').doc(`quiz_${quiz.id}`).set(
        cleanData(quiz),
        { merge: true }
      );
    }

    logSuccess(`${quizzes.length} grammar quizzes uploaded`);
    return quizzes.length;
  } catch (error) {
    logError(`Failed to upload grammar quizzes: ${error.message}`);
    return 0;
  }
}

// ============================================
// Upload Statistics
// ============================================

async function uploadStatistics(db, stats) {
  logSection('📊 Uploading Statistics');

  try {
    const statistics = {
      grammarTopics: stats.totalTopics || 0,
      grammarLessons: stats.totalLessons || 0,
      grammarExercises: stats.totalExercises || 0,
      commonMistakes: stats.commonMistakes || 0,
      studyTips: stats.studyTips || 0,
      realWorldExamples: stats.realWorldExamples || 0,
      grammarQuizzes: stats.grammarQuizzes || 0,
      updatedAt: new Date(),
      uploadedAt: new Date()
    };

    await db.collection('metadata').doc('grammarStatistics').set(
      statistics,
      { merge: true }
    );

    logSuccess('Statistics metadata uploaded');
    console.log(`\n  📈 Data Summary:`);
    console.log(`     • Topics: ${statistics.grammarTopics}`);
    console.log(`     • Lessons: ${statistics.grammarLessons}`);
    console.log(`     • Exercises: ${statistics.grammarExercises}`);
    console.log(`     • Common Mistakes: ${statistics.commonMistakes}`);
    console.log(`     • Study Tips: ${statistics.studyTips}`);
    console.log(`     • Real World Examples: ${statistics.realWorldExamples}`);
    console.log(`     • Quizzes: ${statistics.grammarQuizzes}\n`);

    return statistics;
  } catch (error) {
    logError(`Failed to upload statistics: ${error.message}`);
  }
}

// ============================================
// Main Upload Function
// ============================================

async function main() {
  logSection('🚀 Firebase Grammar Data Upload');
  
  console.log('📋 Initializing Firebase...\n');
  const db = initializeFirebase();

  try {
    const stats = {
      totalTopics: 0,
      totalLessons: 0,
      totalExercises: 0,
      commonMistakes: 0,
      studyTips: 0,
      realWorldExamples: 0,
      grammarQuizzes: 0
    };

    // Upload all data
    const topicStats = await uploadGrammarTopics(db);
    stats.totalTopics = topicStats.totalTopics;
    stats.totalLessons = topicStats.totalLessons;
    stats.totalExercises = topicStats.totalExercises;

    stats.commonMistakes = await uploadCommonMistakes(db);
    stats.studyTips = await uploadStudyTips(db);
    stats.realWorldExamples = await uploadRealWorldExamples(db);
    stats.grammarQuizzes = await uploadGrammarQuizzes(db);

    // Upload statistics
    await uploadStatistics(db, stats);

    logSection('✨ Upload Complete!');
    console.log(`🎉 All grammar data successfully uploaded to Firebase Firestore!\n`);
    console.log(`📍 View your data:`);
    console.log(`   https://console.firebase.google.com/u/0/project/${FIREBASE_CONFIG.projectId}/firestore\n`);
    console.log(`📝 Collection: grammarData`);
    console.log(`   Documents: ${Object.keys(GRAMMAR_DATA).reduce((sum, level) => sum + Object.keys(GRAMMAR_DATA[level].topics || {}).length, 0)} topics\n`);

    process.exit(0);
  } catch (error) {
    logSection('❌ Upload Failed!');
    console.error('\n🔴 Fatal error:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await admin.app().delete();
  }
}

// Run the upload
main();