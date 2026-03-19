import React, { useState, useCallback, useMemo, useEffect, useRef, memo } from 'react';
import {
  Lightbulb, ChevronDown, ChevronUp, Brain,
  Copy, Check, Target, Zap, Volume2, VolumeX,
  MessageCircleHeart
} from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import useVoiceExpression from '../../hooks/useVoiceExpression';
import AIAdviceBox from '../../components/AIAdviceBox';
import useGroqAdvisor from '../../hooks/useGroqAdvisor';

const MAX_PREVIEW_LENGTH = 300;

const ENCOURAGE_PHRASES = [
  'Chời đất, trớt quớt rồi mầy ơi! Mà hổng sao, xáp lại đây tao chỉ cho nghe cái một nè.',
  'Haha bậy bậy, sai rồi ông nội ơi! Cứ tà tà, tui với ông dòm lại chỗ này chút xíu nghen.',
  'Trật đường rầy rồi bạn hiền! Mà kệ tía nó, có sai mơi mốt mới nhớ dai, xúm vô phân tích nghen.',
  'Ủa trật hở ta? Mà hổng sao hổng sao, tui với bạn dòm lại cái này chút xíu là gỡ được hà.',
  'Sai bét nhè rồi cha nội! Thôi kệ đi, ngó vô đây tao nói một phát là thông tới óc liền á.',
  'Trật lất trật lơ rồi ní ơi! Mà vầy cũng ngon, dám mần là bá cháy rồi. Giờ dòm đáp án coi sao hen!',
];

const CLOSING_PHRASES = [
  'Nhớ chưa mầy? Lấy cuốn sổ ghi vô lẹ đi, mơi mốt đừng có để trật lất vậy nữa nghe chưa!',
  'Thấy chưa! Có chút xíu vậy chớ mấy, lần sau là ní làm cái một, hổng có làm khó được ní đâu.',
  'Ngon lành chưa ông nội? Nhai đi nhai lại một hồi là thuộc lòng luôn á, ráng lên nghen!',
  'Thấu hiểu chưa bạn hiền? Cứ găm cái này vô đầu là đi thi hổng sợ sai lệch đi đâu hết trơn á!',
  'Vậy là êm ru rồi đó!',
  'Thấy nó dễ ợt chưa?',
];

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const indexToLetter = (index) => {
  if (index === undefined || index === null || index < 0) return '?';
  return String.fromCharCode(65 + index);
};

