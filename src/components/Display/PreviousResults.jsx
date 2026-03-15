import React, { useMemo, memo } from 'react';
import { 
  TrendingUp, Trophy, Activity, Filter, CheckCircle, 
  XCircle, Play, ChevronRight, Target, AlertCircle
} from 'lucide-react';

// --- Helper Functions ---
const formatRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Vừa xong';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Hôm qua';
  if (diffInDays < 7) return `${diffInDays} ngày trước`;
  return date.toLocaleDateString('vi-VN');
};

export default function PreviousResults({ 
  attempts = [], 
  loading, 
  selectedExam, 
  selectedPart,
  targetScore = 80 // Thêm prop mục tiêu, mặc định 80%
}) {
  // 1. Lọc attempts
  const filteredAttempts = useMemo(() => {
    return attempts
      .filter(a => a.examId === selectedExam && a.partId === selectedPart)
      .sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0));
  }, [attempts, selectedExam, selectedPart]);

  // 2. Tính toán chỉ số an toàn
  const stats = useMemo(() => {
    if (filteredAttempts.length === 0) return null;

    const latest = filteredAttempts[0];
    const previous = filteredAttempts[1]; 
    const isFirstAttempt = !previous; // Xử lý an toàn khi chỉ có 1 lần làm

    const best = [...filteredAttempts].sort((a, b) => b.score - a.score)[0];
    
    const scoreImprovement = isFirstAttempt ? 0 : latest.score - previous.score;
    const isImproving = isFirstAttempt ? true : scoreImprovement >= 0;
    
    const avgScore = filteredAttempts.reduce((sum, a) => sum + a.score, 0) / filteredAttempts.length;

    // Phân tích điểm yếu cơ bản (Có thể mở rộng dựa trên data thực tế)
    const needsImprovement = avgScore < targetScore;

    return { 
      latest, 
      previous, 
      best, 
      scoreImprovement, 
      isImproving, 
      avgScore,
      isFirstAttempt,
      needsImprovement
    };
  }, [filteredAttempts, targetScore]);

  // --- Render Trạng thái ---

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 shadow-sm">
        <Activity className="w-8 h-8 text-indigo-500 animate-bounce" />
        <p className="text-slate-500 font-medium text-sm animate-pulse">Đang phân tích dữ liệu học tập...</p>
      </div>
    );
  }

  if (filteredAttempts.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-10 text-center flex flex-col items-center justify-center transition-all hover:bg-slate-100/50">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
          <Filter className="w-6 h-6 text-slate-400" />
        </div>
        <h3 className="text-slate-900 font-bold text-base mb-1">Chưa có dữ liệu</h3>
        <p className="text-slate-500 text-sm mb-5 max-w-[250px]">
          Hãy bắt đầu luyện tập Part {selectedPart?.replace(/\D/g, '')} để chúng tôi có thể phân tích năng lực của bạn.
        </p>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm active:scale-95">
          <Play className="w-4 h-4 fill-current" />
          Luyện tập ngay
        </button>
      </div>
    );
  }

  const { latest, best, scoreImprovement, isImproving, avgScore, isFirstAttempt, needsImprovement } = stats;

  return (
    <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
      {/* Header Info */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-md uppercase tracking-wide">
            {selectedExam}
          </span>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md uppercase tracking-wide">
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
          color="text-amber-500"
          bgIcon="bg-amber-50"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Gần nhất" 
          value={`${latest.score.toFixed(0)}%`} 
          sub={isFirstAttempt ? "First try" : "Last attempt"}
          color="text-indigo-500"
          bgIcon="bg-indigo-50"
        />
        <StatCard 
          icon={Activity} 
          label="Số lần" 
          value={filteredAttempts.length} 
          sub="Total tries"
          color="text-emerald-500"
          bgIcon="bg-emerald-50"
        />
      </div>

      {/* Area Chart & Trend Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Tiến trình điểm số
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Dựa trên {filteredAttempts.length} lần làm bài gần nhất</p>
          </div>
          <div className={`flex flex-col items-end`}>
            {isFirstAttempt ? (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600">
                Lần đầu tiên
              </span>
            ) : (
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${isImproving ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {isImproving ? '↑' : '↓'} {Math.abs(scoreImprovement).toFixed(1)}%
              </span>
            )}
          </div>
        </div>
        
        {/* SVG Area Chart */}
        <div className="h-20 w-full mt-2 relative">
          <MiniChart data={filteredAttempts} isImproving={isImproving} targetScore={targetScore} />
        </div>
        
        {/* Phân tích nhanh */}
        {filteredAttempts.length > 1 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2">
            <AlertCircle className={`w-4 h-4 mt-0.5 ${needsImprovement ? 'text-amber-500' : 'text-emerald-500'}`} />
            <p className="text-xs text-slate-600 leading-relaxed">
              {needsImprovement 
                ? `Điểm trung bình của bạn đang dưới mục tiêu ${targetScore}%. Hãy kiểm tra lại các câu hay sai ở phần lịch sử chi tiết.`
                : `Tuyệt vời! Bạn đang duy trì phong độ vượt mục tiêu ${targetScore}%. Hãy tiếp tục phát huy nhé.`}
            </p>
          </div>
        )}
      </div>

      {/* Attempts History */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/80 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Lịch sử chi tiết</h3>
          <span className="text-[10px] font-medium text-slate-400">Cuộn để xem thêm</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[260px] overflow-y-auto custom-scrollbar">
          {filteredAttempts.map((attempt, index) => (
            <AttemptRow 
              key={attempt.id || index} 
              attempt={attempt} 
              isBest={attempt.id === best.id}
              attemptNumber={filteredAttempts.length - index}
            />
          ))}
        </div>
      </div>

      {/* Overall Analytics M3 Style */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
        <div className="flex justify-between items-end relative z-10">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Hiệu suất trung bình</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black">{avgScore.toFixed(1)}%</p>
              <span className="text-xs text-slate-400 font-medium">/ mục tiêu {targetScore}%</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 mb-1">Trạng thái</p>
            <div className={`flex items-center gap-1.5 justify-end`}>
              {avgScore >= targetScore ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">Sẵn sàng thi</span>
                </>
              ) : (
                <>
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-400">Cần luyện thêm</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components (Đã tối ưu bằng React.memo) ---

const StatCard = memo(({ icon: Icon, label, value, sub, color, bgIcon }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
    <div className={`p-2 rounded-xl ${bgIcon} mb-2.5`}>
      <Icon className={`w-4 h-4 ${color}`} />
    </div>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">{label}</span>
    <p className="text-lg font-black text-slate-900">{value}</p>
    <p className="text-[9px] font-medium text-slate-500 mt-0.5">{sub}</p>
  </div>
));
StatCard.displayName = 'StatCard';

const AttemptRow = memo(({ attempt, isBest, attemptNumber }) => (
  <div className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors group ${isBest ? 'bg-amber-50/10' : ''}`}>
    <div className="flex-1 min-w-0 flex items-center gap-3">
      {/* Cột icon trạng thái */}
      <div className="flex-shrink-0 mt-0.5 sm:mt-0">
        {attempt.score >= 70 ? 
          <CheckCircle className="w-5 h-5 text-emerald-500" /> : 
          <XCircle className="w-5 h-5 text-rose-400" />
        }
      </div>
      
      {/* Thông tin chính */}
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-bold text-slate-900">Lần {attemptNumber}</span>
          {isBest && <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-md">BEST</span>}
        </div>
        <p className="text-[11px] font-medium text-slate-500">
          {formatRelativeTime(attempt.completedAt)}
        </p>
      </div>
    </div>

    {/* Cột Điểm và Hành động */}
    <div className="flex items-center justify-between sm:justify-end gap-4 ml-8 sm:ml-0">
      <div className="text-left sm:text-right">
        <p className="text-base font-black text-slate-800">{attempt.score.toFixed(0)}%</p>
        <p className="text-[10px] font-medium text-slate-400">{Object.keys(attempt.answers || {}).length} câu</p>
      </div>
      
      {/* Nút Action M3 Style */}
      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
));
AttemptRow.displayName = 'AttemptRow';

// Mini Area Chart SVG chuẩn hóa
const MiniChart = memo(({ data, isImproving, targetScore }) => {
  const points = useMemo(() => [...data].reverse().map(a => a.score), [data]);
  
  if (points.length < 2) {
    return (
      <div className="h-full w-full bg-slate-50 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium italic border border-slate-100 border-dashed">
        Cần ít nhất 2 kết quả để vẽ xu hướng
      </div>
    );
  }

  const max = 100;
  const width = 300;
  const height = 80; // Tăng nhẹ chiều cao để rộng rãi hơn
  const step = width / (points.length - 1);
  
  // Vẽ đường biểu đồ
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step},${height - (p / max) * height}`).join(' ');
  // Vẽ vùng gradient
  const areaData = `${pathData} L ${width},${height} L 0,${height} Z`;
  
  // Đường gạch đứt mục tiêu
  const targetY = height - (targetScore / max) * height;

  const color = isImproving ? '#10b981' : '#f43f5e';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Đường Target Line */}
      <line 
        x1="0" y1={targetY} x2={width} y2={targetY} 
        stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" 
      />
      
      {/* Vùng Gradient */}
      <path d={areaData} fill="url(#chartGradient)" />
      
      {/* Đường Xu Hướng */}
      <path 
        d={pathData} 
        fill="none" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Điểm nối (Points) */}
      {points.map((p, i) => (
        <circle 
          key={i}
          cx={i * step} 
          cy={height - (p / max) * height} 
          r={i === points.length - 1 ? "4" : "0"} // Chỉ hiện rõ điểm cuối
          fill={color} 
          className={i === points.length - 1 ? "animate-pulse" : ""}
        />
      ))}
    </svg>
  );
});
MiniChart.displayName = 'MiniChart';