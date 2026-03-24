import { useCallback, useRef, useEffect } from 'react';

const MODE_CONFIG = {
  HAPPY:   { fptVoice: 'minhquang',   speed:  0 }, // ← đổi ở đây
  NEUTRAL: { fptVoice: 'leminh',  speed: 1 },
  SAD:     { fptVoice: 'banmai',     speed: -1 },
};

const FPT_API_URL = 'https://api.fpt.ai/hmi/tts/v5';
const FPT_API_KEY = import.meta.env.VITE_FPT_TTS_KEY;

const useVoiceExpression = () => {
  const audioRef    = useRef(null);
  const timeoutsRef = useRef([]);

  const _stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => () => _stop(), [_stop]);

  const stop = _stop;

  const speak = useCallback(async (text, mode = 'NEUTRAL', onEnd) => {
    if (!text?.trim() || !FPT_API_KEY) return;
    _stop();

    const cfg = MODE_CONFIG[mode] ?? MODE_CONFIG.NEUTRAL;

    try {
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
      const delays = [1000, 1500, 2000, 2000, 2000, 2000];

      for (let i = 0; i < delays.length; i++) {
        await new Promise((r) => setTimeout(r, delays[i]));

        try {
          // ✅ Fix: tạo Audio, load, rồi play trong cùng một chỗ
          await new Promise((resolve, reject) => {
            const audio = new Audio(audioUrl);
            let settled = false;

            const done = (err) => {
              if (settled) return;
              settled = true;
              clearTimeout(timer);
              if (err) { reject(err); return; }

              // ✅ Gán ref và play ngay tại đây
              audioRef.current = audio;
              audio.onended = () => { audioRef.current = null; onEnd?.(); resolve(); };
              audio.onerror = () => { audioRef.current = null; reject(new Error('play_error')); };

              audio.play().catch(reject);
            };

            const timer = setTimeout(() => done(new Error('timeout')), 4000);
            audio.onerror = () => done(new Error('load_error'));
            audio.oncanplaythrough = () => done(null);
            audio.load();
          });

          break; // play thành công
        } catch (e) {
          audioRef.current = null;
          console.warn(`[FPT] Attempt ${i + 1}/${delays.length}:`, e.message);
          if (i === delays.length - 1) throw new Error('Audio không load được sau tất cả lần thử');
        }
      }

    } catch (err) {
      console.error('[useVoiceExpression] Lỗi:', err.message);
    }
  }, [_stop]);

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
  }, [speak, _stop]);

  return { speak, speakSequence, stop };
};
export default useVoiceExpression;