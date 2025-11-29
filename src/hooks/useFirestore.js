import { useState, useEffect, useCallback, useRef } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const unsubscribeRef = useRef(null);

  // -----------------------------------------
  // 1. GET ALL DOCUMENTS (ONCE)
  // -----------------------------------------
  const getAll = useCallback(
    async (filters = [], sort = null, limitSize = null) => {
      try {
        setLoading(true);

        let q = collection(db, collectionName);

        // Apply filters WHERE
        if (filters.length > 0) {
          filters.forEach((f) => {
            q = query(q, where(f.field, f.op, f.value));
          });
        }

        // Apply ORDER BY
        if (sort) {
          q = query(q, orderBy(sort.field, sort.direction ?? "asc"));
        }

        // Apply LIMIT
        if (limitSize) {
          q = query(q, limit(limitSize));
        }

        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setData(docs);
        setError(null);
        return docs;
      } catch (err) {
        setError(err.message);
        console.error("🔥 getAll error:", err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  // -----------------------------------------
  // 2. REALTIME SUBSCRIBE
  // -----------------------------------------
  const subscribe = useCallback(
    (filters = [], sort = null, limitSize = null) => {
      try {
        let q = collection(db, collectionName);

        if (filters.length > 0) {
          filters.forEach((f) => {
            q = query(q, where(f.field, f.op, f.value));
          });
        }

        if (sort) {
          q = query(q, orderBy(sort.field, sort.direction ?? "asc"));
        }

        if (limitSize) {
          q = query(q, limit(limitSize));
        }

        if (unsubscribeRef.current) unsubscribeRef.current();

        const unsub = onSnapshot(
          q,
          (snapshot) => {
            const docs = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data(),
            }));
            setData(docs);
            setError(null);
          },
          (err) => {
            setError(err.message);
            console.error("🔥 Snapshot error:", err);
          }
        );

        unsubscribeRef.current = unsub;

        return unsub;
      } catch (err) {
        setError(err.message);
        console.error("🔥 subscribe error:", err);
      }
    },
    [collectionName]
  );

  // -----------------------------------------
  // 3. GET COUNT (AGGREGATION – SIÊU RẺ)
  // -----------------------------------------
  const getCount = useCallback(async (filters = []) => {
    try {
      let q = collection(db, collectionName);

      if (filters.length > 0) {
        filters.forEach((f) => {
          q = query(q, where(f.field, f.op, f.value));
        });
      }

      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch (err) {
      console.error("🔥 getCount error:", err);
      return 0;
    }
  }, [collectionName]);

  // -----------------------------------------
  // 4. LISTEN TO ONE DOCUMENT
  // -----------------------------------------
  const subscribeDoc = useCallback((docId, callback) => {
    try {
      const ref = doc(db, collectionName, docId);

      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          callback(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
        },
        (err) => console.error("🔥 subscribeDoc error:", err)
      );

      return unsub;
    } catch (err) {
      console.error("🔥 subscribeDoc error:", err);
    }
  }, [collectionName]);

  // -----------------------------------------
  // 5. ADD DOCUMENT
  // -----------------------------------------
  const add = useCallback(
    async (newData) => {
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
        console.error("🔥 add error:", err);
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  // -----------------------------------------
  // 6. UPDATE DOCUMENT
  // -----------------------------------------
  const update = useCallback(
    async (docId, updatedData) => {
      try {
        setLoading(true);
        await updateDoc(doc(db, collectionName, docId), {
          ...updatedData,
          updatedAt: serverTimestamp(),
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("🔥 update error:", err);
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  // -----------------------------------------
  // 7. DELETE DOCUMENT
  // -----------------------------------------
  const remove = useCallback(
    async (docId) => {
      try {
        setLoading(true);
        await deleteDoc(doc(db, collectionName, docId));
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("🔥 delete error:", err);
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  // Cleanup listener on unmount
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,

    // MAIN API
    getAll,
    subscribe,
    getCount,
    subscribeDoc,

    // CRUD
    add,
    update,
    remove,
  };
};

export default useFirestore;
