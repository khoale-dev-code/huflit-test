import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  setDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5HDCOZFBzI-t-ysuJ88YMHP9q_LxcNcQ",
  authDomain: "huflit-test-4ce25.firebaseapp.com",
  projectId: "huflit-test-4ce25",
  storageBucket: "huflit-test-4ce25.firebasestorage.app",
  messagingSenderId: "839404304249",
  appId: "1:839404304249:web:c9cc8830cd6b42bafc21a8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Import dữ liệu từ file
import EXAM_DATA from '../src/data/examData.js';

async function migrateExamData() {
  try {
    console.log('🚀 Bắt đầu migrate dữ liệu exam...');

    const examCollection = collection(db, 'examData');
    let totalDocs = 0;

    // Duyệt qua tất cả exams
    for (const [examKey, examData] of Object.entries(EXAM_DATA)) {
      console.log(`📝 Processing ${examKey}...`);

      // Lưu exam metadata
      await setDoc(doc(examCollection, examKey), {
        id: examKey,
        title: examData.title || 'Exam',
        description: examData.description || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Lưu từng part
      if (examData.parts) {
        for (const [partKey, partData] of Object.entries(examData.parts)) {
          const partDocId = `${examKey}_${partKey}`;
          
          await setDoc(doc(examCollection, partDocId), {
            examId: examKey,
            partId: partKey,
            title: partData.title || `Part ${partKey}`,
            description: partData.description || '',
            type: partData.type || 'listening',
            script: partData.script || '',
            questions: partData.questions || [],
            questionsCount: partData.questions?.length || 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          totalDocs++;
          console.log(`  ✅ ${partDocId} uploaded`);
        }
      }
    }

    console.log(`\n✨ Migrate thành công! Tổng ${totalDocs} documents đã được upload.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi migrate:', error);
    process.exit(1);
  }
}

migrateExamData();