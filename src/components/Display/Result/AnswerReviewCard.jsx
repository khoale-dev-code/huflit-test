import { memo } from 'react';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import ExplanationSection from '../ExplanationDisplay';

/**
 * Card hiển thị kết quả từng câu hỏi
 *
 * State `expanded` được quản lý ở component cha để:
 * - Tránh N state instances cho N câu hỏi
 * - Dễ control (đóng tất cả, mở tất cả)
 *
 * @param {{
 * question: object,
 * questionNum: number,   // <-- Đã thêm biến nhận số thứ tự từ file cha
 * isCorrect: boolean,
 * userAnswer: number,
 * correctAnswer: number,
 * options: string[],
 * isExpanded: boolean,
 * onToggle: (id: string|number) => void
 * }} props
 */
const AnswerReviewCard = memo(
  ({ question, questionNum, isCorrect, userAnswer, correctAnswer, options, isExpanded, onToggle }) => {
    const userAnswerText =
      userAnswer !== undefined && userAnswer !== null 
        ? String.fromCharCode(65 + userAnswer) 
        : 'Chưa chọn';
    const correctAnswerText = String.fromCharCode(65 + correctAnswer);

    return (
      <div
        className={`rounded-xl border-2 transition-all ${
          isCorrect
            ? 'bg-emerald-50/40 border-emerald-100'
            : 'bg-rose-50/40 border-rose-100'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => onToggle(question.id)}
          className="w-full p-4 flex items-start gap-4 text-left outline-none hover:bg-slate-50/30 transition-colors rounded-xl"
          aria-expanded={isExpanded}
        >
          {/* Status Icon */}
          <div
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
              isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
          >
            {isCorrect ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : (
              <XCircle className="w-4 h-4 text-white" />
            )}
          </div>

          {/* Question Info */}
          <div className="flex-1 min-w-0">
            {/* 👇 ĐÃ SỬA: Đổi {question.id} thành {questionNum} 👇 */}
            <p className="text-sm font-bold text-slate-800 mb-2 truncate md:whitespace-normal text-wrap">
              Câu {questionNum}: {question.question || <span className="italic text-slate-400">(Chọn đáp án theo hình ảnh)</span>}
            </p>
            
            {/* 👇 ĐÃ THÊM: Hiển thị hình ảnh câu hỏi nếu có 👇 */}
            {question.imageUrl && (
               <div className="mb-3">
                 <img 
                   src={question.imageUrl} 
                   alt={`Câu hỏi ${questionNum}`} 
                   loading="lazy"
                   className="max-w-full max-h-[160px] object-contain rounded border border-slate-200 bg-white" 
                 />
               </div>
            )}

            <div className="flex flex-wrap gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded ${
                  isCorrect
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                Bạn: {userAnswerText}
              </span>
              {!isCorrect && (
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 text-blue-700">
                  Đáp án: {correctAnswerText}
                </span>
              )}
            </div>
          </div>

          {/* Chevron */}
          <ChevronRight
            className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
        </button>

        {/* Expanded Explanation */}
        {isExpanded && (
          <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-white rounded-b-xl overflow-hidden">
            <ExplanationSection
              explanation={question.explanation}
              question={question.question}
              userAnswer={userAnswer}
              correctAnswer={correctAnswer}
              isCorrect={isCorrect}
              options={options}
              questionId={question.id}
            />
          </div>
        )}
      </div>
    );
  }
);

AnswerReviewCard.displayName = 'AnswerReviewCard';
export default AnswerReviewCard;