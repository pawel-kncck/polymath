import { test, expect } from '@playwright/test';

test.describe('Theme', () => {
  test('unauthenticated visitor gets the light theme by default', async ({
    page,
  }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveClass(/\blight\b/);
  });

  test('manually setting the sunrise cookie applies the gradient body', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'theme',
        value: 'sunrise',
        url: 'http://localhost:3000',
      },
    ]);
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/\bsunrise\b/);

    const backgroundImage = await page.evaluate(
      () => getComputedStyle(document.body).backgroundImage,
    );
    expect(backgroundImage).toContain('linear-gradient');
  });

  test('manually setting the dark cookie applies the dark theme class', async ({
    page,
    context,
  }) => {
    await context.addCookies([
      {
        name: 'theme',
        value: 'dark',
        url: 'http://localhost:3000',
      },
    ]);
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/\bdark\b/);
  });
});
