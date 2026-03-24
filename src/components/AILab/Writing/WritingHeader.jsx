// src/components/AILab/WritingHeader.jsx
// HUBSTUDY Design: Nunito Font, Brand Colors, 3D Shadow Buttons

import React from 'react';
import { ArrowLeft, Clock, Lightbulb, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WritingHeader = ({ showTimer, setShowTimer, timeLeft, formatTime, showHints, setShowHints, showHistory, setShowHistory }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b-2 border-[#1CB0F6]/20 sticky top-0 z-50 font-nunito">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border-b-[4px] border-slate-200"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-lg font-black text-slate-800 whitespace-nowrap">
              ✨ Luyện viết IELTS
            </h1>
          </div>
          
          {/* Right side - buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Timer toggle */}
            <button
              onClick={() => setShowTimer(!showTimer)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm transition-all border-b-[4px] ${
                showTimer 
                  ? 'bg-[#FF4B4B] text-white border-[#E04343] shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#FF4B4B] shadow-sm'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">{showTimer ? formatTime(timeLeft) : 'Timer'}</span>
            </button>
            
            {/* Hints toggle */}
            <button
              onClick={() => setShowHints(!showHints)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm transition-all border-b-[4px] ${
                showHints 
                  ? 'bg-[#FF4B4B] text-white border-[#E04343] shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#FF4B4B] shadow-sm'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Gợi ý</span>
            </button>
            
            {/* History toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm transition-all border-b-[4px] ${
                showHistory 
                  ? 'bg-[#1CB0F6] text-white border-[#159EE0] shadow-lg' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#1CB0F6] shadow-sm'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Lịch sử</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingHeader;
