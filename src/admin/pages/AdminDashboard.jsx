// src/admin/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, BookOpen, CheckCircle2,
  ArrowUpRight, ArrowDownRight,
  Zap, Bell, Activity, PlusCircle, 
  Trash2, Edit3, ShieldAlert, LayoutDashboard
} from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { supabase } from '../../config/supabaseClient';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import MaintenanceBanner from '../components/MaintenanceBanner';
// 🚀 FIX 1: Đảm bảo Alias Motion đã sẵn sàng
import { motion as Motion } from 'framer-motion';

// ─── StatCard 3D ────────────────────────────────────────────────────
const StatCard = (props) => {
  const { icon: Icon, label, value, trend, color, sublabel, delay = 0 } = props;
  
  const themes = {
    blue:   { bg: 'bg-white', icon: 'bg-[#EAF6FE] text-[#1CB0F6] border-[#BAE3FB]', trendUp: 'bg-[#EAF6FE] text-[#1CB0F6]' },
    purple: { bg: 'bg-white', icon: 'bg-[#faefff] text-[#CE82FF] border-[#eec9ff]', trendUp: 'bg-[#faefff] text-[#CE82FF]' },
    green:  { bg: 'bg-white', icon: 'bg-[#f1faeb] text-[#58CC02] border-[#bcf096]', trendUp: 'bg-[#f1faeb] text-[#58CC02]' },
  };
  const t = themes[color] || themes.blue;
  const isUp = trend >= 0;

  return (
    // 🚀 FIX 2: Đổi Motion.div thành Motion.div
    <Motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay }} 
      className={`${t.bg} rounded-[24px] border-2 border-slate-200 border-b-[4px] p-5 flex flex-col gap-4 shadow-sm hover:-translate-y-1 transition-transform`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center border-2 border-b-[4px] flex-shrink-0 shadow-sm ${t.icon}`}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-[10px] text-[12px] font-display font-black tracking-wider
          ${isUp ? t.trendUp : 'bg-[#fff0f0] text-[#FF4B4B]'}`}>
          {isUp ? <ArrowUpRight size={14} strokeWidth={3} /> : <ArrowDownRight size={14} strokeWidth={3} />}
          {Math.abs(trend)}%
        </span>
      </div>
      <div>
        <p className="text-[11px] font-display font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <h3 className="text-[28px] font-display font-black text-slate-800 leading-none">{value.toLocaleString()}</h3>
        {sublabel && <p className="text-[12px] font-body font-bold text-slate-400 mt-1.5">{sublabel}</p>}
      </div>
    </Motion.div>
  );
};

