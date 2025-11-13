import { useCallback, useRef, useEffect } from 'react';

/**
 * Advanced Voice Features Hook
 * - Text optimization
 * - Caching
 * - Error retry
 * - Performance tracking
 */
export const useAdvancedVoice = (synthRef) => {
  const cacheRef = useRef(new Map());
  const metricsRef = useRef({
    utteranceCount: 0,
    totalDuration: 0,
    errorCount: 0,
    cacheHits: 0
  });

  // ==================== TEXT OPTIMIZATION ====================
  
  const optimizeText = useCallback((text) => {
    if (!text) return '';
    
    return text
      .replace(/[^\w\s.,!?'-]/g, '') // Remove special chars
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/([.!?])\s+/g, '$1 ') // Normalize punctuation
      .trim();
  }, []);

  // Split text into chunks for better performance
  const chunkText = useCallback((text, maxLength = 200) => {
    if (!text || text.length <= maxLength) return [text];

    const chunks = [];
    let current = '';

    // Split by sentences first
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    sentences.forEach(sentence => {
      sentence = sentence.trim();
      
      if (!sentence) return;

      if ((current + sentence).length > maxLength) {
        if (current) chunks.push(current.trim());
        current = sentence;
      } else {
        current += (current ? ' ' : '') + sentence;
      }
    });

    if (current) chunks.push(current.trim());
    return chunks.length > 0 ? chunks : [text];
  }, []);

  // ==================== CACHING ====================

  const getCacheKey = useCallback((text, voiceName, options) => {
    return `${text}|${voiceName}|${JSON.stringify(options)}`;
  }, []);

  const cacheUtterance = useCallback((text, voiceName, options) => {
    const key = getCacheKey(text, voiceName, options);
    cacheRef.current.set(key, { text, voiceName, options, timestamp: Date.now() });

    // Limit cache size to 100 items
    if (cacheRef.current.size > 100) {
      const firstKey = cacheRef.current.keys().next().value;
      cacheRef.current.delete(firstKey);
    }
  }, [getCacheKey]);

  const getCachedUtterance = useCallback((text, voiceName, options) => {
    const key = getCacheKey(text, voiceName, options);
    const cached = cacheRef.current.get(key);

    if (cached) {
      metricsRef.current.cacheHits++;
      return cached;
    }

    return null;
  }, [getCacheKey]);

  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  // ==================== ERROR HANDLING & RETRY ====================

  const speakWithRetry = useCallback(async (utterance, maxRetries = 3) => {
    if (!synthRef.current) {
      throw new Error('Speech Synthesis not available');
    }

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new Error('Speech synthesis timeout'));
          }, 30000); // 30s timeout

          utterance.onend = () => {
            clearTimeout(timeoutId);
            resolve();
          };

          utterance.onerror = (event) => {
            clearTimeout(timeoutId);
            reject(new Error(`Speech error: ${event.error}`));
          };

          synthRef.current.speak(utterance);
        });
      } catch (error) {
        console.warn(`Speech attempt ${attempt + 1}/${maxRetries} failed:`, error.message);

        // Cancel and retry
        try {
          synthRef.current.cancel();
        } catch (e) {
          console.error('Error canceling speech:', e);
        }

        if (attempt === maxRetries - 1) {
          metricsRef.current.errorCount++;
          throw error;
        }

        // Exponential backoff
        await new Promise(r => setTimeout(r, 500 * Math.pow(1.5, attempt)));
      }
    }
  }, [synthRef]);

  // ==================== PERFORMANCE TRACKING ====================

  const trackUtterance = useCallback((duration, success = true) => {
    metricsRef.current.utteranceCount++;
    metricsRef.current.totalDuration += duration;
    if (!success) {
      metricsRef.current.errorCount++;
    }
  }, []);

  const getPerformanceStats = useCallback(() => {
    const { utteranceCount, totalDuration, errorCount, cacheHits } = metricsRef.current;

    return {
      utteranceCount,
      totalDuration: Math.round(totalDuration),
      errorCount,
      cacheHits,
      avgDuration: utteranceCount > 0 ? Math.round(totalDuration / utteranceCount) : 0,
      errorRate: utteranceCount > 0 ? (errorCount / utteranceCount * 100).toFixed(2) : 0,
      cacheHitRate: utteranceCount > 0 ? (cacheHits / utteranceCount * 100).toFixed(2) : 0
    };
  }, []);

  const resetMetrics = useCallback(() => {
    metricsRef.current = {
      utteranceCount: 0,
      totalDuration: 0,
      errorCount: 0,
      cacheHits: 0
    };
  }, []);

  // ==================== VOICE WARMUP ====================

  const warmupVoices = useCallback(async (voices, getSpeakerVoice) => {
    if (!synthRef.current) return;

    try {
      for (const speaker of voices) {
        const voice = getSpeakerVoice(speaker);
        if (!voice) continue;

        const utterance = new SpeechSynthesisUtterance('.');
        utterance.voice = voice;
        utterance.volume = 0;

        await new Promise(resolve => {
          utterance.onend = resolve;
          utterance.onerror = resolve;
          synthRef.current.speak(utterance);
        });

        // Small delay between warmup
        await new Promise(r => setTimeout(r, 50));
      }
    } catch (error) {
      console.warn('Voice warmup error:', error);
    }
  }, [synthRef]);

  // ==================== DETECT PERFORMANCE LEVEL ====================

  const getPerformanceLevel = useCallback(() => {
    const memory = navigator.deviceMemory || 4;
    const connection = navigator.connection?.effectiveType || '4g';

    const levels = {
      '4g': { 
        rate: 1.1, 
        pitch: 1.0, 
        chunkSize: 250,
        label: 'Optimal'
      },
      '3g': { 
        rate: 0.9, 
        pitch: 0.95, 
        chunkSize: 150,
        label: 'Good'
      },
      '2g': { 
        rate: 0.7, 
        pitch: 0.9, 
        chunkSize: 100,
        label: 'Limited'
      },
      'slow-4g': { 
        rate: 0.8, 
        pitch: 0.9, 
        chunkSize: 120,
        label: 'Slow'
      }
    };

    return levels[connection] || levels['4g'];
  }, []);

  // ==================== AUTO-OPTIMIZE SETTINGS ====================

  const autoOptimizeVoice = useCallback(() => {
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

  // ==================== CLEANUP ====================

  useEffect(() => {
    return () => {
      clearCache();
      resetMetrics();
    };
  }, [clearCache, resetMetrics]);

  return {
    // Text optimization
    optimizeText,
    chunkText,

    // Caching
    cacheUtterance,
    getCachedUtterance,
    clearCache,

    // Speech with retry
    speakWithRetry,

    // Metrics
    trackUtterance,
    getPerformanceStats,
    resetMetrics,

    // Voice warmup
    warmupVoices,

    // Performance detection
    getPerformanceLevel,
    autoOptimizeVoice
  };
};