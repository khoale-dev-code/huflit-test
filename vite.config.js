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
  // 1. Plugins
  plugins: [react()],

  // 2. Testing: Cấu hình Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },

  // 3. Resolve: Đường dẫn tắt và Sửa lỗi Singleton
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },

  // 4. Server: Cấu hình Header cho Firebase Auth
  server: {
    port: 5173,
    open: true,
    cors: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "unsafe-none"
    },
  },

  // 5. Esbuild: Xóa console.log siêu tốc (Thay thế cho Terser)
  esbuild: {
    // Chỉ xóa console và debugger khi build ra production
    // eslint-disable-next-line no-undef
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },

  // 6. Build: Tối ưu dung lượng (Production)
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: false, 
    chunkSizeWarningLimit: 1200, // Nới lỏng một chút để tránh cảnh báo ảo
    reportCompressedSize: false, // Tắt cái này giúp tăng tốc độ build đáng kể

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Tách các thư viện lớn, riêng biệt ra để tối ưu caching
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('firebase')) return 'vendor-firebase';
            if (id.includes('@tiptap') || id.includes('prosemirror')) return 'vendor-editor';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('recharts')) return 'vendor-charts';
            
            // GOM React và các thư viện nhỏ còn lại vào một chunk 'core'
            // để tránh lỗi phụ thuộc vòng tròn.
            return 'vendor-core';
          }
        },
        // Mã hóa tên file để trình duyệt luôn cập nhật bản mới nhất
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  // 7. Cứu tinh của Tiptap & Vite (Tối ưu hóa nạp thư viện)
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
      '@supabase/supabase-js',
      // 🚀 FIX LỖI TIPTAP: Bắt Vite phải dịch gói này sang ESM
      'use-sync-external-store/shim/index.js' 
    ],
    // Xóa Tiptap khỏi mảng exclude để Vite tự động xử lý các dependencies của nó
    exclude: ['groq-sdk'], 
  }
});