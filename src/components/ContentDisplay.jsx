import React, { useMemo } from 'react';
import { AlertCircle, Headphones, FileText, BookOpen } from 'lucide-react'; // Thêm BookOpen
import ReadingPart6Display from './ReadingPart6Display';
import ReadingPart7Display from './ReadingPart7Display';
import ReadingPart8Display from './ReadingPart8Display';
import ScriptDisplay from './ScriptDisplay';

const ContentDisplay = React.memo(({ 
  partData, 
  selectedPart, 
  currentQuestionIndex, 
  testType,
  onPlayScript = null,
  isPlayingScript = false,
  onAnswerSelect = null // Thêm prop này cho Part 6
}) => {
  
  // Memoized content extraction
  const content = useMemo(() => {
    if (!partData) return '';

    if (testType === 'listening') {
      // For Part 1 (shared script for all questions), use partData.script
      if (selectedPart === 'part1') {
        return partData.script || '';
      }
      // For other parts, use question-specific script if available, else partData.script
      return partData.questions?.[currentQuestionIndex]?.script || partData.script || '';
    }
    
    // Reading - Use full text for the part
    return partData.text || '';
  }, [partData, selectedPart, currentQuestionIndex, testType]);

  // Memoized content type
  const contentType = useMemo(() => {
    return testType === 'listening' ? 'script' : 'text';
  }, [testType]);

  // ========================================
  // YÊU CẦU MỚI: ẨN NẾU LÀ READING PART 5 (vì Part 5 không có văn bản chung)
  // ========================================
  if (testType === 'reading' && selectedPart === 'part5') {
    // Part 5 thường chỉ hiển thị câu hỏi, không có nội dung văn bản (text/script)
    // Trả về null để ẩn component này
    return null;
  }

  // Nếu không có partData, hiển thị placeholder
  if (!partData) {
    return (
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 animate-in fade-in duration-300">
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 font-semibold text-lg">Vui lòng chọn Part để xem nội dung</p>
        </div>
      </div>
    );
  }

  // Nếu có partData nhưng không có nội dung (ngoại trừ Part 5 đã bị loại ở trên)
  if (!content.trim()) {
    return (
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 animate-in fade-in duration-300">
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 font-semibold text-lg">
            Không có {contentType === 'script' ? 'Script' : 'Văn bản'} cho Part này
          </p>
          <p className="text-gray-400 text-sm mt-2">Văn bản sẽ hiển thị ở đây nếu có.</p>
        </div>
      </div>
    );
  }

  // ========================================
  // READING PARTS (Sử dụng component chuyên biệt)
  // ========================================
  if (testType === 'reading') {
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
  }


  // ========================================
  // LISTENING PARTS - Hiển thị Script & Tips (Giao diện mới)
  // ========================================
  if (testType === 'listening') {
    const partNumber = selectedPart.replace('part', '');
    return (
      <div className="animate-in fade-in duration-300 space-y-5">
        
        {/* New Script Display Component */}
        <ScriptDisplay 
          script={content}
          partTitle={partData.title}
          showByDefault={true}
          onPlayScript={onPlayScript}
          isPlaying={isPlayingScript}
        />

        {/* Additional Info Section (Sử dụng theme xanh dương/tím) */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200 shadow-lg">
          <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center gap-2">
             <Headphones className='w-5 h-5 text-indigo-500' /> Thông tin bổ sung
          </h3>
          <div className="flex flex-wrap gap-4 border-b pb-4 border-blue-100">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-blue-300 shadow-sm">
              <span className="text-xs font-semibold text-gray-600">🎯 Part:</span>
              <span className="text-sm font-bold text-blue-600">
                Part {partNumber}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-purple-300 shadow-sm">
              <span className="text-xs font-semibold text-gray-600">📊 Ký tự:</span>
              <span className="text-sm font-bold text-purple-600">
                {content.length} ký tự
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-orange-300 shadow-sm">
              <span className="text-xs font-semibold text-gray-600">⏱️ Thời gian:</span>
              <span className="text-sm font-bold text-orange-600">
                ~{Math.ceil(content.length / 500) * 30} giây (ước tính)
              </span>
            </div>
          </div>

          {/* Tips for Listening */}
          <div className="mt-4 p-4 rounded-lg border-l-4 bg-indigo-50 border-indigo-500 text-indigo-900">
            <p className="text-xs font-bold mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Mẹo nghe hiệu quả:</span>
            </p>
            <ul className="text-xs space-y-1 ml-6 list-disc">
              <li>Đọc câu hỏi trước, nghe để tìm **từ khóa (keywords)**.</li>
              <li>Tập trung vào **giọng điệu** và **ý chính** của cuộc hội thoại.</li>
              <li>Hạn chế nhìn vào script (nếu không phải là chế độ luyện tập).</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // READING PARTS (Default/Generic display cho những part còn lại)
  // ========================================
  return (
    <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 overflow-hidden animate-in fade-in duration-300">
      {/* Header (Sử dụng theme xanh lá cây/xanh ngọc) */}
      <div className="px-6 py-4 border-b-2 bg-gradient-to-r from-emerald-50 to-green-100 border-emerald-200">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-emerald-900">
              📖 Văn Bản Đọc - Part {selectedPart.replace('part', '')}
            </h2>
            <p className="text-xs text-emerald-700">
              {partData.title || 'Nội dung chung của phần thi đọc'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="p-5 rounded-lg border-2 leading-relaxed whitespace-pre-wrap overflow-y-auto bg-green-50 border-emerald-300 text-green-900 max-h-[30rem] shadow-inner">
          <p className="text-sm md:text-base font-medium">
            {content}
          </p>
        </div>

        {/* Info Footer */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-xs font-semibold text-gray-600">📊 Độ dài:</span>
            <span className="text-sm font-bold text-orange-600">
              {content.length} ký tự
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-xl border border-yellow-200">
            <span className="text-xs font-semibold text-gray-600">⏱️ Ước tính đọc:</span>
            <span className="text-sm font-bold text-orange-600">
              ~{Math.ceil(content.length / 250) * 60} giây
            </span>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 p-4 rounded-lg border-l-4 bg-emerald-50 border-emerald-500 text-emerald-900">
          <p className="text-xs font-bold mb-2 flex items-center gap-2">💡 Mẹo:</p>
          <ul className="text-xs space-y-1 ml-6 list-disc">
            <li>Lướt qua văn bản để nắm được **chủ đề chính**.</li>
            <li>Sử dụng kỹ thuật **Scanning & Skimming** để tìm thông tin nhanh.</li>
            <li>Đừng cố gắng đọc và hiểu từng từ một.</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

ContentDisplay.displayName = 'ContentDisplay';

export default ContentDisplay;