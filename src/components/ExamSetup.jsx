// import React, { useState, memo, useMemo, useCallback, useRef, useEffect, useId } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { 
//   Search, ChevronRight, Check, FileText, Clock, 
//   Target, Headphones, BookOpen, Sparkles, Lock, LogIn, LayoutGrid, Info, ShieldAlert,
//   X, Zap, Timer, Loader2
// } from 'lucide-react';
// import { motion as Motion, AnimatePresence } from 'framer-motion';

// // ─── SERVICES & CONTEXT ───
// import { getAllExamMetadataAsync } from '../data/examData';
// import { useAuth } from '../contexts/AuthContext';

// /* ─── CẤU HÌNH ĐỘ KHÓ ────────────────── */
// const DIFFICULTY_CONFIG = {
//   beginner:     { label: 'Cơ bản',    bg: 'bg-[#F0FAE8]', text: 'text-[#58CC02]', border: 'border-[#bcf096]' },
//   intermediate: { label: 'Trung cấp', bg: 'bg-[#FFFBEA]', text: 'text-[#FF9600]', border: 'border-[#FFD8A8]' },
//   advanced:     { label: 'Nâng cao',  bg: 'bg-[#FFF0F0]', text: 'text-[#FF4B4B]', border: 'border-[#ffc1c1]' },
// };

// /* ─── COMPONENT: SKELETON (LOADING) ────────────────── */
// const SkeletonList = memo(() => (
//   <div className="flex flex-col gap-3 p-2">
//     {[1, 2, 3, 4].map(i => (
//       <div key={i} className="h-[96px] bg-slate-50 border-2 border-slate-100 rounded-[20px] p-4 flex items-center gap-4 animate-pulse">
//         <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
//         <div className="flex-1 space-y-3">
//           <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
//           <div className="h-3 w-1/3 bg-slate-200 rounded-full" />
//         </div>
//       </div>
//     ))}
//   </div>
// ));
// SkeletonList.displayName = 'SkeletonList';

// /* ─── COMPONENT: EMPTY STATE ────────────────── */
// const EmptyState = memo(({ searchQuery, onClear }) => (
//   <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
//     <div className="w-20 h-20 rounded-[24px] bg-slate-50 border-2 border-slate-200 flex items-center justify-center mb-6 shadow-sm">
//       <Search className="w-10 h-10 text-slate-300" strokeWidth={3} />
//     </div>
//     <h3 className="text-[18px] font-black text-slate-700 mb-2">Không tìm thấy đề thi</h3>
//     <p className="text-[14px] font-bold text-slate-500 mb-6 max-w-sm">
//       {searchQuery ? <>Không có kết quả cho từ khóa "<strong>{searchQuery}</strong>"</> : 'Hệ thống đang cập nhật đề thi mới.'}
//     </p>
//     {searchQuery && (
//       <button 
//         onClick={onClear} 
//         className="px-6 py-3 bg-[#EAF6FE] text-[#1CB0F6] rounded-xl text-[13px] font-black uppercase tracking-widest hover:bg-[#BAE3FB] active:scale-95 transition-all outline-none"
//       >
//         Xóa tìm kiếm
//       </button>
//     )}
//   </div>
// ));
// EmptyState.displayName = 'EmptyState';

// /* ─── COMPONENT: EXAM LIST ITEM ────────────────── */
// const ExamListItem = memo(({ exam, isSelected, onSelect, id, itemHeight, isTrial }) => {
//   const itemRef = useRef(null);
  
//   useEffect(() => { 
//     if (isSelected) itemRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); 
//   }, [isSelected]);

//   const diff = DIFFICULTY_CONFIG[exam.difficulty] || DIFFICULTY_CONFIG.beginner;

//   return (
//     <div style={{ height: itemHeight, padding: '0 4px 12px 4px' }}>
//       <div
//         id={id} ref={itemRef} role="option" aria-selected={isSelected} tabIndex={isSelected ? 0 : -1}
//         onClick={onSelect} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
//         className={`h-full w-full relative flex items-center gap-4 px-5 py-4 cursor-pointer outline-none transition-all rounded-[24px] border-2 ${
//           isSelected 
//             ? 'bg-[#EAF6FE] border-[#1CB0F6] border-b-[4px] shadow-sm -translate-y-[2px]' 
//             : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm active:translate-y-[2px] active:border-b-2'
//         }`}
//       >
//         <div className={`w-12 h-12 rounded-[14px] shrink-0 flex items-center justify-center transition-all border-b-[3px] ${
//           isSelected ? 'bg-[#1CB0F6] text-white border-[#1899D6] shadow-sm' : 'bg-slate-100 text-slate-400 border-slate-200'
//         }`}>
//           {isSelected ? <Check className="w-6 h-6" strokeWidth={3} /> : <FileText className="w-6 h-6" strokeWidth={2.5} />}
//         </div>

