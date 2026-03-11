// src/admin/pages/Exams/ExamManagement.jsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Plus, Edit3, Trash2, Filter,
  BookOpen, FileText, Headphones, PenTool, Mic,
  Loader2, AlertTriangle, RefreshCw, LayoutGrid, CheckCircle2, Trophy
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExams, deleteExam } from '../../services/examService';
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { logAdminAction } from '../../utils/adminLogger';
import { EXAM_CATEGORIES } from './CreateExam';

// ─── Modal Xóa Đề Thi ──────────────────────────────────────────────
const DeleteModal = ({ exam, onConfirm, onCancel, saving }) => (
  <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="min-w-0 pt-1">
            <h3 className="text-xl font-black text-slate-900">Xóa đề thi này?</h3>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              Bạn đang chuẩn bị xóa vĩnh viễn bộ đề và toàn bộ file Audio liên quan.
            </p>
          </div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <FileText className="w-5 h-5 text-slate-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{exam.title}</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{exam.questions ?? 0} câu hỏi</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all">
            Hủy bỏ
          </button>
          <button onClick={() => onConfirm(exam)} disabled={saving} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:opacity-60 transition-all">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Xóa vĩnh viễn
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────
const ExamManagement = () => {
  const navigate = useNavigate();
  const { admin, loading: authLoading, signOut } = useAdminAuth();

  const [exams,        setExams]        = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [filterCat,    setFilterCat]    = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting,   setIsDeleting]   = useState(false);
  const [error,        setError]        = useState(null);
  const [sidebarOpen,  setSidebarOpen]  = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchExams = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { exams: data } = await getExams();
      setExams(data);
    } catch (err) { setError(err.message); } 
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchExams(); }, [fetchExams]);

  const filteredAndSorted = useMemo(() => {
    let result = [...exams];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => e.title?.toLowerCase().includes(q));
    }
    if (filterCat !== 'all') {
      result = result.filter(e => (e.category || 'other') === filterCat);
    }
    return result.sort((a, b) =>
      (a.title || '').localeCompare((b.title || ''), undefined, { numeric: true, sensitivity: 'base' })
    );
  }, [exams, searchQuery, filterCat]);

  const handleDelete = async (exam) => {
    setIsDeleting(true);
    try {
      await deleteExam(exam.id, exam);
      setExams(prev => prev.filter(e => e.id !== exam.id));
      if (admin) await logAdminAction(admin.id, admin.email, 'DELETE_EXAM', `Đề thi: ${exam.title}`);
      setDeleteTarget(null);
    } catch (err) { setError(`Lỗi khi xóa: ${err.message}`); } 
    finally { setIsDeleting(false); }
  };

  const totalExams = exams.length;

  // Render Skill Badge cực xịn
  const renderSkillBadge = (count, icon, colorClass, label) => {
    if (!count || count === 0) return <span className="text-slate-300 font-medium">-</span>;
    return (
      <div className={`inline-flex flex-col items-center justify-center p-1.5 rounded-xl ${colorClass.split(' ')[0]} bg-opacity-50 min-w-[48px]`}>
        <span className={`text-[10px] font-black uppercase tracking-widest ${colorClass.split(' ')[1]}`}>{label}</span>
        <span className={`text-sm font-black mt-0.5 ${colorClass.split(' ')[1]}`}>{count}</span>
      </div>
    );
  };

  if (authLoading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => navigate('/admin/exams/create')} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* ── HEADER ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Thư viện <span className="text-blue-600">Đề thi</span></h1>
                <p className="text-slate-500 text-sm mt-1 font-medium">Quản lý và xây dựng ngân hàng đề thi đa dạng.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                <button onClick={fetchExams} className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 shadow-sm transition-all group">
                  <RefreshCw className={`w-5 h-5 text-slate-500 group-hover:text-blue-600 ${loading ? 'animate-spin text-blue-600' : ''}`} />
                </button>
                <button onClick={() => navigate('/admin/exams/create')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 transition-all">
                  <Plus className="w-5 h-5" /> <span className="hidden sm:inline">Tạo đề thi mới</span>
                </button>
              </div>
            </div>

            {/* ── STATS & FILTER BAR ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Box thống kê nhanh */}
              <div className="lg:col-span-1 grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng số đề</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900 leading-none">{totalExams}</span>
                    <LayoutGrid className="w-5 h-5 text-blue-500 mb-1" />
                  </div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Danh mục</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-slate-900 leading-none">{EXAM_CATEGORIES.length}</span>
                    <Trophy className="w-5 h-5 text-amber-500 mb-1" />
                  </div>
                </div>
              </div>

              {/* Box Lọc & Tìm kiếm */}
              <div className="lg:col-span-2 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-1/3">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <select 
                    value={filterCat} onChange={e => setFilterCat(e.target.value)}
                    className="w-full pl-11 pr-8 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none font-bold text-slate-700 transition-all cursor-pointer"
                  >
                    <option value="all">Tất cả danh mục</option>
                    {EXAM_CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="relative w-full sm:flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text" placeholder="Tìm tên đề thi..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-2xl text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none font-medium text-slate-700 transition-all placeholder:font-normal"
                  />
                </div>
              </div>
            </div>

            {/* ── ERROR BANNER ── */}
            {error && <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-sm font-medium text-red-700"><AlertTriangle className="w-5 h-5" /><span>{error}</span></div>}

            {/* ── BẢNG DỮ LIỆU (UI MỚI) ── */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left" style={{ minWidth: '900px' }}>
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[35%]">Thông tin Đề thi</th>
                      <th className="px-3 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Cấu trúc kỹ năng</th>
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tổng câu</th>
                      <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      <tr><td colSpan={4} className="px-6 py-24 text-center"><Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto" /></td></tr>
                    ) : filteredAndSorted.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-24 text-center text-slate-400 font-medium text-sm">Không có dữ liệu phù hợp.</td></tr>
                    ) : (
                      filteredAndSorted.map(exam => {
                        let parts = [];
                        if (Array.isArray(exam.parts)) parts = exam.parts;
                        else if (exam.parts && typeof exam.parts === 'object') {
                          parts = Object.entries(exam.parts).map(([key, val]) => {
                            let type = val.type;
                            if (!type) type = ['part1', 'part2', 'part3', 'part4'].includes(key) ? 'listening' : 'reading';
                            return { ...val, id: key, type };
                          });
                        }
                        
                        let qs = { listening: 0, reading: 0, writing: 0, speaking: 0 };
                        parts.forEach(p => { if (qs[p.type] !== undefined) qs[p.type] += (p.questions?.length || 0); });
                        const totalQuestions = qs.listening + qs.reading + qs.writing + qs.speaking;
                        
                        const catObj = EXAM_CATEGORIES.find(c => c.value === (exam.category || 'other'));

                        return (
                          <tr key={exam.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={(e) => {
                            // Chặn click nếu bấm vào nút Xóa hoặc Sửa
                            if(!e.target.closest('button')) navigate(`/admin/exams/detail/${exam.id}`);
                          }}>
                            {/* Cột 1: Thông tin */}
                            <td className="px-6 py-5">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="min-w-0 pt-0.5">
                                  <span className="text-[15px] font-black text-slate-900 truncate block mb-1 hover:text-blue-600 transition-colors">
                                    {exam.title}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                      {catObj?.label || 'Khác'}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> {parts.length} Parts
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Cột 2: Cấu trúc kỹ năng (Gộp chung thành 1 cụm Badge đẹp mắt) */}
                            <td className="px-3 py-5 text-center">
                              <div className="flex items-center justify-center gap-2">
                                {renderSkillBadge(qs.listening, Headphones, 'bg-blue-100 text-blue-700', 'List')}
                                {renderSkillBadge(qs.reading, BookOpen, 'bg-amber-100 text-amber-700', 'Read')}
                                {renderSkillBadge(qs.writing, PenTool, 'bg-emerald-100 text-emerald-700', 'Writ')}
                                {renderSkillBadge(qs.speaking, Mic, 'bg-purple-100 text-purple-700', 'Speak')}
                              </div>
                            </td>
                            
                            {/* Cột 3: Tổng số câu */}
                            <td className="px-6 py-5 text-center">
                              <div className="inline-flex flex-col items-center justify-center">
                                <span className="text-xl font-black text-slate-800">{totalQuestions}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Câu hỏi</span>
                              </div>
                            </td>
                            
                            {/* Cột 4: Thao tác */}
                            <td className="px-6 py-5">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/exams/edit/${exam.id}`); }} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Chỉnh sửa">
                                  <Edit3 className="w-5 h-5" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(exam); }} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Xóa đề">
                                  <Trash2 className="w-5 h-5" />
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
            </div>

          </div>
        </main>
      </div>

      {deleteTarget && <DeleteModal exam={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} saving={isDeleting} />}
    </div>
  );
};

export default ExamManagement;