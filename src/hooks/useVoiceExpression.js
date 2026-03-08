import { useCallback, useRef, useEffect } from 'react';

const MODE_CONFIG = {
  HAPPY:   { fptVoice: 'minhquang',   speed:  0 }, // ← đổi ở đây
  NEUTRAL: { fptVoice: 'leminh',  speed: -1 },
  SAD:     { fptVoice: 'banmai',     speed: -1 },
};

const FPT_API_URL = 'https://api.fpt.ai/hmi/tts/v5';
const FPT_API_KEY = import.meta.env.VITE_FPT_TTS_KEY;

// Thử load Audio, timeout sau maxWait ms
const tryPlayAudio = (url, maxWait = 4000) =>
  new Promise((resolve, reject) => {
    const audio = new Audio(url);
    let settled = false;

    const done = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      err ? reject(err) : resolve(audio);
    };

    const timer = setTimeout(() => done(new Error('timeout')), maxWait);
    audio.onerror   = () => done(new Error('load_error'));
    audio.oncanplaythrough = () => done(null);

    // Bắt đầu load
    audio.load();
  });

const useVoiceExpression = () => {
  const audioRef    = useRef(null);
  const timeoutsRef = useRef([]);

  useEffect(() => () => _stop(), []); // eslint-disable-line

  const _stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const stop = useCallback(() => _stop(), []);

  const speak = useCallback(async (text, mode = 'NEUTRAL', onEnd) => {
    if (!text?.trim() || !FPT_API_KEY) return;
    _stop();

    const cfg = MODE_CONFIG[mode] ?? MODE_CONFIG.NEUTRAL;

    try {
      // 1. Lấy url mp3 từ FPT
      const res = await fetch(FPT_API_URL, {
        method: 'POST',
        headers: {
          'api_key': FPT_API_KEY,
          'voice':   cfg.fptVoice,
          'speed':   String(cfg.speed),
        },
        body: text,
      });

      if (!res.ok) throw new Error(`FPT API ${res.status}`);
      const json = await res.json();
      if (json.error !== 0 || !json.async) throw new Error('FPT no url');

      const audioUrl = json.async;

      // 2. Retry load audio — FPT cần thời gian render file
      //    Thử tối đa 6 lần, delay tăng dần: 1s, 1.5s, 2s, 2s, 2s, 2s
      const delays = [1000, 1500, 2000, 2000, 2000, 2000];
      let audio = null;

      for (let i = 0; i < delays.length; i++) {
        await new Promise((r) => setTimeout(r, delays[i]));
        try {
          audio = await tryPlayAudio(audioUrl, 4000);
          break; // load thành công
        } catch (e) {
          console.warn(`[FPT] Attempt ${i + 1}/${delays.length}:`, e.message);
          if (i === delays.length - 1) throw new Error('Audio không load được');
        }
      }

      // 3. Play
      audioRef.current = audio;
      audio.onended = () => { audioRef.current = null; onEnd?.(); };
      audio.onerror = () => { audioRef.current = null; };
      await audio.play();

    } catch (err) {
      console.error('[useVoiceExpression] Lỗi:', err.message);
    }
  }, []);

  const speakSequence = useCallback((segments) => {
    if (!segments?.length) return;
    _stop();

    let index = 0;
    const next = () => {
      if (index >= segments.length) return;
      const { text, mode = 'NEUTRAL', delay = 0 } = segments[index++];
      const tid = setTimeout(() => speak(text, mode, next), delay);
      timeoutsRef.current.push(tid);
    };
    next();
  }, [speak]);

  return { speak, speakSequence, stop };
};

export default useVoiceExpression;