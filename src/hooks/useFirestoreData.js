import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useFirestoreData = () => {
  const [examData, setExamData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tất cả exam data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        const examCollection = collection(db, 'examData');
        const snapshot = await getDocs(examCollection);
        
        const data = {};
        snapshot.docs.forEach(doc => {
          const docData = doc.data();
          if (docData.examId) {
            // Đây là part document
            const examId = docData.examId;
            const partId = docData.partId;
            
            if (!data[examId]) {
              data[examId] = { parts: {} };
            }
            
            data[examId].parts[partId] = {
              title: docData.title,
              description: docData.description,
              script: docData.script,
              questions: docData.questions,
            };
          } else {
            // Đây là exam metadata
            data[doc.id] = {
              ...docData,
              parts: data[doc.id]?.parts || {}
            };
          }
        });
        
        setExamData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching exam data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, []);

  // Fetch single exam
  const getExam = async (examId) => {
    try {
      const docRef = doc(db, 'examData', examId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (err) {
      console.error('Error fetching exam:', err);
      throw err;
    }
  };

  return { examData, loading, error, getExam };
};