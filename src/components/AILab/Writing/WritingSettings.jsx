// src/components/AILab/WritingSettings.jsx
// HUBSTUDY Design: Nunito Font, Brand Colors, 3D Shadow Buttons

import React, { useState } from 'react';
import { BookOpen, GraduationCap, Target, FileText, ChevronDown, Check } from 'lucide-react';

const WRITING_TYPES = [
  { id: 'essay', label: 'Essay', desc: 'Bài luận', minWords: 150, maxWords: 300 },
  { id: 'email', label: 'Email', desc: 'Thư điện tử', minWords: 50, maxWords: 100 },
  { id: 'letter', label: 'Letter', desc: 'Thư từ', minWords: 80, maxWords: 150 },
  { id: 'report', label: 'Report', desc: 'Báo cáo', minWords: 150, maxWords: 200 },
  { id: 'paragraph', label: 'Paragraph', desc: 'Đoạn văn', minWords: 50, maxWords: 100 },
];

const TOPICS_BY_DIFFICULTY = {
  easy: [
    { id: 'hobby', label: 'Sở thích', prompt: 'Describe a hobby you enjoy and explain why it is important to you.' },
    { id: 'family', label: 'Gia đình', prompt: 'Describe your family and your role in your family.' },
    { id: 'friend', label: 'Bạn bè', prompt: 'Describe your best friend and explain why you are friends.' },
    { id: 'food', label: 'Ẩm thực', prompt: 'Describe your favorite food and explain why you like it.' },
    { id: 'travel', label: 'Du lịch', prompt: 'Describe a place you would like to visit and explain why.' },
  ],
  medium: [
    { id: 'education', label: 'Giáo dục', prompt: 'Discuss the advantages and disadvantages of online education compared to traditional classroom learning.' },
    { id: 'technology', label: 'Công nghệ', prompt: 'Some people believe that technology has made our lives easier. To what extent do you agree or disagree?' },
    { id: 'environment', label: 'Môi trường', prompt: 'Climate change is one of the most serious problems in the world today. What are the causes and effects of this problem?' },
    { id: 'work', label: 'Công việc', prompt: 'Some people prefer to work for themselves, while others prefer to work for a company. Discuss both views and give your opinion.' },
    { id: 'health', label: 'Sức khỏe', prompt: 'The government should spend money on promoting healthy lifestyles rather than treating people who are ill. To what extent do you agree?' },
  ],
  hard: [
    { id: 'society', label: 'Xã hội', prompt: 'In many countries, the gap between rich and poor is increasing. What are the causes and solutions to this problem?' },
    { id: 'culture', label: 'Văn hóa', prompt: 'Some people think that the spread of global brands and products is beneficial, while others think it is harmful. Discuss both views.' },
    { id: 'government', label: 'Chính phủ', prompt: 'Some people believe that governments should spend more money on preventing crime rather than on education and rehabilitation. To what extent do you agree?' },
    { id: 'media', label: 'Truyền thông', prompt: 'Social media has become the main source of news for many people. Do you think this is a positive or negative development?' },
    { id: 'development', label: 'Phát triển', prompt: 'Some people think that economic development is the only way to reduce poverty. Others think that it causes environmental problems. Discuss both views and give your own opinion.' },
  ]
};

const WORD_COUNTS = [
  { id: 'short', label: 'Ngắn', min: 50, max: 100 },
  { id: 'medium', label: 'Trung bình', min: 100, max: 200 },
  { id: 'long', label: 'Dài', min: 200, max: 350 },
  { id: 'custom', label: 'Tùy chỉnh', min: 50, max: 500 },
];

const LEVELS = [
  { id: 'IELTS_5', label: 'IELTS 5.0-5.5', score: 5.5, color: 'text-sky-600', bg: 'bg-sky-50' },
  { id: 'IELTS_6', label: 'IELTS 6.0-6.5', score: 6.5, color: 'text-sky-600', bg: 'bg-sky-50' },
  { id: 'IELTS_7', label: 'IELTS 7.0-7.5', score: 7.5, color: 'text-sky-600', bg: 'bg-sky-50' },
  { id: 'IELTS_8', label: 'IELTS 8.0+', score: 9, color: 'text-sky-600', bg: 'bg-sky-50' },
];

