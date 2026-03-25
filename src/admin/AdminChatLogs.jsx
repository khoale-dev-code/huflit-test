// src/components/Admin/AdminChatLogs.jsx
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, RefreshCcw, ShieldCheck, User, Bot, AlertTriangle } from 'lucide-react';
import { supabase } from '../config/supabaseClient'; // Đảm bảo đường dẫn này đúng với file Supabase của bạn
import { motion as Motion } from 'framer-motion';

const AdminChatLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all | flagged | ai | stranger

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // Kéo dữ liệu từ bảng chat_logs, sắp xếp mới nhất lên đầu
      let query = supabase.from('chat_logs').select('*').order('created_at', { ascending: false }).limit(100);

      if (filter === 'flagged') query = query.eq('is_flagged', true);
      if (filter === 'ai') query = query.eq('chat_type', 'ai');
      if (filter === 'stranger') query = query.eq('chat_type', 'stranger');

      const { data, error } = await query;
      if (error) throw error;
      
      setLogs(data || []);
    } catch (error) {
      console.error('Lỗi khi tải logs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  // Lọc theo từ khóa tìm kiếm
  const filteredLogs = logs.filter(log => 
    log.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.sender_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 font-nunito min-h-screen bg-slate-50">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-[#FF4B4B]" />
            Hệ Thống Kiểm Duyệt Chat
          </h1>
          <p className="text-slate-500 font-bold mt-1">Giám sát tin nhắn từ AI Lab và Người Lạ Ẩn Danh</p>
        </div>
        <button onClick={fetchLogs} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 border-b-[4px] rounded-xl font-bold text-slate-600 hover:text-[#1CB0F6] active:translate-y-1 active:border-b-2 transition-all">
          <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /> Cập nhật
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border-2 border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b-2 border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm theo nội dung, ID người dùng..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 font-bold text-slate-700 focus:outline-none focus:border-[#1CB0F6] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'flagged', 'ai', 'stranger'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl font-black text-sm transition-all ${filter === f ? 'bg-[#1CB0F6] text-white shadow-md' : 'bg-white border-2 border-slate-200 text-slate-500 hover:bg-slate-100'}`}
              >
                {f === 'all' ? 'Tất cả' : f === 'flagged' ? 'Vi phạm 🚩' : f === 'ai' ? 'Chat AI' : 'Chat P2P'}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-500 font-black text-sm uppercase tracking-wider">
                <th className="p-4 w-[150px]">Thời gian</th>
                <th className="p-4 w-[200px]">Người gửi</th>
                <th className="p-4 w-[120px]">Phân loại</th>
                <th className="p-4">Nội dung tin nhắn</th>
                <th className="p-4 w-[120px] text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100 font-bold text-slate-700">
              {filteredLogs.length > 0 ? filteredLogs.map((log) => (
                <Motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString('vi-VN')}
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="truncate w-[150px] block">{log.sender_id}</span>
                    </span>
                  </td>
                  <td className="p-4">
                    {log.chat_type === 'ai' ? (
                      <span className="flex items-center gap-1.5 text-xs text-[#1CB0F6] bg-[#EAF6FE] px-2 py-1 rounded-lg w-max">
                        <Bot className="w-3.5 h-3.5" /> AI ({log.persona_id})
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-[#A855F7] bg-[#F3E8FF] px-2 py-1 rounded-lg w-max">
                        <User className="w-3.5 h-3.5" /> Người lạ
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-sm break-words max-w-md">
                    {log.content}
                  </td>
                  <td className="p-4 text-center">
                    {log.is_flagged ? (
                      <span className="inline-flex items-center gap-1 bg-[#FFF0F0] text-[#FF4B4B] border-2 border-[#ffc1c1] px-2 py-1 rounded-lg text-xs font-black uppercase shadow-sm">
                        <AlertTriangle className="w-3 h-3" /> Vi phạm
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-[#F0FAE8] text-[#58CC02] border-2 border-[#bcf096] px-2 py-1 rounded-lg text-xs font-black uppercase shadow-sm">
                        <ShieldCheck className="w-3 h-3" /> An toàn
                      </span>
                    )}
                  </td>
                </Motion.tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-400">
                    {loading ? 'Đang tải dữ liệu...' : 'Không có dữ liệu log nào.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminChatLogs;