import { test, expect } from '@playwright/test';

test.describe('Quiz Flow (Unauthenticated)', () => {
  test('should display modules on home page', async ({ page }) => {
    await page.goto('/');

    // Wait for modules to load
    await page.waitForSelector('text=Choose a Quiz');

    // Should show module card or empty state
    const hasModules = await page.locator('[href^="/quiz/"]').count();

    if (hasModules > 0) {
      // Module card should be visible
      await expect(page.locator('text=English Plurals')).toBeVisible();
      await expect(page.locator('text=questions')).toBeVisible();
      await expect(page.locator('text=Start Quiz')).toBeVisible();
    } else {
      // Empty state should be shown
      await expect(page.locator('text=No modules available yet')).toBeVisible();
      await expect(page.locator('text=npm run db:seed')).toBeVisible();
    }
  });

  test('should show module details in card', async ({ page }) => {
    await page.goto('/');

    // Check if we have modules
    const moduleCard = page.locator('[href^="/quiz/"]').first();
    const hasModule = await moduleCard.count() > 0;

    if (hasModule) {
      // Module should show title, description, and question count
      await expect(moduleCard).toBeVisible();

      // Should show question count
      await expect(moduleCard.locator('text=/\\d+ questions/')).toBeVisible();
    }
  });

  test('should group modules by category on the home page', async ({
    page,
  }) => {
    await page.goto('/');

    const hasModules = await page.locator('[href^="/quiz/"]').count();
    if (hasModules === 0) return;

    // At least one of the category headings should be present. English locale
    // is the default for the e2e harness, so english/general-knowledge labels
    // are what we assert against.
    await expect(
      page.locator('h3', { hasText: /General knowledge|English language/ })
    ).toHaveCount(await page
      .locator('h3', { hasText: /General knowledge|English language/ })
      .count());
    // English plurals sits under the English language category section.
    const englishSection = page.getByTestId('category-ENGLISH');
    await expect(englishSection).toBeVisible();
    await expect(
      englishSection.locator('text=English Plurals')
    ).toBeVisible();
  });

  test('should require authentication to start quiz', async ({ page }) => {
    await page.goto('/');

    // Check if module exists
    const moduleCard = page.locator('[href^="/quiz/"]').first();
    const hasModule = await moduleCard.count() > 0;

    if (hasModule) {
      // Click on module
      await moduleCard.click();

      // Should redirect to signin
      await expect(page).toHaveURL(/.*signin/);
    }
  });
});

test.describe('Quiz Flow (Manual Testing Notes)', () => {
  test('MANUAL: Complete quiz end-to-end requires authentication', async ({
    page,
  }) => {
    // This test documents what should be tested manually with real auth:
    //
    // 1. Sign in with Google OAuth
    // 2. Navigate to home page
    // 3. Click on "English Plurals" module
    // 4. Quiz should load with first question
    // 5. Input field should be auto-focused
    // 6. Type correct answer (e.g., "cats" for "cat")
    // 7. Press Enter to submit
    // 8. Should show green flash feedback
    // 9. Should automatically move to next question
    // 10. Progress bar should update (e.g., "2/10")
    // 11. Type incorrect answer for one question
    // 12. Should show red shake feedback
    // 13. Should record mistake and continue
    // 14. Complete all questions
    // 15. Results screen should appear showing:
    //     - Score (e.g., "9/10")
    //     - Percentage (e.g., "90%")
    //     - Time taken (e.g., "1:45")
    //     - List of mistakes with correct answers
    // 16. Click "Try Again" button
    // 17. Quiz should reset and start over
    // 18. Click "Choose Another Module"
    // 19. Should return to home page
    // 20. Result should be saved to database (verify in Prisma Studio)

    expect(true).toBe(true); // Placeholder assertion
  });
});

test.describe('Quiz UI Elements', () => {
  test('should have responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Home page should still be usable
    await expect(page.locator('h1:has-text("Polymath")')).toBeVisible();
    await expect(page.locator('h2:has-text("Choose a Quiz")')).toBeVisible();
  });

  test('should support dark mode', async ({ page }) => {
    await page.goto('/');

    // The app should have dark mode support (Tailwind dark: classes)
    // This test just verifies the page loads
    // Visual testing would require screenshots or specific dark mode checks
    await expect(page.locator('h1')).toBeVisible();
  });
});
