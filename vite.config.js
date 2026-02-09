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
    target: 'esnext',
    minify: 'terser',
    chunkSizeWarningLimit: 1000, // optional
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('firebase')) {
            return 'firebase'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})