//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-3 mb-1.5">
//             <h3 className={`text-[16px] font-black truncate ${isSelected ? 'text-[#1CB0F6]' : 'text-slate-800'}`}>
//               {exam.title || `Đề thi ${exam.id}`}
//             </h3>
//             {isTrial && (
//               <span className="px-2.5 py-1 bg-[#FFFBEA] text-[#FF9600] border border-[#FFD8A8] rounded-lg text-[9px] font-black uppercase tracking-widest shrink-0 shadow-sm">
//                 Dùng thử
//               </span>
//             )}
//             {!isTrial && exam.isNew && (
//               <span className="px-2.5 py-1 bg-[#FFF0F0] text-[#FF4B4B] border border-[#ffc1c1] rounded-lg text-[9px] font-black uppercase tracking-widest shrink-0 shadow-sm">
//                 Mới
//               </span>
//             )}
//           </div>

//           <div className="flex flex-wrap items-center gap-3 text-[12px] font-bold text-slate-500">
//             <span className="flex items-center gap-1.5"><FileText size={14} className="text-slate-400" /> {exam.questions || 60} câu</span>
//             <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
//             <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> {exam.duration || 90} phút</span>
//             <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
//             <span className={`${diff.text} font-black uppercase tracking-wider`}>{diff.label}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });
// ExamListItem.displayName = 'ExamListItem';

// /* ─── COMPONENT: EXAM LIST BOX (VIRTUAL LIST) ────────────────── */
// const ITEM_H  = 104; 
// const VISIBLE = 5;
// const BUFFER  = 2;

// const ExamListBox = memo(({ exams, selectedExam, onSelectExam, listboxId }) => {
//   const [scrollTop, setScrollTop] = useState(0);
//   const containerRef = useRef(null);
//   const activeIdx = useMemo(() => exams.findIndex(e => e.id === selectedExam), [exams, selectedExam]);

//   const handleKeyDown = useCallback((e) => {
//     const len = exams.length;
//     if (!len) return;
//     let next = activeIdx;
//     if      (e.key === 'ArrowDown') { e.preventDefault(); next = Math.min(activeIdx + 1, len - 1); }
//     else if (e.key === 'ArrowUp')   { e.preventDefault(); next = Math.max(activeIdx - 1, 0); }
//     else if (e.key === 'Home')      { e.preventDefault(); next = 0; }
//     else if (e.key === 'End')       { e.preventDefault(); next = len - 1; }
//     else return;

//     onSelectExam(exams[next].id);
//     const top = next * ITEM_H;
//     const el  = containerRef.current;
//     if (!el) return;
//     if (top < el.scrollTop) el.scrollTop = top;
//     else if (top + ITEM_H > el.scrollTop + el.clientHeight) el.scrollTop = top + ITEM_H - el.clientHeight;
//   }, [exams, activeIdx, onSelectExam]);

//   const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_H) - BUFFER);
//   const endIdx   = Math.min(exams.length, Math.ceil((scrollTop + VISIBLE * ITEM_H) / ITEM_H) + BUFFER);

//   return (
//     <div
//       id={listboxId} ref={containerRef} role="listbox" tabIndex={0}
//       onScroll={e => setScrollTop(e.currentTarget.scrollTop)} onKeyDown={handleKeyDown}
//       className="outline-none custom-scrollbar p-2"
//       style={{ maxHeight: VISIBLE * ITEM_H, overflowY: 'auto' }}
//     >
//       <div style={{ height: exams.length * ITEM_H, position: 'relative' }}>
//         <div style={{ position: 'absolute', top: 0, left: 0, right: 0, transform: `translateY(${startIdx * ITEM_H}px)` }}>
//           {exams.slice(startIdx, endIdx).map(exam => (
//             <ExamListItem
//               key={exam.id} id={`exam-opt-${exam.id}`} exam={exam} itemHeight={ITEM_H}
//               isSelected={selectedExam === exam.id} onSelect={() => onSelectExam(exam.id)}
//               isTrial={exam.isTrial}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// });
// ExamListBox.displayName = 'ExamListBox';

