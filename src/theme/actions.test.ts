import { describe, it, expect, vi, beforeEach } from 'vitest';

const cookieSet = vi.fn();
vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({ set: cookieSet })),
}));

const revalidate = vi.fn();
vi.mock('next/cache', () => ({
  revalidatePath: (...args: unknown[]) => revalidate(...args),
}));

import { setTheme } from './actions';

describe('setTheme', () => {
  beforeEach(() => {
    cookieSet.mockReset();
    revalidate.mockReset();
  });

  it('writes a year-long theme cookie and revalidates the layout', async () => {
    await setTheme('sunrise');
    expect(cookieSet).toHaveBeenCalledWith('theme', 'sunrise', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    expect(revalidate).toHaveBeenCalledWith('/', 'layout');
  });

  it('ignores invalid theme values', async () => {
    await setTheme('chartreuse');
    expect(cookieSet).not.toHaveBeenCalled();
    expect(revalidate).not.toHaveBeenCalled();
  });

  it('accepts each known theme', async () => {
    for (const theme of ['light', 'dark', 'sunrise']) {
      await setTheme(theme);
    }
    expect(cookieSet).toHaveBeenCalledTimes(3);
  });
});
