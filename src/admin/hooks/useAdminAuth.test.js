import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { useAdminAuth } from './useAdminAuth';
import * as firebaseAuth from 'firebase/auth';
import { supabase } from '../../config/supabaseClient';

// Mocks
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  getRedirectResult: vi.fn().mockResolvedValue(null),
  signOut: vi.fn(),
}));

vi.mock('../../config/firebase', () => ({ auth: {} }));

vi.mock('../../config/supabaseClient', () => ({
  supabase: { from: vi.fn() },
}));

describe('useAdminAuth Hook', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // Helper để mock nhanh Supabase response
  const mockSupabaseResponse = (data, error = null) => {
    const single = vi.fn().mockResolvedValue({ data, error });
    const eq = vi.fn(() => ({ single }));
    const select = vi.fn(() => ({ eq }));
    vi.mocked(supabase.from).mockReturnValue({ select });
  };

  it('nên trả về loading=false và admin=null khi không có user', async () => {
    vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementation((auth, cb) => {
      cb(null);
      return () => {};
    });

    const { result } = renderHook(() => useAdminAuth());

    // Dùng waitFor thay vì Promise.resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.admin).toBeNull();
    expect(result.current.isAdmin).toBe(false);
  });

  it('nên xác nhận isAdmin=true khi Supabase trả về role admin', async () => {
    vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementation((auth, cb) => {
      cb({ uid: 'admin_123' });
      return () => {};
    });

    mockSupabaseResponse({ id: 'admin_123', role: 'admin' });

    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(result.current.isAdmin).toBe(true);
    });

    expect(result.current.admin?.role).toBe('admin');
    expect(result.current.error).toBeNull();
  });

  it('nên báo lỗi khi user không có quyền admin', async () => {
    vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementation((auth, cb) => {
      cb({ uid: 'user_456' });
      return () => {};
    });

    mockSupabaseResponse({ id: 'user_456', role: 'student' });

    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(result.current.error).toMatch(/không có quyền/i);
    });

    expect(result.current.isAdmin).toBe(false);
  });

  it('nên xử lý lỗi database từ Supabase một cách mượt mà', async () => {
    vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementation((auth, cb) => {
      cb({ uid: 'user_789' });
      return () => {};
    });

    mockSupabaseResponse(null, { message: 'Network Error' });

    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(result.current.error).toBe('Network Error');
    });

    expect(result.current.loading).toBe(false);
  });
});