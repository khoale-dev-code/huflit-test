import React, { useState } from 'react';
import { getExamById, getExamParts, getExamQuestions, EXAM_DATA } from '../../data/examData';
import { BookOpen, FileText, CheckCircle, Sparkles, ChevronDown, Award, Target, ChevronUp } from 'lucide-react';

// Component riêng để hiển thị explanation với expand/collapse
const ExplanationSection = ({ explanation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!explanation) return null;

  // Kiểm tra độ dài text để quyết định có hiển thị nút expand không
  const isLongText = explanation.length > 250;
  const previewLength = 250;
  
  const displayText = isExpanded || !isLongText 
    ? explanation 
    : explanation.substring(0, previewLength) + '...';

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 md:p-5 lg:p-6 border-t-2 border-blue-100">
      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
        <div className="p-1.5 sm:p-2 md:p-2.5 lg:p-3 bg-blue-100 rounded-lg sm:rounded-xl flex-shrink-0">
          <Sparkles className="w-4 h-4 sm:w-5 md:w-5 lg:w-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm md:text-base font-bold text-blue-900 mb-1.5 sm:mb-2 md:mb-3">
            💡 Giải Thích Chi Tiết
          </h4>
          
          <p className="text-xs sm:text-sm md:text-base text-blue-800 leading-relaxed break-words whitespace-pre-wrap">
            {displayText}
          </p>
          
          {/* Nút expand/collapse chỉ hiển thị khi text dài */}
          {isLongText && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2.5 sm:mt-3 md:mt-4 flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm transition-colors duration-200 hover:bg-blue-100/50 px-2 py-1 rounded"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Thu gọn</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>Xem thêm</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ExamAnswersPage = () => {
  const [selectedExam, setSelectedExam] = useState('exam1');
  const [selectedPart, setSelectedPart] = useState('');

  const exam = getExamById(selectedExam);
  const parts = exam ? Object.keys(exam.parts) : [];
  const questions = selectedPart ? getExamQuestions(selectedExam, selectedPart) : [];

  React.useEffect(() => {
    setSelectedPart('');
  }, [selectedExam]);

  return (
    <div className="w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen">
      {/* Header (Mobile Optimized) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white shadow-lg sm:shadow-2xl">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
          {/* Badge */}
          <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 sm:w-4" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">HỆ THỐNG HỌC TẬP</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Tra Cứu Đáp Án
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Học tập hiệu quả với giải thích chi tiết
            </p>
          </div>

          {/* Stats Cards (Mobile Optimized) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-10 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, label: 'Đề thi', value: Object.keys(EXAM_DATA).length },
              { icon: FileText, label: 'Câu hỏi', value: '100+' },
              { icon: CheckCircle, label: 'Giải thích', value: '100%' },
              { icon: Award, label: 'Chất lượng', value: 'A+' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-2xl p-2.5 sm:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <stat.icon className="w-4 h-4 sm:w-5 md:w-6 mb-1 sm:mb-2 mx-auto" />
                <p className="text-base sm:text-lg md:text-2xl font-bold mb-0.5 sm:mb-1">{stat.value}</p>
                <p className="text-xs text-amber-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content (Mobile Optimized) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Filter Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          {/* Exam Selector */}
          <div className="group">
            <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-amber-800 mb-1.5 sm:mb-2 md:mb-3 ml-1">
              <BookOpen className="w-3.5 h-3.5 sm:w-4" />
              Chọn Đề Thi
            </label>
            <div className="relative">
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-white text-amber-900 font-semibold rounded-lg sm:rounded-2xl shadow-md border-2 border-amber-200 transition-all duration-300 hover:shadow-lg hover:border-amber-400 focus:shadow-lg focus:border-orange-500 focus:outline-none cursor-pointer appearance-none pr-9 sm:pr-11 text-xs sm:text-sm md:text-base"
              >
                {Object.keys(EXAM_DATA).map((key) => (
                  <option key={key} value={key}>
                    {EXAM_DATA[key]?.title || key.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="absolute right-2.5 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-4 h-4 sm:w-5 text-amber-600 group-hover:text-orange-600 transition-colors" />
              </div>
            </div>
          </div>

          {/* Part Selector */}
          {exam && parts.length > 0 && (
            <div className="group">
              <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-amber-800 mb-1.5 sm:mb-2 md:mb-3 ml-1">
                <FileText className="w-3.5 h-3.5 sm:w-4" />
                Chọn Phần Thi
              </label>
              <div className="relative">
                <select
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-white text-amber-900 font-semibold rounded-lg sm:rounded-2xl shadow-md border-2 border-amber-200 transition-all duration-300 hover:shadow-lg hover:border-amber-400 focus:shadow-lg focus:border-orange-500 focus:outline-none cursor-pointer appearance-none pr-9 sm:pr-11 text-xs sm:text-sm md:text-base"
                >
                  <option value="">-- Chọn phần --</option>
                  {parts.map((partId) => {
                    const part = exam.parts[partId];
                    return (
                      <option key={partId} value={partId}>
                        {part.title}
                      </option>
                    );
                  })}
                </select>
                <div className="absolute right-2.5 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 sm:w-5 text-amber-600 group-hover:text-orange-600 transition-colors" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        {selectedPart && questions.length > 0 ? (
          <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
            {/* Part Header */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg border-2 border-amber-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg sm:rounded-2xl shadow-lg flex-shrink-0">
                    <Target className="w-5 h-5 sm:w-6 md:w-8 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-amber-900 truncate">
                      {exam.parts[selectedPart].title}
                    </h2>
                    <p className="text-xs sm:text-sm text-amber-700 font-medium truncate">
                      {exam.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-2xl shadow-md border-2 border-amber-200 flex-shrink-0">
                  <span className="text-xs sm:text-sm text-amber-700 font-semibold whitespace-nowrap">Tổng:</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">{questions.length}</span>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-2.5 sm:space-y-3 md:space-y-5 lg:space-y-6">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="group bg-white rounded-lg sm:rounded-2xl md:rounded-3xl shadow-md hover:shadow-lg md:hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-amber-100 hover:border-orange-300"
                >
                  {/* Question Header */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-4 md:p-5 lg:p-6 border-b-2 border-amber-100">
                    <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">{q.id}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-amber-900 leading-relaxed break-words">
                          {q.question}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-2.5 md:space-y-3">
                    {q.options && q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-2.5 sm:p-3 md:p-4 lg:p-5 rounded-lg sm:rounded-2xl transition-all duration-300 border-2 ${
                          i === q.correct
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-sm hover:shadow-md'
                            : 'bg-amber-50/50 border-amber-200 hover:border-amber-300 hover:bg-amber-100/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                          <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm md:text-base lg:text-lg flex-shrink-0 shadow-sm ${
                            i === q.correct
                              ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
                              : 'bg-amber-200 text-amber-800'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className={`flex-1 font-medium text-xs sm:text-sm md:text-base lg:text-base leading-relaxed break-words ${
                            i === q.correct ? 'text-green-900' : 'text-amber-900'
                          }`}>
                            {opt}
                          </span>
                          {i === q.correct && (
                            <CheckCircle className="w-4 h-4 sm:w-5 md:w-6 lg:w-7 text-green-600 flex-shrink-0 animate-pulse" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explanation - FIX: Dùng component riêng */}
                  <ExplanationSection explanation={q.explanation} />
                </div>
              ))}
            </div>
          </div>
        ) : selectedPart ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg">
              <FileText className="w-8 h-8 sm:w-10 md:w-12 lg:w-16 text-amber-600" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-900 text-center mb-2">
              Chưa Có Câu Hỏi
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-amber-700 text-center max-w-md">
              Phần <span className="font-bold">{exam.parts[selectedPart].title}</span> chưa có câu hỏi
            </p>
          </div>
        ) : (
          // Initial State
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-24 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-200 rounded-full flex items-center justify-center mb-4 sm:mb-6 md:mb-8 shadow-2xl animate-pulse">
              <BookOpen className="w-10 h-10 sm:w-12 md:w-16 lg:w-20 text-orange-600" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-900 text-center mb-2 sm:mb-3">
              Bắt Đầu Học Tập
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-amber-700 text-center max-w-lg leading-relaxed">
              Chọn <span className="font-bold text-orange-600">đề thi</span> và <span className="font-bold text-orange-600">phần thi</span> để xem đáp án chi tiết
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamAnswersPage;