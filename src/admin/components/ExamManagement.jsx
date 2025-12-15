// src/admin/components/ExamManagement.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Plus, Search, Edit, Trash2, Eye, 
  Download, Upload, Filter, Clock, Users,
  CheckCircle, XCircle, Copy, FileText, AlertCircle,
  ToggleLeft, ToggleRight
} from 'lucide-react';
import { 
  getExams, 
  createExam, 
  deleteExam,
  toggleExamPublish
} from '../services/examManagementService';

const ExamManagement = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importPreview, setImportPreview] = useState(null);

  useEffect(() => {
    loadExams();
  }, [filterType]);

  const loadExams = async () => {
    setLoading(true);
    const filters = filterType !== 'all' ? { type: filterType } : {};
    const result = await getExams(filters);
    if (result.success) {
      setExams(result.exams);
    }
    setLoading(false);
  };

  const handleDelete = async (examId) => {
    if (!confirm('Bạn có chắc muốn xóa đề thi này?')) return;
    
    const result = await deleteExam(examId);
    if (result.success) {
      alert('Xóa thành công!');
      loadExams();
    } else {
      alert('Lỗi: ' + result.error);
    }
  };

  const handleDuplicate = async (exam) => {
    const duplicatedExam = {
      ...exam,
      title: exam.title + ' (Copy)',
      isPublished: false
    };
    delete duplicatedExam.id;
    delete duplicatedExam.createdAt;
    delete duplicatedExam.updatedAt;
    
    const result = await createExam(duplicatedExam);
    if (result.success) {
      alert('Nhân bản thành công!');
      loadExams();
    } else {
      alert('Lỗi: ' + result.error);
    }
  };

  const handleTogglePublish = async (examId, currentStatus) => {
    const result = await toggleExamPublish(examId, currentStatus);
    if (result.success) {
      loadExams();
    } else {
      alert('Lỗi: ' + result.error);
    }
  };

  // ============ IMPORT LOGIC ============
  const handleImportClick = () => {
    setShowImportModal(true);
    setImportPreview(null);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const examData = parseExamData(text);
      setImportPreview(examData);
    } catch (error) {
      alert('Lỗi đọc file: ' + error.message);
    }
  };

  const parseExamData = (text) => {
    try {
      // Tìm EXAM1_DATA object
      const match = text.match(/export\s+const\s+\w+\s*=\s*(\{[\s\S]*?\});?\s*$/m);
      if (!match) {
        throw new Error('Không tìm thấy EXAM_DATA trong file');
      }

      // Parse bằng Function constructor (an toàn hơn eval)
      const dataStr = match[1];
      const examData = new Function('return ' + dataStr)();
      
      // Transform to Firebase format
      return {
        title: examData.title || 'Untitled Exam',
        description: examData.description || '',
        type: 'TOEIC',
        duration: 120,
        totalQuestions: calculateTotalQuestions(examData.parts),
        difficulty: 'medium',
        isPublished: false,
        parts: examData.parts || {}
      };
    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Không thể parse dữ liệu. Vui lòng kiểm tra format.');
    }
  };

  const calculateTotalQuestions = (parts) => {
    let total = 0;
    if (parts && typeof parts === 'object') {
      Object.values(parts).forEach(part => {
        if (part.questions && Array.isArray(part.questions)) {
          total += part.questions.length;
        }
      });
    }
    return total;
  };

  const handleConfirmImport = async () => {
    if (!importPreview) return;

    setLoading(true);
    try {
      const result = await createExam(importPreview);
      if (result.success) {
        alert('Import thành công!');
        setShowImportModal(false);
        setImportPreview(null);
        loadExams();
      } else {
        alert('Lỗi: ' + result.error);
      }
    } catch (error) {
      alert('Lỗi import: ' + error.message);
    }
    setLoading(false);
  };

  const handlePasteData = () => {
    const pastedText = prompt('Paste toàn bộ nội dung file EXAM_DATA vào đây (bao gồm cả export const...):');
    if (!pastedText) return;

    try {
      const examData = parseExamData(pastedText);
      setImportPreview(examData);
    } catch (error) {
      alert('Lỗi parse data: ' + error.message);
    }
  };

  const filteredExams = exams.filter(exam =>
    exam.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && exams.length === 0) {
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
            <BookOpen className="w-8 h-8 text-blue-600" />
            Quản lý Đề thi
          </h1>
          <p className="text-gray-600 mt-1">Tổng số: {exams.length} đề thi</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/admin/exams/create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tạo đề thi mới
          </button>
          
          <button 
            onClick={handleImportClick}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import từ File
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm đề thi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả loại</option>
            <option value="TOEIC">TOEIC</option>
            <option value="IELTS">IELTS</option>
            <option value="Grammar">Grammar</option>
            <option value="Vocabulary">Vocabulary</option>
          </select>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div 
            key={exam.id} 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {exam.title}
                </h3>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    exam.type === 'TOEIC' ? 'bg-blue-100 text-blue-700' :
                    exam.type === 'IELTS' ? 'bg-purple-100 text-purple-700' :
                    exam.type === 'Grammar' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {exam.type}
                  </span>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    exam.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    exam.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {exam.difficulty === 'easy' ? 'Dễ' : 
                     exam.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleTogglePublish(exam.id, exam.isPublished)}
                className="flex-shrink-0"
                title={exam.isPublished ? 'Đã xuất bản - Click để ẩn' : 'Chưa xuất bản - Click để hiện'}
              >
                {exam.isPublished ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {exam.description || 'Chưa có mô tả'}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{exam.duration} phút</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{exam.totalQuestions} câu</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => navigate(`/admin/exams/edit/${exam.id}`)}
                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                title="Chỉnh sửa"
              >
                <Edit className="w-4 h-4 text-blue-600" />
              </button>
              
              <button
                onClick={() => handleDuplicate(exam)}
                className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                title="Nhân bản"
              >
                <Copy className="w-4 h-4 text-green-600" />
              </button>
              
              <button 
                onClick={() => navigate(`/admin/exams/preview/${exam.id}`)}
                className="p-2 hover:bg-purple-50 rounded-lg transition-colors" 
                title="Xem trước"
              >
                <Eye className="w-4 h-4 text-purple-600" />
              </button>
              
              <button
                onClick={() => handleDelete(exam.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Không tìm thấy đề thi nào</p>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Import Đề Thi từ File
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Chọn file .js hoặc paste nội dung EXAM_DATA
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <input
                  type="file"
                  accept=".js,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                  Chọn file .js
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  hoặc
                </p>
                <button
                  type="button"
                  onClick={handlePasteData}
                  className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                >
                  Paste nội dung trực tiếp
                </button>
              </div>

              {/* Preview */}
              {importPreview && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Xem trước dữ liệu
                      </h3>
                      <div className="space-y-1 text-sm text-blue-800">
                        <p><strong>Tiêu đề:</strong> {importPreview.title}</p>
                        <p><strong>Mô tả:</strong> {importPreview.description?.substring(0, 100)}...</p>
                        <p><strong>Số phần:</strong> {Object.keys(importPreview.parts || {}).length}</p>
                        <p><strong>Tổng câu hỏi:</strong> {importPreview.totalQuestions}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowImportModal(false);
                    setImportPreview(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleConfirmImport}
                  disabled={!importPreview || loading}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Đang import...' : 'Xác nhận Import'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamManagement;