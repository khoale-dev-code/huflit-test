#!/usr/bin/env node

/**
 * Upload Vocabulary Data to Firebase
 * File: scripts/uploadvocabularyData.js
 * Run: node scripts/uploadvocabularyData.js
 * or add to package.json: "upload:vocabulary": "node scripts/uploadvocabularyData.js"
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
// Import Real Vocabulary Data
// ============================================
let VOCABULARY_DATA = {};

try {
  const vocabModule = await import('../src/data/vocabularyData.js');
  VOCABULARY_DATA = vocabModule.VOCABULARY_DATA || vocabModule.default || {};
  console.log('✅ Vocabulary data loaded');
} catch (e) {
  console.error('❌ Could not load vocabulary data:', e.message);
  process.exit(1);
}

if (Object.keys(VOCABULARY_DATA).length === 0) {
  console.error('❌ No vocabulary data found in vocabularyData.js');
  process.exit(1);
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
async function uploadVocabularyLevels() {
  logSection('📖 Uploading Vocabulary Levels');

  let totalLevels = 0;

  for (const [levelId, levelData] of Object.entries(VOCABULARY_DATA)) {
    console.log(`\n  📚 Level: ${levelId}`);

    try {
      // Upload level metadata
      await db.collection('vocabularyData').doc(levelId).set(
        cleanData({
          id: levelId,
          level: levelData.level || levelId,
          description: levelData.description || '',
          type: 'level',
          categoriesCount: Object.keys(levelData.categories || {}).length,
          createdAt: new Date()
        }),
        { merge: true }
      );
      logSuccess(`${levelId} metadata`);

      totalLevels++;
    } catch (error) {
      logError(`${levelId}: ${error.message}`);
    }
  }

  console.log(`\n✨ Total vocabulary levels uploaded/updated: ${totalLevels}`);
  return totalLevels;
}

async function uploadVocabularyCategories() {
  logSection('📂 Uploading Vocabulary Categories');

  let totalCategories = 0;

  for (const [levelId, levelData] of Object.entries(VOCABULARY_DATA)) {
    if (!levelData.categories) continue;

    for (const [catId, catData] of Object.entries(levelData.categories)) {
      const docId = `${levelId}__${catId}`;

      try {
        // Clean words array
        const cleanWords = (catData.words || []).map(word => ({
          id: word.id,
          word: word.word || '',
          pronunciation: word.pronunciation || '',
          definition: word.definition || '',
          example: word.example || '',
          vietnamese: word.vietnamese || '',
          alternatives: word.alternatives || []
        })).filter(w => w.word); // Only keep if word exists

        await db.collection('vocabularyData').doc(docId).set(
          cleanData({
            level: levelId,
            levelName: levelData.level,
            categoryId: catId,
            title: catData.title || catId,
            description: catData.description || '',
            type: 'category',
            wordsCount: cleanWords.length,
            words: cleanWords,
            createdAt: new Date()
          }),
          { merge: true }
        );

        totalCategories++;
        logSuccess(`${catData.title || catId} (${cleanWords.length} words)`);
      } catch (error) {
        logError(`${docId}: ${error.message}`);
      }
    }
  }

  console.log(`\n✨ Total vocabulary categories uploaded/updated: ${totalCategories}`);
  return totalCategories;
}

async function uploadVocabularyMetadata() {
  logSection('📊 Uploading Vocabulary Statistics');

  try {
    let totalWords = 0;
    let totalCategories = 0;
    let totalLevels = Object.keys(VOCABULARY_DATA).length;

    for (const levelData of Object.values(VOCABULARY_DATA)) {
      for (const catData of Object.values(levelData.categories || {})) {
        totalCategories++;
        totalWords += (catData.words || []).length;
      }
    }

    const stats = {
      totalLevels,
      totalCategories,
      totalWords,
      updatedAt: new Date()
    };

    await db.collection('metadata').doc('vocabularyStats').set(stats, { merge: true });
    
    logSuccess('Vocabulary statistics updated');
    console.log(`   📚 Levels: ${totalLevels}`);
    console.log(`   📂 Categories: ${totalCategories}`);
    console.log(`   📖 Words: ${totalWords}`);
  } catch (error) {
    logError(`Statistics: ${error.message}`);
  }
}

// ============================================
// Main
// ============================================
async function main() {
  logSection('🚀 Firebase Vocabulary Data Upload');
  logInfo('This will upload ALL vocabulary data to Firebase');

  try {
    console.log('\n📋 Loading vocabulary data...\n');

    const levels = await uploadVocabularyLevels();
    const categories = await uploadVocabularyCategories();
    await uploadVocabularyMetadata();

    logSection('✨ Upload Complete!');
    console.log(`\n📊 Summary:`);
    console.log(`   📚 Levels: ${levels}`);
    console.log(`   📂 Categories: ${categories}`);
    console.log(`\n🎉 All vocabulary data successfully uploaded to Firebase Firestore!`);
    console.log(`\n📍 View your data:`);
    console.log(`   https://console.firebase.google.com/u/0/project/huflit-test-4ce25/firestore (collection: vocabularyData)\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main();