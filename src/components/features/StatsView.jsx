import { BookOpen, CheckCircle, Volume2, TrendingUp } from 'lucide-react';
import { Card } from '../common/Card';
import { StatBox } from '../common/StatBox';

export const StatsView = ({ stats, completedWords, calculateProgress }) => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBox label="Tổng từ vựng" value={stats.totalWords} icon={BookOpen} />
            <StatBox 
                label="Đã hoàn thành" 
                value={completedWords.length} 
                icon={CheckCircle} 
                trend={calculateProgress() > 0 ? 15 : 0} 
            />
            <StatBox 
                label="Cần ôn tập" 
                value={stats.totalWords - completedWords.length} 
                icon={Volume2} 
            />
            <StatBox 
                label="Tiến độ chung" 
                value={`${calculateProgress()}%`} 
                icon={TrendingUp} 
                trend={calculateProgress() > 0 ? 5 : 0} 
            />
        </div>
        
        <Card elevated className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mức độ khó của từ vựng</h3>
            <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                <p>Biểu đồ phân bổ mức độ khó (Dễ, Trung bình, Khó) sẽ được hiển thị tại đây.</p>
            </div>
        </Card>
    </div>
);