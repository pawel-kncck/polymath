import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

import { cookies } from 'next/headers';
import { auth } from '@/lib/auth';
import { getTheme } from './server';

function mockCookieValue(value: string | undefined) {
  vi.mocked(cookies).mockResolvedValue({
    get: (name: string) =>
      name === 'theme' && value !== undefined ? { value } : undefined,
  } as unknown as Awaited<ReturnType<typeof cookies>>);
}

describe('getTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the cookie value when valid', async () => {
    mockCookieValue('dark');
    expect(await getTheme()).toBe('dark');
  });

  it('returns sunrise from cookie even for non-students', async () => {
    mockCookieValue('sunrise');
    vi.mocked(auth).mockResolvedValue({
      user: { role: 'ADMIN' },
    } as unknown as Awaited<ReturnType<typeof auth>>);
    expect(await getTheme()).toBe('sunrise');
  });

  it('falls back to sunrise for STUDENT when no cookie set', async () => {
    mockCookieValue(undefined);
    vi.mocked(auth).mockResolvedValue({
      user: { role: 'STUDENT' },
    } as unknown as Awaited<ReturnType<typeof auth>>);
    expect(await getTheme()).toBe('sunrise');
  });

  it('falls back to light for ADMIN when no cookie set', async () => {
    mockCookieValue(undefined);
    vi.mocked(auth).mockResolvedValue({
      user: { role: 'ADMIN' },
    } as unknown as Awaited<ReturnType<typeof auth>>);
    expect(await getTheme()).toBe('light');
  });

  it('falls back to light for unauthenticated visitors', async () => {
    mockCookieValue(undefined);
    vi.mocked(auth).mockResolvedValue(
      null as unknown as Awaited<ReturnType<typeof auth>>,
    );
    expect(await getTheme()).toBe('light');
  });

  it('ignores invalid cookie values and falls back by role', async () => {
    mockCookieValue('chartreuse');
    vi.mocked(auth).mockResolvedValue({
      user: { role: 'STUDENT' },
    } as unknown as Awaited<ReturnType<typeof auth>>);
    expect(await getTheme()).toBe('sunrise');
  });
});
