import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { WordCard } from './WordCard';

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
        <div className="space-y-4">
            {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                    <Card key={category.id} elevated>
                        <button
                            onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                            className="w-full p-6 flex items-center justify-between hover:bg-indigo-50 transition-colors rounded-2xl"
                        >
                            <div className="text-left flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-900 truncate">{category.title}</h3>
                                <p className="text-sm text-gray-500 mt-1 truncate">{category.description}</p>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                                <Badge variant="gray">{category.words.length} từ</Badge>
                                {expandedCategory === category.id 
                                    ? <ChevronUp className="w-5 h-5 text-gray-500" /> 
                                    : <ChevronDown className="w-5 h-5 text-gray-500" />
                                }
                            </div>
                        </button>

                        {expandedCategory === category.id && (
                            <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.words.map(word => (
                                        <WordCard
                                            key={word.id}
                                            word={word.word}
                                            pronunciation={word.pronunciation}
                                            definition={word.definition}
                                            vietnamese={word.vietnamese}
                                            example={word.example}
                                            alternatives={word.alternatives}
                                            onSpeak={() => speak(word.word, word.id)}
                                            isPlaying={playingId === word.id}
                                            onComplete={() => toggleWord(word.id)}
                                            isCompleted={completedWords.includes(word.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                ))
            ) : (
                <div className="text-center p-12 text-gray-500">
                    <Search className="w-10 h-10 mx-auto mb-3" />
                    <p>Không tìm thấy từ vựng nào phù hợp với tìm kiếm của bạn.</p>
                </div>
            )}
        </div>
    );
};