  import React, { useState, useEffect, useMemo, useRef } from 'react';
  // Lưu ý: Đảm bảo các hàm này đã được export đúng trong file data của bạn
  import { 
    loadExamData, getAllExamMetadata, getExamQuestions 
  } from '../../data/examData';
  import { 
    BookOpen, Search, ChevronDown, ArrowLeft,
    CheckCircle2, Sparkles, Filter, LayoutGrid, Target, Zap, Info
  } from 'lucide-react';

  // Hệ màu thương hiệu tối ưu cho EdTech
  const COLORS = {
    primary: '#00358E', // Blue Navy
    accent: '#FF7D00',  // Orange Energy
    cyan: '#06b6d4',
    blue: '#3b82f6',
    emerald: '#10b981'
  };

  /**
   * COMPONENT: Dropdown tùy chỉnh
   */
  const SelectDropdown = ({ value, options, onChange, label, icon: Icon, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selected = options.find(opt => opt.value === value);

    return (
      <div ref={dropdownRef} className="relative flex-1 min-w-[200px]">
        <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.15em] ml-1">
          {Icon && <Icon className="w-3.5 h-3.5" style={{ color: COLORS.primary }} />}
          {label}
        </label>
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full group flex items-center justify-between px-4 py-3.5 bg-white border-2 border-slate-100 rounded-2xl text-[13px] font-bold transition-all shadow-sm ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-200 hover:shadow-md'
          }`}
        >
          <span className="text-slate-700 truncate">{selected?.label || 'Chọn...'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color: COLORS.primary }} />
        </button>

        {isOpen && (
          <div className="absolute z-[100] w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="max-h-60 overflow-y-auto overflow-x-hidden">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setIsOpen(false); }}
                  className={`w-full px-4 py-3 text-left text-[13px] font-semibold transition-colors ${
                    opt.value === value ? 'text-white' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  style={opt.value === value ? { backgroundColor: COLORS.primary } : {}}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  /**
   * COMPONENT: Thẻ câu hỏi với phần Giải thích nâng cao
   */
  const QuestionCard = ({ question }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="group bg-white border border-slate-200 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-[#00358E]/5 overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Badge Số câu */}
            <div 
              className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-[1.25rem] text-white font-black text-lg shadow-xl transform group-hover:-rotate-6 transition-transform duration-500"
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.blue})` }}
            >
              {question.id}
            </div>

            <div className="flex-1">
              <h3 className="text-[16px] sm:text-[18px] font-extrabold text-slate-800 leading-snug mb-8">
                {question.question}
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {question.options?.map((option, idx) => {
                  const isCorrect = idx === question.correct;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-4 p-5 rounded-[1.5rem] border-2 transition-all duration-300 ${
                        isCorrect 
                        ? 'border-emerald-500 bg-emerald-50/30 shadow-sm' 
                        : 'border-slate-50 bg-slate-50/50 hover:border-blue-100 hover:bg-white'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all ${
                        isCorrect ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200' : 'bg-white text-slate-400 border border-slate-200'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className={`text-[14px] font-bold ${isCorrect ? 'text-emerald-900' : 'text-slate-600'}`}>
                        {option}
                      </span>
                      {isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500 ml-auto animate-bounce" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* --- PHẦN GIẢI THÍCH NÂNG CAO --- */}
        {question.explanation && (
          <div className="bg-slate-50/30 border-t border-slate-100">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between px-10 py-5 transition-all hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-100 shadow-inner">
                  <Sparkles className="w-4 h-4 text-[#FF7D00]" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-black tracking-widest text-[#FF7D00] uppercase">Analysis</p>
                  <p className="text-[13px] font-bold text-slate-700">Tại sao đáp án này đúng?</p>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-slate-200 transition-all ${isExpanded ? 'bg-[#FF7D00] border-[#FF7D00] text-white rotate-180' : 'bg-white text-slate-400'}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            
            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-10 pb-10 pt-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Luồng giải thích chính */}
                  <div className="lg:col-span-8 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Info className="w-20 h-20 text-[#00358E]" />
                    </div>
                    <p className="text-[14px] text-slate-600 leading-[1.8] font-medium italic relative z-10">
                      "{question.explanation}"
                    </p>
                  </div>

                  {/* Sidebar: Tips & Metadata */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="p-6 bg-gradient-to-br from-[#00358E] to-blue-700 rounded-[2rem] text-white shadow-lg shadow-blue-900/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 text-[#FF7D00] fill-[#FF7D00]" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Smart Tips</span>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex gap-3 text-[12px] font-medium leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                          Luôn chú ý đến từ khóa quan trọng trong câu hỏi.
                        </li>
                        <li className="flex gap-3 text-[12px] font-medium leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                          Sử dụng phương pháp loại trừ cho các đáp án tương tự.
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-tighter">Độ khó câu hỏi</span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i} 
                            className="w-5 h-1.5 rounded-full transition-all duration-1000" 
                            style={{ backgroundColor: i <= 2 ? COLORS.accent : '#f1f5f9' }} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ExamAnswersPage = () => {
    const [selectedExam, setSelectedExam] = useState('exam1');
    const [selectedPart, setSelectedPart] = useState('');
    const [currentExam, setCurrentExam] = useState(null);
    const [parts, setParts] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const examList = getAllExamMetadata ? getAllExamMetadata() : [];

    useEffect(() => {
      const loadData = async () => {
        if (!selectedExam) return;
        setIsLoading(true);
        try {
          const examData = await loadExamData(selectedExam);
          if (examData) {
            setCurrentExam(examData);
            setParts(examData.parts ? Object.keys(examData.parts) : []);
            if (selectedPart) {
              const qs = await getExamQuestions(selectedExam, selectedPart);
              setQuestions(qs || []);
            } else {
              setQuestions([]);
            }
          }
        } catch (err) {
          console.error("Error loading data:", err);
        } finally { 
          setIsLoading(false); 
        }
      };
      loadData();
    }, [selectedExam, selectedPart]);

    const filteredQuestions = useMemo(() => 
      questions.filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase())), 
    [questions, searchQuery]);

    return (
     <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation - normal flow (không sticky) */}
      <nav className="relative z-10 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-center">
          
          <div className="flex items-center gap-4">
            <div 
              className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3" 
              style={{ backgroundColor: COLORS.primary }}
            >
              <BookOpen className="w-6 h-6 text-white" />
            </div>

            <div>
              <p className="font-black text-slate-900 leading-none text-lg uppercase tracking-tight">
                Exam<span style={{ color: COLORS.accent }}>Keys</span>
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                Premium Answer Hub
              </p>
            </div>
          </div>

        </div>
      </nav>
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* --- Hero --- */}
          <header className="mb-12 text-center sm:text-left relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Thư viện <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">Đáp án chi tiết</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-xl leading-relaxed">
              Hệ thống hỗ trợ tra cứu giải thuật và phân tích chuyên sâu cho các kỳ thi trọng điểm.
            </p>
          </header>

         {/* Control Panel - normal flow (không sticky, không fixed) */}
            <section className="relative z-10 bg-white/95 backdrop-blur-lg p-6 rounded-[2.5rem] border border-white shadow-2xl shadow-blue-900/5 mb-12">
              <div className="flex flex-col md:flex-row gap-6 items-end">
                <SelectDropdown 
                  label="Kỳ thi"
                  icon={LayoutGrid}
                  value={selectedExam}
                  options={examList.map(e => ({ value: e.id, label: e.title }))}
                  onChange={(val) => { 
                    setSelectedExam(val); 
                    setSelectedPart(''); 
                  }}
                />

                <SelectDropdown 
                  label="Phần thi"
                  icon={Filter}
                  value={selectedPart}
                  options={parts.map(p => ({ 
                    value: p, 
                    label: currentExam?.parts[p]?.title || p 
                  }))}
                  onChange={setSelectedPart}
                />

                <div className="relative flex-[1.5] w-full group">
                  <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest ml-1">
                    Tìm nội dung
                  </label>
                  <Search className="absolute left-5 bottom-[1.1rem] w-4 h-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text"
                    placeholder="Nhập câu hỏi..."
                    className="w-full pl-12 pr-5 py-3.5 bg-slate-50/50 border-2 border-slate-100 rounded-2xl text-[13px] font-bold focus:bg-white focus:border-blue-400 outline-none transition-all shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </section>


          {/* --- List --- */}
          <div className="space-y-8 pb-32">
            {isLoading ? (
              <div className="flex flex-col items-center py-20">
                <div className="w-14 h-14 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin shadow-inner"></div>
                <p className="mt-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Đang đồng bộ...</p>
              </div>
            ) : selectedPart && filteredQuestions.length > 0 ? (
              <div className="grid grid-cols-1 gap-10">
                {filteredQuestions.map(q => <QuestionCard key={q.id} question={q} />)}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-slate-50">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Target className="w-10 h-10 text-blue-200" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight">Sẵn sàng để bắt đầu?</h3>
                <p className="text-slate-400 text-sm font-medium">Chọn kỳ thi và phần thi phía trên để tải dữ liệu đáp án.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

  export default ExamAnswersPage;