import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  collectionGroup,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ============================================
// 🎣 HOOK: useFirestoreData
// ============================================

/**
 * Optimized Firestore data loading with lazy loading strategy
 * 
 * STRATEGY:
 * 1. Load exam metadata only (không load parts & questions)
 * 2. Khi user chọn exam → load parts
 * 3. Khi user chọn part → load questions
 * 
 * Benefits:
 * - Initial load: super fast
 * - User experience: smooth, no lag
 * - Scalability: supports 1000+ exams
 */

export const useFirestoreData = () => {
  // State Management
  const [examMetadata, setExamMetadata] = useState({});
  const [partsData, setPartsData] = useState({});
  const [questionsData, setQuestionsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingParts, setLoadingParts] = useState({});
  const [loadingQuestions, setLoadingQuestions] = useState({});
  const [error, setError] = useState(null);

  // ============================================
  // 1️⃣ LOAD EXAM METADATA (Initial Load)
  // ============================================

  useEffect(() => {
    const fetchExamMetadata = async () => {
      try {
        setLoading(true);

        // Query chỉ lấy document level (không lấy subcollections)
        const examCollection = collection(db, 'examData');
        const snapshot = await getDocs(examCollection);

        const metadata = {};
        snapshot.docs.forEach((doc) => {
          const data = doc.data();

          // Filter: chỉ lấy documents có examId (không phải part documents)
          if (data.examId && !data.partId) {
            metadata[doc.id] = {
              id: doc.id,
              title: data.title || 'Unknown Exam',
              description: data.description || '',
              duration: data.duration || 0,
              totalParts: data.totalParts || 0,
              totalQuestions: data.totalQuestions || 0,
              passingScore: data.passingScore || 60,
              // ... other metadata
            };
          }
        });

        setExamMetadata(metadata);
        setError(null);
      } catch (err) {
        console.error('Error fetching exam metadata:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamMetadata();
  }, []);

  // ============================================
  // 2️⃣ LAZY LOAD PARTS (When User Selects Exam)
  // ============================================

  const loadPartsByExamId = useCallback(
    async (examId) => {
      // Check if already loaded
      if (partsData[examId]) {
        return partsData[examId];
      }

      try {
        setLoadingParts((prev) => ({ ...prev, [examId]: true }));

        // Fetch parts for this exam
        const partsRef = collection(
          db,
          'examData',
          examId,
          'parts' // Subcollection
        );
        const partsSnapshot = await getDocs(partsRef);

        const parts = {};
        partsSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          parts[doc.id] = {
            id: doc.id,
            partId: data.partId,
            title: data.title || 'Part',
            description: data.description || '',
            script: data.script || '', // Audio script for listening
            totalQuestions: data.totalQuestions || 0,
            // Do NOT include questions here (lazy load them)
          };
        });

        // Update state
        setPartsData((prev) => ({
          ...prev,
          [examId]: parts,
        }));

        return parts;
      } catch (err) {
        console.error(`Error loading parts for exam ${examId}:`, err);
        setError(err.message);
        return {};
      } finally {
        setLoadingParts((prev) => ({ ...prev, [examId]: false }));
      }
    },
    [partsData]
  );

  // ============================================
  // 3️⃣ LAZY LOAD QUESTIONS (When User Selects Part)
  // ============================================

  const loadQuestionsByPartId = useCallback(
    async (examId, partId) => {
      const questionsKey = `${examId}/${partId}`;

      // Check if already loaded
      if (questionsData[questionsKey]) {
        return questionsData[questionsKey];
      }

      try {
        setLoadingQuestions((prev) => ({ ...prev, [questionsKey]: true }));

        // Fetch questions for this part
        const questionsRef = collection(
          db,
          'examData',
          examId,
          'parts',
          partId,
          'questions' // Deeply nested subcollection
        );
        const questionsSnapshot = await getDocs(questionsRef);

        const questions = {};
        questionsSnapshot.docs.forEach((doc, index) => {
          const data = doc.data();
          questions[doc.id] = {
            id: doc.id,
            questionNumber: index + 1,
            questionText: data.questionText || '',
            type: data.type || 'multiple-choice', // 'multiple-choice', 'fill-blank', etc
            options: data.options || [], // For multiple choice
            correctAnswer: data.correctAnswer || '',
            explanation: data.explanation || '',
            imageUrl: data.imageUrl || null,
            audioUrl: data.audioUrl || null,
            points: data.points || 1,
          };
        });

        // Update state
        setQuestionsData((prev) => ({
          ...prev,
          [questionsKey]: questions,
        }));

        return questions;
      } catch (err) {
        console.error(
          `Error loading questions for ${examId}/${partId}:`,
          err
        );
        setError(err.message);
        return {};
      } finally {
        setLoadingQuestions((prev) => ({ ...prev, [questionsKey]: false }));
      }
    },
    [questionsData]
  );

  // ============================================
  // 4️⃣ GET SINGLE EXAM (Alternative: Direct fetch)
  // ============================================

  const getExam = useCallback(async (examId) => {
    try {
      const docRef = doc(db, 'examData', examId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      }
      return null;
    } catch (err) {
      console.error(`Error fetching exam ${examId}:`, err);
      setError(err.message);
      return null;
    }
  }, []);

  // ============================================
  // 5️⃣ COMPUTED VALUES (Memoized)
  // ============================================

  const examList = useMemo(() => {
    return Object.values(examMetadata).sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }, [examMetadata]);

  const getPartsList = useCallback((examId) => {
    return Object.values(partsData[examId] || {}).sort(
      (a, b) => a.partId - b.partId
    );
  }, [partsData]);

  const getQuestionsList = useCallback((examId, partId) => {
    const questionsKey = `${examId}/${partId}`;
    return Object.values(questionsData[questionsKey] || {}).sort(
      (a, b) => a.questionNumber - b.questionNumber
    );
  }, [questionsData]);

  // ============================================
  // RETURN PUBLIC API
  // ============================================

  return {
    // Data
    examMetadata,
    partsData,
    questionsData,
    examList,

    // Loading states
    loading,
    loadingParts,
    loadingQuestions,
    error,

    // Methods
    loadPartsByExamId,
    loadQuestionsByPartId,
    getExam,
    getPartsList,
    getQuestionsList,
  };
};

// ============================================
// 🔍 ALTERNATIVE: collectionGroup Query
// ============================================

/**
 * If you want to search across all parts/questions
 * Useful for global search feature
 */
export const useFirestoreSearch = () => {
  const searchQuestionsByText = useCallback(
    async (searchText) => {
      try {
        // Note: collectionGroup requires index setup in Firestore
        const q = query(
          collectionGroup(db, 'questions'),
          where('questionText', '>=', searchText),
          where('questionText', '<=', searchText + '\uf8ff')
        );

        const snapshot = await getDocs(q);
        const results = [];

        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
            path: doc.ref.path,
          });
        });

        return results;
      } catch (err) {
        console.error('Error searching questions:', err);
        return [];
      }
    },
    []
  );

  return { searchQuestionsByText };
};

export default useFirestoreData;