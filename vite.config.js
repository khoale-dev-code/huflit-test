// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // ─── Cấu hình Server (Development) ──────────────────────────────
  server: {
    port: 5173,
    open: true,
    cors: true,
    // ✅ QUAN TRỌNG: Fix lỗi COOP (Cross-Origin-Opener-Policy) 
    // Giúp Popup đăng nhập Google của Firebase hoạt động ổn định trên localhost
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "unsafe-none"
    },
  },

  // ─── Cấu hình Resolve (Alias) ──────────────────────────────────
  resolve: {
    alias: {
      // Giúp bạn import theo kiểu: import { ... } from '@/components/...'
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ─── Cấu hình Build (Production) ───────────────────────────────
  build: {
    outDir: 'dist',
    target: 'esnext', // Sử dụng công nghệ JS mới nhất cho trình duyệt hiện đại
    sourcemap: false, // Tắt sourcemap để bảo mật code và giảm dung lượng build
    chunkSizeWarningLimit: 1500, // Tăng giới hạn cảnh báo dung lượng file

    rollupOptions: {
      output: {
        // ✅ TỐI ƯU CHUNKING: Chia nhỏ ứng dụng để tải nhanh hơn
        manualChunks(id) {
          // 1. Tách các thư viện Core (Firebase & Supabase)
          if (id.includes('node_modules/firebase')) {
            return 'firebase-bundle';
          }
          if (id.includes('node_modules/@supabase')) {
            return 'supabase-bundle';
          }

          // 2. Tách UI & Icons (Nặng nhưng ít khi thay đổi)
          if (
            id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/recharts')
          ) {
            return 'ui-visuals';
          }

          // 3. Tách các tiện ích React Core
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router-dom')
          ) {
            return 'react-vendor';
          }
        },
        
        // Cấu hình tên file để tránh cache cũ trên trình duyệt người dùng
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  
  // Tối ưu hóa việc nạp (pre-bundling) các thư viện nặng
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/firestore', '@supabase/supabase-js'],
  }
});