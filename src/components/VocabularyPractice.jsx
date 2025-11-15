// src/pages/VocabularyPractice.jsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSpeech } from '../components/hooks/useSpeech';
import { vocabularyData } from '../data/vocabularyData';
import {
  SpeakerWaveIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  LanguageIcon,
  PlayIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  AdjustmentsHorizontalIcon,
  MoonIcon,
  SunIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ITEMS_PER_PAGE = 100;

// --- UI TEXT (VI/EN) ---
const UI_TEXT = {
  en: {
    title: 'Vocabulary Practice',
    searchPlaceholder: 'Search word, meaning, or example...',
    filters: 'Filters',
    reset: 'Reset All',
    allLevels: 'All Levels',
    allTopics: 'All Topics',
    showing: 'Showing',
    of: 'of',
    words: 'words',
    page: 'Page',
    topic: 'Topic',
    totalInDB: 'Total in database',
    flashcardMode: 'Flashcard Mode',
    quizMode: 'Quiz Mode',
    gridMode: 'Grid Mode',
    favorite: 'Favorite',
    playWord: 'Play word',
    playSentence: 'Play sentence',
    showAnswer: 'Show Answer',
    next: 'Next',
    score: 'Score',
    correct: 'Correct!',
    wrong: 'Wrong!',
    finish: 'Finish Quiz',
    switchLang: 'Tiếng Việt',
    voiceSettings: 'Voice Settings',
    rate: 'Speed',
    pitch: 'Pitch',
    noVoice: 'Speech not supported.',
    voiceError: 'Speech error. Try refreshing.',
    darkMode: 'Dark Mode',
    exportPDF: 'Export PDF',
    learned: 'Learned',
    notLearned: 'Not Learned',
    showOnlyNotLearned: 'Show only not learned',
    clearLearned: 'Clear Learned',
    progress: 'Progress',
    mastered: 'Mastered',
    studying: 'Studying',
    new: 'New',
  },
  vi: {
    title: 'Luyện Từ Vựng',
    searchPlaceholder: 'Tìm từ, nghĩa hoặc ví dụ...',
    filters: 'Bộ lọc',
    reset: 'Đặt lại',
    allLevels: 'Tất cả cấp độ',
    allTopics: 'Tất cả chủ đề',
    showing: 'Hiển thị',
    of: 'trong',
    words: 'từ',
    page: 'Trang',
    topic: 'Chủ đề',
    totalInDB: 'Tổng trong CSDL',
    flashcardMode: 'Chế độ Thẻ',
    quizMode: 'Chế độ Trắc nghiệm',
    gridMode: 'Chế độ Lưới',
    favorite: 'Yêu thích',
    playWord: 'Phát từ',
    playSentence: 'Phát câu ví dụ',
    showAnswer: 'Hiện đáp án',
    next: 'Tiếp theo',
    score: 'Điểm',
    correct: 'Đúng!',
    wrong: 'Sai!',
    finish: 'Hoàn thành',
    switchLang: 'English',
    voiceSettings: 'Cài đặt giọng nói',
    rate: 'Tốc độ',
    pitch: 'Âm điệu',
    noVoice: 'Trình duyệt không hỗ trợ phát âm.',
    voiceError: 'Lỗi phát âm. Vui lòng tải lại trang.',
    darkMode: 'Chế độ tối',
    exportPDF: 'Xuất PDF',
    learned: 'Đã học',
    notLearned: 'Chưa học',
    showOnlyNotLearned: 'Chỉ hiện từ chưa học',
    clearLearned: 'Xóa danh sách đã học',
    progress: 'Tiến độ',
    mastered: 'Thành thạo',
    studying: 'Đang học',
    new: 'Mới',
  },
};

// --- LOCAL STORAGE KEYS ---
const STORAGE_KEYS = {
  FAVORITES: 'vocab_favorites',
  LEARNED: 'vocab_learned',
  DARK_MODE: 'vocab_dark_mode',
  LANG: 'vocab_lang',
};

const VocabularyPractice = () => {
  // --- Speech ---
  const {
    speak,
    stop,
    playingId,
    sentenceId,
    isSupported,
    error,
    rate,
    setRate,
    pitch,
    setPitch,
  } = useSpeech();

  // --- App State ---
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE_KEYS.LANG) || 'vi');
  const t = UI_TEXT[lang];
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return saved ? JSON.parse(saved) : false;
  });
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showOnlyNotLearned, setShowOnlyNotLearned] = useState(false);

  // --- User Data ---
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return saved ? JSON.parse(saved) : [];
  });
  const [learned, setLearned] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEARNED);
    return saved ? JSON.parse(saved) : [];
  });
  const [flippedCards, setFlippedCards] = useState({});
  const [quizState, setQuizState] = useState(null);

  // --- Data ---
  const topics = useMemo(() => Object.keys(vocabularyData), []);

  // --- Filtered Words ---
  const filteredWords = useMemo(() => {
    let words = [];

    if (selectedTopic && selectedSubtopic) {
      words = vocabularyData[selectedTopic]?.[selectedSubtopic] || [];
    } else if (selectedTopic) {
      Object.values(vocabularyData[selectedTopic] || {}).forEach(arr => words.push(...arr));
    } else {
      Object.values(vocabularyData).forEach(topicObj =>
        Object.values(topicObj).forEach(arr => words.push(...arr))
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      words = words.filter(w =>
        w.word.toLowerCase().includes(term) ||
        w.vietnamese.toLowerCase().includes(term) ||
        w.example.toLowerCase().includes(term)
      );
    }

    if (selectedLevel !== 'all') {
      words = words.filter(w => w.level === selectedLevel);
    }

    if (showOnlyNotLearned) {
      words = words.filter(w => !learned.includes(w.word));
    }

    return words.sort((a, b) => a.word.localeCompare(b.word));
  }, [selectedTopic, selectedSubtopic, searchTerm, selectedLevel, showOnlyNotLearned, learned]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredWords.length / ITEMS_PER_PAGE);
  const paginatedWords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredWords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredWords, currentPage]);

  // --- Effects ---
  useEffect(() => setCurrentPage(1), [filteredWords.length]);
  useEffect(() => setSelectedSubtopic(''), [selectedTopic]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.LANG, lang), [lang]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode)), [darkMode]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.LEARNED, JSON.stringify(learned)), [learned]);

  // --- Dark Mode ---
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // --- Actions ---
  const toggleFavorite = (word) => {
    setFavorites(prev => prev.includes(word) ? prev.filter(f => f !== word) : [...prev, word]);
  };

  const toggleLearned = (word) => {
    setLearned(prev => prev.includes(word) ? prev.filter(f => f !== word) : [...prev, word]);
  };

  const clearLearned = () => {
    if (confirm(lang === 'vi' ? 'Xóa toàn bộ từ đã học?' : 'Clear all learned words?')) {
      setLearned([]);
    }
  };

  const resetFilters = () => {
    setSelectedTopic('');
    setSelectedSubtopic('');
    setSearchTerm('');
    setSelectedLevel('all');
    setShowOnlyNotLearned(false);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- Flashcard ---
  const flipCard = useCallback((idx) => {
    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx;
    setFlippedCards(prev => ({ ...prev, [globalIndex]: !prev[globalIndex] }));
    if (!flippedCards[globalIndex]) {
      speak(paginatedWords[idx].word, globalIndex, 'en');
    }
  }, [currentPage, flippedCards, paginatedWords, speak]);

  // --- Quiz ---
  const startQuiz = useCallback(() => {
    if (filteredWords.length < 4) return alert(t.wrong + ' Cần ít nhất 4 từ.');
    const shuffled = [...filteredWords].sort(() => Math.random() - 0.5);
    const question = shuffled[0];
    const options = [question];
    while (options.length < 4) {
      const rand = filteredWords[Math.floor(Math.random() * filteredWords.length)];
      if (!options.includes(rand)) options.push(rand);
    }
    setQuizState({
      question,
      options: options.sort(() => Math.random() - 0.5),
      selected: null,
      showResult: false,
      score: 0,
      total: 0,
    });
  }, [filteredWords, t]);

  const selectAnswer = (opt) => {
    if (quizState.showResult) return;
    const isCorrect = opt.word === quizState.question.word;
    setQuizState(prev => ({
      ...prev,
      selected: opt,
      showResult: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      total: prev.total + 1,
    }));
  };

  const nextQuestion = useCallback(() => {
    const used = quizState.options.map(o => o.word);
    const remaining = filteredWords.filter(w => !used.includes(w.word));
    if (remaining.length < 3) {
      alert(`${t.finish}! ${t.score}: ${quizState.score}/${quizState.total}`);
      setQuizState(null);
      return;
    }
    const question = remaining[0];
    const options = [question];
    while (options.length < 4) {
      const rand = filteredWords[Math.floor(Math.random() * filteredWords.length)];
      if (!options.includes(rand)) options.push(rand);
    }
    setQuizState(prev => ({
      ...prev,
      question,
      options: options.sort(() => Math.random() - 0.5),
      selected: null,
      showResult: false,
    }));
  }, [filteredWords, quizState, t]);

  // --- Audio ---
  const playWord = (word, id) => speak(word, id, 'en');
  const playSentence = (sentence, id) => speak(sentence, id, 'en', true);
  const playVietnamese = (text, id) => speak(text, id, 'vi');

  // --- Export PDF ---
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.text(t.title, 14, 20);

    const tableData = filteredWords.map(w => [
      w.word,
      w.phonetic,
      w.vietnamese,
      w.example,
      w.level,
    ]);

    doc.autoTable({
      head: [['Word', 'Phonetic', 'Vietnamese', 'Example', 'Level']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [79, 70, 229] },
    });

    doc.save('vocabulary-practice.pdf');
  };

  // --- Progress Stats ---
  const totalWords = Object.values(vocabularyData).flatMap(t => Object.values(t).flat()).length;
  const learnedCount = learned.length;
  const favoriteCount = favorites.length;
  const progressPercent = totalWords > 0 ? Math.round((learnedCount / totalWords) * 100) : 0;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 pt-6">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-800'} mb-2`}>{t.title}</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.showing} <strong className="text-indigo-500">{filteredWords.length}</strong> {t.words} • {t.page} {currentPage} {t.of} {totalPages || 1}
          </p>
        </header>

        {/* Top Bar */}
        <div className={`flex flex-wrap justify-between items-center gap-3 mb-4 p-3 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <div className="flex gap-2">
            <button onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm">
              <LanguageIcon className="h-4 w-4" /> {t.switchLang}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              {darkMode ? <SunIcon className="h-5 w-5 text-yellow-500" /> : <MoonIcon className="h-5 w-5 text-gray-700" />}
            </button>
            <button onClick={exportToPDF} className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm">
              <ArrowDownTrayIcon className="h-4 w-4" /> {t.exportPDF}
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              <span>{learnedCount} {t.learned}</span>
            </div>
            <div className="flex items-center gap-1">
              <HeartIcon className="h-5 w-5 text-red-500" />
              <span>{favoriteCount} {t.favorite}</span>
            </div>
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-xs">{progressPercent}%</span>
          </div>
        </div>

        {/* Filters & Controls */}
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6`}>
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setViewMode(viewMode === 'grid' ? 'flashcard' : 'grid')} className={`px-4 py-2.5 rounded-lg text-sm font-medium ${viewMode === 'flashcard' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                {t.flashcardMode}
              </button>
              <button onClick={() => viewMode === 'quiz' ? setQuizState(null) : startQuiz()} className={`px-4 py-2.5 rounded-lg text-sm font-medium ${viewMode === 'quiz' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                {viewMode === 'quiz' ? <XMarkIcon className="h-5 w-5" /> : t.quizMode}
              </button>
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium">
                <FunnelIcon className="h-5 w-5" /> {t.filters}
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showOnlyNotLearned} onChange={(e) => setShowOnlyNotLearned(e.target.checked)} className="rounded" />
                <span className="text-sm">{t.showOnlyNotLearned}</span>
              </label>
              <button onClick={clearLearned} className="px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-xs flex items-center gap-1">
                <TrashIcon className="h-4 w-4" /> {t.clearLearned}
              </button>
              {(selectedTopic || selectedSubtopic || selectedLevel !== 'all' || searchTerm || showOnlyNotLearned) && (
                <button onClick={resetFilters} className="px-4 py-2.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium">
                  {t.reset}
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 rounded-lg text-sm">
                <option value="all">{t.allLevels}</option>
                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className="px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 rounded-lg text-sm">
                <option value="">{t.allTopics}</option>
                {topics.map(topic => <option key={topic} value={topic}>{topic}</option>)}
              </select>
              {selectedTopic && (
                <div className="flex gap-2 flex-wrap col-span-2">
                  {Object.keys(vocabularyData[selectedTopic]).map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubtopic(selectedSubtopic === sub ? '' : sub)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedSubtopic === sub ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Voice Settings */}
        <button onClick={() => setShowVoiceSettings(!showVoiceSettings)} className="w-full mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="h-5 w-5" /> {t.voiceSettings}
          </span>
          <ChevronDownIcon className={`h-5 w-5 transition-transform ${showVoiceSettings ? 'rotate-180' : ''}`} />
        </button>
        {showVoiceSettings && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t.rate} ({rate.toFixed(1)})</label>
                <input type="range" min="0.5" max="1.5" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t.pitch} ({pitch.toFixed(1)})</label>
                <input type="range" min="0.5" max="1.5" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg" />
              </div>
            </div>
            {!isSupported && <p className="mt-3 text-sm text-red-600 flex items-center gap-1"><ExclamationTriangleIcon className="h-4 w-4" /> {t.noVoice}</p>}
            {error && <p className="mt-3 text-sm text-red-600 flex items-center gap-1"><ExclamationTriangleIcon className="h-4 w-4" /> {t.voiceError}</p>}
          </div>
        )}

        {/* Quiz Mode */}
        {viewMode === 'quiz' && quizState && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.score}: {quizState.score}/{quizState.total}</p>
            </div>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">{quizState.question.word}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{quizState.question.phonetic}</p>
              <button onClick={() => playWord(quizState.question.word)} className="mt-2 p-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full hover:bg-indigo-200">
                <SpeakerWaveIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizState.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(opt)}
                  disabled={quizState.showResult}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    quizState.showResult
                      ? opt.word === quizState.question.word
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : quizState.selected?.word === opt.word
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : 'border-gray-200 dark:border-gray-700'
                      : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                  }`}
                >
                  <p className="font-medium">{opt.vietnamese}</p>
                </button>
              ))}
            </div>
            {quizState.showResult && (
              <div className="mt-6 text-center">
                <p className={`text-lg font-bold ${quizState.selected.word === quizState.question.word ? 'text-green-600' : 'text-red-600'}`}>
                  {quizState.selected.word === quizState.question.word ? t.correct : t.wrong}
                </p>
                <p className="italic text-sm text-gray-600 dark:text-gray-400 mt-2">"{quizState.question.example}"</p>
                <button onClick={nextQuestion} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  {t.next}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        {viewMode !== 'quiz' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {paginatedWords.length === 0 ? (
              <div className="p-16 text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg">{lang === 'vi' ? 'Không tìm thấy từ nào.' : 'No words found.'}</p>
              </div>
            ) : (
              <>
                <div className={viewMode === 'flashcard' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6'}>
                  {paginatedWords.map((item, idx) => {
                    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx;
                    const isFlipped = flippedCards[globalIndex];
                    const isFavorite = favorites.includes(item.word);
                    const isLearned = learned.includes(item.word);

                    return viewMode === 'flashcard' ? (
                      <div key={globalIndex} onClick={() => flipCard(idx)} className="cursor-pointer perspective-1000">
                        <div className={`relative w-full h-64 preserve-3d transition-transform duration-600 ${isFlipped ? 'rotate-y-180' : ''}`}>
                          {/* Front */}
                          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 flex flex-col justify-center items-center text-white shadow-lg">
                            <h3 className="text-3xl font-bold">{item.word}</h3>
                            <p className="text-sm mt-2 opacity-80">{item.phonetic}</p>
                            <div className="flex gap-2 mt-4">
                              <button onClick={(e) => { e.stopPropagation(); playWord(item.word, globalIndex); }} className="p-2 bg-white/20 rounded-full">
                                <SpeakerWaveIcon className="h-5 w-5" />
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); playVietnamese(item.vietnamese, globalIndex); }} className="p-2 bg-white/20 rounded-full">
                                <LanguageIcon className="h-5 w-5" />
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(item.word); }} className="p-2 bg-white/20 rounded-full">
                                <HeartIcon className={`h-5 w-5 ${isFavorite ? 'fill-red-500' : ''}`} />
                              </button>
                            </div>
                          </div>
                          {/* Back */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-gray-700 rounded-xl p-6 flex flex-col justify-center shadow-lg">
                            <p className="font-semibold text-indigo-700 dark:text-indigo-400 text-lg">{item.vietnamese}</p>
                            <p className="italic text-gray-600 dark:text-gray-400 mt-2 text-sm">"{item.example}"</p>
                            <div className="flex justify-between items-center mt-4">
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-xs font-bold">{item.level}</span>
                              <div className="flex gap-2">
                                <button onClick={(e) => { e.stopPropagation(); playSentence(item.example, globalIndex); }} className={`p-2 rounded-full ${sentenceId === globalIndex ? 'bg-green-600 text-white animate-pulse' : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 hover:bg-green-200'}`}>
                                  <PlayIcon className="h-5 w-5" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); toggleLearned(item.word); }} className={`p-2 rounded-full ${isLearned ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}`}>
                                  <CheckCircleIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={globalIndex} className={`group border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-xl p-5 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 pr-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 group-hover:text-indigo-800 dark:group-hover:text-indigo-300">{item.word}</h3>
                              <button onClick={() => playWord(item.word, globalIndex)} className={`p-1.5 rounded-full transition-all ${playingId === globalIndex ? 'bg-indigo-600 text-white animate-pulse' : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200'}`} title={t.playWord}>
                                <SpeakerWaveIcon className="h-4 w-4" />
                              </button>
                              <button onClick={() => playVietnamese(item.vietnamese, globalIndex)} className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 hover:bg-purple-200" title="Phát nghĩa tiếng Việt">
                                <LanguageIcon className="h-4 w-4" />
                              </button>
                              <button onClick={() => playSentence(item.example, globalIndex)} className={`p-1.5 rounded-full transition-all ${sentenceId === globalIndex ? 'bg-green-600 text-white animate-pulse' : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 hover:bg-green-200'}`} title={t.playSentence}>
                                <PlayIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{item.phonetic}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => toggleFavorite(item.word)} className="p-1.5">
                              <HeartIcon className={`h-5 w-5 transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'}`} />
                            </button>
                            <button onClick={() => toggleLearned(item.word)} className={`p-1.5 rounded-full ${isLearned ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                              <CheckCircleIcon className="h-4 w-4" />
                            </button>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.level.startsWith('A') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' : item.level.startsWith('B') ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300' : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300'}`}>
                              {item.level}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{item.pos}:</span> {item.vietnamese}
                          </p>
                          <p className="italic text-gray-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">"{item.example}"</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && viewMode !== 'flashcard' && (
                  <div className="border-t dark:border-gray-700 px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t.showing} <strong>{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> - <strong>{Math.min(currentPage * ITEMS_PER_PAGE, filteredWords.length)}</strong> {t.of} <strong>{filteredWords.length}</strong> {t.words}
                      </p>
                      <div className="flex items-center gap-1">
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-100 dark:bg-gray-700 text-gray-400' : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-sm'}`}>
                          <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
                          return (
                            <button key={pageNum} onClick={() => goToPage(pageNum)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${currentPage === pageNum ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-sm'}`}>
                              {pageNum}
                            </button>
                          );
                        })}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <>
                            <span className="px-2 text-gray-400">...</span>
                            <button onClick={() => goToPage(totalPages)} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-sm">
                              {totalPages}
                            </button>
                          </>
                        )}
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-700 text-gray-400' : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-sm'}`}>
                          <ChevronRightIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 flex flex-wrap justify-between items-center text-sm text-gray-600 dark:text-gray-400 px-1 gap-2">
          <p>
            {selectedTopic && `${t.topic}: "${selectedTopic}"`}
            {selectedSubtopic && ` > "${selectedSubtopic}"`}
          </p>
          <p className="text-xs">
            {t.totalInDB}: <strong>{totalWords}</strong> • {t.progress}: {progressPercent}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default VocabularyPractice;