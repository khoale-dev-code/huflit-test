import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * CONFIGURATION CONSTANTS
 */
const MODAL_CONFIG = {
  KEY: 'hub-study-welcome-status',
  VERSION: '1.0.0',
  DELAY: 800, // Đợi 0.8s sau khi mount mới hiện để UI mượt hơn
  STORAGE_TYPE: 'session' // 'session' = hiện lại khi vào lại web, 'local' = hiện 1 lần duy nhất
};

export const useWelcomeModal = (options = {}) => {
  const {
    storageType = MODAL_CONFIG.STORAGE_TYPE,
    delay = MODAL_CONFIG.DELAY,
    version = MODAL_CONFIG.VERSION
  } = options;

  const [isOpen, setIsOpen] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const timerRef = useRef(null);

  // Helper để lấy storage tương ứng
  const getStorage = useCallback(() => {
    return storageType === 'local' ? localStorage : sessionStorage;
  }, [storageType]);

  /**
   * Khởi tạo và kiểm tra logic hiển thị
   */
  useEffect(() => {
    const checkStatus = () => {
      try {
        const storage = getStorage();
        const storedData = JSON.parse(storage.getItem(MODAL_CONFIG.KEY) || '{}');
        
        // Điều kiện hiển thị: 
        // 1. Chưa từng xem TRONG PHIÊN NÀY (nếu là session)
        // 2. Hoặc Version cũ hơn version hiện tại
        const shouldShow = !storedData || storedData.version !== version;

        if (shouldShow) {
          // Delay một chút để người dùng định hình giao diện web trước
          timerRef.current = setTimeout(() => {
            setIsOpen(true);
          }, delay);
        }
      } catch (e) {
        console.error("WelcomeModal Error:", e);
        setIsOpen(true); // Fallback: Luôn hiện nếu lỗi storage
      } finally {
        setHasChecked(true);
      }
    };

    checkStatus();

    // Cleanup timer khi component unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [getStorage, delay, version]);

  /**
   * Đóng Modal và đánh dấu đã xem
   */
  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      const storage = getStorage();
      const statusData = {
        version: version,
        timestamp: new Date().getTime(),
        seen: true
      };
      storage.setItem(MODAL_CONFIG.KEY, JSON.stringify(statusData));
    } catch (e) {
      console.warn("Could not save modal status:", e);
    }
  }, [getStorage, version]);

  /**
   * Mở lại thủ công (Dùng cho Admin hoặc Testing)
   */
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  /**
   * Reset hoàn toàn trạng thái (Dùng cho Debug)
   */
  const handleReset = useCallback(() => {
    localStorage.removeItem(MODAL_CONFIG.KEY);
    sessionStorage.removeItem(MODAL_CONFIG.KEY);
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    hasChecked,
    onOpen: handleOpen,
    onClose: handleClose,
    reset: handleReset
  };
};

export default useWelcomeModal;