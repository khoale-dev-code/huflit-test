// src/admin/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BookOpen, CheckCircle2, Loader2,
  ArrowUpRight, ArrowDownRight,
  Calendar, Zap, Bell, ChevronRight,
  Activity, PlusCircle, Trash2, Edit3, ShieldAlert
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

// ─── DonutChart ───────────────────────────────────────────────────
const DonutChart = ({ segments, size = 164, thickness = 28 }) => {
  const [hovered,  setHovered]  = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  const total = segments.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;

  const cx = size / 2, cy = size / 2;
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  const GAP = 3;

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
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" style={{ overflow: 'visible' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />
        {arcs.map((arc, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={arc.color}
            strokeWidth={hovered === i ? thickness + 5 : thickness}
            strokeDasharray={`${animated ? arc.dash : 0} ${circumference}`}
            strokeDashoffset={arc.offset} strokeLinecap="butt"
            style={{
              transition: animated ? `stroke-dasharray 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s, stroke-width 0.2s ease` : 'none',
              cursor: 'pointer',
              filter: hovered === i ? `drop-shadow(0 0 8px ${arc.color}55)` : 'none',
            }}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        {hoveredSeg ? (
          <>
            <span className="text-xl font-black text-slate-900 tabular-nums leading-none">{hoveredSeg.value.toLocaleString()}</span>
            <span className="text-[10px] font-bold mt-1 uppercase tracking-wide" style={{ color: hoveredSeg.color }}>{hoveredSeg.label}</span>
          </>
        ) : (
          <>
            <span className="text-xl font-black text-slate-900 tabular-nums leading-none">{total.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">Tổng</span>
          </>
        )}
      </div>
    </div>
  );
};

// ─── RoleDistributionCard ─────────────────────────────────────────
const RoleDistributionCard = ({ recentUsers, totalUsers }) => {
  const adminInSample = recentUsers.filter(u => u.role === 'admin').length;
  const sampleSize    = Math.max(recentUsers.length, 1);
  const estAdmin      = Math.round((adminInSample / sampleSize) * totalUsers);
  const estStudent    = Math.max(totalUsers - estAdmin, 0);

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
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${seg.dotClass}`} />
                <span className="text-xs font-semibold text-slate-600 truncate">{seg.label}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-black text-slate-800 tabular-nums">{seg.value.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── QuickInfoCard (Đã cập nhật Active Rate) ──────────────────────
const QuickInfoCard = ({ weeklyData, activeRate, navigate }) => {
  const sorted    = [...weeklyData].sort((a, b) => b.count - a.count);
  const bestDay   = sorted[0]?.label ?? '—';
  const total     = weeklyData.reduce((a, b) => a + b.count, 0);
  const avgPerDay = total ? (total / 7).toFixed(1) : '0';

  return (
    <div className="bg-blue-600 rounded-2xl p-6 text-white flex flex-col gap-5 relative overflow-hidden h-full shadow-sm">
      <Zap className="absolute -right-6 -bottom-6 w-40 h-40 text-white/10 rotate-12 pointer-events-none select-none" />
      <div className="relative z-10">
        <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mb-1.5">Thông tin nhanh</p>
        <h3 className="text-lg font-black leading-snug text-white">
          Ngày cao điểm:{' '}
          <span className="underline underline-offset-4 decoration-yellow-400">{bestDay}</span>
        </h3>
        <p className="text-blue-200 text-sm mt-2 leading-relaxed">
          Tổng <strong className="text-white">{total}</strong> lượt thi tuần này.
        </p>
      </div>
      <div className="relative z-10 grid grid-cols-2 gap-3">
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3.5">
          <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-wide mb-1">Active Rate</p>
          <p className="text-xl font-black tabular-nums">{activeRate}%</p>
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

// ─── AdminActivityLog (Bảng mới) ─────────────────────────────────
const AdminActivityLog = ({ logs }) => {
  // Hàm map icon và màu sắc theo loại hành động
  const getActionConfig = (action) => {
    switch (action) {
      case 'CREATE_EXAM': return { icon: PlusCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Tạo đề thi' };
      case 'UPDATE_EXAM': return { icon: Edit3, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Sửa đề thi' };
      case 'DELETE_EXAM': return { icon: Trash2, color: 'text-red-600', bg: 'bg-red-100', label: 'Xóa đề thi' };
      case 'DELETE_USER': return { icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-100', label: 'Xóa user' };
      default:            return { icon: Activity, color: 'text-slate-600', bg: 'bg-slate-100', label: 'Cập nhật' };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
          <Activity className="w-4 h-4 text-slate-600" />
        </div>
        <div>
          <h2 className="text-base font-black text-slate-900">Nhật ký hoạt động</h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Các thao tác quản trị gần đây</p>
        </div>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hành động</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Đối tượng</th>
              <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-sm text-slate-400 font-medium">
                  Chưa có hoạt động nào gần đây.
                </td>
              </tr>
            ) : (
              logs.map((log) => {
                const config = getActionConfig(log.action_type);
                const Icon = config.icon;
                return (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg} ${config.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{config.label}</p>
                          <p className="text-[11px] font-medium text-slate-400">{log.admin_name || 'Admin'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-sm font-medium text-slate-600">{log.target_name || '—'}</span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="text-xs font-semibold text-slate-500 tabular-nums">
                        {new Date(log.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                        <span className="text-slate-300 mx-1">|</span>
                        {new Date(log.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
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
    activeRate:  0,
    adminLogs:   [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!admin) return;
      setDataLoading(true);
      try {
        // 1. Users & Exams
        const { data: users } = await supabase.from('profiles').select('id, created_at, full_name, email, role');
        const { count: exams } = await supabase.from('exams').select('*', { count: 'exact', head: true });

        // 2. Exam Results (7 days) - Lấy thêm user_id để tính Active Rate
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        const { data: results } = await supabase
          .from('exam_results')
          .select('created_at, user_id')
          .gte('created_at', startDate.toISOString());

        // Process Weekly Data
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const targetDateStr = d.toLocaleDateString('en-CA');
          
          const count = results?.filter(r => 
            new Date(r.created_at).toLocaleDateString('en-CA') === targetDateStr
          ).length || 0;
          
          last7Days.push({ label: days[d.getDay()], count });
        }

        // 3. Tính Active Rate = (Số user duy nhất thi trong 7 ngày / Tổng user) * 100
        let activeRateVal = 0;
        if (users && users.length > 0 && results) {
          const uniqueActiveUsers = new Set(results.filter(r => r.user_id).map(r => r.user_id)).size;
          activeRateVal = ((uniqueActiveUsers / users.length) * 100).toFixed(1);
        }

        // 4. Lấy dữ liệu Admin Logs
        const { data: adminLogsData } = await supabase
          .from('admin_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          totalUsers:  users?.length || 0,
          totalExams:  exams || 0,
          recentUsers: users?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5) || [],
          weeklyData:  last7Days,
          activeRate:  activeRateVal,
          adminLogs:   adminLogsData || [],
        });

      } catch (err) {
        console.error('Lỗi tải Dashboard:', err.message);
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
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => navigate('/admin/exams/create')} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight italic leading-tight">
                  HubStudy <span className="text-blue-600">Pulse</span>
                </h1>
                <p className="text-slate-500 text-sm mt-0.5 font-medium">Theo dõi nhịp độ hệ thống thời gian thực.</p>
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
                </div>
                <WeeklyBarChart data={stats.weeklyData} />
              </div>
              <div className="lg:col-span-5">
                <QuickInfoCard weeklyData={stats.weeklyData} activeRate={stats.activeRate} navigate={navigate} />
              </div>
            </div>

            {/* ── Donut Chart + Recent Users ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              <div className="lg:col-span-4">
                <RoleDistributionCard recentUsers={stats.recentUsers} totalUsers={stats.totalUsers} />
              </div>
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-base font-black text-slate-900">Thành viên mới nhất</h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">5 người dùng đăng ký gần đây</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thành viên</th>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vai trò</th>
                        <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ngày tham gia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {stats.recentUsers.map(user => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center font-black text-blue-600 text-sm flex-shrink-0 uppercase">
                                {user.full_name?.charAt(0) || '?'}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-slate-800 truncate">{user.full_name || 'Chưa đặt tên'}</p>
                                <p className="text-xs text-slate-400 truncate">{user.email}</p>
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
                              {new Date(user.created_at).toLocaleDateString('vi-VN')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ── BẢNG NHẬT KÝ ADMIN (MỚI THÊM) ── */}
            <div className="grid grid-cols-1">
              <AdminActivityLog logs={stats.adminLogs} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;