// /* ─── COMPONENT: CATEGORY TABS ──────────────────── */
// const CategoryTabs = memo(({ categories, activeCategory, onChange }) => (
//   <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
//     {categories.map(cat => {
//       const active = activeCategory === cat.id;
//       const Icon = cat.id === 'toeic' ? Headphones : cat.id === 'ielts' ? BookOpen : Sparkles;
      
//       return (
//         <button 
//           key={cat.id} onClick={() => onChange(cat.id)}
//           className={`
//             shrink-0 px-5 py-3 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all outline-none flex items-center gap-2.5 border-2 border-b-[4px]
//             ${active 
//               ? 'bg-[#CE82FF] text-white border-[#B975E5] shadow-md -translate-y-[2px]' 
//               : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700 active:translate-y-[2px] active:border-b-2'}
//           `}
//         >
//           <Icon size={18} strokeWidth={3} />
//           {cat.label}
//           {cat.count > 0 && (
//             <span className={`ml-1 px-2 py-0.5 rounded-lg text-[11px] ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
//               {cat.count}
//             </span>
//           )}
//         </button>
//       );
//     })}
//   </div>
// ));
// CategoryTabs.displayName = 'CategoryTabs';

// /* ══════════════════════════════════════════════════════
//    MAIN COMPONENT: ExamSetup
// ══════════════════════════════════════════════════════ */
// export const ExamSetup = memo(({ onStartExam }) => {
//   const listboxId = useId();
//   const navigate = useNavigate();
//   // 🚀 Đọc tham số category từ URL (VD: /exams/ielts -> category = 'ielts')
//   const { category } = useParams();
//   const { currentUser } = useAuth() || { currentUser: null }; 

//   const [examList, setExamList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedExam, setSelectedExam] = useState('');
//   const [isStarting, setIsStarting] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Khởi tạo activeCategory dựa vào URL
//   const [activeCategory, setActiveCategory] = useState(category || 'all');
//   const [showModeModal, setShowModeModal] = useState(false);

//   // Load danh sách đề
//   useEffect(() => {
//     let mounted = true;
//     getAllExamMetadataAsync()
//       .then(data => {
//         if (!mounted) return;
//         setExamList(data || []);
//       })
//       .finally(() => { if (mounted) setIsLoading(false); });
//     return () => { mounted = false; };
//   }, []);

//   // 🚀 Đồng bộ URL params với activeCategory khi user bấm vào các link từ Navbar
//   useEffect(() => {
//     setActiveCategory(category || 'all');
//     setSearchQuery('');
//   }, [category]);

//   const handleCategoryChange = useCallback((catId) => {
//     setActiveCategory(catId);
//     setSearchQuery('');
//     // Cập nhật lại URL cho chuẩn SEO & Navigation
//     navigate(catId === 'all' ? '/exams' : `/exams/${catId}`, { replace: true });
//   }, [navigate]);

//   const categories = useMemo(() => {
//     const countMap = {};
//     examList.forEach(e => {
//       const cat = (e.category || 'other').toLowerCase();
//       countMap[cat] = (countMap[cat] || 0) + 1;
//     });

//     const dynamic = Object.entries(countMap)
//       .sort((a, b) => b[1] - a[1])
//       .map(([id, count]) => ({
//         id,
//         label: id === 'toeic' ? 'TOEIC' : id === 'ielts' ? 'IELTS' : id === 'huflit' ? 'HUFLIT' : id.toUpperCase(),
//         count: currentUser ? count : 1,
//       }));

//     return [{ id: 'all', label: 'TẤT CẢ', count: currentUser ? examList.length : dynamic.length }, ...dynamic];
//   }, [examList, currentUser]);

//   const filteredExams = useMemo(() => {
//     let baseList = [...examList].sort((a, b) => (b.created_at || 0) - (a.created_at || 0));

//     if (activeCategory !== 'all') {
//       baseList = baseList.filter(e => (e.category || 'other').toLowerCase() === activeCategory);
//     }
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       baseList = baseList.filter(e => e.title?.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q));
//     }

