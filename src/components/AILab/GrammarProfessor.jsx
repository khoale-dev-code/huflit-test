// src/pages/AILab/GrammarProfessor.jsx
import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Sparkles, Send, Loader2, BookOpen, 
  CheckCircle, XCircle, Lightbulb, RefreshCw, Volume2, Trophy, Target, Clapperboard, Share2 
} from 'lucide-react';
import { generateGrammarLesson, evaluateGrammarPractice } from '../../services/groqService';

const SUGGESTED_TOPICS = ["Câu điều kiện", "Thì Hiện tại hoàn thành", "Câu bị động", "Mệnh đề quan hệ", "Đảo ngữ", "Giới từ IN, ON, AT"];

const LEVELS = [
  { id: 'Cơ bản', color: 'bg-[#58CC02] border-[#46A302] text-white' },
  { id: 'Trung cấp', color: 'bg-[#FF9600] border-[#E58700] text-white' },
  { id: 'Nâng cao', color: 'bg-[#FF4B4B] border-[#E54343] text-white' }
];

const TYPE_LABELS = {
  multiple_choice: 'Trắc nghiệm',
  error_identification: 'Tìm lỗi sai',
  sentence_transformation: 'Viết lại câu',
  fill_in_the_blank: 'Điền khuyết',
  word_formation: 'Chia dạng từ',
  sentence_ordering: 'Sắp xếp câu',
  true_false: 'Đúng / Sai',
  translation: 'Dịch thuật'
};

