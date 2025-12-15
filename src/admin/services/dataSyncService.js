// src/admin/services/dataSyncService.js
import { 
  collection, 
  doc,
  setDoc, 
  getDocs,
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../config/firebase';

/**
 * Sync local exam data to Firebase
 * Chỉ chạy 1 lần để import data
 */
export const syncExamsToFirebase = async (examData) => {
  try {
    const batch = writeBatch(db);
    const examIds = Object.keys(examData);
    
    let count = 0;
    for (const examId of examIds) {
      const exam = examData[examId];
      const examRef = doc(db, 'exams', examId);
      
      batch.set(examRef, {
        ...exam,
        id: examId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isPublished: false
      });
      
      count++;
      
      // Firestore batch limit is 500
      if (count % 500 === 0) {
        await batch.commit();
        console.log(`✅ Synced ${count} exams`);
      }
    }
    
    await batch.commit();
    console.log(`✅ Total synced: ${count} exams`);
    return { success: true, count };
  } catch (error) {
    console.error('❌ Error syncing exams:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sync local grammar data to Firebase
 */
export const syncGrammarToFirebase = async (grammarData) => {
  try {
    const batch = writeBatch(db);
    let count = 0;
    
    // Loop through levels: beginner, intermediate, advanced
    for (const [levelKey, levelData] of Object.entries(grammarData)) {
      // Loop through topics in each level
      for (const [topicKey, topicData] of Object.entries(levelData.topics || {})) {
        const grammarRef = doc(db, 'grammar', topicData.id);
        
        batch.set(grammarRef, {
          ...topicData,
          level: levelData.level,
          levelKey: levelKey,
          topicKey: topicKey,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        
        count++;
      }
    }
    
    await batch.commit();
    console.log(`✅ Synced ${count} grammar topics`);
    return { success: true, count };
  } catch (error) {
    console.error('❌ Error syncing grammar:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sync local vocabulary data to Firebase
 */
export const syncVocabularyToFirebase = async (vocabularyData) => {
  try {
    const batch = writeBatch(db);
    let count = 0;
    
    // Loop through topics
    for (const [topic, subtopics] of Object.entries(vocabularyData)) {
      // Loop through subtopics
      for (const [subtopic, words] of Object.entries(subtopics)) {
        // Each word becomes a document
        for (const word of words) {
          const wordId = `${topic}_${subtopic}_${word.word}`.replace(/\s+/g, '_').toLowerCase();
          const vocabRef = doc(db, 'vocabulary', wordId);
          
          batch.set(vocabRef, {
            ...word,
            topic: topic,
            subtopic: subtopic,
            category: topic,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          
          count++;
          
          // Batch limit
          if (count % 500 === 0) {
            await batch.commit();
            console.log(`✅ Synced ${count} words`);
          }
        }
      }
    }
    
    await batch.commit();
    console.log(`✅ Total synced: ${count} vocabulary words`);
    return { success: true, count };
  } catch (error) {
    console.error('❌ Error syncing vocabulary:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get sync status from Firebase
 */
export const getSyncStatus = async () => {
  try {
    const examsSnapshot = await getDocs(collection(db, 'exams'));
    const grammarSnapshot = await getDocs(collection(db, 'grammar'));
    const vocabSnapshot = await getDocs(collection(db, 'vocabulary'));
    
    return {
      success: true,
      stats: {
        exams: examsSnapshot.size,
        grammar: grammarSnapshot.size,
        vocabulary: vocabSnapshot.size
      }
    };
  } catch (error) {
    console.error('❌ Error getting sync status:', error);
    return { success: false, error: error.message };
  }
};