//     if (!currentUser) {
//       const trialList = [];
//       const usedCategories = new Set();
//       baseList.forEach(exam => {
//         const cat = (exam.category || 'other').toLowerCase();
//         if (!usedCategories.has(cat)) {
//           trialList.push({ ...exam, isTrial: true });
//           usedCategories.add(cat);
//         }
//       });
//       return trialList;
//     }

//     return baseList;
//   }, [examList, activeCategory, searchQuery, currentUser]);

//   // Tự động chọn đề đầu tiên khi đổi tab
//   useEffect(() => {
//     if (filteredExams.length > 0 && !filteredExams.find(e => e.id === selectedExam)) {
//       setSelectedExam(filteredExams[0].id);
//     }
//   }, [filteredExams, selectedExam]);

//   const selectedExamData = useMemo(() => examList.find(e => e.id === selectedExam), [examList, selectedExam]);

//   // 🚀 Xử lý Mở Modal
//   const handleStartClick = useCallback(() => {
//     if (!selectedExam) return;
//     setShowModeModal(true);
//   }, [selectedExam]);

//   // 🚀 Xử lý Điều hướng sang bài thi
//   const confirmStart = useCallback(async (mode) => {
//     setShowModeModal(false);
//     setIsStarting(true);
//     try { 
//       await onStartExam?.(selectedExam, mode); 
//     } finally { 
//       setIsStarting(false); 
//     }
//   }, [selectedExam, onStartExam]);

//   return (
//     <div className="bg-[#F4F7FA] font-nunito selection:bg-[#1CB0F6] selection:text-white pb-32">
      
//       {/* ── HERO BANNER ── */}
//       <div className="bg-white border-b-2 border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="flex items-center gap-5">
//             <div className="w-16 h-16 bg-[#1CB0F6] rounded-[20px] flex items-center justify-center border-b-[4px] border-[#1899D6] shadow-sm shrink-0">
//                <Target className="text-white" size={32} strokeWidth={3} />
//             </div>
//             <div>
//               <h1 className="text-[28px] md:text-[36px] font-black text-slate-800 leading-none mb-2">
//                 Phòng Thi <span className="text-[#1CB0F6]">Trực Tuyến</span>
//               </h1>
//               <p className="text-[14px] md:text-[15px] font-bold text-slate-500">
//                 {!currentUser ? 'Trải nghiệm miễn phí các đề thi mẫu chuẩn quốc tế.' : 'Sẵn sàng đánh giá năng lực của bạn ngay hôm nay.'}
//               </p>
//             </div>
//           </div>

//           {!currentUser && (
//             <button 
//               onClick={() => navigate('/login')} 
//               className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FFFBEA] text-[#FF9600] border-2 border-[#FFD8A8] border-b-[4px] rounded-2xl font-black uppercase text-[13px] tracking-widest hover:bg-[#FF9600] hover:text-white hover:border-[#E58700] active:border-b-2 active:translate-y-[2px] transition-all outline-none shadow-sm"
//             >
//               <Lock size={18} strokeWidth={3} /> Mở khóa toàn bộ đề
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ── BỐ CỤC CHÍNH: 7 - 5 ── */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* ── CỘT TRÁI (7 CỘT): DANH SÁCH ── */}
//           <div className="lg:col-span-7 flex flex-col gap-6">
            
//             {/* Thanh Tìm kiếm & Tab */}
//             <div className="bg-white p-5 rounded-[28px] border-2 border-slate-200 shadow-sm">
//               <div className="relative mb-5">
//                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} strokeWidth={3} />
//                 <input
//                   type="text" placeholder="Tìm tên đề, mã đề..."
//                   value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
//                   className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-[16px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
//                 />
//               </div>
//               <CategoryTabs categories={categories} activeCategory={activeCategory} onChange={handleCategoryChange} />
//             </div>

//             {/* Khung Danh sách đề */}
//             <div className="bg-white rounded-[28px] border-2 border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
//               <div className="px-6 py-4 bg-slate-50 border-b-2 border-slate-100 flex justify-between items-center">
//                 <span className="text-[13px] font-black text-slate-500 uppercase tracking-widest">Danh sách ({filteredExams.length})</span>
//                 <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
//                   <LayoutGrid size={14} strokeWidth={3} /> Điều hướng bằng mũi tên
//                 </div>
//               </div>
              
