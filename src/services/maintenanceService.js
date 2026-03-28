// src/services/maintenanceService.js
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { supabase } from '../config/supabaseClient';

const SETTINGS_COLLECTION = 'settings';
const SITE_CONFIG_DOC = 'siteConfig';

const DEFAULT_CONFIG = {
  isMaintenance: false,
  message: 'Hệ thống đang được bảo trì. Chúng tôi sẽ quay lại sớm!',
  estimatedEndTime: null,
  startTime: null,
  contactEmail: 'support@example.com',
  contactPhone: '',
  backgroundUrl: '',
};

export const maintenanceService = {
  getConfig: async () => {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...DEFAULT_CONFIG, ...docSnap.data() };
      }
      // Document chưa tồn tại → trả về defaults (không tự tạo, admin sẽ tạo qua trang cài đặt)
      return DEFAULT_CONFIG;
    } catch (error) {
      console.error('Error getting maintenance config:', error);
      return DEFAULT_CONFIG;
    }
  },

  subscribeToConfig: (callback) => {
    const docRef = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
    return onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        callback({ ...DEFAULT_CONFIG, ...snapshot.data() });
      } else {
        callback(DEFAULT_CONFIG);
      }
    }, (error) => {
      console.error('Error subscribing to maintenance config:', error);
      callback(DEFAULT_CONFIG);
    });
  },

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

      await supabase.from('admin_logs').insert([{
        admin_id: adminId,
        admin_name: adminEmail || 'Admin',
        action_type: isActive ? 'MAINTENANCE_ON' : 'MAINTENANCE_OFF',
        target_name: isActive ? 'Bật chế độ bảo trì' : 'Tắt chế độ bảo trì',
      }]);

      return true;
    } catch (error) {
      console.error('Error toggling maintenance:', error);
      throw error;
    }
  },

  updateSettings: async (settings, adminId, adminEmail) => {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
      const now = new Date().toISOString();

      const cleanSettings = Object.fromEntries(
        Object.entries(settings).filter(([, v]) => v !== undefined)
      );

      await setDoc(docRef, { ...cleanSettings, updatedAt: now }, { merge: true });

      await supabase.from('admin_logs').insert([{
        admin_id: adminId,
        admin_name: adminEmail || 'Admin',
        action_type: 'UPDATE_MAINTENANCE_SETTINGS',
        target_name: 'Cập nhật cài đặt bảo trì',
      }]);

      return true;
    } catch (error) {
      console.error('Error updating maintenance settings:', error);
      throw error;
    }
  },

  subscribeToNotifications: async (email) => {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, SITE_CONFIG_DOC);
      const docSnap = await getDoc(docRef);
      const current = docSnap.exists() ? docSnap.data() : {};
      const subscribers = current.notificationSubscribers || [];

      if (subscribers.includes(email)) {
        return { success: false, message: 'Email này đã đăng ký nhận thông báo.' };
      }

      await setDoc(docRef, {
        notificationSubscribers: [...subscribers, email],
      }, { merge: true });

      return { success: true, message: 'Đăng ký nhận thông báo thành công!' };
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại.' };
    }
  },

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
