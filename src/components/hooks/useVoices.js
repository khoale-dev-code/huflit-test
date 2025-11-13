import { useState, useCallback, useRef, useEffect } from 'react';
import { VOICE_CONFIG } from '../../config/voiceConfig';
import { 
  VOICE_EMOTIONS, 
  detectEmotionFromText,
  getFinalVoiceParams,
  cleanTextMarkers
} from '../../config/voiceExpression';

const VOICE_CACHE = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const VOICE_WARMUP_CACHE = new Set();
const EXPRESSION_CACHE = new Map();

export const useVoices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enableExpression, setEnableExpression] = useState(true);
  const [globalEmotion, setGlobalEmotion] = useState('NEUTRAL');
  
  const synthRef = useRef(null);
  const [allVoices, setAllVoices] = useState([]);
  const voicesLoadedRef = useRef(false);
  const cacheTimerRef = useRef(null);
  
  const performanceMetricsRef = useRef({
    voiceLoadTime: 0,
    speakAttempts: 0,
    successCount: 0,
    errorCount: 0,
    emotionsUsed: {},
    emphasisCount: 0
  });

  // Initialize synth safely
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // ==================== VOICE SELECTION ====================

  const getSpeakerVoice = useCallback((speaker) => {
    if (!speaker || allVoices.length === 0) return null;

    // Check cache first
    if (VOICE_CACHE.has(speaker)) {
      const cached = VOICE_CACHE.get(speaker);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.voice;
      }
      VOICE_CACHE.delete(speaker);
    }

    const isFemale = VOICE_CONFIG.FEMALE_SPEAKERS.some(name => speaker.includes(name));
    const isMale = VOICE_CONFIG.MALE_SPEAKERS.some(name => speaker.includes(name));

    let voice = null;

    if (isFemale) {
      voice = allVoices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman')) 
        || allVoices.find(v => !v.name.toLowerCase().includes('male')) 
        || allVoices[0];
    } else if (isMale) {
      voice = allVoices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('man')) 
        || allVoices.find(v => !v.name.toLowerCase().includes('female')) 
        || allVoices[0];
    } else {
      voice = allVoices[0];
    }

    // Cache voice
    if (voice) {
      VOICE_CACHE.set(speaker, { voice, timestamp: Date.now() });
    }

    return voice;
  }, [allVoices]);

  const reloadVoices = useCallback(() => {
    if (!synthRef.current) {
      setError("Speech Synthesis not available in this browser");
      setIsLoading(false);
      return;
    }

    try {
      const startTime = performance.now();
      const voices = synthRef.current.getVoices().filter(v => v.lang.startsWith('en'));
      
      performanceMetricsRef.current.voiceLoadTime = performance.now() - startTime;

      if (voices.length === 0) {
        setError("No voices available. Check browser settings.");
        setAllVoices([]);
      } else {
        setAllVoices(voices);
        setError(null);
        voicesLoadedRef.current = true;
      }
    } catch (err) {
      console.error('Error loading voices:', err);
      setError("Failed to load voices: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ==================== VOICE EXPRESSION ====================

  /**
   * Extract emotion marker từ text
   * Example: "{HAPPY} Great job!" -> emotion = HAPPY
   */
  const extractEmotionFromText = useCallback((text) => {
    const match = text.match(/^\{([A-Z_]+)\}\s*/);
    if (match && VOICE_EMOTIONS[match[1]]) {
      return {
        emotion: VOICE_EMOTIONS[match[1]],
        cleanText: text.replace(/^\{[A-Z_]+\}\s*/, '')
      };
    }
    return {
      emotion: null,
      cleanText: text
    };
  }, []);

  /**
   * Apply voice expression to text
   */
  const applyVoiceExpression = useCallback((text, baseParams) => {
    if (!enableExpression) {
      return {
        params: baseParams,
        text: text,
        emotion: 'NEUTRAL',
        hasEmphasis: false
      };
    }

    const cacheKey = `${text}|${JSON.stringify(baseParams)}|${globalEmotion}`;

    // Check cache
    if (EXPRESSION_CACHE.has(cacheKey)) {
      return EXPRESSION_CACHE.get(cacheKey);
    }

    // Extract emotion marker from text
    const { emotion: markerEmotion, cleanText } = extractEmotionFromText(text);

    // Determine final emotion (marker > global > detected)
    let finalEmotion = markerEmotion;
    if (!finalEmotion && globalEmotion !== 'NEUTRAL') {
      finalEmotion = VOICE_EMOTIONS[globalEmotion];
    }
    if (!finalEmotion) {
      finalEmotion = detectEmotionFromText(cleanText);
    }

    // Get final parameters with all effects
    const finalParams = getFinalVoiceParams(baseParams, cleanText, finalEmotion);

    // Check if text has emphasis markers
    const hasEmphasis = /\*[^*]+\*|_[^_]+_|\[[^\]]+\]|[A-Z]{2,}/.test(cleanText);

    const result = {
      params: finalParams,
      text: cleanTextMarkers(cleanText),
      emotion: finalEmotion?.label || 'Neutral',
      hasEmphasis
    };

    // Cache result
    EXPRESSION_CACHE.set(cacheKey, result);

    // Limit cache size
    if (EXPRESSION_CACHE.size > 100) {
      const firstKey = EXPRESSION_CACHE.keys().next().value;
      EXPRESSION_CACHE.delete(firstKey);
    }

    return result;
  }, [enableExpression, globalEmotion, extractEmotionFromText]);

  /**
   * Create utterance with voice expression
   */
  const createExpressiveUtterance = useCallback((text, speaker, baseParams = null) => {
    const voice = getSpeakerVoice(speaker);
    if (!voice) return null;

    // Get speaker config or default
    const speakerConfig = VOICE_CONFIG.SPEAKER_CONFIG[speaker] || VOICE_CONFIG.SPEAKER_CONFIG.default;
    const params = baseParams || speakerConfig;

    // Apply expression
    const expressionResult = applyVoiceExpression(text, params);

    // Track metrics
    performanceMetricsRef.current.emotionsUsed[expressionResult.emotion] = 
      (performanceMetricsRef.current.emotionsUsed[expressionResult.emotion] || 0) + 1;
    if (expressionResult.hasEmphasis) {
      performanceMetricsRef.current.emphasisCount++;
    }

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(expressionResult.text);
    utterance.voice = voice;
    utterance.rate = expressionResult.params.rate;
    utterance.pitch = expressionResult.params.pitch;
    utterance.volume = expressionResult.params.volume;
    utterance.lang = voice.lang || 'en-US';

    return {
      utterance,
      metadata: {
        emotion: expressionResult.emotion,
        hasEmphasis: expressionResult.hasEmphasis,
        originalText: text,
        cleanText: expressionResult.text
      }
    };
  }, [getSpeakerVoice, applyVoiceExpression]);

  // ==================== VOICE WARMUP ====================
  
  const warmupVoice = useCallback(async (speaker) => {
    if (!synthRef.current || !speaker) return false;

    if (VOICE_WARMUP_CACHE.has(speaker)) {
      return true;
    }

    try {
      const voice = getSpeakerVoice(speaker);
      if (!voice) return false;

      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance('.');
        utterance.voice = voice;
        utterance.volume = 0;
        utterance.rate = 2;

        const timeoutId = setTimeout(() => {
          synthRef.current.cancel();
          resolve(false);
        }, 3000);

        utterance.onend = () => {
          clearTimeout(timeoutId);
          VOICE_WARMUP_CACHE.add(speaker);
          resolve(true);
        };

        utterance.onerror = () => {
          clearTimeout(timeoutId);
          resolve(false);
        };

        synthRef.current.speak(utterance);
      });
    } catch (err) {
      console.warn(`Warmup error for ${speaker}:`, err);
      return false;
    }
  }, [getSpeakerVoice, synthRef]);

  const warmupVoices = useCallback(async (speakers = []) => {
    if (!synthRef.current || speakers.length === 0) return;

    try {
      for (const speaker of speakers) {
        await warmupVoice(speaker);
        await new Promise(r => setTimeout(r, 100));
      }
    } catch (err) {
      console.warn('Batch warmup error:', err);
    }
  }, [warmupVoice, synthRef]);

  // ==================== SPEECH CONTROL ====================

  const pauseAllSpeech = useCallback(() => {
    if (!synthRef.current) return;
    
    try {
      if (synthRef.current.speaking) {
        synthRef.current.pause();
      }
    } catch (err) {
      console.error('Error pausing speech:', err);
    }
  }, []);

  const resumeSpeech = useCallback(() => {
    if (!synthRef.current) return;
    
    try {
      if (synthRef.current.paused) {
        synthRef.current.resume();
      }
    } catch (err) {
      console.error('Error resuming speech:', err);
    }
  }, []);

  const cancelAllSpeech = useCallback(() => {
    if (!synthRef.current) return;

    try {
      synthRef.current.cancel();
    } catch (err) {
      console.error('Error canceling speech:', err);
    }
  }, []);

  // ==================== PERFORMANCE DETECTION ====================

  const getPerformanceLevel = useCallback(() => {
    const memory = navigator.deviceMemory || 4;
    const connection = navigator.connection?.effectiveType || '4g';

    const levels = {
      '4g': { 
        rate: 1.1, 
        pitch: 1.0, 
        chunkSize: 250,
        warmupEnabled: true,
        cacheEnabled: true,
        label: 'Optimal'
      },
      '3g': { 
        rate: 0.9, 
        pitch: 0.95, 
        chunkSize: 150,
        warmupEnabled: true,
        cacheEnabled: true,
        label: 'Good'
      },
      '2g': { 
        rate: 0.7, 
        pitch: 0.9, 
        chunkSize: 100,
        warmupEnabled: false,
        cacheEnabled: true,
        label: 'Limited'
      },
      'slow-4g': { 
        rate: 0.8, 
        pitch: 0.9, 
        chunkSize: 120,
        warmupEnabled: false,
        cacheEnabled: true,
        label: 'Slow'
      }
    };

    return levels[connection] || levels['4g'];
  }, []);

  const autoOptimizeSettings = useCallback(() => {
    const quality = {
      HIGH: { pitch: 1.0, rate: 0.95, volume: 1.0 },
      MEDIUM: { pitch: 0.95, rate: 0.85, volume: 0.95 },
      LOW: { pitch: 0.9, rate: 0.75, volume: 0.9 }
    };

    try {
      const memUsage = performance.memory?.usedJSHeapSize || 0;
      const totalMemory = performance.memory?.jsHeapSizeLimit || 1;
      const usagePercent = memUsage / totalMemory;

      if (usagePercent > 0.8) return quality.LOW;
      if (usagePercent > 0.5) return quality.MEDIUM;
      return quality.HIGH;
    } catch (error) {
      return quality.HIGH;
    }
  }, []);

  // ==================== CACHE & METRICS ====================

  const clearVoiceCache = useCallback(() => {
    VOICE_CACHE.clear();
    VOICE_WARMUP_CACHE.clear();
    EXPRESSION_CACHE.clear();
  }, []);

  const getVoiceMetrics = useCallback(() => {
    const { voiceLoadTime, speakAttempts, successCount, errorCount, emotionsUsed, emphasisCount } = performanceMetricsRef.current;
    
    const dominantEmotion = Object.entries(emotionsUsed)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'Neutral';
    
    return {
      voiceLoadTime: Math.round(voiceLoadTime),
      speakAttempts,
      successCount,
      errorCount,
      successRate: speakAttempts > 0 ? ((successCount / speakAttempts) * 100).toFixed(2) : 0,
      cachedVoices: VOICE_CACHE.size,
      warmedUpVoices: VOICE_WARMUP_CACHE.size,
      // Expression metrics
      emotionsUsed,
      emphasisCount,
      emphasisRate: speakAttempts > 0 ? ((emphasisCount / speakAttempts) * 100).toFixed(2) : 0,
      dominantEmotion,
      expressionCacheSize: EXPRESSION_CACHE.size
    };
  }, []);

  const resetMetrics = useCallback(() => {
    performanceMetricsRef.current = {
      voiceLoadTime: 0,
      speakAttempts: 0,
      successCount: 0,
      errorCount: 0,
      emotionsUsed: {},
      emphasisCount: 0
    };
  }, []);

  const trackSpeechAttempt = useCallback((success = true) => {
    performanceMetricsRef.current.speakAttempts++;
    if (success) {
      performanceMetricsRef.current.successCount++;
    } else {
      performanceMetricsRef.current.errorCount++;
    }
  }, []);

  // ==================== ERROR RECOVERY ====================

  const speakWithRetry = useCallback(async (utterance, maxRetries = 3) => {
    if (!synthRef.current) {
      throw new Error('Speech Synthesis not available');
    }

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            synthRef.current.cancel();
            reject(new Error('Speech synthesis timeout'));
          }, 30000);

          utterance.onend = () => {
            clearTimeout(timeoutId);
            trackSpeechAttempt(true);
            resolve();
          };

          utterance.onerror = (event) => {
            clearTimeout(timeoutId);
            reject(new Error(`Speech error: ${event.error}`));
          };

          synthRef.current.speak(utterance);
        });
      } catch (error) {
        console.warn(`Speech attempt ${attempt + 1}/${maxRetries}:`, error.message);
        trackSpeechAttempt(false);

        try {
          synthRef.current.cancel();
        } catch (e) {
          console.error('Error during retry cleanup:', e);
        }

        if (attempt === maxRetries - 1) {
          throw error;
        }

        await new Promise(r => setTimeout(r, 500 * Math.pow(1.5, attempt)));
      }
    }
  }, [synthRef, trackSpeechAttempt]);

  // ==================== VOICE EXPRESSION UTILITIES ====================

  const getAvailableEmotions = useCallback(() => {
    return Object.entries(VOICE_EMOTIONS).map(([key, emotion]) => ({
      key,
      ...emotion
    }));
  }, []);

  const analyzeSuggestions = useCallback((text) => {
    const suggestions = [];

    if (/[A-Z]{2,}/.test(text)) {
      suggestions.push('Found uppercase - will add emphasis');
    }

    if (/!/.test(text)) {
      suggestions.push('Exclamation mark - will raise pitch');
    }

    if (/\?/.test(text)) {
      suggestions.push('Question mark - will adjust intonation');
    }

    if (/\.{2,}|…/.test(text)) {
      suggestions.push('Ellipsis - will slow down');
    }

    const emotion = detectEmotionFromText(text);
    if (emotion !== VOICE_EMOTIONS.NEUTRAL) {
      suggestions.push(`Detected emotion: ${emotion.label}`);
    }

    return suggestions;
  }, []);

  // Load voices on mount
  useEffect(() => {
    if (!synthRef.current) return;

    setIsLoading(true);

    if (synthRef.current.getVoices().length > 0) {
      reloadVoices();
    } else {
      const handleVoicesChanged = () => {
        reloadVoices();
      };

      synthRef.current.addEventListener('voiceschanged', handleVoicesChanged);

      const timeoutId = setTimeout(() => {
        if (!voicesLoadedRef.current) {
          reloadVoices();
        }
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
        if (synthRef.current) {
          synthRef.current.removeEventListener('voiceschanged', handleVoicesChanged);
        }
      };
    }
  }, [reloadVoices]);

  // Setup cache cleanup on unmount
  useEffect(() => {
    return () => {
      clearVoiceCache();
      cancelAllSpeech();
      if (cacheTimerRef.current) {
        clearTimeout(cacheTimerRef.current);
      }
    };
  }, [clearVoiceCache, cancelAllSpeech]);

  return {
    // Voices & Access
    allVoices,
    getSpeakerVoice,
    synthRef,
    
    // Loading & Errors
    isLoading,
    error,
    reloadVoices,
    
    // Speech Control
    pauseAllSpeech,
    resumeSpeech,
    cancelAllSpeech,
    
    // Voice Warmup
    warmupVoice,
    warmupVoices,
    
    // Performance & Optimization
    getPerformanceLevel,
    autoOptimizeSettings,
    
    // Metrics & Tracking
    getVoiceMetrics,
    trackSpeechAttempt,
    resetMetrics,
    
    // Error Recovery
    speakWithRetry,
    
    // Cache Management
    clearVoiceCache,
    getVoiceCacheSize: () => VOICE_CACHE.size,
    getWarmedUpVoicesCount: () => VOICE_WARMUP_CACHE.size,
    
    // ===== VOICE EXPRESSION =====
    enableExpression,
    setEnableExpression,
    globalEmotion,
    setGlobalEmotion,
    
    // Expression Functions
    applyVoiceExpression,
    createExpressiveUtterance,
    extractEmotionFromText,
    
    // Expression Utilities
    getAvailableEmotions,
    analyzeSuggestions,
    
    // Expression Constants
    VOICE_EMOTIONS
  };
};