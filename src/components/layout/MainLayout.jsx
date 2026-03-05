import React, { useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../footer/Footer';

// Pages that genuinely need wide layout (dashboards, analytics)
const FULL_WIDTH_PAGES = new Set(['/dashboard', '/analytics']);

// Homepage và các trang content cần centered layout
const CENTERED_PAGES = new Set(['/']);

const MainLayout = ({
  children,
  onlineCount,
  totalUsers,
  testType,
  onTestTypeChange,
  practiceType,
  onPracticeTypeChange,
}) => {
  const { pathname } = useLocation();

  // Xác định layout: full-width, wide, hay centered
  const layoutConfig = useMemo(() => {
    if (FULL_WIDTH_PAGES.has(pathname)) {
      return { maxWidth: 'max-w-7xl', isFull: true };
    }
    if (CENTERED_PAGES.has(pathname)) {
      return { maxWidth: 'max-w-5xl', isFull: false }; // Homepage rộng hơn một chút
    }
    return { maxWidth: 'max-w-3xl', isFull: false }; // Trang bình thường
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col isolate selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar (handles desktop top bar + mobile bottom bar internally) */}
      <Navbar
        testType={testType}
        onTestTypeChange={onTestTypeChange}
        practiceType={practiceType}
        onPracticeTypeChange={onPracticeTypeChange}
      />

      {/* 
        ✅ Main content wrapper
        - Không dùng overflow-x-hidden trên main (có thể gây vấn đề)
        - flex-1 để nó grow và đẩy footer xuống
        - w-full để full width
        - flex flex-col để center children
      */}
     <main className="flex-1 w-full flex flex-col pb-16 lg:pb-0">
        {/* 
          ✅ Content container
          - mx-auto: center horizontally
          - w-full: full width trước khi max-width
          - px-4 sm:px-6 lg:px-8: responsive padding
          - py-6 md:py-10: responsive vertical padding
          - overflow-x-hidden: chỉ ở container này, không phải main
        */}
        <div className={`
          flex-1 w-full mx-auto
          px-4 sm:px-6 lg:px-8
          py-6 md:py-10
          overflow-x-hidden
          transition-all duration-300
          ${layoutConfig.maxWidth}
        `}>
          {children}
        </div>
      </main>

      {/* Desktop footer only - sẽ sticky ở cuối nhờ flex-1 ở main */}
      <footer className="hidden lg:block w-full bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <Footer onlineCount={onlineCount} totalUsers={totalUsers} />
        </div>
      </footer>
    </div>
  );
};

export default memo(MainLayout);