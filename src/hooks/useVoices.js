import { useState, useEffect, useRef, useCallback } from 'react';

export const useVoices = () => {
  const [allVoices, setAllVoices] = useState([]);
  const [maleVoice, setMaleVoice] = useState(null);
  const [femaleVoice, setFemaleVoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const synthRef = useRef(null);
  const voiceLoadAttempts = useRef(0);
  const MAX_LOAD_ATTEMPTS = 15;
  const LOAD_RETRY_DELAY = 200;

  // Khởi tạo speech synthesis an toàn
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Tách logic tìm voice để tái sử dụng
  const findVoiceByPredicate = useCallback((voices, predicate) => {
    if (!Array.isArray(voices) || voices.length === 0) return null;
    return voices.find(predicate) || voices[0] || null;
  }, []);

  // Tìm voice nữ với priority rõ ràng
  const findFemaleVoice = useCallback((voices) => {
    return findVoiceByPredicate(voices, (v) => {
      if (!v || !v.name || !v.lang) return false;
      const nameLower = v.name.toLowerCase();
      
      // Priority 1: Explicit female marker
      if (nameLower.includes('female') || v.name.includes('F')) return true;
      // Priority 2: UK English
      if (v.lang.includes('en-GB')) return true;
      // Priority 3: Tên giọng nữ phổ biến
      if (nameLower.includes('zira') || nameLower.includes('hazel') || 
          nameLower.includes('samantha') || nameLower.includes('victoria')) {
        return true;
      }
      return false;
    });
  }, [findVoiceByPredicate]);

  // Tìm voice nam với priority rõ ràng
  const findMaleVoice = useCallback((voices, femaleVoiceIndex) => {
    return findVoiceByPredicate(voices, (v, index) => {
      if (!v || !v.name || !v.lang) return false;
      // Không chọn cùng voice với nữ
      if (index === femaleVoiceIndex) return false;
      
      const nameLower = v.name.toLowerCase();
      // Priority 1: Explicit male marker
      if (nameLower.includes('male') || v.name.includes('M')) return true;
      // Priority 2: US English
      if (v.lang.includes('en-US')) return true;
      // Priority 3: Tên giọng nam phổ biến
      if (nameLower.includes('david') || nameLower.includes('mark') || 
          nameLower.includes('george') || nameLower.includes('james')) {
        return true;
      }
      return false;
    });
  }, [findVoiceByPredicate]);

  // Logic load voices - tách riêng để tái sử dụng
  const loadVoices = useCallback(() => {
    try {
      if (!synthRef.current) {
        setError('Speech Synthesis không khả dụng trên trình duyệt này');
        setIsLoading(false);
        return;
      }

      const availableVoices = synthRef.current.getVoices();
      
      // Nếu chưa có voices, retry sau một chút
      if (availableVoices.length === 0 && voiceLoadAttempts.current < MAX_LOAD_ATTEMPTS) {
        voiceLoadAttempts.current++;
        setTimeout(loadVoices, LOAD_RETRY_DELAY);
        return;
      }

      if (availableVoices.length === 0) {
        setError('Không tìm thấy giọng nói trên thiết bị này');
        setIsLoading(false);
        return;
      }

      // Lọc các giọng Tiếng Anh an toàn
      const englishVoices = availableVoices.filter(v => {
        try {
          return v && v.lang && v.lang.startsWith('en');
        } catch {
          return false;
        }
      });
      
      if (englishVoices.length === 0) {
        setError('Không tìm thấy giọng Tiếng Anh');
        setIsLoading(false);
        return;
      }

      setAllVoices(englishVoices);
      
      // Tìm female voice trước để tránh lấy cùng index
      const female = findFemaleVoice(englishVoices);
      const femaleIndex = female ? englishVoices.indexOf(female) : -1;
      
      // Tìm male voice, tránh index của female
      const male = findMaleVoice(englishVoices, femaleIndex);

      setFemaleVoice(female);
      setMaleVoice(male);
      setError(null);
      setIsLoading(false);
      voiceLoadAttempts.current = 0;
    } catch (err) {
      console.error('Error loading voices:', err);
      setError('Lỗi khi tải danh sách giọng nói');
      setIsLoading(false);
    }
  }, [findFemaleVoice, findMaleVoice]);

  // Setup event listener
  useEffect(() => {
    if (!synthRef.current) return;

    loadVoices();

    // Nhiều browser gọi onvoiceschanged khi voices sẵn sàng
    const handleVoicesChanged = () => {
      voiceLoadAttempts.current = 0;
      loadVoices();
    };

    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = handleVoicesChanged;
    }

    return () => {
      // Cleanup
      try {
        if (synthRef.current && synthRef.current.speaking) {
          synthRef.current.cancel();
        }
      } catch (err) {
        console.error('Cleanup error:', err);
      }
      
      if (synthRef.current && synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = null;
      }
    };
  }, [loadVoices]);

  // Cập nhật voice với validation
  const updateVoice = useCallback((isMale, index) => {
    if (!Array.isArray(allVoices) || !allVoices[index]) {
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

  // Getter cho UI - tiện hơn
  const getMaleVoiceIndex = useCallback(() => {
    if (!maleVoice || !Array.isArray(allVoices)) return -1;
    return allVoices.findIndex(v => v && v.name === maleVoice.name && v.lang === maleVoice.lang);
  }, [maleVoice, allVoices]);

  const getFemaleVoiceIndex = useCallback(() => {
    if (!femaleVoice || !Array.isArray(allVoices)) return -1;
    return allVoices.findIndex(v => v && v.name === femaleVoice.name && v.lang === femaleVoice.lang);
  }, [femaleVoice, allVoices]);

  return {
    allVoices,
    maleVoice,
    femaleVoice,
    updateVoice,
    synthRef,
    isLoading,
    error,
    getMaleVoiceIndex,
    getFemaleVoiceIndex,
  };
};