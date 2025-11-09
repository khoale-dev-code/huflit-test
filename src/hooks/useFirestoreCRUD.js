// // src/hooks/useFirestoreCRUD.js
// import { 
//   doc, 
//   getDoc, 
//   setDoc, 
//   deleteDoc, 
//   collection, 
//   getDocs, 
//   addDoc, 
//   query, 
//   where, 
//   writeBatch 
// } from 'firebase/firestore';
// import { db } from '../config/firebase'; // Import from your updated firebase.js

// // Utility: Get all documents from a collection with optional query
// export const getCollection = async (collectionName, queryOptions = {}) => {
//   try {
//     let q = collection(db, collectionName);
//     if (queryOptions.where) {
//       q = query(q, where(queryOptions.where.field, queryOptions.where.op, queryOptions.where.value));
//     }
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
//   } catch (error) {
//     console.error(`Firestore get collection error for ${collectionName}:`, error);
//     throw error;
//   }
// };

// // Vocabulary CRUD Hook
// export function useVocabularyCRUD() {
//   const collectionRef = collection(db, 'vocabulary');

//   const addWord = async (wordData) => {
//     try {
//       // Check for duplicates (e.g., by word + level)
//       const existingQuery = query(collectionRef, where('word', '==', wordData.word), where('level', '==', wordData.level));
//       const snapshot = await getDocs(existingQuery);
//       if (!snapshot.empty) {
//         throw new Error(`Word "${wordData.word}" already exists in level "${wordData.level}".`);
//       }
//       const newDoc = await addDoc(collectionRef, { ...wordData, createdAt: new Date() });
//       return newDoc.id;
//     } catch (error) {
//       console.error('Vocabulary add error:', error);
//       throw error;
//     }
//   };

//   const updateWord = async (id, wordData) => {
//     try {
//       await setDoc(doc(db, 'vocabulary', id), { ...wordData, updatedAt: new Date() }, { merge: true });
//     } catch (error) {
//       console.error('Vocabulary update error:', error);
//       throw error;
//     }
//   };

//   const deleteWord = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'vocabulary', id));
//     } catch (error) {
//       console.error('Vocabulary delete error:', error);
//       throw error;
//     }
//   };

//   const getAllWords = async (filters = {}) => {
//     return getCollection('vocabulary', { where: filters.where });
//   };

//   return { addWord, updateWord, deleteWord, getAllWords };
// }

// // Grammar CRUD Hook (New Addition)
// export function useGrammarCRUD() {
//   // Collections for hierarchical structure
//   const topicsRef = collection(db, 'grammar_topics');
//   const lessonsRef = collection(db, 'grammar_lessons');
//   const exercisesRef = collection(db, 'grammar_exercises');

//   // Topic Operations
//   const addTopic = async (topicData) => {
//     try {
//       // Check for duplicates (e.g., by title + level)
//       const existingQuery = query(topicsRef, where('title', '==', topicData.title), where('level', '==', topicData.level));
//       const snapshot = await getDocs(existingQuery);
//       if (!snapshot.empty) {
//         throw new Error(`Topic "${topicData.title}" already exists in level "${topicData.level}".`);
//       }
//       const newDoc = await addDoc(topicsRef, { ...topicData, createdAt: new Date() });
//       return newDoc.id;
//     } catch (error) {
//       console.error('Grammar topic add error:', error);
//       throw error;
//     }
//   };

//   const updateTopic = async (id, topicData) => {
//     try {
//       await setDoc(doc(db, 'grammar_topics', id), { ...topicData, updatedAt: new Date() }, { merge: true });
//     } catch (error) {
//       console.error('Grammar topic update error:', error);
//       throw error;
//     }
//   };

//   const deleteTopic = async (id) => {
//     try {
//       // Cascade delete: Remove associated lessons and exercises
//       const lessonsQuery = query(lessonsRef, where('topicId', '==', id));
//       const exercisesQuery = query(exercisesRef, where('topicId', '==', id));
      
