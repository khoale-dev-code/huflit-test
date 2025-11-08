import { PlayCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const FlashcardsView = ({
    currentFlashcard,
    flashcardIndex,
    totalFlashcards,
    showCardBack,
    setShowCardBack,
    handleFlashcardNav,
    speak
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            {!currentFlashcard ? (
                <Card elevated className="p-8 text-center w-full max-w-xl">
                    <PlayCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Không có Flashcard</h3>
                    <p className="text-gray-600">Thêm từ vựng vào danh sách để bắt đầu học với Flashcards.</p>
                </Card>
            ) : (
                <div className="w-full max-w-2xl">
                    <div className="text-center mb-6">
                        <p className="text-lg font-medium text-gray-600">
                            Thẻ <strong>{flashcardIndex + 1}</strong> / <strong>{totalFlashcards}</strong>
                        </p>
                    </div>

                    <Card elevated className="p-0">
                        <div
                            onClick={() => setShowCardBack(!showCardBack)}
                            className="cursor-pointer min-h-80 rounded-2xl p-8 flex items-center justify-center text-center
                                bg-gradient-to-br from-indigo-50 to-white transform transition-all duration-500 ease-in-out"
                        >
                            <div className="w-full">
                                <Badge variant="default" size="md" className="mb-4 justify-center block">
                                    {showCardBack ? 'Nghĩa' : 'Từ Vựng'}
                                </Badge>
                                <h2 className="text-5xl font-extrabold text-gray-900 leading-tight break-words">
                                    {showCardBack ? currentFlashcard.back : currentFlashcard.front}
                                </h2>
                                {!showCardBack && (
                                    <p className="text-gray-500 text-base mt-4">Nhấp để xem định nghĩa</p>
                                )}
                            </div>
                        </div>
                    </Card>
                    
                    <div className="flex gap-4 justify-center mt-6">
                        <Button 
                            variant="secondary" 
                            icon={ArrowLeft} 
                            onClick={() => handleFlashcardNav('prev')}
                        >
                            Trước
                        </Button>
                        <Button 
                            variant="primary" 
                            icon={ArrowRight} 
                            onClick={() => handleFlashcardNav('next')}
                        >
                            Tiếp
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};