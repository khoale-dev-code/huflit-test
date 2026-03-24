// src/components/AILab/WritingGrading.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loader2, AlertCircle, BookOpen, Sparkles, Clock, Lightbulb, History } from 'lucide-react';

// Configs & Services
import { auth } from '../../../config/firebase';
import { supabase } from '../../../config/supabaseClient';
import { gradeWriting, generateWritingPrompt } from '../../../services/writingService';

// Custom Hooks
import { useWritingTimer } from '../../../hooks/useWritingTimer';
import { useWritingHistory } from '../../../hooks/useWritingHistory';

// Components 
import WritingSettings, { WRITING_TYPES, LEVELS } from './WritingSettings';
import WritingPrompt from './WritingPrompt';
import WritingEditor from './WritingEditor';
import WritingResults from './WritingResults';
import WritingHistory from './WritingHistory';
import WritingHints from './WritingHints';

const WritingGrading = () => {
  const navigate = useNavigate();
  const [user, loadingAuth] = useAuthState(auth);
  
  // Settings state (Gom chung các state cài đặt)
  const [writingType, setWritingType] = useState('essay');
  const [selectedLevel, setSelectedLevel] = useState('IELTS_6');
  const [difficulty, setDifficulty] = useState('medium');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [wordCountOption, setWordCountOption] = useState('medium');
  const [customWordMin, setCustomWordMin] = useState(100);
  const [customWordMax, setCustomWordMax] = useState(200);
  
  // Writing & UI state
  const [prompt, setPrompt] = useState('');
  const [translatedPrompt, setTranslatedPrompt] = useState('');
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [generatingPrompt, setGeneratingPrompt] = useState(false);
  const [showHints, setShowHints] = useState(true);

  // Khởi tạo Custom Hooks
  const { showTimer, setShowTimer, timeLeft, formatTime, resetTimer } = useWritingTimer(3600, !!result);
  const { submissions, loadingHistory, showHistory, setShowHistory, loadHistory } = useWritingHistory(user?.uid);

  // Helper function lấy giới hạn từ
  const getWordLimits = useCallback(() => {
    if (wordCountOption === 'custom') return { min: customWordMin, max: customWordMax };
    const counts = { short: { min: 50, max: 100 }, medium: { min: 100, max: 200 }, long: { min: 200, max: 350 } };
    return counts[wordCountOption] || counts.medium;
  }, [wordCountOption, customWordMin, customWordMax]);

  // Cập nhật word count & load prompt khi chọn topic
  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [text]);

  useEffect(() => {
    if (selectedTopic) {
      setPrompt(selectedTopic.prompt);
      setTranslatedPrompt('');
    }
  }, [selectedTopic]);

  const handleGenerateCustomPrompt = async () => {
    setGeneratingPrompt(true);
    try {
      const level = LEVELS.find(l => l.id === selectedLevel);
      const limits = getWordLimits();
      const generatedPrompt = await generateWritingPrompt(writingType, level?.score || 6, limits.min, limits.max);
      
      let finalPromptText = '';
      if (typeof generatedPrompt === 'object' && generatedPrompt !== null) {
         finalPromptText = generatedPrompt.prompt || generatedPrompt.text || JSON.stringify(generatedPrompt);
      } else {
         finalPromptText = generatedPrompt;
      }

      setPrompt(finalPromptText);
      setTranslatedPrompt('');
      setSelectedTopic(null);
    } catch (error) {
      console.error('Error generating prompt:', error);
    } finally {
      setGeneratingPrompt(false);
    }
  };

  const handleSubmit = async () => {
    if (!user || !text.trim()) return;
    setSubmitting(true);
    try {
      const level = LEVELS.find(l => l.id === selectedLevel);
      const gradeResult = await gradeWriting(text, prompt, level?.score || 6, writingType);
      
      setResult(gradeResult);
      
      const { error } = await supabase.from('writing_submissions').insert({
        user_id: user.uid,
        writing_type: writingType,
        level: selectedLevel,
        prompt: prompt,
        user_text: text,
        word_count: wordCount,
        overall_score: gradeResult.overallScore,
        evaluation: gradeResult.evaluation,
        created_at: new Date().toISOString()
      });
      
      if (error) console.error('Error saving submission:', error);
      await loadHistory();
    } catch (error) {
      console.error('Error grading:', error);
      alert('Có lỗi xảy ra khi chấm điểm. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!user || !text.trim()) return;
    setSavingDraft(true);
    try {
      const { error } = await supabase.from('writing_submissions').insert({
        user_id: user.uid, writing_type: writingType, level: selectedLevel,
        prompt: prompt, user_text: text, word_count: wordCount,
        is_draft: true, created_at: new Date().toISOString()
      });
      
      if (error) throw error;
      alert('Đã lưu nháp thành công!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Có lỗi khi lưu nháp. Vui lòng thử lại.');
    } finally {
      setSavingDraft(false);
    }
  };

  const handleReset = () => {
    setText(''); setResult(null); setPrompt(''); setTranslatedPrompt('');
    setSelectedTopic(null); resetTimer();
  };

  const handleViewHistory = (submission) => {
    setText(submission.user_text || '');
    setPrompt(submission.prompt || '');
    setWritingType(submission.writing_type || 'essay');
    setSelectedLevel(submission.level || 'IELTS_6');
    setWordCount(submission.word_count || 0);
    
    if (submission.overall_score) {
      setResult({ overallScore: submission.overall_score, evaluation: submission.evaluation, criteria: null });
    }
    setShowHistory(false);
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Cần đăng nhập</h2>
          <p className="text-slate-600 mb-6">Vui lòng đăng nhập để sử dụng tính năng chấm điểm Writing.</p>
          <button onClick={() => navigate('/login')} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all">
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  const limits = getWordLimits();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-nunito">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Mini Header with toggles */}
        <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200">
          <h1 className="text-xl font-black text-slate-800">
            ✨ Luyện viết IELTS
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTimer(!showTimer)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm border-b-[4px] transition-all ${
                showTimer 
                  ? 'bg-[#FF4B4B] text-white border-[#E04343]' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#FF4B4B] shadow-sm'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">{showTimer ? formatTime(timeLeft) : 'Timer'}</span>
            </button>
            
            <button
              onClick={() => setShowHints(!showHints)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm border-b-[4px] transition-all ${
                showHints 
                  ? 'bg-[#FF4B4B] text-white border-[#E04343]' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#FF4B4B] shadow-sm'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Gợi ý</span>
            </button>
            
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm border-b-[4px] transition-all ${
                showHistory 
                  ? 'bg-[#1CB0F6] text-white border-[#159EE0]' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#1CB0F6] shadow-sm'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Lịch sử</span>
            </button>
          </div>
        </div>

        {showHistory ? (
          <WritingHistory submissions={submissions} loading={loadingHistory} onViewDetail={handleViewHistory} />
        ) : result ? (
          <WritingResults result={result} onReset={handleReset} userText={text} />
        ) : (
          /* 🚀 MỚI: Layout 1 cột - rộng rãi, thoải mái */
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Cài đặt - 1 hàng ngang */}
            <WritingSettings
              writingType={writingType} setWritingType={setWritingType}
              selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}
              wordCountOption={wordCountOption} setWordCountOption={setWordCountOption}
              customWordMin={customWordMin} setCustomWordMin={setCustomWordMin}
              customWordMax={customWordMax} setCustomWordMax={setCustomWordMax}
              difficulty={difficulty} setDifficulty={setDifficulty}
              selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}
            />
            
            {prompt ? (
              <>
                {/* Đề bài */}
                <WritingPrompt
                  prompt={prompt} translatedPrompt={translatedPrompt} setTranslatedPrompt={setTranslatedPrompt}
                  selectedLevel={selectedLevel} onGenerateCustomPrompt={handleGenerateCustomPrompt} generatingPrompt={generatingPrompt}
                />
                
                {/* AI Hints - gợi ý từng bước */}
                {showHints && (
                  <WritingHints prompt={prompt} writingType={writingType} level={selectedLevel} disabled={!prompt} />
                )}
                
                {/* Editor viết bài */}
                <WritingEditor
                  text={text} setText={setText} onSubmit={handleSubmit} onSaveDraft={handleSaveDraft}
                  savingDraft={savingDraft} submitting={submitting} wordCount={wordCount}
                  minWords={limits.min} maxWords={limits.max} showTimer={showTimer}
                  timeLeft={timeLeft} formatTime={formatTime}
                />
                
                {/* Thống kê cá nhân */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-extrabold text-slate-800 mb-5">Thống kê cá nhân</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[15px] font-medium text-slate-600">Tổng bài đã viết</span>
                      <span className="text-lg font-black text-blue-600">{submissions.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[15px] font-medium text-slate-600">Điểm trung bình</span>
                      <span className="text-lg font-black text-emerald-600">
                        {submissions.length > 0 
                          ? (submissions.filter(s => s.overall_score).reduce((a, b) => a + b.overall_score, 0) / (submissions.filter(s => s.overall_score).length || 1)).toFixed(1)
                          : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Trạng thái chưa chọn đề - Empty state */
              <div className="relative z-0 bg-white rounded-3xl border-2 border-dashed border-sky-200 p-16 text-center flex flex-col items-center justify-center animate-in fade-in duration-500 overflow-hidden min-h-[450px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
                
                <div className="w-28 h-28 bg-gradient-to-br from-sky-100 to-blue-50 text-sky-500 rounded-full flex items-center justify-center mb-8 shadow-sm ring-8 ring-sky-50/50 relative">
                  <BookOpen className="w-12 h-12" />
                  <Sparkles className="w-6 h-6 text-blue-400 absolute -top-1 -right-1" />
                </div>

                <h3 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">
                  Bạn đã sẵn sàng viết bài chưa?
                </h3>
                
                <p className="text-slate-500 max-w-lg mx-auto mb-10 text-[16px] leading-relaxed">
                  Hãy tự chọn <b className="text-sky-600">Chủ đề bài viết</b> ở menu bên trên, hoặc để AI tự động tạo một đề bài ngẫu nhiên theo đúng cấu hình mà bạn mong muốn.
                </p>

                <button 
                  onClick={handleGenerateCustomPrompt}
                  disabled={generatingPrompt}
                  className="group relative flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-sky-400 to-blue-600 text-white font-bold rounded-2xl transition-all disabled:opacity-70 shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/40 hover:-translate-y-1 overflow-hidden text-lg"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  {generatingPrompt ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin relative z-10" /> 
                      <span className="relative z-10">Hệ thống đang soạn thảo...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 relative z-10" /> 
                      <span className="relative z-10">Tạo đề ngẫu nhiên bằng AI</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingGrading;