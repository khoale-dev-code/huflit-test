// src/services/maintenanceService.js
import { doc, getDoc, setDoc, onSnapshot, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';
import { supabase } from '../config/supabaseClient';

const SETTINGS_COLLECTION = 'settings';
const SITE_CONFIG_DOC = 'siteConfig';

const DEFAULT_CONFIG = {
  isMaintenance: false,
  message: 'Hệ thống đang được bảo trì. Chúng tôi sẽ quay lại sớm!',
  estimatedEndTime: null,
  startTime: null,
  contactEmail: 'support@hubstudy.edu.vn',
  contactPhone: '',
  backgroundUrl: '',
};

/**
 * Hàm Helper: Ghi log admin an toàn
 * (Tách riêng để Clean Code và không làm crash app nếu Supabase lỗi)
 */
const logToSupabase = async (adminId, adminEmail, actionType, targetName) => {
  try {
    const { error } = await supabase.from('admin_logs').insert([{
      admin_id: adminId,
      admin_name: adminEmail || 'System Admin',
      action_type: actionType,
      target_name: targetName,
    }]);
    if (error) console.error('Supabase Log Error:', error.message);
  } catch (err) {
    console.error('Failed to log admin action:', err);
  }
};

export const maintenanceService = {
  // Lấy config 1 lần (Dùng cho SSR hoặc init load)
  getConfig: async () => {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { ...DEFAULT_CONFIG, ...docSnap.data() } : DEFAULT_CONFIG;
    } catch (error) {
      console.error('Error getting maintenance config:', error);
      return DEFAULT_CONFIG;
    }
  },

  // Lắng nghe realtime config (Dùng cho App để văng ra trang bảo trì ngay lập tức)
  subscribeToConfig: (callback) => {
    const docRef = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
    return onSnapshot(docRef, 
      (snapshot) => {
        callback(snapshot.exists() ? { ...DEFAULT_CONFIG, ...snapshot.data() } : DEFAULT_CONFIG);
      }, 
      (error) => {
        console.error('Error subscribing to maintenance config:', error);
        callback(DEFAULT_CONFIG);
      }
    );
  },

  // Bật / Tắt bảo trì
  toggleMaintenance: async (isActive, adminId, adminEmail) => {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
      const now = new Date().toISOString();

      const updateData = {
        isMaintenance: isActive,
        startTime: isActive ? now : null,
        updatedAt: now,
      };

      await setDoc(docRef, updateData, { merge: true });

      // Ghi log (Chạy bất đồng bộ, không dùng await block để tăng tốc UI)
      logToSupabase(
        adminId, 
        adminEmail, 
        isActive ? 'MAINTENANCE_ON' : 'MAINTENANCE_OFF', 
        isActive ? 'Bật chế độ bảo trì' : 'Tắt chế độ bảo trì'
      );

      return true;
    } catch (error) {
      console.error('Error toggling maintenance:', error);
      throw error;
    }
  },

  // Cập nhật nội dung bảo trì (Lời nhắn, thời gian...)
  updateSettings: async (settings, adminId, adminEmail) => {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
      const now = new Date().toISOString();

      // Lọc bỏ các giá trị undefined để tránh lỗi Firebase
      const cleanSettings = Object.fromEntries(
        Object.entries(settings).filter(([, v]) => v !== undefined)
      );

      await setDoc(docRef, { ...cleanSettings, updatedAt: now }, { merge: true });

      logToSupabase(adminId, adminEmail, 'UPDATE_MAINTENANCE_SETTINGS', 'Cập nhật cài đặt bảo trì');

      return true;
    } catch (error) {
      console.error('Error updating maintenance settings:', error);
      throw error;
    }
  },

  // Học viên đăng ký nhận email (Tối ưu chống Race Condition)
  subscribeToNotifications: async (email) => {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
      
      // Kiểm tra sơ bộ xem có trùng không (để trả về UI message đẹp)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().notificationSubscribers?.includes(email)) {
        return { success: false, message: 'Email này đã được đăng ký trước đó!' };
      }

      // Dùng arrayUnion để đảm bảo an toàn dữ liệu 100% khi có nhiều người click cùng lúc
      await setDoc(docRef, {
        notificationSubscribers: arrayUnion(email)
      }, { merge: true });

      return { success: true, message: 'Đăng ký nhận thông báo thành công!' };
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại.' };
    }
  },

  // Lấy lịch sử Admin Logs
  getMaintenanceLogs: async () => {
    try {
      const { data, error } = await supabase
        .from('admin_logs')
        .select('*')
        .in('action_type', ['MAINTENANCE_ON', 'MAINTENANCE_OFF', 'UPDATE_MAINTENANCE_SETTINGS'])
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting maintenance logs:', error);
      return [];
    }
  },
};