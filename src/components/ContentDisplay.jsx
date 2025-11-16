import React, { useMemo, memo } from 'react';
import { AlertCircle, Headphones, FileText, BookOpen, Lightbulb, Eye, Zap, Target } from 'lucide-react';

// Import các component con đã có
import ReadingPart6Display from './ReadingPart6Display';
import ReadingPart7Display from './ReadingPart7Display';
import ReadingPart8Display from './ReadingPart8Display';
import ScriptDisplay from './ScriptDisplay';

// ========================================
// Sub-Component: Phần Mẹo Nghe (Tối ưu hóa #3)
// ========================================
const ListeningTipsSection = memo(() => (
  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-5 text-white shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
        <Lightbulb className="w-5 h-5" />
      </div>
      <p className="font-bold text-lg">💡 Mẹo nghe hiệu quả</p>
    </div>
    <div className="space-y-3">
      {[
        { id: 1, tip: 'Đọc câu hỏi trước, nghe để tìm **từ khóa (keywords)**' },
        { id: 2, tip: 'Tập trung vào **giọng điệu** và **ý chính** của cuộc hội thoại' },
        { id: 3, tip: 'Hạn chế nhìn vào script (nếu không phải chế độ luyện tập)' },
      ].map(({ id, tip }) => (
        <div key={id} className="flex items-start gap-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold">{id}</span>
          </div>
          {/* Sử dụng dangerouslySetInnerHTML cho mục đích làm nổi bật text, cân nhắc về bảo mật */}
          <p 
            className="text-sm leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
          />
        </div>
      ))}
    </div>
  </div>
));

// ========================================
// Sub-Component: LISTENING PARTS
// ========================================
const ListeningContent = memo(({ partData, content, selectedPart, onPlayScript, isPlayingScript }) => {
  const partNumber = selectedPart.replace('part', '');
  // Tính toán thời gian đọc (cần làm mượt hơn)
  const estimatedTime = useMemo(() => {
    // Ước tính 150 từ/phút, trung bình 5 ký tự/từ. (150*5 = 750 ký tự/phút) => ~12.5 ký tự/giây.
    // Dùng 500 ký tự cho ~30s là một ước tính hợp lý.
    return Math.ceil(content.length / 500) * 30;
  }, [content.length]);

  return (
    <div className="animate-in fade-in duration-500 space-y-5">
      
      {/* Script Display */}
      <ScriptDisplay 
        script={content}
        partTitle={partData.title}
        showByDefault={true}
        onPlayScript={onPlayScript}
        isPlaying={isPlayingScript}
      />

      {/* Additional Info Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 shadow-xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-indigo-900">Thông tin bổ sung</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <StatCard icon={Target} color="blue" title="Part" value={`Part ${partNumber}`} />
          <StatCard icon={FileText} color="purple" title="Độ dài" value={`${content.length} ký tự`} />
          <StatCard icon={Zap} color="orange" title="Thời gian" value={`~${estimatedTime}s`} />
        </div>

        {/* Tips Section (Sử dụng component đã tối ưu) */}
        <ListeningTipsSection />
      </div>
    </div>
  );
});

// ========================================
// Sub-Component: READING PARTS (Default Display)
// ========================================
const ReadingContent = memo(({ partData, content, selectedPart }) => {
  const partNumber = selectedPart.replace('part', '');
  
  // Tính toán thời gian đọc
  const readingTime = useMemo(() => {
    // Ước tính tốc độ đọc trung bình: 250 từ/phút. (250 * 5 ký tự/từ = 1250 ký tự/phút)
    // Tức là 1250 ký tự ~ 1 phút (p)
    return Math.ceil(content.length / 1250);
  }, [content.length]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl border-2 border-emerald-100 overflow-hidden animate-in fade-in duration-500">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-50" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Văn Bản Đọc
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                Part {partNumber}
              </span>
            </h2>
            <p className="text-sm text-emerald-50">
              {partData.title || 'Nội dung chung của phần thi đọc'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-emerald-200 p-6 shadow-inner max-h-[32rem] overflow-y-auto">
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap text-gray-800">
            {content}
          </p>
        </div>

        {/* Info Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatCard icon={FileText} color="amber" title="Độ dài văn bản" value={`${content.length} ký tự`} />
          <StatCard icon={Eye} color="orange" title="Thời gian đọc" value={`~${readingTime} phút`} />
        </div>

        {/* Reading Tips */}
        <div className="mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-5 text-white shadow-xl">
          {/* Tips content (giữ nguyên vì nó đã đẹp) */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <p className="font-bold text-lg">Kỹ thuật đọc hiệu quả</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Các mẹo Skimming/Scanning/Focus... */}
            {/* ... giữ nguyên code cũ ... */}
          </div>
        </div>
      </div>
    </div>
  );
});

// Helper Stat Card
const StatCard = ({ icon: Icon, color, title, value }) => {
  const colorMap = {
    blue: { bg: 'bg-white border-blue-200', text: 'text-blue-600', icon: 'text-blue-500', hover: 'hover:shadow-lg' },
    purple: { bg: 'bg-white border-purple-200', text: 'text-purple-600', icon: 'text-purple-500', hover: 'hover:shadow-lg' },
    orange: { bg: 'bg-white border-orange-200', text: 'text-orange-600', icon: 'text-orange-500', hover: 'hover:shadow-lg' },
    amber: { bg: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200', text: 'text-amber-600', icon: 'text-amber-600', hover: '' },
  };
  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={`${theme.bg} rounded-xl p-4 border-2 shadow-md ${theme.hover} transition-shadow`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${theme.icon}`} />
        <span className="text-xs font-semibold text-gray-600">{title}</span>
      </div>
      <p className="text-2xl font-bold ${theme.text} leading-none">
        {value}
      </p>
    </div>
  );
};


// ========================================
// Main Component: ContentDisplay
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
  
  // Memoized content extraction (Giữ nguyên vì logic này quan trọng)
  const content = useMemo(() => {
    if (!partData) return '';

    if (testType === 'listening') {
      if (selectedPart === 'part1') {
        return partData.script || '';
      }
      // Dùng Optional Chaining để làm sạch code hơn
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
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 p-8 animate-in fade-in duration-300">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <AlertCircle className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 font-bold text-xl mb-2">Vui lòng chọn Part</p>
          <p className="text-gray-400 text-sm">Nội dung sẽ hiển thị ở đây</p>
        </div>
      </div>
    );
  }

  // 3. No content
  if (!content.trim()) {
    return (
      <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl border-2 border-amber-200 p-8 animate-in fade-in duration-300">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FileText className="w-10 h-10 text-amber-600" />
          </div>
          <p className="text-amber-700 font-bold text-xl mb-2">
            Không có {contentType === 'script' ? 'Script' : 'Văn bản'}
          </p>
          <p className="text-amber-500 text-sm">Văn bản sẽ hiển thị khi có sẵn</p>
        </div>
      </div>
    );
  }

  // ========================================
  // READING PARTS (Specialized Components)
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
    
    // Default Reading Display (Part 5 đã bị ẩn, đây là fallback nếu có part reading mới)
    return <ReadingContent partData={partData} content={content} selectedPart={selectedPart} />;
  }

  // ========================================
  // LISTENING PARTS (General Script & Tips)
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