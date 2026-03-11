import React, { memo, useMemo } from 'react';
import { Trophy, TrendingUp, Target, RotateCcw, ChevronLeft, AlertCircle, Zap } from 'lucide-react';
import StepIndicator from '../../StepIndicator';
import { COLORS } from '../../constants/colors';
import { ScoreDisplay } from './ScoreDisplay';
import { PartResults } from './PartResults';

// Format answer key consistent with system
const generateAnswerKey = ({ section, part, question }) => `${section}-${part}-q${question}`;

export const ResultsScreen = memo(({ examData, answers, onRetry, onExit }) => {

  if (!examData || !examData.parts) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Đang tải kết quả...</p>
        </div>
      </div>
    );
  }

  // ─── 1. CALCULATE SCORES DIRECTLY FROM ARRAY ───
  const { results, partResults, allParts } = useMemo(() => {
    let listeningCorrect = 0;
    let listeningTotal = 0;
    let readingCorrect = 0;
    let readingTotal = 0;

    const listeningByPart = {};
    const readingByPart = {};
    const partsStats = [];

    const partsArr = Array.isArray(examData.parts) ? examData.parts : Object.values(examData.parts);

    const listeningParts = partsArr.filter(p => p.type === 'listening');
    const readingParts = partsArr.filter(p => p.type === 'reading');

    // Score Listening
    listeningParts.forEach((part, index) => {
      const qCount = part.questions?.length || 0;
      let partCorrect = 0;

      part.questions?.forEach((q, qIdx) => {
        listeningTotal++;
        const key = generateAnswerKey({ section: 'listening', part: part.id, question: qIdx + 1 });
        const userAnswer = answers[key];
        if (userAnswer !== undefined && userAnswer !== null && String(userAnswer) === String(q.correct)) {
          listeningCorrect++;
          partCorrect++;
        }
      });

      const displayIndex = index + 1;
      listeningByPart[displayIndex] = partCorrect;
      partsStats.push({ name: `Nghe ${displayIndex}`, score: partCorrect, max: qCount, section: 'listening' });
    });

    // Score Reading
    readingParts.forEach((part, index) => {
      const qCount = part.questions?.length || 0;
      let partCorrect = 0;

      part.questions?.forEach((q, qIdx) => {
        readingTotal++;
        const key = generateAnswerKey({ section: 'reading', part: part.id, question: qIdx + 1 });
        const userAnswer = answers[key];
        if (userAnswer !== undefined && userAnswer !== null && String(userAnswer) === String(q.correct)) {
          readingCorrect++;
          partCorrect++;
        }
      });

      const displayIndex = index + 1;
      readingByPart[displayIndex] = partCorrect;
      partsStats.push({ name: `Đọc ${displayIndex}`, score: partCorrect, max: qCount, section: 'reading' });
    });

    const totalCorrect = listeningCorrect + readingCorrect;
    const totalQuestions = listeningTotal + readingTotal;
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const listeningScore = listeningTotal > 0 ? Math.round((listeningCorrect / listeningTotal) * 100) : 0;
    const readingScore = readingTotal > 0 ? Math.round((readingCorrect / readingTotal) * 100) : 0;

    let cefrLevel = 'A1';
    if (averageScore >= 90) cefrLevel = 'C1';
    else if (averageScore >= 75) cefrLevel = 'B2';
    else if (averageScore >= 50) cefrLevel = 'B1';
    else if (averageScore >= 30) cefrLevel = 'A2';

    return {
      results: {
        totalCorrect,
        totalQuestions,
        averageScore,
        listeningScore,
        readingScore,
        cefrLevel
      },
      partResults: {
        listeningByPart,
        readingByPart,
        totalListening: listeningTotal,
        totalReading: readingTotal
      },
      allParts: partsStats.filter(p => p.max > 0)
    };
  }, [examData, answers]);

  // ─── 2. FIND STRENGTHS & WEAKNESSES ───
  const { strongest, weakest } = useMemo(() => {
    if (allParts.length === 0) return { strongest: null, weakest: null };
    
    let best = allParts[0];
    let worst = allParts[0];

    allParts.forEach(p => {
      const pRatio = p.score / p.max;
      const bestRatio = best.score / best.max;
      const worstRatio = worst.score / worst.max;

      if (pRatio > bestRatio) best = p;
      if (pRatio < worstRatio) worst = p;
    });

    return { strongest: best, weakest: worst };
  }, [allParts]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans" style={{ fontFamily: '-apple-system, "Segoe UI", "Roboto", sans-serif' }}>
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight italic leading-tight">
                HUBSTUDY <span className="text-blue-600">Results</span>
              </h1>
              <p className="text-gray-600 text-xs md:text-sm font-medium mt-1">Báo cáo điểm chi tiết và phân tích kỹ năng của bạn.</p>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-green-50 border border-green-200 rounded-lg w-fit">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" strokeWidth={2} />
              <span className="text-sm md:text-base font-bold text-green-700">Hoàn thành</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 md:py-5">
        <div className="max-w-6xl mx-auto">
          <StepIndicator currentMode="results" listeningComplete={true} />
        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-4 md:space-y-6">
        
        {/* Completion Message */}
        <div className="bg-white rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50 p-5 md:p-6 text-center shadow-xs">
          <Trophy className="w-12 h-12 md:w-14 md:h-14 text-green-600 mx-auto mb-2 md:mb-3" />
          <h2 className="text-xl md:text-2xl font-bold text-green-900 mb-1">Hoàn thành bài thi!</h2>
          <p className="text-sm md:text-base font-medium text-green-800">
            Bài làm của bạn đã được nộp và chấm điểm thành công.
          </p>
        </div>

        {/* Main Results Grid - Centered Score */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-xs">
          <div className="max-w-sm mx-auto">
            <ScoreDisplay results={results} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Total Score */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-xs">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Tổng</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">
              {results.totalCorrect}/{results.totalQuestions}
            </p>
            <p className="text-xs font-medium text-gray-600 mt-1">câu đúng</p>
          </div>

          {/* Listening Score */}
          <div className="bg-white rounded-lg border border-blue-200 p-3 md:p-4 text-center shadow-xs">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Nghe</p>
            <p className="text-lg md:text-2xl font-bold text-blue-900">
              {results.listeningScore}%
            </p>
            <p className="text-xs font-medium text-blue-700 mt-1">điểm</p>
          </div>

          {/* Reading Score */}
          <div className="bg-white rounded-lg border border-amber-200 p-3 md:p-4 text-center shadow-xs">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Đọc</p>
            <p className="text-lg md:text-2xl font-bold text-amber-900">
              {results.readingScore}%
            </p>
            <p className="text-xs font-medium text-amber-700 mt-1">điểm</p>
          </div>

          {/* CEFR Level */}
          <div className="bg-white rounded-lg border border-purple-200 p-3 md:p-4 text-center shadow-xs">
            <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">Trình độ</p>
            <p className="text-lg md:text-2xl font-bold text-purple-900">
              {results.cefrLevel}
            </p>
            <p className="text-xs font-medium text-purple-700 mt-1">CEFR</p>
          </div>
        </div>

        {/* Performance Insights */}
        {strongest && weakest && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            
            {/* Strengths */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-xs">
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                </div>
                Điểm mạnh
              </h3>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-bold text-green-900 mb-2">
                  🎯 {strongest.name}
                </p>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-medium text-green-800">
                    {strongest.score}/{strongest.max} câu
                  </p>
                  <p className="text-sm font-bold text-green-700">
                    {Math.round((strongest.score / strongest.max) * 100)}%
                  </p>
                </div>
                <div className="w-full h-2.5 bg-green-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 transition-all duration-1000"
                    style={{ width: `${(strongest.score / strongest.max) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-xs">
              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" strokeWidth={2.5} />
                </div>
                Cần cải thiện
              </h3>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm font-bold text-orange-900 mb-2">
                  📚 {weakest.name}
                </p>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-medium text-orange-800">
                    {weakest.score}/{weakest.max} câu
                  </p>
                  <p className="text-sm font-bold text-orange-700">
                    {Math.round((weakest.score / weakest.max) * 100)}%
                  </p>
                </div>
                <div className="w-full h-2.5 bg-orange-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-600 transition-all duration-1000"
                    style={{ width: `${(weakest.score / weakest.max) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Part-by-Part Results */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 shadow-xs">
          <PartResults partResults={partResults} />
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-5 shadow-xs">
          <h3 className="font-bold text-base md:text-lg text-blue-900 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" strokeWidth={2} />
            Gợi ý cải thiện
          </h3>
          <ul className="space-y-2 text-xs md:text-sm font-medium text-blue-900">
            {results.averageScore >= 75 ? (
              <>
                <li>✅ Trình độ rất tốt! Sẵn sàng cho môi trường sử dụng tiếng Anh nâng cao.</li>
                <li>✅ Hãy duy trì thói quen luyện tập để giữ vững phong độ.</li>
              </>
            ) : results.averageScore >= 50 ? (
              <>
                <li>✅ Khá tốt! Bạn có nền tảng tiếng Anh ổn định.</li>
                {weakest && <li>✅ Dành thêm thời gian luyện tập cho <strong>{weakest.name}</strong> để nâng cao tổng điểm.</li>}
              </>
            ) : (
              <>
                <li>✅ Đừng nản chí! Hãy bắt đầu ôn tập từ những chủ điểm cơ bản.</li>
                {weakest && <li>✅ Ưu tiên cải thiện <strong>{weakest.name}</strong> đầu tiên.</li>}
              </>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onRetry}
            className="flex-1 py-3 md:py-4 rounded-lg font-bold text-white text-base md:text-lg uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: COLORS.blue }}
          >
            <RotateCcw className="w-5 h-5" strokeWidth={2} />
            <span>Làm lại</span>
          </button>
          <button
            onClick={onExit}
            className="flex-1 py-3 md:py-4 rounded-lg font-bold text-gray-700 bg-gray-100 border border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 hover:bg-gray-200 active:scale-95 text-base md:text-lg uppercase tracking-wide"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            <span>Thoát</span>
          </button>
        </div>
      </div>
    </div>
  );
});

ResultsScreen.displayName = 'ResultsScreen';
export default ResultsScreen;