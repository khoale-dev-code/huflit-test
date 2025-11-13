// Header.jsx
import React from 'react';
import { Search, TrendingUp, Zap } from 'lucide-react';
import { LEVELS } from '../../constants/config';

export const Header = ({ 
    searchQuery, 
    setSearchQuery, 
    selectedLevel, 
    setSelectedLevel, 
    calculateProgress,
    setExpandedCategory 
}) => (
    <header className="mb-8">
        <div className="mb-8">
            <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
                        Vocabulary Master
                    </h1>
                    <p className="text-slate-600 text-lg mt-2 font-medium">
                        Nâng cao vốn từ tiếng Anh của bạn cùng những bài tập thú vị
                    </p>
                </div>
                <div className="hidden md:block p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl">
                    <Zap className="w-8 h-8 text-orange-600" />
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex items-center bg-white rounded-xl shadow-lg border-2 border-amber-100 hover:border-orange-300 transition-all duration-300">
                    <Search className="w-5 h-5 text-orange-500 ml-4" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm từ vựng..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent focus:outline-none text-slate-900 placeholder-slate-400 font-medium"
                    />
                </div>
            </div>
        </div>

        {/* Level Selector & Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 bg-white rounded-2xl shadow-md border border-amber-100">
            <div className="space-y-3">
                <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Chọn Level</p>
                <div className="flex flex-wrap gap-3">
                    {LEVELS.map(level => (
                        <button
                            key={level}
                            onClick={() => {
                                setSelectedLevel(level);
                                setExpandedCategory(null);
                            }}
                            className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm uppercase tracking-wider ${
                                selectedLevel === level
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-200/50 scale-105'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Progress Circle */}
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm text-slate-600 font-medium">Tiến độ học</p>
                    <p className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        {calculateProgress()}%
                    </p>
                </div>
                <div className="relative w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                        <circle 
                            cx="48" 
                            cy="48" 
                            r="40" 
                            fill="none" 
                            stroke="url(#gradient)" 
                            strokeWidth="4"
                            strokeDasharray={`${calculateProgress() * 2.51} 251`}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#fbbf24" />
                                <stop offset="100%" stopColor="#f97316" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <TrendingUp className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-orange-500" />
                </div>
            </div>
        </div>
    </header>
);