const GrammarProfessor = () => {
  const [topic, setTopic] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Cơ bản');
  const [loadingState, setLoadingState] = useState(''); 
  
  const [lesson, setLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState('');

  const [showHints, setShowHints] = useState({});

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; 
      utterance.rate = 0.9; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleHint = (id) => {
    setShowHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRequestLesson = async (targetTopic = topic) => {
    if (!targetTopic.trim()) return;

    setTopic(targetTopic);
    setLoadingState('generating');
    setError(''); setLesson(null); setEvaluation(null); setAnswers({}); setShowHints({});

    try {
      const data = await generateGrammarLesson(targetTopic, selectedLevel);
      setLesson(data);
    } catch (err) {
      setError(err.message || "Giáo sư đang bận đi uống trà sữa, thử lại sau nha!");
    } finally {
      setLoadingState('');
    }
  };

  const handleSubmitAnswers = async () => {
    const answeredCount = Object.keys(answers).filter(k => answers[k]?.trim()).length;
    if (answeredCount < lesson.exercises.length) {
      setError(`Mới làm được ${answeredCount}/${lesson.exercises.length} câu mà đòi nộp? Điền cho hết đi!`);
      return;
    }

    setLoadingState('evaluating');
    setError('');

    try {
      const data = await evaluateGrammarPractice(topic, selectedLevel, lesson.exercises, answers);
      setEvaluation(data);
    } catch (err) {
      setError(err.message || "Lỗi mạng rồi! Bấm nộp lại xem nào.");
    } finally {
      setLoadingState('');
    }
  };

  const handleReset = () => {
    setLesson(null); setEvaluation(null); setAnswers({}); setTopic(''); setError(''); setShowHints({});
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-nunito pb-32">
      
      {/* ── HEADER ── */}
      <div className="bg-white border-b-2 border-slate-200 pt-12 pb-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-[#FFF0F0] rounded-full flex items-center justify-center border-2 border-[#ffc1c1] border-b-[8px] shadow-sm mb-6">
            <GraduationCap className="w-12 h-12 text-[#FF4B4B]" strokeWidth={2.5} />
          </div>
          <h1 className="text-[32px] sm:text-[46px] font-black text-slate-800 leading-tight mb-4 tracking-tight">
            Lớp Học <span className="text-[#FF4B4B] drop-shadow-sm">Mỏ Hỗn</span>
          </h1>
          <p className="text-[16px] sm:text-[18px] font-bold text-slate-500 max-w-lg leading-relaxed">
            Học ngữ pháp thực chiến với Giáo sư Gen Z. 10 câu bài tập là 1 cuốn phim Drama, chuẩn bị tinh thần bị khịa đi!
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 space-y-8">
        
        {/* ── GIAI ĐOẠN 1: SETUP ── */}
        {!lesson && (
          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 sm:p-10 shadow-sm">
            <div className="mb-8">
              <p className="text-[16px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Target size={20}/> Chọn Trình Độ</p>
              <div className="flex flex-col sm:flex-row gap-3">
                {LEVELS.map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`flex-1 py-4 rounded-2xl font-black text-[15px] sm:text-[16px] uppercase tracking-wider border-2 border-b-[6px] active:translate-y-[4px] active:border-b-2 transition-all outline-none ${
                      selectedLevel === lvl.id ? lvl.color : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {lvl.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Nhập chủ đề ngữ pháp bạn muốn học..." className="flex-1 px-6 py-5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-[18px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#FF4B4B] transition-colors shadow-inner" onKeyDown={(e) => e.key === 'Enter' && handleRequestLesson(topic)} />
              <button onClick={() => handleRequestLesson(topic)} disabled={loadingState === 'generating'} className="px-8 py-5 bg-[#FF4B4B] text-white border-2 border-[#E54343] border-b-[6px] rounded-2xl font-black text-[18px] uppercase tracking-widest outline-none hover:brightness-105 active:translate-y-[4px] active:border-b-2 transition-all flex items-center justify-center gap-3 disabled:opacity-50 min-w-[200px]">
                {loadingState === 'generating' ? <><Loader2 className="animate-spin w-6 h-6" /> Soạn đề...</> : <><Sparkles className="w-6 h-6" /> Thách Thức</>}
              </button>
            </div>

            <div>
              <p className="text-[14px] font-black text-slate-400 uppercase tracking-widest mb-3">Lười gõ thì bấm vào đây</p>
              <div className="flex flex-wrap gap-3">
                {SUGGESTED_TOPICS.map((t, idx) => (
                  <button key={idx} onClick={() => handleRequestLesson(t)} className="px-5 py-3 bg-white border-2 border-slate-200 border-b-[4px] rounded-xl text-[15px] font-bold text-slate-600 hover:border-[#FF4B4B] hover:text-[#FF4B4B] active:translate-y-[2px] active:border-b-2 transition-all">{t}</button>
                ))}
              </div>
            </div>
            {error && <p className="text-[#FF4B4B] font-bold mt-4 text-center text-[16px]">⚠ {error}</p>}
          </Motion.div>
        )}

        {/* ── GIAI ĐOẠN 2: BÀI GIẢNG & LÀM BÀI TẬP STORY ── */}
        <AnimatePresence>
          {lesson && !evaluation && (
            <Motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-8">
              
              <div className="bg-white rounded-[32px] border-2 border-[#ffc1c1] border-b-[8px] p-6 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#FFF0F0] rounded-2xl border-2 border-[#ffc1c1] flex items-center justify-center text-[#FF4B4B] shadow-sm"><BookOpen strokeWidth={2.5} size={28}/></div>
                    <div>
                      <h2 className="text-[22px] sm:text-[26px] font-black text-slate-800 leading-tight">Lý thuyết: {topic}</h2>
                      <span className="text-[13px] font-black text-[#FF4B4B] uppercase tracking-widest px-3 py-1 bg-[#FFF0F0] rounded-lg mt-1 inline-block border border-[#ffc1c1]">Trình độ {selectedLevel}</span>
                    </div>
                  </div>
                  {/* NÚT LOA TO RÕ */}
                  <button onClick={() => speakText(lesson.theory)} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-500 hover:bg-[#FF4B4B] hover:text-white transition-all border-2 border-slate-200 hover:border-[#E54343] border-b-[4px] active:translate-y-[2px] active:border-b-2 outline-none shadow-sm">
                    <Volume2 size={24} strokeWidth={2.5}/>
                  </button>
                </div>
                <p className="text-[17px] sm:text-[20px] font-bold text-slate-700 leading-relaxed whitespace-pre-wrap relative z-10">{lesson.theory}</p>
              </div>

              <div className="bg-white rounded-[32px] border-2 border-[#BAE3FB] border-b-[8px] p-6 sm:p-10 shadow-sm">
                {lesson.story_context && (
                  <div className="mb-10 p-5 sm:p-8 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[24px] flex gap-5 shadow-inner">
                    <div className="w-16 h-16 rounded-full bg-white text-[#1CB0F6] flex items-center justify-center shrink-0 border-2 border-[#BAE3FB] shadow-sm"><Clapperboard size={32} strokeWidth={2.5}/></div>
                    <div>
                      <span className="font-black text-[#1899D6] uppercase tracking-widest text-[16px] block mb-2">Vũ Trụ Drama</span>
                      <p className="font-bold text-[18px] sm:text-[20px] text-slate-700 leading-relaxed">{lesson.story_context}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  {lesson.exercises.map((ex, idx) => (
                    <div key={ex.id} className="p-6 sm:p-8 bg-slate-50 border-2 border-slate-200 rounded-[28px] shadow-sm relative overflow-hidden group hover:border-slate-300 transition-colors">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#EAF6FE] text-[#1CB0F6] text-[18px] font-black flex items-center justify-center border-2 border-[#BAE3FB] shadow-sm">{idx + 1}</div>
                          <span className="text-[14px] font-black uppercase tracking-widest text-[#1CB0F6] bg-white px-3 py-1.5 rounded-xl border-2 border-[#BAE3FB] shadow-sm">
                            {TYPE_LABELS[ex.type] || 'Bài tập'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* NÚT GỢI Ý TO RÕ */}
                          {ex.hint && (
                            <button onClick={() => toggleHint(ex.id)} className={`flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-b-[4px] active:translate-y-[2px] active:border-b-2 transition-all outline-none shadow-sm ${showHints[ex.id] ? 'bg-[#FFFBEA] border-[#FFD8A8] text-[#E58700]' : 'bg-white border-slate-200 text-slate-500 hover:text-[#E58700] hover:border-[#FFD8A8]'}`}>
                              <Lightbulb size={20} strokeWidth={2.5} />
                              <span className="text-[14px] font-black uppercase tracking-widest">Cứu Giá</span>
                            </button>
                          )}
                          {/* NÚT LOA CÂU HỎI */}
                          <button onClick={() => speakText(ex.question)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white text-slate-500 hover:bg-[#1CB0F6] hover:text-white border-2 border-slate-200 hover:border-[#1899D6] border-b-[4px] active:translate-y-[2px] active:border-b-2 transition-all outline-none shadow-sm"><Volume2 size={20} strokeWidth={2.5}/></button>
                        </div>
                      </div>
                      
                      <p className="font-black text-[18px] sm:text-[22px] text-slate-800 mb-6 relative z-10 leading-relaxed">{ex.question}</p>

                      <AnimatePresence>
                        {showHints[ex.id] && (
                          <Motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                            <div className="bg-[#FFFBEA] border-2 border-[#FFD8A8] text-[#E58700] p-5 rounded-2xl flex items-start gap-4 shadow-inner">
                              <Lightbulb className="shrink-0 mt-1" size={24} strokeWidth={2.5}/>
                              <p className="font-bold text-[16px] sm:text-[18px] leading-relaxed">Giáo sư mớm lời: {ex.hint}</p>
                            </div>
                          </Motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative z-10">
                        {/* 🚀 BẢO VỆ LỖI TRUE/FALSE Ở ĐÂY */}
                        {(ex.type === 'multiple_choice' || ex.type === 'error_identification' || ex.type === 'true_false') && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(ex.type === 'true_false' ? ['True', 'False'] : ex.options)?.map((opt, oIdx) => {
                              const isSelected = answers[ex.id] === opt;
                              return (
                                <button key={oIdx} onClick={() => setAnswers({ ...answers, [ex.id]: opt })} className={`p-5 rounded-2xl font-bold text-[16px] sm:text-[18px] border-2 border-b-[6px] active:translate-y-[4px] active:border-b-2 transition-all outline-none text-left flex items-center gap-4 ${isSelected ? 'bg-[#EAF6FE] border-[#1CB0F6] text-[#1899D6]' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'}`}>
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[14px] font-black border-2 ${isSelected ? 'bg-[#1CB0F6] text-white border-[#1899D6]' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                                    {String.fromCharCode(65 + oIdx)}
                                  </div>
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        )}
                       {/* NHÓM 2: GÕ NHIỀU CHỮ (Viết lại câu, Sắp xếp, DỊCH THUẬT) */}
                        {(ex.type === 'sentence_transformation' || ex.type === 'sentence_ordering' || ex.type === 'translation') && (
                          <textarea 
                            value={answers[ex.id] || ''} 
                            onChange={(e) => setAnswers({ ...answers, [ex.id]: e.target.value })} 
                            placeholder="Gõ câu tiếng Anh hoàn chỉnh vào đây..." 
                            className="w-full px-6 py-5 min-h-[120px] resize-none bg-white border-2 border-slate-200 rounded-2xl font-bold text-[18px] text-slate-700 focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300 shadow-inner" 
                          />
                        )}
                        {(ex.type === 'fill_in_the_blank' || ex.type === 'word_formation') && (
                          <input type="text" value={answers[ex.id] || ''} onChange={(e) => setAnswers({ ...answers, [ex.id]: e.target.value })} placeholder="Nhập từ chính xác..." className="w-full px-6 py-5 bg-white border-2 border-slate-200 rounded-2xl font-bold text-[18px] text-slate-700 focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300 shadow-inner" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {error && <p className="text-[#FF4B4B] font-bold mt-8 text-center bg-[#FFF0F0] p-4 rounded-2xl border-2 border-[#ffc1c1] text-[18px]">⚠ {error}</p>}
                
                <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4">
                  <button onClick={handleReset} className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 border-b-[6px] text-slate-500 rounded-2xl font-black text-[16px] uppercase tracking-widest outline-none hover:text-[#FF4B4B] hover:border-[#ffc1c1] active:translate-y-[4px] active:border-b-2 transition-all">Bỏ chạy</button>
                  <button onClick={handleSubmitAnswers} disabled={loadingState === 'evaluating'} className="w-full sm:w-auto px-10 py-4 bg-[#1CB0F6] text-white border-2 border-[#1899D6] border-b-[6px] rounded-2xl font-black text-[18px] uppercase tracking-widest outline-none hover:brightness-105 active:translate-y-[4px] active:border-b-2 flex items-center justify-center gap-3 disabled:opacity-50 transition-all">
                    {loadingState === 'evaluating' ? <Loader2 className="animate-spin w-6 h-6" /> : <Send w={24} h={24} />} Nộp Cho Giáo Sư
                  </button>
                </div>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>

        {/* ── GIAI ĐOẠN 3: BẢNG PHONG THẦN ── */}
        <AnimatePresence>
          {evaluation && (
            <Motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              
              <div className="bg-[#FFF0F0] border-2 border-[#ffc1c1] border-b-[8px] rounded-[32px] p-8 sm:p-12 text-center shadow-sm relative overflow-hidden">
                <Trophy className="w-20 h-20 text-[#FF4B4B] mx-auto mb-6" strokeWidth={2.5}/>
                <h2 className="text-[64px] sm:text-[84px] font-black text-[#E54343] mb-2 leading-none drop-shadow-sm">{evaluation.score_percentage}%</h2>
                
                <div className="inline-block mt-4 mb-8">
                  <span className="bg-[#FF4B4B] text-white px-8 py-3 rounded-full font-black text-[22px] sm:text-[26px] uppercase tracking-widest border-2 border-[#E54343] shadow-md block">
                    {evaluation.title}
                  </span>
                </div>

                <p className="text-[18px] sm:text-[20px] font-bold text-slate-700 max-w-2xl mx-auto bg-white p-6 rounded-3xl border-2 border-[#ffc1c1] shadow-inner leading-relaxed">
                  {evaluation.overall_feedback}
                </p>
              </div>

              <div className="space-y-6">
                {evaluation.results.map((res, idx) => {
                  const originalQuestion = lesson.exercises.find(q => q.id === res.id)?.question;
                  const isCorrect = res.isCorrect;
                  
                  return (
                    <div key={idx} className={`bg-white rounded-[32px] border-2 border-b-[8px] p-6 sm:p-8 shadow-sm ${isCorrect ? 'border-[#bcf096]' : 'border-[#ffc1c1]'}`}>
                      <div className="flex items-start justify-between gap-5 mb-6">
                        <div className="flex-1">
                          <p className="text-[16px] font-black text-slate-500 uppercase tracking-widest mb-2">Đề bài: {originalQuestion}</p>
                          <p className={`text-[20px] sm:text-[24px] font-black ${isCorrect ? 'text-[#46A302]' : 'text-[#E54343]'}`}>
                            Bạn làm: {answers[res.id] || '(Bỏ trống)'}
                          </p>
                        </div>
                        {isCorrect ? <CheckCircle className="text-[#58CC02] shrink-0" size={40} strokeWidth={2.5}/> : <XCircle className="text-[#FF4B4B] shrink-0" size={40} strokeWidth={2.5}/>}
                      </div>

                      {!isCorrect && (
                        <div className="bg-[#F0FAE8] border-2 border-[#bcf096] rounded-2xl p-4 mb-5 inline-block shadow-inner">
                          <span className="font-black text-[#58CC02] text-[16px]">Phải làm thế này mới đúng: </span>
                          <span className="font-black text-slate-800 text-[18px] ml-2">{res.correct_answer}</span>
                        </div>
                      )}

                      <div className="bg-slate-50 p-5 rounded-2xl mb-4 border-2 border-slate-100 shadow-sm">
                        <span className="font-black text-slate-400 uppercase tracking-widest text-[14px] block mb-2">Giáo sư mắng</span>
                        <p className="font-bold text-[16px] sm:text-[18px] text-slate-700 leading-relaxed">{res.explanation}</p>
                      </div>

                      <div className="flex items-start gap-3 bg-[#FFFBEA] p-4 rounded-2xl border-2 border-[#FFD8A8] text-[#E58700] shadow-sm">
                        <Lightbulb className="shrink-0 mt-1" size={22} strokeWidth={2.5}/>
                        <p className="font-bold text-[15px] sm:text-[16px] leading-relaxed">Mẹo vặt: {res.tip}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-10">
                <button onClick={handleReset} className="px-10 py-5 bg-white border-2 border-slate-200 border-b-[6px] text-slate-600 rounded-2xl font-black text-[18px] uppercase tracking-widest hover:text-[#FF4B4B] hover:border-[#ffc1c1] active:translate-y-[4px] active:border-b-2 flex items-center justify-center gap-3 mx-auto transition-all shadow-sm">
                  <RefreshCw size={24} strokeWidth={3}/> Thách thức lại
                </button>
              </div>

            </Motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default GrammarProfessor;