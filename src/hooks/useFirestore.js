import { useState, useCallback } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all documents from collection
  const getAll = useCallback(async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, collectionName));
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(docs);
      return docs;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Subscribe to collection with real-time updates
  const subscribe = useCallback((userId = null) => {
    try {
      let q = collection(db, collectionName);
      
      if (userId) {
        q = query(collection(db, collectionName), where('userId', '==', userId));
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setData(docs);
          setError(null);
        },
        (err) => {
          setError(err.message);
          console.error('Snapshot listener error:', err);
        }
      );

      return unsubscribe;
    } catch (err) {
      setError(err.message);
      console.error('Error setting up snapshot listener:', err);
    }
  }, [collectionName]);

  // Add new document
  const add = useCallback(async (newData) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, collectionName), {
        ...newData,
        createdAt: serverTimestamp(),
      });
      setError(null);
      return docRef.id;
    } catch (err) {
      setError(err.message);
      console.error('Error adding document:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Update document
  const update = useCallback(async (docId, updatedData) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, collectionName, docId), {
        ...updatedData,
        updatedAt: serverTimestamp(),
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating document:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Delete document
  const remove = useCallback(async (docId) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, collectionName, docId));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting document:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  return { 
    data, 
    loading, 
    error, 
    getAll, 
    subscribe, 
    add, 
    update, 
    remove 
  };
};
export default useFirestore;
