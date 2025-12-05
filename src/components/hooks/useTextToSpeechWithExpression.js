import { useState, useCallback, useRef, useEffect } from 'react';
import { useVoiceExpression } from './useVoiceExpression';
import { VOICE_EMOTIONS } from '../config/voiceExpression';


export const useTextToSpeechWithExpression = ({
  getSpeakerVoice,
  synthRef,
  isScriptPlaying,
  filteredConversations
}) => {
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);
  const [playingTime, setPlayingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [globalEmotion, setGlobalEmotion] = useState('NEUTRAL');
  const [enableExpression, setEnableExpression] = useState(true);

  const utteranceQueueRef = useRef([]);
  const currentUtteranceRef = useRef(null);
  const isPlayingRef = useRef(false);
  const pausedUtteranceRef = useRef(null);
  const metricsRef = useRef({
    totalUtterances: 0,
    emotionsUsed: {},
    emphasisCount: 0
  });

  const { 
    applyVoiceExpression,
    createExpressionUtterance,
    extractEmotionMarker
  } = useVoiceExpression();

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
    try {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    } catch (err) {
      console.error('Error stopping speech:', err);
    }
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

  // Resume speech
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

  // Stop and reset
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

  // Play next with expression
  const speakNextInQueue = useCallback(() => {
    if (!synthRef.current || currentUtteranceRef.current) {
      return;
    }

    if (utteranceQueueRef.current.length === 0) {
      if (isPlayingRef.current) {
        setCurrentPlayingIndex(-1);
        setPlayingTime(0);
        isPlayingRef.current = false;
      }
      return;
    }

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
      // Áp dụng voice expression
      const expressionResult = enableExpression
        ? applyVoiceExpression(next.text, next.options)
        : {
            params: next.options,
            text: next.text,
            emotion: 'NEUTRAL',
            hasEmphasis: false
          };

      // Track metrics
      metricsRef.current.totalUtterances++;
      metricsRef.current.emotionsUsed[expressionResult.emotion] = 
        (metricsRef.current.emotionsUsed[expressionResult.emotion] || 0) + 1;
      if (expressionResult.hasEmphasis) {
        metricsRef.current.emphasisCount++;
      }

      // Create utterance with expression
      const utterance = new SpeechSynthesisUtterance(expressionResult.text);
      utterance.voice = voice;
      utterance.rate = expressionResult.params.rate;
      utterance.pitch = expressionResult.params.pitch;
      utterance.volume = expressionResult.params.volume;
      utterance.lang = voice.lang;

      currentUtteranceRef.current = utterance;
      setPlayingTime(prev => prev + 1);

      utterance.onend = () => {
        cleanupUtterance();
        speakNextInQueue();
      };

      utterance.onerror = (event) => {
        console.error('Utterance error:', event.error);
        cleanupUtterance();
        speakNextInQueue();
      };

      synthRef.current.speak(utterance);
    } catch (err) {
      console.error('Error creating utterance:', err);
      cleanupUtterance();
      speakNextInQueue();
    }
  }, [synthRef, getSpeakerVoice, filteredConversations, cleanupUtterance, enableExpression, applyVoiceExpression]);

  // Queue conversations with expression support
  const queueConversations = useCallback((conversations, getTTSOptions) => {
    if (!synthRef.current) return false;

    try {
      stopAllSpeech();
      cleanupUtterance();
      utteranceQueueRef.current = [];
      pausedUtteranceRef.current = null;
      setPlayingTime(0);

      const queue = conversations.map(conv => {
        // Extract emotion marker if exists
        const { emotion, cleanText } = extractEmotionMarker(conv.text);
        const emotionToUse = emotion || (globalEmotion !== 'NEUTRAL' ? VOICE_EMOTIONS[globalEmotion] : null);

        return {
          text: conv.text,
          cleanText: cleanText,
          speaker: conv.speaker,
          options: getTTSOptions(conv.speaker),
          emotion: emotionToUse
        };
      });

      utteranceQueueRef.current = queue;
      isPlayingRef.current = true;
      return queue.length > 0;
    } catch (err) {
      console.error('Error queueing conversations:', err);
      return false;
    }
  }, [synthRef, stopAllSpeech, cleanupUtterance, globalEmotion, extractEmotionMarker]);

  // Get expression metrics
  const getExpressionMetrics = useCallback(() => {
    const { totalUtterances, emotionsUsed, emphasisCount } = metricsRef.current;
    
    return {
      totalUtterances,
      emphasisCount,
      emotionsUsed,
      emphasisRate: totalUtterances > 0 ? ((emphasisCount / totalUtterances) * 100).toFixed(2) : 0,
      dominantEmotion: Object.entries(emotionsUsed).sort(([, a], [, b]) => b - a)[0]?.[0] || 'NEUTRAL'
    };
  }, []);

  // Reset metrics
  const resetExpressionMetrics = useCallback(() => {
    metricsRef.current = {
      totalUtterances: 0,
      emotionsUsed: {},
      emphasisCount: 0
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScript();
    };
  }, [stopScript]);

  return {
    // State & Control
    currentPlayingIndex,
    setCurrentPlayingIndex,
    playingTime,
    isPaused,
    pauseScript,
    resumeScript,
    stopScript,
    speakNextInQueue,
    queueConversations,

    // Expression controls
    globalEmotion,
    setGlobalEmotion,
    enableExpression,
    setEnableExpression,

    // Metrics
    getExpressionMetrics,
    resetExpressionMetrics,

    // Internal refs
    utteranceQueueRef,
    currentUtteranceRef
  };
};