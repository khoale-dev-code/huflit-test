// src/admin/components/VocabularyManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  Languages, Plus, Search, Edit, Trash2, 
  Volume2, BookMarked, Tag, Filter
} from 'lucide-react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const VocabularyManagement = () => {
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [formData, setFormData] = useState({
    word: '',
    pronunciation: '',
    meaning: '',
    partOfSpeech: 'noun',
    category: '',
    examples: [],
    level: 'basic',
    image: ''
  });

  useEffect(() => {
    loadVocabulary();
  }, []);

  const loadVocabulary = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'vocabulary'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const words = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVocabulary(words);
    } catch (error) {
      console.error('Error loading vocabulary:', error);
    }
    setLoading(false);
  };

  const handleOpenModal = (word = null) => {
    if (word) {
      setEditingWord(word);
      setFormData({
        word: word.word || '',
        pronunciation: word.pronunciation || '',
        meaning: word.meaning || '',
        partOfSpeech: word.partOfSpeech || 'noun',
        category: word.category || '',
        examples: word.examples || [],
        level: word.level || 'basic',
        image: word.image || ''
      });
    } else {
      setEditingWord(null);
      setFormData({
        word: '',
        pronunciation: '',
        meaning: '',
        partOfSpeech: 'noun',
        category: '',
        examples: [],
        level: 'basic',
        image: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      if (editingWord) {
        await updateDoc(doc(db, 'vocabulary', editingWord.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
        alert('Cập nhật thành công!');
      } else {
        await addDoc(collection(db, 'vocabulary'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        alert('Thêm từ vựng thành công!');
      }
      
      setShowModal(false);
      loadVocabulary();
    } catch (error) {
      console.error('Error:', error);
      alert('Lỗi: ' + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (wordId) => {
    if (!confirm('Bạn có chắc muốn xóa từ vựng này?')) return;
    
    try {
      await deleteDoc(doc(db, 'vocabulary', wordId));
      alert('Xóa thành công!');
      loadVocabulary();
    } catch (error) {
      alert('Lỗi: ' + error.message);
    }
  };

  const filteredVocabulary = vocabulary.filter(word => {
    const matchSearch = word.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       word.meaning?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'all' || word.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const categories = [...new Set(vocabulary.map(w => w.category).filter(Boolean))];

  if (loading && vocabulary.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Languages className="w-8 h-8 text-orange-600" />
            Quản lý Vocabulary
          </h1>
          <p className="text-gray-600 mt-1">Tổng số: {vocabulary.length} từ vựng</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Thêm từ vựng
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Vocabulary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVocabulary.map((word) => (
          <div 
            key={word.id} 
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  {word.word}
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Volume2 className="w-4 h-4 text-blue-600" />
                  </button>
                </h3>
                <p className="text-sm text-gray-500">{word.pronunciation}</p>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                word.partOfSpeech === 'noun' ? 'bg-blue-100 text-blue-700' :
                word.partOfSpeech === 'verb' ? 'bg-green-100 text-green-700' :
                word.partOfSpeech === 'adjective' ? 'bg-purple-100 text-purple-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {word.partOfSpeech}
              </span>
            </div>

            <p className="text-gray-700 mb-3">{word.meaning}</p>

            {word.category && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <Tag className="w-3 h-3" />
                <span>{word.category}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                word.level === 'basic' ? 'bg-green-100 text-green-700' :
                word.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {word.level}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(word)}
                  className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(word.id)}
                  className="p-1.5 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingWord ? 'Chỉnh sửa từ vựng' : 'Thêm từ vựng mới'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Từ vựng *</label>
                  <input
                    type="text"
                    value={formData.word}
                    onChange={(e) => setFormData({...formData, word: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phiên âm</label>
                  <input
                    type="text"
                    value={formData.pronunciation}
                    onChange={(e) => setFormData({...formData, pronunciation: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="/wɜːrd/"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nghĩa *</label>
                <input
                  type="text"
                  value={formData.meaning}
                  onChange={(e) => setFormData({...formData, meaning: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Từ loại</label>
                  <select
                    value={formData.partOfSpeech}
                    onChange={(e) => setFormData({...formData, partOfSpeech: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="adverb">Adverb</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Business, Travel..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg"
                >
                  {editingWord ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyManagement;