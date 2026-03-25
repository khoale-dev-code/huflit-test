// src/components/AILab/WritingHints.jsx
// HUBSTUDY Design: Nunito Font, Brand Colors, 3D Shadow Buttons

import React, { useState } from 'react';
import { Lightbulb, Loader2, ChevronDown, ChevronUp, Sparkles, BookOpen, Key, Type, MessageSquare } from 'lucide-react';
import { getAIHints } from '../../../services/writingService';

const WritingHints = ({ prompt, writingType, level, disabled }) => {
  const [hintsData, setHintsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState([]);
  const [error, setError] = useState(null);

  const handleGetHints = async () => {
    if (hintsData) return; 
    
    setLoading(true);
    setError(null);
    try {
      const aiResponse = await getAIHints(prompt, writingType, level);
      
      let parsedData = null; 
      
      if (typeof aiResponse === 'string') {
        try {
          const cleanJson = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
          parsedData = JSON.parse(cleanJson);
        } catch { // 🚀 FIX CUỐI CÙNG: Xóa luôn phần (_) đi là ESLint hết cãi!
          // Fallback nếu parse JSON thất bại
          parsedData = { steps: [{ title: 'Guide', content: aiResponse }] };
        }
      } else {
        parsedData = aiResponse;
      }
      
      if (!parsedData || typeof parsedData !== 'object') {
        throw new Error("AI returned invalid data");
      }
      
      setHintsData(parsedData);
    } catch (err) {
      console.error('Error getting hints:', err);
      setError('AI đang bận, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = (index) => {
    if (!revealedSteps.includes(index)) {
      setRevealedSteps([...revealedSteps, index]);
    }
  };

  const steps = hintsData?.steps || [];
  const vocabulary = hintsData?.vocabulary || [];
  const phrases = hintsData?.phrases || [];
  const connectors = hintsData?.connectors || [];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-5 font-nunito border-b-[6px] border-[#FF4B4B]">
      
      <div className="text-center mb-5 pb-5 border-b border-slate-100">
        <div className="w-14 h-14 bg-[#FF4B4B]/10 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 border-b-[4px] border-[#E04343]">
          <Lightbulb className="w-7 h-7 text-[#FF4B4B]" />
        </div>
        <h3 className="text-xl font-black text-slate-800">AI Writing Hints</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Phao cứu hộ khi bí ý tưởng
        </p>
      </div>

      {error && (
        <div className="bg-[#FF4B4B]/10 text-[#FF4B4B] p-4 rounded-2xl text-sm font-bold border-b-[4px] border-[#E04343] mb-4">
          {error}
        </div>
      )}

      {/* Đã có data - Hiển thị hints */}
      {hintsData && (
        <div className="space-y-5">
          
          {/* Vocabulary Section - HUBSTUDY Style */}
          {vocabulary.length > 0 && (
            <div className="bg-[#1CB0F6]/5 rounded-2xl p-4 border-b-[4px] border-[#159EE0]">
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-5 h-5 text-[#1CB0F6]" />
                <h4 className="font-bold text-[#1CB0F6]">Useful Vocabulary</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {vocabulary.map((word, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-2 bg-white rounded-xl text-sm font-bold text-[#1CB0F6] border-b-[3px] border-[#159EE0] shadow-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Phrases Section */}
          {phrases.length > 0 && (
            <div className="bg-[#58CC02]/5 rounded-2xl p-4 border-b-[4px] border-[#4BAD02]">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-[#58CC02]" />
                <h4 className="font-bold text-[#58CC02]">Useful Phrases</h4>
              </div>
              <div className="space-y-2">
                {phrases.map((phrase, i) => (
                  <div 
                    key={i} 
                    className="px-3 py-2 bg-white rounded-xl text-sm font-bold text-[#58CC02] border-b-[3px] border-[#4BAD02] italic"
                  >
                    "{phrase}"
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Connectors Section */}
          {connectors.length > 0 && (
            <div className="bg-[#FF4B4B]/5 rounded-2xl p-4 border-b-[4px] border-[#E04343]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#FF4B4B]" />
                <h4 className="font-bold text-[#FF4B4B]">Transition Words</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {connectors.map((word, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-2 bg-white rounded-xl text-sm font-black text-[#FF4B4B] border-b-[3px] border-[#E04343]"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Step-by-step Guide */}
          {steps.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-[#1CB0F6]" />
                <h4 className="font-bold text-slate-700">{steps.length} Step-by-Step Guide</h4>
              </div>
              
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const isRevealed = revealedSteps.includes(index);
                  
                  return (
                    <div
                      key={index}
                      className={`rounded-2xl transition-all overflow-hidden border-b-[4px] ${
                        isRevealed 
                          ? 'bg-white border-[#1CB0F6] shadow-lg' 
                          : 'bg-slate-50 border-slate-200 hover:border-[#1CB0F6]'
                      }`}
                    >
                      <button
                        onClick={() => toggleStep(index)}
                        className="w-full p-4 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm border-b-[3px] ${
                            isRevealed 
                              ? 'bg-[#1CB0F6] text-white border-[#159EE0]' 
                              : 'bg-slate-200 text-slate-500 border-slate-300'
                          }`}>
                            {index + 1}
                          </div>
                          <span className={`font-bold ${isRevealed ? 'text-[#1CB0F6]' : 'text-slate-500'}`}>
                            {isRevealed ? step.title : 'Bấm để xem bước'}
                          </span>
                        </div>
                        
                        {isRevealed ? (
                          <ChevronUp className="w-5 h-5 text-[#58CC02]" />
                        ) : (
                          <Key className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      
                      {isRevealed && (
                        <div className="px-4 pb-4">
                          <p className="text-slate-600 text-sm leading-relaxed ml-11">
                            {step.content}
                          </p>
                          {step.example && (
                            <div className="ml-11 mt-3 p-3 bg-[#1CB0F6]/5 rounded-xl border-b-[3px] border-[#159EE0]">
                              <span className="text-xs font-bold uppercase text-[#1CB0F6] block mb-1">Ví dụ</span>
                              <span className="text-sm text-slate-700 font-bold italic">"{step.example}"</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chưa load hints */}
      {!hintsData && (
        <div className="text-center py-4">
          <p className="text-sm text-slate-500 mb-5 leading-relaxed px-4">
            {loading 
              ? 'AI đang phân tích đề bài...' 
              : 'Nhận hướng dẫn từng bước, từ vựng và cụm từ bằng tiếng Anh.'}
          </p>

          {!loading && (
            <button
              onClick={handleGetHints}
              disabled={disabled}
              className="w-full flex items-center justify-center gap-2 bg-[#FF4B4B] hover:bg-[#E04343] text-white px-6 py-4 rounded-2xl font-bold text-base shadow-lg border-b-[6px] border-[#C73838] hover:-translate-y-0.5 active:translate-y-[2px] active:border-b-[4px] transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Lấy gợi ý AI</span>
            </button>
          )}
          
          {loading && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-[#FF4B4B]" />
              <span className="text-xs font-bold text-[#FF4B4B] uppercase tracking-widest">Đang tải...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WritingHints;