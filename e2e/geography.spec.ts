import { test, expect } from "@playwright/test";

test.describe("Local geography expedition", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dev/geography");
  });
  test("explores a map and both routes with consistent distances", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Mapa to przygoda/ }).click();
    await page.getByRole("button", { name: "Wieża", exact: true }).click();
    await expect(page.locator(".geo-map-detail")).toContainText(
      "Leży na wschód",
    );
    await page.getByRole("button", { name: "← Wszystkie wyprawy" }).click();
    await page.getByRole("button", { name: /Zaplanuj wyprawę/ }).click();
    await page.getByRole("button", { name: "Wieża", exact: true }).click();
    await expect(
      page.getByRole("status", { name: "Informacja o trasie" }),
    ).toContainText("Nie ma tu bezpośredniego szlaku");
    await page.getByRole("button", { name: "Schronisko", exact: true }).click();
    await page.getByRole("button", { name: "Wieża", exact: true }).click();
    await expect(page.getByLabel("Długość trasy")).toHaveText("1,4 km");
    await page.getByRole("button", { name: "Wyczyść trasę" }).click();
    await page.getByRole("button", { name: "Biwak", exact: true }).click();
    await page.getByRole("button", { name: "Wieża", exact: true }).click();
    await expect(page.getByLabel("Długość trasy")).toHaveText("1,7 km");
  });
  test("updates scale and relief using keyboard accessible controls", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Mała mapa, wielki świat/ }).click();
    await page.getByLabel("Skala liczbowa").selectOption("50000");
    await expect(page.locator(".geo-map-detail output")).toHaveText("2 km");
    await page.getByLabel("Długość na mapie").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".geo-map-detail output")).toHaveText("2,25 km");
    await page.getByRole("button", { name: "← Wszystkie wyprawy" }).click();
    await page.getByRole("button", { name: /Odczytaj kształt góry/ }).click();
    await expect(page.locator(".geo-map-detail output")).toHaveText("175 m");
    await page.getByRole("button", { name: "Widok z góry" }).click();
    await expect(
      page.getByRole("img", { name: /Mapa poziomicowa/ }),
    ).toBeVisible();
    await page.getByLabel("Poziomica").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".geo-map-detail output")).toHaveText("125 m");
  });
  test("completes a test, reviews mistakes, preserves points and prevents repeat farming", async ({
    page,
  }) => {
    const options = [
      "Legenda",
      "Na północny wschód",
      "Liniowy",
      "Niebieski obszar jeziora",
      "Po lewej stronie",
      "Mapy lub zdjęcia tego miejsca z różnych lat",
    ];
    for (let attempt = 0; attempt < 2; attempt++) {
      await page.getByRole("button", { name: /Mapa to przygoda/ }).click();
      await page.getByRole("button", { name: "Rozpocznij test" }).click();
      await expect(
        page.getByRole("button", { name: "Sprawdź odpowiedź" }),
      ).toBeDisabled();
      for (let i = 0; i < 6; i++) {
        await page
          .getByRole("button", { name: new RegExp(options[i]) })
          .click();
        await page.getByRole("button", { name: "Sprawdź odpowiedź" }).click();
        await expect(page.getByRole("status")).toContainText("Dobra odpowiedź");
        await page
          .getByRole("button", {
            name: i === 5 ? "Zobacz wynik" : "Następne pytanie",
          })
          .click();
      }
      await expect(page.locator(".geo-result-stats")).toContainText(
        attempt === 0 ? "+80" : "+0",
      );
      await expect(page.getByText("✧ Odznaka: Tropiciel znaków")).toBeVisible();
      await page.getByRole("button", { name: "Wróć na szlak" }).click();
      await page.reload();
      await expect(page.getByLabel("Łącznie 80 punktów")).toBeVisible();
    }
    await page.getByRole("button", { name: /Odznaki/ }).click();
    await expect(page.locator(".geo-badges .earned")).toHaveCount(1);
  });
  test("retains explanations for wrong answers and supports retry without losing points", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Mapa to przygoda/ }).click();
    await page.getByRole("button", { name: "Rozpocznij test" }).click();
    for (let i = 0; i < 6; i++) {
      await page.locator(".geo-options button").first().click();
      await page.getByRole("button", { name: "Sprawdź odpowiedź" }).click();
      await expect(page.locator(".geo-feedback p")).not.toBeEmpty();
      await page
        .getByRole("button", {
          name: i === 5 ? "Zobacz wynik" : "Następne pytanie",
        })
        .click();
    }
    await page.locator(".geo-review summary").first().click();
    await expect(
      page.getByText("Poprawna odpowiedź:", { exact: false }).first(),
    ).toBeVisible();
  });
  test("fits a phone viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(
      page.getByRole("heading", { name: /Wielkie odkrycia/ }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: /Odczytaj kształt góry/ }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
});
