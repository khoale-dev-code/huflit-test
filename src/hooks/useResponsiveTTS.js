// import { useState, useRef, useCallback, useEffect } from 'react';

// const useResponsiveTTS = (ttsOptions = { rate: 0.9, pitch: 1.0, volume: 1 }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(-1);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [error, setError] = useState(null);
//   const [useFallback, setUseFallback] = useState(false); // New: Track fallback usage
//   const queueRef = useRef([]);

//   // Speaker lists (unchanged)
//   const FEMALE_SPEAKERS = ['Woman', 'Sarah', 'Anna', 'Client 2', 'Sales Associate', 'Older Woman', 'Student B', 'Student 2', 'Counselor'];
//   const MALE_SPEAKERS = ['Man', 'Mark', 'Ben', 'Client 1', 'Professor', 'John', 'Mike', 'Waiter', 'Customer', 'Manager', 'HR Rep', 'Interviewer 1', 'Interviewer 2', 'Candidate', 'Professor A', 'Student 1', 'Student', 'Parent', 'Travel Agent', 'Narrator'];

//   // Voices (unchanged)
//   const voices = useRef([
//     { name: 'UK English Female', gender: 'female' },
//     { name: 'UK English Male', gender: 'male' },
//     { name: 'US English Female', gender: 'female' },
//     { name: 'US English Male', gender: 'male' },
//   ]);

//   const getSpeakerVoice = useCallback((speaker) => {
//     const isFemale = FEMALE_SPEAKERS.some(name => speaker.includes(name));
//     const isMale = MALE_SPEAKERS.some(name => speaker.includes(name));
//     if (isFemale) return voices.current.find(v => v.gender === 'female')?.name || 'US English Female';
//     if (isMale) return voices.current.find(v => v.gender === 'male')?.name || 'US English Male';
//     return 'US English Female';
//   }, []);

//   const isMaleSpeaker = useCallback((speaker) => MALE_SPEAKERS.some(name => speaker.includes(name)), []);

//   // Prepare text (unchanged)
//   const prepareTextForTTS = useCallback((text) => {
//     const sentences = text.split(/(?<=[.!?])\s+/).map(sentence => sentence.trim()).filter(Boolean);
//     let expressiveText = '';
//     sentences.forEach((sentence, idx) => {
//       const emphasized = sentence.replace(/\b[A-Z][a-z]+\b/, (match) => `<emphasis level="strong">${match}</emphasis>`);
//       expressiveText += emphasized;
//       if (idx < sentences.length - 1) expressiveText += ' [pause 800ms] ';
//     });
//     return expressiveText;
//   }, []);

//   // Fallback: Native Web Speech API
//   const speakWithFallback = useCallback((text, speaker, options) => {
//     if (!('speechSynthesis' in window)) {
//       setError('Browser does not support native TTS.');
//       return;
//     }
//     const utterance = new SpeechSynthesisUtterance(text);
//     const voice = speechSynthesis.getVoices().find(v => v.lang.startsWith('en'));
//     utterance.voice = voice;
//     utterance.rate = options.rate || ttsOptions.rate;
//     utterance.pitch = isMaleSpeaker(speaker) ? 0.7 : ttsOptions.pitch;
//     utterance.volume = options.volume || ttsOptions.volume;
//     utterance.onend = () => setIsPlaying(false);
//     speechSynthesis.speak(utterance);
//   }, [ttsOptions, isMaleSpeaker]);

//   // Speak next (enhanced with fallback)
//   const speakNext = useCallback(() => {
//     const next = queueRef.current.shift();
//     if (!next) {
//       setIsPlaying(false);
//       setCurrentIndex(-1);
//       return;
//     }
//     setCurrentIndex(next.index);
//     setIsPlaying(true);
//     const preparedText = prepareTextForTTS(next.text);
//     if (window.responsiveVoice && !useFallback) {
//       // Primary: ResponsiveVoice
//       const voice = getSpeakerVoice(next.speaker);
//       const pitch = isMaleSpeaker(next.speaker) ? 0.7 : ttsOptions.pitch;
//       window.responsiveVoice.speak(preparedText, voice, {
//         rate: next.options.rate || ttsOptions.rate,
//         pitch: pitch,
//         volume: next.options.volume || ttsOptions.volume,
//         onend: () => queueRef.current.length > 0 ? speakNext() : (setIsPlaying(false), setCurrentIndex(-1)),
//         onerror: (e) => {
//           console.error('ResponsiveVoice error:', e);
//           setUseFallback(true); // Switch to fallback
//           speakWithFallback(preparedText, next.speaker, next.options);
//         }
//       });
//     } else {
//       // Fallback: Native API
//       speakWithFallback(preparedText, next.speaker, next.options);
//       setTimeout(() => { // Simulate onend
//         if (queueRef.current.length > 0) speakNext();
//         else (setIsPlaying(false), setCurrentIndex(-1));
//       }, preparedText.length * 50); // Rough timing estimate
//     }
//   }, [ttsOptions, getSpeakerVoice, isMaleSpeaker, prepareTextForTTS, useFallback, speakWithFallback]);

//   // Play functions (unchanged structure, with fallback awareness)
//   const playScript = useCallback((conversations, filterSpeaker = null) => {
//     if (!isInitialized) {
//       setError('TTS service unavailable. Ensure browser audio is enabled.');
//       return;
//     }
//     if (window.responsiveVoice) window.responsiveVoice.cancel();
//     else if ('speechSynthesis' in window) speechSynthesis.cancel();
//     queueRef.current = conversations
//       .filter(conv => !filterSpeaker || conv.speaker === filterSpeaker)
//       .map((conv, idx) => ({ text: conv.text, speaker: conv.speaker, options: ttsOptions, index: idx }));
//     setIsPlaying(queueRef.current.length > 0);
//     setCurrentIndex(-1);
//     setError(null);
//     if (queueRef.current.length > 0) speakNext();
//   }, [ttsOptions, isInitialized, speakNext]);

//   const playSingle = useCallback((conv, index) => {
//     if (!isInitialized) return;
//     if (window.responsiveVoice) window.responsiveVoice.cancel();
//     else if ('speechSynthesis' in window) speechSynthesis.cancel();
//     queueRef.current = [{ text: conv.text, speaker: conv.speaker, options: ttsOptions, index }];
//     setIsPlaying(true);
//     setCurrentIndex(index);
//     setError(null);
//     speakNext();
//   }, [ttsOptions, isInitialized, speakNext]);

//   const pauseScript = useCallback(() => {
//     if (window.responsiveVoice) window.responsiveVoice.cancel();
//     else if ('speechSynthesis' in window) speechSynthesis.cancel();
//     queueRef.current = [];
//     setIsPlaying(false);
//     setCurrentIndex(-1);
//     setError(null);
//   }, []);

//   // Initialization (enhanced logging and fallback)
//   useEffect(() => {
//     let intervalId, timeoutId;
//     const checkInit = () => {
//       console.log('TTS Check: ResponsiveVoice available?', !!window.responsiveVoice); // Debug log
//       if (window.responsiveVoice && !isInitialized) {
//         setIsInitialized(true);
//         console.log('Primary TTS (ResponsiveVoice) initialized.');
//       } else if (!window.responsiveVoice && 'speechSynthesis' in window && !isInitialized) {
//         setIsInitialized(true);
//         setUseFallback(true);
//         console.log('Fallback TTS (Native Web Speech) activated.');
//       }
//     };
//     checkInit();
//     intervalId = setInterval(checkInit, 1000);
//     timeoutId = setTimeout(() => {
//       clearInterval(intervalId);
//       if (!isInitialized) setError('TTS connection failed. Check console for details and retry.');
//     }, 5000);
//     return () => {
//       clearInterval(intervalId);
//       clearTimeout(timeoutId);
//     };
//   }, [isInitialized]);

//   useEffect(() => {
//     return () => {
//       if (window.responsiveVoice) window.responsiveVoice.cancel();
//       else if ('speechSynthesis' in window) speechSynthesis.cancel();
//     };
//   }, []);

//   return { isPlaying, currentIndex, playScript, playSingle, pauseScript, isInitialized, error, useFallback };
// };

// export default useResponsiveTTS;