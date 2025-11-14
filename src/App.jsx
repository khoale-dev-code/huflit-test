import React, { useMemo, useEffect, useState } from 'react';
import { EXAM_DATA } from './data/examData';
import { useVoices } from './hooks/useVoices';
import { useAudio } from './hooks/useAudio';
import { useUserProgress } from './hooks/useUserProgress';
import { useUnifiedAuth } from './hooks/useUnifiedAuth';
import { useClerkFirebaseSync } from './hooks/useClerkFirebaseSync';
import { useFirebaseUserSync } from './hooks/useFirebaseUserSync';
import { useAutoSaveProgress } from './hooks/useAutoSaveProgress';
import { useAppState } from './hooks/useAppState';
import MainLayout from './components/layout/MainLayout';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { HeaderSection } from './components/sections/HeaderSection';
import { InstructionsSection } from './components/sections/InstructionsSection';
import UserProfile from './components/UserProfile';
import PartSelector from './components/PartSelector';
import ContentDisplay from './components/ContentDisplay';
import QuestionDisplay from './components/QuestionDisplay';
import ResultsDisplay from './components/ResultsDisplay';
import GrammarReview from './components/GrammarReview';
import VocabularyPractice from './components/VocabularyPractice';
import FullExamMode from './components/FullExamMode';
import AuthModal from './components/AuthModal';
import ChatApp from './components/ChatApp.jsx';
import { Target, Trophy, FileText, Zap, GraduationCap, MessageCircle, X } from 'lucide-react';

import './styles/animations.css'; // Đảm bảo file này chứa keyframes blob

