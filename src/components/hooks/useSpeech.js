import { useState, useEffect } from 'react';

export const useSpeech = () => {
    const synth = window.speechSynthesis;
    const [playingId, setPlayingId] = useState(null);

    const speak = (text, id = null) => {
        synth.cancel();
        if (playingId === id) {
            setPlayingId(null);
            return;
        }
        
        setPlayingId(id);
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synth.getVoices();
        const englishVoice = voices.find(v => v.lang.includes('en'));
        
        if (englishVoice) utterance.voice = englishVoice;
        utterance.rate = 0.8;
        utterance.onend = () => setPlayingId(null);
        
        synth.speak(utterance);
    };

    useEffect(() => () => synth.cancel(), [synth]);

    return { speak, playingId };
};