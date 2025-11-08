import { Search } from 'lucide-react';
import { Button } from '../common/Button';
import { StatBox } from '../common/StatBox';
import { TrendingUp } from 'lucide-react';
import { LEVELS } from '../../constants/config';

export const Header = ({ 
    searchQuery, 
    setSearchQuery, 
    selectedLevel, 
    setSelectedLevel, 
    calculateProgress,
    setExpandedCategory 
}) => (
    <header className="py-6 border-b border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    📚 Vocabulary Master
                </h1>
                <p className="text-gray-500 mt-1">Nâng cao vốn từ tiếng Anh của bạn</p>
            </div>
            
            <div className="relative w-full sm:w-64">
                <input
                    type="text"
                    placeholder="Tìm kiếm từ vựng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
        </div>

        <div className="mt-6 flex gap-4 items-center flex-wrap">
            <div className="flex gap-3">
                {LEVELS.map(level => (
                    <Button
                        key={level}
                        variant={selectedLevel === level ? 'primary' : 'ghost'}
                        size="sm"
                        className={`capitalize ${selectedLevel !== level ? 'border-gray-300' : ''}`}
                        onClick={() => {
                            setSelectedLevel(level);
                            setExpandedCategory(null);
                        }}
                    >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                ))}
            </div>
            
            <StatBox 
                label="Tiến độ" 
                value={`${calculateProgress()}%`} 
                icon={TrendingUp} 
            />
        </div>
    </header>
);