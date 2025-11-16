import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import './index.css';

// ✅ Lazy load App for better initial load
const App = React.lazy(() => import('./App'));
const AuthProvider = React.lazy(() => 
  import('./contexts/AuthContext').then(module => ({ 
    default: module.AuthProvider 
  }))
);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// ✅ Validate env at build time
if (!PUBLISHABLE_KEY) {
  throw new Error(
    'Missing VITE_CLERK_PUBLISHABLE_KEY environment variable. ' +
    'Please add it to your .env file.'
  );
}

// ✅ Loading Fallback Component - Minimal
const RootFallback = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    <LoadingSpinner />
  </div>
);

// ✅ Root Component - Separated for clarity
const Root = () => (
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      // ✅ Optimized Clerk config
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#f97316', // Orange
        }
      }}
    >
      <Suspense fallback={<RootFallback />}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Suspense>
    </ClerkProvider>
  </React.StrictMode>
);

// ✅ Initialize React root with error handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id="root" not found in HTML');
}

const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);

// ✅ Optimize React for production: disable strict mode in prod
if (process.env.NODE_ENV === 'production') {
  // Remove StrictMode by re-rendering without it
  root.render(
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#f97316',
        }
      }}
    >
      <Suspense fallback={<RootFallback />}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Suspense>
    </ClerkProvider>
  );

  // Report Web Vitals for monitoring
  try {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  } catch {
    console.log('web-vitals not installed. Skipping performance monitoring.');
  }

  // ✅ Enable paint timing API for scroll performance monitoring
  if (window.PerformanceObserver) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Log slow frames (>50ms)
            console.warn(`Slow paint: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      observer.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }
}