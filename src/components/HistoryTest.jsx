// src/components/pages/HistoryTest.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, X, AlertCircle } from 'lucide-react';
import { loadExamData } from '../data/examData';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const HistoryTest = () => {
  const { state } = useLocation();
  const { id: progressId } = useParams();
  const navigate = useNavigate();

  const progressItem = state?.progressItem;
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!progressItem) {
      setError("Không tìm thấy thông tin bài làm.");
      setLoading(false);
      return;
    }

    const fetchExam = async () => {
      try {
        const data = await loadExamData(progressItem.exam);
        if (!data) throw new Error("Không thể tải dữ liệu đề thi.");
        setExamData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [progressItem]);

  if (loading) return <LoadingSpinner message="Đang tải dữ liệu bài làm..." />;

  if (error || !examData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-lg font-bold text-slate-800 mb-2">Đã có lỗi xảy ra</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          Quay lại
        </button>
      </div>
    );
  }

  // Kết hợp data giữa "Bài thi gốc" và "Câu trả lời của User"
  // Xác định xem user làm Full Test hay làm từng Part và SẮP XẾP LẠI theo Part 1 -> Part X
  const partsToRender = progressItem.part === 'full-exam' 
    ? Object.keys(examData.parts).sort((a, b) => {
        // Tách số từ chữ "part1" -> 1, "part10" -> 10
        const numA = parseInt(a.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.replace(/\D/g, '')) || 0;
        return numA - numB;
      })
    : [progressItem.part];

  const userAnswers = progressItem.answers || {};

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Chi tiết bài làm</h1>
            <p className="text-xs text-slate-500">{examData.title} · Score: <span className="font-bold text-blue-600">{progressItem.score}</span></p>
          </div>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
          Ngày làm: {new Date(progressItem.timestamp).toLocaleString('vi-VN')}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-8 px-4">
        {partsToRender.map(partKey => {
          const partData = examData.parts[partKey];
          if (!partData || !partData.questions) return null;

          return (
            <div key={partKey} className="mb-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-lg font-bold text-slate-800 uppercase">
                  {partData.title || partKey}
                </h2>
                <p className="text-sm text-slate-500 mt-1">{partData.description}</p>
              </div>

              <div className="space-y-8">
                {partData.questions.map((q, idx) => {
                  const userAnswerIdx = userAnswers[q.id];
                  const isAnswered = userAnswerIdx !== undefined && userAnswerIdx !== null;
                  const isCorrect = isAnswered && userAnswerIdx === q.correct;

                  return (
                    <div key={q.id} className="relative pl-4 border-l-2 border-slate-100">
                      {/* Question Text */}
                      <p className="text-[15px] font-semibold text-slate-800 mb-4 leading-relaxed">
                        <span className="text-blue-600 mr-2">{idx + 1}.</span>
                        {q.question}
                      </p>

                      {/* Options */}
                      <div className="space-y-2.5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAnswerIdx === optIdx;
                          const isActualCorrect = q.correct === optIdx;

                          let optClass = "border-slate-200 bg-white text-slate-700";
                          let Icon = null;

                          if (isActualCorrect) {
                            optClass = "border-green-500 bg-green-50 text-green-800 ring-1 ring-green-500";
                            Icon = <Check className="w-4 h-4 text-green-600" />;
                          } else if (isSelected && !isCorrect) {
                            optClass = "border-red-400 bg-red-50 text-red-800";
                            Icon = <X className="w-4 h-4 text-red-600" />;
                          }

                          return (
                            <div key={optIdx} className={`flex items-center justify-between p-3 rounded-xl border ${optClass}`}>
                              <div className="flex items-center gap-3">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                                  ${isActualCorrect ? 'bg-green-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'}`}
                                >
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="text-sm font-medium">{opt}</span>
                              </div>
                              {Icon}
                            </div>
                          );
                        })}
                      </div>

                      {/* Not Answered Alert */}
                      {!isAnswered && (
                        <p className="mt-3 text-sm font-medium text-amber-600 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4" /> Bạn đã bỏ trống câu này.
                        </p>
                      )}

                      {/* Explanation */}
                      {q.explanation && (
                        <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-xs font-bold text-slate-500 uppercase mb-1">Giải thích</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default HistoryTest;