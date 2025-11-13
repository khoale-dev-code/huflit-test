import React, { useCallback, useMemo } from 'react';
import { ChevronDown, BookOpen, Headphones } from 'lucide-react';
import { EXAM_DATA } from '../data/examData';

const PartSelector = React.memo(({ 
  selectedExam, 
  onExamChange, 
  testType, 
  onTestTypeChange, 
  selectedPart, 
  onPartChange, 
  examData, 
  partData 
}) => {
  
  // Memoized available parts
  const availableParts = useMemo(() => {
    if (!examData?.parts) return [];
    
    return Object.keys(examData.parts).filter(
      part => examData.parts[part].type === testType
    );
  }, [examData, testType]);

  // Memoized part info map
  const partInfoMap = useMemo(() => {
    const map = {};
    availableParts.forEach(part => {
      const data = examData?.parts?.[part];
      if (data) {
        map[part] = {
          title: data.title || part,
          questions: data.questions?.length || 0
        };
      }
    });
    return map;
  }, [availableParts, examData]);

  // Callbacks
  const handleExamChange = useCallback((e) => {
    onExamChange(e);
  }, [onExamChange]);

  const handleTestTypeChange = useCallback((e) => {
    onTestTypeChange(e);
  }, [onTestTypeChange]);

  const handlePartChange = useCallback((e) => {
    onPartChange(e);
  }, [onPartChange]);

  return (
    <div className="space-y-6">
      {/* === Exam & Test Type Selection === */}
      <div className="bg-white rounded-lg shadow-md border-2 border-amber-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-amber-600" />
          📝 Chọn Exam & Loại Bài Thi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Exam Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              📚 Bộ Đề Thi
            </label>
            <div className="relative">
              <select 
                value={selectedExam} 
                onChange={handleExamChange}
                className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 rounded-lg text-gray-900 font-semibold appearance-none cursor-pointer hover:border-amber-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              >
                <option value="">-- Chọn Exam --</option>
                {Object.keys(EXAM_DATA).map(examKey => (
                  <option key={examKey} value={examKey}>
                    {EXAM_DATA[examKey].title || examKey.toUpperCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600 pointer-events-none flex-shrink-0" />
            </div>
          </div>

          {/* Test Type Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700">
              🎯 Loại Bài Thi
            </label>
            <div className="relative">
              <select 
                value={testType} 
                onChange={handleTestTypeChange}
                className="w-full px-4 py-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-gray-900 font-semibold appearance-none cursor-pointer hover:border-yellow-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              >
                <option value="listening">🎧 Listening (Nghe)</option>
                <option value="reading">📖 Reading (Đọc)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-600 pointer-events-none flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* === Part Selection === */}
      {selectedExam && (
        <div className="bg-white rounded-lg shadow-md border-2 border-orange-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            {testType === 'listening' ? (
              <Headphones className="w-6 h-6 text-blue-600" />
            ) : (
              <BookOpen className="w-6 h-6 text-green-600" />
            )}
            📂 Chọn Part
          </h2>

          {availableParts.length > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <select 
                  className="w-full px-4 py-3 bg-orange-50 border-2 border-orange-300 rounded-lg text-gray-900 font-semibold appearance-none cursor-pointer hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                  value={selectedPart} 
                  onChange={handlePartChange}
                >
                  <option value="">-- Chọn Part --</option>
                  {availableParts.map(partKey => {
                    const info = partInfoMap[partKey];
                    return (
                      <option key={partKey} value={partKey}>
                        {info?.title} ({info?.questions} câu)
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-600 pointer-events-none flex-shrink-0" />
              </div>

              {/* Part Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {availableParts.map(partKey => {
                  const info = partInfoMap[partKey];
                  const isActive = selectedPart === partKey;
                  return (
                    <button
                      key={partKey}
                      onClick={() => onPartChange({ target: { value: partKey } })}
                      className={`p-3 rounded-lg transition-all text-center ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg border-2 border-orange-600'
                          : 'bg-amber-50 text-gray-800 border-2 border-amber-200 hover:border-orange-400 hover:bg-orange-50'
                      }`}
                    >
                      <p className="font-bold text-sm">{partKey.replace('part', 'P')}</p>
                      <p className="text-xs mt-1">{info?.questions} câu</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-gray-200">
              <p className="text-gray-500 font-semibold">Chọn Exam trước để xem Part</p>
            </div>
          )}
        </div>
      )}

      {/* === Part Information === */}
      {partData && (
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-3 rounded-lg ${testType === 'listening' ? 'bg-blue-100' : 'bg-green-100'}`}>
              {testType === 'listening' ? (
                <Headphones className="w-6 h-6 text-blue-600" />
              ) : (
                <BookOpen className="w-6 h-6 text-green-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 break-words">
                📌 {partData.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {partData.description}
              </p>
            </div>
          </div>

          {/* Script Preview for Listening */}
          {partData.script && testType === 'listening' && (
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg max-h-48 overflow-y-auto">
              <p className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1">
                <Headphones className="w-4 h-4" /> Script Preview:
              </p>
              <p className="text-sm text-blue-800 leading-relaxed line-clamp-6 whitespace-pre-wrap">
                {partData.script}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-gray-600 font-semibold">📊 Tổng Câu</p>
              <p className="text-2xl font-black text-orange-600 mt-1">
                {partData.questions?.length || 0}
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs text-gray-600 font-semibold">🎯 Loại</p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {partData.type === 'listening' ? '🎧 Listening' : '📖 Reading'}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-xs text-gray-600 font-semibold">⭐ Điểm/Câu</p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {testType === 'listening' ? '5 điểm' : '2.5 điểm'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

PartSelector.displayName = 'PartSelector';

export default PartSelector;