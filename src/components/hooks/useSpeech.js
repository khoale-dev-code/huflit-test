// src/components/hooks/useSpeech.js
import { useState, useEffect, useCallback, useRef } from 'react';

export const useSpeech = () => {
    const synth = window.speechSynthesis;
    const [playingId, setPlayingId] = useState(null);
    const [sentenceId, setSentenceId] = useState(null); // <-- THÊM DÒNG NÀY
    const [isSupported, setIsSupported] = useState(true);
    const [error, setError] = useState(null);
    const [rate, setRate] = useState(0.8);
    const [pitch, setPitch] = useState(1);
    const voicesRef = useRef([]);

    useEffect(() => {
        if (!synth) {
            setIsSupported(false);
            return;
        }
        const updateVoices = () => {
            voicesRef.current = synth.getVoices();
        };
        updateVoices();
        synth.addEventListener('voiceschanged', updateVoices);
        return () => synth.removeEventListener('voiceschanged', updateVoices);
    }, [synth]);

    const getVoiceByLanguage = useCallback((lang = 'en') => {
        if (!voicesRef.current.length) return null;
        let voice = voicesRef.current.find(v => v.lang.startsWith(lang));
        if (!voice && lang !== 'en') voice = voicesRef.current.find(v => v.lang.includes('en'));
        return voice || voicesRef.current[0];
    }, []);

    const speak = useCallback((text, id = null, lang = 'en', isSentence = false) => {
        if (!isSupported || !text) return;

        try {
            setError(null);
            synth.cancel();

            // Xử lý riêng cho câu ví dụ
            if (isSentence) {
                if (sentenceId === id) {
                    setSentenceId(null);
                    return;
                }
                setSentenceId(id);
            } else {
                if (playingId === id) {
                    setPlayingId(null);
                    return;
                }
                setPlayingId(id);
            }

            const utterance = new SpeechSynthesisUtterance(text);
            const voice = getVoiceByLanguage(lang);
            if (voice) utterance.voice = voice;
            utterance.rate = rate;
            utterance.pitch = pitch;
            utterance.lang = lang;

            utterance.onend = () => {
                if (isSentence) setSentenceId(null);
                else setPlayingId(null);
            };
            utterance.onerror = (event) => {
                setError(`Speech error: ${event.error}`);
                if (isSentence) setSentenceId(null);
                else setPlayingId(null);
            };

            synth.speak(utterance);
        } catch (err) {
            setError(err.message);
            setPlayingId(null);
            setSentenceId(null);
        }
    }, [synth, playingId, sentenceId, isSupported, rate, pitch, getVoiceByLanguage]);

    const stop = useCallback(() => {
        synth.cancel();
        setPlayingId(null);
        setSentenceId(null);
    }, [synth]);

    const pause = useCallback(() => {
        synth.paused ? synth.resume() : synth.pause();
    }, [synth]);

    useEffect(() => () => synth?.cancel(), [synth]);

    return {
        speak,
        stop,
        pause,
        playingId,
        sentenceId, // <-- TRẢ VỀ
        isSupported,
        error,
        rate,
        setRate,
        pitch,
        setPitch,
        voices: voicesRef.current,
    };
};