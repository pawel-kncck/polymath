import { describe, it, expect, vi, beforeEach } from 'vitest';
import { requireAuth, requireAdmin } from './auth-utils';

// Mock dependencies
vi.mock('./auth', () => ({
  auth: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

import { auth } from './auth';
import { redirect } from 'next/navigation';

describe('auth-utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('requireAuth', () => {
    it('should return session if user is authenticated', async () => {
      const mockSession = {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
          role: 'STUDENT',
        },
      };

      vi.mocked(auth).mockResolvedValue(mockSession as any);

      const result = await requireAuth();

      expect(result).toEqual(mockSession);
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should redirect to /signin if session is null', async () => {
      vi.mocked(auth).mockResolvedValue(null);

      // requireAuth calls redirect which throws (Next.js behavior)
      vi.mocked(redirect).mockImplementation(() => {
        throw new Error('NEXT_REDIRECT');
      });

      await expect(requireAuth()).rejects.toThrow('NEXT_REDIRECT');

      expect(redirect).toHaveBeenCalledWith('/signin');
    });

    it('should redirect to /signin if session has no user', async () => {
      vi.mocked(auth).mockResolvedValue({} as any);

      vi.mocked(redirect).mockImplementation(() => {
        throw new Error('NEXT_REDIRECT');
      });

      await expect(requireAuth()).rejects.toThrow('NEXT_REDIRECT');

      expect(redirect).toHaveBeenCalledWith('/signin');
    });
  });

  describe('requireAdmin', () => {
    it('should return session if user is admin', async () => {
      const mockSession = {
        user: {
          id: 'admin-123',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'ADMIN',
        },
      };

      vi.mocked(auth).mockResolvedValue(mockSession as any);

      const result = await requireAdmin();

      expect(result).toEqual(mockSession);
      expect(redirect).not.toHaveBeenCalled();
    });

    it('should redirect to / if user is not admin', async () => {
      const mockSession = {
        user: {
          id: 'user-123',
          email: 'student@example.com',
          name: 'Student User',
          role: 'STUDENT',
        },
      };

      vi.mocked(auth).mockResolvedValue(mockSession as any);

      vi.mocked(redirect).mockImplementation(() => {
        throw new Error('NEXT_REDIRECT');
      });

      await expect(requireAdmin()).rejects.toThrow('NEXT_REDIRECT');

      expect(redirect).toHaveBeenCalledWith('/');
    });

    it('should redirect to /signin if not authenticated', async () => {
      vi.mocked(auth).mockResolvedValue(null);

      vi.mocked(redirect).mockImplementation(() => {
        throw new Error('NEXT_REDIRECT');
      });

      await expect(requireAdmin()).rejects.toThrow('NEXT_REDIRECT');

      expect(redirect).toHaveBeenCalledWith('/signin');
    });

    it('should handle missing role (defaults to non-admin)', async () => {
      const mockSession = {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
          // role is missing
        },
      };

      vi.mocked(auth).mockResolvedValue(mockSession as any);

      vi.mocked(redirect).mockImplementation(() => {
        throw new Error('NEXT_REDIRECT');
      });

      await expect(requireAdmin()).rejects.toThrow('NEXT_REDIRECT');

      expect(redirect).toHaveBeenCalledWith('/');
    });
  });
});
