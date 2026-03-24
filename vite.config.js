// vite.config.js
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Tái tạo lại __dirname cho môi trường ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // 1. Plugins: Sử dụng bản chuẩn, ổn định nhất cho React
  plugins: [react()],

  // 2. Testing: Cấu hình Vitest chuyên sâu cho React UI
  test: {
    globals: true,             // Sử dụng 'describe', 'it', 'expect' mà không cần import
    environment: 'jsdom',      // Giả lập môi trường trình duyệt (cần thiết để test giao diện)
    setupFiles: './src/setupTests.js', // File cấu hình global cho các bài test
    css: true,                 // Cho phép Vitest hiểu các class Tailwind
    include: ['src/**/*.{test,spec}.{js,jsx}'], // Chỉ tìm file test trong thư mục src
    coverage: {
      provider: 'v8',          // Bộ đo độ phủ code
      reporter: ['text', 'json', 'html'],
    },
  },

  // 3. Resolve: Đường dẫn tắt và Sửa lỗi Singleton cho React
  resolve: {
    alias: {
      // Giúp import gọn: import ... from '@/components/MyComponent'
      '@': path.resolve(__dirname, './src'),
      
      // FIX LỖI CONTEXT: Ép mọi thư viện (Framer Motion, v.v.) dùng chung 1 bản React duy nhất
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },

  // 4. Server: Tối ưu cho lập trình viên
  server: {
    port: 5173,
    open: true, // Tự động mở trình duyệt khi chạy npm run dev
    cors: true,
    headers: {
      // Giúp Popup Google Auth của Firebase hoạt động mượt mà trên localhost
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "unsafe-none"
    },
  },

  // 5. Build: Tối ưu dung lượng và tốc độ cho môi trường thực tế (Production)
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: false, // Tắt để bảo mật code và giảm nhẹ file build
    chunkSizeWarningLimit: 1000, // Giảm để phát hiện chunks lớn

    // Tối ưu Brotli/Gzip compression
    reportCompressedSize: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Loại bỏ console.log trong production
        drop_debugger: true,
      },
    },

    rollupOptions: {
      output: {
        // CHUNKING: Chia nhỏ các thư viện bên thứ 3 để trình duyệt lưu Cache tốt hơn
        manualChunks(id) {
          // Firebase - vẫn bundle vì cần thiết cho app
          if (id.includes('node_modules/firebase') && !id.includes('firebase-admin')) {
            return 'vendor-firebase';
          }
          
          // Tiptap Editor - Nặng, chỉ dùng trong Admin
          if (id.includes('node_modules/@tiptap')) {
            return 'vendor-editor';
          }
          
          // Database & Backend Services
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          
          // AI Libraries - Groq SDK
          if (id.includes('node_modules/groq-sdk')) {
            return 'vendor-ai';
          }
          
          // Tách các thư viện UI (Nặng nhưng ít khi thay đổi)
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-animation';
          }
          if (id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/react-icons')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/recharts')) {
            return 'vendor-charts';
          }
          
          // Tách lõi React và Router
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router')) {
            return 'vendor-core';
          }
        },
        
        // Đặt tên file có Hash để tránh trình duyệt người dùng load cache cũ khi bạn update web
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  // 6. Tối ưu hóa việc nạp thư viện khi khởi động
  optimizeDeps: {
    include: [
      'firebase/app', 
      'firebase/auth', 
      'firebase/firestore', 
      '@supabase/supabase-js',
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react'
    ],
    // Loại trừ các thư viện nặng không cần preload ngay
    exclude: [
      'groq-sdk',
      '@tiptap/react',
      '@tiptap/starter-kit',
    ],
  }
});