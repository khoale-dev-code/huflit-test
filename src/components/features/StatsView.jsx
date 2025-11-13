// StatsView.jsx
import React from 'react';
import { BookOpen, CheckCircle, Volume2, TrendingUp, Award, Zap } from 'lucide-react';

export const StatsView = ({ stats, completedWords, calculateProgress }) => {
    const totalWords = stats.totalWords;
    const completed = completedWords.length;
    const remaining = totalWords - completed;
    const progress = calculateProgress();

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Words */}
                <div className="p-6 bg-white rounded-2xl shadow-md border-2 border-blue-100 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Tổng Từ Vựng</span>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{totalWords}</p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">từ để học</p>
                </div>

                {/* Completed */}
                <div className="p-6 bg-white rounded-2xl shadow-md border-2 border-green-100 hover:border-green-400 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-green-600 uppercase tracking-wider">Đã Hoàn Thành</span>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{completed}</p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">từ đã học</p>
                </div>

                {/* Remaining */}
                <div className="p-6 bg-white rounded-2xl shadow-md border-2 border-amber-100 hover:border-amber-400 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-amber-600 uppercase tracking-wider">Cần Ôn Tập</span>
                        <div className="p-3 bg-amber-100 rounded-lg">
                            <Volume2 className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900">{remaining}</p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">từ còn lại</p>
                </div>

                {/* Progress */}
                <div className="p-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-lg border-2 border-orange-400">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-white/90 uppercase tracking-wider">Tiến Độ</span>
                        <div className="p-3 bg-white/20 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-white">{progress}%</p>
                    <p className="text-xs text-white/80 mt-2 font-medium">hoàn thành chương trình</p>
                </div>
            </div>

            {/* Progress Breakdown */}
            <div className="p-8 bg-white rounded-2xl shadow-lg border-2 border-amber-100">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-orange-600" />
                    Tiến Độ Chi Tiết
                </h3>

                <div className="space-y-6">
                    {/* Main Progress Bar */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <p className="font-bold text-slate-700">Tổng Tiến Độ Học Tập</p>
                            <span className="text-2xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                {progress}%
                            </span>
                        </div>
                        <div className="h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                            <div 
                                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-700 rounded-full shadow-lg"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Completed vs Remaining */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Completed */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-bold text-slate-700">Đã Học</p>
                                <span className="font-black text-green-600">{completed}</span>
                            </div>
                            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-700"
                                    style={{ width: `${(completed / totalWords) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Remaining */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-bold text-slate-700">Chưa Học</p>
                                <span className="font-black text-slate-600">{remaining}</span>
                            </div>
                            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-slate-400 to-slate-500 transition-all duration-700"
                                    style={{ width: `${(remaining / totalWords) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievements */}
            <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg border-2 border-amber-200">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-orange-600" />
                    Thành Tựu
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {progress >= 25 && (
                        <div className="p-4 bg-white rounded-lg border-2 border-orange-300 text-center">
                            <div className="text-3xl mb-2">🔥</div>
                            <p className="font-bold text-slate-900">Bắt Đầu Tuyệt Vời</p>
                            <p className="text-xs text-slate-600 mt-1">Đã hoàn thành 25% chương trình</p>
                        </div>
                    )}

                    {progress >= 50 && (
                        <div className="p-4 bg-white rounded-lg border-2 border-orange-300 text-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <p className="font-bold text-slate-900">Tiến Hóa Vô Cùng</p>
                            <p className="text-xs text-slate-600 mt-1">Đã hoàn thành 50% chương trình</p>
                        </div>
                    )}

                    {progress >= 75 && (
                        <div className="p-4 bg-white rounded-lg border-2 border-orange-300 text-center">
                            <div className="text-3xl mb-2">🌟</div>
                            <p className="font-bold text-slate-900">Sao Sáng</p>
                            <p className="text-xs text-slate-600 mt-1">Đã hoàn thành 75% chương trình</p>
                        </div>
                    )}

                    {progress === 100 && (
                        <div className="p-4 bg-white rounded-lg border-2 border-green-400 text-center col-span-full">
                            <div className="text-4xl mb-2">👑</div>
                            <p className="font-bold text-slate-900">Vua Từ Vựng</p>
                            <p className="text-sm text-slate-600 mt-1">Chúc mừng! Bạn đã hoàn thành toàn bộ chương trình</p>
                        </div>
                    )}

                    {progress === 0 && (
                        <div className="p-4 bg-white rounded-lg border-2 border-slate-300 text-center col-span-full">
                            <div className="text-3xl mb-2">🚀</div>
                            <p className="font-bold text-slate-900">Bắt Đầu Hành Trình</p>
                            <p className="text-xs text-slate-600 mt-1">Hãy bắt đầu học những từ vựng đầu tiên ngay!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};