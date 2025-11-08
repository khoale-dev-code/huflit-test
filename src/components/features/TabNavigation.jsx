// TabNavigation.jsx
import React from 'react';
import { BookOpen, PlayCircle, Award, BarChart3 } from 'lucide-react';
import { TABS } from '../../constants/config';

const ICON_MAP = {
    BookOpen,
    PlayCircle,
    Award,
    BarChart3,
};

export const TabNavigation = ({ activeTab, setActiveTab }) => (
    <div className="flex gap-2 border-b-2 border-slate-200 overflow-x-auto scrollbar-hide pt-8">
        {TABS.map(tab => {
            const Icon = ICON_MAP[tab.icon];
            const isActive = activeTab === tab.id;
            return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2.5 px-5 py-3 font-bold text-sm transition-all duration-300 border-b-4 whitespace-nowrap uppercase tracking-wide ${
                        isActive
                            ? 'border-gradient-to-r from-amber-500 to-orange-500 text-orange-600 bg-orange-50/30 rounded-t-2xl'
                            : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'
                    }`}
                    style={isActive ? {
                        borderImage: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%) 1'
                    } : {}}
                >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                </button>
            );
        })}
    </div>
);