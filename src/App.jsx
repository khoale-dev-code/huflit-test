import React, { useState } from 'react';
import { EXAM_DATA } from './data/examData';
import { useVoices } from './hooks/useVoices';
import { useAudio } from './hooks/useAudio';
import { useUserProgress } from './hooks/useUserProgress';
import { useClerkAuthentication } from './hooks/useClerkAuth';
import Navbar from './components/Navbar';
import PartSelector from './components/PartSelector';
import ContentDisplay from './components/ContentDisplay';
import VoiceControls from './components/VoiceControls';
import AudioControls from './components/AudioControls';
import QuestionDisplay from './components/QuestionDisplay';
import ResultsDisplay from './components/ResultsDisplay';
import GrammarReview from './components/GrammarReview';
import VocabularyPractice from './components/VocabularyPractice';
import InfoBox from './components/InfoBox';
import Footer from './components/footer/Footer';
import ScrollToTopButton from './components/footer/ScrollToTopButton';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import { useClerkFirebaseSync } from './hooks/useClerkFirebaseSync';
import { useAutoSaveProgress } from './hooks/useAutoSaveProgress';
import { ChevronDown, ChevronUp } from 'lucide-react';

function App() {
  // ============================================
  // Auth - Clerk
  // ============================================
  const { user, isSignedIn, isLoaded: clerkLoaded } = useClerkAuthentication();
  useClerkFirebaseSync();
  
  // ============================================
  // Firebase Progress
  // ============================================
  const { saveProgress } = useUserProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ============================================
  // UI States - Collapsible sections for mobile
  // ============================================
  const [showInstructions, setShowInstructions] = useState(true);
  const [showVoiceControls, setShowVoiceControls] = useState(true);

  // ============================================
  // Test States
  // ============================================
  const [selectedExam, setSelectedExam] = useState('exam1');
  const [testType, setTestType] = useState('listening');
  const [practiceType, setPracticeType] = useState('');
  const [selectedPart, setSelectedPart] = useState('part1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [rate, setRate] = useState(1.0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // ============================================
  // Helper Functions
  // ============================================
  const getCurrentData = () => {
    if (practiceType) return null;
    const exam = EXAM_DATA[selectedExam];
    if (!exam) return null;
    const part = exam.parts[selectedPart];
    return part || null;
  };

  const partData = getCurrentData();

  // ============================================
  // Auto-save Progress Hook
  // ============================================
  useAutoSaveProgress(answers, selectedExam, selectedPart, partData);

  // ============================================
  // Voices & Audio
  // ============================================
  const voicesHook = useVoices();
  const { allVoices, maleVoice, femaleVoice, updateVoice } = voicesHook;
  const { status, progress, playAudio, pauseAudio, stopAudio } = useAudio(maleVoice, femaleVoice, rate);

  // ============================================
  // Loading State
  // ============================================
  if (!clerkLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Đang tải...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // Event Handlers
  // ============================================
  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
    setSelectedPart('part1');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    window.speechSynthesis.cancel();
  };

  const handleTestTypeChange = (type) => {
    setTestType(type);
    setPracticeType('');
    setSelectedPart(type === 'listening' ? 'part1' : 'part5');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    window.speechSynthesis.cancel();
  };

  const handlePracticeTypeChange = (type) => {
    setPracticeType(type);
    setTestType('');
    setSelectedPart('');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    window.speechSynthesis.cancel();
  };

  const handlePartChange = (e) => {
    setSelectedPart(e.target.value);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    window.speechSynthesis.cancel();
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateScore = () => {
    if (practiceType) {
      return { correct: 0, total: 0, percentage: 0 };
    }
    if (!partData?.questions) {
      return { correct: 0, total: 0, percentage: 0 };
    }

    let correct = 0;
    partData.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });

    const total = partData.questions.length;
    const percentage = total > 0 ? (correct / total) * 100 : 0;
    return { correct, total, percentage };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    window.speechSynthesis.cancel();
  };

  const score = calculateScore();

  // ============================================
  // Main Render
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex flex-col">
      {/* Navbar - Fixed with better mobile support */}
      <Navbar
        testType={testType}
        onTestTypeChange={handleTestTypeChange}
        practiceType={practiceType}
        onPracticeTypeChange={handlePracticeTypeChange}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
      />

      {/* Main Content - Better spacing and padding */}
      <main className="flex-1 pt-20 pb-16 px-3 sm:px-4 md:px-6 lg:px-8">
        {practiceType === 'vocabulary' ? (
          <VocabularyPractice />
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Compact Header Section */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 sm:mb-3 tracking-tight">
                <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  🎧 HUFLIT Test Practice
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium max-w-3xl mx-auto px-2">
                Luyện thi HUFLIT - Listening & Reading với đa giọng nói
              </p>

              {isSignedIn && user && (
                <div className="mt-3 sm:mt-4 inline-block">
                  <p className="text-xs sm:text-sm text-orange-600 font-semibold bg-orange-50 px-3 sm:px-4 py-2 rounded-full border border-orange-200">
                    👋 Xin chào, {user.displayName || user.email?.split('@')[0]}!
                  </p>
                </div>
              )}
            </div>

            {/* User Profile Card - Compact on mobile */}
            {isSignedIn && (
              <div id="user-profile-section" className="mb-4 sm:mb-6 md:mb-8 scroll-mt-24">
                <UserProfile />
              </div>
            )}

            {/* Collapsible Instructions */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border-2 border-orange-200 hover:border-orange-300 transition-all"
              >
                <span className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                  📌 Hướng dẫn sử dụng
                </span>
                {showInstructions ? (
                  <ChevronUp className="w-5 h-5 text-orange-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-orange-600" />
                )}
              </button>
              
              {showInstructions && (
                <div className="mt-2 p-3 sm:p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border-2 border-orange-200">
                  <ul className="space-y-2 text-gray-800 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold mt-0.5 text-lg">•</span>
                      <span><strong>Navbar:</strong> Chuyển đổi giữa Listening, Reading, Ngữ Pháp, Từ Vựng</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold mt-0.5 text-lg">•</span>
                      <span><strong>Listening:</strong> Chọn giọng nam/nữ, điều chỉnh tốc độ, nhấn Play để nghe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold mt-0.5 text-lg">•</span>
                      <span><strong>Reading:</strong> Đọc đoạn văn và chọn đáp án phù hợp</span>
                    </li>
                    {isSignedIn ? (
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold mt-0.5 text-lg">✓</span>
                        <span><strong className="text-green-600">Đã đăng nhập:</strong> Tiến độ được lưu tự động!</span>
                      </li>
                    ) : (
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold mt-0.5 text-lg">•</span>
                        <span><strong>Đăng nhập</strong> để lưu tiến độ học tập</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Part Selector - Better mobile layout */}
            {!practiceType && (
              <div className="mb-4 sm:mb-6 md:mb-8">
                <PartSelector
                  selectedExam={selectedExam}
                  onExamChange={handleExamChange}
                  testType={testType}
                  onTestTypeChange={(e) => handleTestTypeChange(e.target.value)}
                  selectedPart={selectedPart}
                  onPartChange={handlePartChange}
                  examData={EXAM_DATA[selectedExam]}
                  partData={partData}
                />
              </div>
            )}

            {/* Content Display */}
            {!practiceType && (
              <div className="mb-4 sm:mb-6 md:mb-8">
                <ContentDisplay
                  partData={partData}
                  selectedPart={selectedPart}
                  currentQuestionIndex={currentQuestionIndex}
                  testType={testType}
                />
              </div>
            )}

            {/* Collapsible Voice & Audio Controls */}
            {testType === 'listening' && !practiceType && allVoices.length > 0 && (
              <div className="mb-4 sm:mb-6 md:mb-8">
                <button
                  onClick={() => setShowVoiceControls(!showVoiceControls)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border-2 border-orange-200 hover:border-orange-300 transition-all mb-2"
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                    🎙️ Điều khiển giọng nói & Audio
                  </span>
                  {showVoiceControls ? (
                    <ChevronUp className="w-5 h-5 text-orange-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-orange-600" />
                  )}
                </button>
                
                {showVoiceControls && (
                  <div className="space-y-4 sm:space-y-6">
                    <VoiceControls
                      allVoices={allVoices}
                      updateVoice={updateVoice}
                      rate={rate}
                      onRateChange={setRate}
                    />
                    <AudioControls
                      status={status}
                      progress={progress}
                      playAudio={playAudio}
                      pauseAudio={pauseAudio}
                      stopAudio={stopAudio}
                      partData={partData}
                      selectedPart={selectedPart}
                      currentQuestionIndex={currentQuestionIndex}
                      testType={testType}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Questions Display */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              {!practiceType ? (
                <QuestionDisplay
                  selectedPart={selectedPart}
                  selectedExam={selectedExam}
                  partData={partData}
                  currentQuestionIndex={currentQuestionIndex}
                  onQuestionChange={setCurrentQuestionIndex}
                  answers={answers}
                  onAnswerSelect={handleAnswerSelect}
                  showResults={showResults}
                  onSubmit={handleSubmit}
                  testType={testType}
                />
              ) : practiceType === 'grammar' ? (
                <GrammarReview
                  answers={answers}
                  onAnswerSelect={handleAnswerSelect}
                  onSubmit={handleSubmit}
                />
              ) : null}
            </div>

            {/* Results Display */}
            {showResults && !practiceType && (
              <div className="mb-4 sm:mb-6 md:mb-8">
                <ResultsDisplay
                  score={score}
                  partData={partData}
                  answers={answers}
                  onReset={handleReset}
                />
              </div>
            )}

            {/* Compact Warning Box */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="p-3 sm:p-4 bg-yellow-50/95 backdrop-blur-sm rounded-xl shadow-md border-2 border-yellow-200">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  💡 Lưu ý quan trọng
                </h3>
                <ul className="space-y-1.5 text-gray-800 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-0.5">•</span>
                    <span><strong>Listening:</strong> Dùng Chrome/Edge cho trải nghiệm tốt nhất</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-0.5">•</span>
                    <span><strong>Chấm điểm:</strong> Listening 5đ/câu, Reading 2.5đ/câu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-0.5">•</span>
                    <span><strong>Tự động lưu:</strong> Tiến độ được lưu khi đã đăng nhập</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

export default App;