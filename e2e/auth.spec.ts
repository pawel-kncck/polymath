import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should redirect unauthenticated users from protected routes to signin', async ({
    page,
  }) => {
    // Try to access a protected route (quiz page)
    await page.goto('/quiz');

    // Should be redirected to signin page
    await expect(page).toHaveURL(/.*signin/);
  });

  test('should display sign in page', async ({ page }) => {
    await page.goto('/signin');

    // Check for the sign in page elements
    await expect(page.locator('h1')).toContainText('Polymath');
    await expect(page.locator('text=Sign in to continue learning')).toBeVisible();
    await expect(page.locator('text=Sign in with Google')).toBeVisible();
  });

  test('should show home page without authentication', async ({ page }) => {
    await page.goto('/');

    // Home page should be accessible
    await expect(page.locator('h1')).toContainText('Polymath');
    await expect(page.locator('h2')).toContainText('Choose a Quiz');

    // Should show sign in button
    await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
  });

  // Note: Full OAuth flow cannot be automated in E2E tests without mocking
  // Google's OAuth requires real credentials and redirects to Google's servers
  // In a real testing environment, you would:
  // 1. Use Playwright's storageState to save an authenticated session
  // 2. Create a test account with Google
  // 3. Or mock the auth provider for testing
});