// ─── MentorVoiceButton ────────
const MentorVoiceButton = memo(({ isActive, onClick }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    title={isActive ? 'Dừng giọng Mentor' : 'Nghe Mentor khích lệ'}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-sans font-bold text-xs uppercase tracking-wider border transition-all outline-none active:scale-95 ${
      isActive 
        ? 'bg-purple-500 text-white border-purple-600 shadow-sm' 
        : 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50'
    }`}
  >
    {isActive ? <><VolumeX size={16} strokeWidth={2.5} /> Phát...</> : <><Volume2 size={16} strokeWidth={2.5} /> Mentor</>}
  </button>
));
MentorVoiceButton.displayName = 'MentorVoiceButton';

// ─── SandwichFeedback ──────────
const SandwichFeedback = memo(({ encourage, closing, isVisible }) => {
  if (!isVisible) return null;
  return (
    <Motion.div 
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-2 mb-5 font-sans"
    >
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg rounded-tl-none bg-purple-100 border border-purple-200">
        <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center shrink-0 text-white">
          <MessageCircleHeart size={14} strokeWidth={2.5} />
        </div>
        <p className="text-sm font-medium text-purple-900 leading-snug mt-0.5">{encourage}</p>
      </div>
      
      <AnimatePresence>
        {closing && (
          <Motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-3 px-4 py-3 rounded-lg rounded-tr-none bg-amber-100 border border-amber-200 ml-6"
          >
            <span className="text-lg shrink-0 mt-0.5">💪</span>
            <p className="text-sm font-medium text-amber-900 leading-snug">{closing}</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
});
SandwichFeedback.displayName = 'SandwichFeedback';

// ─── ComparisonCard ───────
const ComparisonCard = memo(({ userAnswer, correctAnswer, selectedAnswerText, correctAnswerText, isCorrect }) => (
  <div className="flex flex-col md:flex-row gap-3 mb-5">
    {/* Thẻ lựa chọn của bạn */}
    <div className={`flex-1 p-4 rounded-lg border transition-colors ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
      <div className="flex items-center gap-2.5 mb-2">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
          {indexToLetter(userAnswer)}
        </div>
        <span className={`text-xs font-bold uppercase tracking-widest ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          Lựa chọn
        </span>
      </div>
      <p className={`text-sm font-medium leading-snug ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
        {selectedAnswerText}
      </p>
    </div>

    {/* Thẻ đáp án đúng */}
    {!isCorrect && (
      <div className="flex-1 p-4 rounded-lg bg-green-50 border border-green-200">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-green-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
            {indexToLetter(correctAnswer)}
          </div>
          <span className="text-xs font-bold text-green-700 uppercase tracking-widest">
            Đáp án
          </span>
        </div>
        <p className="text-sm font-medium text-green-900 leading-snug">
          {correctAnswerText}
        </p>
      </div>
    )}
  </div>
));
ComparisonCard.displayName = 'ComparisonCard';

// ─── ExplanationText ────────
const ExplanationText = memo(({ text, isExpanded, isLongExplanation, onExpandChange }) => {
  const displayedText = useMemo(() => {
    if (isExpanded || !isLongExplanation) return text;
    return text?.substring(0, MAX_PREVIEW_LENGTH);
  }, [text, isExpanded, isLongExplanation]);

  const renderFormattedText = useCallback((content) => {
    if (!content) return null;
    return content.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border-b border-blue-200 mx-0.5">{part.slice(2, -2)}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5 shadow-xs mb-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm">
          <Brain size={18} className="text-white" strokeWidth={2} />
        </div>
        <span className="text-base md:text-lg font-bold text-gray-900">Phân tích</span>
      </div>
      
      <div className="relative">
        <div className={`text-sm md:text-base font-medium leading-relaxed text-gray-700 transition-all duration-300 ${isLongExplanation && !isExpanded ? 'line-clamp-5' : ''}`}>
          {renderFormattedText(displayedText)}
          {isLongExplanation && !isExpanded && '...'}
        </div>
        
        {isLongExplanation && !isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg" />
        )}
      </div>

      {isLongExplanation && (
        <button
          onClick={() => onExpandChange(!isExpanded)}
          className="mt-3 flex items-center justify-center w-full md:w-auto gap-1.5 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 outline-none"
        >
          {isExpanded ? <><ChevronUp size={16} strokeWidth={2.5} /> Thu gọn</> : <><ChevronDown size={16} strokeWidth={2.5} /> Đọc tiếp</>}
        </button>
      )}
    </div>
  );
});
ExplanationText.displayName = 'ExplanationText';

// ─── InsightBox ─────────
const InsightBox = memo(({ isCorrect }) => {
  const theme = isCorrect 
    ? { bg: 'bg-green-50', border: 'border-green-200', iconBg: 'bg-green-500', textTitle: 'text-green-700', textBody: 'text-green-900' }
    : { bg: 'bg-amber-50', border: 'border-amber-200', iconBg: 'bg-amber-500', textTitle: 'text-amber-700', textBody: 'text-amber-900' };

  return (
    <div className={`p-4 md:p-5 rounded-lg border mb-5 ${theme.bg} ${theme.border}`}>
      <div className="flex gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white shadow-sm ${theme.iconBg}`}>
          {isCorrect ? <Zap size={20} strokeWidth={2} /> : <Target size={20} strokeWidth={2} />}
        </div>
        <div>
          <h4 className={`text-sm md:text-base font-bold mb-1 ${theme.textTitle}`}>
            {isCorrect ? 'Tuyệt vời!' : 'Cách cải thiện'}
          </h4>
          <p className={`text-xs md:text-sm font-medium leading-snug ${theme.textBody}`}>
            {isCorrect
              ? 'Bạn đã làm rất tốt. Hãy chú ý các từ khóa để áp dụng cho các dạng bài khó hơn.'
              : 'Ghi lại cấu trúc ngữ pháp này. Sai ở đây để không bao giờ sai nữa khi thi.'}
          </p>
        </div>
      </div>
    </div>
  );
});
InsightBox.displayName = 'InsightBox';

// ─── CopyButton ───────
const CopyButton = memo(({ isCopied, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wide transition-all outline-none border active:scale-95 ${
      isCopied 
        ? 'bg-green-500 text-white border-green-600' 
        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
    }`}
  >
    {isCopied ? <><Check size={18} strokeWidth={2.5} /> Đã lưu</> : <><Copy size={18} strokeWidth={2} /> Sao chép</>}
  </button>
));
CopyButton.displayName = 'CopyButton';

// ─── ExplanationHeader ──────
const ExplanationHeader = memo(({ isExpanded, isCorrect, onToggle, mentorActive, onMentorClick }) => {
  let theme = { bg: 'bg-white', border: 'border-gray-200', text: 'text-gray-900' };
  
  if (!isExpanded) {
    if (isCorrect) theme = { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' };
    else theme = { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' };
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      className={`w-full text-left transition-all duration-300 cursor-pointer px-4 md:px-5 py-3 md:py-4 rounded-lg border outline-none ${theme.bg} ${theme.border} ${isExpanded ? 'border-b' : 'hover:shadow-sm active:scale-95'}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
            <Lightbulb size={20} strokeWidth={2} className="text-white" />
          </div>
          <div>
            <p className={`text-base md:text-lg font-bold leading-tight ${theme.text}`}>
              {isCorrect ? 'Giải thích' : 'Phân tích'}
            </p>
            <p className="text-xs font-medium text-gray-500 mt-0.5">
              {isExpanded ? 'Nhấn để thu gọn' : 'Nhấn để xem chi tiết'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          {!isCorrect && (
            <MentorVoiceButton isActive={mentorActive} onClick={onMentorClick} />
          )}

          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-gray-100' : 'bg-white border border-gray-200'}`}>
            <ChevronDown size={20} strokeWidth={2.5} className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>

      </div>
    </div>
  );
});
ExplanationHeader.displayName = 'ExplanationHeader';

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const ExplanationSection = ({
  explanation,
  question,
  userAnswer,
  correctAnswer,
  isCorrect,
  questionId,
  options = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isExplanationExpanded, setIsExplanationExpanded] = useState(false);
  const [mentorActive, setMentorActive] = useState(false);
  const [sandwichVisible, setSandwichVisible] = useState(false);

  const headerRef = useRef(null);

  const { aiAdvice, loading: aiLoading, error: aiError, getAdvice } = useGroqAdvisor();
  const { speakSequence, stop } = useVoiceExpression();

  const encourageText = useMemo(() => pickRandom(ENCOURAGE_PHRASES), [questionId]);
  const closingText = useMemo(() => pickRandom(CLOSING_PHRASES), [questionId]);

  const selectedAnswerText = useMemo(
    () => userAnswer !== undefined && options[userAnswer]
      ? options[userAnswer].text || options[userAnswer]
      : 'Chưa chọn',
    [userAnswer, options],
  );

  const correctAnswerText = useMemo(
    () => options[correctAnswer]?.text || options[correctAnswer] || 'N/A',
    [correctAnswer, options],
  );

  const isLongExplanation = useMemo(() => explanation?.length > MAX_PREVIEW_LENGTH, [explanation]);

  useEffect(() => {
    if (!isCorrect && explanation) setIsExpanded(true);
  }, [isCorrect, explanation]);

  useEffect(() => {
    return () => stop();
  }, [questionId, stop]);

  useEffect(() => {
    if (!isCorrect && isExpanded && !aiAdvice && !aiLoading) {
      getAdvice(question, userAnswer, correctAnswer, explanation, options);
    }
  }, [isCorrect, isExpanded, aiAdvice, aiLoading, userAnswer, correctAnswer, question, explanation, options, getAdvice]);

  const handleToggle = useCallback(() => {
    const opening = !isExpanded;

    if (opening && headerRef.current) {
      const el = headerRef.current;
      const distanceFromTop = el.getBoundingClientRect().top;
      const scrollBefore = window.scrollY;

      setIsExpanded(true);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newDistanceFromTop = el.getBoundingClientRect().top;
          const shift = newDistanceFromTop - distanceFromTop;
          if (Math.abs(shift) > 0.5) {
            window.scrollTo({ top: scrollBefore + shift, behavior: 'instant' });
          }
        });
      });
    } else {
      setIsExpanded(false);
    }
  }, [isExpanded]);

  const handleCopyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(explanation);
      } else {
        const ta = document.createElement('textarea');
        ta.value = explanation;
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, [explanation]);

  const handleMentorVoice = useCallback(() => {
    if (mentorActive) {
      stop();
      setMentorActive(false);
      return;
    }
    setMentorActive(true);
    setSandwichVisible(true);
    const knowledgeSummary = explanation
      ? `Về kiến thức, ${explanation.substring(0, 120)}...`
      : 'Hãy đọc kỹ phần giải thích bên dưới nhé.';
    speakSequence([
      { text: encourageText, mode: 'HAPPY', delay: 0 },
      { text: knowledgeSummary, mode: 'NEUTRAL', delay: 400 },
      { text: closingText, mode: 'HAPPY', delay: 400 },
    ]);
    const estimatedMs = (encourageText.length + knowledgeSummary.length + closingText.length) * 75 + 1200;
    setTimeout(() => setMentorActive(false), estimatedMs);
  }, [mentorActive, stop, speakSequence, encourageText, explanation, closingText]);

  if (!explanation) return null;

  return (
    <div className="w-full my-6 flex flex-col gap-3 font-sans selection:bg-blue-200" ref={headerRef} style={{ fontFamily: '-apple-system, "Segoe UI", "Roboto", sans-serif' }}>
      <ExplanationHeader
        isExpanded={isExpanded}
        isCorrect={isCorrect}
        onToggle={handleToggle}
        mentorActive={mentorActive}
        onMentorClick={handleMentorVoice}
      />

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 pb-3">
            {!isCorrect && (
              <SandwichFeedback
                encourage={encourageText}
                closing={sandwichVisible ? closingText : null}
                isVisible={sandwichVisible}
              />
            )}
            
            {!isCorrect && <AIAdviceBox advice={aiAdvice} loading={aiLoading} error={aiError} />}
            
            <ComparisonCard
              userAnswer={userAnswer}
              correctAnswer={correctAnswer}
              selectedAnswerText={selectedAnswerText}
              correctAnswerText={correctAnswerText}
              isCorrect={isCorrect}
            />
            
            <ExplanationText
              text={explanation}
              isExpanded={isExplanationExpanded}
              isLongExplanation={isLongExplanation}
              onExpandChange={setIsExplanationExpanded}
            />
            
            <InsightBox isCorrect={isCorrect} />
            
            <CopyButton isCopied={isCopied} onClick={handleCopyToClipboard} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ExplanationSection);  