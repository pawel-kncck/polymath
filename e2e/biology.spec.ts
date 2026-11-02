import { test, expect } from "@playwright/test";
import { MISSIONS } from "../src/features/biology/content";

test.beforeEach(async ({ page }) => {
  await page.goto("/dev/biology");
});
test("explores organization, cell structures and chemical ingredients", async ({
  page,
}) => {
  await page.getByRole("button", { name: /Po czym poznasz życie/ }).click();
  await page.getByRole("button", { name: "03 Narząd" }).click();
  await expect(page.locator(".bio-two-col")).toContainText("Serce");
  await page.getByRole("button", { name: "← Wszystkie misje" }).click();
  await page.getByRole("button", { name: /Mały świat w komórce/ }).click();
  await page.getByRole("button", { name: "Rybosomy", exact: true }).click();
  await expect(page.locator(".bio-finding")).toContainText("powstają białka");
  await page.getByRole("button", { name: "← Wszystkie misje" }).click();
  await page.getByRole("button", { name: /Z czego powstaje życie/ }).click();
  await page.getByRole("button", { name: "DNA Kwasy nukleinowe" }).click();
  await expect(page.locator(".bio-finding")).toContainText(
    "informację genetyczną",
  );
});
test("distinguishes a controlled experiment from confounded conditions", async ({
  page,
}) => {
  await page.getByRole("button", { name: /Pytaj jak naukowiec/ }).click();
  await page.getByRole("button", { name: "Porównaj próby" }).click();
  await expect(page.getByRole("status")).toContainText("w A wykiełkowało 7/8");
  await page.getByLabel("Takie samo światło jak w A").uncheck();
  await page.getByRole("button", { name: "Porównaj próby" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Liczba zmienionych warunków: 2",
  );
  await expect(page.getByRole("status")).not.toContainText("7/8");
  await page.getByLabel("Takie samo światło jak w A").check();
  await page.getByLabel("Podlewaj wodą").check();
  await page.getByRole("button", { name: "Porównaj próby" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Obie próby są takie same",
  );
});
test("changes microscope power and focuses with a keyboard", async ({
  page,
}) => {
  await page.getByRole("button", { name: /Zajrzyj do mikroświata/ }).click();
  await page.getByRole("button", { name: "40×", exact: true }).click();
  await expect(page.locator(".bio-magnification")).toContainText("400×");
  await page.getByLabel("Okular", { exact: true }).selectOption("15");
  await expect(page.locator(".bio-magnification")).toContainText("600×");
  await page.getByLabel("Ostrość", { exact: true }).focus();
  await page.keyboard.press("Home");
  for (let i = 0; i < 50; i++) await page.keyboard.press("ArrowRight");
  await expect(page.locator(".bio-controls")).toContainText("Obraz ostry");
});
test("completes all missions, retains badges and cannot farm points on retry", async ({
  page,
}) => {
  for (const [index, mission] of [...MISSIONS, MISSIONS[0]].entries()) {
    await page
      .getByRole("button", {
        name: new RegExp(mission.title.replace("?", "\\?")),
      })
      .click();
    await page.getByRole("button", { name: "Rozpocznij test" }).click();
    await expect(
      page.getByRole("button", { name: "Sprawdź odpowiedź" }),
    ).toBeDisabled();
    for (const [i, q] of mission.questions.entries()) {
      await page.locator(".geo-options button").nth(q.correct).click();
      await page.getByRole("button", { name: "Sprawdź odpowiedź" }).click();
      await expect(page.locator(".geo-feedback")).toContainText(
        "Dobra odpowiedź",
      );
      await page
        .getByRole("button", {
          name: i === 5 ? "Zobacz wynik" : "Następne pytanie",
        })
        .click();
    }
    await expect(page.locator(".geo-result-stats")).toContainText(
      index === 5 ? "+0" : "+80",
    );
    await page.getByRole("button", { name: "Wróć do laboratorium" }).click();
  }
  await page.reload();
  await expect(page.getByLabel("Łącznie 400 punktów")).toBeVisible();
  await page.getByRole("button", { name: /Odznaki/ }).click();
  await expect(page.locator(".geo-badges .earned")).toHaveCount(5);
  await page.goto("/dev/geography");
  await expect(page.getByLabel("Łącznie 0 punktów")).toBeVisible();
});
test("all five activities fit a phone viewport without horizontal scrolling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const m of MISSIONS) {
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("button", { name: new RegExp(m.title.replace("?", "\\?")) })
      .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "← Wszystkie misje" }).click();
  }
});
