// src/hooks/useWritingHistory.js
import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

export const useWritingHistory = (userId) => {
  const [submissions, setSubmissions] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const loadHistory = async () => {
    if (!userId) return;
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from('writing_submissions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (userId) loadHistory();
  }, [userId]);

  return { submissions, loadingHistory, showHistory, setShowHistory, loadHistory };
};