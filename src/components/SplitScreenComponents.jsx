// SplitScreenComponents.jsx
// Các component Split Screen cho Reading Part 6, 7, 8

import React from 'react';
import { BookOpen, HelpCircle, CheckCircle } from 'lucide-react';

// ========================================
// Component cho Part 6 - Split Screen
// ========================================
export const ReadingPart6SplitScreen = ({ part6, currentQuestionIndex, onAnswerSelect, userAnswers }) => {
  if (!part6 || !part6.questions) return null;

  const currentQuestion = part6.questions[currentQuestionIndex];
  
  // Render văn bản với highlight cho chỗ trống hiện tại
  const renderTextWithHighlight = () => {
    let displayText = part6.text;
    const fillQuestions = part6.questions.filter(q => q.type === "fill");
    
    fillQuestions.forEach(question => {
      const blank = `(${question.id})`;
      const marker = `**${question.id}**`;
      displayText = displayText.replace(blank, marker);
    });

    const splitParts = displayText.split(/\*\*(\d+)\*\*/);

    return (
      <div className="text-gray-800 leading-relaxed text-sm md:text-base">
        {splitParts.map((part, index) => {
          if (index % 2 === 0) {
            return <span key={index}>{part}</span>;
          } else {
            const questionId = part;
            const isCurrent = currentQuestion && currentQuestion.id === parseInt(questionId);
            return (
              <span
                key={index}
                className={`inline-block mx-1 px-3 py-1 rounded-lg font-bold text-sm transition-all ${
                  isCurrent
                    ? 'bg-yellow-200 border-2 border-yellow-500 text-yellow-900 animate-pulse'
                    : 'bg-amber-50 border-2 border-amber-300 text-amber-900'
                }`}
              >
                ({questionId})
              </span>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4">
      {/* Bên trái: Văn bản đọc */}
      <div className="lg:w-1/2 bg-white rounded-xl shadow-lg border-2 border-blue-100 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-white" />
          <h3 className="text-white font-bold text-lg">Văn Bản</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderTextWithHighlight()}
        </div>
      </div>

      {/* Bên phải: Câu hỏi hiện tại */}
      <div className="lg:w-1/2 bg-white rounded-xl shadow-lg border-2 border-emerald-100 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-white" />
            <h3 className="text-white font-bold text-lg">
              Câu {currentQuestionIndex + 1}/{part6.questions.length}
            </h3>
          </div>
          <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-semibold">
            ({currentQuestion?.id})
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-4">
            <p className="text-gray-700 font-semibold text-base mb-3">
              Chọn từ/cụm từ phù hợp để điền vào chỗ trống ({currentQuestion?.id}):
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion?.options.map((option, idx) => {
              const optionLetter = String.fromCharCode(65 + idx);
              const isSelected = userAnswers?.[currentQuestion.id] === idx;
              
              return (
                <button
                  key={idx}
                  onClick={() => onAnswerSelect?.(currentQuestion.id, idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 shadow-md'
                      : 'bg-white border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {optionLetter}
                    </div>
                    <span className="flex-1 text-gray-800 text-sm md:text-base pt-1">
                      {option}
                    </span>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation nếu có */}
          {currentQuestion?.explanation && userAnswers?.[currentQuestion.id] !== undefined && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-800 font-semibold mb-1">💡 Giải thích:</p>
              <p className="text-sm text-blue-700">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ========================================
// Component cho Part 7 - Split Screen
// ========================================
export const ReadingPart7SplitScreen = ({ part7, currentQuestionIndex, onAnswerSelect, userAnswers }) => {
  if (!part7 || !part7.questions) return null;

  const currentQuestion = part7.questions[currentQuestionIndex];

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4">
      {/* Bên trái: Văn bản đọc */}
      <div className="lg:w-1/2 bg-white rounded-xl shadow-lg border-2 border-purple-100 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-3 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-white" />
          <h3 className="text-white font-bold text-lg">Văn Bản</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              {part7.text}
            </p>
          </div>
        </div>
      </div>

      {/* Bên phải: Câu hỏi hiện tại */}
      <div className="lg:w-1/2 bg-white rounded-xl shadow-lg border-2 border-orange-100 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-white" />
            <h3 className="text-white font-bold text-lg">
              Câu {currentQuestionIndex + 1}/{part7.questions.length}
            </h3>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-4">
            <p className="text-gray-900 font-bold text-lg mb-3">
              {currentQuestion?.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion?.options.map((option, idx) => {
              const optionLetter = String.fromCharCode(65 + idx);
              const isSelected = userAnswers?.[currentQuestion.id] === idx;
              
              return (
                <button
                  key={idx}
                  onClick={() => onAnswerSelect?.(currentQuestion.id, idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 shadow-md'
                      : 'bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {optionLetter}
                    </div>
                    <span className="flex-1 text-gray-800 text-sm md:text-base pt-1">
                      {option}
                    </span>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {currentQuestion?.explanation && userAnswers?.[currentQuestion.id] !== undefined && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-800 font-semibold mb-1">💡 Giải thích:</p>
              <p className="text-sm text-blue-700">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ========================================
// Component cho Part 8 - Split Screen
// ========================================
export const ReadingPart8SplitScreen = ({ part8, currentQuestionIndex, onAnswerSelect, userAnswers }) => {
  if (!part8 || !part8.questions) return null;

  const currentQuestion = part8.questions[currentQuestionIndex];

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4">
      {/* Bên trái: Văn bản đọc (Chat/Messages) */}
      <div className="lg:w-1/2 bg-white rounded-xl shadow-lg border-2 border-indigo-100 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-white" />
          <h3 className="text-white font-bold text-lg">Hội Thoại</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              {part8.text}
            </p>
          </div>
        </div>
      </div>

      {/* Bên phải: Câu hỏi hiện tại */}
      <div className="lg:w-1/2 bg-white rounded-xl shadow-lg border-2 border-pink-100 overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-pink-600 to-pink-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-white" />
            <h3 className="text-white font-bold text-lg">
              Câu {currentQuestionIndex + 1}/{part8.questions.length}
            </h3>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-4">
            <p className="text-gray-900 font-bold text-lg mb-3">
              {currentQuestion?.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion?.options.map((option, idx) => {
              const optionLetter = String.fromCharCode(65 + idx);
              const isSelected = userAnswers?.[currentQuestion.id] === idx;
              
              return (
                <button
                  key={idx}
                  onClick={() => onAnswerSelect?.(currentQuestion.id, idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'bg-pink-50 border-pink-500 shadow-md'
                      : 'bg-white border-gray-200 hover:border-pink-300 hover:bg-pink-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {optionLetter}
                    </div>
                    <span className="flex-1 text-gray-800 text-sm md:text-base pt-1">
                      {option}
                    </span>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {currentQuestion?.explanation && userAnswers?.[currentQuestion.id] !== undefined && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-800 font-semibold mb-1">💡 Giải thích:</p>
              <p className="text-sm text-blue-700">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};