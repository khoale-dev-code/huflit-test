// src/admin/components/DatabaseManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  Database, Upload, Download, RefreshCw, 
  CheckCircle, AlertCircle, Trash2, Info
} from 'lucide-react';
import { 
  syncExamsToFirebase, 
  syncGrammarToFirebase, 
  syncVocabularyToFirebase,
  getSyncStatus 
} from '../services/dataSyncService';
import { EXAM_LIST } from '../../data/examData';
import { GRAMMAR_DATA } from '../../data/grammarData';
import { vocabularyData } from '../../data/vocabularyData';

const DatabaseManagement = () => {
  const [syncStatus, setSyncStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadSyncStatus();
  }, []);

  const loadSyncStatus = async () => {
    const result = await getSyncStatus();
    if (result.success) {
      setSyncStatus(result.stats);
    }
  };

  const handleSyncExams = async () => {
    if (!confirm('Sync tất cả exams từ local lên Firebase? Điều này có thể mất vài phút.')) {
      return;
    }
    
    setLoading(true);
    setMessage({ type: 'info', text: 'Đang sync exams...' });
    
    // Import all exam data dynamically
    const examDataToSync = {};
    for (let i = 1; i <= 22; i++) {
      try {
        const module = await import(`../../data/exams/exam${i}.js`);
        const examKey = `EXAM${i}_DATA`;
        if (module[examKey]) {
          examDataToSync[`exam${i}`] = module[examKey];
        }
      } catch (error) {
        console.error(`Error loading exam${i}:`, error);
      }
    }
    
    const result = await syncExamsToFirebase(examDataToSync);
    
    if (result.success) {
      setMessage({ type: 'success', text: `✅ Đã sync ${result.count} exams thành công!` });
      loadSyncStatus();
    } else {
      setMessage({ type: 'error', text: `❌ Lỗi: ${result.error}` });
    }
    
    setLoading(false);
  };

  const handleSyncGrammar = async () => {
    if (!confirm('Sync grammar data từ local lên Firebase?')) {
      return;
    }
    
    setLoading(true);
    setMessage({ type: 'info', text: 'Đang sync grammar...' });
    
    const result = await syncGrammarToFirebase(GRAMMAR_DATA);
    
    if (result.success) {
      setMessage({ type: 'success', text: `✅ Đã sync ${result.count} grammar topics thành công!` });
      loadSyncStatus();
    } else {
      setMessage({ type: 'error', text: `❌ Lỗi: ${result.error}` });
    }
    
    setLoading(false);
  };

  const handleSyncVocabulary = async () => {
    if (!confirm('Sync vocabulary data từ local lên Firebase? Điều này có thể mất nhiều thời gian.')) {
      return;
    }
    
    setLoading(true);
    setMessage({ type: 'info', text: 'Đang sync vocabulary...' });
    
    const result = await syncVocabularyToFirebase(vocabularyData);
    
    if (result.success) {
      setMessage({ type: 'success', text: `✅ Đã sync ${result.count} từ vựng thành công!` });
      loadSyncStatus();
    } else {
      setMessage({ type: 'error', text: `❌ Lỗi: ${result.error}` });
    }
    
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Database className="w-8 h-8 text-indigo-600" />
            Quản lý Database
          </h1>
          <p className="text-gray-600 mt-1">Đồng bộ và quản lý dữ liệu Firebase</p>
        </div>
        
        <button
          onClick={loadSyncStatus}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg border ${
          message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {message.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {message.type === 'info' && <Info className="w-5 h-5" />}
            <p className="font-medium">{message.text}</p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Exams */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Exams</h3>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
              Local: <span className="font-bold text-gray-900">{EXAM_LIST.length}</span> exams
            </p>
            <p className="text-sm text-gray-600">
              Firebase: <span className="font-bold text-gray-900">{syncStatus?.exams || 0}</span> exams
            </p>
          </div>
          
          <button
            onClick={handleSyncExams}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            Sync Exams
          </button>
        </div>

        {/* Grammar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Grammar</h3>
            <div className="p-3 bg-green-100 rounded-lg">
              <Database className="w-6 h-6 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
              Local: <span className="font-bold text-gray-900">
                {Object.values(GRAMMAR_DATA).reduce((sum, level) => 
                  sum + Object.keys(level.topics || {}).length, 0
                )}
              </span> topics
            </p>
            <p className="text-sm text-gray-600">
              Firebase: <span className="font-bold text-gray-900">{syncStatus?.grammar || 0}</span> topics
            </p>
          </div>
          
          <button
            onClick={handleSyncGrammar}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            Sync Grammar
          </button>
        </div>

        {/* Vocabulary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Vocabulary</h3>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
              Local: <span className="font-bold text-gray-900">
                {Object.values(vocabularyData).reduce((sum, subtopics) => 
                  sum + Object.values(subtopics).reduce((s, words) => s + words.length, 0), 0
                )}
              </span> words
            </p>
            <p className="text-sm text-gray-600">
              Firebase: <span className="font-bold text-gray-900">{syncStatus?.vocabulary || 0}</span> words
            </p>
          </div>
          
          <button
            onClick={handleSyncVocabulary}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            Sync Vocabulary
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-blue-900 mb-2">Hướng dẫn sử dụng</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• <strong>Sync Exams:</strong> Đồng bộ tất cả 22 đề thi từ local lên Firebase</li>
              <li>• <strong>Sync Grammar:</strong> Đồng bộ các bài học ngữ pháp (Beginner, Intermediate, Advanced)</li>
              <li>• <strong>Sync Vocabulary:</strong> Đồng bộ từ vựng từ 5 levels lên Firebase</li>
              <li>• <strong>Lưu ý:</strong> Chỉ chạy sync 1 lần khi setup. Sau đó quản lý trực tiếp trên Firebase</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagement;