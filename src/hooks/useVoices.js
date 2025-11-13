import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export const useVoices = () => {
  // ========== STATE ==========
  const [allVoices, setAllVoices] = useState([]);
  const [selectedMaleIndex, setSelectedMaleIndex] = useState(-1);
  const [selectedFemaleIndex, setSelectedFemaleIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ========== NEW: INDIVIDUAL SPEAKER VOICES ==========
  // Travel Agent Scenario
  const [travelAgentVoiceIndex, setTravelAgentVoiceIndex] = useState(-1);
  const [client1VoiceIndex, setClient1VoiceIndex] = useState(-1);
  const [client2VoiceIndex, setClient2VoiceIndex] = useState(-1);

  // Professor Scenario
  const [professorVoiceIndex, setProfessorVoiceIndex] = useState(-1);
  const [student1VoiceIndex, setStudent1VoiceIndex] = useState(-1);
  const [student2VoiceIndex, setStudent2VoiceIndex] = useState(-1);

  // Exam 1 Speakers
  const [markVoiceIndex, setMarkVoiceIndex] = useState(-1);
  const [sarahVoiceIndex, setSarahVoiceIndex] = useState(-1);

  // Exam 2 Speakers
  const [annaVoiceIndex, setAnnaVoiceIndex] = useState(-1);
  const [benVoiceIndex, setBenVoiceIndex] = useState(-1);

  // ========== REFS ==========
  const synthRef = useRef(null);
  const voiceLoadAttemptsRef = useRef(0);
  const loadTimeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  const MAX_LOAD_ATTEMPTS = 20;
  const LOAD_RETRY_DELAY = 150;

  // ========== SPEAKER CONFIGURATION ==========
  const SPEAKER_VOICES = useMemo(() => ({
    // Travel Agent Scenario
    'Travel Agent': {
      gender: 'male',
      index: travelAgentVoiceIndex,
      setIndex: setTravelAgentVoiceIndex,
    },
    'Client 1': {
      gender: 'male',
      index: client1VoiceIndex,
      setIndex: setClient1VoiceIndex,
    },
    'Client 2': {
      gender: 'female',
      index: client2VoiceIndex,
      setIndex: setClient2VoiceIndex,
    },

    // Professor Scenario
    'Professor': {
      gender: 'male',
      index: professorVoiceIndex,
      setIndex: setProfessorVoiceIndex,
    },
    'Student 1': {
      gender: 'male',
      index: student1VoiceIndex,
      setIndex: setStudent1VoiceIndex,
    },
    'Student 2': {
      gender: 'female',
      index: student2VoiceIndex,
      setIndex: setStudent2VoiceIndex,
    },

    // Exam 1
    'Mark': {
      gender: 'male',
      index: markVoiceIndex,
      setIndex: setMarkVoiceIndex,
    },
    'Sarah': {
      gender: 'female',
      index: sarahVoiceIndex,
      setIndex: setSarahVoiceIndex,
    },

    // Exam 2
    'Anna': {
      gender: 'female',
      index: annaVoiceIndex,
      setIndex: setAnnaVoiceIndex,
    },
    'Ben': {
      gender: 'male',
      index: benVoiceIndex,
      setIndex: setBenVoiceIndex,
    },
  }), [
    travelAgentVoiceIndex, client1VoiceIndex, client2VoiceIndex,
    professorVoiceIndex, student1VoiceIndex, student2VoiceIndex,
    markVoiceIndex, sarahVoiceIndex, annaVoiceIndex, benVoiceIndex
  ]);

  // ========== VOICE SELECTION PREDICATES ==========
  const VOICE_PREDICATES = useMemo(
    () => ({
      female: (v) => {
        if (!v?.name || !v?.lang) return false;
        const nameLower = v.name.toLowerCase();
        const lang = v.lang.toLowerCase();

        // Priority 1: Explicit female markers
        if (nameLower.includes('female') || nameLower.includes('woman')) return true;
        
        // Priority 2: Female names
        const femaleNames = [
          'zira', 'hazel', 'samantha', 'victoria', 'susan', 
          'karen', 'moira', 'kate', 'salli', 'joanna', 'aria', 'jenny'
        ];
        if (femaleNames.some(name => nameLower.includes(name))) return true;

        // Priority 3: UK/AU English thường có giọng nữ đẹp
        if (lang.includes('en-gb') || lang.includes('en-au')) return true;

        return false;
      },

      male: (v) => {
        if (!v?.name || !v?.lang) return false;
        const nameLower = v.name.toLowerCase();
        const lang = v.lang.toLowerCase();

        // Priority 1: Explicit male markers
        if (nameLower.includes('male') || nameLower.includes('man')) return true;
        
        // Priority 2: Male names
        const maleNames = [
          'david', 'mark', 'george', 'james', 'daniel', 
          'alex', 'thomas', 'matthew', 'joey', 'justin', 'ryan', 'tom'
        ];
        if (maleNames.some(name => nameLower.includes(name))) return true;

        // Priority 3: US English thường có giọng nam
        if (lang.includes('en-us')) return true;

        return false;
      },
    }),
    []
  );

  // SỬA ĐỔI: Hàm shuffle mảng để ngẫu nhiên hóa gán giọng
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // SỬA ĐỔI: Hàm gán giọng duy nhất cho từng speaker dựa trên giới tính
  const assignUniqueVoices = useCallback((filteredVoices) => {
    // Phân loại giọng theo giới tính
    const maleCandidates = filteredVoices
      .map((voice, idx) => ({ voice, idx }))
      .filter(({ voice }) => VOICE_PREDICATES.male(voice));
    const femaleCandidates = filteredVoices
      .map((voice, idx) => ({ voice, idx }))
      .filter(({ voice }) => VOICE_PREDICATES.female(voice));

    // Shuffle để đa dạng
    const shuffledMales = shuffleArray(maleCandidates);
    const shuffledFemales = shuffleArray(femaleCandidates);

    // Danh sách speaker theo giới tính
    const maleSpeakers = ['Travel Agent', 'Client 1', 'Professor', 'Student 1', 'Mark', 'Ben'];
    const femaleSpeakers = ['Client 2', 'Student 2', 'Sarah', 'Anna'];

    // Gán cho nam, ưu tiên duy nhất
    maleSpeakers.forEach((speaker, i) => {
      const availableIdx = i < shuffledMales.length ? shuffledMales[i].idx : shuffledMales[i % shuffledMales.length].idx;
      const config = SPEAKER_VOICES[speaker];
      if (config) config.setIndex(availableIdx);
    });

    // Gán cho nữ, tương tự
    femaleSpeakers.forEach((speaker, i) => {
      const availableIdx = i < shuffledFemales.length ? shuffledFemales[i].idx : shuffledFemales[i % shuffledFemales.length].idx;
      const config = SPEAKER_VOICES[speaker];
      if (config) config.setIndex(availableIdx);
    });

    // Cập nhật male/female mặc định từ speaker đầu tiên
    setSelectedMaleIndex(shuffledMales[0]?.idx ?? 0);
    setSelectedFemaleIndex(shuffledFemales[0]?.idx ?? 0);

    console.log('✅ Assigned unique voices:', {
      males: maleSpeakers.map(s => ({ speaker: s, voice: filteredVoices[SPEAKER_VOICES[s].index]?.name })),
      females: femaleSpeakers.map(s => ({ speaker: s, voice: filteredVoices[SPEAKER_VOICES[s].index]?.name })),
    });
  }, [VOICE_PREDICATES, SPEAKER_VOICES, shuffleArray]);

  // ========== INITIALIZATION ==========
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      try {
        synthRef.current.cancel();
      } catch (e) {
        console.warn('Initial cancel failed:', e);
      }
    } else {
      setError('Trình duyệt không hỗ trợ Speech Synthesis');
      setIsLoading(false);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // ========== VOICE LOADING LOGIC ==========
  const loadVoices = useCallback(() => {
    try {
      if (!synthRef.current) {
        setError('Speech Synthesis không khả dụng trên trình duyệt này');
        setIsLoading(false);
        return;
      }

      if (synthRef.current.speaking || synthRef.current.pending) {
        synthRef.current.cancel();
      }

      const availableVoices = synthRef.current.getVoices();

      if (availableVoices.length === 0) {
        if (voiceLoadAttemptsRef.current < MAX_LOAD_ATTEMPTS) {
          voiceLoadAttemptsRef.current++;
          loadTimeoutRef.current = setTimeout(loadVoices, LOAD_RETRY_DELAY);
          return;
        }
        setError('Không tìm thấy giọng nói trên thiết bị này. Vui lòng thử trình duyệt khác.');
        setIsLoading(false);
        return;
      }

      // Lọc các giọng tiếng Anh
      const filteredVoices = availableVoices.filter(v => {
        try {
          return v?.lang && v.lang.toLowerCase().startsWith('en');
        } catch {
          return false;
        }
      });

      if (filteredVoices.length === 0) {
        setError('Không tìm thấy giọng Tiếng Anh. Vui lòng cài đặt ngôn ngữ Tiếng Anh trên thiết bị.');
        setIsLoading(false);
        return;
      }

      console.log(`✅ Loaded ${filteredVoices.length} English voices`);

      if (!isMountedRef.current) return;

      setAllVoices(filteredVoices);

      // SỬA ĐỔI: Sử dụng hàm mới để gán giọng duy nhất cho từng speaker
      assignUniqueVoices(filteredVoices);

      setError(null);
      setIsLoading(false);
      voiceLoadAttemptsRef.current = 0;
    } catch (err) {
      console.error('❌ Error loading voices:', err);
      if (isMountedRef.current) {
        setError(`Lỗi khi tải giọng nói: ${err.message}`);
        setIsLoading(false);
      }
    }
  }, [assignUniqueVoices]);  // SỬA ĐỔI: Dependency mới

  // Các phần còn lại giữ nguyên (SETUP EVENT LISTENERS, VOICE GETTERS, UPDATE HANDLERS, v.v.)
  // ... (tôi rút gọn để tập trung, nhưng bạn có thể copy nguyên từ mã gốc)

  // ========== SETUP EVENT LISTENERS ==========
  useEffect(() => {
    if (!synthRef.current) return;

    loadVoices();

    const handleVoicesChanged = () => {
      console.log('🔄 Voices changed event triggered');
      voiceLoadAttemptsRef.current = 0;
      loadVoices();
    };

    if ('onvoiceschanged' in synthRef.current) {
      synthRef.current.onvoiceschanged = handleVoicesChanged;
    }
    
    if (synthRef.current.addEventListener) {
      synthRef.current.addEventListener('voiceschanged', handleVoicesChanged);
    }

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }

      try {
        if (synthRef.current?.speaking) {
          synthRef.current.cancel();
        }
      } catch (err) {
        console.error('Cleanup error:', err);
      }

      if (synthRef.current) {
        if ('onvoiceschanged' in synthRef.current) {
          synthRef.current.onvoiceschanged = null;
        }
        if (synthRef.current.removeEventListener) {
          synthRef.current.removeEventListener('voiceschanged', handleVoicesChanged);
        }
      }

      isMountedRef.current = false;
    };
  }, [loadVoices]);

  // ========== VOICE GETTERS ==========
  const maleVoice = useMemo(
    () => (selectedMaleIndex >= 0 && allVoices[selectedMaleIndex] 
      ? allVoices[selectedMaleIndex] 
      : null),
    [selectedMaleIndex, allVoices]
  );

  const femaleVoice = useMemo(
    () => (selectedFemaleIndex >= 0 && allVoices[selectedFemaleIndex]
      ? allVoices[selectedFemaleIndex]
      : null),
    [selectedFemaleIndex, allVoices]
  );

  // ========== GET SPEAKER VOICE ==========
  const getSpeakerVoice = useCallback((speaker) => {
    const config = SPEAKER_VOICES[speaker];
    if (!config || config.index < 0 || config.index >= allVoices.length) {
      return null;
    }
    return allVoices[config.index];
  }, [SPEAKER_VOICES, allVoices]);

  // ========== VOICE UPDATE HANDLERS ==========
  const updateVoiceIndex = useCallback(
    (isMale, index) => {
      if (!Array.isArray(allVoices) || index < -1 || index >= allVoices.length) {
        console.warn(`❌ Invalid voice index: ${index}, max: ${allVoices.length - 1}`);
        setError(`Chỉ số giọng nói không hợp lệ: ${index}`);
        return false;
      }

      try {
        if (synthRef.current?.speaking) {
          synthRef.current.cancel();
        }

        if (isMale) {
          setSelectedMaleIndex(index);
          console.log(`👨 Male voice updated to index ${index}: ${allVoices[index]?.name}`);
        } else {
          setSelectedFemaleIndex(index);
          console.log(`👩 Female voice updated to index ${index}: ${allVoices[index]?.name}`);
        }
        
        setError(null);
        return true;
      } catch (err) {
        console.error('❌ Error updating voice index:', err);
        setError(`Lỗi khi cập nhật giọng nói: ${err.message}`);
        return false;
      }
    },
    [allVoices]
  );

  // ========== UPDATE INDIVIDUAL SPEAKER VOICE ==========
  const updateSpeakerVoice = useCallback((speaker, voiceIndex) => {
    if (!Array.isArray(allVoices) || voiceIndex < -1 || voiceIndex >= allVoices.length) {
      console.warn(`❌ Invalid voice index for ${speaker}: ${voiceIndex}`);
      setError(`Chỉ số giọng nói không hợp lệ cho ${speaker}`);
      return false;
    }

    try {
      if (synthRef.current?.speaking) {
        synthRef.current.cancel();
      }

      const config = SPEAKER_VOICES[speaker];
      if (!config) {
        console.warn(`❌ Unknown speaker: ${speaker}`);
        return false;
      }

      config.setIndex(voiceIndex);
      console.log(`👤 ${speaker} voice updated to index ${voiceIndex}: ${allVoices[voiceIndex]?.name}`);
      setError(null);
      return true;
    } catch (err) {
      console.error(`❌ Error updating ${speaker} voice:`, err);
      setError(`Lỗi khi cập nhật giọng nói cho ${speaker}: ${err.message}`);
      return false;
    }
  }, [allVoices, SPEAKER_VOICES]);

  // Legacy API support
  const updateVoice = useCallback(
    (isMale, index, speaker = null) => {
      if (speaker && SPEAKER_VOICES[speaker]) {
        return updateSpeakerVoice(speaker, index);
      }
      return updateVoiceIndex(isMale, index);
    },
    [updateVoiceIndex, updateSpeakerVoice, SPEAKER_VOICES]
  );

  // ========== FORCE RELOAD VOICES ==========
  const reloadVoices = useCallback(() => {
    console.log('🔄 Force reloading voices...');
    voiceLoadAttemptsRef.current = 0;
    setIsLoading(true);
    setError(null);
    loadVoices();
  }, [loadVoices]);

  // ========== GET SPEAKER VOICE INDEX ==========
  const getSpeakerVoiceIndex = useCallback((speaker) => {
    const config = SPEAKER_VOICES[speaker];
    return config ? config.index : -1;
  }, [SPEAKER_VOICES]);

  // ========== RETURN PUBLIC API ==========
  return {
    // Voice data
    allVoices,
    maleVoice,
    femaleVoice,
    
    // Voice indices
    selectedMaleIndex,
    selectedFemaleIndex,

    // ========== NEW: INDIVIDUAL SPEAKER VOICES ==========
    // Travel Agent
    travelAgentVoiceIndex,
    client1VoiceIndex,
    client2VoiceIndex,

    // Professor
    professorVoiceIndex,
    student1VoiceIndex,
    student2VoiceIndex,

    // Exam 1
    markVoiceIndex,
    sarahVoiceIndex,

    // Exam 2
    annaVoiceIndex,
    benVoiceIndex,

    // Speaker configuration
    SPEAKER_VOICES,

    // Update functions
    updateVoice, // Legacy
    updateVoiceIndex, // For male/female
    updateSpeakerVoice, // NEW: Update individual speaker
    getSpeakerVoice, // NEW: Get voice object for speaker
    getSpeakerVoiceIndex, // NEW: Get voice index for speaker
    reloadVoices,
    
    // Refs
    synthRef,
    
    // Status
    isLoading,
    error,
    
    // Voice info
    voiceInfo: {
      total: allVoices.length,
      male: maleVoice?.name || 'Not selected',
      female: femaleVoice?.name || 'Not selected',
      speakers: {
        'Travel Agent': allVoices[travelAgentVoiceIndex]?.name || 'Not selected',
        'Client 1': allVoices[client1VoiceIndex]?.name || 'Not selected',
        'Client 2': allVoices[client2VoiceIndex]?.name || 'Not selected',
        'Professor': allVoices[professorVoiceIndex]?.name || 'Not selected',
        'Student 1': allVoices[student1VoiceIndex]?.name || 'Not selected',
        'Student 2': allVoices[student2VoiceIndex]?.name || 'Not selected',
        'Mark': allVoices[markVoiceIndex]?.name || 'Not selected',
        'Sarah': allVoices[sarahVoiceIndex]?.name || 'Not selected',
        'Anna': allVoices[annaVoiceIndex]?.name || 'Not selected',
        'Ben': allVoices[benVoiceIndex]?.name || 'Not selected',
      }
    }
  };
};