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
  console.error('\nERROR: serviceAccountKey.json not found!');
  console.error('Expected: scripts/serviceAccountKey.json\n');
  console.error('How to fix: Generate from Firebase Console > Project Settings > Service Accounts > Generate New Private Key');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'huflit-test-4ce25'
});

const db = admin.firestore();

// ============================================
// Import Individual Exam Files
// ============================================
let EXAMS = {}; // { exam1: EXAM1_DATA, exam2: EXAM2_DATA, ... exam8: EXAM8_DATA }

const examNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

try {
  for (const num of examNumbers) {
    const examKey = `exam${num}`;
    const examModule = await import(`../src/data/exams/${examKey}.js`);
    const dataKey = `EXAM${num}_DATA`;
    EXAMS[examKey] = examModule[dataKey] || examModule.default || {};
    console.log(`${examKey}.js loaded`);
  }
} catch (e) {
  console.error('Import error for one or more exam files:', e.message);
  console.error('Fix: Ensure files exist at src/data/exams/exam1.js through exam8.js and export const EXAMN_DATA = { ... };');
  process.exit(1);
}

if (Object.keys(EXAMS).length < 10) {
  console.error('Less than 10 exams loaded. Check files.');
  process.exit(1);
}

console.log('Loaded exams:', Object.keys(EXAMS).length);

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
  console.log(`  ${msg}`);
}

function logInfo(msg) {
  console.log(`  ${msg}`);
}

function logError(msg) {
  console.log(`  ${msg}`);
}

// ============================================
// Upload Functions
// ============================================
async function uploadExamMetadata() {
  logSection('Uploading Exam Metadata');

  let totalExams = 0;

  for (const [examKey, examData] of Object.entries(EXAMS)) {
    const examId = examKey; // e.g., exam1
    console.log(`\n  Exam: ${examId}`);

    try {
      // Upload exam metadata
      await db.collection('examData').doc(examId).set(
        cleanData({
          id: examId,
          title: examData.title || examId,
          description: examData.description || '',
          type: 'exam',
          totalParts: Object.keys(examData.parts || {}).length,
          totalQuestions: Object.values(examData.parts || {}).reduce((acc, part) => acc + (part.questions || []).length, 0),
          createdAt: new Date()
        }),
        { merge: true }
      );
      logSuccess(`${examId} metadata`);

      totalExams++;
    } catch (error) {
      logError(`${examId}: ${error.message}`);
    }
  }

  console.log(`\nTotal exams metadata uploaded/updated: ${totalExams}`);
  return totalExams;
}

async function uploadExamParts() {
  logSection('Uploading Exam Parts');

  let totalParts = 0;

  for (const [examKey, examData] of Object.entries(EXAMS)) {
    const examId = examKey;
    if (!examData.parts) {
      logInfo(`${examId}: No parts found, skipping.`);
      continue;
    }

    for (const [partId, partData] of Object.entries(examData.parts)) {
      const docId = `${examId}__${partId}`;

      try {
        // Clean questions array - Ensure explanation exists for each
        const cleanQuestions = (partData.questions || []).map(q => ({
          id: q.id,
          question: q.question || '',
          options: q.options || [],
          correct: q.correct || 0,
          explanation: q.explanation || 'No explanation provided.' // Fallback if missing
        })).filter(q => q.question); // Only keep if question exists

        await db.collection('examData').doc(docId).set(
          cleanData({
            examId,
            examTitle: examData.title,
            partId,
            title: partData.title || partId,
            description: partData.description || '',
            type: partData.type || 'listening',
            script: partData.script || '', // For audio/text
            questionsCount: cleanQuestions.length,
            questions: cleanQuestions,
            createdAt: new Date()
          }),
          { merge: true }
        );

        totalParts++;
        logSuccess(`${examId} - ${partData.title || partId} (${cleanQuestions.length} questions)`);
      } catch (error) {
        logError(`${docId}: ${error.message}`);
      }
    }
  }

  console.log(`\nTotal exam parts uploaded/updated: ${totalParts}`);
  return totalParts;
}

async function uploadExamStats() {
  logSection('Uploading Exam Statistics');

  try {
    let totalQuestions = 0;
    let totalParts = 0;
    let totalExams = Object.keys(EXAMS).length;

    for (const examData of Object.values(EXAMS)) {
      for (const partData of Object.values(examData.parts || {})) {
        totalParts++;
        totalQuestions += (partData.questions || []).length;
      }
    }

    const stats = {
      totalExams,
      totalParts,
      totalQuestions,
      updatedAt: new Date()
    };

    await db.collection('metadata').doc('examStats').set(stats, { merge: true });
    
    logSuccess('Exam statistics updated');
    console.log(`   Exams: ${totalExams}`);
    console.log(`   Parts: ${totalParts}`);
    console.log(`   Questions: ${totalQuestions}`);
  } catch (error) {
    logError(`Statistics: ${error.message}`);
  }
}

// ============================================
// Main
// ============================================
async function main() {
  logSection('Firebase Exam Data Upload (Fixed Version - Separate Imports)');
  logInfo('This will upload data from exam1.js through exam8.js to Firebase');

  try {
    console.log('\nLoading exam files...\n');

    const exams = await uploadExamMetadata();
    const parts = await uploadExamParts();
    await uploadExamStats();

    logSection('Upload Complete!');
    console.log(`\nSummary:`);
    console.log(`   Exams: ${exams}`);
    console.log(`   Parts: ${parts}`);
    console.log(`\nAll exam data from 10 files successfully uploaded to Firebase Firestore!`);
    console.log(`\nView your data:`);
    console.log(`   https://console.firebase.google.com/u/0/project/huflit-test-4ce25/firestore (collection: examData)\n`);

    process.exit(0);
  } catch (error) {
    console.error('\nFatal error:', error.message);
    process.exit(1);
  }
}

main();