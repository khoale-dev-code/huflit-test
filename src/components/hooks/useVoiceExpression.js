import { useCallback, useMemo, useRef, useEffect } from 'react';
import {
  VOICE_EMOTIONS,
  EMPHASIS_PATTERNS,
  PAUSE_PATTERNS,
  detectEmotionFromText,
  getFinalVoiceParams,
  cleanTextMarkers,
  addPausesToText,
  extractEmotionMarker as extractEmotionMarkerConfig,
  extractStressWords,
  validateVoiceParams,
  debugEmotionDetection,
  getCacheStats
} from '../config/voiceExpression';

/**
 * ✨ OPTIMIZED: useVoiceExpression Hook
 * Cải thiện: performance, memory management, type safety, debugging
 */
export const useVoiceExpression = (enableDebug = false) => {
  const expressionCacheRef = useRef(new Map());
  const utteranceCacheRef = useRef(new Map());
  const maxCacheSize = 150; // ✅ IMPROVEMENT: Configurable cache size

  // ==================== 1. PERFORMANCE IMPROVEMENTS ====================

  /**
   * ✅ IMPROVEMENT: Memoize emotions để tránh recompute
   */
  const memoizedEmotions = useMemo(() => {
    return Object.entries(VOICE_EMOTIONS).map(([key, emotion]) => ({
      key,
      ...emotion
    }));
  }, []);

  /**
   * ✅ IMPROVEMENT: Memoize emphasis patterns
   */
  const memoizedPatterns = useMemo(() => {
    return Object.entries(EMPHASIS_PATTERNS).map(([key, pattern]) => ({
      key,
      ...pattern
    }));
  }, []);

  // ==================== 2. CACHE MANAGEMENT ====================

  /**
   * ✅ NEW: LRU Cache implementation (Least Recently Used)
   * Tránh memory leak từ unlimited cache growth
   */
  const addToCache = useCallback((cacheRef, key, value) => {
    // Remove oldest if at capacity
    if (cacheRef.current.size >= maxCacheSize) {
      const firstKey = cacheRef.current.keys().next().value;
      cacheRef.current.delete(firstKey);
    }
    cacheRef.current.set(key, value);
  }, [maxCacheSize]);

  /**
   * ✅ NEW: Get from cache with LRU (move to end = most recently used)
   */
  const getFromCache = useCallback((cacheRef, key) => {
    if (!cacheRef.current.has(key)) return null;
    
    const value = cacheRef.current.get(key);
    // Move to end (most recently used)
    cacheRef.current.delete(key);
    cacheRef.current.set(key, value);
    return value;
  }, []);

  /**
   * ✅ NEW: Clear all caches
   */
  const clearAllCaches = useCallback(() => {
    expressionCacheRef.current.clear();
    utteranceCacheRef.current.clear();
    if (enableDebug) console.log('✅ All caches cleared');
  }, [enableDebug]);

  /**
   * ✅ NEW: Get cache statistics
   */
  const getCacheInfo = useCallback(() => {
    return {
      expressionCache: expressionCacheRef.current.size,
      utteranceCache: utteranceCacheRef.current.size,
      totalCached: expressionCacheRef.current.size + utteranceCacheRef.current.size,
      estimatedMemory: `~${(expressionCacheRef.current.size * 0.3 + utteranceCacheRef.current.size * 0.5).toFixed(1)}KB`
    };
  }, []);

  // ==================== 3. CORE FUNCTIONS ====================

  /**
   * ✅ IMPROVED: Extract emotion marker (use config version)
   */
  const extractEmotionMarker = useCallback((text) => {
    if (!text || typeof text !== 'string') {
      return { emotion: null, cleanText: text };
    }
    return extractEmotionMarkerConfig(text);
  }, []);

  /**
   * ✅ IMPROVED: Apply voice expression with better caching
   */
  const applyVoiceExpression = useCallback((text, baseParams, options = {}) => {
    if (!text || !baseParams) {
      return { params: baseParams, text: '', emotion: 'Neutral', hasEmphasis: false };
    }

    // ✅ IMPROVEMENT: Simple cache key (avoid JSON.stringify overhead)
    const cacheKey = `${text}|${baseParams.rate}|${baseParams.pitch}|${baseParams.volume}`;
    
    // Check cache with LRU
    const cached = getFromCache(expressionCacheRef, cacheKey);
    if (cached) return cached;

    // Extract emotion marker
    const { emotion, cleanText } = extractEmotionMarker(text);

    // Get final voice parameters
    const finalParams = getFinalVoiceParams(baseParams, cleanText, emotion);

    // ✅ IMPROVEMENT: Validate params
    const { valid, issues } = validateVoiceParams(finalParams);
    if (!valid && enableDebug) {
      console.warn('⚠️ Voice params invalid:', issues);
    }

    // Check for emphasis patterns
    const hasEmphasis = memoizedPatterns.some(p => p.pattern.test(cleanText));

    const result = {
      params: finalParams,
      text: cleanTextMarkers(cleanText),
      emotion: emotion?.label || 'Neutral',
      hasEmphasis,
      stressWords: options.includeStress ? extractStressWords(cleanText) : [],
      valid
    };

    // Add to cache with LRU
    addToCache(expressionCacheRef, cacheKey, result);

    return result;
  }, [getFromCache, extractEmotionMarker, memoizedPatterns, addToCache, enableDebug]);

  /**
   * ✅ IMPROVED: Create utterance with better error handling
   */
  const createExpressionUtterance = useCallback((text, baseParams, voice, options = {}) => {
    if (!text || !baseParams) {
      console.error('❌ Missing required params for utterance creation');
      return null;
    }

    // Check cache
    const cacheKey = `${text}|${voice?.name || 'default'}`;
    const cached = getFromCache(utteranceCacheRef, cacheKey);
    if (cached) return cached;

    // Apply expression
    const { params, text: cleanText } = applyVoiceExpression(text, baseParams, options);

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.voice = voice;
      utterance.rate = params.rate;
      utterance.pitch = params.pitch;
      utterance.volume = params.volume;
      utterance.lang = voice?.lang || options.lang || 'en-US';

      // ✅ IMPROVEMENT: Add event listeners for debugging
      if (enableDebug) {
        utterance.onstart = () => console.log('🔊 Speech started:', text);
        utterance.onend = () => console.log('✅ Speech ended');
        utterance.onerror = (e) => console.error('❌ Speech error:', e);
      }

      // Cache it
      addToCache(utteranceCacheRef, cacheKey, utterance);

      return utterance;
    } catch (error) {
      console.error('❌ Failed to create utterance:', error);
      return null;
    }
  }, [applyVoiceExpression, getFromCache, addToCache, enableDebug]);

  /**
   * ✅ IMPROVED: Break text by expression with validation
   */
  const breakTextByExpression = useCallback((text) => {
    if (!text || typeof text !== 'string') return [];

    const chunks = text.split(/(?=\{[A-Z_]+\})/);

    return chunks
      .filter(chunk => chunk.trim())
      .map((chunk, index) => {
        const { emotion, cleanText } = extractEmotionMarker(chunk);
        return {
          index,
          text: cleanText.trim(),
          emotion: emotion?.label || 'Neutral',
          hasMarker: !!emotion,
          length: cleanText.trim().length
        };
      });
  }, [extractEmotionMarker]);

  /**
   * ✅ IMPROVED: Analyze suggestions with more details
   */
  const analyzeSuggestions = useCallback((text) => {
    if (!text || typeof text !== 'string') return [];

    const suggestions = [];

    // ✅ IMPROVEMENT: Pre-compiled regex test
    if (/[A-Z]{2,}/.test(text)) {
      suggestions.push({ type: 'emphasis', message: 'Uppercase found - will add emphasis' });
    }

    if (/!/.test(text)) {
      suggestions.push({ type: 'exclamation', message: 'Exclamation - will raise pitch' });
    }

    if (/\?/.test(text)) {
      suggestions.push({ type: 'question', message: 'Question mark - will adjust intonation' });
    }

    if (/\.{2,}|…/.test(text)) {
      suggestions.push({ type: 'pause', message: 'Ellipsis detected - will slow down' });
    }

    // Emotion detection
    const emotion = detectEmotionFromText(text);
    if (emotion !== VOICE_EMOTIONS.NEUTRAL) {
      suggestions.push({ 
        type: 'emotion', 
        message: `Emotion detected: ${emotion.label}`,
        details: emotion
      });
    }

    // ✅ NEW: Stress words detection
    const stressWords = extractStressWords(text);
    if (stressWords.length > 0) {
      suggestions.push({
        type: 'stress',
        message: `${stressWords.length} stress word(s): ${stressWords.join(', ')}`
      });
    }

    return suggestions;
  }, []);

  /**
   * ✅ NEW: Detailed debug analysis
   */
  const debugTextExpression = useCallback((text) => {
    if (!enableDebug) {
      console.warn('⚠️ Debug mode not enabled. Pass enableDebug=true');
      return null;
    }

    return debugEmotionDetection(text);
  }, [enableDebug]);

  /**
   * ✅ IMPROVED: Get expression stats with memory info
   */
  const getExpressionStats = useCallback(() => {
    return {
      cacheInfo: getCacheInfo(),
      emotionCount: Object.keys(VOICE_EMOTIONS).length,
      patternCount: Object.keys(EMPHASIS_PATTERNS).length,
      pauseTypes: Object.keys(PAUSE_PATTERNS),
      memoizedEmotions: memoizedEmotions.length,
      memoizedPatterns: memoizedPatterns.length
    };
  }, [getCacheInfo, memoizedEmotions, memoizedPatterns]);

  /**
   * ✅ NEW: Batch process multiple texts efficiently
   */
  const batchApplyVoiceExpression = useCallback((texts, baseParams, options = {}) => {
    if (!Array.isArray(texts)) return [];

    return texts.map((text, index) => ({
      index,
      originalText: text,
      result: applyVoiceExpression(text, baseParams, options)
    }));
  }, [applyVoiceExpression]);

  /**
   * ✅ NEW: Get available voices (with caching)
   */
  const getAvailableVoices = useMemo(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      return window.speechSynthesis.getVoices();
    }
    return [];
  }, []);

  // ==================== 4. LIFECYCLE MANAGEMENT ====================

  /**
   * ✅ NEW: Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      clearAllCaches();
    };
  }, [clearAllCaches]);

  /**
   * ✅ NEW: Optional cache size warning
   */
  useEffect(() => {
    if (!enableDebug) return;

    const interval = setInterval(() => {
      const { totalCached } = getCacheInfo();
      if (totalCached > maxCacheSize * 0.8) {
        console.warn(`⚠️ Cache approaching limit: ${totalCached}/${maxCacheSize}`);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [enableDebug, maxCacheSize, getCacheInfo]);

  // ==================== RETURN ====================

  return {
    // Core functions
    applyVoiceExpression,
    createExpressionUtterance,
    extractEmotionMarker,
    
    // Text processing
    breakTextByExpression,
    batchApplyVoiceExpression,

    // Analysis & suggestions
    analyzeSuggestions,
    debugTextExpression,

    // Information
    getExpressionStats,
    getCacheInfo,
    getAvailableVoices,
    getAvailableEmotions: useCallback(() => memoizedEmotions, [memoizedEmotions]),

    // Cache management
    clearAllCaches,

    // Constants (memoized)
    VOICE_EMOTIONS,
    EMPHASIS_PATTERNS: memoizedPatterns,
    PAUSE_PATTERNS
  };
};

// ==================== USAGE EXAMPLES ====================

/**
 * 📝 Basic Usage:
 * 
 * const { applyVoiceExpression, createExpressionUtterance } = useVoiceExpression();
 * 
 * const result = applyVoiceExpression("{EXCITED} Wow!", baseParams);
 * console.log(result); // { params, text, emotion, hasEmphasis, valid }
 * 
 * const utterance = createExpressionUtterance("{HAPPY} Great!", baseParams, voice);
 * window.speechSynthesis.speak(utterance);
 */

/**
 * 📝 Debug Mode:
 * 
 * const { debugTextExpression, getCacheInfo } = useVoiceExpression(true);
 * 
 * console.log(debugTextExpression("{ANGRY} This is terrible!"));
 * console.log(getCacheInfo()); // { expressionCache: X, utteranceCache: Y, ... }
 */

/**
 * 📝 Batch Processing:
 * 
 * const { batchApplyVoiceExpression } = useVoiceExpression();
 * 
 * const texts = ["{HAPPY} Great!", "{SAD} Oh no...", "Normal text"];
 * const results = batchApplyVoiceExpression(texts, baseParams);
 * results.forEach(({ originalText, result }) => {
 *   console.log(`${originalText} -> ${result.emotion}`);
 * });
 */

/**
 * 📝 Advanced: Multiple utterances with cleanup:
 * 
 * const { createExpressionUtterance, clearAllCaches } = useVoiceExpression(true);
 * 
 * try {
 *   const u1 = createExpressionUtterance("First", baseParams, voice);
 *   const u2 = createExpressionUtterance("Second", baseParams, voice);
 *   window.speechSynthesis.speak(u1);
 *   // ...
 * } finally {
 *   clearAllCaches();
 * }
 */