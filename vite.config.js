import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Sửa lỗi target: Dùng 'es2020' hoặc 'esnext' để an toàn cho cả JS và CSS
    target: 'es2020', 
    
    // Nếu bạn chưa cài 'terser', hãy để mặc định (xóa dòng minify) để Vite dùng esbuild cực nhanh
    // minify: 'terser', 
    
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Tối ưu logic chia chunk để tránh "Circular dependency"
        manualChunks(id) {
          // Ưu tiên tách Firebase đầu tiên vì nó độc lập và rất nặng
          if (id.includes('node_modules/firebase')) {
            return 'firebase-provider';
          }
          
          // Gom nhóm các thư viện đồ họa và UI nặng
          if (id.includes('node_modules/recharts') || 
              id.includes('node_modules/framer-motion') || 
              id.includes('node_modules/lucide-react')) {
            return 'ui-visuals';
          }

          // Mọi thứ khác trong node_modules sẽ tự động vào vendor (mặc định của Vite)
          // Chúng ta không cần return 'vendor' thủ công ở đây để tránh lỗi lặp vòng
        }
      }
    }
  }
})