import React, { useMemo, memo } from 'react';
import { AlertCircle, Headphones, FileText, BookOpen, Lightbulb, Eye, Zap, Target } from 'lucide-react';

// Import các component con
import Part6Display from './ReadingPart6Display';
import ReadingPart7Display from './ReadingPart7Display';
import ReadingPart8Display from './ReadingPart8Display';
import ScriptDisplay from './ScriptDisplay';

// ========================================
// HELPER COMPONENT: StatCard (Mobile Optimized)
// ========================================
const StatCard = memo(({ icon: Icon, color, title, value }) => {
  const colorMap = {
    blue: { 
      bg: 'bg-white border-blue-200', 
      text: 'text-blue-600', 
      icon: 'text-blue-500' 
    },
    purple: { 
      bg: 'bg-white border-purple-200', 
      text: 'text-purple-600', 
      icon: 'text-purple-500' 
    },
    orange: { 
      bg: 'bg-white border-orange-200', 
      text: 'text-orange-600', 
      icon: 'text-orange-500' 
    },
    amber: { 
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200', 
      text: 'text-amber-600', 
      icon: 'text-amber-600' 
    },
  };
  
  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={`${theme.bg} rounded-lg sm:rounded-xl p-2.5 sm:p-4 border-2 shadow-md transition-all hover:shadow-lg`}>
      <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${theme.icon}`} />
        <span className="text-xs font-semibold text-gray-600">{title}</span>
      </div>
      <p className={`text-lg sm:text-2xl font-bold ${theme.text} leading-none truncate`}>
        {value}
      </p>
    </div>
  );
});

StatCard.displayName = 'StatCard';

// ========================================
// SUB-COMPONENT: Listening Tips Section
// ========================================
const ListeningTipsSection = memo(() => (
  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl p-3.5 sm:p-5 text-white shadow-lg">
    <div className="flex items-center gap-2 mb-3 sm:mb-4">
      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <p className="font-bold text-sm sm:text-lg">💡 Mẹo nghe hiệu quả</p>
    </div>
    
    <div className="space-y-2 sm:space-y-3">
      {[
        { id: 1, tip: 'Đọc câu hỏi trước khi nghe, chú ý **từ khóa** quan trọng' },
        { id: 2, tip: 'Tập trung vào **giọng điệu** và **ý chính** của đoạn hội thoại' },
        { id: 3, tip: 'Hạn chế nhìn script khi luyện tập để cải thiện khả năng nghe' },
      ].map(({ id, tip }) => (
        <div 
          key={id} 
          className="flex items-start gap-2 sm:gap-3 bg-white/10 rounded-lg p-2 sm:p-3 backdrop-blur-sm hover:bg-white/15 transition-colors"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold">{id}</span>
          </div>
          <p 
            className="text-xs sm:text-sm leading-relaxed" 
            dangerouslySetInnerHTML={{ 
              __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') 
            }} 
          />
        </div>
      ))}
    </div>
  </div>
));

ListeningTipsSection.displayName = 'ListeningTipsSection';

// ========================================
// SUB-COMPONENT: Reading Tips Section
// ========================================
const ReadingTipsSection = memo(() => (
  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl p-3.5 sm:p-5 text-white shadow-xl">
    <div className="flex items-center gap-2 mb-2 sm:mb-3">
      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <p className="font-bold text-sm sm:text-lg">📖 Kỹ thuật đọc hiệu quả</p>
    </div>
    
    <div className="space-y-2 sm:space-y-3">
      {[
        { id: 1, tip: 'Đọc **lướt nhanh** toàn bộ văn bản để nắm ý chính' },
        { id: 2, tip: 'Chú ý **từ khóa** và **câu chủ đề** ở mỗi đoạn văn' },
        { id: 3, tip: 'Đọc kỹ phần liên quan đến câu hỏi, không cần đọc hết' },
      ].map(({ id, tip }) => (
        <div 
          key={id} 
          className="flex items-start gap-2 sm:gap-3 bg-white/10 rounded-lg p-2 sm:p-3 backdrop-blur-sm hover:bg-white/15 transition-colors"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold">{id}</span>
          </div>
          <p 
            className="text-xs sm:text-sm leading-relaxed" 
            dangerouslySetInnerHTML={{ 
              __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') 
            }} 
          />
        </div>
      ))}
    </div>
  </div>
));

ReadingTipsSection.displayName = 'ReadingTipsSection';

// ========================================
// MAIN COMPONENT: Listening Content
// ========================================
const ListeningContent = memo(({ 
  partData, 
  content, 
  selectedPart, 
  onPlayScript, 
  isPlayingScript 
}) => {
  const partNumber = selectedPart.replace('part', '');
  
  // Tính thời gian nghe ước tính (dựa trên độ dài script)
  const estimatedTime = useMemo(() => {
    return Math.ceil(content.length / 500) * 30; // ~30s cho mỗi 500 ký tự
  }, [content.length]);

  return (
    <div className="animate-in fade-in duration-500 space-y-3 sm:space-y-5">
      
      {/* ===== SCRIPT DISPLAY ===== */}
      <ScriptDisplay 
        script={content}
        partTitle={partData.title}
        showByDefault={true}
        onPlayScript={onPlayScript}
        isPlaying={isPlayingScript}
      />

      {/* ===== ADDITIONAL INFO SECTION ===== */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg sm:rounded-2xl p-3.5 sm:p-6 border-2 border-blue-200 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 className="text-sm sm:text-lg font-bold text-indigo-900">Thông tin chi tiết</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3.5 sm:mb-5">
          <StatCard 
            icon={Target} 
            color="blue" 
            title="Part" 
            value={partNumber} 
          />
          <StatCard 
            icon={FileText} 
            color="purple" 
            title="Độ dài" 
            value={`${content.length}`} 
          />
          <StatCard 
            icon={Zap} 
            color="orange" 
            title="Thời gian" 
            value={`~${estimatedTime}s`} 
          />
        </div>

        {/* Tips Section */}
        <ListeningTipsSection />
      </div>
    </div>
  );
});

ListeningContent.displayName = 'ListeningContent';

// ========================================
// MAIN COMPONENT: Reading Content (Generic)
// ========================================
const ReadingContent = memo(({ partData, content, selectedPart }) => {
  const partNumber = selectedPart.replace('part', '');
  
  // Tính thời gian đọc ước tính (dựa trên tốc độ đọc 250 từ/phút)
  const readingTime = useMemo(() => {
    return Math.ceil(content.length / 1250); // ~5 ký tự/từ, 250 từ/phút
  }, [content.length]);

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl border-2 border-emerald-100 overflow-hidden animate-in fade-in duration-500">
      
      {/* ===== HEADER ===== */}
      <div className="px-3 sm:px-6 py-3.5 sm:py-5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-50" />
        
        <div className="flex items-center gap-2 sm:gap-3 relative z-10">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-xl font-bold text-white flex items-center gap-2 flex-wrap">
              Văn Bản Đọc
              <span className="bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm whitespace-nowrap">
                Part {partNumber}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-50 mt-0.5">
              {partData.title || 'Nội dung đọc hiểu'}
            </p>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-3 sm:p-6">
        
        {/* Text Content Container */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border-2 border-emerald-200 p-3 sm:p-6 shadow-inner max-h-[32rem] overflow-y-auto">
          <p className="text-xs sm:text-base leading-relaxed whitespace-pre-wrap text-gray-800 break-words">
            {content}
          </p>
        </div>

        {/* Info Stats */}
        <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-2 sm:gap-3">
          <StatCard 
            icon={FileText} 
            color="amber" 
            title="Độ dài" 
            value={`${content.length} ký tự`} 
          />
          <StatCard 
            icon={Eye} 
            color="orange" 
            title="Thời gian" 
            value={`~${readingTime} phút`} 
          />
        </div>

        {/* Reading Tips */}
        <div className="mt-3 sm:mt-5">
          <ReadingTipsSection />
        </div>
      </div>
    </div>
  );
});

ReadingContent.displayName = 'ReadingContent';

// ========================================
// MAIN COMPONENT: Empty State
// ========================================
const EmptyState = memo(({ type = 'no-part' }) => {
  const states = {
    'no-part': {
      icon: AlertCircle,
      iconColor: 'text-gray-400',
      bgGradient: 'from-white to-gray-50',
      borderColor: 'border-gray-200',
      title: 'Chọn Part để bắt đầu',
      description: 'Nội dung sẽ hiển thị ở đây'
    },
    'no-content': {
      icon: FileText,
      iconColor: 'text-amber-600',
      bgGradient: 'from-white to-amber-50',
      borderColor: 'border-amber-200',
      title: 'Không có nội dung',
      description: 'Nội dung sẽ được cập nhật sau'
    }
  };

  const state = states[type] || states['no-part'];
  const Icon = state.icon;

  return (
    <div className={`bg-gradient-to-br ${state.bgGradient} rounded-lg sm:rounded-2xl shadow-xl border-2 ${state.borderColor} p-4 sm:p-8 animate-in fade-in duration-300`}>
      <div className="text-center py-6 sm:py-12">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${state.bgGradient} rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-lg`}>
          <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${state.iconColor}`} />
        </div>
        <p className="text-gray-600 font-bold text-base sm:text-xl mb-1 sm:mb-2">
          {state.title}
        </p>
        <p className="text-gray-400 text-xs sm:text-sm">
          {state.description}
        </p>
      </div>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

// ========================================
// MAIN COMPONENT: ContentDisplay
// ========================================
const ContentDisplay = memo(({ 
  partData, 
  selectedPart, 
  currentQuestionIndex, 
  testType,
  onPlayScript = null,
  isPlayingScript = false
}) => {
  
  // ===== EXTRACT CONTENT =====
  const content = useMemo(() => {
    if (!partData) return '';

    // Listening: Lấy script từ question hiện tại hoặc part
    if (testType === 'listening') {
      if (selectedPart === 'part1') {
        return partData.script || '';
      }
      return partData.questions?.[currentQuestionIndex]?.script || partData.script || '';
    }
    
    // Reading: Lấy text từ part
    return partData.text || '';
  }, [partData, selectedPart, currentQuestionIndex, testType]);

  // ===== CASE 1: HIDE FOR READING PART 5 =====
  if (testType === 'reading' && selectedPart === 'part5') {
    return null;
  }

  // ===== CASE 2: NO PART DATA =====
  if (!partData) {
    return <EmptyState type="no-part" />;
  }

  // ===== CASE 3: NO CONTENT =====
  if (!content.trim()) {
    return <EmptyState type="no-content" />;
  }

  // ========================================
  // RENDER: READING PARTS
  // ========================================
  if (testType === 'reading') {
    
    // Part 6: Text Completion (với chỗ trống)
    if (selectedPart === 'part6') {
      return (
        <div className="animate-in fade-in duration-300">
          <Part6Display part6={partData} />
        </div>
      );
    }

    // Part 7: Multiple Documents (Email, Letter, etc.)
    if (selectedPart === 'part7') {
      return (
        <div className="animate-in fade-in duration-300">
          <ReadingPart7Display text={content} type="reading" />
        </div>
      );
    }

    // Part 8: Chat Threads / Multiple Texts
    if (selectedPart === 'part8') {
      return (
        <div className="animate-in fade-in duration-300">
          <ReadingPart8Display text={content} type="reading" />
        </div>
      );
    }
    
    // Default Reading Content (Part 1-4)
    return (
      <ReadingContent 
        partData={partData} 
        content={content} 
        selectedPart={selectedPart} 
      />
    );
  }

  // ========================================
  // RENDER: LISTENING PARTS
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

  // ===== FALLBACK: EMPTY STATE =====
  return null;
});

ContentDisplay.displayName = 'ContentDisplay';

export default ContentDisplay;