// src/setupTests.js
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Vitest globals setup - required for ResizeObserver mock
const { global: globalObj } = globalThis;
Object.defineProperty(globalObj, 'global', { value: globalObj });

// 1. Tự động dọn dẹp giao diện sau mỗi test case để tránh rò rỉ dữ liệu giữa các bài test
afterEach(() => {
  cleanup();
});

/**
 * 2. MOCK CÁC API TRÌNH DUYỆT (Trình giả lập JSDOM chưa hỗ trợ các API này)
 */

// Mock window.matchMedia (thường dùng cho Responsive hoặc Framer Motion)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Web Speech API (Vì dự án của bạn dùng speechSynthesis rất nhiều)
const mockSpeechSynthesis = {
  speak: vi.fn(),
  cancel: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  getVoices: vi.fn(() => []),
  onvoiceschanged: null,
};

Object.defineProperty(window, 'speechSynthesis', {
  value: mockSpeechSynthesis,
});

// Mock ResizeObserver (Thường dùng cho biểu đồ Recharts hoặc Layout phức tạp)
Object.defineProperty(globalObj, 'ResizeObserver', {
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});