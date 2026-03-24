// src/pages/AILab/GrammarTutor.jsx
import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, Languages, BookOpen, Fingerprint, Loader2, Target } from 'lucide-react';
import { analyzeGrammarWithGroq } from '../../services/groqService';

const GrammarTutor = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!inputText.trim() || inputText.length < 3) {
      setError('Vui lòng nhập ít nhất 1 câu hoặc một cụm từ có nghĩa nhé!');
      return;
    }
    
    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const analysis = await analyzeGrammarWithGroq(inputText);
      setResult(analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-nunito pb-32">
      {/* ── HERO BANNER ── */}
      <div className="bg-white border-b-2 border-slate-200 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Bot size={200} strokeWidth={1} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#F8EEFF] rounded-[24px] flex items-center justify-center border-2 border-[#eec9ff] border-b-[6px] shadow-sm mb-6">
            <Sparkles className="w-10 h-10 text-[#CE82FF]" strokeWidth={2.5} />
          </div>
          <h1 className="text-[32px] sm:text-[42px] font-black text-slate-800 leading-tight mb-3">
            Trợ Giảng <span className="text-[#CE82FF]">Sóng Não</span>
          </h1>
          <p className="text-[16px] font-bold text-slate-500 max-w-lg">
            Dán bất kỳ câu tiếng Anh nào bạn không hiểu vào đây. AI sẽ mổ xẻ từng từ, giải thích cặn kẽ cấu trúc ngữ pháp chỉ trong nháy mắt.
          </p>
        </div>
      </div>

      {/* ── WORKSPACE ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 sm:p-8 shadow-lg">
          
          {/* Input Area */}
          <div className="relative mb-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="VD: By the time I arrived, she had already left..."
              className="w-full min-h-[160px] p-6 bg-slate-50 border-2 border-slate-200 rounded-[24px] text-[18px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#CE82FF] focus:ring-4 focus:ring-purple-500/10 transition-all resize-none placeholder:text-slate-400"
            />
            {error && (
              <p className="absolute bottom-4 left-6 text-[#FF4B4B] font-bold text-[14px]">{error}</p>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-10 py-4 bg-[#CE82FF] text-white border-2 border-[#B975E5] border-b-[6px] rounded-2xl font-black uppercase text-[16px] tracking-widest outline-none hover:brightness-105 active:translate-y-[4px] active:border-b-2 transition-all shadow-sm flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none mx-auto"
          >
            {isAnalyzing ? (
              <><Loader2 className="animate-spin" size={24} /> Đang quét não bộ...</>
            ) : (
              <><Fingerprint size={24} /> Phân Tích Ngay</>
            )}
          </button>
        </div>

        {/* ── RESULT AREA ── */}
        <AnimatePresence>
          {result && (
            <Motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              {/* Dịch nghĩa */}
              <div className="bg-white rounded-[24px] border-2 border-[#bcf096] border-b-[6px] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#F0FAE8] rounded-[12px] flex items-center justify-center text-[#58CC02] border-2 border-[#bcf096]"><Languages size={20} strokeWidth={3}/></div>
                  <h3 className="font-black text-[18px] text-slate-800 uppercase tracking-widest">Bản dịch mượt mà</h3>
                </div>
                <p className="text-[18px] font-bold text-[#46A302] leading-relaxed bg-[#F0FAE8] p-4 rounded-xl">
                  {result.translation}
                </p>
              </div>

              {/* Ngữ pháp */}
              <div className="bg-white rounded-[24px] border-2 border-[#BAE3FB] border-b-[6px] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#EAF6FE] rounded-[12px] flex items-center justify-center text-[#1CB0F6] border-2 border-[#BAE3FB]"><Target size={20} strokeWidth={3}/></div>
                  <h3 className="font-black text-[18px] text-slate-800 uppercase tracking-widest">Cấu trúc Ngữ pháp</h3>
                </div>
                <div className="space-y-3">
                  {result.grammar_points?.map((gp, idx) => (
                    <div key={idx} className="p-4 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-xl">
                      <span className="font-black text-[15px] text-[#1899D6] block mb-1">📌 {gp.point}</span>
                      <span className="font-bold text-[14px] text-slate-600 leading-relaxed">{gp.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Từ vựng */}
              <div className="bg-white rounded-[24px] border-2 border-[#FFD8A8] border-b-[6px] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#FFFBEA] rounded-[12px] flex items-center justify-center text-[#FF9600] border-2 border-[#FFD8A8]"><BookOpen size={20} strokeWidth={3}/></div>
                  <h3 className="font-black text-[18px] text-slate-800 uppercase tracking-widest">Từ vựng nổi bật</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.vocabulary?.map((v, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-[#FFFBEA] border-2 border-[#FFD8A8] rounded-xl">
                      <div className="flex-1">
                        <span className="font-black text-[16px] text-[#E58700] block">{v.word} <span className="text-[12px] text-slate-400 font-bold ml-1">({v.type})</span></span>
                        <span className="font-bold text-[14px] text-slate-600">{v.meaning}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lời khuyên */}
              <div className="text-center bg-slate-50 border-2 border-slate-200 p-4 rounded-2xl font-bold text-slate-500 text-[14px]">
                🤖 Lời khuyên từ AI: {result.advice}
              </div>

            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrammarTutor;