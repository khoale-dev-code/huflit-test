import { useState, useRef, useCallback, useEffect } from 'react';

export const useAudio = (maleVoice, femaleVoice, rate = 1) => {
  // States
  const [status, setStatus] = useState('ready');
  const [progress, setProgress] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);

  // Refs
  const utteranceRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const isPlayingRef = useRef(false);
  const shouldStopRef = useRef(false);
  const currentTimeoutRef = useRef(null);

  // Constants
  const SPEAKER_CONFIG = {
    male: { keywords: ['man', 'customer', 'professor', 'father', 'boy'], pitch: 0.9 },
    female: { keywords: ['woman', 'sales', 'student', 'mother', 'girl'], pitch: 1.1 },
  };
  const PAUSE_BETWEEN_SPEAKERS = 800;
  const PAUSE_BETWEEN_UTTERANCES = 300;
  const BREAK_BETWEEN_REPEATS = 3000;
  const REPEAT_COUNT = 2;

  // Cleanup function
  const cleanup = useCallback(() => {
    // Clear any pending timeouts
    if (currentTimeoutRef.current) {
      clearTimeout(currentTimeoutRef.current);
      currentTimeoutRef.current = null;
    }

    // Cancel speech synthesis
    if (synthRef.current) {
      synthRef.current.cancel();
    }

    // Reset refs
    utteranceRef.current = null;
    isPlayingRef.current = false;
    shouldStopRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Validate voices
  useEffect(() => {
    if (!maleVoice && !femaleVoice) {
      setError('No voices provided');
    } else {
      setError(null);
    }
  }, [maleVoice, femaleVoice]);

  const getVoiceAndPitchForSpeaker = useCallback((speaker) => {
    if (!speaker) {
      return { voice: maleVoice || femaleVoice, pitch: 1 };
    }

    const lowerSpeaker = speaker.toLowerCase();

    // Check male keywords
    if (SPEAKER_CONFIG.male.keywords.some(keyword => lowerSpeaker.includes(keyword))) {
      return { voice: maleVoice, pitch: SPEAKER_CONFIG.male.pitch };
    }

    // Check female keywords
    if (SPEAKER_CONFIG.female.keywords.some(keyword => lowerSpeaker.includes(keyword))) {
      return { voice: femaleVoice, pitch: SPEAKER_CONFIG.female.pitch };
    }

    // Fallback
    return { voice: maleVoice || femaleVoice, pitch: 1 };
  }, [maleVoice, femaleVoice]);

  const parseScriptToUtterances = useCallback((script) => {
    if (!script || typeof script !== 'string') return [];

    const utteranceRegex = /(?:^|\n)([A-Z][a-z]+):?\s*(.*?)(?=\n[A-Z][a-z]+:|$)/gs;
    const matches = [...script.matchAll(utteranceRegex)];

    return matches
      .map(match => ({
        speaker: match[1].trim(),
        text: match[2].trim().replace(/^\s+|\s+$/g, '')
      }))
      .filter(u => u.text.length > 0);
  }, []);

  const speakUtterance = useCallback(
    (text, voice, pitch) => {
      return new Promise((resolve, reject) => {
        // Check if should stop
        if (shouldStopRef.current) {
          resolve();
          return;
        }

        if (!voice) {
          console.warn('Voice not available');
          resolve();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.rate = Math.max(0.1, Math.min(2, rate));
        utterance.pitch = Math.max(0.1, Math.min(2, pitch));
        utterance.volume = 1;

        utterance.onend = () => {
          utteranceRef.current = null;
          resolve();
        };

        utterance.onerror = (e) => {
          console.error('Speech synthesis error:', e.error);
          utteranceRef.current = null;
          
          // Don't treat 'interrupted' as error (happens on stop)
          if (e.error === 'interrupted' || e.error === 'canceled') {
            resolve();
          } else {
            setError(`Speech error: ${e.error}`);
            reject(e);
          }
        };

        utteranceRef.current = utterance;
        
        // Double-check before speaking
        if (!shouldStopRef.current) {
          synthRef.current.speak(utterance);
        } else {
          resolve();
        }
      });
    },
    [rate]
  );

  const delay = useCallback((ms) => {
    return new Promise((resolve) => {
      // Check if should stop immediately
      if (shouldStopRef.current) {
        resolve();
        return;
      }

      currentTimeoutRef.current = setTimeout(() => {
        currentTimeoutRef.current = null;
        resolve();
      }, ms);
    });
  }, []);

  const stopAudio = useCallback(() => {
    try {
      console.log('🛑 Stopping audio...');
      
      // Set stop flag first
      shouldStopRef.current = true;
      isPlayingRef.current = false;
      
      // Clear any pending timeouts
      if (currentTimeoutRef.current) {
        clearTimeout(currentTimeoutRef.current);
        currentTimeoutRef.current = null;
      }

      // Cancel speech synthesis multiple times for reliability
      synthRef.current.cancel();
      
      // Small delay then cancel again (iOS/Safari fix)
      setTimeout(() => {
        synthRef.current.cancel();
      }, 10);

      // Reset all state
      utteranceRef.current = null;
      setIsPaused(false);
      setRepeatCount(0);
      setStatus('⏹️ Đã dừng');
      setProgress(0);
      
      console.log('✅ Audio stopped successfully');
    } catch (err) {
      console.error('❌ Stop error:', err);
      setError('Failed to stop audio');
    }
  }, []);

  const pauseAudio = useCallback(() => {
    try {
      if (synthRef.current.speaking && !isPaused && isPlayingRef.current) {
        synthRef.current.pause();
        setIsPaused(true);
        setStatus('⏸️ Đã tạm dừng');
      }
    } catch (err) {
      console.error('Pause error:', err);
      setError('Failed to pause audio');
    }
  }, [isPaused]);

  const playAudio = useCallback(
    async (script) => {
      try {
        // If paused, resume
        if (isPaused) {
          synthRef.current.resume();
          setIsPaused(false);
          setStatus('▶️ Tiếp tục phát...');
          return;
        }

        // Check for voices
        if (!maleVoice && !femaleVoice) {
          setError('Voices not available. Please wait for voices to load.');
          setStatus('❌ Giọng nói không khả dụng');
          return;
        }

        // Stop any existing playback first
        stopAudio();
        
        // Wait a bit for cleanup
        await new Promise(resolve => setTimeout(resolve, 100));

        // Reset flags
        shouldStopRef.current = false;
        isPlayingRef.current = true;
        setRepeatCount(0);
        setError(null);

        const utterances = parseScriptToUtterances(script);
        if (utterances.length === 0) {
          setError('No valid utterances found in script');
          setStatus('❌ Script không hợp lệ');
          isPlayingRef.current = false;
          return;
        }

        const isMultiSpeaker = utterances.length > 1;

        for (let repeat = 0; repeat < REPEAT_COUNT; repeat++) {
          // Check if stopped
          if (shouldStopRef.current) {
            console.log('🛑 Playback stopped by user');
            break;
          }

          setRepeatCount(repeat + 1);
          setStatus(`▶️ Đang phát lần ${repeat + 1}/${REPEAT_COUNT}...`);

          if (isMultiSpeaker) {
            for (let i = 0; i < utterances.length; i++) {
              // Check if stopped
              if (shouldStopRef.current) {
                break;
              }

              const { speaker, text } = utterances[i];
              const { voice, pitch } = getVoiceAndPitchForSpeaker(speaker);

              await speakUtterance(text, voice, pitch);

              // Check if stopped after speaking
              if (shouldStopRef.current) {
                break;
              }

              // Pause between utterances
              if (i < utterances.length - 1) {
                const nextSpeaker = utterances[i + 1]?.speaker;
                const pauseTime = 
                  speaker !== nextSpeaker
                    ? PAUSE_BETWEEN_SPEAKERS
                    : PAUSE_BETWEEN_UTTERANCES;

                await delay(pauseTime);
              }

              // Update progress
              const currentProgress = ((repeat + (i + 1) / utterances.length) / REPEAT_COUNT) * 100;
              setProgress(currentProgress);
            }
          } else {
            // Monologue: use default voice
            if (shouldStopRef.current) {
              break;
            }

            const { voice, pitch } = getVoiceAndPitchForSpeaker('');
            await speakUtterance(script, voice, pitch);
            setProgress(((repeat + 1) / REPEAT_COUNT) * 100);
          }

          // Check if stopped
          if (shouldStopRef.current) {
            break;
          }

          // Pause between repeats (except after last repeat)
          if (repeat < REPEAT_COUNT - 1) {
            setStatus('⏸️ Nghỉ 3 giây...');
            await delay(BREAK_BETWEEN_REPEATS);
          }
        }

        // Only show completion if not stopped
        if (!shouldStopRef.current) {
          setStatus('✅ Hoàn thành (đã đọc 2 lần)');
          setProgress(100);
        }

        isPlayingRef.current = false;
      } catch (err) {
        console.error('Playback error:', err);
        setError(err.message);
        setStatus('❌ Lỗi phát âm thanh');
        isPlayingRef.current = false;
      }
    },
    [
      isPaused, 
      maleVoice, 
      femaleVoice, 
      parseScriptToUtterances, 
      getVoiceAndPitchForSpeaker, 
      speakUtterance,
      delay,
      stopAudio
    ]
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    status,
    progress,
    repeatCount,
    isPaused,
    error,
    playAudio,
    pauseAudio,
    stopAudio,
    resetError,
  };
};
export default useAudio;