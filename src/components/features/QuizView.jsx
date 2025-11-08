import { Award, Volume2, CheckCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

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
        <Card elevated className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Kiểm Tra Từ Vựng</h2>
            <p className="text-gray-600 text-lg font-semibold">
                {currentQuiz 
                    ? `Câu ${quizIndex + 1}/${quizList.length} • Điểm: ${quizScore}/${quizList.length}` 
                    : 'Luyện tập để củng cố kiến thức của bạn!'
                }
            </p>
        </Card>

        {currentQuiz ? (
            <Card elevated className="p-8">
                <div className="mb-6">
                    <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
                        <h3 className="text-2xl font-extrabold text-gray-900 text-center">
                            Từ "{currentQuiz.word}" có nghĩa là?
                        </h3>
                        <Button variant="ghost" size="sm" icon={Volume2} onClick={() => speak(currentQuiz.word)} />
                    </div>
                    <p className="text-center text-sm text-gray-500 font-mono">/{currentQuiz.pronunciation}/</p>
                </div>

                <div className="grid gap-3 mb-6">
                    {currentQuiz.options.map((option, idx) => {
                        const isSelected = quizAnswer === idx;
                        const isCorrect = option === currentQuiz.correct;
                        
                        let buttonClass = 'bg-gray-50 border-gray-200 hover:border-indigo-400';
                        
                        if (showQuizFeedback) {
                            if (isCorrect) {
                                buttonClass = 'bg-green-100 border-green-500 text-green-800';
                            } else if (isSelected) {
                                buttonClass = 'bg-red-100 border-red-500 text-red-800 line-through';
                            }
                        } else if (isSelected) {
                            buttonClass = 'bg-indigo-100 border-indigo-500 text-indigo-800';
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => !showQuizFeedback && setQuizAnswer(idx)}
                                disabled={showQuizFeedback}
                                className={`p-4 rounded-xl text-left transition-all font-semibold border-2 ${buttonClass} ${showQuizFeedback ? 'cursor-default' : ''}`}
                            >
                                <span className="mr-2 font-extrabold">{String.fromCharCode(65 + idx)}.</span> {option}
                            </button>
                        );
                    })}
                </div>

                {showQuizFeedback && (
                    <div className={`p-4 rounded-xl border-2 mb-6 ${
                        quizAnswer !== null && currentQuiz.options[quizAnswer] === currentQuiz.correct
                            ? 'bg-green-50 border-green-400'
                            : 'bg-red-50 border-red-400'
                    }`}>
                        <p className={`font-bold text-lg flex items-center gap-2 ${
                            quizAnswer !== null && currentQuiz.options[quizAnswer] === currentQuiz.correct
                                ? 'text-green-700'
                                : 'text-red-700'
                        }`}>
                            {quizAnswer !== null && currentQuiz.options[quizAnswer] === currentQuiz.correct
                                ? <CheckCircle className="w-5 h-5" /> : <span className="text-2xl font-light">✗</span>}
                            {quizAnswer !== null && currentQuiz.options[quizAnswer] === currentQuiz.correct
                                ? 'Tuyệt vời, câu trả lời chính xác!'
                                : `Rất tiếc. Câu trả lời đúng là: ${currentQuiz.correct}`}
                        </p>
                    </div>
                )}

                <div className="flex gap-4 justify-end">
                    {!showQuizFeedback ? (
                        <Button onClick={submitQuizAnswer} disabled={quizAnswer === null}>Trả Lời</Button>
                    ) : (
                        <Button variant="primary" onClick={nextQuestion}>
                            {quizIndex === quizList.length - 1 ? 'Xem Kết Quả' : 'Câu Tiếp Theo'}
                        </Button>
                    )}
                </div>
            </Card>
        ) : (
            <Card elevated className="p-8 text-center w-full max-w-xl mx-auto">
                <Award className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bạn đã sẵn sàng cho bài kiểm tra?</h3>
                <p className="text-gray-600 mb-6">Bài quiz gồm 10 câu hỏi trắc nghiệm để kiểm tra khả năng ghi nhớ từ vựng của bạn.</p>
                <Button fullWidth onClick={startQuiz} size="lg">Bắt Đầu Quiz 10 Câu</Button>
            </Card>
        )}
    </div>
);