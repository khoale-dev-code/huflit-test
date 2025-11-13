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

import './styles/animations.css';

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

  // App State - ✅ IMPORTANT: Destructure setCurrentQuestionIndex
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
    setCurrentQuestionIndex,  // ✅ ADD THIS
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

  // Chat Modal
  const ChatModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-end">
      <div className="w-full sm:w-2xl h-screen sm:h-[600px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-t-2xl">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Global Chat
          </h2>
          <button
            onClick={() => setShowChat(false)}
            className="hover:bg-indigo-500 p-2 rounded-lg transition-colors"
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
      <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4">
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
        
        {!practiceType && testType !== 'full' && (
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
        )}

        {!practiceType && testType !== 'full' && (
          <ContentDisplay
            partData={partData}
            selectedPart={selectedPart}
            currentQuestionIndex={currentQuestionIndex}
            testType={testType}
          />
        )}

        {!practiceType && testType !== 'full' && (
          <QuestionDisplay
            selectedPart={selectedPart}
            selectedExam={selectedExam}
            partData={partData}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionChange={setCurrentQuestionIndex}  // ✅ USE IT HERE
            answers={answers}
            onAnswerSelect={handleAnswerSelect}
            showResults={showResults}
            onSubmit={handleSubmit}
            testType={testType}
          />
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

        {/* Quick Stats */}
        {isSignedIn && score.total > 0 && (
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <StatCard icon={Target} label="Câu hỏi" value={score.total} color="orange" />
            <StatCard icon={Trophy} label="Đúng" value={score.correct} color="green" />
            <StatCard icon={FileText} label="Sai" value={score.total - score.correct} color="red" />
            <StatCard icon={Zap} label="Điểm" value={`${score.percentage.toFixed(0)}%`} color="blue" />
          </section>
        )}

        {/* Full Exam Button */}
        {!practiceType && testType !== 'full' && (
          <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-300 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-900">🎓 Chế Độ Thi Thử Toàn Phần</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Thi thử toàn bộ bài thi với timer thực tế: 30 phút Listening + 60 phút Reading.
            </p>
            <button
              onClick={() => handleTestTypeChange('full')}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold shadow-xl transition-all hover:shadow-2xl"
            >
              🚀 Bắt đầu thi thử
            </button>
          </section>
        )}
      </div>
    );
  })();

  return (
    <>
      <MainLayout
        testType={testType}
        onTestTypeChange={handleTestTypeChange}
        practiceType={practiceType}
        onPracticeTypeChange={handlePracticeTypeChange}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
        onChatClick={() => setShowChat(true)}
      >
        {contentComponent}
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

        {/* Chat Button - Floating */}
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40"
          title="Mở chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </MainLayout>

      {/* Chat Modal */}
      {showChat && <ChatModal />}
    </>
  );
}

const StatCard = ({ icon: Icon, label, value, color }) => {
  const colors = {
    orange: 'border-orange-200 text-orange-600',
    green: 'border-green-200 text-green-700',
    red: 'border-red-200 text-red-700',
    blue: 'border-blue-200 text-blue-600',
  };

  return (
    <div className={`bg-white rounded-xl p-3 shadow-lg border-2 ${colors[color]} text-center`}>
      <Icon className="w-5 h-5 mx-auto mb-1" />
      <p className="text-xs text-gray-600 font-semibold">{label}</p>
      <p className="text-lg sm:text-xl font-black text-gray-900">{value}</p>
    </div>
  );
};

export default App;