const WritingSettings = ({ 
  writingType, setWritingType,
  selectedLevel, setSelectedLevel,
  wordCountOption, setWordCountOption,
  customWordMin, setCustomWordMin,
  customWordMax, setCustomWordMax,
  difficulty, setDifficulty,
  selectedTopic, setSelectedTopic
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

 const CustomDropdown = ({ id, label, icon: Icon, valueLabel, children, colorClass = 'bg-[#1CB0F6]' }) => {
    const isOpen = openDropdown === id;
    
    return (
      <div className="relative">
        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
          {/* 🚀 Biến Icon đã được sử dụng ở đây */}
          <Icon className="w-5 h-5 text-[#1CB0F6]" />
          <span className="font-nunito">{label}</span>
        </label>
        <button
          onClick={() => toggleDropdown(id)}
          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border-b-[6px] transition-all text-left font-nunito ${
            isOpen 
              ? `${colorClass} text-white border-white shadow-lg` 
              : 'bg-white border-slate-200 hover:border-[#1CB0F6] shadow-sm'
          }`}
        >
          <span className="text-[15px] font-bold pr-2">{valueLabel}</span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-white' : 'text-slate-500'}`} />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-xl rounded-2xl z-20 py-2 max-h-72 overflow-y-auto">
              {children}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 font-nunito">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Loại bài viết */}
        <CustomDropdown
          id="type"
          label="Loại bài viết"
          icon={BookOpen}
          valueLabel={WRITING_TYPES.find(t => t.id === writingType)?.label || 'Chọn loại'}
        >
          {WRITING_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => { setWritingType(type.id); setOpenDropdown(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors font-nunito ${
                writingType === type.id ? 'bg-[#1CB0F6]/10' : ''
              }`}
            >
              <div>
                <span className={`block text-[15px] font-bold ${writingType === type.id ? 'text-[#1CB0F6]' : 'text-slate-700'}`}>
                  {type.label}
                </span>
                <span className="block text-xs text-slate-500">{type.desc}</span>
              </div>
              {writingType === type.id && <Check className="w-5 h-5 text-[#1CB0F6]" />}
            </button>
          ))}
        </CustomDropdown>

        {/* 2. Mục tiêu điểm */}
        <CustomDropdown
          id="level"
          label="Mục tiêu điểm"
          icon={GraduationCap}
          valueLabel={LEVELS.find(l => l.id === selectedLevel)?.label || 'Chọn band'}
        >
          {LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => { setSelectedLevel(level.id); setOpenDropdown(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors font-nunito ${
                selectedLevel === level.id ? 'bg-[#1CB0F6]/10' : ''
              }`}
            >
              <span className={`text-[15px] font-bold ${selectedLevel === level.id ? 'text-[#1CB0F6]' : 'text-slate-700'}`}>
                {level.label}
              </span>
              {selectedLevel === level.id && <Check className="w-5 h-5 text-[#1CB0F6]" />}
            </button>
          ))}
        </CustomDropdown>

        {/* 3. Chọn đề bài */}
        <CustomDropdown
          id="topic"
          label="Chủ đề bài viết"
          icon={Target}
          valueLabel={selectedTopic ? selectedTopic.label : 'Tự do (Chọn đề)'}
        >
          <div className="px-3 pb-2 mb-2 border-b border-slate-100 sticky top-0 bg-white z-10">
            <div className="flex bg-slate-100 rounded-xl p-1">
              {['easy', 'medium', 'hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setDifficulty(diff); 
                    setSelectedTopic(null); 
                  }}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all font-nunito ${
                    difficulty === diff
                      ? diff === 'easy' ? 'bg-[#58CC02] text-white shadow-md' 
                        : diff === 'medium' ? 'bg-[#1CB0F6] text-white shadow-md' 
                        : 'bg-[#FF4B4B] text-white shadow-md'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {diff === 'easy' ? 'Dễ' : diff === 'medium' ? 'TB' : 'Khó'}
                </button>
              ))}
            </div>
          </div>
          <div className="px-1">
            {TOPICS_BY_DIFFICULTY[difficulty].map((topic) => (
              <button
                key={topic.id}
                onClick={() => { setSelectedTopic(topic); setOpenDropdown(null); }}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left hover:bg-slate-50 transition-colors font-nunito ${
                  selectedTopic?.id === topic.id ? 'bg-[#1CB0F6]/10 text-[#1CB0F6] font-bold' : 'text-slate-700 text-[15px]'
                }`}
              >
                <span className="pr-2">{topic.label}</span>
                {selectedTopic?.id === topic.id && <Check className="w-5 h-5 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </CustomDropdown>

        {/* 4. Giới hạn từ */}
        <div>
          <CustomDropdown
            id="wordCount"
            label="Độ dài"
            icon={FileText}
            valueLabel={WORD_COUNTS.find(w => w.id === wordCountOption)?.label || 'Chọn số từ'}
          >
            {WORD_COUNTS.map((wc) => (
              <button
                key={wc.id}
                onClick={() => { setWordCountOption(wc.id); setOpenDropdown(null); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors font-nunito ${
                  wordCountOption === wc.id ? 'bg-[#1CB0F6]/10' : ''
                }`}
              >
                <div>
                  <span className={`block text-[15px] font-bold ${wordCountOption === wc.id ? 'text-[#1CB0F6]' : 'text-slate-700'}`}>
                    {wc.label}
                  </span>
                  {wc.id !== 'custom' && (
                    <span className="block text-xs text-slate-500">{wc.min}-{wc.max} từ</span>
                  )}
                </div>
                {wordCountOption === wc.id && <Check className="w-5 h-5 text-[#1CB0F6]" />}
              </button>
            ))}
          </CustomDropdown>

          {wordCountOption === 'custom' && (
            <div className="flex items-center gap-2 mt-3">
              <input
                type="number"
                value={customWordMin}
                onChange={(e) => setCustomWordMin(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1CB0F6] font-nunito bg-slate-50"
                placeholder="Từ"
              />
              <span className="text-slate-300 font-bold">-</span>
              <input
                type="number"
                value={customWordMax}
                onChange={(e) => setCustomWordMax(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:border-[#1CB0F6] font-nunito bg-slate-50"
                placeholder="Đến"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export { WRITING_TYPES, LEVELS, TOPICS_BY_DIFFICULTY };
export default WritingSettings;
