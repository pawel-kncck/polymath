import { test, expect } from '@playwright/test';

test.describe('Fractions modules (Unauthenticated)', () => {
  test('home page lists both fraction modules under MATH', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('text=Choose a Quiz');

    const mathSection = page.getByTestId('category-MATH');
    await expect(mathSection).toBeVisible();

    await expect(
      mathSection.locator('text=Fractions: Expanding')
    ).toBeVisible();
    await expect(
      mathSection.locator('text=Fractions: Simplifying')
    ).toBeVisible();
  });

  test('clicking a fractions card redirects unauthenticated user to sign-in', async ({
    page,
  }) => {
    await page.goto('/');
    await page.click('a[href="/quiz/fractions-expanding"]');
    await expect(page).toHaveURL(/.*signin/);
  });
});

test.describe('Fractions flow (Manual Testing Notes)', () => {
  test('MANUAL: end-to-end fractions test + history review', async () => {
    // Authenticated path; covered manually until fixtures support seeded
    // sessions in Playwright.
    //
    // 1. Sign in
    // 2. Open the home page; "Fractions: Expanding" appears under MATH with a
    //    progress badge that updates on completion
    // 3. Click the card → level picker is shown with 3 buttons (Level 1/2/3)
    //    and a pool size beneath each
    // 4. Click Level 1 → quiz starts with 5 random questions
    // 5. Each question shows "n/d × factor =" and two numeric inputs stacked
    //    as a fraction; entering "ansN" + "ansD" + Enter (or clicking Check)
    //    submits
    // 6. Wrong answers: red shake + correct answer captured in mistakes array
    // 7. After Q5 the results screen shows score / time / review-mistakes link
    // 8. Click "New Test" → router refresh, new sample drawn from level 1 pool
    // 9. From the home page click "My progress" → table shows the row with
    //    Level=1 and a "Review" link
    // 10. Click Review → /progress/<id> shows score / time / level / mistakes
    //
    // Repeat 3–10 with "Fractions: Simplifying" — the renderer shows "n/d ="
    // and only the answer fraction inputs.
  });
});
