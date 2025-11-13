// CategoriesView.jsx
import React from 'react';
import { ChevronUp, ChevronDown, Search, Volume2, CheckCircle2 } from 'lucide-react';

export const CategoriesView = ({
    vocabularyData,
    searchQuery,
    expandedCategory,
    setExpandedCategory,
    completedWords,
    playingId,
    toggleWord,
    speak
}) => {
    const filteredCategories = vocabularyData ? 
        Object.entries(vocabularyData.categories)
            .map(([key, cat]) => {
                if (!searchQuery) return cat;
                const filteredWords = cat.words.filter(word => 
                    word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    word.vietnamese.toLowerCase().includes(searchQuery.toLowerCase())
                );
                return {...cat, words: filteredWords};
            })
            .filter(cat => cat.words.length > 0) 
        : [];

    return (
        <div className="space-y-6">
            {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                    <div key={category.id} className="group">
                        <button
                            onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                            className="w-full p-6 flex items-center justify-between bg-white rounded-2xl shadow-md border-2 border-amber-100 hover:border-orange-400 hover:shadow-lg transition-all duration-300 hover:bg-orange-50/30"
                        >
                            <div className="text-left flex-1 min-w-0">
                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{category.title}</h3>
                                <p className="text-slate-600 mt-2 text-sm font-medium">{category.description}</p>
                            </div>
                            <div className="flex items-center gap-4 ml-4">
                                <div className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg border border-orange-200">
                                    <span className="font-bold text-orange-700 text-sm">{category.words.length} từ</span>
                                </div>
                                {expandedCategory === category.id 
                                    ? <ChevronUp className="w-6 h-6 text-orange-500 flex-shrink-0" /> 
                                    : <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0" />
                                }
                            </div>
                        </button>

                        {expandedCategory === category.id && (
                            <div className="mt-4 p-6 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/20 rounded-2xl border-2 border-amber-100 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {category.words.map(word => {
                                        const isCompleted = completedWords.includes(word.id);
                                        const isPlaying = playingId === word.id;
                                        
                                        return (
                                            <div
                                                key={word.id}
                                                className={`relative p-5 rounded-xl border-2 transition-all duration-300 group/card overflow-hidden ${
                                                    isCompleted
                                                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-md'
                                                        : 'bg-white border-amber-100 hover:border-orange-400 shadow-md hover:shadow-lg hover:scale-105'
                                                }`}
                                            >
                                                {/* Background gradient effect */}
                                                {!isCompleted && (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-orange-400/0 group-hover/card:from-amber-400/5 group-hover/card:to-orange-400/5 transition-all duration-300"></div>
                                                )}

                                                <div className="relative">
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between gap-3 mb-3">
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-lg font-bold text-slate-900 break-words">
                                                                {word.word}
                                                            </h4>
                                                            <p className="text-xs text-slate-500 font-mono mt-1">
                                                                {word.pronunciation}
                                                            </p>
                                                        </div>
                                                        {isCompleted && (
                                                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                                        )}
                                                    </div>

                                                    {/* Definition */}
                                                    <p className="text-sm text-slate-700 font-medium mb-3 line-clamp-2">
                                                        {word.definition}
                                                    </p>

                                                    {/* Vietnamese */}
                                                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 mb-3">
                                                        <p className="text-sm font-semibold text-orange-900">{word.vietnamese}</p>
                                                    </div>

                                                    {/* Example */}
                                                    {word.example && (
                                                        <p className="text-xs text-slate-600 italic mb-4 line-clamp-2">
                                                            "{word.example}"
                                                        </p>
                                                    )}

                                                    {/* Actions */}
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => speak(word.word, word.id)}
                                                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                                                                isPlaying
                                                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                            }`}
                                                        >
                                                            <Volume2 className="w-4 h-4" />
                                                            {isPlaying ? 'Đang phát' : 'Nghe'}
                                                        </button>
                                                        <button
                                                            onClick={() => toggleWord(word.id)}
                                                            className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                                                                isCompleted
                                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                                                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                            }`}
                                                        >
                                                            {isCompleted ? '✓ Đã học' : 'Đánh dấu'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center p-16 bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-sm">
                    <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg font-bold text-slate-600">Không tìm thấy từ vựng</p>
                    <p className="text-slate-500 mt-2">Hãy thử tìm kiếm với từ khóa khác</p>
                </div>
            )}
        </div>
    );
};