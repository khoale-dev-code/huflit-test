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
  // Test States - MOVE THESE UP BEFORE useAutoSaveProgress
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
  // Helper Functions - Get partData
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
  // Auto-save Progress Hook - NOW AFTER answers is declared
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
    // Just show results - QuestionDisplay will handle saving
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
      {/* Navbar */}
      <Navbar
        testType={testType}
        onTestTypeChange={handleTestTypeChange}
        practiceType={practiceType}
        onPracticeTypeChange={handlePracticeTypeChange}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
      />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        {practiceType === 'vocabulary' ? (
          <VocabularyPractice />
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  🎧 HUFLIT Test Practice
                </span>
              </h1>
              <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
                Công cụ luyện thi HUFLIT - Hỗ trợ Listening (audio 2 lần, đa giọng nam/nữ) và Reading (text)
              </p>

              {isSignedIn && user && (
                <p className="text-sm text-orange-600 font-semibold mt-3 animate-pulse">
                  👋 Xin chào, {user.displayName || user.email}! Tiến độ của bạn được lưu tự động.
                </p>
              )}
            </div>

            {/* User Profile Card - Only show if signed in */}
            {isSignedIn && (
              <div id="user-profile-section" className="mb-8 scroll-mt-24">
                <UserProfile />
              </div>
            )}

            {/* Info Box */}
            <div className="mb-8">
              <InfoBox title="📌 Hướng dẫn sử dụng:">
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <span>Sử dụng navbar ở trên để chuyển nhanh giữa Listening, Reading, Ngữ Pháp, Từ Vựng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <span>Listening: Điều chỉnh giọng nam/nữ riêng để hội thoại tự nhiên; nhấn Play để nghe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold mt-1">•</span>
                    <span>Reading: Đọc text và chọn đáp án</span>
                  </li>
                  {isSignedIn ? (
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold mt-1">✓</span>
                      <span><strong>Tiến độ được lưu tự động</strong> - Bạn có thể xem lại kết quả bất kỳ lúc nào</span>
                    </li>
                  ) : (
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold mt-1">•</span>
                      <span><strong>Đăng nhập</strong> để lưu tiến độ học tập của bạn</span>
                    </li>
                  )}
                </ul>
              </InfoBox>
            </div>

            {/* Part Selector */}
            {!practiceType && (
              <div className="mb-8">
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
            <br />

            {/* Content Display */}
            {!practiceType && (
              <div className="mb-8">
                <ContentDisplay
                  partData={partData}
                  selectedPart={selectedPart}
                  currentQuestionIndex={currentQuestionIndex}
                  testType={testType}
                />
              </div>
            )}

            {/* Voice & Audio Controls */}
            {testType === 'listening' && !practiceType && allVoices.length > 0 && (
              <div className="space-y-8 mb-8">
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
            <br />

            {/* Questions or Practice Content */}
            <div className="mb-8">
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

            {/* Results */}
            {showResults && !practiceType && (
              <div className="mb-8">
                <ResultsDisplay
                  score={score}
                  partData={partData}
                  answers={answers}
                  onReset={handleReset}
                />
              </div>
            )}

            {/* Warning Box */}
            <div className="mb-8">
              <InfoBox title="💡 Lưu ý quan trọng:" type="warning">
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Listening: Sử dụng Chrome/Edge cho đa giọng nói tự nhiên</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Reading: Tập trung vào ngữ pháp, từ vựng và suy luận</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Điểm: Listening 5đ/câu, Reading 2.5đ/câu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">•</span>
                    <span>Firebase sẽ tự động lưu tiến độ khi bạn nộp bài (nếu đã đăng nhập)</span>
                  </li>
                </ul>
              </InfoBox>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Auth Modal - if needed for legacy auth (optional) */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

export default App;