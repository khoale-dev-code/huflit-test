import React, { useState, useEffect } from 'react';
import { Volume2, ChevronRight, ChevronLeft, RotateCcw, BookOpen, Brain, Zap, Settings, Download, Share2, BarChart3, Trash2, Copy, Check, X } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { vocabularyData } from '../../data/vocabularyData';

export default function VocabularyPractice() {
  const { speak, sentenceId, playingId, rate, setRate, pitch, setPitch } = useSpeech();
  const [mode, setMode] = useState('learn');
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
  const [filteredWords, setFilteredWords] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizCorrectAnswer, setQuizCorrectAnswer] = useState(null);

  const topics = Object.keys(vocabularyData);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredWords(currentWords);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredWords(
        currentWords.filter(
          w =>
            w.word.toLowerCase().includes(query) ||
            w.vietnamese.toLowerCase().includes(query) ||
            w.example.toLowerCase().includes(query)
        )
      );
    }
    setCurrentIndex(0);
  }, [searchQuery, currentWords]);

  // Shuffle array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
    setCurrentWords([]);
  };

  const handleSelectSubtopic = (subtopic) => {
    const words = vocabularyData[selectedTopic][subtopic];
    setSelectedSubtopic(subtopic);
    setCurrentWords(words);
    setFilteredWords(words);
    setCurrentIndex(0);
    setIsFlipped(false);
    setQuizMode(false);
  };

  const handleSpeak = () => {
    if (displayedWords[currentIndex]) {
      const word = displayedWords[currentIndex];
      speak(word.word, `word-${currentIndex}`);
    }
  };

  const handleSpeakExample = () => {
    if (displayedWords[currentIndex]) {
      const word = displayedWords[currentIndex];
      speak(word.example, `example-${currentIndex}`, 'en', true);
    }
  };

  const handleNext = () => {
    if (currentIndex < displayedWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setQuizAnswered(false);
      setSelectedAnswer(null);
      generateQuizOptions(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setQuizAnswered(false);
      setSelectedAnswer(null);
      generateQuizOptions(currentIndex - 1);
    }
  };

  const toggleFavorite = () => {
    const word = displayedWords[currentIndex];
    const newFavorited = new Set(favorited);
    if (newFavorited.has(word.word)) {
      newFavorited.delete(word.word);
    } else {
      newFavorited.add(word.word);
    }
    setFavorited(newFavorited);
  };

  const toggleLearned = () => {
    const word = displayedWords[currentIndex];
    const newLearned = new Set(learned);
    if (newLearned.has(word.word)) {
      newLearned.delete(word.word);
    } else {
      newLearned.add(word.word);
    }
    setLearned(newLearned);
  };

  const toggleMastered = () => {
    const word = displayedWords[currentIndex];
    const newMastered = new Set(masteredWords);
    if (newMastered.has(word.word)) {
      newMastered.delete(word.word);
    } else {
      newMastered.add(word.word);
    }
    setMasteredWords(newMastered);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const generateQuizOptions = (index) => {
    const currentWord = displayedWords[index];
    const correctAnswer = currentWord.word;
    
    // Lấy 3 từ sai khác
    const otherWords = displayedWords
      .filter((w, idx) => idx !== index)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.word);
    
    const options = [correctAnswer, ...otherWords];
    setQuizCorrectAnswer(correctAnswer);
    setQuizOptions(shuffleArray(options));
  };

  const startQuiz = () => {
    setQuizMode(true);
    setQuizScore(0);
    setCurrentIndex(0);
    setQuizAnswered(false);
    setSelectedAnswer(null);
    generateQuizOptions(0);
  };

  const handleQuizAnswer = (selectedWord) => {
    setSelectedAnswer(selectedWord);
    setQuizAnswered(true);
    
    if (selectedWord === quizCorrectAnswer) {
      setQuizScore(quizScore + 1);
      toggleMastered();
    }
  };

  const exportToCSV = () => {
    const data = displayedWords.map(w => ({
      Word: w.word,
      Phonetic: w.phonetic,
      Vietnamese: w.vietnamese,
      PartOfSpeech: w.pos,
      Example: w.example,
      Level: w.level,
      Favorite: favorited.has(w.word) ? 'Yes' : 'No',
      Mastered: masteredWords.has(w.word) ? 'Yes' : 'No'
    }));

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row =>
        Object.values(row)
          .map(val => `"${val}"`)
          .join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vocabulary-${selectedSubtopic}.csv`;
    a.click();
  };

  const copyToClipboard = () => {
    const word = displayedWords[currentIndex];
    const text = `${word.word} (${word.phonetic}) - ${word.vietnamese}\nExample: ${word.example}`;
    navigator.clipboard.writeText(text);
    alert('Đã sao chép!');
  };

  const clearAllData = () => {
    if (window.confirm('Bạn chắc chắn muốn xóa toàn bộ dữ liệu?')) {
      setFavorited(new Set());
      setLearned(new Set());
      setMasteredWords(new Set());
    }
  };

  const displayedWords = filteredWords.length > 0 ? filteredWords : currentWords;
  const currentWord = displayedWords[currentIndex];
  const isFavorited = currentWord && favorited.has(currentWord.word);
  const isLearned = currentWord && learned.has(currentWord.word);
  const isMastered = currentWord && masteredWords.has(currentWord.word);
  const progressPercent = displayedWords.length > 0 ? ((currentIndex + 1) / displayedWords.length) * 100 : 0;

  const stats = {
    total: currentWords.length,
    mastered: Array.from(masteredWords).filter(w => currentWords.some(cw => cw.word === w)).length,
    learned: Array.from(learned).filter(w => currentWords.some(cw => cw.word === w)).length,
    favorited: Array.from(favorited).filter(w => currentWords.some(cw => cw.word === w)).length,
    remaining: currentWords.length - Array.from(masteredWords).filter(w => currentWords.some(cw => cw.word === w)).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-2 drop-shadow-lg">
            🎯 Vocabulary Master
          </h1>
          <p className="text-gray-700">Học từ vựng tiếng Anh từ A1 đến C2 một cách hiệu quả</p>
        </div>

        {/* Mode Selection */}
        {!selectedTopic && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'learn', icon: BookOpen, label: 'Học', color: 'from-blue-400 to-blue-500' },
                { id: 'flashcard', icon: Brain, label: 'Flashcard', color: 'from-orange-400 to-orange-500' },
                { id: 'quiz', icon: Zap, label: 'Quiz', color: 'from-amber-300 to-orange-400' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`p-6 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg ${
                    mode === m.id
                      ? `bg-gradient-to-r ${m.color} text-white shadow-xl`
                      : `bg-white text-gray-700 shadow hover:shadow-md`
                  }`}
                >
                  <m.icon className="w-8 h-8 mx-auto mb-2" />
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Topic Selection */}
        {selectedTopic === null && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => handleSelectTopic(topic)}
                className="p-6 bg-white hover:bg-amber-50 rounded-xl shadow-md hover:shadow-lg transition-all text-left hover:translate-y-[-2px] border-2 border-orange-200"
              >
                <h3 className="font-bold text-lg text-orange-600 mb-2">{topic}</h3>
                <p className="text-sm text-gray-600">
                  {Object.keys(vocabularyData[topic]).length} chủ đề
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Subtopic Selection */}
        {selectedTopic && selectedSubtopic === null && (
          <div>
            <button
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Quay lại
            </button>
            <h2 className="text-2xl font-bold text-orange-600 mb-6">{selectedTopic}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(vocabularyData[selectedTopic]).map(subtopic => (
                <button
                  key={subtopic}
                  onClick={() => handleSelectSubtopic(subtopic)}
                  className="p-6 bg-white hover:bg-amber-50 rounded-xl shadow-md hover:shadow-lg transition-all text-left hover:translate-y-[-2px] border-2 border-orange-200"
                >
                  <h3 className="font-bold text-lg text-orange-600 mb-2">{subtopic}</h3>
                  <p className="text-sm text-gray-600">
                    {vocabularyData[selectedTopic][subtopic].length} từ
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Learning Interface */}
        {currentWords.length > 0 && currentWord && (
          <div>
            {/* Top Controls */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <button
                onClick={() => {
                  setSelectedTopic(null);
                  setSelectedSubtopic(null);
                  setCurrentWords([]);
                  setFilteredWords([]);
                  setCurrentIndex(0);
                  setSearchQuery('');
                  setQuizMode(false);
                }}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Quay lại
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition shadow-md"
                >
                  <BarChart3 className="w-4 h-4" />
                  Thống kê
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-white rounded-lg font-semibold transition shadow-md"
                >
                  <Settings className="w-4 h-4" />
                  Cài đặt
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="bg-white border-2 border-orange-400 rounded-xl p-6 mb-6 shadow-lg">
                <h3 className="text-orange-600 font-bold mb-4">⚙️ Cài Đặt Phát Âm</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-700 font-semibold block mb-2">Tốc độ: {rate.toFixed(1)}x</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(parseFloat(e.target.value))}
                      className="w-full accent-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-semibold block mb-2">Cao độ: {pitch.toFixed(1)}</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={pitch}
                      onChange={(e) => setPitch(parseFloat(e.target.value))}
                      className="w-full accent-orange-500"
                    />
                  </div>
                </div>
                <button
                  onClick={clearAllData}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition shadow-md"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa toàn bộ dữ liệu
                </button>
              </div>
            )}

            {/* Search Bar */}
            {!quizMode && (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Tìm kiếm từ, dịch nghĩa, hoặc ví dụ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-orange-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 transition shadow-md"
                />
              </div>
            )}

            {/* Stats Panel */}
            {showStats && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded-lg text-center shadow-lg">
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                  <p className="text-xs text-blue-100">Tổng từ</p>
                </div>
                <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-4 rounded-lg text-center shadow-lg">
                  <p className="text-2xl font-bold text-white">{stats.mastered}</p>
                  <p className="text-xs text-orange-100">Đã nắm vững</p>
                </div>
                <div className="bg-gradient-to-br from-amber-300 to-amber-400 p-4 rounded-lg text-center shadow-lg">
                  <p className="text-2xl font-bold text-white">{stats.learned}</p>
                  <p className="text-xs text-white">Đã học</p>
                </div>
                <div className="bg-gradient-to-br from-rose-400 to-rose-500 p-4 rounded-lg text-center shadow-lg">
                  <p className="text-2xl font-bold text-white">{stats.favorited}</p>
                  <p className="text-xs text-rose-100">Yêu thích</p>
                </div>
                <div className="bg-gradient-to-br from-gray-400 to-gray-500 p-4 rounded-lg text-center shadow-lg">
                  <p className="text-2xl font-bold text-white">{stats.remaining}</p>
                  <p className="text-xs text-gray-100">Còn lại</p>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  {currentIndex + 1}/{displayedWords.length}
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  {Math.round(progressPercent)}%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden shadow-md">
                <div
                  className="bg-gradient-to-r from-blue-500 via-orange-400 to-amber-300 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Quiz Mode */}
            {quizMode ? (
              <div className="mb-8">
                <div className="bg-white border-4 border-orange-400 rounded-2xl p-8 text-center min-h-96 flex flex-col justify-center shadow-2xl">
                  <p className="text-orange-500 text-sm mb-4 uppercase tracking-widest font-bold">Câu hỏi {currentIndex + 1}/{displayedWords.length}</p>
                  <p className="text-4xl font-bold text-orange-600 mb-8">{currentWord.vietnamese}</p>
                  <p className="text-gray-700 mb-6 font-semibold">Chọn đáp án đúng:</p>
                  <div className="grid grid-cols-1 gap-3">
                    {quizOptions.map((option, idx) => {
                      const isCorrect = option === quizCorrectAnswer;
                      const isSelected = option === selectedAnswer;
                      
                      let buttonClass = 'bg-white border-2 border-gray-300 text-gray-800 hover:border-orange-400';
                      
                      if (quizAnswered) {
                        if (isCorrect) {
                          buttonClass = 'bg-green-100 border-2 border-green-500 text-green-800';
                        } else if (isSelected && !isCorrect) {
                          buttonClass = 'bg-red-100 border-2 border-red-500 text-red-800';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => !quizAnswered && handleQuizAnswer(option)}
                          disabled={quizAnswered}
                          className={`p-4 rounded-lg font-semibold transition ${buttonClass} ${quizAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {quizAnswered && isCorrect && <Check className="w-5 h-5 text-green-600" />}
                            {quizAnswered && isSelected && !isCorrect && <X className="w-5 h-5 text-red-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswered && (
                    <div className={`mt-6 p-4 rounded-lg font-semibold text-lg ${
                      selectedAnswer === quizCorrectAnswer
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : 'bg-red-100 border-2 border-red-500 text-red-800'
                    }`}>
                      {selectedAnswer === quizCorrectAnswer ? (
                        <div className="flex items-center gap-2">
                          <Check className="w-6 h-6" />
                          Chính xác! ✨
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <X className="w-6 h-6" />
                            Sai rồi!
                          </div>
                          <p className="text-sm">Đáp án đúng: <span className="font-bold">{quizCorrectAnswer}</span></p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Card */
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="mb-8 cursor-pointer"
              >
                <div className={`min-h-96 bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center transition-all duration-500 transform hover:shadow-2xl hover:scale-102 border-4 ${
                  isMastered ? 'border-orange-400' : 'border-orange-200'
                }`}>
                  {!isFlipped ? (
                    <div className="text-center w-full">
                      <p className="text-gray-500 text-sm mb-4 uppercase tracking-widest">Từ Vựng</p>
                      <p className="text-5xl md:text-6xl font-bold text-blue-600 mb-4 break-words">{currentWord.word}</p>
                      <p className="text-gray-600 text-lg italic mb-8">{currentWord.phonetic}</p>
                      <p className="text-gray-600 text-lg">Bấm để xem dịch nghĩa</p>
                      <div className="mt-8 inline-block bg-amber-100 px-4 py-2 rounded-lg border-2 border-orange-300">
                        <p className="text-xs text-gray-700">Level: <span className="text-orange-600 font-bold">{currentWord.level}</span></p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center w-full">
                      <p className="text-orange-500 text-sm mb-4 uppercase tracking-widest">Dịch Nghĩa</p>
                      <p className="text-4xl font-bold text-orange-600 mb-6 break-words">{currentWord.vietnamese}</p>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left border-2 border-blue-200">
                        <p className="text-xs text-gray-700 mb-2 uppercase font-bold">Loại từ</p>
                        <p className="text-gray-800 font-semibold">{currentWord.pos}</p>
                      </div>
                      <div className="bg-amber-100 p-4 rounded-lg text-left border-2 border-orange-300">
                        <p className="text-xs text-gray-700 mb-2 uppercase font-bold">Ví dụ</p>
                        <p className="text-gray-800 italic">{currentWord.example}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeakExample();
                          }}
                          className={`mt-3 flex items-center gap-2 px-3 py-1 rounded text-sm font-semibold transition shadow-md ${
                            sentenceId === `example-${currentIndex}`
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-300 text-white hover:bg-blue-400'
                          }`}
                        >
                          <Volume2 className="w-4 h-4" />
                          Phát ví dụ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              <button
                onClick={handleSpeak}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition shadow-md ${
                  playingId === `word-${currentIndex}`
                    ? 'bg-orange-600 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span className="hidden md:inline">Phát</span>
              </button>
              <button
                onClick={toggleFavorite}
                className={`px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center shadow-md ${
                  isFavorited
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                ❤️ <span className="hidden md:inline">Yêu</span>
              </button>
              <button
                onClick={toggleLearned}
                className={`px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center shadow-md ${
                  isLearned
                    ? 'bg-amber-400 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                📚 <span className="hidden md:inline">Học</span>
              </button>
              <button
                onClick={toggleMastered}
                className={`px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center shadow-md ${
                  isMastered
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                ✓ <span className="hidden md:inline">Nắm</span>
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition flex items-center justify-center shadow-md"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {!quizMode && (
                <>
                  <button
                    onClick={startQuiz}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Zap className="w-4 h-4" />
                    <span className="hidden md:inline">Bắt đầu Quiz</span>
                    <span className="md:hidden">Quiz</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="hidden md:inline">Sao chép</span>
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden md:inline">Tải CSV</span>
                  </button>
                  <button
                    onClick={() => alert('Chia sẻ tính năng sẽ sớm được cập nhật!')}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden md:inline">Chia sẻ</span>
                  </button>
                </>
              )}
              {quizMode && (
                <button
                  onClick={() => setQuizMode(false)}
                  className="col-span-2 md:col-span-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition shadow-md"
                >
                  Kết thúc Quiz (Điểm: {quizScore}/{displayedWords.length})
                </button>
              )}
            </div>

           {/* Navigation */}
            <div className="space-y-3">
              {/* Progress Indicator */}
              <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-700">{currentIndex + 1}/{displayedWords.length}</span>
                  <span className="text-sm font-bold text-blue-600">{Math.round(progressPercent)}%</span>
                </div>
                
                {/* Mini dots grid */}
                <div className="grid grid-cols-8 md:grid-cols-12 gap-1.5">
                  {displayedWords.map((_, idx) => {
                    const isMasteredWord = displayedWords[idx] && masteredWords.has(displayedWords[idx].word);
                    const isCurrentWord = idx === currentIndex;
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentIndex(idx);
                          setIsFlipped(false);
                          setQuizAnswered(false);
                          setSelectedAnswer(null);
                          if (quizMode) generateQuizOptions(idx);
                        }}
                        className={`relative w-full aspect-square rounded-lg transition-all font-semibold text-[10px] flex items-center justify-center ${
                          isCurrentWord
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-110'
                            : isMasteredWord
                            ? 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-md hover:scale-105'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
                        }`}
                      >
                        {idx + 1}
                        {isMasteredWord && !isCurrentWord && (
                          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center justify-center gap-1 px-3 py-2.5 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg font-semibold hover:from-gray-500 hover:to-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm">Trước</span>
                </button>

                <button
                  onClick={() => {
                    if (quizMode) {
                      setQuizMode(false);
                    } else {
                      startQuiz();
                    }
                  }}
                  className="flex items-center justify-center gap-1 px-3 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg font-semibold hover:from-amber-500 hover:to-orange-600 transition shadow-md"
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">{quizMode ? 'Dừng' : 'Quiz'}</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === displayedWords.length - 1}
                  className="flex items-center justify-center gap-1 px-3 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                >
                  <span className="text-sm">Tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Stats Footer */}
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-3 border border-orange-200 shadow-md">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-sm">✓</div>
                    <p className="text-[10px] text-gray-600 mb-0.5">Nắm vững</p>
                    <p className="text-sm font-bold text-blue-600">{stats.mastered}</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm">📚</div>
                    <p className="text-[10px] text-gray-600 mb-0.5">Đã học</p>
                    <p className="text-sm font-bold text-amber-600">{stats.learned}</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-sm">❤️</div>
                    <p className="text-[10px] text-gray-600 mb-0.5">Yêu thích</p>
                    <p className="text-sm font-bold text-rose-600">{stats.favorited}</p>
                  </div>
                  <div>
                    <div className="w-8 h-8 mx-auto mb-1 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-sm">⏳</div>
                    <p className="text-[10px] text-gray-600 mb-0.5">Còn lại</p>
                    <p className="text-sm font-bold text-gray-600">{stats.remaining}</p>
                  </div>
                </div>
            
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}