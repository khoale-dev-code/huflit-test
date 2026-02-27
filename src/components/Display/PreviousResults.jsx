import React, { useMemo } from 'react';
import { TrendingUp, Trophy, Clock, CheckCircle, XCircle, Activity, Filter } from 'lucide-react';

export default function PreviousResults({ attempts = [], loading, selectedExam, selectedPart }) {
  // 1. Tối ưu Filter: Chỉ lấy attempts của Exam và Part hiện tại
  const filteredAttempts = useMemo(() => {
    return attempts
      .filter(a => a.examId === selectedExam && a.partId === selectedPart)
      .sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0));
  }, [attempts, selectedExam, selectedPart]);

  // 2. Tính toán các chỉ số dựa trên danh sách đã lọc
  const stats = useMemo(() => {
    if (filteredAttempts.length === 0) return null;

    const latest = filteredAttempts[0];
    const previous = filteredAttempts[1] || latest;
    const best = [...filteredAttempts].sort((a, b) => b.score - a.score)[0];
    
    // Sửa logic xu hướng: So sánh lần cuối với lần ngay trước đó
    const scoreImprovement = latest.score - previous.score;
    const isImproving = scoreImprovement >= 0;
    
    const avgScore = filteredAttempts.reduce((sum, a) => sum + a.score, 0) / filteredAttempts.length;

    return { latest, previous, best, scoreImprovement, isImproving, avgScore };
  }, [filteredAttempts]);

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center space-y-3">
        <Activity className="w-6 h-6 text-indigo-500 animate-bounce" />
        <p className="text-slate-500 font-medium text-sm">Đang phân tích kết quả...</p>
      </div>
    );
  }

  if (filteredAttempts.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-8 text-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Filter className="w-5 h-5 text-slate-400" />
        </div>
        <p className="text-slate-900 font-bold text-sm">Chưa có dữ liệu cho phần này</p>
        <p className="text-slate-500 text-xs mt-1">Kết quả luyện tập Part {selectedPart?.replace(/\D/g, '')} sẽ xuất hiện tại đây</p>
      </div>
    );
  }

  const { latest, best, scoreImprovement, isImproving, avgScore } = stats;

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">
            {selectedExam}
          </span>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
            Part {selectedPart?.replace(/\D/g, '')}
          </span>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard 
          icon={Trophy} 
          label="Cao nhất" 
          value={`${best.score.toFixed(0)}%`} 
          sub="Best score" 
          color="text-amber-600"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Gần nhất" 
          value={`${latest.score.toFixed(0)}%`} 
          sub="Last attempt"
          color="text-indigo-600"
        />
        <StatCard 
          icon={Activity} 
          label="Số lần" 
          value={filteredAttempts.length} 
          sub="Total tries"
        />
      </div>

      {/* Mini Chart & Trend Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold text-slate-900">Tiến trình điểm số</p>
            <p className="text-[10px] text-slate-500">Dựa trên {filteredAttempts.length} lần làm bài gần nhất</p>
          </div>
          <div className={`text-xs font-bold px-2 py-1 rounded-lg ${isImproving ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {isImproving ? '↑' : '↓'} {Math.abs(scoreImprovement).toFixed(1)}%
          </div>
        </div>
        
        {/* Mini SVG Chart */}
        <div className="h-16 w-full mt-2">
          <MiniChart data={filteredAttempts} isImproving={isImproving} />
        </div>
      </div>

      {/* Attempts History */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Lịch sử chi tiết</h3>
          <span className="text-[10px] text-slate-400">Cuộn để xem thêm</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto custom-scrollbar">
          {filteredAttempts.map((attempt, index) => (
            <AttemptRow 
              key={attempt.id} 
              attempt={attempt} 
              isBest={attempt.id === best.id}
              attemptNumber={filteredAttempts.length - index}
            />
          ))}
        </div>
      </div>

      {/* Overall Analytics */}
      <div className="bg-slate-900 rounded-xl p-4 text-white">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Hiệu suất trung bình</p>
            <p className="text-2xl font-black">{avgScore.toFixed(1)}%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 mb-1">Trạng thái</p>
            <p className={`text-xs font-bold ${avgScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {avgScore >= 70 ? 'Sẵn sàng thi' : 'Cần luyện tập thêm'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components để tối ưu Performance ---

const StatCard = ({ icon: Icon, label, value, sub, color = "text-slate-700" }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center text-center">
    <Icon className={`w-4 h-4 ${color} mb-2`} />
    <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">{label}</span>
    <p className="text-xl font-black text-slate-900">{value}</p>
    <p className="text-[9px] text-slate-500 mt-1">{sub}</p>
  </div>
);

const AttemptRow = ({ attempt, isBest, attemptNumber }) => (
  <div className={`px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isBest ? 'bg-amber-50/20' : ''}`}>
    <div className="min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-xs font-bold text-slate-900">Lần {attemptNumber}</span>
        {isBest && <span className="text-[9px] font-black text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">BEST</span>}
      </div>
      <p className="text-[10px] text-slate-400">
        {attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString('vi-VN') : 'N/A'}
      </p>
    </div>
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-black text-slate-800">{attempt.score.toFixed(0)}%</p>
        <p className="text-[9px] text-slate-500">{Object.keys(attempt.answers || {}).length} câu</p>
      </div>
      {attempt.score >= 70 ? 
        <CheckCircle className="w-4 h-4 text-emerald-500" /> : 
        <XCircle className="w-4 h-4 text-rose-400" />
      }
    </div>
  </div>
);

// Mini Chart sử dụng SVG
const MiniChart = ({ data, isImproving }) => {
  const points = [...data].reverse().map(a => a.score);
  if (points.length < 2) return <div className="h-full w-full bg-slate-50 rounded flex items-center justify-center text-[10px] text-slate-400 font-medium">Cần thêm dữ liệu để vẽ biểu đồ</div>;

  const max = 100;
  const width = 300;
  const height = 60;
  const step = width / (points.length - 1);
  
  const pathData = points.map((p, i) => `${i * step},${height - (p / max) * height}`).join(' L ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
      <path
        d={`M ${pathData}`}
        fill="none"
        stroke={isImproving ? '#10b981' : '#f59e0b'}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-sm"
      />
      {/* Điểm cuối cùng */}
      <circle 
        cx={width} 
        cy={height - (points[points.length-1] / max) * height} 
        r="4" 
        fill={isImproving ? '#10b981' : '#f59e0b'} 
      />
    </svg>
  );
};