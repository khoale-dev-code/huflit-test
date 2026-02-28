import { useEffect } from 'react';

/**
 * Hook tự động scroll lên đầu trang khi component mount
 * @param {boolean} [smooth=true] - Dùng smooth scrolling
 */
export function useScrollTop(smooth = true) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }, [smooth]);
}

export default useScrollTop;