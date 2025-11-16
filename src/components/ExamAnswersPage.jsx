import React, { useState } from 'react';
import { getExamById, getExamParts, getExamQuestions, EXAM_DATA } from '../data/examData';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 shadow-2xl">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml;utf8,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat"
        }}></div>
        
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block mb-3 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <span className="text-sm font-semibold">✨ Học Tập Hiệu Quả</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
            Xem Đáp Án Chi Tiết Đề Thi
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Tra cứu các câu hỏi và giải thích chi tiết để nâng cao kỹ năng của bạn
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Exam Selector */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-slate-700 mb-3 ml-1">
              📚 Chọn đề thi
            </label>
            <div className="relative">
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-6 py-4 bg-white text-slate-900 font-medium rounded-2xl shadow-md border-2 border-transparent transition-all duration-300 hover:shadow-lg focus:shadow-xl focus:border-blue-500 focus:outline-none cursor-pointer appearance-none pr-12"
              >
                {Object.keys(EXAM_DATA).map((key) => (
                  <option key={key} value={key}>
                    {EXAM_DATA[key]?.title || key.toUpperCase()}
                  </option>
                ))}
              </select>
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          {/* Part Selector */}
          {exam && parts.length > 0 && (
            <div className="relative group">
              <label className="block text-sm font-semibold text-slate-700 mb-3 ml-1">
                📖 Chọn phần
              </label>
              <div className="relative">
                <select
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  className="w-full px-6 py-4 bg-white text-slate-900 font-medium rounded-2xl shadow-md border-2 border-transparent transition-all duration-300 hover:shadow-lg focus:shadow-xl focus:border-indigo-500 focus:outline-none cursor-pointer appearance-none pr-12"
                >
                  <option value="">-- Vui lòng chọn phần --</option>
                  {parts.map((partId) => {
                    const part = exam.parts[partId];
                    return (
                      <option key={partId} value={partId}>
                        {part.title} ({part.type.toUpperCase()})
                      </option>
                    );
                  })}
                </select>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Questions Display */}
        {selectedPart && questions.length > 0 ? (
          <div className="space-y-8">
            {/* Part Title */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              <h2 className="text-4xl font-bold text-slate-800">
                {exam.parts[selectedPart].title}
              </h2>
            </div>

            {/* Info Banner */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-sm">
              <p className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Thông tin phần thi
              </p>
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2 rounded-full shadow-lg">
                <span className="text-white font-medium">Tổng:</span>
                <span className="bg-white text-orange-600 font-bold px-4 py-1 rounded-full min-w-12 text-center">
                  {questions.length}
                </span>
                <span className="text-white font-medium">câu</span>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300"
                >
                  {/* Question Header */}
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">
                          {q.id}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-slate-900 leading-relaxed">
                          {q.question}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="p-6 space-y-3">
                    {q.options && q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl transition-all duration-200 border-2 cursor-pointer ${
                          i === q.correct
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-mono font-bold text-lg w-8 h-8 flex items-center justify-center rounded-lg ${
                            i === q.correct
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-300 text-slate-700'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className={`flex-1 font-medium ${i === q.correct ? 'text-green-800' : 'text-slate-700'}`}>
                            {opt}
                          </span>
                          {i === q.correct && (
                            <span className="text-2xl animate-pulse">✅</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-t border-slate-200">
                    <p className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-3">
                      <span className="text-xl">💡</span>
                      Giải thích chi tiết
                    </p>
                    <p className="text-slate-700 leading-relaxed text-base">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : selectedPart ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl font-semibold text-slate-700 text-center">
              Không có câu hỏi nào trong phần <span className="text-blue-600">{exam.parts[selectedPart].title}</span>
            </p>
            <p className="text-slate-500 mt-2">Vui lòng kiểm tra lại dữ liệu hoặc chọn phần khác</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="text-7xl mb-4">👆</div>
            <p className="text-2xl font-bold text-slate-700 text-center mb-2">
              Bắt đầu học tập
            </p>
            <p className="text-slate-500 text-lg text-center">
              Chọn một đề thi và một phần để xem đáp án chi tiết
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamAnswersPage;