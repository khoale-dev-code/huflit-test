// src/admin/pages/Exams/DetailsExam.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Edit3, ArrowLeft, Loader2, AlertTriangle,
  Clock, HelpCircle, Headphones, BookOpen, 
  Users, CheckCircle, Target, Check,
} from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { getExamById } from '../../services/examService';
import ExamSidebar from './components/ExamSidebar';
import { PART_ORDER } from './components/examConstants';

// ─── Stat Card ─────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, accent = 'blue' }) => {
  const colors = {
    blue:   'bg-blue-50  text-blue-600',
    green:  'bg-green-50 text-green-600',
    amber:  'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
      <div className="flex items-center gap-2 text-gray-500">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${colors[accent]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
};

// ─── MAIN ──────────────────────────────────────────────────────────
const DetailsExam = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { admin, signOut } = useAdminAuth();

  const [exam,    setExam]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getExamById(id);
        setExam(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSignOut = async () => {
    const r = await signOut();
    if (r.success) navigate('/admin/login');
  };

  // ── Loading ────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Đang tải bộ đề...</p>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-gray-700 font-semibold">{error ?? 'Không tìm thấy bộ đề'}</p>
          <button onClick={() => navigate('/admin/exams')} className="mt-4 text-sm text-blue-600 font-bold">
            ← Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const parts = exam.parts ?? {};
  const totalQ = exam.questions
    ?? Object.values(parts).reduce((n, p) => n + (p.questions?.length ?? 0), 0);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <ExamSidebar admin={admin} onSignOut={handleSignOut} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-0.5">
              <button onClick={() => navigate('/admin/exams')} className="hover:text-blue-600">Bộ đề</button>
              <span>›</span>
              <span className="text-gray-900 font-semibold truncate max-w-[300px]">{exam.title}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Chi tiết bộ đề</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/exams')}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại
            </button>
            <button
              onClick={() => navigate(`/admin/exams/edit/${id}`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm"
            >
              <Edit3 className="w-4 h-4" /> Chỉnh sửa
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">

          {/* Hero */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{exam.title}</h1>
            {exam.description && (
              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{exam.description}</p>
            )}
          </div>

          {/* Meta stats */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Clock}      label="Thời lượng" value={`90 phút`} accent="amber" />
            <StatCard icon={HelpCircle} label="Tổng câu"   value={`${totalQ} câu`}          accent="green"  />
          </div>

          {/* Parts structure */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Cấu trúc đề thi</h3>
              <button
                onClick={() => navigate(`/admin/exams/edit/${id}`)}
                className="text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                + Chỉnh sửa nội dung
              </button>
            </div>

            <div className="space-y-3">
              {PART_ORDER.map(pid => {
                const part = parts[pid];
                if (!part) return null;
                const isListening = part.type === 'listening';
                const qCount      = part.questions?.length ?? 0;

                return (
                  <div key={pid} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isListening ? 'bg-blue-50' : 'bg-amber-50'}`}>
                          {isListening
                            ? <Headphones className="w-5 h-5 text-blue-600" />
                            : <BookOpen   className="w-5 h-5 text-amber-600" />}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-gray-900">{part.title}</h4>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {qCount} câu hỏi
                            {part.description && ` · ${part.description}`}
                          </p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isListening ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {isListening ? 'LISTENING' : 'READING'}
                      </span>
                    </div>

                    {/* Audio info */}
                    {isListening && part.audioUrl && (
                      <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-xs font-semibold text-gray-700">🎧 {part.audioName}</span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">ĐÃ TẢI LÊN</span>
                        </div>
                        <a
                          href={part.audioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-blue-600 hover:text-blue-700"
                        >
                          Nghe thử
                        </a>
                      </div>
                    )}

                    {/* Reading passage preview */}
                    {!isListening && part.text && (
                      <div className="bg-gray-50 rounded-xl p-3 mb-3">
                        <p className="text-xs text-gray-600 line-clamp-2 italic">"{part.text.slice(0, 200)}..."</p>
                        <p className="text-[10px] text-gray-400 mt-1.5 font-medium">{part.text.length} ký tự</p>
                      </div>
                    )}

                    {/* Questions preview */}
                    {qCount > 0 && (
                      <div className="space-y-2">
                        {(part.questions ?? []).slice(0, 3).map((q, i) => (
                          <div key={q.id} className="flex items-start gap-3 text-sm">
                            <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <p className="text-gray-700 leading-relaxed truncate flex-1">{q.question}</p>
                            <span className="text-[10px] font-bold text-green-600 flex items-center gap-0.5 flex-shrink-0">
                              <Check className="w-3 h-3" />
                              {String.fromCharCode(65 + (q.correct ?? 0))}
                            </span>
                          </div>
                        ))}
                        {qCount > 3 && (
                          <p className="text-xs text-gray-400 pl-9">+ {qCount - 3} câu hỏi khác</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Usage stats */}
          <div className="grid grid-cols-3 gap-6 pb-8">
            {[
              { icon: Users,       label: 'Đã tham gia', value: exam.stats?.participants ?? 0 },
              { icon: CheckCircle, label: 'Hoàn thành',  value: exam.stats?.completed    ?? 0 },
              { icon: Target,      label: 'Điểm TB',     value: exam.stats?.avgScore     ?? 0 },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                  <s.icon className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailsExam;