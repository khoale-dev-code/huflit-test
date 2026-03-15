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
      
      // ✅ FIX LỖI CREATECONTEXT: Ép tất cả các thư viện dùng chung 1 bản React duy nhất
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },

  // ─── Cấu hình Build (Production) ───────────────────────────────
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: false, // Tắt sourcemap để bảo mật code và giảm dung lượng build
    chunkSizeWarningLimit: 1500,

    rollupOptions: {
      output: {
        // ✅ TỐI ƯU CHUNKING (Đã fix lỗi Circular Chunk)
        manualChunks(id) {
          // 1. Tách DB & Backend (Nặng, ít thay đổi)
          if (id.includes('node_modules/firebase')) return 'firebase-bundle';
          if (id.includes('node_modules/@supabase')) return 'supabase-bundle';

          // 2. GOM CHUNG React Core và UI Libraries vào 1 cục "vendor"
          // Điều này phá vỡ vòng lặp vô tận giữa framer-motion và react
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/lucide-react') ||
            id.includes('node_modules/recharts') ||
            id.includes('node_modules/zustand')
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
  
  // Tối ưu hóa việc nạp các thư viện ngay khi khởi động dev server
  optimizeDeps: {
    include: [
      'firebase/app', 
      'firebase/auth', 
      'firebase/firestore', 
      '@supabase/supabase-js',
      'react',
      'react-dom'
    ],
  }
});