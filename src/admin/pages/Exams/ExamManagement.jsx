// src/admin/pages/Exams/ExamManagement.jsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Bell, Plus, Edit3, Eye, Trash2,
  BookOpen, FileText, Headphones, TrendingUp,
  Loader2, AlertTriangle, RefreshCw, Menu, X
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExams, deleteExam } from '../../services/examService';
import ExamSidebar from './components/ExamSidebar';

// ─── Delete Confirm Modal ──────────────────────────────────────────
const DeleteModal = ({ exam, onConfirm, onCancel, saving }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-4 md:p-6">
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 md:w-6 h-5 md:h-6 text-red-600" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-bold text-gray-900">Xóa bộ đề?</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Thao tác này không thể hoàn tác và sẽ xóa cả file Audio trên Supabase.</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-3 md:p-4 mb-6">
        <p className="text-xs md:text-sm font-semibold text-gray-900 truncate">{exam.title}</p>
        <p className="text-[11px] md:text-xs text-gray-500 mt-1">
          {exam.questions ?? 0} câu hỏi tổng cộng
        </p>
      </div>
      <div className="flex gap-2 md:gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-3 md:px-4 py-2 md:py-2.5 border border-gray-200 rounded-xl text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
        <button
          onClick={() => onConfirm(exam)}
          disabled={saving}
          className="flex-1 px-3 md:px-4 py-2 md:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          <span className="hidden sm:inline">Xóa vĩnh viễn</span>
          <span className="sm:hidden">Xóa</span>
        </button>
      </div>
    </div>
  </div>
);

// ─── MAIN ──────────────────────────────────────────────────────────
const ExamManagement = () => {
  const navigate = useNavigate();
  const { admin, loading: authLoading, signOut } = useAdminAuth();

  const [exams,        setExams]        = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting,   setIsDeleting]   = useState(false);
  const [error,        setError]        = useState(null);
  const [sidebarOpen,  setSidebarOpen]  = useState(true);
  const [isMobile,     setIsMobile]     = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Fetch ──────────────────────────────────────────────────────
  const fetchExams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { exams: data } = await getExams();
      setExams(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchExams(); }, [fetchExams]);

  // ── Sắp xếp và Tìm kiếm (Fix lỗi lộn xộn) ────────────────────────
  const filteredAndSorted = useMemo(() => {
    let result = [...exams];
    
    // 1. Tìm kiếm
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => e.title?.toLowerCase().includes(q));
    }

    // 2. Sắp xếp theo tên (VD: Exam 1, Exam 2, Exam 10...)
    return result.sort((a, b) => {
      return (a.title || '').localeCompare((b.title || ''), undefined, { numeric: true, sensitivity: 'base' });
    });
  }, [exams, searchQuery]);

  // ── Delete ─────────────────────────────────────────────────────
  const handleDelete = async (exam) => {
    setIsDeleting(true);
    try {
      await deleteExam(exam.id, exam); 
      setExams(prev => prev.filter(e => e.id !== exam.id));
      setDeleteTarget(null);
    } catch (err) {
      setError(`Lỗi khi xóa: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSignOut = async () => {
    const r = await signOut();
    if (r.success) navigate('/admin/login');
  };

  const totalExams = exams.length;
  const totalQ     = exams.reduce((a, e) => a + (e.questions ?? 0), 0);
  const avgQ       = totalExams ? Math.round(totalQ / totalExams * 10) / 10 : 0;

  if (authLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium text-sm md:text-base">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between flex-shrink-0 z-40 shadow-sm transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <ExamSidebar admin={admin} onSignOut={handleSignOut} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 flex-shrink-0 gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 flex-shrink-0"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <h2 className="text-base md:text-lg font-bold text-gray-900 hidden sm:block">Quản lý Bộ đề thi</h2>

          <div className="relative flex-1 md:flex-none md:max-w-[300px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-gray-50 border border-gray-100 rounded-full text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <button
            onClick={() => navigate('/admin/exams/create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-xl flex items-center gap-2 text-xs md:text-sm font-semibold shadow-sm flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Tạo bộ đề</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Page title + action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Thư viện Bộ đề</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                {totalExams} bộ đề hiện có trong hệ thống.
              </p>
            </div>
            <button
              onClick={fetchExams}
              className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-white border border-gray-200 rounded-xl text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors flex-shrink-0"
            >
              <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Làm mới</span>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 md:gap-3 text-xs md:text-sm text-red-700">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" /> 
              <span>{error}</span>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider">Tên bộ đề</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center hidden sm:table-cell">Listening</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center hidden md:table-cell">Reading</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Tổng câu</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-4 md:px-6 py-12 md:py-16 text-center text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" /> 
                        <p className="text-xs md:text-sm">Đang tải...</p>
                      </td>
                    </tr>
                  ) : filteredAndSorted.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 md:px-6 py-12 md:py-20 text-center text-gray-400">
                        <p className="text-xs md:text-sm">Không tìm thấy bộ đề phù hợp.</p>
                      </td>
                    </tr>
                  ) : filteredAndSorted.map(exam => {
                    const parts = exam.parts ?? {};
                    const listeningIds = (exam.listeningParts && exam.listeningParts.length > 0) 
                      ? exam.listeningParts 
                      : ['part1', 'part2', 'part3', 'part4'];

                    const readingIds = (exam.readingParts && exam.readingParts.length > 0) 
                      ? exam.readingParts 
                      : ['part5', 'part6', 'part7', 'part8'];

                    const listeningQ = listeningIds.reduce((n, pid) => n + (parts[pid]?.questions?.length ?? 0), 0);
                    const readingQ = readingIds.reduce((n, pid) => n + (parts[pid]?.questions?.length ?? 0), 0);
                    
                    return (
                      <tr key={exam.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center gap-2 md:gap-4 min-w-0">
                            <div className="w-8 md:w-10 h-8 md:h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-4 md:w-5 h-4 md:h-5 text-blue-600" />
                            </div>
                            <p className="text-xs md:text-[15px] font-bold text-gray-900 truncate">
                              {exam.title}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-center hidden sm:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            <Headphones className="w-3 md:w-3.5 h-3 md:h-3.5 text-blue-400" />
                            <span className="text-xs md:text-sm font-semibold text-gray-700">{listeningQ}</span>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-center hidden md:table-cell">
                          <div className="flex items-center justify-center gap-1">
                            <BookOpen className="w-3 md:w-3.5 h-3 md:h-3.5 text-amber-400" />
                            <span className="text-xs md:text-sm font-semibold text-gray-700">{readingQ}</span>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                          <span className="text-xs md:text-sm font-bold text-gray-800">{exam.questions ?? 0}</span>
                        </td>
                        <td className="px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center justify-end gap-0.5">
                            <button
                              onClick={() => navigate(`/admin/exams/edit/${exam.id}`)}
                              className="p-1.5 md:p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors hover:bg-blue-50"
                              title="Chỉnh sửa"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(exam)}
                              className="p-1.5 md:p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors hover:bg-red-50"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {deleteTarget && (
        <DeleteModal
          exam={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          saving={isDeleting}
        />
      )}
    </div>
  );
};

export default ExamManagement;