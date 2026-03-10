// src/admin/pages/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BookOpen, CheckCircle2, Loader2,
  ArrowUpRight, ArrowDownRight,
  Calendar, Zap, Bell, ChevronRight
} from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { supabase } from '../../config/supabaseClient';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';

// ─── StatCard ────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, trend, color, sublabel }) => {
  const themes = {
    blue:   { bg: 'bg-blue-50',    icon: 'bg-blue-600 text-white',    trendUp: 'bg-blue-100 text-blue-700'    },
    purple: { bg: 'bg-violet-50',  icon: 'bg-violet-600 text-white',  trendUp: 'bg-violet-100 text-violet-700' },
    green:  { bg: 'bg-emerald-50', icon: 'bg-emerald-600 text-white', trendUp: 'bg-emerald-100 text-emerald-700' },
  };
  const t   = themes[color];
  const isUp = trend >= 0;
  return (
    <div className={`${t.bg} rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${t.icon} shadow-sm flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold
          ${isUp ? t.trendUp : 'bg-red-100 text-red-600'}`}>
          {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {Math.abs(trend)}%
        </span>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</p>
        <h3 className="text-2xl font-black text-slate-900 tabular-nums leading-tight">{value.toLocaleString()}</h3>
        {sublabel && <p className="text-[11px] text-slate-400 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
};

// ─── WeeklyBarChart ───────────────────────────────────────────────
const WeeklyBarChart = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="flex items-end gap-2 h-40 w-full">
      {data.map((day, i) => {
        const heightPercent = Math.max((day.count / maxVal) * 100, 4);
        const isToday = i === 6;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group relative">
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
              {day.count} lượt thi
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
            </div>
            <div className="w-full flex items-end" style={{ height: '128px' }}>
              <div
                className={`w-full rounded-t-lg transition-all duration-500 ease-out
                  ${isToday ? 'bg-blue-600' : 'bg-slate-200 group-hover:bg-blue-400'}`}
                style={{ height: `${heightPercent}%` }}
              />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wide flex-shrink-0
              ${isToday ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              {day.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── DonutChart — SVG thuần, không cần thư viện ──────────────────
const DonutChart = ({ segments, size = 164, thickness = 28 }) => {
  const [hovered,  setHovered]  = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  const total        = segments.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;

  const cx           = size / 2;
  const cy           = size / 2;
  const r            = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  const GAP           = 3; // px gap giữa các segment

  let cumulative = 0;
  const arcs = segments.map((seg) => {
    const fraction = seg.value / total;
    const offset   = circumference * (1 - cumulative);
    const dash     = Math.max(circumference * fraction - GAP, 0);
    cumulative    += fraction;
    return { ...seg, offset, dash, fraction };
  });

  const hoveredSeg = hovered !== null ? arcs[hovered] : null;

  return (
    <div className="relative flex items-center justify-center flex-shrink-0"
         style={{ width: size, height: size }}>
      <svg
        width={size} height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        style={{ overflow: 'visible' }}
      >
        {/* Track ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />

        {/* Colored segments */}
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth={hovered === i ? thickness + 5 : thickness}
            strokeDasharray={`${animated ? arc.dash : 0} ${circumference}`}
            strokeDashoffset={arc.offset}
            strokeLinecap="butt"
            style={{
              transition: animated
                ? `stroke-dasharray 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s, stroke-width 0.2s ease`
                : 'none',
              cursor: 'pointer',
              filter: hovered === i ? `drop-shadow(0 0 8px ${arc.color}55)` : 'none',
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>

      {/* Center text — rotated back to normal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        {hoveredSeg ? (
          <>
            <span className="text-xl font-black text-slate-900 tabular-nums leading-none">
              {hoveredSeg.value.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-wide" style={{ color: hoveredSeg.color }}>
              {hoveredSeg.label}
            </span>
          </>
        ) : (
          <>
            <span className="text-xl font-black text-slate-900 tabular-nums leading-none">
              {total.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">
              Tổng
            </span>
          </>
        )}
      </div>
    </div>
  );
};

// ─── RoleDistributionCard ─────────────────────────────────────────
const RoleDistributionCard = ({ recentUsers, totalUsers }) => {
  // Ước tính phân bổ từ sample
  const adminInSample   = recentUsers.filter(u => u.role === 'admin').length;
  const sampleSize      = Math.max(recentUsers.length, 1);
  const estAdmin        = Math.round((adminInSample / sampleSize) * totalUsers);
  const estStudent      = Math.max(totalUsers - estAdmin, 0);

  const segments = [
    { label: 'Học sinh', value: estStudent, color: '#3b82f6', dotClass: 'bg-blue-500'   },
    { label: 'Admin',    value: estAdmin,   color: '#8b5cf6', dotClass: 'bg-violet-500' },
  ];
  const total = segments.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col gap-5">
      <div>
        <h2 className="text-base font-black text-slate-900">Phân bổ người dùng</h2>
        <p className="text-xs text-slate-400 font-medium mt-0.5">Tỷ lệ vai trò trong hệ thống</p>
      </div>

      <div className="flex items-center gap-6 flex-1">
        <DonutChart segments={segments} size={164} thickness={28} />

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${seg.dotClass}`} />
                <span className="text-xs font-semibold text-slate-600 truncate">{seg.label}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-black text-slate-800 tabular-nums">
                  {seg.value.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-slate-400 tabular-nums w-8 text-right">
                  {total > 0 ? ((seg.value / total) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>
          ))}

          <div className="border-t border-slate-100 pt-3 mt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Tổng cộng</span>
              <span className="text-sm font-black text-slate-900 tabular-nums">
                {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── QuickInfoCard ────────────────────────────────────────────────
const QuickInfoCard = ({ weeklyData, navigate }) => {
  const sorted    = [...weeklyData].sort((a, b) => b.count - a.count);
  const bestDay   = sorted[0]?.label ?? '—';
  const total     = weeklyData.reduce((a, b) => a + b.count, 0);
  const avgPerDay = total ? (total / 7).toFixed(1) : '0';

  return (
    <div className="bg-blue-600 rounded-2xl p-6 text-white flex flex-col gap-5 relative overflow-hidden h-full">
      <Zap className="absolute -right-6 -bottom-6 w-40 h-40 text-white/10 rotate-12 pointer-events-none select-none" />
      <div className="relative z-10">
        <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1.5">Thông tin nhanh</p>
        <h3 className="text-lg font-black leading-snug text-white">
          Ngày cao điểm:{' '}
          <span className="underline underline-offset-4 decoration-yellow-400">{bestDay}</span>
        </h3>
        <p className="text-blue-200 text-sm mt-2 leading-relaxed">
          Tổng <strong className="text-white">{total}</strong> lượt thi tuần này.
          Đăng bài mới vào ngày cao điểm để tăng tương tác.
        </p>
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-3">
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3.5">
          <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-wide mb-1">Active Rate</p>
          <p className="text-xl font-black tabular-nums">84.2%</p>
        </div>
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3.5">
          <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-wide mb-1">TB / ngày</p>
          <p className="text-xl font-black tabular-nums">{avgPerDay}</p>
        </div>
      </div>
      <button
        onClick={() => navigate('/admin/notifications')}
        className="relative z-10 w-full py-3 bg-white text-blue-600 rounded-xl font-black text-sm tracking-wide
          hover:bg-blue-50 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
      >
        <Bell className="w-4 h-4" />
        Gửi thông báo
      </button>
    </div>
  );
};

// ─── MAIN DASHBOARD ──────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, loading, signOut } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers:  0,
    totalExams:  0,
    recentUsers: [],
    weeklyData:  [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!admin) return;
      setDataLoading(true);
      try {
        const { data: users } = await supabase
          .from('profiles')
          .select('id, created_at, full_name, email, role');
        const { count: exams } = await supabase
          .from('exams')
          .select('*', { count: 'exact', head: true });

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const { data: results } = await supabase
          .from('exam_results')
          .select('created_at')
          .gte('created_at', sevenDaysAgo.toISOString());

        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const count = results?.filter(
            r => new Date(r.created_at).toDateString() === d.toDateString()
          ).length || 0;
          last7Days.push({ label: days[d.getDay()], count });
        }

        setStats({
          totalUsers:  users?.length || 0,
          totalExams:  exams || 0,
          recentUsers: users
            ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5) || [],
          weeklyData: last7Days,
        });
      } catch (err) {
        console.error('Lỗi:', err.message);
      } finally {
        setDataLoading(false);
      }
    };
    fetchDashboardData();
  }, [admin]);

  if (loading || dataLoading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-3">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Đang tải dữ liệu...</p>
    </div>
  );

  const totalInteractions = stats.weeklyData.reduce((a, b) => a + b.count, 0);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        admin={admin}
        onSignOut={signOut}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminNavbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onQuickAction={() => navigate('/admin/exams/create')}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight italic leading-tight">
                  HubStudy <span className="text-blue-600">Pulse</span>
                </h1>
                <p className="text-slate-500 text-sm mt-0.5 font-medium">
                  Theo dõi nhịp độ học tập thời gian thực.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 self-start sm:self-auto shadow-sm flex-shrink-0">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide whitespace-nowrap">
                  7 ngày qua
                </span>
              </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={Users}        label="Cộng đồng"     value={stats.totalUsers}  trend={+12} color="blue"   sublabel="Người dùng đã đăng ký" />
              <StatCard icon={BookOpen}     label="Kho đề thi"    value={stats.totalExams}  trend={+4}  color="purple" sublabel="Đề thi đang hoạt động"  />
              <StatCard icon={CheckCircle2} label="Lượt tương tác" value={totalInteractions} trend={+22} color="green"  sublabel="Trong 7 ngày gần nhất"  />
            </div>

            {/* ── Bar Chart + Quick Info ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-5 gap-4">
                  <div className="min-w-0">
                    <h2 className="text-base font-black text-slate-900">Lượt thi theo ngày</h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Số bài nộp 7 ngày gần nhất</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block flex-shrink-0" />Hôm nay
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 inline-block flex-shrink-0" />Khác
                    </span>
                  </div>
                </div>
                <WeeklyBarChart data={stats.weeklyData} />
              </div>

              <div className="lg:col-span-5">
                <QuickInfoCard weeklyData={stats.weeklyData} navigate={navigate} />
              </div>
            </div>

            {/* ── Donut Chart + Recent Users Table ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

              {/* Donut */}
              <div className="lg:col-span-4">
                <RoleDistributionCard
                  recentUsers={stats.recentUsers}
                  totalUsers={stats.totalUsers}
                />
              </div>

              {/* Recent Users */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-base font-black text-slate-900">Thành viên mới nhất</h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">5 người dùng đăng ký gần đây</p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/users')}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group flex-shrink-0"
                  >
                    Xem tất cả
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left" style={{ minWidth: '480px' }}>
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thành viên</th>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vai trò</th>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ngày tham gia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {stats.recentUsers.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-10 text-center text-sm text-slate-400 font-medium">
                            Chưa có thành viên nào.
                          </td>
                        </tr>
                      ) : (
                        stats.recentUsers.map(user => (
                          <tr
                            key={user.id}
                            className="hover:bg-slate-50 transition-colors cursor-pointer"
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center font-black text-blue-600 text-sm flex-shrink-0 uppercase">
                                  {user.full_name?.charAt(0) || '?'}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-slate-800 truncate" style={{ maxWidth: '160px' }}>
                                    {user.full_name || 'Chưa đặt tên'}
                                  </p>
                                  <p className="text-xs text-slate-400 truncate" style={{ maxWidth: '160px' }}>
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide
                                ${user.role === 'admin' ? 'bg-violet-100 text-violet-700' : 'bg-slate-100 text-slate-600'}`}>
                                {user.role || 'user'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-xs font-semibold text-slate-500 tabular-nums">
                                {new Date(user.created_at).toLocaleDateString('vi-VN', {
                                  day: '2-digit', month: '2-digit', year: 'numeric',
                                })}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;