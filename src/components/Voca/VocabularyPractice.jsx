/**
 * VocabularyPractice — Material Design 3 · Light Theme
 * Color System:
 *   Navy    #1A237E   Blue    #1565C0   BlueLight  #E8F0FE
 *   Orange  #E65100   OrangeL #FBE9E7   Surface    #FFFFFF
 *   BG      #F8F9FA   Outline #DADCE0   TextHigh   #202124
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  BarChart3, Settings, Trash2, Volume2, Heart, BookOpen,
  CheckCircle, ChevronLeft, ChevronRight, Zap, Trophy,
  Search, X, GraduationCap, Shuffle, RotateCcw,
} from 'lucide-react';

/* ── Google Font + CSS ─────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
    body { background: #F8F9FA; margin: 0; }
    .card-wrap { perspective: 1200px; }
    .card-inner { position: relative; transform-style: preserve-3d; transition: transform 0.55s cubic-bezier(.4,0,.2,1); }
    .card-inner.flipped { transform: rotateY(180deg); }
    .card-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 24px; }
    .card-back { transform: rotateY(180deg); }
    @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
    .fade-up { animation: fadeUp .3s ease forwards; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin { animation: spin .8s linear infinite; }
    button { font-family: 'Plus Jakarta Sans', sans-serif; }
    input { font-family: 'Plus Jakarta Sans', sans-serif; }
  `}</style>
);

/* ── Level badge colors (Material) ─────────────────────────── */
const LEVEL = {
  A1: { bg: '#E8F5E9', color: '#2E7D32' },
  A2: { bg: '#E3F2FD', color: '#1565C0' },
  B1: { bg: '#EDE7F6', color: '#4527A0' },
  B2: { bg: '#FFF3E0', color: '#E65100' },
  C1: { bg: '#FFEBEE', color: '#C62828' },
  C2: { bg: '#FCE4EC', color: '#880E4F' },
};

/* ── Design tokens ──────────────────────────────────────────── */
const T = {
  navy: '#1A237E',
  blue: '#1565C0',
  blueL: '#E8F0FE',
  orange: '#E65100',
  orangeL: '#FBE9E7',
  surface: '#FFFFFF',
  bg: '#F8F9FA',
  outline: '#DADCE0',
  hi: '#202124',
  med: '#5F6368',
  lo: '#9AA0A6',
};

/* ═══════════════════════════════════════════════════════════════
   VocabCard
═══════════════════════════════════════════════════════════════ */
const VocabCard = ({ word, flipped, onFlip }) => {
  const lvl = LEVEL[word.level] || LEVEL.B1;
  return (
    <div
      className="card-wrap w-full cursor-pointer select-none"
      style={{ minHeight: 340 }}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onFlip()}
      aria-label={flipped ? 'Show word' : 'Show meaning'}
    >
      <div className={`card-inner w-full`} style={{ minHeight: 340, transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

        {/* FRONT — navy gradient */}
        <div
          className="card-face flex flex-col items-center justify-center p-8 shadow-lg overflow-hidden"
          style={{ background: '#AEE4FF', minHeight: 340, border: '1.5px solid #7DD0F8' }}
        >
          {/* decorative rings */}
          <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', border:'1.5px solid rgba(21,101,192,.14)' }} />
          <div style={{ position:'absolute', bottom:-30, left:-30, width:110, height:110, borderRadius:'50%', border:'1.5px solid rgba(21,101,192,.10)' }} />

          <span style={{ ...lvl, borderRadius:20, padding:'3px 12px', fontSize:11, fontWeight:700, letterSpacing:'.05em', marginBottom:20, position:'relative' }}>
            {word.level}
          </span>

          <p style={{ fontSize:52, fontWeight:800, color:'#0D3C6E', textAlign:'center', lineHeight:1.1, marginBottom:10, letterSpacing:'-0.02em', position:'relative' }}>
            {word.word}
          </p>

          <p style={{ color:'#1565C0', fontSize:16, fontStyle:'italic', marginBottom:28, position:'relative', fontWeight:500 }}>
            {word.phonetic}
          </p>

          <div style={{ display:'flex', alignItems:'center', gap:8, color:'rgba(13,60,110,.5)', fontSize:12, fontWeight:500, position:'relative' }}>
            <span style={{ width:20, height:1, background:'rgba(13,60,110,.2)' }} />
            Tap to reveal meaning
            <span style={{ width:20, height:1, background:'rgba(13,60,110,.2)' }} />
          </div>
        </div>

        {/* BACK — white */}
        <div
          className="card-face card-back flex flex-col justify-center p-8"
          style={{ background: T.surface, border:`1.5px solid ${T.outline}`, boxShadow:'0 4px 16px rgba(0,0,0,.10)', minHeight:340 }}
        >
          <p style={{ fontSize:11, fontWeight:700, color:T.lo, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:6 }}>Vietnamese</p>
          <p style={{ fontSize:38, fontWeight:800, color:T.orange, marginBottom:20, lineHeight:1.15, letterSpacing:'-0.01em' }}>
            {word.vietnamese}
          </p>
          <div style={{ background:T.bg, borderRadius:14, padding:'12px 16px', marginBottom:10, border:`1px solid ${T.outline}` }}>
            <p style={{ fontSize:10, fontWeight:700, color:T.lo, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:4 }}>Part of speech</p>
            <p style={{ fontSize:14, fontWeight:600, color:T.navy }}>{word.pos}</p>
          </div>
          <div style={{ background:T.orangeL, borderRadius:14, padding:'12px 16px', border:'1px solid #FFCCBC' }}>
            <p style={{ fontSize:10, fontWeight:700, color:T.orange, textTransform:'uppercase', letterSpacing:'.1em', marginBottom:4 }}>Example</p>
            <p style={{ fontSize:13, color:T.med, fontStyle:'italic', lineHeight:1.65 }}>{word.example}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   QuizMode
═══════════════════════════════════════════════════════════════ */
const QuizMode = ({ word, correctAnswer, options, onAnswer, answered, selectedAnswer }) => (
  <div className="fade-up rounded-3xl p-6 md:p-10 shadow-md"
    style={{ background:T.surface, border:`1.5px solid ${T.outline}`, minHeight:340 }}>
    <div style={{ textAlign:'center', marginBottom:28 }}>
      <span style={{ background:T.orangeL, color:T.orange, borderRadius:20, padding:'4px 14px', fontSize:11, fontWeight:700, letterSpacing:'.05em' }}>
        ⚡ Quiz Mode
      </span>
      <p style={{ fontSize:34, fontWeight:800, color:T.hi, marginTop:16, marginBottom:6, lineHeight:1.2, letterSpacing:'-0.01em' }}>
        {word.vietnamese}
      </p>
      <p style={{ fontSize:13, color:T.lo, fontWeight:500 }}>Choose the correct English word</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option, idx) => {
        const isCorrect = option === correctAnswer;
        const isSelected = option === selectedAnswer;
        let bg = T.bg, border = T.outline, color = T.hi;
        if (answered) {
          if (isCorrect)       { bg='#E8F5E9'; border='#66BB6A'; color='#2E7D32'; }
          else if (isSelected) { bg='#FFEBEE'; border='#EF5350'; color='#C62828'; }
          else                 { bg=T.bg; border=T.outline; color=T.lo; }
        }
        return (
          <button
            key={idx}
            onClick={() => !answered && onAnswer(option)}
            disabled={answered}
            style={{
              padding:'14px 16px', borderRadius:14, fontSize:14, fontWeight:600,
              textAlign:'left', background:bg, border:`1.5px solid ${border}`, color,
              cursor:answered?'default':'pointer', transition:'all .15s',
              boxShadow: answered && isCorrect ? '0 0 0 3px rgba(102,187,106,.2)' : 'none',
            }}
            onMouseEnter={e => { if (!answered) { e.currentTarget.style.borderColor=T.blue; e.currentTarget.style.background=T.blueL; } }}
            onMouseLeave={e => { if (!answered) { e.currentTarget.style.borderColor=T.outline; e.currentTarget.style.background=T.bg; } }}
          >
            <span style={{ opacity:.4, fontSize:11, fontWeight:700, marginRight:8 }}>
              {String.fromCharCode(65+idx)}.
            </span>
            {option}
          </button>
        );
      })}
    </div>

    {answered && (
      <p className="fade-up" style={{ textAlign:'center', marginTop:20, fontSize:14, fontWeight:700, color: selectedAnswer===correctAnswer?'#2E7D32':'#C62828' }}>
        {selectedAnswer===correctAnswer ? '🎉 Correct! Well done!' : `❌ Correct answer: ${correctAnswer}`}
      </p>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   TopicCard
═══════════════════════════════════════════════════════════════ */
const TopicCard = ({ onClick, title, sub, tags }) => (
  <button
    onClick={onClick}
    style={{
      display:'block', width:'100%', textAlign:'left', padding:'18px 20px', borderRadius:16,
      background:T.surface, border:`1.5px solid ${T.outline}`, cursor:'pointer',
      boxShadow:'0 1px 3px rgba(0,0,0,.08)', transition:'all .18s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor=T.blue; e.currentTarget.style.boxShadow=`0 4px 14px rgba(21,101,192,.14)`; e.currentTarget.style.transform='translateY(-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor=T.outline; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.08)'; e.currentTarget.style.transform='translateY(0)'; }}
  >
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: tags?12:0 }}>
      <div>
        <p style={{ fontWeight:700, fontSize:15, color:T.hi, marginBottom:3 }}>{title}</p>
        <p style={{ fontSize:13, color:T.med, fontWeight:500 }}>{sub}</p>
      </div>
      <div style={{ width:32, height:32, borderRadius:10, background:T.blueL, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <ChevronRight style={{ width:15, height:15, color:T.blue }} />
      </div>
    </div>
    {tags && (
      <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
        {tags.map(t => (
          <span key={t} style={{ background:T.blueL, color:T.blue, borderRadius:20, padding:'2px 10px', fontSize:11, fontWeight:600 }}>{t}</span>
        ))}
      </div>
    )}
  </button>
);

/* ═══════════════════════════════════════════════════════════════
   ActionBtn
═══════════════════════════════════════════════════════════════ */
const ActionBtn = ({ onClick, icon: Icon, label, active, activeBg }) => (
  <button
    onClick={onClick}
    style={{
      flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6,
      padding:'12px 4px', borderRadius:14, fontSize:11, fontWeight:700, cursor:'pointer',
      transition:'all .15s',
      background: active ? activeBg : T.surface,
      color: active ? '#FFF' : T.med,
      border: active ? 'none' : `1.5px solid ${T.outline}`,
      boxShadow: active ? '0 4px 12px rgba(0,0,0,.15)' : '0 1px 3px rgba(0,0,0,.06)',
    }}
    onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor=T.blue; e.currentTarget.style.color=T.blue; } }}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor=T.outline; e.currentTarget.style.color=T.med; } }}
  >
    <Icon style={{ width:16, height:16 }} />
    {label}
  </button>
);