// ─── WeeklyBarChart ───────────────────────────────────────────────
const WeeklyBarChart = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="flex items-end gap-2 h-36 w-full mt-2">
      {data.map((day, i) => {
        const heightPercent = Math.max((day.count / maxVal) * 100, 8);
        const isToday = i === 6;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] font-display font-bold px-3 py-1.5 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-md">
              {day.count} lượt
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-800" />
            </div>
            <div className="w-full flex items-end h-[100px] bg-slate-50 rounded-[8px] overflow-hidden">
              <div
                className={`w-full rounded-[8px] transition-all duration-700 ease-out border-b-[4px] border-black/10
                  ${isToday ? 'bg-[#1CB0F6]' : 'bg-slate-200 group-hover:bg-[#7DCCF8]'}`}
                style={{ height: `${heightPercent}%` }}
              />
            </div>
            <span className={`text-[11px] font-display font-black uppercase tracking-widest flex-shrink-0
              ${isToday ? 'text-[#1CB0F6]' : 'text-slate-400 group-hover:text-slate-600'}`}>
              {day.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── DonutChart ───────────────────────────────────────────────────
const DonutChart = ({ segments, size = 140, thickness = 24 }) => {
  const [hovered, setHovered] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
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
    cumulative     += fraction;
    return { ...seg, offset, dash, fraction };
  });

  const hoveredSeg = hovered !== null ? arcs[hovered] : null;

  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" style={{ overflow: 'visible' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />
        {arcs.map((arc, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={arc.color}
            strokeWidth={hovered === i ? thickness + 4 : thickness}
            strokeDasharray={`${animated ? arc.dash : 0} ${circumference}`}
            strokeDashoffset={arc.offset} strokeLinecap="round"
            style={{
              transition: animated ? `stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s, stroke-width 0.2s ease` : 'none',
              cursor: 'pointer',
              filter: hovered === i ? `drop-shadow(0 4px 6px ${arc.color}66)` : 'none',
            }}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none pt-1">
        <span className="text-[24px] font-display font-black text-slate-800 leading-none">
          {(hoveredSeg ? hoveredSeg.value : total).toLocaleString()}
        </span>
        <span className="text-[10px] font-display font-black mt-1 uppercase tracking-widest text-slate-400">
          {hoveredSeg ? hoveredSeg.label : 'Tổng'}
        </span>
      </div>
    </div>
  );
};

// ─── RoleDistributionCard ──────────────────────
const RoleDistributionCard = ({ totalStudents, totalAdmins }) => {
  const segments = [
    { label: 'Học viên', value: totalStudents, color: '#1CB0F6', dotClass: 'bg-[#1CB0F6]' },
    { label: 'Admin',    value: totalAdmins,   color: '#CE82FF', dotClass: 'bg-[#CE82FF]' },
  ];

  return (
    <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm p-6 h-full flex flex-col gap-5">
      <div>
        <h2 className="text-[16px] font-display font-black text-slate-800">Phân bổ hệ thống</h2>
        <p className="text-[13px] font-body font-bold text-slate-400 mt-0.5">Tỷ lệ vai trò người dùng</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
        <DonutChart segments={segments} size={140} thickness={24} />
        <div className="flex flex-col gap-3 flex-1 min-w-0 w-full">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-[16px] border-2 border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-3 h-3 rounded-[4px] flex-shrink-0 ${seg.dotClass}`} />
                <span className="text-[13px] font-display font-bold text-slate-600 truncate uppercase tracking-wide">{seg.label}</span>
              </div>
              <span className="text-[15px] font-display font-black text-slate-800">{seg.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── QuickInfoCard ────────────────────────────────────
const QuickInfoCard = ({ weeklyData, activeRate, navigate }) => {
  const sorted    = [...weeklyData].sort((a, b) => b.count - a.count);
  const bestDay   = sorted[0]?.label ?? '—';
  const total     = weeklyData.reduce((a, b) => a + b.count, 0);
  const avgPerDay = total ? (total / 7).toFixed(1) : '0';

  return (
    <div className="bg-[#1CB0F6] border-b-[6px] border-[#1899D6] rounded-[24px] p-6 text-white flex flex-col gap-5 relative overflow-hidden h-full shadow-sm">
      <Zap className="absolute -right-4 -bottom-4 w-36 h-36 text-white/20 rotate-12 pointer-events-none" strokeWidth={2} />
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-[8px] mb-3">
          <Activity size={14} strokeWidth={3} />
          <p className="text-white text-[10px] font-display font-black uppercase tracking-widest">Tóm tắt tuần</p>
        </div>
        <h3 className="text-[20px] font-display font-black leading-tight text-white mb-1">
          Ngày cao điểm: <span className="text-[#FFC800] underline decoration-[#FFC800] underline-offset-4">{bestDay}</span>
        </h3>
        <p className="text-blue-100 text-[14px] font-body font-medium">
          Tổng <strong className="text-white font-black">{total}</strong> lượt nộp bài.
        </p>
      </div>
      
      <div className="relative z-10 grid grid-cols-2 gap-3 mt-auto">
        <div className="bg-white/20 backdrop-blur-sm rounded-[16px] p-3 border-2 border-white/20">
          <p className="text-blue-100 text-[10px] font-display font-black uppercase tracking-widest mb-0.5">Active Rate</p>
          <p className="text-[24px] font-display font-black text-white">{activeRate}%</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-[16px] p-3 border-2 border-white/20">
          <p className="text-blue-100 text-[10px] font-display font-black uppercase tracking-widest mb-0.5">TB / ngày</p>
          <p className="text-[24px] font-display font-black text-white">{avgPerDay}</p>
        </div>
      </div>
      
      <button
        onClick={() => navigate('/admin/notifications')}
        className="relative z-10 w-full py-3.5 bg-white text-[#1CB0F6] border-b-[4px] border-blue-100 rounded-[16px] font-display font-black text-[14px] uppercase tracking-wider hover:bg-slate-50 active:border-b-0 active:translate-y-[4px] transition-all flex items-center justify-center gap-2 shadow-sm outline-none"
      >
        <Bell size={18} strokeWidth={3} /> Gửi thông báo
      </button>
    </div>
  );
};

// ─── AdminActivityLog ────────────────────────────
const AdminActivityLog = ({ logs }) => {
  const getActionConfig = (action) => {
    switch (action) {
      case 'CREATE_EXAM': return { icon: PlusCircle, color: 'text-[#58CC02]', bg: 'bg-[#f1faeb]', border: 'border-[#bcf096]', label: 'Tạo đề thi' };
      case 'UPDATE_EXAM': return { icon: Edit3, color: 'text-[#1CB0F6]', bg: 'bg-[#EAF6FE]', border: 'border-[#BAE3FB]', label: 'Sửa đề thi' };
      case 'DELETE_EXAM': return { icon: Trash2, color: 'text-[#FF4B4B]', bg: 'bg-[#fff0f0]', border: 'border-[#ffc1c1]', label: 'Xóa đề thi' };
      case 'DELETE_USER': return { icon: ShieldAlert, color: 'text-[#FF9600]', bg: 'bg-[#FFF4E5]', border: 'border-[#FFD8A8]', label: 'Xóa user' };
      default:            return { icon: Activity, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', label: 'Cập nhật' };
    }
  };

  return (
    <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b-2 border-slate-100 flex items-center gap-3 bg-slate-50">
        <div className="w-10 h-10 rounded-[12px] bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
          <Activity size={20} strokeWidth={2.5} className="text-slate-600" />
        </div>
        <div className="pt-0.5">
          <h2 className="text-[16px] font-display font-black text-slate-800 leading-tight">Nhật ký hoạt động</h2>
          <p className="text-[12px] font-body font-bold text-slate-400">Thao tác quản trị gần đây</p>
        </div>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar flex-1 p-2">
        <div className="space-y-2">
          {logs.length === 0 ? (
            <div className="py-10 text-center text-[14px] font-body font-bold text-slate-400">
              Chưa có hoạt động nào.
            </div>
          ) : (
            logs.map((log) => {
              const config = getActionConfig(log.action_type);
              const Icon = config.icon;
              return (
                <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-[16px] hover:bg-slate-50 border-2 border-transparent hover:border-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 border-2 border-b-[3px] shadow-sm ${config.bg} ${config.color} ${config.border}`}>
                      <Icon size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-[14px] font-display font-bold text-slate-800">{config.label}</p>
                      <p className="text-[11px] font-body font-bold text-slate-400 mt-0.5">Bởi: {log.admin_name || 'Admin'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end pl-12 sm:pl-0">
                    <span className="text-[13px] font-body font-bold text-slate-600 truncate max-w-[200px]">{log.target_name || '—'}</span>
                    <span className="text-[11px] font-display font-bold text-slate-400 mt-0.5">
                      {new Date(log.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} • {new Date(log.created_at).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
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
    totalUsers:    0,
    totalAdmins:   0,
    totalStudents: 0,
    totalExams:    0,
    recentUsers:   [],
    weeklyData:    [],
    activeRate:    0,
    adminLogs:     [],
  });

 useEffect(() => {
    const fetchDashboardData = async () => {
      if (!admin) return;
      setDataLoading(true);
      try {
        const { data: users } = await supabase.from('profiles').select('id, created_at, full_name, email, role');
        const { count: exams } = await supabase.from('exams').select('*', { count: 'exact', head: true });

        const adminsCount = users?.filter(u => u.role === 'admin').length || 0;
        const studentsCount = (users?.length || 0) - adminsCount;

        // 🚀 TỐI ƯU TÍNH TOÁN NGÀY GIỜ
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        // 🚀 BẮT LỖI KHI GỌI BẢNG exam_results
        const { data: results, error: resultsError } = await supabase
          .from('exam_results')
          .select('created_at, user_id')
          .gte('created_at', startDate.toISOString());

        // Nếu có lỗi do RLS, in ra màn hình
        if (resultsError) {
          console.error("❌ Lỗi lấy lượt thi (exam_results):", resultsError.message);
        } else {
          console.log("✅ Dữ liệu lượt thi thô lấy được:", results?.length, results);
        }

        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const last7Days = [];
        
        for (let i = 6; i >= 0; i--) {
          const day = new Date();
          day.setDate(day.getDate() - i);
          
          // Dùng toLocaleDateString để so sánh ngày chính xác theo giờ địa phương (Tránh lỗi timezone)
          const targetDateStr = day.toLocaleDateString('en-CA'); // Trả về dạng YYYY-MM-DD

          const count = results?.filter(r => {
            const resultDateStr = new Date(r.created_at).toLocaleDateString('en-CA');
            return resultDateStr === targetDateStr;
          }).length || 0;

          last7Days.push({ label: days[day.getDay()], count });
        }

        let activeRateVal = 0;
        if (users && users.length > 0 && results && results.length > 0) {
          const uniqueActiveUsers = new Set(results.filter(r => r.user_id).map(r => r.user_id)).size;
          activeRateVal = ((uniqueActiveUsers / users.length) * 100).toFixed(1);
        }

        const { data: adminLogsData } = await supabase.from('admin_logs').select('*').order('created_at', { ascending: false }).limit(5);

        setStats({
          totalUsers:    users?.length || 0,
          totalAdmins:   adminsCount,
          totalStudents: studentsCount,
          totalExams:    exams || 0,
          recentUsers:   users?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 4) || [],
          weeklyData:    last7Days,
          activeRate:    activeRateVal,
          adminLogs:     adminLogsData || [],
        });

      } catch (err) {
        console.error('❌ Lỗi Dashboard:', err.message);
      } finally {
        setDataLoading(false);
      }
    };
    fetchDashboardData();
  }, [admin]);

  if (loading || dataLoading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F4F7FA] gap-3">
      <div className="w-12 h-12 border-[4px] border-blue-100 border-t-[#1CB0F6] rounded-full animate-spin" />
      <p className="font-display font-bold text-slate-500 text-[15px]">Đang tải Pulse...</p>
    </div>
  );

  const totalInteractions = stats.weeklyData.reduce((a, b) => a + b.count, 0);

  return (
    <div className="flex h-screen bg-[#F4F7FA] overflow-hidden" style={{ fontFamily: '"Nunito", "Quicksand", sans-serif' }}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} admin={admin} onSignOut={signOut} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onQuickAction={() => navigate('/admin/exams/create')} />
        <MaintenanceBanner />

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-[#1CB0F6] text-white flex items-center justify-center border-b-[4px] border-[#1899D6] shadow-sm">
                <LayoutDashboard size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-[28px] font-display font-black text-slate-800 tracking-tight leading-none">
                  HubStudy <span className="text-[#1CB0F6]">Pulse</span>
                </h1>
                <p className="text-slate-500 text-[13px] font-body font-bold mt-1">Quản trị hệ thống thời gian thực.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={Users} label="Cộng đồng" value={stats.totalUsers} trend={+12} color="blue" delay={0.1} />
              <StatCard icon={BookOpen} label="Kho đề thi" value={stats.totalExams} trend={+4} color="purple" delay={0.2} />
              <StatCard icon={CheckCircle2} label="Lượt thi" value={totalInteractions} trend={+22} color="green" delay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-7 bg-white rounded-[24px] border-2 border-slate-200 border-b-[4px] p-5 shadow-sm">
                <h2 className="text-[16px] font-display font-black text-slate-800">Lượt thi 7 ngày qua</h2>
                <WeeklyBarChart data={stats.weeklyData} />
              </div>
              <div className="lg:col-span-5">
                <QuickInfoCard weeklyData={stats.weeklyData} activeRate={stats.activeRate} navigate={navigate} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start pb-8">
              <div className="lg:col-span-4 h-full">
                <RoleDistributionCard totalStudents={stats.totalStudents} totalAdmins={stats.totalAdmins} />
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="bg-white rounded-[24px] border-2 border-slate-200 border-b-[4px] shadow-sm flex flex-col h-full">
                  <div className="px-5 py-4 border-b-2 border-slate-100 bg-slate-50">
                    <h2 className="text-[16px] font-display font-black text-slate-800">Thành viên mới</h2>
                  </div>
                  <div className="p-2 space-y-2 overflow-y-auto">
                    {stats.recentUsers.map(u => (
                      <div key={u.id} className="flex items-center gap-3 p-3 rounded-[16px] hover:bg-slate-50 border-2 border-transparent hover:border-slate-100 transition-colors">
                        <div className="w-10 h-10 rounded-[12px] bg-[#EAF6FE] border-2 border-[#BAE3FB] border-b-[3px] flex items-center justify-center font-display font-black text-[#1CB0F6] shrink-0">
                          {u.full_name?.charAt(0) || '?'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-display font-bold text-slate-800 truncate">{u.full_name || 'Anonymous'}</p>
                          <p className="text-[11px] font-body font-bold text-slate-400 truncate">{u.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-full">
                  <AdminActivityLog logs={stats.adminLogs} />
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