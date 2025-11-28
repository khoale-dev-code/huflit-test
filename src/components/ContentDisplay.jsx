import React, { useMemo, memo } from 'react';
import { AlertCircle, Headphones, FileText, BookOpen, Lightbulb, Eye, Zap, Target } from 'lucide-react';

// Import các component con
import ReadingPart6Display from './ReadingPart6Display';
import ReadingPart7Display from './ReadingPart7Display';
import ReadingPart8Display from './ReadingPart8Display';
import ScriptDisplay from './ScriptDisplay';

// ========================================
// Sub-Component: Phần Mẹo Nghe (Mobile Optimized)
// ========================================
const ListeningTipsSection = memo(() => (
  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl p-3.5 sm:p-5 text-white shadow-lg">
    <div className="flex items-center gap-2 mb-3 sm:mb-4">
      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <p className="font-bold text-sm sm:text-lg">💡 Mẹo nghe</p>
    </div>
    <div className="space-y-2 sm:space-y-3">
      {[
        { id: 1, tip: 'Đọc câu hỏi trước, nghe để tìm **từ khóa**' },
        { id: 2, tip: 'Tập trung vào **giọng điệu** và **ý chính**' },
        { id: 3, tip: 'Hạn chế nhìn script (nếu luyện tập)' },
      ].map(({ id, tip }) => (
        <div key={id} className="flex items-start gap-2 sm:gap-3 bg-white/10 rounded-lg p-2 sm:p-3 backdrop-blur-sm">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold">{id}</span>
          </div>
          <p 
            className="text-xs sm:text-sm leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
          />
        </div>
      ))}
    </div>
  </div>
));

ListeningTipsSection.displayName = 'ListeningTipsSection';

// ========================================
// Sub-Component: LISTENING PARTS (Mobile Optimized)
// ========================================
const ListeningContent = memo(({ partData, content, selectedPart, onPlayScript, isPlayingScript }) => {
  const partNumber = selectedPart.replace('part', '');
  
  const estimatedTime = useMemo(() => {
    return Math.ceil(content.length / 500) * 30;
  }, [content.length]);

  return (
    <div className="animate-in fade-in duration-500 space-y-3 sm:space-y-5">
      
      {/* Script Display */}
      <ScriptDisplay 
        script={content}
        partTitle={partData.title}
        showByDefault={true}
        onPlayScript={onPlayScript}
        isPlaying={isPlayingScript}
      />

      {/* Additional Info Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg sm:rounded-2xl p-3.5 sm:p-6 border-2 border-blue-200 shadow-xl">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 className="text-sm sm:text-lg font-bold text-indigo-900">Thông tin</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3.5 sm:mb-5">
          <StatCard icon={Target} color="blue" title="Part" value={`${partNumber}`} />
          <StatCard icon={FileText} color="purple" title="Độ dài" value={`${content.length}`} />
          <StatCard icon={Zap} color="orange" title="Thời gian" value={`~${estimatedTime}s`} />
        </div>

        {/* Tips Section */}
        <ListeningTipsSection />
      </div>
    </div>
  );
});

ListeningContent.displayName = 'ListeningContent';

// ========================================
// Sub-Component: READING PARTS (Mobile Optimized)
// ========================================
const ReadingContent = memo(({ partData, content, selectedPart }) => {
  const partNumber = selectedPart.replace('part', '');
  
  const readingTime = useMemo(() => {
    return Math.ceil(content.length / 1250);
  }, [content.length]);

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl border-2 border-emerald-100 overflow-hidden animate-in fade-in duration-500">
      {/* Header */}
      <div className="px-3 sm:px-6 py-3.5 sm:py-5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-50" />
        <div className="flex items-center gap-2 sm:gap-3 relative z-10">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-xl font-bold text-white flex items-center gap-2 flex-wrap">
              Văn Bản Đọc
              <span className="bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm whitespace-nowrap">
                Part {partNumber}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-50 mt-0.5">
              {partData.title || 'Nội dung đọc'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border-2 border-emerald-200 p-3 sm:p-6 shadow-inner max-h-[32rem] overflow-y-auto">
          <p className="text-xs sm:text-base leading-relaxed whitespace-pre-wrap text-gray-800 break-words">
            {content}
          </p>
        </div>

        {/* Info Stats */}
        <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-2 sm:gap-3">
          <StatCard icon={FileText} color="amber" title="Độ dài" value={`${content.length}`} />
          <StatCard icon={Eye} color="orange" title="Thời gian" value={`~${readingTime}p`} />
        </div>

        {/* Reading Tips */}
        <div className="mt-3 sm:mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl p-3.5 sm:p-5 text-white shadow-xl">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <p className="font-bold text-sm sm:text-lg">Kỹ thuật đọc</p>
          </div>
        </div>
      </div>
    </div>
  );
});

