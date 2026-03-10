// src/admin/pages/Exams/ExamManagement.jsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Plus, Edit3, Trash2,
  BookOpen, FileText, Headphones,
  Loader2, AlertTriangle, RefreshCw, ChevronRight
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExams, deleteExam } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';

// ─── Delete Confirm Modal ──────────────────────────────────────────
const DeleteModal = ({ exam, onConfirm, onCancel, saving }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-black text-slate-900">Xóa bộ đề?</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Thao tác này không thể hoàn tác và sẽ xóa cả file Audio trên Supabase.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
        <p className="text-sm font-bold text-slate-800 truncate">{exam.title}</p>
        <p className="text-xs text-slate-400 mt-0.5">{exam.questions ?? 0} câu hỏi</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Hủy
        </button>
        <button
          onClick={() => onConfirm(exam)}
          disabled={saving}
          className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Xóa vĩnh viễn
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

  // Responsive: đóng sidebar trên mobile khi mount
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
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

  // ── Filter + Sort ──────────────────────────────────────────────
  const filteredAndSorted = useMemo(() => {
    let result = [...exams];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => e.title?.toLowerCase().includes(q));
    }
    return result.sort((a, b) =>
      (a.title || '').localeCompare((b.title || ''), undefined, { numeric: true, sensitivity: 'base' })
    );
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

  const totalExams = exams.length;

  if (authLoading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Đang xác thực...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      {/* ── Shared Sidebar ── */}
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        admin={admin}
        onSignOut={async () => {
          const r = await signOut();
          if (r.success) navigate('/admin/login');
        }}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── Shared Navbar ── */}
        <AdminNavbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onQuickAction={() => navigate('/admin/exams/create')}
        />

        {/* ── Scrollable Content ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">
                  Thư viện <span className="text-blue-600">Đề thi</span>
                </h1>
                <p className="text-slate-500 text-sm mt-0.5 font-medium">
                  {totalExams} bộ đề hiện có trong hệ thống.
                </p>
              </div>

              {/* Actions row */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm đề thi..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-48 sm:w-64 shadow-sm transition-all"
                  />
                </div>

                {/* Refresh */}
                <button
                  onClick={fetchExams}
                  title="Làm mới"
                  className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>

                {/* Create */}
                <button
                  onClick={() => navigate('/admin/exams/create')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Tạo bộ đề</span>
                </button>
              </div>
            </div>

            {/* ── Error Banner ── */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-sm text-red-700">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* ── Table Card ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Table header bar */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-900">Danh sách bộ đề</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {filteredAndSorted.length} kết quả{searchQuery ? ` cho "${searchQuery}"` : ''}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left" style={{ minWidth: '520px' }}>
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Tên bộ đề
                      </th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center hidden sm:table-cell">
                        Listening
                      </th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center hidden md:table-cell">
                        Reading
                      </th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                        Tổng câu
                      </th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                        Thao tác
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-16 text-center">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
                          <p className="text-sm text-slate-400">Đang tải dữ liệu...</p>
                        </td>
                      </tr>
                    ) : filteredAndSorted.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-16 text-center">
                          <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                          <p className="text-sm font-semibold text-slate-400">
                            {searchQuery ? 'Không tìm thấy bộ đề phù hợp.' : 'Chưa có bộ đề nào.'}
                          </p>
                          {!searchQuery && (
                            <button
                              onClick={() => navigate('/admin/exams/create')}
                              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
                            >
                              Tạo bộ đề đầu tiên →
                            </button>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredAndSorted.map(exam => {
                        const parts = exam.parts ?? {};
                        const listeningIds = exam.listeningParts?.length
                          ? exam.listeningParts
                          : ['part1', 'part2', 'part3', 'part4'];
                        const readingIds = exam.readingParts?.length
                          ? exam.readingParts
                          : ['part5', 'part6', 'part7', 'part8'];
                        const listeningQ = listeningIds.reduce((n, pid) => n + (parts[pid]?.questions?.length ?? 0), 0);
                        const readingQ   = readingIds.reduce((n, pid) => n + (parts[pid]?.questions?.length ?? 0), 0);

                        return (
                          <tr
                            key={exam.id}
                            className="hover:bg-slate-50 transition-colors group"
                          >
                            {/* Title */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-sm font-bold text-slate-800 truncate" style={{ maxWidth: '220px' }}>
                                  {exam.title}
                                </span>
                              </div>
                            </td>

                            {/* Listening */}
                            <td className="px-6 py-4 text-center hidden sm:table-cell">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">
                                <Headphones className="w-3 h-3" />
                                {listeningQ}
                              </span>
                            </td>

                            {/* Reading */}
                            <td className="px-6 py-4 text-center hidden md:table-cell">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">
                                <BookOpen className="w-3 h-3" />
                                {readingQ}
                              </span>
                            </td>

                            {/* Total */}
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm font-black text-slate-700 tabular-nums">
                                {exam.questions ?? 0}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => navigate(`/admin/exams/edit/${exam.id}`)}
                                  title="Chỉnh sửa"
                                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteTarget(exam)}
                                  title="Xóa"
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer count */}
              {!loading && filteredAndSorted.length > 0 && (
                <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50">
                  <p className="text-xs text-slate-400 font-medium">
                    Hiển thị {filteredAndSorted.length} / {totalExams} bộ đề
                  </p>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* ── Delete Confirm Modal ── */}
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