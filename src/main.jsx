/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import './index.css';

// ✅ Lazy load App - Giữ AuthProvider import trực tiếp để tránh lỗi văng Context khi khởi tạo
import { AuthProvider } from '@/contexts/AuthContext';
const App = React.lazy(() => import('./App'));

// ✅ Loading Fallback - Gamified Style
const RootFallback = () => (
  <div className="flex items-center justify-center h-screen bg-[#F4F7FA]">
    <LoadingSpinner message="Đang chuẩn bị hệ thống..." />
  </div>
);

// ✅ Root Component - Sử dụng import.meta.env thay cho process.env
const Root = () => {
  const isDev = import.meta.env.DEV;
  
  const content = (
    <Suspense fallback={<RootFallback />}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Suspense>
  );

  return isDev ? <StrictMode>{content}</StrictMode> : content;
};

// ✅ Initialize React root
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id="root" not found in HTML');
}

const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);

// ─── MONITORING (PRODUCTION ONLY) ──────────────────────────────────────────
if (import.meta.env.PROD) {
  // Report Web Vitals
  import('web-vitals')
    .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(m => console.log('CLS:', m.value));
      getFID(m => console.log('FID:', m.value));
      getFCP(m => console.log('FCP:', m.value));
      getLCP(m => console.log('LCP:', m.value));
      getTTFB(m => console.log('TTFB:', m.value));
    })
    .catch(() => { /* ignore */ });

  // Long Task monitoring
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn(`Performance Note: Long task detected (${entry.duration.toFixed(2)}ms)`);
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch {
      /* PerformanceObserver not supported */
    }
  }

  // Global Error Handling
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise:', event.reason);
  });

  window.addEventListener('error', (event) => {
    console.error('Runtime Error:', event.error);
  });
}