ReadingContent.displayName = 'ReadingContent';

// ========================================
// Helper: Stat Card (Mobile Optimized)
// ========================================
const StatCard = ({ icon: Icon, color, title, value }) => {
  const colorMap = {
    blue: { bg: 'bg-white border-blue-200', text: 'text-blue-600', icon: 'text-blue-500' },
    purple: { bg: 'bg-white border-purple-200', text: 'text-purple-600', icon: 'text-purple-500' },
    orange: { bg: 'bg-white border-orange-200', text: 'text-orange-600', icon: 'text-orange-500' },
    amber: { bg: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200', text: 'text-amber-600', icon: 'text-amber-600' },
  };
  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={`${theme.bg} rounded-lg sm:rounded-xl p-2.5 sm:p-4 border-2 shadow-md transition-shadow`}>
      <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme.icon}`} />
        <span className="text-xs font-semibold text-gray-600">{title}</span>
      </div>
      <p className={`text-lg sm:text-2xl font-bold ${theme.text} leading-none truncate`}>
        {value}
      </p>
    </div>
  );
};

StatCard.displayName = 'StatCard';

// ========================================
// Main Component: ContentDisplay (Mobile Optimized)
// ========================================
const ContentDisplay = memo(({ 
  partData, 
  selectedPart, 
  currentQuestionIndex, 
  testType,
  onPlayScript = null,
  isPlayingScript = false,
  onAnswerSelect = null
}) => {
  
  const content = useMemo(() => {
    if (!partData) return '';

    if (testType === 'listening') {
      if (selectedPart === 'part1') {
        return partData.script || '';
      }
      return partData.questions?.[currentQuestionIndex]?.script || partData.script || '';
    }
    
    return partData.text || '';
  }, [partData, selectedPart, currentQuestionIndex, testType]);

  const contentType = testType === 'listening' ? 'script' : 'text';

  // 1. Reading Part 5 -> Hide
  if (testType === 'reading' && selectedPart === 'part5') {
    return null;
  }

  // 2. No part data
  if (!partData) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-2xl shadow-xl border-2 border-gray-200 p-4 sm:p-8 animate-in fade-in duration-300">
        <div className="text-center py-6 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg">
            <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 font-bold text-base sm:text-xl mb-1 sm:mb-2">Chọn Part</p>
          <p className="text-gray-400 text-xs sm:text-sm">Nội dung sẽ hiển thị ở đây</p>
        </div>
      </div>
    );
  }

  // 3. No content
  if (!content.trim()) {
    return (
      <div className="bg-gradient-to-br from-white to-amber-50 rounded-lg sm:rounded-2xl shadow-xl border-2 border-amber-200 p-4 sm:p-8 animate-in fade-in duration-300">
        <div className="text-center py-6 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
          </div>
          <p className="text-amber-700 font-bold text-base sm:text-xl mb-1 sm:mb-2">
            Không có {contentType === 'script' ? 'Script' : 'Văn bản'}
          </p>
          <p className="text-amber-500 text-xs sm:text-sm">Sẽ hiển thị khi có sẵn</p>
        </div>
      </div>
    );
  }

  // ========================================
  // READING PARTS
  // ========================================
  if (testType === 'reading') {
    const commonProps = { content, partData, onAnswerSelect };
    
    if (selectedPart === 'part6') {
      return (
        <div className="animate-in fade-in duration-300">
          <ReadingPart6Display 
            part6={partData}
            examNumber={1} 
            onAnswerSelect={onAnswerSelect}
          />
        </div>
      );
    }

    if (selectedPart === 'part7') {
      return (
        <div className="animate-in fade-in duration-300">
          <ReadingPart7Display text={content} type="reading" />
        </div>
      );
    }

    if (selectedPart === 'part8') {
      return (
        <div className="animate-in fade-in duration-300">
          <ReadingPart8Display text={content} type="reading" />
        </div>
      );
    }
    
    return <ReadingContent partData={partData} content={content} selectedPart={selectedPart} />;
  }

  // ========================================
  // LISTENING PARTS
  // ========================================
  if (testType === 'listening') {
    return (
      <ListeningContent 
        partData={partData} 
        content={content} 
        selectedPart={selectedPart} 
        onPlayScript={onPlayScript} 
        isPlayingScript={isPlayingScript} 
      />
    );
  }

  return null;
});

ContentDisplay.displayName = 'ContentDisplay';

export default ContentDisplay;