function App() {
  // Auth
  const { user, isSignedIn, isLoaded, authProvider } = useUnifiedAuth();
  
  // Chat state
  const [showChat, setShowChat] = useState(false);
  
  // Debug auth state
  useEffect(() => {
    console.log('🔍 [App.jsx] Auth State:', { 
      user: user?.id || user?.email || null, 
      isSignedIn, 
      isLoaded, 
      authProvider 
    });
  }, [user, isSignedIn, isLoaded, authProvider]);

  useClerkFirebaseSync();
  useFirebaseUserSync();

  const { saveProgress, currentUser } = useUserProgress();

  // Audio
  const voicesHook = useVoices();
  const { allVoices, maleVoice, femaleVoice } = voicesHook;
  const { status, progress, playAudio, pauseAudio, stopAudio } = useAudio(maleVoice, femaleVoice, 1.0);

  // App State - Destructure setCurrentQuestionIndex
  const {
    showInstructions,
    setShowInstructions,
    showAuthModal,
    setShowAuthModal,
    selectedExam,
    testType,
    handleTestTypeChange,
    practiceType,
    handlePracticeTypeChange,
    selectedPart,
    currentQuestionIndex,
    setCurrentQuestionIndex, 
    answers,
    handleAnswerSelect,
    handleSubmit,
    showResults,
    handleReset,
    handleExamChange,
    handlePartChange,
  } = useAppState();

  // Memoized
  const partData = useMemo(() => {
    if (practiceType) return null;
    const exam = EXAM_DATA[selectedExam];
    return exam?.parts[selectedPart] || null;
  }, [practiceType, selectedExam, selectedPart]);

  const score = useMemo(() => {
    if (practiceType || !partData?.questions) {
      return { correct: 0, total: 0, percentage: 0 };
    }
    let correct = 0;
    partData.questions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    const total = partData.questions.length;
    return { correct, total, percentage: total > 0 ? (correct / total) * 100 : 0 };
  }, [practiceType, partData, answers]);

  useAutoSaveProgress(answers, selectedExam, selectedPart, partData);

  // Loading state
  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  // Chat Modal - Cập nhật màu sắc
  const ChatModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-end">
      <div className="w-full sm:w-2xl h-screen sm:h-[600px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 rounded-t-2xl">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Global Chat
          </h2>
          <button
            onClick={() => setShowChat(false)}
            className="hover:bg-orange-400 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
          <ChatApp user={user} />
        </div>
      </div>
    </div>
  );

  const contentComponent = (() => {
    if (practiceType === 'vocabulary') return <VocabularyPractice />;
    if (testType === 'full') {
      return (
        <FullExamMode 
          examData={EXAM_DATA} 
          onComplete={() => handleTestTypeChange('')} 
        />
      );
    }
    
    return (
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <HeaderSection 
          isSignedIn={isSignedIn} 
          user={user} 
          authProvider={authProvider} 
        />
        
        {isSignedIn && (
          <div key="user-profile-section">
            <UserProfile currentUser={currentUser} />
          </div>
        )}        
        
        <InstructionsSection 
          isOpen={showInstructions} 
          onToggle={() => setShowInstructions(!showInstructions)} 
          isSignedIn={isSignedIn} 
          authProvider={authProvider} 
        />
        
        {/* Phần Lựa Chọn và Hiển Thị */}
        {!practiceType && testType !== 'full' && (
          <>
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

            <ContentDisplay
              partData={partData}
              selectedPart={selectedPart}
              currentQuestionIndex={currentQuestionIndex}
              testType={testType}
            />

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
          </>
        )}

        {practiceType === 'grammar' && (
          <GrammarReview
            answers={answers}
            onAnswerSelect={handleAnswerSelect}
            onSubmit={handleSubmit}
          />
        )}

        {showResults && !practiceType && testType !== 'full' && (
          <ResultsDisplay
            score={score}
            partData={partData}
            answers={answers}
            onReset={handleReset}
          />
        )}

        {/* Quick Stats - Cập nhật màu sắc */}
        {isSignedIn && score.total > 0 && (
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <StatCard icon={Target} label="Câu hỏi" value={score.total} color="brown" />
            <StatCard icon={Trophy} label="Đúng" value={score.correct} color="green" />
            <StatCard icon={FileText} label="Sai" value={score.total - score.correct} color="red" />
            <StatCard icon={Zap} label="Tỷ lệ" value={`${score.percentage.toFixed(0)}%`} color="orange" />
          </section>
        )}

        {/* Full Exam Button - Cải Tiến Giao Diện */}
        {!practiceType && testType !== 'full' && (
          <section className="bg-white rounded-3xl border-4 border-amber-300 p-8 shadow-2xl transition-all hover:shadow-amber-300/50 duration-500">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              
              {/* Icon & Title */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="p-4 rounded-full bg-amber-100 border-2 border-amber-500 shadow-xl">
                  <GraduationCap className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-800">
                  Chế Độ Thi Thử <span className="text-amber-600">Toàn Phần</span>
                </h3>
              </div>

              {/* Description & Button */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 mb-4 mt-2 sm:mt-0 leading-relaxed">
                  Trải nghiệm thi mô phỏng y hệt thực tế với 20 câu Listening và 40 câu Reading, kèm theo timer chuẩn.
                </p>
                <button
                  onClick={() => handleTestTypeChange('full')}
                  className="w-full sm:w-auto px-10 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-orange-300/70 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  🚀 Bắt đầu thi thử ngay
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  })();

  return (
    // Áp dụng Blob Background vào MainLayout hoặc container ngoài cùng
    <MainLayout
      testType={testType}
      onTestTypeChange={handleTestTypeChange}
      practiceType={practiceType}
      onPracticeTypeChange={handlePracticeTypeChange}
      user={user}
      onAuthClick={() => setShowAuthModal(true)}
      onChatClick={() => setShowChat(true)}
    >
      {/* Thêm Blob Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, -60px) scale(1.1); }
            66% { transform: translate(-30px, 30px) scale(0.95); }
          }
          .animate-blob {
            animation: blob 8s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
          }
        `}</style>
        {/* Blob 1: Cam Nhạt */}
        <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-amber-300/30 rounded-full mix-blend-multiply blur-3xl -ml-40 -mt-40 opacity-70 animate-blob" />
        {/* Blob 2: Vàng Nhạt */}
        <div className="absolute bottom-0 right-0 w-[20rem] h-[20rem] bg-yellow-300/30 rounded-full mix-blend-multiply blur-3xl -mr-20 -mb-20 opacity-60 animate-blob" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Nội dung chính */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        {contentComponent}
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>

      {/* Chat Button - Floating - Cập nhật màu sắc */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-full p-4 shadow-xl shadow-orange-400/50 hover:scale-110 transition-all z-40"
        title="Mở chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Modal */}
      {showChat && <ChatModal />}
    </MainLayout>
  );
}

// StatCard - Cập nhật màu sắc theo theme Be/Cam/Vàng
const StatCard = ({ icon: Icon, label, value, color }) => {
  const colors = {
    orange: 'border-orange-300 text-orange-700 bg-orange-50',
    green: 'border-green-300 text-green-700 bg-green-50',
    red: 'border-red-300 text-red-700 bg-red-50',
    brown: 'border-amber-300 text-amber-700 bg-amber-50', // Màu Nâu/Vàng cho Câu hỏi
  };

  return (
    <div className={`rounded-xl p-4 shadow-lg border-2 transition-all hover:shadow-xl ${colors[color]} text-center`}>
      <Icon className="w-6 h-6 mx-auto mb-1 opacity-80" />
      <p className="text-xs text-gray-600 font-semibold uppercase">{label}</p>
      <p className="text-xl sm:text-2xl font-black text-gray-900">{value}</p>
    </div>
  );
};

export default App;