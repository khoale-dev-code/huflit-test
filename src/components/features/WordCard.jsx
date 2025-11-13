// WordCard.jsx (Component riêng cho từ vựng)
import React from 'react';
import { Volume2, CheckCircle2, BookmarkPlus } from 'lucide-react';

export const WordCard = ({
    word,
    pronunciation,
    definition,
    vietnamese,
    example,
    alternatives,
    onSpeak,
    isPlaying,
    onComplete,
    isCompleted
}) => {
    return (
        <div className={`relative p-5 rounded-xl border-2 transition-all duration-300 group/card overflow-hidden ${
            isCompleted
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-md'
                : 'bg-white border-amber-100 hover:border-orange-400 shadow-md hover:shadow-lg hover:scale-105'
        }`}>
            {/* Background gradient effect */}
            {!isCompleted && (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-orange-400/0 group-hover/card:from-amber-400/5 group-hover/card:to-orange-400/5 transition-all duration-300"></div>
            )}

            <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-slate-900 break-words">
                            {word}
                        </h4>
                        <p className="text-xs text-slate-500 font-mono mt-1">
                            {pronunciation}
                        </p>
                    </div>
                    {isCompleted && (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    )}
                </div>

                {/* Definition */}
                <p className="text-sm text-slate-700 font-medium mb-3 line-clamp-2">
                    {definition}
                </p>

                {/* Vietnamese */}
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 mb-3">
                    <p className="text-sm font-semibold text-orange-900">{vietnamese}</p>
                </div>

                {/* Example */}
                {example && (
                    <p className="text-xs text-slate-600 italic mb-4 line-clamp-2">
                        "{example}"
                    </p>
                )}

                {/* Alternatives */}
                {alternatives && alternatives.length > 0 && (
                    <div className="mb-4 p-2 bg-slate-100 rounded-lg">
                        <p className="text-xs font-bold text-slate-600 mb-1">Từ đồng nghĩa:</p>
                        <div className="flex flex-wrap gap-2">
                            {alternatives.map((alt, idx) => (
                                <span key={idx} className="text-xs bg-white px-2 py-1 rounded border border-slate-200 text-slate-700">
                                    {alt}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={onSpeak}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                            isPlaying
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-md'
                        }`}
                    >
                        <Volume2 className="w-4 h-4" />
                        {isPlaying ? 'Đang phát' : 'Nghe'}
                    </button>
                    <button
                        onClick={onComplete}
                        className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                            isCompleted
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
                        }`}
                    >
                        {isCompleted ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Đã Học</span>
                            </>
                        ) : (
                            <>
                                <BookmarkPlus className="w-4 h-4" />
                                <span className="hidden sm:inline">Đánh Dấu</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};