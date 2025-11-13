import React, { useMemo } from 'react';
import { AlertCircle, Headphones, FileText } from 'lucide-react';
import ReadingPart7Display from './ReadingPart7Display';
import ReadingPart8Display from './ReadingPart8Display';
import ScriptDisplay from './ScriptDisplay';

const ContentDisplay = React.memo(({ 
  partData, 
  selectedPart, 
  currentQuestionIndex, 
  testType,
  onPlayScript = null,
  isPlayingScript = false
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

  // If no content, show placeholder
  if (!partData) {
    return (
      <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 p-6">
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 font-semibold">Vui lòng chọn Part để xem nội dung</p>
        </div>
      </div>
    );
  }

  if (!content.trim()) {
    return (
      <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 p-6">
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 font-semibold">
            Không có {contentType === 'script' ? 'script' : 'văn bản'} cho phần này
          </p>
          <p className="text-gray-400 text-sm mt-2">Kiểm tra lại dữ liệu hoặc chọn part khác</p>
        </div>
      </div>
    );
  }

  // Reading Part 7 - Email/Advertisement/Article
  if (testType === 'reading' && selectedPart === 'part7') {
    return (
      <div className="animate-in fade-in duration-300">
        <ReadingPart7Display text={content} type="reading" />
      </div>
    );
  }

  // Reading Part 8 - Text Message Chain
  if (testType === 'reading' && selectedPart === 'part8') {
    return (
      <div className="animate-in fade-in duration-300">
        <ReadingPart8Display text={content} type="reading" />
      </div>
    );
  }

  // ========================================
  // LISTENING PARTS - USE NEW ScriptDisplay
  // ========================================
  if (testType === 'listening') {
    return (
      <div className="animate-in fade-in duration-300 space-y-4">
        {/* New Script Display Component */}
        <ScriptDisplay 
          script={content}
          partTitle={partData.title}
          showByDefault={true}
          onPlayScript={onPlayScript}
          isPlaying={isPlayingScript}
        />

        {/* Additional Info Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 shadow-md">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-blue-300 shadow-sm">
              <span className="text-xs font-semibold text-gray-600">📊 Độ dài:</span>
              <span className="text-sm font-bold text-blue-600">
                {Math.ceil(content.length / 50)} × 50 ký tự
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-purple-300 shadow-sm">
              <span className="text-xs font-semibold text-gray-600">⏱️ Thời gian:</span>
              <span className="text-sm font-bold text-purple-600">
                ~30-60 giây
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-orange-300 shadow-sm">
              <span className="text-xs font-semibold text-gray-600">🎯 Part:</span>
              <span className="text-sm font-bold text-orange-600">
                {selectedPart.replace('part', 'Part ')}
              </span>
            </div>
          </div>

          {/* Tips for Listening */}
          <div className="mt-4 p-4 rounded-lg border-l-4 bg-blue-50 border-blue-500 text-blue-900">
            <p className="text-xs font-bold mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Mẹo nghe hiệu quả:</span>
            </p>
            <ul className="text-xs space-y-1 ml-6">
              <li>✓ Đọc câu hỏi trước khi nghe để biết thông tin cần chú ý</li>
              <li>✓ Chú ý các từ khóa: tên người, số liệu, thời gian, địa điểm</li>
              <li>✓ Sử dụng chức năng lọc theo người nói để tập trung</li>
              <li>✓ Nghe nhiều lần với các tốc độ khác nhau để làm quen</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // READING PARTS (Default) - Keep original display
  // ========================================
  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="px-6 py-4 border-b-2 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-green-900">
              📖 Văn Bản
            </h2>
            <p className="text-xs text-green-700">
              Part {selectedPart.replace('part', '')} - Đọc kỹ
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="p-5 rounded-lg border-2 leading-relaxed whitespace-pre-wrap overflow-y-auto bg-green-50 border-green-300 text-green-900 max-h-96">
          <p className="text-sm md:text-base font-medium">
            {content}
          </p>
        </div>

        {/* Info Footer */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
            <span className="text-xs font-semibold text-gray-600">📊 Độ dài:</span>
            <span className="text-sm font-bold text-orange-600">
              {Math.ceil(content.length / 50)} × 50 ký tự
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <span className="text-xs font-semibold text-gray-600">⏱️ Thời gian:</span>
            <span className="text-sm font-bold text-orange-600">
              ~3-5 phút
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg border border-orange-200">
            <span className="text-xs font-semibold text-gray-600">🎯 Loại:</span>
            <span className="text-sm font-bold text-orange-600">
              Reading
            </span>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 p-4 rounded-lg border-l-4 bg-green-50 border-green-500 text-green-900">
          <p className="text-xs font-bold mb-2">💡 Mẹo:</p>
          <ul className="text-xs space-y-1">
            <li>✓ Đọc tiêu đề và câu hỏi trước</li>
            <li>✓ Tìm những từ khóa trong câu hỏi</li>
            <li>✓ Đọc kỹ tất cả các lựa chọn trước khi chọn</li>
            <li>✓ Chú ý đến các chi tiết như số liệu, tên riêng</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

ContentDisplay.displayName = 'ContentDisplay';

export default ContentDisplay;