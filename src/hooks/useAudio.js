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
  const abortControllerRef = useRef(null);

  // Constants
  const SPEAKER_CONFIG = {
    male: { keywords: ['man', 'customer', 'professor', 'father', 'boy'], pitch: 0.9 },
    female: { keywords: ['woman', 'sales', 'student', 'mother', 'girl'], pitch: 1.1 },
  };
  const PAUSE_BETWEEN_SPEAKERS = 800;
  const PAUSE_BETWEEN_UTTERANCES = 300;
  const BREAK_BETWEEN_REPEATS = 3000;
  const REPEAT_COUNT = 2;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

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
    (text, voice, pitch, onEndCallback) => {
      return new Promise((resolve) => {
        if (!voice) {
          console.warn('Voice not available');
          resolve();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.rate = Math.max(0.1, Math.min(2, rate)); // Clamp rate between 0.1 and 2
        utterance.pitch = Math.max(0.1, Math.min(2, pitch)); // Clamp pitch between 0.1 and 2
        utterance.volume = 1;

        utterance.onend = () => {
          if (onEndCallback) onEndCallback();
          resolve();
        };

        utterance.onerror = (e) => {
          console.error('Speech synthesis error:', e.error);
          setError(`Speech error: ${e.error}`);
          resolve();
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
      });
    },
    [rate]
  );

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

        // Stop any existing playback
        stopAudio();
        setRepeatCount(0);
        setError(null);

        const utterances = parseScriptToUtterances(script);
        if (utterances.length === 0) {
          setError('No valid utterances found in script');
          setStatus('❌ Script không hợp lệ');
          return;
        }

        const isMultiSpeaker = utterances.length > 1;

        for (let repeat = 0; repeat < REPEAT_COUNT; repeat++) {
          setRepeatCount(repeat + 1);
          setStatus(`▶️ Đang phát lần ${repeat + 1}/${REPEAT_COUNT}...`);

          if (isMultiSpeaker) {
            for (let i = 0; i < utterances.length; i++) {
              const { speaker, text } = utterances[i];
              const { voice, pitch } = getVoiceAndPitchForSpeaker(speaker);

              await speakUtterance(text, voice, pitch);

              // Pause longer between different speakers, shorter between same speaker
              const nextSpeaker = utterances[i + 1]?.speaker;
              const pauseTime = 
                i < utterances.length - 1 && speaker !== nextSpeaker
                  ? PAUSE_BETWEEN_SPEAKERS
                  : PAUSE_BETWEEN_UTTERANCES;

              await new Promise(resolve => setTimeout(resolve, pauseTime));

              const progress = ((repeat + (i + 1) / utterances.length) / REPEAT_COUNT) * 100;
              setProgress(progress);
            }
          } else {
            // Monologue: use default voice
            const { voice, pitch } = getVoiceAndPitchForSpeaker('');
            await speakUtterance(script, voice, pitch);
            setProgress(((repeat + 1) / REPEAT_COUNT) * 100);
          }

          // Pause between repeats (except after last repeat)
          if (repeat < REPEAT_COUNT - 1) {
            setStatus('⏸️ Nghỉ 3 giây...');
            await new Promise(resolve => setTimeout(resolve, BREAK_BETWEEN_REPEATS));
          }
        }

        setStatus('✅ Hoàn thành (đã đọc 2 lần)');
        setProgress(100);
      } catch (err) {
        console.error('Playback error:', err);
        setError(err.message);
        setStatus('❌ Lỗi phát âm thanh');
      }
    },
    [isPaused, maleVoice, femaleVoice, parseScriptToUtterances, getVoiceAndPitchForSpeaker, speakUtterance]
  );

  const pauseAudio = useCallback(() => {
    try {
      if (synthRef.current.speaking && !isPaused) {
        synthRef.current.pause();
        setIsPaused(true);
        setStatus('⏸️ Đã tạm dừng');
      }
    } catch (err) {
      console.error('Pause error:', err);
      setError('Failed to pause audio');
    }
  }, [isPaused]);

  const stopAudio = useCallback(() => {
    try {
      synthRef.current.cancel();
      utteranceRef.current = null;
      setIsPaused(false);
      setRepeatCount(0);
      setStatus('⏹️ Đã dừng');
      setProgress(0);
    } catch (err) {
      console.error('Stop error:', err);
      setError('Failed to stop audio');
    }
  }, []);

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