/* ═══════════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════════ */
export default function VocabularyPractice() {
  const [vocabularyData, setVocabularyData] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [currentWords, setCurrentWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [favorited, setFavorited] = useState(new Set());
  const [learned, setLearned] = useState(new Set());
  const [masteredWords, setMasteredWords] = useState(new Set());
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quizMode, setQuizMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  /* load data */
  useEffect(() => {
    (async () => {
      try {
        const { vocabularyData: vData } = await import('../../data/vocabularyData');
        setVocabularyData(vData);
      } catch {
        setVocabularyData({
          'Daily Life': {
            'Household': [
              { word:'furniture', phonetic:'/ˈfɜːrnɪtʃər/', vietnamese:'đồ nội thất', pos:'noun', example:'The furniture in her apartment was modern.', level:'A2' },
              { word:'appliance', phonetic:'/əˈplaɪəns/', vietnamese:'thiết bị gia dụng', pos:'noun', example:'The kitchen appliances were all stainless steel.', level:'B1' },
              { word:'curtain', phonetic:'/ˈkɜːrtn/', vietnamese:'rèm cửa', pos:'noun', example:'She drew the curtains to block out the sunlight.', level:'A2' },
            ],
            'Food & Cooking': [
              { word:'ingredient', phonetic:'/ɪnˈɡriːdiənt/', vietnamese:'nguyên liệu', pos:'noun', example:'The recipe requires only five simple ingredients.', level:'A2' },
              { word:'marinate', phonetic:'/ˈmærɪneɪt/', vietnamese:'ướp', pos:'verb', example:'Marinate the chicken overnight for best flavor.', level:'B1' },
            ],
          },
          'Academic': {
            'Science': [
              { word:'hypothesis', phonetic:'/haɪˈpɒθɪsɪs/', vietnamese:'giả thuyết', pos:'noun', example:'Scientists tested their hypothesis through careful experiments.', level:'B2' },
              { word:'phenomenon', phonetic:'/fɪˈnɒmɪnən/', vietnamese:'hiện tượng', pos:'noun', example:'The aurora borealis is a stunning natural phenomenon.', level:'B2' },
            ],
          },
        });
      }
      setDataLoaded(true);
    })();
  }, []);

  const topics = useMemo(() => Object.keys(vocabularyData), [vocabularyData]);

  const displayedWords = useMemo(() => {
    if (!searchQuery.trim()) return currentWords;
    const q = searchQuery.toLowerCase();
    return currentWords.filter(w =>
      w.word.toLowerCase().includes(q) || w.vietnamese.toLowerCase().includes(q) || w.example.toLowerCase().includes(q)
    );
  }, [searchQuery, currentWords]);

  const currentWord = displayedWords[currentIndex];

  const doShuffle = (arr) => {
    const s = [...arr];
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
  };

  const generateQuizOptions = useCallback((idx, list) => {
    const words = list || displayedWords;
    const correct = words[idx]?.word;
    if (!correct) return;
    const others = words.filter((_, i) => i !== idx).sort(() => .5 - Math.random()).slice(0, 3).map(w => w.word);
    setQuizCorrectAnswer(correct);
    setQuizOptions(doShuffle([correct, ...others]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedWords]);

  const navigate = useCallback((dir) => {
    const next = currentIndex + dir;
    if (next < 0 || next >= displayedWords.length) return;
    setCurrentIndex(next); setIsFlipped(false); setQuizAnswered(false); setSelectedAnswer(null);
    generateQuizOptions(next);
  }, [currentIndex, displayedWords.length, generateQuizOptions]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === ' ' && currentWords.length) { e.preventDefault(); setIsFlipped(f => !f); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [navigate, currentWords.length]);

  const toggle = (set, setFn, key) => { const n = new Set(set); n.has(key) ? n.delete(key) : n.add(key); setFn(n); };

  const handleSelectSubtopic = (sub) => {
    const words = vocabularyData[selectedTopic][sub];
    setSelectedSubtopic(sub); setCurrentWords(words); setCurrentIndex(0);
    setIsFlipped(false); setQuizMode(false); setSearchQuery('');
  };

  const startQuiz = () => {
    setQuizMode(true); setQuizScore(0); setCurrentIndex(0);
    setQuizAnswered(false); setSelectedAnswer(null); generateQuizOptions(0);
  };

  const handleQuizAnswer = (opt) => {
    setSelectedAnswer(opt); setQuizAnswered(true);
    if (opt === quizCorrectAnswer) {
      setQuizScore(s => s + 1);
      setMasteredWords(p => { const n = new Set(p); n.add(currentWord.word); return n; });
    }
  };

  const speak = () => {
    if (!currentWord || !('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(currentWord.word);
    u.lang = 'en-US'; window.speechSynthesis.speak(u);
  };

  const stats = useMemo(() => ({
    total: currentWords.length,
    mastered: [...masteredWords].filter(w => currentWords.some(c => c.word === w)).length,
    learned: [...learned].filter(w => currentWords.some(c => c.word === w)).length,
    favorited: [...favorited].filter(w => currentWords.some(c => c.word === w)).length,
    remaining: currentWords.length - [...masteredWords].filter(w => currentWords.some(c => c.word === w)).length,
  }), [currentWords, masteredWords, learned, favorited]);

  const progress = displayedWords.length > 0 ? ((currentIndex + 1) / displayedWords.length) * 100 : 0;
  const isFav = currentWord && favorited.has(currentWord.word);
  const isLrn = currentWord && learned.has(currentWord.word);
  const isMst = currentWord && masteredWords.has(currentWord.word);

  /* ─── Render ──────────────────────────────────────────────── */
  return (
    <div style={{ minHeight:'100vh', background:T.bg }}>
      <Styles />

      {/* App Bar */}
      <header style={{
        background:T.surface, borderBottom:`1px solid ${T.outline}`,
        position:'sticky', top:0, zIndex:50, boxShadow:'0 1px 4px rgba(0,0,0,.08)',
      }}>
        <div style={{ maxWidth:720, margin:'0 auto', padding:'0 16px', height:60, display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:38, height:38, borderRadius:11, background:`linear-gradient(135deg,${T.navy},${T.blue})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 2px 8px rgba(26,35,126,.3)` }}>
            <GraduationCap style={{ width:20, height:20, color:'#FFF' }} />
          </div>
          <div style={{ flex:1 }}>
            <p style={{ fontWeight:800, fontSize:16, color:T.hi, lineHeight:1.1 }}>Vocabulary Master</p>
            <p style={{ fontSize:11, color:T.med, fontWeight:500 }}>A1 → C2 · Smart Learning</p>
          </div>
          {/* breadcrumb chip */}
          {selectedTopic && (
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              {selectedSubtopic && (
                <span style={{ background:T.blueL, color:T.blue, borderRadius:20, padding:'3px 12px', fontSize:12, fontWeight:700 }}>
                  {selectedSubtopic}
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      <main style={{ maxWidth:720, margin:'0 auto', padding:'24px 16px 80px' }}>

        {/* Loading */}
        {!dataLoaded && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:100, gap:16 }}>
            <div className="spin" style={{ width:40, height:40, borderRadius:'50%', border:`3px solid ${T.outline}`, borderTopColor:T.blue }} />
            <p style={{ color:T.med, fontSize:14 }}>Loading vocabulary data…</p>
          </div>
        )}

        {/* ── Topic List ── */}
        {dataLoaded && !selectedTopic && (
          <div className="fade-up">
            <div style={{ marginBottom:24 }}>
              <p style={{ fontSize:24, fontWeight:800, color:T.hi, marginBottom:4, letterSpacing:'-0.01em' }}>Choose a Topic</p>
              <p style={{ fontSize:14, color:T.med }}>Select a category to start learning</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topics.map(topic => (
                <TopicCard
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  title={topic}
                  sub={`${Object.keys(vocabularyData[topic] || {}).length} subtopics`}
                  tags={Object.keys(vocabularyData[topic] || {}).slice(0, 3)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Subtopic List ── */}
        {dataLoaded && selectedTopic && !selectedSubtopic && vocabularyData[selectedTopic] && (
          <div className="fade-up">
            <button onClick={() => setSelectedTopic(null)} style={{ display:'flex', alignItems:'center', gap:4, color:T.blue, fontWeight:600, fontSize:14, marginBottom:20, background:'none', border:'none', cursor:'pointer', padding:0 }}>
              <ChevronLeft style={{ width:16, height:16 }} /> All Topics
            </button>
            <p style={{ fontSize:24, fontWeight:800, color:T.hi, marginBottom:4 }}>{selectedTopic}</p>
            <p style={{ fontSize:14, color:T.med, marginBottom:20 }}>Select a subtopic to study</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(vocabularyData[selectedTopic]).map(sub => (
                <TopicCard
                  key={sub}
                  onClick={() => handleSelectSubtopic(sub)}
                  title={sub}
                  sub={`${vocabularyData[selectedTopic][sub]?.length || 0} words`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Learning Interface ── */}
        {currentWords.length > 0 && currentWord && (
          <div className="fade-up">

            {/* Top bar */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
              <button
                onClick={() => { setSelectedSubtopic(null); setCurrentWords([]); setSearchQuery(''); setQuizMode(false); }}
                style={{ display:'flex', alignItems:'center', gap:4, color:T.blue, fontWeight:600, fontSize:14, background:'none', border:'none', cursor:'pointer', padding:0 }}
              >
                <ChevronLeft style={{ width:16, height:16 }} /> {selectedSubtopic}
              </button>

              <div style={{ display:'flex', gap:8 }}>
                {[
                  { label:'Stats', icon:BarChart3, active:showStats, setFn:()=>{ setShowStats(s=>!s); setShowSettings(false); }, activeColor:T.blue, activeBg:T.blueL },
                  { label:'Settings', icon:Settings, active:showSettings, setFn:()=>{ setShowSettings(s=>!s); setShowStats(false); }, activeColor:T.orange, activeBg:T.orangeL },
                ].map(({ label, icon:Icon, active, setFn, activeColor, activeBg }) => (
                  <button
                    key={label}
                    onClick={setFn}
                    style={{
                      display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:10,
                      fontSize:13, fontWeight:700, cursor:'pointer', transition:'all .15s',
                      background: active ? activeBg : T.surface,
                      color: active ? activeColor : T.med,
                      border: `1.5px solid ${active ? activeColor : T.outline}`,
                      boxShadow:'0 1px 3px rgba(0,0,0,.06)',
                    }}
                  >
                    <Icon style={{ width:14, height:14 }} /> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="fade-up" style={{ background:T.orangeL, border:`1.5px solid #FFCCBC`, borderRadius:16, padding:'18px 20px', marginBottom:14 }}>
                <p style={{ fontWeight:700, fontSize:13, color:T.orange, marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>
                  <Settings style={{ width:14, height:14 }} /> Settings
                </p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {[
                    { label:'Shuffle', icon:Shuffle, bg:T.blue, color:'#FFF', fn:()=>{ setCurrentWords(w=>doShuffle(w)); setCurrentIndex(0); } },
                    { label:'Restart', icon:RotateCcw, bg:T.surface, color:T.med, fn:()=>{ setCurrentIndex(0); setIsFlipped(false); }, border:T.outline },
                    { label:'Clear Progress', icon:Trash2, bg:'#FFEBEE', color:'#C62828', fn:()=>{ if(window.confirm('Clear all progress?')){ setFavorited(new Set()); setLearned(new Set()); setMasteredWords(new Set()); } }, border:'#FFCDD2' },
                  ].map(({ label, icon:Icon, bg, color, fn, border }) => (
                    <button key={label} onClick={fn} style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', background:bg, color, border:`1.5px solid ${border||'transparent'}`, transition:'opacity .15s' }}
                      onMouseEnter={e=>e.currentTarget.style.opacity='.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                      <Icon style={{ width:14, height:14 }} /> {label}
                    </button>
                  ))}
                </div>
                <p style={{ marginTop:14, fontSize:12, color:T.med }}>
                  <kbd style={{ background:T.surface, border:`1px solid ${T.outline}`, borderRadius:5, padding:'1px 6px', fontFamily:'monospace', fontSize:11 }}>←</kbd>{' '}
                  <kbd style={{ background:T.surface, border:`1px solid ${T.outline}`, borderRadius:5, padding:'1px 6px', fontFamily:'monospace', fontSize:11 }}>→</kbd>{' '}
                  Navigate &nbsp;·&nbsp;
                  <kbd style={{ background:T.surface, border:`1px solid ${T.outline}`, borderRadius:5, padding:'1px 6px', fontFamily:'monospace', fontSize:11 }}>Space</kbd>{' '}
                  Flip card
                </p>
              </div>
            )}

            {/* Stats Panel */}
            {showStats && (
              <div className="fade-up grid grid-cols-2 sm:grid-cols-5 gap-3" style={{ marginBottom:14 }}>
                {[
                  { v:stats.total,     l:'Total',     grad:`linear-gradient(135deg,${T.navy},${T.blue})`,    Icon:BookOpen },
                  { v:stats.mastered,  l:'Mastered',  grad:`linear-gradient(135deg,${T.orange},#FF6D00)`,   Icon:Trophy },
                  { v:stats.learned,   l:'Learned',   grad:`linear-gradient(135deg,#1E88E5,#42A5F5)`,       Icon:CheckCircle },
                  { v:stats.favorited, l:'Favorites', grad:`linear-gradient(135deg,#E53935,#F48FB1)`,        Icon:Heart },
                  { v:stats.remaining, l:'Remaining', flat:true },
                ].map(({ v, l, grad, flat, Icon }) => (
                  <div key={l} style={{
                    background: flat?T.surface:grad, borderRadius:16, padding:'16px 10px', textAlign:'center',
                    boxShadow: flat?`0 1px 3px rgba(0,0,0,.08)`:'0 4px 14px rgba(0,0,0,.14)',
                    border: flat?`1.5px solid ${T.outline}`:'none',
                  }}>
                    {Icon && <Icon style={{ width:15, height:15, color:flat?T.med:'rgba(255,255,255,.8)', margin:'0 auto 6px', display:'block' }} />}
                    <p style={{ fontSize:26, fontWeight:800, color:flat?T.hi:'#FFF', lineHeight:1 }}>{v}</p>
                    <p style={{ fontSize:11, color:flat?T.med:'rgba(255,255,255,.75)', marginTop:3, fontWeight:600 }}>{l}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Search */}
            <div style={{ position:'relative', marginBottom:16 }}>
              <Search style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', width:15, height:15, color:T.lo }} />
              <input
                type="search"
                placeholder="Search words or meanings…"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
                style={{ width:'100%', padding:'11px 40px', borderRadius:12, border:`1.5px solid ${T.outline}`, background:T.surface, color:T.hi, fontSize:14, outline:'none', boxShadow:'0 1px 3px rgba(0,0,0,.06)', transition:'border .15s, box-shadow .15s' }}
                onFocus={e => { e.target.style.borderColor=T.blue; e.target.style.boxShadow=`0 0 0 3px rgba(21,101,192,.1)`; }}
                onBlur={e => { e.target.style.borderColor=T.outline; e.target.style.boxShadow='0 1px 3px rgba(0,0,0,.06)'; }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:T.lo, padding:4, display:'flex' }}>
                  <X style={{ width:15, height:15 }} />
                </button>
              )}
            </div>

            {/* Progress */}
            <div style={{ marginBottom:20 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <span style={{ fontSize:13, fontWeight:700, color:T.med }}>{currentIndex+1} <span style={{ color:T.lo }}>/ {displayedWords.length}</span></span>
                {quizMode && (
                  <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:700, color:T.orange }}>
                    <Trophy style={{ width:12, height:12 }} /> {quizScore} pts
                  </span>
                )}
                <span style={{ fontSize:13, fontWeight:800, color:T.blue }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height:6, borderRadius:9999, background:'#E8EAED', overflow:'hidden', boxShadow:'inset 0 1px 2px rgba(0,0,0,.06)' }}>
                <div style={{
                  height:'100%', borderRadius:9999, transition:'width .5s cubic-bezier(.4,0,.2,1)',
                  width:`${progress}%`,
                  background:`linear-gradient(90deg,${T.navy} 0%,${T.blue} 50%,${T.orange} 100%)`,
                }} />
              </div>
            </div>

            {/* Card or Quiz */}
            {quizMode
              ? <QuizMode word={currentWord} correctAnswer={quizCorrectAnswer} options={quizOptions} onAnswer={handleQuizAnswer} answered={quizAnswered} selectedAnswer={selectedAnswer} />
              : <VocabCard word={currentWord} flipped={isFlipped} onFlip={() => setIsFlipped(f => !f)} />
            }

            {/* Navigation */}
            <div style={{ marginTop:20 }}>
              {/* Prev / Quiz / Next */}
              <div className="grid grid-cols-3 gap-3" style={{ marginBottom:10 }}>
                <button
                  onClick={() => navigate(-1)}
                  disabled={currentIndex === 0}
                  style={{
                    padding:'14px 0', borderRadius:14, fontSize:14, fontWeight:700, cursor: currentIndex===0?'not-allowed':'pointer',
                    background:T.surface, color:T.med, border:`1.5px solid ${T.outline}`,
                    boxShadow:'0 1px 3px rgba(0,0,0,.06)', opacity:currentIndex===0?.4:1,
                    display:'flex', alignItems:'center', justifyContent:'center', gap:4, transition:'all .15s',
                  }}
                  onMouseEnter={e => { if(currentIndex>0){ e.currentTarget.style.borderColor=T.blue; } }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=T.outline; }}
                >
                  <ChevronLeft style={{ width:16, height:16 }} /> Prev
                </button>

                <button
                  onClick={quizMode ? ()=>{ setQuizMode(false); setQuizAnswered(false); setSelectedAnswer(null); } : startQuiz}
                  style={{
                    padding:'14px 0', borderRadius:14, fontSize:14, fontWeight:800, cursor:'pointer',
                    background: quizMode ? `linear-gradient(135deg,#5F6368,#9AA0A6)` : `linear-gradient(135deg,${T.orange},#FF6D00)`,
                    color:'#FFF', border:'none',
                    boxShadow: quizMode ? '0 2px 8px rgba(0,0,0,.15)' : `0 4px 14px rgba(230,81,0,.3)`,
                    display:'flex', alignItems:'center', justifyContent:'center', gap:6, transition:'opacity .15s',
                  }}
                  onMouseEnter={e=>e.currentTarget.style.opacity='.9'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}
                >
                  <Zap style={{ width:15, height:15 }} />
                  {quizMode ? 'Stop' : 'Quiz'}
                </button>

                <button
                  onClick={() => navigate(1)}
                  disabled={currentIndex === displayedWords.length - 1}
                  style={{
                    padding:'14px 0', borderRadius:14, fontSize:14, fontWeight:800, cursor: currentIndex===displayedWords.length-1?'not-allowed':'pointer',
                    background:`linear-gradient(135deg,${T.navy},${T.blue})`, color:'#FFF', border:'none',
                    boxShadow:`0 4px 14px rgba(21,101,192,.25)`,
                    opacity: currentIndex===displayedWords.length-1?.4:1,
                    display:'flex', alignItems:'center', justifyContent:'center', gap:4, transition:'opacity .15s',
                  }}
                  onMouseEnter={e => { if(currentIndex<displayedWords.length-1) e.currentTarget.style.opacity='.9'; }}
                  onMouseLeave={e => e.currentTarget.style.opacity = currentIndex===displayedWords.length-1?'0.4':'1'}
                >
                  Next <ChevronRight style={{ width:16, height:16 }} />
                </button>
              </div>

              {/* Action Row */}
              <div style={{ display:'flex', gap:8 }}>
                <ActionBtn onClick={()=>currentWord&&toggle(favorited,setFavorited,currentWord.word)} icon={Heart}        label="Favorite" active={isFav} activeBg="#E53935" />
                <ActionBtn onClick={()=>currentWord&&toggle(learned,setLearned,currentWord.word)}     icon={BookOpen}     label="Learned"  active={isLrn} activeBg={`linear-gradient(135deg,${T.navy},${T.blue})`} />
                <ActionBtn onClick={()=>currentWord&&toggle(masteredWords,setMasteredWords,currentWord.word)} icon={CheckCircle} label="Mastered" active={isMst} activeBg={`linear-gradient(135deg,${T.orange},#FF6D00)`} />
                <ActionBtn onClick={speak}                                                             icon={Volume2}      label="Speak"    active={false} />
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}