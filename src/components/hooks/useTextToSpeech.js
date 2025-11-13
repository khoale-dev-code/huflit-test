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
  const isStoppingRef = useRef(false); // Track intentional stops
  const metricsRef = useRef({
    totalUtterances: 0,
    totalDuration: 0,
    errorCount: 0,
    interruptCount: 0
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

  const optimizeConversations = useCallback((conversations, chunkSize = 200) => {
    return conversations.flatMap(conv => {
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

  // Clean up utterance
  const cleanupUtterance = useCallback(() => {
    if (currentUtteranceRef.current) {
      currentUtteranceRef.current.onend = null;
      currentUtteranceRef.current.onerror = null;
      currentUtteranceRef.current = null;
    }
  }, []);

  // Stop all speech
  const stopAllSpeech = useCallback(() => {
    isStoppingRef.current = true; // Mark as intentional stop
    try {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    } catch (err) {
      console.error('Error stopping speech:', err);
    }
    // Reset flag after a short delay
    setTimeout(() => {
      isStoppingRef.current = false;
    }, 100);
  }, [synthRef]);

  // Pause speech
  const pauseScript = useCallback(() => {
    if (!synthRef.current) return;

    try {
      if (synthRef.current.speaking && !synthRef.current.paused) {
        pausedUtteranceRef.current = currentUtteranceRef.current;
        synthRef.current.pause();
        setIsPaused(true);
        isPlayingRef.current = false;
      }
    } catch (err) {
      console.error('Error pausing speech:', err);
      stopAllSpeech();
    }
  }, [synthRef, stopAllSpeech]);

  // Resume speech from pause
  const resumeScript = useCallback(() => {
    if (!synthRef.current) return;

    try {
      if (synthRef.current.paused) {
        synthRef.current.resume();
        setIsPaused(false);
        isPlayingRef.current = true;
      }
    } catch (err) {
      console.error('Error resuming speech:', err);
    }
  }, [synthRef]);

  // Stop and reset everything
  const stopScript = useCallback(() => {
    stopAllSpeech();
    cleanupUtterance();
    utteranceQueueRef.current = [];
    pausedUtteranceRef.current = null;
    setCurrentPlayingIndex(-1);
    setPlayingTime(0);
    setIsPaused(false);
    isPlayingRef.current = false;
  }, [stopAllSpeech, cleanupUtterance]);

  // Play next utterance in queue
  const speakNextInQueue = useCallback(() => {
    if (!synthRef.current || currentUtteranceRef.current) {
      return;
    }

    // Queue is empty, stop playing
    if (utteranceQueueRef.current.length === 0) {
      if (isPlayingRef.current) {
        setCurrentPlayingIndex(-1);
        setPlayingTime(0);
        isPlayingRef.current = false;
      }
      return;
    }

    // Get next item from queue
    const next = utteranceQueueRef.current.shift();
    if (!next) return;

    // Find index in filtered conversations
    const newIndex = filteredConversations.findIndex(
      conv => conv.text === next.text && conv.speaker === next.speaker
    );

    if (newIndex !== -1) {
      setCurrentPlayingIndex(newIndex);
    }

    // Get voice for speaker
    const voice = getSpeakerVoice(next.speaker);
    if (!voice) {
      console.warn(`No voice available for ${next.speaker}`);
      return speakNextInQueue();
    }

    try {
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(next.text);
      utterance.voice = voice;
      utterance.rate = next.options.rate;
      utterance.pitch = next.options.pitch;
      utterance.volume = next.options.volume;
      utterance.lang = voice.lang;

      currentUtteranceRef.current = utterance;
      setPlayingTime(prev => prev + 1);

      // Handle utterance end
      utterance.onend = () => {
        metricsRef.current.totalUtterances++;
        metricsRef.current.totalDuration += utterance.duration || 0;
        cleanupUtterance();
        
        // Only continue if still playing
        if (isPlayingRef.current) {
          speakNextInQueue();
        }
      };

      // Handle utterance error with better error classification
      utterance.onerror = (event) => {
        // Don't log interrupted errors if we intentionally stopped
        if (event.error === 'interrupted' && isStoppingRef.current) {
          cleanupUtterance();
          return;
        }

        // Don't log interrupted errors during queue changes
        if (event.error === 'interrupted' && utteranceQueueRef.current.length === 0) {
          cleanupUtterance();
          return;
        }

        // Track different error types
        if (event.error === 'interrupted') {
          metricsRef.current.interruptCount++;
          console.warn('Speech interrupted (non-critical)');
        } else {
          metricsRef.current.errorCount++;
          console.error('Utterance error:', event.error);
        }

        cleanupUtterance();
        
        // Try to continue if still playing and error wasn't fatal
        if (isPlayingRef.current && event.error !== 'canceled') {
          speakNextInQueue();
        }
      };

      // Speak
      synthRef.current.speak(utterance);
    } catch (err) {
      console.error('Error creating utterance:', err);
      metricsRef.current.errorCount++;
      cleanupUtterance();
      speakNextInQueue();
    }
  }, [synthRef, getSpeakerVoice, filteredConversations, cleanupUtterance]);

  // Queue conversations for playback
  const queueConversations = useCallback((conversations, getTTSOptions, autoOptimize = true) => {
    if (!synthRef.current) return false;

    try {
      // Mark as intentional stop before clearing
      isStoppingRef.current = true;
      
      stopAllSpeech();
      cleanupUtterance();
      utteranceQueueRef.current = [];
      pausedUtteranceRef.current = null;
      setPlayingTime(0);

      // Optimize conversations if enabled
      const toQueue = autoOptimize ? optimizeConversations(conversations) : conversations;

      const queue = toQueue.map(conv => ({
        text: conv.text,
        speaker: conv.speaker,
        options: getTTSOptions(conv.speaker)
      }));

      utteranceQueueRef.current = queue;
      isPlayingRef.current = true;
      
      // Reset stop flag after a short delay
      setTimeout(() => {
        isStoppingRef.current = false;
      }, 100);
      
      return queue.length > 0;
    } catch (err) {
      console.error('Error queueing conversations:', err);
      isStoppingRef.current = false;
      return false;
    }
  }, [synthRef, stopAllSpeech, cleanupUtterance, optimizeConversations]);

  // Get TTS metrics
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

  // Reset metrics
  const resetMetrics = useCallback(() => {
    metricsRef.current = {
      totalUtterances: 0,
      totalDuration: 0,
      errorCount: 0,
      interruptCount: 0
    };
  }, []);

  // Check if currently speaking
  const isSpeaking = useCallback(() => {
    return synthRef.current?.speaking ?? false;
  }, [synthRef]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScript();
    };
  }, [stopScript]);

  return {
    // State
    currentPlayingIndex,
    setCurrentPlayingIndex,
    playingTime,
    setPlayingTime,
    isPaused,

    // Control
    pauseScript,
    resumeScript,
    stopScript,
    speakNextInQueue,
    queueConversations,
    isSpeaking,

    // Text Optimization
    optimizeText,
    chunkText,
    optimizeConversations,

    // Metrics
    getTTSMetrics,
    resetMetrics,

    // Internal refs
    utteranceQueueRef,
    currentUtteranceRef
  };
};