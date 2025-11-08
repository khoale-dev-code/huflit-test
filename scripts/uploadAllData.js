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
  console.error('\n❌ ERROR: serviceAccountKey.json not found!\n');
  console.error('📍 Expected location: scripts/serviceAccountKey.json\n');
  console.error('📝 How to fix:');
  console.error('  1. Go to: https://console.firebase.google.com/');
  console.error('  2. Select project: huflit-test-4ce25');
  console.error('  3. Project Settings → Service Accounts');
  console.error('  4. Click "Generate New Private Key"');
  console.error('  5. Save as: scripts/serviceAccountKey.json');
  console.error('  6. Add to .gitignore\n');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'huflit-test-4ce25'
});

const db = admin.firestore();

// ============================================
// Sample Data
// ============================================
const sampleExams = {
  exam1: {
    title: 'HUFLIT Exam 1',
    parts: {
      part1: {
        title: 'Part 1 - Short Conversations',
        questions: [
          { id: 'q1', question: 'What is the topic?', options: ['A', 'B', 'C', 'D'], correct: 0 }
        ]
      },
      part2: {
        title: 'Part 2 - Extended Conversations',
        questions: [
          { id: 'q2', question: 'What does the speaker suggest?', options: ['A', 'B', 'C', 'D'], correct: 1 }
        ]
      }
    }
  }
};

const sampleVocabulary = {
  beginner: {
    level: 'Beginner',
    categories: {
      travel: {
        title: '✈️ Travel',
        words: [
          { id: 'v1', word: 'destination', definition: 'A place where someone is going', vietnamese: 'điểm đến' },
          { id: 'v2', word: 'journey', definition: 'Trip', vietnamese: 'chuyến đi' }
        ]
      }
    }
  }
};

const sampleGrammar = {
  beginner: {
    level: 'Beginner',
    topics: {
      presentSimple: {
        title: 'Present Simple',
        lessons: [
          { lessonId: 'ps1', title: 'Intro', duration: '5 mins', content: 'Learn present simple...' }
        ]
      }
    }
  }
};

// ============================================
// Upload Functions
// ============================================
async function uploadExams() {
  console.log('\n📚 Uploading Exams...');
  let count = 0;

  for (const [examId, examData] of Object.entries(sampleExams)) {
    console.log(`   📝 ${examId}`);
    
    // Save exam metadata
    await db.collection('examData').doc(examId).set({
      title: examData.title,
      type: 'exam',
      createdAt: new Date()
    });

    // Save exam parts
    for (const [partId, partData] of Object.entries(examData.parts)) {
      const docId = `${examId}__${partId}`;
      await db.collection('examData').doc(docId).set({
        examId,
        partId,
        title: partData.title,
        questions: partData.questions,
        questionsCount: partData.questions.length,
        type: 'part',
        createdAt: new Date()
      });
      count++;
    }
  }

  console.log(`   ✅ ${count} exam parts uploaded`);
  return count;
}

async function uploadVocabulary() {
  console.log('\n📖 Uploading Vocabulary...');
  let count = 0;

  for (const [levelId, levelData] of Object.entries(sampleVocabulary)) {
    console.log(`   📚 ${levelId}`);
    
    // Save level metadata
    await db.collection('vocabularyData').doc(levelId).set({
      level: levelData.level,
      type: 'level',
      createdAt: new Date()
    });

    // Save categories
    for (const [categoryId, categoryData] of Object.entries(levelData.categories)) {
      const docId = `${levelId}__${categoryId}`;
      await db.collection('vocabularyData').doc(docId).set({
        level: levelId,
        categoryId,
        title: categoryData.title,
        words: categoryData.words,
        wordsCount: categoryData.words.length,
        type: 'category',
        createdAt: new Date()
      });
      count++;
    }
  }

  console.log(`   ✅ ${count} vocabulary categories uploaded`);
  return count;
}

async function uploadGrammar() {
  console.log('\n📝 Uploading Grammar...');
  let count = 0;

  for (const [levelId, levelData] of Object.entries(sampleGrammar)) {
    console.log(`   📚 ${levelId}`);
    
    // Save level metadata
    await db.collection('grammarData').doc(levelId).set({
      level: levelData.level,
      type: 'level',
      createdAt: new Date()
    }, { merge: true });

    // Save topics
    for (const [topicId, topicData] of Object.entries(levelData.topics)) {
      const docId = `${levelId}__${topicId}`;
      
      // Clean lessons - remove undefined values
      const cleanLessons = (topicData.lessons || []).map(lesson => ({
        lessonId: lesson.lessonId || '',
        title: lesson.title || '',
        duration: lesson.duration || '',
        content: lesson.content || ''
      })).filter(l => l.title); // Only keep if title exists

      await db.collection('grammarData').doc(docId).set({
        level: levelId,
        topicId,
        title: topicData.title || '',
        lessons: cleanLessons,
        type: 'topic',
        createdAt: new Date()
      }, { merge: true });
      count++;
    }
  }

  console.log(`   ✅ ${count} grammar topics uploaded`);
  return count;
}

async function uploadMetadata() {
  console.log('\n📊 Uploading Metadata...');
  
  await db.collection('metadata').doc('statistics').set({
    totalExams: Object.keys(sampleExams).length,
    totalVocabularyLevels: Object.keys(sampleVocabulary).length,
    totalGrammarLevels: Object.keys(sampleGrammar).length,
    updatedAt: new Date()
  });

  console.log('   ✅ Metadata uploaded');
}

// ============================================
// Main
// ============================================
async function main() {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 Firebase Data Upload');
  console.log('='.repeat(50));

  try {
    const exams = await uploadExams();
    const vocab = await uploadVocabulary();
    const grammar = await uploadGrammar();
    await uploadMetadata();

    console.log('\n' + '='.repeat(50));
    console.log('✨ Upload Complete!');
    console.log('='.repeat(50));
    console.log(`\n📊 Summary:`);
    console.log(`   📚 Exam parts: ${exams}`);
    console.log(`   📖 Vocabulary categories: ${vocab}`);
    console.log(`   📝 Grammar topics: ${grammar}`);
    console.log(`\n🎉 Success! Data is now in Firebase Firestore`);
    console.log('\n📍 View your data:');
    console.log('   https://console.firebase.google.com/u/0/project/huflit-test-4ce25/firestore\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();