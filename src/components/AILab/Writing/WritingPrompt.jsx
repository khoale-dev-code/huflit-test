// src/components/AILab/WritingPrompt.jsx
// HUBSTUDY Design: Nunito Font, Brand Colors, 3D Shadow Buttons

import React, { useState } from 'react';
import { Sparkles, Globe, Loader2 } from 'lucide-react';
import { translateText } from '../../../services/writingService';

const WritingPrompt = ({ 
  prompt, 
  translatedPrompt, 
  setTranslatedPrompt,
  selectedLevel,
  onGenerateCustomPrompt,
  generatingPrompt
}) => {
  const [translating, setTranslating] = useState(false);

  const handleTranslate = async () => {
    if (translatedPrompt) return;
    
    setTranslating(true);
    try {
      const translated = await translateText(prompt);
      setTranslatedPrompt(translated);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1CB0F6] to-[#159EE0] rounded-3xl shadow-xl p-6 text-white border-b-[8px] border-[#159EE0] font-nunito">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-2xl border-b-[4px] border-white/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-lg">Đề bài viết</h3>
            <p className="text-xs text-white/70">
              {selectedLevel === 'IELTS_5' && 'IELTS 5.0-5.5'}
              {selectedLevel === 'IELTS_6' && 'IELTS 6.0-6.5'}
              {selectedLevel === 'IELTS_7' && 'IELTS 7.0-7.5'}
              {selectedLevel === 'IELTS_8' && 'IELTS 8.0+'}
            </p>
          </div>
        </div>
        
        <button
          onClick={onGenerateCustomPrompt}
          disabled={generatingPrompt}
          className="flex items-center gap-2 bg-white text-[#1CB0F6] px-5 py-2.5 rounded-2xl font-bold border-b-[4px] border-white/50 shadow-sm hover:bg-white/90 transition-all disabled:opacity-70"
        >
          {generatingPrompt ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span className="text-sm">Tạo mới</span>
        </button>
      </div>

      {/* English prompt */}
      <div className="bg-white/10 rounded-2xl p-5 mb-4 border-b-[4px] border-white/20">
        <p className="text-sm leading-relaxed font-medium">{prompt}</p>
      </div>

      {/* Vietnamese translation */}
      {translatedPrompt ? (
        <div className="bg-white rounded-2xl p-5 text-slate-700 border-b-[4px] border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-[#1CB0F6]" />
            <span className="text-xs font-bold text-[#1CB0F6]">Bản dịch tiếng Việt</span>
          </div>
          <p className="text-sm leading-relaxed">{translatedPrompt}</p>
        </div>
      ) : (
        <button
          onClick={handleTranslate}
          disabled={translating}
          className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 py-3.5 rounded-2xl font-bold border-b-[4px] border-white/30 transition-all disabled:opacity-50"
        >
          {translating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Globe className="w-5 h-5" />
          )}
          <span className="text-sm">Dịch sang tiếng Việt</span>
        </button>
      )}
    </div>
  );
};

export default WritingPrompt;
