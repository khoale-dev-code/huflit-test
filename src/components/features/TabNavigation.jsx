import { BookOpen, PlayCircle, Award, BarChart3 } from 'lucide-react';
import { TABS } from '../../constants/config';

const ICON_MAP = {
    BookOpen,
    PlayCircle,
    Award,
    BarChart3,
};

export const TabNavigation = ({ activeTab, setActiveTab }) => (
    <div className="flex gap-2 -mb-px border-b border-gray-200 overflow-x-auto pt-4">
        {TABS.map(tab => {
            const Icon = ICON_MAP[tab.icon];
            const isActive = activeTab === tab.id;
            return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                        inline-flex items-center gap-2 pb-3 px-4 font-semibold text-sm transition-colors border-b-2
                        ${isActive
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }
                    `}
                >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                </button>
            );
        })}
    </div>
);