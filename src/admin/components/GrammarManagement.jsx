// src/admin/components/GrammarManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Search, Edit, Trash2, Eye,
  BookOpen, Tag, Clock, TrendingUp
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

const GrammarManagement = () => {
  const [grammarLessons, setGrammarLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    level: 'beginner',
    category: '',
    content: '',
    examples: [],
    exercises: [],
    tags: []
  });

  useEffect(() => {
    loadGrammarLessons();
  }, []);

  const loadGrammarLessons = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'grammar'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const lessons = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGrammarLessons(lessons);
    } catch (error) {
      console.error('Error loading grammar:', error);
    }
    setLoading(false);
  };

  const handleOpenModal = (lesson = null) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData({
        title: lesson.title || '',
        level: lesson.level || 'beginner',
        category: lesson.category || '',
        content: lesson.content || '',
        examples: lesson.examples || [],
        exercises: lesson.exercises || [],
        tags: lesson.tags || []
      });
    } else {
      setEditingLesson(null);
      setFormData({
        title: '',
        level: 'beginner',
        category: '',
        content: '',
        examples: [],
        exercises: [],
        tags: []
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      if (editingLesson) {
        await updateDoc(doc(db, 'grammar', editingLesson.id), {
          ...formData,
          updatedAt: serverTimestamp()
        });
        alert('Cập nhật thành công!');
      } else {
        await addDoc(collection(db, 'grammar'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        alert('Tạo bài học thành công!');
      }
      
      setShowModal(false);
      loadGrammarLessons();
    } catch (error) {
      console.error('Error:', error);
      alert('Lỗi: ' + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (lessonId) => {
    if (!confirm('Bạn có chắc muốn xóa bài học này?')) return;
    
    try {
      await deleteDoc(doc(db, 'grammar', lessonId));
      alert('Xóa thành công!');
      loadGrammarLessons();
    } catch (error) {
      alert('Lỗi: ' + error.message);
    }
  };

  const filteredLessons = grammarLessons.filter(lesson =>
    lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && grammarLessons.length === 0) {
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
            <FileText className="w-8 h-8 text-green-600" />
            Quản lý Grammar
          </h1>
          <p className="text-gray-600 mt-1">Tổng số: {grammarLessons.length} bài học</p>
        </div>
        
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Thêm bài học
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Lessons Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Tiêu đề
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Cấp độ
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Danh mục
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Tags
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">{lesson.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lesson.level === 'beginner' ? 'bg-green-100 text-green-700' :
                    lesson.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {lesson.level === 'beginner' ? 'Cơ bản' :
                     lesson.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {lesson.category || 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {lesson.tags?.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(lesson)}
                      className="p-2 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(lesson.id)}
                      className="p-2 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingLesson ? 'Chỉnh sửa bài học' : 'Thêm bài học mới'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cấp độ</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="beginner">Cơ bản</option>
                    <option value="intermediate">Trung cấp</option>
                    <option value="advanced">Nâng cao</option>
                  </select>
                </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Ví dụ: Tenses, Conditionals..."
                            />
                            </div>
                            </div>
                            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                    <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="6"
                    placeholder="Nhập nội dung bài học..."
                    />
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
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                    {editingLesson ? 'Cập nhật' : 'Tạo mới'}
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
);
};

export default GrammarManagement;