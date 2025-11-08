import { Volume2, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const WordCard = ({ 
    word, pronunciation, definition, vietnamese, example, alternatives,
    onSpeak, isPlaying, onComplete, isCompleted 
}) => (
    <Card className="p-5 flex flex-col h-full" elevated={isCompleted}>
        <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
                <h4 className="text-2xl font-extrabold text-gray-900">{word}</h4>
                <p className="text-sm text-indigo-500 font-mono mt-1">/{pronunciation}/</p>
            </div>
            <Button
                variant="ghost"
                size="sm"
                icon={Volume2}
                onClick={onSpeak}
                className={isPlaying ? 'text-indigo-600 animate-pulse' : 'text-gray-500'}
            />
        </div>

        <div className="space-y-3 flex-grow">
            <div>
                <p className="text-sm text-gray-700 font-medium mb-1">Định nghĩa</p>
                <p className="text-base text-gray-900">{definition}</p>
            </div>
            
            <div className="bg-gray-50 border-l-4 border-indigo-300 p-3 rounded-lg">
                <p className="text-sm text-gray-600 italic">"{example}"</p>
            </div>
            
            <div>
                <p className="text-sm text-gray-700 font-medium mb-1">Nghĩa tiếng Việt</p>
                <p className="text-base text-gray-900 font-semibold">{vietnamese}</p>
            </div>

            {alternatives && alternatives.length > 0 && (
                <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Từ liên quan:</p>
                    <div className="flex flex-wrap gap-2">
                        {alternatives.map((alt, idx) => (
                            <Badge key={idx} variant="gray">{alt}</Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>

        <Button
            fullWidth
            variant={isCompleted ? 'success' : 'primary'}
            size="md"
            icon={isCompleted ? CheckCircle : null}
            onClick={onComplete}
            className="mt-4"
        >
            {isCompleted ? '✓ Đã Học Xong' : 'Đánh Dấu Đã Học'}
        </Button>
    </Card>
);