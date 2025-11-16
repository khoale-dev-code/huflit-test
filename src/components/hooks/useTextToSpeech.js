import { useState, useCallback, useRef, useEffect } from 'react';

export const useTextToSpeech = ({ 
  getSpeakerVoice, 
  synthRef, 
  isScriptPlaying, 
  filteredConversations 
}) => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);
  const [playingTime, setPlayingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const utteranceQueueRef = useRef([]);
  const currentUtteranceRef = useRef(null);
  const isPlayingRef = useRef(false);
  const pausedUtteranceRef = useRef(null);
  const isStoppingRef = useRef(false);
  const isMountedRef = useRef(true);
  const playbackTimeoutRef = useRef(null);
  const metricsRef = useRef({
    totalUtterances: 0,
    totalDuration: 0,
    errorCount: 0,
    interruptCount: 0
  });

  // ==================== SAFETY CHECKS ====================

  const isSynthAvailable = useCallback(() => {
    return synthRef?.current && typeof synthRef.current.speak === 'function';
  }, [synthRef]);

  const safeSetState = useCallback((setter, value) => {
    if (isMountedRef.current) {
      setter(value);
    }
  }, []);

  // ==================== TEXT OPTIMIZATION ====================

  const optimizeText = useCallback((text) => {
    if (!text || typeof text !== 'string') return '';
    
    return text
      .replace(/[^\w\s.,!?'-]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/([.!?])\s+/g, '$1 ')
      .trim();
  }, []);

  const chunkText = useCallback((text, maxLength = 200) => {
    if (!text || text.length <= maxLength) return [text];

    const chunks = [];
    let current = '';
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

  const optimizeConversations = useCallback((conversations, chunkSize = 200) => {
    if (!Array.isArray(conversations)) return [];
    
    return conversations.flatMap(conv => {
      if (!conv || !conv.text) return [];
      
      const optimized = optimizeText(conv.text);
      const chunks = chunkText(optimized, chunkSize);
      
      return chunks.map((chunk, idx) => ({
        ...conv,
        text: chunk,
        chunkIndex: idx,
        isChunked: chunks.length > 1
      }));
    });
  }, [optimizeText, chunkText]);

  // ==================== CLEANUP ====================

  const cleanupUtterance = useCallback(() => {
    if (currentUtteranceRef.current) {
      try {
        currentUtteranceRef.current.onend = null;
        currentUtteranceRef.current.onerror = null;
        currentUtteranceRef.current.onboundary = null;
        currentUtteranceRef.current = null;
      } catch (err) {
        console.warn('Error cleaning up utterance:', err);
      }
    }
  }, []);

  const clearPlaybackTimeout = useCallback(() => {
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }
  }, []);

  // ==================== SPEECH CONTROL ====================

  const stopAllSpeech = useCallback(() => {
    isStoppingRef.current = true;
    clearPlaybackTimeout();
    
    try {
      if (isSynthAvailable()) {
        synthRef.current.cancel();
      }
    } catch (err) {
      console.error('Error stopping speech:', err);
    }
    
    playbackTimeoutRef.current = setTimeout(() => {
      isStoppingRef.current = false;
    }, 100);
  }, [synthRef, isSynthAvailable, clearPlaybackTimeout]);

  const pauseScript = useCallback(() => {
    if (!isSynthAvailable()) return;

    try {
      if (synthRef.current.speaking && !synthRef.current.paused) {
        pausedUtteranceRef.current = currentUtteranceRef.current;
        synthRef.current.pause();
        safeSetState(setIsPaused, true);
        isPlayingRef.current = false;
      }
    } catch (err) {
      console.error('Error pausing speech:', err);
      stopAllSpeech();
    }
  }, [synthRef, isSynthAvailable, stopAllSpeech, safeSetState]);

  const resumeScript = useCallback(() => {
    if (!isSynthAvailable()) return;

    try {
      if (synthRef.current.paused) {
        synthRef.current.resume();
        safeSetState(setIsPaused, false);
        isPlayingRef.current = true;
      }
    } catch (err) {
      console.error('Error resuming speech:', err);
    }
  }, [synthRef, isSynthAvailable, safeSetState]);

  const stopScript = useCallback(() => {
    stopAllSpeech();
    cleanupUtterance();
    utteranceQueueRef.current = [];
    pausedUtteranceRef.current = null;
    safeSetState(setCurrentPlayingIndex, -1);
    safeSetState(setPlayingTime, 0);
    safeSetState(setIsPaused, false);
    isPlayingRef.current = false;
  }, [stopAllSpeech, cleanupUtterance, safeSetState]);

  // ==================== PLAYBACK ====================

  const speakNextInQueue = useCallback(() => {
    if (!isSynthAvailable() || currentUtteranceRef.current || !isMountedRef.current) {
      return;
    }

    if (utteranceQueueRef.current.length === 0) {
      if (isPlayingRef.current) {
        safeSetState(setCurrentPlayingIndex, -1);
        safeSetState(setPlayingTime, 0);
        isPlayingRef.current = false;
      }
      return;
    }

    const next = utteranceQueueRef.current.shift();
    if (!next || !next.text) {
      return speakNextInQueue();
    }

    // Safely find index
    const newIndex = Array.isArray(filteredConversations) 
      ? filteredConversations.findIndex(
          conv => conv?.text === next.text && conv?.speaker === next.speaker
        )
      : -1;

    if (newIndex !== -1) {
      safeSetState(setCurrentPlayingIndex, newIndex);
    }

    const voice = getSpeakerVoice(next.speaker);
    if (!voice) {
      console.warn(`No voice available for ${next.speaker}`);
      return speakNextInQueue();
    }

    try {
      const utterance = new SpeechSynthesisUtterance(next.text);
      utterance.voice = voice;
      utterance.rate = Math.max(0.1, Math.min(2, next.options?.rate || 1));
      utterance.pitch = Math.max(0, Math.min(2, next.options?.pitch || 1));
      utterance.volume = Math.max(0, Math.min(1, next.options?.volume || 1));
      utterance.lang = voice.lang || 'en-US';

      currentUtteranceRef.current = utterance;
      safeSetState(setPlayingTime, prev => prev + 1);

      utterance.onend = () => {
        if (!isMountedRef.current) return;
        
        metricsRef.current.totalUtterances++;
        metricsRef.current.totalDuration += utterance.duration || 0;
        cleanupUtterance();
        
        if (isPlayingRef.current) {
          playbackTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              speakNextInQueue();
            }
          }, 50);
        }
      };

      utterance.onerror = (event) => {
        if (!isMountedRef.current) return;
        
        if (event.error === 'interrupted' && isStoppingRef.current) {
          cleanupUtterance();
          return;
        }

        if (event.error === 'interrupted' && utteranceQueueRef.current.length === 0) {
          cleanupUtterance();
          return;
        }

        if (event.error === 'interrupted') {
          metricsRef.current.interruptCount++;
        } else {
          metricsRef.current.errorCount++;
          console.error('Utterance error:', event.error);
        }

        cleanupUtterance();
        
        if (isPlayingRef.current && event.error !== 'canceled') {
          playbackTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              speakNextInQueue();
            }
          }, 50);
        }
      };

      synthRef.current.speak(utterance);
      
    } catch (err) {
      console.error('Error creating utterance:', err);
      metricsRef.current.errorCount++;
      cleanupUtterance();
      
      playbackTimeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          speakNextInQueue();
        }
      }, 50);
    }
  }, [synthRef, getSpeakerVoice, filteredConversations, cleanupUtterance, isSynthAvailable, safeSetState]);

  // ==================== QUEUE MANAGEMENT ====================

  const queueConversations = useCallback((conversations, getTTSOptions, autoOptimize = true) => {
    if (!isSynthAvailable() || !Array.isArray(conversations)) {
      return false;
    }

    try {
      isStoppingRef.current = true;
      
      stopAllSpeech();
      cleanupUtterance();
      utteranceQueueRef.current = [];
      pausedUtteranceRef.current = null;
      safeSetState(setPlayingTime, 0);

      const toQueue = autoOptimize ? optimizeConversations(conversations) : conversations;
      
      const queue = toQueue
        .filter(conv => conv && conv.text && conv.speaker)
        .map(conv => ({
          text: conv.text,
          speaker: conv.speaker,
          options: typeof getTTSOptions === 'function' 
            ? getTTSOptions(conv.speaker) 
            : { rate: 1, pitch: 1, volume: 1 }
        }));

      utteranceQueueRef.current = queue;
      isPlayingRef.current = true;
      
      playbackTimeoutRef.current = setTimeout(() => {
        isStoppingRef.current = false;
      }, 100);
      
      return queue.length > 0;
    } catch (err) {
      console.error('Error queueing conversations:', err);
      isStoppingRef.current = false;
      return false;
    }
  }, [synthRef, stopAllSpeech, cleanupUtterance, optimizeConversations, isSynthAvailable, safeSetState]);

  // ==================== METRICS ====================

  const getTTSMetrics = useCallback(() => {
    const { totalUtterances, totalDuration, errorCount, interruptCount } = metricsRef.current;
    
    return {
      totalUtterances,
      totalDuration: Math.round(totalDuration),
      errorCount,
      interruptCount,
      avgDuration: totalUtterances > 0 ? Math.round(totalDuration / totalUtterances) : 0,
      errorRate: totalUtterances > 0 ? ((errorCount / totalUtterances) * 100).toFixed(2) : 0,
      interruptRate: totalUtterances > 0 ? ((interruptCount / totalUtterances) * 100).toFixed(2) : 0
    };
  }, []);

  const resetMetrics = useCallback(() => {
    metricsRef.current = {
      totalUtterances: 0,
      totalDuration: 0,
      errorCount: 0,
      interruptCount: 0
    };
  }, []);

  const isSpeaking = useCallback(() => {
    return isSynthAvailable() && (synthRef.current?.speaking ?? false);
  }, [synthRef, isSynthAvailable]);

  // ==================== LIFECYCLE ====================

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      clearPlaybackTimeout();
      stopScript();
    };
  }, [stopScript, clearPlaybackTimeout]);

  return {
    currentPlayingIndex,
    setCurrentPlayingIndex,
    playingTime,
    setPlayingTime,
    isPaused,
    pauseScript,
    resumeScript,
    stopScript,
    speakNextInQueue,
    queueConversations,
    isSpeaking,
    optimizeText,
    chunkText,
    optimizeConversations,
    getTTSMetrics,
    resetMetrics,
    utteranceQueueRef,
    currentUtteranceRef
  };
};