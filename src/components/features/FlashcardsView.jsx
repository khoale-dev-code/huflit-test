// FlashcardsView.jsx
import React from 'react';
import { ArrowLeft, ArrowRight, Volume2, RotateCw } from 'lucide-react';

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
        <div className="flex flex-col items-center justify-center py-12">
            {!currentFlashcard ? (
                <div className="w-full max-w-2xl p-12 bg-white rounded-2xl shadow-lg border-2 border-amber-100 text-center">
                    <div className="inline-block p-4 bg-orange-100 rounded-full mb-6">
                        <RotateCw className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Không có Flashcard</h3>
                    <p className="text-slate-600 text-lg">Thêm từ vựng vào danh sách để bắt đầu học với Flashcards.</p>
                </div>
            ) : (
                <div className="w-full max-w-3xl">
                    {/* Progress */}
                    <div className="text-center mb-8">
                        <p className="text-slate-600 font-bold text-lg">
                            Thẻ <span className="text-orange-600">{flashcardIndex + 1}</span> / <span className="text-orange-600">{totalFlashcards}</span>
                        </p>
                        <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                                style={{ width: `${((flashcardIndex + 1) / totalFlashcards) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Flashcard */}
                    <div
                        onClick={() => setShowCardBack(!showCardBack)}
                        className="relative cursor-pointer mb-8 h-80 perspective"
                    >
                        <div className={`relative w-full h-full transition-all duration-500 transform ${ 
                            showCardBack ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                        }`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl border-2 border-orange-300 p-8 flex flex-col items-center justify-center text-center transform hover:scale-102 transition-transform duration-300">
                                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg mb-6 backdrop-blur-sm">
                                    <span className="text-white font-bold text-sm uppercase tracking-wider">Từ Vựng</span>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-black text-white leading-tight break-words mb-6">
                                    {currentFlashcard.front}
                                </h2>
                                <p className="text-white/80 text-lg font-medium">Nhấn để xem định nghĩa</p>
                            </div>
                        </div>

                        {showCardBack && (
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-2xl border-2 border-green-300 p-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg mb-6 backdrop-blur-sm">
                                    <span className="text-white font-bold text-sm uppercase tracking-wider">Định Nghĩa</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight break-words">
                                    {currentFlashcard.back}
                                </h2>
                                <p className="text-white/80 text-lg font-medium mt-6">Nhấn để xem từ</p>
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => handleFlashcardNav('prev')}
                            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-300 rounded-lg font-bold text-slate-700 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Trước
                        </button>

                        <button
                            onClick={() => speak(currentFlashcard.front, 'flashcard')}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300 shadow-md"
                        >
                            <Volume2 className="w-5 h-5" />
                            Nghe Phát Âm
                        </button>

                        <button
                            onClick={() => handleFlashcardNav('next')}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300 shadow-md"
                        >
                            Tiếp
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};