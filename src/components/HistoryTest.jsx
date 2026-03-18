// src/components/pages/HistoryTest.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, AlertCircle, Lightbulb, CalendarDays, BookOpen, Trophy } from 'lucide-react';
import { motion as Motion } from 'framer-motion'; // 🚀 FIX: Đổi tên thành Motion để pass regex
import { loadExamData } from '../data/examData';

/* ── Score pill ── */
const ScorePill = ({ score }) => {
  const isHigh = score >= 80, isMid = score >= 50;
  const bgClass = isHigh ? 'bg-[#58CC02]' : isMid ? 'bg-[#FF9600]' : 'bg-[#FF4B4B]';
  const borderClass = isHigh ? 'border-[#46A302]' : isMid ? 'border-[#E58700]' : 'border-[#E54343]';
  
  return (
    <div className={`flex items-center gap-2 ${bgClass} border-2 ${borderClass} border-b-[4px] text-white rounded-[14px] px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm`}>
      <Trophy size={18} strokeWidth={2.5} className="mb-0.5" />
      <span className="font-display font-black text-[16px] sm:text-[18px] leading-none">{score}%</span>
    </div>
  );
};

/* ── Tag pill ── */
const TagPill = ({ children, isBlue }) => (
  <span className={`inline-block border-2 border-b-[3px] rounded-[10px] px-2.5 py-1 font-display font-black text-[10px] sm:text-[11px] uppercase tracking-widest ${
    isBlue 
      ? 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]' 
      : 'bg-slate-100 text-slate-500 border-slate-200'
  }`}>
    {children}
  </span>
);

