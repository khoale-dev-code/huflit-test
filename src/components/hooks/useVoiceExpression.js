import { useCallback, useMemo, useRef } from 'react';
import {
  VOICE_EMOTIONS,
  EMPHASIS_PATTERNS,
  PAUSE_PATTERNS,
  detectEmotionFromText,
  getFinalVoiceParams,
  cleanTextMarkers,
  addPausesToText
} from '../config/voiceExpression';

/**
 * Hook để xử lý voice expression và emphasis
 */
export const useVoiceExpression = () => {
  const expressionCacheRef = useRef(new Map());

  /**
   * Get text with natural pauses
   */
  const addNaturalPauses = useCallback((text) => {
    // Thêm ngắt giọng tự nhiên sau dấu câu
    return text
      .replace(/([.!?])\s+/g, '$1\u0020') // Pause sau câu kết thúc
      .replace(/,\s+/g, ',\u0020')         // Pause ngắn sau dấu phẩy
      .replace(/;\s+/g, ';\u0020');        // Pause vừa sau dấu chấm phẩy
  }, []);

  /**
   * Extract emotion markers từ text
   * Ví dụ: "{HAPPY} Great job!" -> emotion = HAPPY
   */
  const extractEmotionMarker = useCallback((text) => {
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
   * Apply voice expression parameters
   * Input: text, baseParams
   * Output: enhanced voice parameters
   */
  const applyVoiceExpression = useCallback((text, baseParams) => {
    const cacheKey = `${text}|${JSON.stringify(baseParams)}`;

    // Check cache
    if (expressionCacheRef.current.has(cacheKey)) {
      return expressionCacheRef.current.get(cacheKey);
    }

    // Extract emotion marker
    const { emotion, cleanText } = extractEmotionMarker(text);

    // Get final voice parameters with emphasis
    const finalParams = getFinalVoiceParams(baseParams, cleanText, emotion);

    // Store in cache
    const result = {
      params: finalParams,
      text: cleanTextMarkers(cleanText),
      emotion: emotion?.label || 'Neutral',
      hasEmphasis: EMPHASIS_PATTERNS.some(p => p.test(cleanText))
    };

    expressionCacheRef.current.set(cacheKey, result);

    // Limit cache size
    if (expressionCacheRef.current.size > 100) {
      const firstKey = expressionCacheRef.current.keys().next().value;
      expressionCacheRef.current.delete(firstKey);
    }

    return result;
  }, [extractEmotionMarker]);

  /**
   * Get all available emotions
   */
  const getAvailableEmotions = useCallback(() => {
    return Object.entries(VOICE_EMOTIONS).map(([key, emotion]) => ({
      key,
      ...emotion
    }));
  }, []);

  /**
   * Create utterance with expression
   */
  const createExpressionUtterance = useCallback((text, baseParams, voice) => {
    const { params, text: cleanText } = applyVoiceExpression(text, baseParams);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.voice = voice;
    utterance.rate = params.rate;
    utterance.pitch = params.pitch;
    utterance.volume = params.volume;
    utterance.lang = voice?.lang || 'en-US';

    return utterance;
  }, [applyVoiceExpression]);

  /**
   * Break text into chunks with different expressions
   * Useful for complex scripts
   */
  const breakTextByExpression = useCallback((text) => {
    // Split by emotion markers
    const chunks = text.split(/(?=\{[A-Z_]+\})/);

    return chunks
      .filter(chunk => chunk.trim())
      .map(chunk => {
        const { emotion, cleanText } = extractEmotionMarker(chunk);
        return {
          text: cleanText.trim(),
          emotion: emotion?.label || 'Neutral',
          hasMarker: !!emotion
        };
      });
  }, [extractEmotionMarker]);

  /**
   * Analyze text for expression suggestions
   */
  const analyzeSuggestions = useCallback((text) => {
    const suggestions = [];

    // Check for potential emphasis
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

    // Emotion detection
    const emotion = detectEmotionFromText(text);
    if (emotion !== VOICE_EMOTIONS.NEUTRAL) {
      suggestions.push(`Detected emotion: ${emotion.label}`);
    }

    return suggestions;
  }, []);

  /**
   * Get expression statistics
   */
  const getExpressionStats = useCallback(() => {
    return {
      cacheSize: expressionCacheRef.current.size,
      emotions: Object.keys(VOICE_EMOTIONS),
      patterns: Object.keys(EMPHASIS_PATTERNS)
    };
  }, []);

  /**
   * Clear expression cache
   */
  const clearExpressionCache = useCallback(() => {
    expressionCacheRef.current.clear();
  }, []);

  return {
    // Core functions
    applyVoiceExpression,
    createExpressionUtterance,
    extractEmotionMarker,
    addNaturalPauses,

    // Analysis
    breakTextByExpression,
    analyzeSuggestions,

    // Utils
    getAvailableEmotions,
    getExpressionStats,
    clearExpressionCache,

    // Constants
    VOICE_EMOTIONS,
    EMPHASIS_PATTERNS,
    PAUSE_PATTERNS
  };
};