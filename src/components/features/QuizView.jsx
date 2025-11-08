// QuizView.jsx (tiếp)
import React from 'react';
import { Award, Volume2, CheckCircle, XCircle, BarChart3 } from 'lucide-react';

export const QuizView = ({
    currentQuiz,
    quizIndex,
    quizList,
    quizScore,
    quizAnswer,
    setQuizAnswer,
    showQuizFeedback,
    submitQuizAnswer,
    nextQuestion,
    startQuiz,
    speak
}) => (
    <div className="space-y-6">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg text-white">
            <h2 className="text-3xl font-black mb-2">Kiểm Tra Từ Vựng</h2>
            <p className="text-lg font-bold text-white/90">
                {currentQuiz 
                    ? `Câu ${quizIndex + 1}/${quizList.length} • Điểm: ${quizScore}/${quizList.length}` 
                    : 'Luyện tập để củng cố kiến thức của bạn!'
                }
            </p>
        </div>

        {currentQuiz ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-amber-100">
                {/* Question */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 text-center flex-1 min-w-0">
                            Từ "<span className="text-orange-600">{currentQuiz.word}</span>" có nghĩa là?
                        </h3>
                        <button
                            onClick={() => speak(currentQuiz.word)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-all hover:scale-105 flex-shrink-0"
                        >
                            <Volume2 className="w-5 h-5" />
                            <span className="hidden sm:inline">Nghe</span>
                        </button>
                    </div>
                    <p className="text-center text-slate-600 font-mono text-lg">
                        /{currentQuiz.pronunciation}/
                    </p>
                </div>

                {/* Options */}
                <div className="grid gap-3 mb-6">
                    {currentQuiz.options.map((option, idx) => {
                        const isSelected = quizAnswer === idx;
                        const isCorrect = option === currentQuiz.correct;
                        
                        let buttonStyle = 'bg-white border-2 border-slate-300 text-slate-900 hover:border-orange-400 hover:bg-orange-50';
                        
                        if (showQuizFeedback) {
                            if (isCorrect) {
                                buttonStyle = 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 text-green-900 shadow-md';
                            } else if (isSelected && !isCorrect) {
                                buttonStyle = 'bg-gradient-to-r from-red-100 to-rose-100 border-2 border-red-500 text-red-900 shadow-md line-through opacity-75';
                            }
                        } else if (isSelected) {
                            buttonStyle = 'bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-orange-500 text-orange-900 shadow-md';
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => !showQuizFeedback && setQuizAnswer(idx)}
                                disabled={showQuizFeedback}
                                className={`p-4 rounded-xl text-left transition-all font-bold ${buttonStyle} ${showQuizFeedback ? 'cursor-default' : 'cursor-pointer hover:scale-102 hover:shadow-lg'}`}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-lg font-black flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/50">
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className="text-base font-semibold flex-1">{option}</span>
                                    {showQuizFeedback && isCorrect && (
                                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 animate-pulse" />
                                    )}
                                    {showQuizFeedback && isSelected && !isCorrect && (
                                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Feedback */}
                {showQuizFeedback && (
                    <div className={`p-5 rounded-xl border-2 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
                        quizAnswer !== null && currentQuiz.options[quizAnswer] === currentQuiz.correct
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400'
                            : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-400'
                    }`}>
                        <p className={`font-bold text-lg flex items-center gap-3 ${
                            quizAnswer !== null && currentQuiz.options[quizAnswer] === currentQuiz.correct
                                ? 'text-green-700'
                                : 'text-red-700'
                        }`}>
                            {quizAnswer !== null && currentQuiz.options[quizAnswer] === currentQuiz.correct ? (
                                <>
                                    <CheckCircle className="w-6 h-6" />
                                    Tuyệt vời! Câu trả lời chính xác!
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-6 h-6" />
                                    Rất tiếc! Câu trả lời đúng là: <span className="font-black ml-1">{currentQuiz.correct}</span>
                                </>
                            )}
                        </p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end">
                    {!showQuizFeedback ? (
                        <button
                            onClick={submitQuizAnswer}
                            disabled={quizAnswer === null}
                            className={`px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 uppercase tracking-wider ${
                                quizAnswer === null
                                    ? 'bg-slate-300 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:shadow-lg hover:scale-105'
                            }`}
                        >
                            Trả Lời
                        </button>
                    ) : (
                        <button
                            onClick={nextQuestion}
                            className="px-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg transition-all duration-300 uppercase tracking-wider hover:scale-105"
                        >
                            {quizIndex === quizList.length - 1 ? 'Xem Kết Quả' : 'Câu Tiếp Theo'}
                        </button>
                    )}
                </div>
            </div>
        ) : (
            <div className="p-12 bg-white rounded-2xl shadow-lg border-2 border-amber-100 text-center">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-6">
                    <Award className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-3">Bạn đã hoàn thành!</h3>
                <p className="text-slate-600 text-lg mb-6 font-medium">
                    Bài quiz gồm 10 câu hỏi trắc nghiệm để kiểm tra khả năng ghi nhớ từ vựng của bạn.
                </p>
                <button
                    onClick={startQuiz}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 uppercase tracking-wider hover:scale-105"
                >
                    Bắt Đầu Quiz 10 Câu
                </button>
            </div>
        )}
    </div>
);