/* ── Option row ── */
const OptionRow = ({ opt, optIdx, isSelected, isActualCorrect, isWrongSelected }) => {
  let stateClass = 'bg-white border-slate-200 text-slate-600';
  let badgeClass = 'bg-slate-100 text-slate-400 border-slate-200';
  
  if (isActualCorrect) {
    stateClass = 'bg-[#f1faeb] border-[#bcf096] text-[#58CC02] border-b-[3px]';
    badgeClass = 'bg-[#58CC02] text-white border-transparent';
  } else if (isWrongSelected) {
    stateClass = 'bg-[#fff0f0] border-[#ffc1c1] text-[#FF4B4B] border-b-[3px]';
    badgeClass = 'bg-[#FF4B4B] text-white border-transparent';
  } else if (isSelected) {
     stateClass = 'bg-blue-50 border-blue-200 text-blue-600 border-b-[3px]';
     badgeClass = 'bg-blue-500 text-white border-transparent';
  }

  return (
    <div className={`flex items-center justify-between p-3 border-2 rounded-[16px] transition-colors ${stateClass}`}>
      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
        <span className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-[10px] border-2 border-b-[3px] font-display font-black text-[13px] ${badgeClass}`}>
          {String.fromCharCode(65 + optIdx)}
        </span>
        <span className="font-body font-bold text-[14px] sm:text-[15px] leading-snug pt-1">
          {opt}
        </span>
      </div>

      {isActualCorrect && (
        <div className="w-7 h-7 shrink-0 ml-3 bg-[#58CC02] border-2 border-[#46A302] border-b-[3px] rounded-full flex items-center justify-center">
          <Check size={16} color="white" strokeWidth={3} />
        </div>
      )}
      {isWrongSelected && (
        <div className="w-7 h-7 shrink-0 ml-3 bg-[#FF4B4B] border-2 border-[#E54343] border-b-[3px] rounded-full flex items-center justify-center">
          <X size={16} color="white" strokeWidth={3} />
        </div>
      )}
    </div>
  );
};

/* ── Question card ── */
const QuestionCard = ({ q, idx, userAnswers }) => {
  const userAnswerIdx = userAnswers[q.id];
  const isAnswered = userAnswerIdx !== undefined && userAnswerIdx !== null;
  const isCorrect = isAnswered && userAnswerIdx === q.correct;

  return (
    <div className="relative bg-white border-2 border-slate-200 border-b-[4px] rounded-[24px] p-4 sm:p-5 pt-7 sm:pt-8 shadow-sm">
      <div className="absolute -top-4 sm:-top-5 left-4 sm:left-5 w-10 h-10 sm:w-12 sm:h-12 bg-[#1CB0F6] border-2 border-[#1899D6] border-b-[4px] text-white rounded-[14px] sm:rounded-[16px] flex items-center justify-center font-display font-black text-[16px] sm:text-[18px] shadow-sm">
        {idx + 1}
      </div>

      <div className="mt-2">
        {q.script && (
          <div className="mb-4 p-3 sm:p-4 bg-slate-50 border-2 border-slate-200 rounded-[16px]">
            <p className="font-body font-bold text-[13px] sm:text-[14px] text-slate-500 italic leading-relaxed m-0">
              "{q.script}"
            </p>
          </div>
        )}

        <p className="font-body font-bold text-[15px] sm:text-[16px] text-slate-800 leading-snug mb-4">
          {q.question}
        </p>

        <div className="flex flex-col gap-2.5 sm:gap-3">
          {q.options.map((opt, optIdx) => (
            <OptionRow
              key={optIdx}
              opt={opt} optIdx={optIdx}
              isSelected={userAnswerIdx === optIdx}
              isActualCorrect={q.correct === optIdx}
              isWrongSelected={userAnswerIdx === optIdx && !isCorrect}
            />
          ))}
        </div>

        {!isAnswered && (
          <div className="flex items-center gap-3 mt-4 p-3 bg-[#FFFBEA] border-2 border-[#FFD8A8] border-b-[3px] rounded-[16px]">
            <AlertCircle size={20} className="text-[#FF9600] shrink-0" strokeWidth={2.5} />
            <p className="font-display font-bold text-[13px] text-[#FF9600] m-0 uppercase tracking-wide pt-0.5">
              Bạn đã bỏ trống câu này
            </p>
          </div>
        )}

        {q.explanation && (
          <div className="mt-4 p-4 sm:p-5 bg-[#EAF6FE] border-2 border-[#BAE3FB] rounded-[20px]">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-[10px] bg-[#1CB0F6] border-b-[3px] border-[#1899D6] flex items-center justify-center shrink-0 shadow-sm">
                <Lightbulb size={16} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-black text-[12px] sm:text-[13px] text-[#1CB0F6] uppercase tracking-widest pt-0.5">
                Giải thích
              </span>
            </div>
            <p className="font-body font-bold text-[13px] sm:text-[14px] text-slate-700 leading-relaxed m-0">
              {q.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Part section ── */
// 🚀 FIX: Xóa pIndex không sử dụng
const PartSection = ({ partData, userAnswers }) => {
  if (!partData?.questions) return null;
  return (
    <section className="mb-8 sm:mb-10">
      <div className="flex items-center gap-3 mb-5 p-4 bg-white border-2 border-slate-200 border-b-[4px] rounded-[20px] shadow-sm">
        <div className="w-12 h-12 rounded-[14px] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[3px] flex items-center justify-center shrink-0 shadow-sm">
          <BookOpen size={22} className="text-[#1CB0F6]" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="font-display font-black text-[16px] sm:text-[18px] text-slate-800 m-0 leading-none truncate">
            {partData.title || `Phần ${partData.id}`}
          </p>
          {partData.description && (
            <p className="font-body font-bold text-[12px] sm:text-[13px] text-slate-500 m-0 mt-1 truncate">
              {partData.description}
            </p>
          )}
        </div>
        <TagPill isBlue>{partData.questions.length} câu</TagPill>
      </div>

      <div className="flex flex-col gap-6">
        {partData.questions.map((q, idx) => (
          <QuestionCard key={q.id} q={q} idx={idx} userAnswers={userAnswers} />
        ))}
      </div>
    </section>
  );
};

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
const HistoryTest = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 🚀 FIX: Xóa useParams/progressId không sử dụng
  const progressItem = state?.progressItem;
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!progressItem) {
      setError('Không tìm thấy thông tin bài làm. Vui lòng quay lại danh sách.');
      setLoading(false);
      return;
    }
    const fetchExam = async () => {
      try {
        const targetExamId = progressItem.exam_id || progressItem.exam;
        if (!targetExamId) throw new Error('Dữ liệu bài làm bị lỗi: Không tìm thấy ID Đề thi.');
        const data = await loadExamData(targetExamId);
        if (!data) throw new Error('Không thể tải dữ liệu đề thi gốc từ hệ thống.');
        setExamData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [progressItem]);

  const allParts = useMemo(() => {
    if (!examData?.parts) return [];
    if (Array.isArray(examData.parts))
      return examData.parts.map(p => ({ ...p, id: String(p.id) }));
    return Object.entries(examData.parts).map(([key, val]) => ({ ...val, id: String(val.id || key) }));
  }, [examData]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA] flex-col gap-3 font-sans selection:bg-blue-200">
      <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <p className="font-display font-bold text-slate-500 text-[14px]">Đang tải bài làm...</p>
    </div>
  );

  if (error || !examData) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA] font-sans p-4 selection:bg-blue-200">
      <div className="bg-white border-2 border-slate-200 border-b-[6px] rounded-[24px] p-6 max-w-sm w-full text-center shadow-sm">
        <div className="w-16 h-16 bg-[#fff0f0] border-2 border-[#ffc1c1] border-b-[4px] rounded-[16px] flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-[#FF4B4B]" strokeWidth={2.5} />
        </div>
        <h2 className="font-display font-black text-[20px] text-slate-800 mb-2">Đã có lỗi xảy ra</h2>
        <p className="font-body font-bold text-[14px] text-slate-500 mb-6">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="w-full py-3 bg-slate-100 border-2 border-slate-200 border-b-[4px] text-slate-600 font-display font-bold text-[14px] uppercase tracking-wider rounded-[14px] hover:bg-slate-200 active:border-b-2 active:translate-y-[2px] transition-all outline-none"
        >
          Quay lại danh sách
        </button>
      </div>
    </div>
  );

  const isFullExam = !progressItem.part || progressItem.part === 'full-exam';
  const partsToRender = isFullExam
    ? allParts
    : allParts.filter(p => p.id === String(progressItem.part));

  const userAnswers = progressItem.answers_detail || progressItem.answers || {};
  const examDate = progressItem.created_at || progressItem.timestamp;
  const partLabel = isFullExam ? 'Full Test' : `Part ${String(progressItem.part).replace('part', '')}`;

  const totalQ = partsToRender.reduce((a, p) => a + (p.questions?.length || 0), 0);
  const correctQ = partsToRender.reduce((acc, p) =>
    acc + (p.questions || []).filter(q => {
      const ua = userAnswers[q.id];
      return ua !== undefined && ua !== null && ua === q.correct;
    }).length, 0);
  const skippedQ = partsToRender.reduce((acc, p) =>
    acc + (p.questions || []).filter(q => {
      const ua = userAnswers[q.id];
      return ua === undefined || ua === null;
    }).length, 0);

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans pb-16 selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b-2 border-slate-200 shadow-sm px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 sm:w-11 sm:h-11 bg-white border-2 border-slate-200 border-b-[3px] rounded-[12px] sm:rounded-[14px] flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 hover:bg-blue-50 active:border-b-2 active:translate-y-[1px] transition-all outline-none shrink-0"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </button>

            <div className="min-w-0 pt-0.5">
              <h1 className="font-display font-black text-[16px] sm:text-[18px] text-slate-800 m-0 truncate">
                {examData.title}
              </h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <TagPill isBlue>{partLabel}</TagPill>
                {examDate && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                    <span className="flex items-center gap-1.5 font-display font-bold text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest">
                      <CalendarDays size={12} strokeWidth={2.5} />
                      {new Date(examDate).toLocaleDateString('vi-VN')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <ScorePill score={progressItem.score} />
        </div>
      </header>

      <div className="bg-white border-b-2 border-slate-200 mb-6 sm:mb-8">
        <div className="max-w-4xl mx-auto flex items-center px-2 sm:px-4">
          {[
            { label: 'Đúng',   value: correctQ, color: 'text-[#58CC02]' },
            { label: 'Sai',    value: totalQ - correctQ - skippedQ,   color: 'text-[#FF4B4B]' },
            { label: 'Bỏ qua', value: skippedQ, color: 'text-[#FF9600]' },
            { label: 'Tổng',   value: totalQ,   color: 'text-[#1CB0F6]', noBorder: true },
          ].map((stat, i) => (
            <div key={i} className={`flex-1 flex flex-col items-center justify-center py-3 sm:py-4 ${!stat.noBorder ? 'border-r-2 border-slate-100' : ''}`}>
              <span className={`font-display font-black text-[18px] sm:text-[22px] leading-none ${stat.color}`}>{stat.value}</span>
              <span className="font-display font-bold text-[9px] sm:text-[11px] text-slate-400 uppercase tracking-widest mt-1 sm:mt-1.5">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-slate-100 w-full">
          <Motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${totalQ > 0 ? (correctQ / totalQ) * 100 : 0}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#58CC02] to-[#1CB0F6]" 
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {partsToRender.length === 0 && (
          <div className="text-center py-16 bg-white border-2 border-dashed border-slate-300 rounded-[24px] shadow-sm">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-4" strokeWidth={2.5} />
            <h3 className="text-[18px] sm:text-[20px] font-display font-black text-slate-700 mb-1">Trống rỗng</h3>
            <p className="text-slate-500 font-body font-bold text-[13px] sm:text-[14px]">Không tìm thấy phần thi nào.</p>
          </div>
        )}
        
        {partsToRender.map((partData, idx) => (
          <PartSection key={partData.id || idx} partData={partData} userAnswers={userAnswers} />
        ))}
      </main>
    </div>
  );
};

export default HistoryTest;