//               <div className="flex-1 min-h-[450px] p-3 bg-slate-50/30">
//                 {isLoading ? <SkeletonList /> : filteredExams.length > 0 ? (
//                   <ExamListBox exams={filteredExams} selectedExam={selectedExam} onSelectExam={setSelectedExam} listboxId={listboxId} />
//                 ) : <EmptyState searchQuery={searchQuery} onClear={() => setSearchQuery('')} />}
//               </div>

//               {!currentUser && !isLoading && (
//                 <div className="bg-gradient-to-r from-[#1CB0F6] to-[#1899D6] p-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-white">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 border border-white/30">
//                       <Lock size={28} strokeWidth={2.5} />
//                     </div>
//                     <div>
//                       <h4 className="text-[16px] font-black leading-tight mb-1">Giới hạn tài khoản khách</h4>
//                       <p className="text-[13px] font-medium text-blue-100">Đăng nhập để có thể làm toàn bộ kho đề thi.</p>
//                     </div>
//                   </div>
//                   <button onClick={() => navigate('/login')} className="w-full sm:w-auto px-6 py-3 bg-white text-[#1CB0F6] rounded-xl text-[13px] font-black uppercase tracking-widest shadow-sm hover:scale-105 active:scale-95 transition-transform outline-none whitespace-nowrap">
//                     Đăng nhập
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ── CỘT PHẢI (5 CỘT): CHI TIẾT ── */}
//           <aside className="lg:col-span-5 lg:sticky lg:top-[100px]"> 
//             <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 sm:p-8 shadow-sm flex flex-col gap-8">
              
//               <div className="flex items-center gap-2 text-slate-400 border-b-2 border-slate-100 pb-4">
//                 <Info size={20} strokeWidth={3} className="text-[#1CB0F6]" />
//                 <h3 className="text-[14px] font-black uppercase tracking-widest m-0 text-slate-600">Thông tin chi tiết</h3>
//               </div>
              
//               <AnimatePresence mode="wait">
//                 {selectedExamData ? (
//                   <Motion.div 
//                     key={selectedExamData.id}
//                     initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
//                     className="flex flex-col gap-6"
//                   >
//                     <div>
//                       <span className="inline-block px-3 py-1 bg-[#EAF6FE] text-[#1CB0F6] rounded-xl text-[11px] font-black uppercase tracking-widest mb-4 border border-[#BAE3FB]">
//                         {selectedExamData.category?.toUpperCase() || 'GENERAL'}
//                       </span>
//                       <h2 className="text-[24px] font-black text-slate-800 leading-snug">
//                         {selectedExamData.title}
//                       </h2>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
//                         <Clock size={28} className="text-[#FF9600]" strokeWidth={2.5} />
//                         <div>
//                           <p className="text-[18px] font-black text-slate-800">{selectedExamData.duration || 120} Phút</p>
//                           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Thời gian thi</p>
//                         </div>
//                       </div>
                      
//                       <div className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
//                         <FileText size={28} className="text-[#1CB0F6]" strokeWidth={2.5} />
//                         <div>
//                           <p className="text-[18px] font-black text-slate-800">{selectedExamData.questions || 60} Câu</p>
//                           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tổng số lượng</p>
//                         </div>
//                       </div>
//                     </div>
//                   </Motion.div>
//                 ) : (
//                   <div className="h-[250px] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-3">
//                     <Target size={40} strokeWidth={2} />
//                     <p className="font-bold text-[15px]">Vui lòng chọn một đề thi bên trái</p>
//                   </div>
//                 )}
//               </AnimatePresence>

//               <div>
//                 <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-4">Lưu ý khi làm bài</h4>
//                 <div className="flex flex-wrap gap-3">
//                   {['Yên tĩnh', 'Mạng ổn định', 'Tự lưu kết quả'].map((item, i) => (
//                     <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-xl text-[13px] font-bold text-slate-600">
//                       <ShieldAlert size={14} className="text-[#58CC02]" strokeWidth={3} />
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="pt-2">
//                 <button
//                   onClick={handleStartClick} disabled={isStarting || !selectedExam || isLoading}
//                   className="w-full py-5 bg-[#58CC02] border-[#46A302] border-b-[6px] rounded-2xl font-black text-[18px] uppercase tracking-widest text-white shadow-md hover:brightness-105 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-400 flex items-center justify-center gap-2 outline-none"
//                 >
//                   {isStarting ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={20} /> Đang chuẩn bị...</span> : <>Vào thi ngay <ChevronRight size={24} strokeWidth={4} /></>}
//                 </button>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>

