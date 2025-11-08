import { useState, useEffect, useRef, useCallback } from 'react';

export const useVoices = () => {
  const [allVoices, setAllVoices] = useState([]);
  const [maleVoice, setMaleVoice] = useState(null);
  const [femaleVoice, setFemaleVoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const synthRef = useRef(window.speechSynthesis);
  const voiceLoadAttempts = useRef(0);
  const MAX_LOAD_ATTEMPTS = 10;
  const LOAD_RETRY_DELAY = 100;

  // Tách logic tìm voice để tái sử dụng
  const findVoiceByPredicate = useCallback((voices, predicate) => {
    return voices.find(predicate) || voices[0] || null;
  }, []);

  // Tìm voice nữ với priority rõ ràng
  const findFemaleVoice = useCallback((voices) => {
    return findVoiceByPredicate(voices, (v) => {
      const nameLower = v.name.toLowerCase();
      // Priority 1: Explicit female marker
      if (nameLower.includes('female') || v.name.includes('F')) return true;
      // Priority 2: UK English (thường có nữ giọng tự nhiên hơn)
      if (v.lang.includes('en-GB')) return true;
      return false;
    });
  }, [findVoiceByPredicate]);

  // Tìm voice nam với priority rõ ràng
  const findMaleVoice = useCallback((voices, femaleVoiceIndex) => {
    return findVoiceByPredicate(voices, (v, index) => {
      // Không chọn cùng voice với nữ
      if (index === femaleVoiceIndex) return false;
      
      const nameLower = v.name.toLowerCase();
      // Priority 1: Explicit male marker
      if (nameLower.includes('male') || v.name.includes('M')) return true;
      // Priority 2: US English
      if (v.lang.includes('en-US')) return true;
      return false;
    });
  }, [findVoiceByPredicate]);

  // Logic load voices - tách riêng để tái sử dụng
  const loadVoices = useCallback(() => {
    try {
      const availableVoices = synthRef.current.getVoices();
      
      // Nếu chưa có voices, retry sau một chút
      if (availableVoices.length === 0 && voiceLoadAttempts.current < MAX_LOAD_ATTEMPTS) {
        voiceLoadAttempts.current++;
        setTimeout(loadVoices, LOAD_RETRY_DELAY);
        return;
      }

      const englishVoices = availableVoices.filter(v => v.lang.startsWith('en'));
      
      if (englishVoices.length === 0) {
        setError('No English voices available');
        setIsLoading(false);
        return;
      }

      setAllVoices(englishVoices);
      
      // Tìm female voice trước để tránh lấy cùng index
      const female = findFemaleVoice(englishVoices);
      const femaleIndex = englishVoices.indexOf(female);
      
      // Tìm male voice, tránh index của female
      const male = findMaleVoice(englishVoices, femaleIndex);

      setFemaleVoice(female);
      setMaleVoice(male);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading voices:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }, [findFemaleVoice, findMaleVoice]);

  // Setup event listener
  useEffect(() => {
    loadVoices();

    // Nhiều browser gọi onvoiceschanged khi voices sẵn sàng
    const handleVoicesChanged = () => {
      voiceLoadAttempts.current = 0; // Reset counter
      loadVoices();
    };

    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = handleVoicesChanged;
    }

    return () => {
      // Cleanup
      synthRef.current.cancel();
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = null;
      }
    };
  }, [loadVoices]);

  // Cập nhật voice với validation
  const updateVoice = useCallback((isMale, index) => {
    if (!allVoices[index]) {
      console.warn(`Voice at index ${index} not found`);
      return false;
    }

    try {
      if (isMale) {
        setMaleVoice(allVoices[index]);
      } else {
        setFemaleVoice(allVoices[index]);
      }
      return true;
    } catch (err) {
      console.error('Error updating voice:', err);
      return false;
    }
  }, [allVoices]);

  // Getter untuk UI - tiện hơn
  const getMaleVoiceIndex = useCallback(() => {
    return maleVoice ? allVoices.indexOf(maleVoice) : -1;
  }, [maleVoice, allVoices]);

  const getFemaleVoiceIndex = useCallback(() => {
    return femaleVoice ? allVoices.indexOf(femaleVoice) : -1;
  }, [femaleVoice, allVoices]);

  return {
    allVoices,
    maleVoice,
    femaleVoice,
    updateVoice,
    synthRef,
    isLoading,
    error,
    getMaleVoiceIndex,    // Mới
    getFemaleVoiceIndex,  // Mới
  };
};