//       const lessonsSnapshot = await getDocs(lessonsQuery);
//       const exercisesSnapshot = await getDocs(exercisesQuery);
      
//       const batch = writeBatch(db);
//       lessonsSnapshot.docs.forEach((docSnap) => batch.delete(docSnap.ref));
//       exercisesSnapshot.docs.forEach((docSnap) => batch.delete(docSnap.ref));
//       batch.delete(doc(db, 'grammar_topics', id));
      
//       await batch.commit();
//     } catch (error) {
//       console.error('Grammar topic delete error:', error);
//       throw error;
//     }
//   };

//   const getAllTopics = async (filters = {}) => {
//     return getCollection('grammar_topics', { where: filters.where });
//   };

//   // Lesson Operations (e.g., add lesson to a topic)
//   const addLesson = async (lessonData) => {
//     try {
//       // Validate topic exists
//       const topicSnap = await getDoc(doc(db, 'grammar_topics', lessonData.topicId));
//       if (!topicSnap.exists()) {
//         throw new Error(`Topic ID "${lessonData.topicId}" does not exist.`);
//       }
//       const newDoc = await addDoc(lessonsRef, { ...lessonData, createdAt: new Date() });
//       return newDoc.id;
//     } catch (error) {
//       console.error('Grammar lesson add error:', error);
//       throw error;
//     }
//   };

//   const updateLesson = async (id, lessonData) => {
//     try {
//       await setDoc(doc(db, 'grammar_lessons', id), { ...lessonData, updatedAt: new Date() }, { merge: true });
//     } catch (error) {
//       console.error('Grammar lesson update error:', error);
//       throw error;
//     }
//   };

//   const deleteLesson = async (id) => {
//     try {
//       // Cascade delete exercises under this lesson
//       const exercisesQuery = query(exercisesRef, where('lessonId', '==', id));
//       const snapshot = await getDocs(exercisesQuery);
      
//       const batch = writeBatch(db);
//       snapshot.docs.forEach((docSnap) => batch.delete(docSnap.ref));
//       batch.delete(doc(db, 'grammar_lessons', id));
      
//       await batch.commit();
//     } catch (error) {
//       console.error('Grammar lesson delete error:', error);
//       throw error;
//     }
//   };

//   const getLessonsByTopic = async (topicId) => {
//     return getCollection('grammar_lessons', { where: { field: 'topicId', op: '==', value: topicId } });
//   };

//   // Exercise Operations
//   const addExercise = async (exerciseData) => {
//     try {
//       // Validate lesson exists
//       const lessonSnap = await getDoc(doc(db, 'grammar_lessons', exerciseData.lessonId));
//       if (!lessonSnap.exists()) {
//         throw new Error(`Lesson ID "${exerciseData.lessonId}" does not exist.`);
//       }
//       const newDoc = await addDoc(exercisesRef, { ...exerciseData, createdAt: new Date() });
//       return newDoc.id;
//     } catch (error) {
//       console.error('Grammar exercise add error:', error);
//       throw error;
//     }
//   };

//   const updateExercise = async (id, exerciseData) => {
//     try {
//       await setDoc(doc(db, 'grammar_exercises', id), { ...exerciseData, updatedAt: new Date() }, { merge: true });
//     } catch (error) {
//       console.error('Grammar exercise update error:', error);
//       throw error;
//     }
//   };

//   const deleteExercise = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'grammar_exercises', id));
//     } catch (error) {
//       console.error('Grammar exercise delete error:', error);
//       throw error;
//     }
//   };

//   const getExercisesByLesson = async (lessonId) => {
//     return getCollection('grammar_exercises', { where: { field: 'lessonId', op: '==', value: lessonId } });
//   };

//   return {
//     // Topics
//     addTopic, updateTopic, deleteTopic, getAllTopics,
//     // Lessons
//     addLesson, updateLesson, deleteLesson, getLessonsByTopic,
//     // Exercises
//     addExercise, updateExercise, deleteExercise, getExercisesByLesson
//   };
// }