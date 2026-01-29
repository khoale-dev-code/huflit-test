import React, { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import './index.css';

// ✅ Lazy load App and AuthProvider
const App = React.lazy(() => import('./App'));
const AuthProvider = React.lazy(() => 
  import('./contexts/AuthContext').then(module => ({ 
    default: module.AuthProvider 
  }))
);

// ✅ Loading Fallback - Keep it simple and fast
const RootFallback = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    <LoadingSpinner />
  </div>
);

// ✅ Root Component - Only wrap with StrictMode in dev
const Root = () => {
  const isDev = process.env.NODE_ENV === 'development';
  
  const content = (
    <Suspense fallback={<RootFallback />}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Suspense>
  );

  return isDev ? <StrictMode>{content}</StrictMode> : content;
};

// ✅ Initialize React root with error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id="root" not found in HTML');
}

const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);

// ✅ Web Vitals monitoring (Production only)
if (process.env.NODE_ENV === 'production') {
  // Report Web Vitals for monitoring
  import('web-vitals')
    .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Send to analytics (replace with your analytics service)
      getCLS(metric => console.log('CLS:', metric.value));
      getFID(metric => console.log('FID:', metric.value));
      getFCP(metric => console.log('FCP:', metric.value));
      getLCP(metric => console.log('LCP:', metric.value));
      getTTFB(metric => console.log('TTFB:', metric.value));
    })
    .catch(() => {
      // web-vitals not installed
    });

  // ✅ Long Task monitoring - only in production
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log tasks longer than 50ms
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
          }
        }
      });
      // Only observe 'longtask' in production
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // PerformanceObserver or longtask not supported
    }
  }

  // ✅ Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Send to error tracking service (e.g., Sentry)
  });

  // ✅ Handle runtime errors
  window.addEventListener('error', (event) => {
    console.error('Runtime error:', event.error);
    // Send to error tracking service
  });
}