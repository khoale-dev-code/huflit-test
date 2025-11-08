import { TrendingUp, ArrowRight } from 'lucide-react';
import { Card } from './Card';

export const StatBox = ({ label, value, icon: Icon, trend }) => (
    <Card className="p-6" elevated>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wider">{label}</p>
                <p className="text-4xl font-extrabold text-gray-900">{value}</p>
            </div>
            {Icon && (
                <div className="p-3 bg-indigo-50 rounded-full">
                    <Icon className="w-8 h-8 text-indigo-600" />
                </div>
            )}
        </div>
        {trend !== undefined && (
            <p className={`text-sm mt-3 flex items-center ${trend > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                {trend > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <ArrowRight className="w-4 h-4 mr-1" />}
                <span className="font-semibold">{Math.abs(trend)}%</span> trong tháng này
            </p>
        )}
    </Card>
);