//       {/* ── MODAL CHỌN CHẾ ĐỘ THI (FULL / TỪNG PHẦN) ── */}
//       <AnimatePresence>
//         {showModeModal && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
//             <Motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
//               onClick={() => setShowModeModal(false)}
//             />
            
//             <Motion.div 
//               initial={{ opacity: 0, scale: 0.95, y: 20 }} 
//               animate={{ opacity: 1, scale: 1, y: 0 }} 
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative w-full max-w-md bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 sm:p-8 shadow-2xl z-10"
//             >
//               <button 
//                 onClick={() => setShowModeModal(false)}
//                 className="absolute top-4 right-4 w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-200 active:scale-95 transition-all outline-none"
//               >
//                 <X size={20} strokeWidth={3} />
//               </button>

//               <div className="text-center mb-8">
//                 <div className="w-16 h-16 bg-[#EAF6FE] rounded-2xl flex items-center justify-center border-2 border-[#BAE3FB] border-b-[4px] shadow-sm mx-auto mb-4">
//                   <Target className="text-[#1CB0F6]" size={32} strokeWidth={2.5} />
//                 </div>
//                 <h2 className="text-[22px] font-black text-slate-800 leading-tight mb-2">Chọn chế độ làm bài</h2>
//                 <p className="text-[14px] font-bold text-slate-500">Bạn muốn làm đề này theo hình thức nào?</p>
//               </div>

//               <div className="flex flex-col gap-4">
//                 <button 
//                   onClick={() => confirmStart('full')}
//                   className="group flex items-center gap-4 p-4 bg-white border-2 border-slate-200 border-b-[6px] rounded-2xl hover:border-[#1CB0F6] hover:bg-[#EAF6FE] active:border-b-2 active:translate-y-[4px] transition-all text-left outline-none w-full"
//                 >
//                   <div className="w-12 h-12 rounded-xl bg-[#F0F9FF] flex items-center justify-center border-2 border-[#BAE3FB] group-hover:bg-[#1CB0F6] group-hover:border-[#1899D6] transition-colors shrink-0">
//                     <Timer size={24} className="text-[#1CB0F6] group-hover:text-white" strokeWidth={2.5} />
//                   </div>
//                   <div>
//                     <h4 className="text-[16px] font-black text-slate-800 group-hover:text-[#1CB0F6]">Thi Full (Tính giờ)</h4>
//                     <p className="text-[13px] font-bold text-slate-500">Giả lập thi thật với thời gian {selectedExamData?.duration || 120} phút.</p>
//                   </div>
//                 </button>

//                 <button 
//                   onClick={() => confirmStart('practice')}
//                   className="group flex items-center gap-4 p-4 bg-white border-2 border-slate-200 border-b-[6px] rounded-2xl hover:border-[#58CC02] hover:bg-[#F0FAE8] active:border-b-2 active:translate-y-[4px] transition-all text-left outline-none w-full"
//                 >
//                   <div className="w-12 h-12 rounded-xl bg-[#F0FAE8] flex items-center justify-center border-2 border-[#bcf096] group-hover:bg-[#58CC02] group-hover:border-[#46A302] transition-colors shrink-0">
//                     <Zap size={24} className="text-[#58CC02] group-hover:text-white" strokeWidth={2.5} />
//                   </div>
//                   <div>
//                     <h4 className="text-[16px] font-black text-slate-800 group-hover:text-[#58CC02]">Luyện tập tự do</h4>
//                     <p className="text-[13px] font-bold text-slate-500">Ôn luyện từng kỹ năng, không áp lực thời gian.</p>
//                   </div>
//                 </button>
//               </div>
//             </Motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* FIXED MOBILE START BUTTON */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t-2 border-slate-200 p-4 z-40 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
//         <button
//           onClick={handleStartClick} disabled={isStarting || !selectedExam || isLoading}
//           className="w-full py-4 bg-[#58CC02] border-[#46A302] border-b-[5px] rounded-xl font-black text-[15px] uppercase tracking-widest text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:bg-slate-200 disabled:border-slate-300 transition-all outline-none"
//         >
//           {isStarting ? 'Đang chuẩn bị...' : 'Vào thi ngay'}
//         </button>
//       </div>
//     </div>
//   );
// });

// ExamSetup.displayName = 'ExamSetup';
// export default ExamSetup;