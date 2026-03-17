// src/admin/pages/Exams/ExamManagement.jsx
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Plus, Edit3, Trash2, Filter,
  BookOpen, FileText, Headphones, PenTool, Mic,
  Loader2, AlertTriangle, RefreshCw, LayoutGrid, CheckCircle2, Trophy,
  ChevronDown, Eye, EyeOff, UploadCloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '../../hooks/useAdminAuth';

// ⚠️ LƯU Ý: Hãy đảm bảo bạn đã export 'updateExamStatus' và 'importExam' từ examService.js
import { getExams, deleteExam, updateExamStatus, importExam } from '../../services/examService'; 
import AdminSidebar from '../../components/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';
import { logAdminAction } from '../../utils/adminLogger';

// ─── CẤU TRÚC DANH MỤC ───
const EXAM_CATEGORIES = [
  { value: 'toeic',  label: 'Luyện thi TOEIC' },
  { value: 'ielts',  label: 'Luyện thi IELTS' },
  { value: 'huflit', label: 'Đề thi trường HUFLIT' },
  { value: 'thpt',   label: 'Đề thi THPT Quốc Gia' },
  { value: 'other',  label: 'Khác / Chưa phân loại' },
];

// ─── Modal Xóa Đề Thi (Compact Gamified Pop-up) ───
const DeleteModal = ({ exam, onConfirm, onCancel, saving }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel} />
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 15 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="bg-white rounded-[24px] p-6 sm:p-8 w-full max-w-md border-2 border-slate-200 border-b-[8px] relative z-10 shadow-xl"
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#FF4B4B] rounded-[16px] border-b-[4px] border-[#E54343] flex items-center justify-center shadow-sm">
        <AlertTriangle size={28} className="text-white" strokeWidth={2.5} />
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-[20px] font-display font-black text-slate-800 mb-2">Xóa đề thi này?</h3>
        <p className="text-[14px] font-body font-medium text-slate-500 mb-5 leading-snug">
          Bạn chuẩn bị xóa vĩnh viễn đề thi và các file Audio liên quan. Hành động này không thể hoàn tác.
        </p>

        <div className="bg-slate-50 rounded-[16px] p-3.5 mb-5 border border-slate-200 flex items-center gap-3 text-left">
          <div className="w-10 h-10 bg-white rounded-[10px] border border-slate-200 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-slate-400" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-display font-bold text-slate-800 truncate">{exam.title}</p>
            <p className="text-[12px] font-body font-medium text-slate-400 mt-0.5">{exam.questions ?? 0} câu hỏi</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 bg-slate-100 border-2 border-slate-200 border-b-[3px] rounded-[14px] text-[14px] font-display font-bold text-slate-600 hover:bg-slate-200 active:border-b-2 active:translate-y-[1px] transition-all outline-none">
            Hủy bỏ
          </button>
          <button onClick={() => onConfirm(exam)} disabled={saving} className="flex-1 py-3 bg-[#FF4B4B] border-2 border-[#E54343] border-b-[3px] rounded-[14px] text-[14px] font-display font-bold text-white hover:bg-[#E54343] active:border-b-2 active:translate-y-[1px] disabled:opacity-60 flex items-center justify-center gap-2 transition-all outline-none">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" strokeWidth={2.5} />}
            Xóa ngay
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── MAIN COMPONENT ───
const ExamManagement = () => {
  const navigate = useNavigate();
  const { admin, loading: authLoading, signOut } = useAdminAuth();

  const [exams,         setExams]        = useState([]);
  const [loading,       setLoading]      = useState(false);
  const [searchQuery,   setSearchQuery]  = useState('');
  const [filterCat,     setFilterCat]    = useState('all');
  
  const [deleteTarget,  setDeleteTarget] = useState(null);
  const [isDeleting,    setIsDeleting]   = useState(false);
  const [updatingId,    setUpdatingId]   = useState(null); 
  const [isImporting,   setIsImporting]  = useState(false);
  
  const [error,         setError]        = useState(null);
  const [sidebarOpen,   setSidebarOpen]  = useState(true);

  const fileInputRef = useRef(null);

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
    return result.sort((a, b) => {
      // Ưu tiên hiển thị đề mới nhất lên đầu
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
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

  // ─── HÀM: TOGGLE TRẠNG THÁI ẨN/HIỆN ───
  const togglePublishStatus = async (exam) => {
    if (updatingId === exam.id) return;
    setUpdatingId(exam.id);
    const newStatus = !exam.is_public; 
    
    try {
      await updateExamStatus(exam.id, newStatus);
      setExams(prev => prev.map(e => e.id === exam.id ? { ...e, is_public: newStatus } : e));
      if (admin) {
        await logAdminAction(admin.id, admin.email, 'TOGGLE_EXAM_VISIBILITY', `Đề thi: ${exam.title} -> ${newStatus ? 'Công khai' : 'Tạm ẩn'}`);
      }
    } catch (err) {
      setError(`Không thể cập nhật trạng thái: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // ─── HÀM: IMPORT JSON ───
  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      setIsImporting(true);
      setError(null);
      try {
        const jsonData = JSON.parse(e.target.result);
        await importExam(jsonData);
        if (admin) {
          await logAdminAction(admin.id, admin.email, 'IMPORT_EXAM', `Đề thi: ${jsonData.title || 'Không tên'}`);
        }
        await fetchExams(); // Tải lại danh sách
        alert('✅ Đã import đề thi thành công vào danh sách Bản nháp!');
      } catch (err) {
        setError(`Lỗi import JSON: ${err.message}`);
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const totalExams = exams.length;

  const renderSkillBadge = (count, Icon, colorClass, label) => {
    if (!count || count === 0) return null;
    return (
      <div className={`flex flex-col items-center justify-center w-[40px] h-[40px] sm:w-[46px] sm:h-[46px] rounded-[10px] sm:rounded-[12px] border-2 border-b-[3px] shadow-sm ${colorClass}`} title={label}>
        <Icon size={14} strokeWidth={2.5} className="mb-0.5" />
        <span className="text-[10px] sm:text-[11px] font-display font-black leading-none">{count}</span>
      </div>
    );
  };

  if (authLoading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F4F7FA] flex-col gap-3">
      <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <h3 className="text-[16px] font-display font-bold text-slate-600">Đang tải hệ thống...</h3>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F4F7FA] font-sans overflow-hidden selection:bg-blue-200" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => navigate('/admin/exams/create')} />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

            {/* ── HEADER & ACTIONS ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-display font-black text-slate-800 tracking-tight leading-tight flex items-center gap-2">
                  Thư viện <span className="text-[#1CB0F6]">Đề thi</span>
                  <div className="p-1.5 sm:p-2 bg-blue-100 rounded-[10px] sm:rounded-xl border-b-[3px] border-blue-200 rotate-12 shrink-0">
                    <BookOpen className="text-[#1CB0F6] w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  </div>
                </h1>
                <p className="text-[13px] sm:text-[14px] font-body font-medium text-slate-500 mt-1">Quản lý và xây dựng ngân hàng đề thi đa dạng.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
                <button 
                  onClick={fetchExams} 
                  className="w-11 h-11 sm:w-12 sm:h-12 bg-white border-2 border-slate-200 border-b-[3px] rounded-[14px] sm:rounded-[16px] flex items-center justify-center text-slate-500 hover:text-[#1CB0F6] hover:border-blue-200 hover:bg-blue-50 active:border-b-2 active:translate-y-[1px] transition-all shadow-sm outline-none"
                  title="Làm mới"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-[#1CB0F6]' : ''}`} strokeWidth={2.5} />
                </button>

                {/* ── NÚT IMPORT JSON ── */}
                <input 
                  type="file" accept=".json" 
                  ref={fileInputRef} onChange={handleImportJSON} 
                  className="hidden" 
                />
                <button 
                  onClick={() => fileInputRef.current.click()} 
                  disabled={isImporting}
                  className="flex items-center justify-center gap-2 bg-white text-[#1CB0F6] px-4 sm:px-5 py-2.5 sm:py-3 rounded-[14px] sm:rounded-[16px] font-display font-bold text-[14px] sm:text-[15px] uppercase tracking-wider border-2 border-[#BAE3FB] border-b-[4px] hover:bg-[#EAF6FE] hover:border-[#1899D6] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none shadow-sm disabled:opacity-60"
                  title="Tải lên file JSON"
                >
                  {isImporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud size={18} strokeWidth={2.5} />}
                  <span className="hidden sm:inline">Import JSON</span>
                </button>

                <button 
                  onClick={() => navigate('/admin/exams/create')} 
                  className="flex items-center justify-center gap-2 bg-[#58CC02] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-[14px] sm:rounded-[16px] font-display font-bold text-[14px] sm:text-[15px] uppercase tracking-wider border-2 border-[#46A302] border-b-[4px] hover:bg-[#46A302] hover:translate-y-[1px] hover:border-b-[3px] active:border-b-0 active:translate-y-[4px] transition-all outline-none shadow-sm"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <Plus strokeWidth={3} size={16} />
                  </div>
                  <span className="hidden sm:inline">Tạo đề thi mới</span>
                  <span className="sm:hidden">Tạo mới</span>
                </button>
              </div>
            </div>

            {/* ── STATS & FILTER BAR ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm flex flex-col justify-center transition-transform">
                  <p className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest mb-1">Tổng số đề</p>
                  <div className="flex items-end gap-2">
                    <span className="text-[24px] sm:text-[28px] font-display font-black text-slate-800 leading-none">{totalExams}</span>
                    <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6 text-[#1CB0F6] mb-0.5 sm:mb-1" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm flex flex-col justify-center transition-transform">
                  <p className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest mb-1">Danh mục</p>
                  <div className="flex items-end gap-2">
                    <span className="text-[24px] sm:text-[28px] font-display font-black text-slate-800 leading-none">{EXAM_CATEGORIES.length}</span>
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFC800] mb-0.5 sm:mb-1" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 bg-white p-3 sm:p-4 rounded-[20px] sm:rounded-[24px] border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="relative w-full sm:w-[35%] lg:w-[40%]">
                  <Filter className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" strokeWidth={2.5} />
                  <select 
                    value={filterCat} onChange={e => setFilterCat(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-8 sm:pr-10 py-2.5 sm:py-3 bg-slate-50 border-2 border-slate-200 rounded-[14px] sm:rounded-[16px] text-[13px] sm:text-[14px] font-body font-bold text-slate-700 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none transition-all cursor-pointer"
                  >
                    <option value="all">Tất cả danh mục</option>
                    {EXAM_CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={16} strokeWidth={3} />
                  </div>
                </div>
                
                <div className="relative w-full sm:flex-1">
                  <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" strokeWidth={2.5} />
                  <input
                    type="text" placeholder="Tìm kiếm tên đề thi..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-slate-50 border-2 border-slate-200 rounded-[14px] sm:rounded-[16px] text-[13px] sm:text-[14px] font-body font-bold text-slate-800 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 placeholder:font-medium"
                  />
                </div>
              </div>
            </div>

            {/* ── ERROR BANNER ── */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 sm:p-4 bg-[#fff0f0] border-2 border-[#ffc1c1] border-b-[3px] rounded-[16px] flex items-start gap-2.5 text-[13px] sm:text-[14px] font-body font-bold text-[#FF4B4B] shadow-sm">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── DANH SÁCH ĐỀ THI ── */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-16 flex flex-col items-center">
                  <div className="w-10 h-10 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin mb-3" />
                  <p className="font-display font-bold text-slate-500 text-[14px]">Đang tải thư viện...</p>
                </div>
              ) : filteredAndSorted.length === 0 ? (
                <div className="text-center py-16 bg-white border-2 border-dashed border-slate-300 rounded-[24px] shadow-sm">
                  <div className="w-16 h-16 bg-slate-100 rounded-[16px] border-b-[3px] border-slate-200 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-display font-black text-slate-700 mb-1">Trống trơn!</h3>
                  <p className="text-slate-500 font-body font-medium text-[13px] sm:text-[14px]">Không tìm thấy đề thi nào phù hợp với tìm kiếm.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredAndSorted.map((exam, index) => {
                    // Xử lý parts linh hoạt
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
                    parts.forEach(p => {
                      if (qs[p.type] !== undefined) {
                        const validQuestions = p.questions?.filter(q => {
                          if (q.type === 'group') {
                            const validSubQs = q.subQuestions?.filter(sq => !sq.isExample) || [];
                            qs[p.type] += validSubQs.length;
                            return false; 
                          }
                          return !q.isExample;
                        }) || [];
                        qs[p.type] += validQuestions.length;
                      }
                    });
                    const totalQuestions = qs.listening + qs.reading + qs.writing + qs.speaking;
                    const catObj = EXAM_CATEGORIES.find(c => c.value === (exam.category || 'other'));

                    // Kiểm tra độ mờ nếu bài bị ẩn
                    const isDraft = !exam.is_public;

                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                        key={exam.id} 
                        onClick={() => navigate(`/admin/exams/detail/${exam.id}`)}
                        className={`group bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 border-2 border-b-[4px] shadow-sm transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-5 ${
                          isDraft ? 'border-slate-200 opacity-80 hover:opacity-100 grayscale-[0.2] hover:grayscale-0' : 'border-slate-200 hover:border-[#1CB0F6] hover:bg-[#EAF6FE]/30'
                        }`}
                      >
                        {/* Left: Info */}
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[12px] sm:rounded-[14px] flex items-center justify-center border-b-[3px] shrink-0 shadow-sm ${
                            isDraft ? 'bg-slate-300 border-slate-400 text-white' : 'bg-[#1CB0F6] border-[#1899D6] text-white'
                          }`}>
                            <FileText className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                          </div>
                          <div className="min-w-0 pt-0.5 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              
                              {/* Badge Trạng thái */}
                              <span className={`text-[9px] sm:text-[10px] font-display font-black uppercase tracking-widest px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-[6px] sm:rounded-[8px] border flex items-center gap-1 ${
                                exam.is_public 
                                ? 'bg-[#f1faeb] text-[#58CC02] border-[#bcf096]' 
                                : 'bg-[#fff8e6] text-[#e5b400] border-[#FFC800]/40'
                              }`}>
                                {exam.is_public ? (
                                  <><CheckCircle2 size={10} strokeWidth={3} /> Public</>
                                ) : (
                                  <><EyeOff size={10} strokeWidth={3} /> Draft</>
                                )}
                              </span>

                              <span className="text-[9px] sm:text-[10px] font-display font-black uppercase tracking-widest px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-[6px] sm:rounded-[8px] bg-slate-100 text-slate-500 border border-slate-200">
                                {catObj?.label || 'Khác'}
                              </span>
                              <span className="text-[9px] sm:text-[10px] font-display font-black uppercase tracking-widest px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-[6px] sm:rounded-[8px] bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1">
                                <CheckCircle2 size={10} strokeWidth={3} className="sm:w-3 sm:h-3" /> {parts.length} Parts
                              </span>
                            </div>
                            <h3 className={`text-[15px] sm:text-[16px] md:text-[18px] font-display font-bold truncate transition-colors leading-tight ${
                              isDraft ? 'text-slate-600 group-hover:text-slate-800' : 'text-slate-800 group-hover:text-[#1CB0F6]'
                            }`}>
                              {exam.title}
                            </h3>
                          </div>
                        </div>

                        {/* Middle: Skills */}
                        <div className={`flex items-center gap-1.5 sm:gap-2 flex-wrap w-full md:w-auto mt-1 md:mt-0 ${isDraft ? 'opacity-80 group-hover:opacity-100' : ''}`}>
                          {renderSkillBadge(qs.listening, Headphones, 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]', 'Nghe')}
                          {renderSkillBadge(qs.reading, BookOpen, 'bg-[#f1faeb] text-[#58CC02] border-[#bcf096]', 'Đọc')}
                          {renderSkillBadge(qs.writing, PenTool, 'bg-[#FFF4E5] text-[#FF9600] border-[#FFD8A8]', 'Viết')}
                          {renderSkillBadge(qs.speaking, Mic, 'bg-[#faefff] text-[#CE82FF] border-[#eec9ff]', 'Nói')}
                        </div>

                        {/* Right: Total & Actions */}
                        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-3 sm:gap-4 pt-3 sm:pt-4 md:pt-0 border-t-2 border-slate-100 md:border-none mt-1 sm:mt-2 md:mt-0">
                          
                          <div className={`text-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-[12px] sm:rounded-[14px] border-2 mr-1 sm:mr-2 ${
                            isDraft ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}>
                            <p className="text-[16px] sm:text-[18px] font-display font-black leading-none">{totalQuestions}</p>
                            <p className="text-[9px] sm:text-[10px] font-display font-black uppercase tracking-widest mt-1 opacity-70">Câu hỏi</p>
                          </div>

                          <div className="flex items-center gap-1.5 sm:gap-2">
                            
                            {/* Nút Toggle Ẩn/Hiện */}
                            <button 
                              onClick={(e) => { e.stopPropagation(); togglePublishStatus(exam); }} 
                              disabled={updatingId === exam.id}
                              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[14px] border-2 border-b-[3px] flex items-center justify-center transition-all outline-none disabled:opacity-50 ${
                                exam.is_public
                                ? 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50'
                                : 'bg-[#FFC800] border-[#E5A500] text-white hover:bg-[#FFD900]'
                              }`}
                              title={exam.is_public ? "Tạm ẩn Đề thi" : "Xuất bản Đề thi"}
                            >
                              {updatingId === exam.id ? (
                                <Loader2 size={16} className="animate-spin sm:w-5 sm:h-5" />
                              ) : exam.is_public ? (
                                <EyeOff size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                              ) : (
                                <Eye size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                              )}
                            </button>

                            <button 
                              onClick={(e) => { e.stopPropagation(); navigate(`/admin/exams/edit/${exam.id}`); }} 
                              className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[14px] bg-slate-50 border-2 border-slate-200 border-b-[3px] flex items-center justify-center text-slate-500 hover:bg-[#1CB0F6] hover:text-white hover:border-[#1899D6] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none"
                              title="Chỉnh sửa"
                            >
                              <Edit3 size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                            </button>

                            <button 
                              onClick={(e) => { e.stopPropagation(); setDeleteTarget(exam); }} 
                              className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[14px] bg-[#fff0f0] border-2 border-[#ffc1c1] border-b-[3px] flex items-center justify-center text-[#FF4B4B] hover:bg-[#FF4B4B] hover:text-white hover:border-[#E54343] active:border-b-[2px] active:translate-y-[2px] transition-all outline-none"
                              title="Xóa đề"
                            >
                              <Trash2 size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      <AnimatePresence>
        {deleteTarget && <DeleteModal exam={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} saving={isDeleting} />}
      </AnimatePresence>
    </div>
  );
};

export default ExamManagement;