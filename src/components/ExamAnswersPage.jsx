import React, { useState } from 'react';
import { getExamById, getExamParts, getExamQuestions, EXAM_DATA } from '../data/examData';
import { BookOpen, FileText, CheckCircle, Sparkles, ChevronDown, Award, Target } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header - Warm Professional Style */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white shadow-2xl">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">HỆ THỐNG HỌC TẬP THÔNG MINH</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Tra Cứu Đáp Án Đề Thi
            </h1>
            <p className="text-lg sm:text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Học tập hiệu quả với giải thích chi tiết từng câu hỏi
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, label: 'Đề thi', value: Object.keys(EXAM_DATA).length },
              { icon: FileText, label: 'Câu hỏi', value: '100+' },
              { icon: CheckCircle, label: 'Giải thích', value: '100%' },
              { icon: Award, label: 'Chất lượng', value: 'A+' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <stat.icon className="w-6 h-6 mb-2 mx-auto" />
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-amber-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Filter Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10">
          {/* Exam Selector */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-amber-800 mb-3 ml-1">
              <BookOpen className="w-4 h-4" />
              Chọn Đề Thi
            </label>
            <div className="relative">
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-5 py-4 bg-white text-amber-900 font-semibold rounded-2xl shadow-md border-2 border-amber-200 transition-all duration-300 hover:shadow-xl hover:border-amber-400 focus:shadow-xl focus:border-orange-500 focus:outline-none cursor-pointer appearance-none pr-12 text-base"
              >
                {Object.keys(EXAM_DATA).map((key) => (
                  <option key={key} value={key}>
                    {EXAM_DATA[key]?.title || key.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="w-5 h-5 text-amber-600 group-hover:text-orange-600 transition-colors" />
              </div>
            </div>
          </div>

          {/* Part Selector */}
          {exam && parts.length > 0 && (
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-amber-800 mb-3 ml-1">
                <FileText className="w-4 h-4" />
                Chọn Phần Thi
              </label>
              <div className="relative">
                <select
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  className="w-full px-5 py-4 bg-white text-amber-900 font-semibold rounded-2xl shadow-md border-2 border-amber-200 transition-all duration-300 hover:shadow-xl hover:border-amber-400 focus:shadow-xl focus:border-orange-500 focus:outline-none cursor-pointer appearance-none pr-12 text-base"
                >
                  <option value="">-- Chọn phần cần xem --</option>
                  {parts.map((partId) => {
                    const part = exam.parts[partId];
                    return (
                      <option key={partId} value={partId}>
                        {part.title}
                      </option>
                    );
                  })}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-amber-600 group-hover:text-orange-600 transition-colors" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        {selectedPart && questions.length > 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Part Header */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-amber-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-1">
                      {exam.parts[selectedPart].title}
                    </h2>
                    <p className="text-amber-700 text-sm font-medium">
                      {exam.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-md border-2 border-amber-200">
                  <span className="text-amber-700 font-semibold">Tổng số câu:</span>
                  <span className="text-2xl font-bold text-orange-600">{questions.length}</span>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-5 sm:space-y-6">
              {questions.map((q, qIndex) => (
                <div
                  key={q.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-amber-100 hover:border-orange-300"
                >
                  {/* Question Header */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 sm:p-6 border-b-2 border-amber-100">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg sm:text-xl">{q.id}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base sm:text-lg font-semibold text-amber-900 leading-relaxed break-words">
                          {q.question}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {q.options && q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-4 sm:p-5 rounded-2xl transition-all duration-300 border-2 ${
                          i === q.correct
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md hover:shadow-lg'
                            : 'bg-amber-50/50 border-amber-200 hover:border-amber-300 hover:bg-amber-100/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0 shadow-sm ${
                            i === q.correct
                              ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
                              : 'bg-amber-200 text-amber-800'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </div>
                          <span className={`flex-1 font-medium text-sm sm:text-base leading-relaxed break-words ${
                            i === q.correct ? 'text-green-900' : 'text-amber-900'
                          }`}>
                            {opt}
                          </span>
                          {i === q.correct && (
                            <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 flex-shrink-0 animate-pulse" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 sm:p-6 border-t-2 border-blue-100">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 bg-blue-100 rounded-xl flex-shrink-0">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-bold text-blue-900 mb-2 sm:mb-3">
                          💡 Giải Thích Chi Tiết
                        </h4>
                        <p className="text-sm sm:text-base text-blue-800 leading-relaxed break-words">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : selectedPart ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-amber-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-amber-900 text-center mb-3">
              Chưa Có Câu Hỏi
            </h3>
            <p className="text-amber-700 text-center max-w-md text-sm sm:text-base">
              Phần <span className="font-bold">{exam.parts[selectedPart].title}</span> hiện chưa có câu hỏi nào
            </p>
          </div>
        ) : (
          // Initial State
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
            <div className="w-28 h-28 sm:w-40 sm:h-40 bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-200 rounded-full flex items-center justify-center mb-8 shadow-2xl animate-pulse">
              <BookOpen className="w-14 h-14 sm:w-20 sm:h-20 text-orange-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-900 text-center mb-4">
              Bắt Đầu Học Tập
            </h3>
            <p className="text-amber-700 text-center max-w-lg text-base sm:text-lg leading-relaxed">
              Vui lòng chọn <span className="font-bold text-orange-600">đề thi</span> và <span className="font-bold text-orange-600">phần thi</span> để xem đáp án chi tiết
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamAnswersPage;