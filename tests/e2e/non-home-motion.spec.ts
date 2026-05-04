import { expect, test } from "@playwright/test";

const nonHomeRoutes = [
  "/counts",
  "/surveys",
  "/studies",
  "/counts/intersection-turning-movement-counts",
  "/counts/atr-volume-classification-loop-detector-and-road-tube-counts",
  "/counts/pedestrian-counts",
  "/surveys/license-plate-survey",
  "/surveys/parking-occupancy-survey",
  "/surveys/vehicle-occupancy-surveys",
  "/ball-bank-study",
  "/cordon-counts",
  "/delay-studies",
  "/gap-study",
  "/gps-travel-runs",
  "/radar-speed-studies",
  "/travel-time-studies",
  "/customized-data-collection",
  "/contact-us",
] as const;

test("homepage stays isolated from non-home pinned media stack", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('[data-testid="pinned-media-stack"]')).toHaveCount(0);
});

test("all non-home routes mount pinned media stack", async ({ page }) => {
  for (const route of nonHomeRoutes) {
    await page.goto(route);
    await expect(page.locator('[data-testid="pinned-media-stack"]').first()).toBeVisible();
  }
});

test("scene text remains route-specific in pinned media stack", async ({ page }) => {
  await page.goto("/counts");
  await expect(page.locator('[data-testid="pinned-media-scene-title"]').first()).toContainText(/network|directional|context/i);

  await page.goto("/surveys/parking-occupancy-survey");
  await expect(page.locator('[data-testid="pinned-media-scene-title"]').first()).toContainText(/zone|occupancy|inventory/i);

  await page.goto("/contact-us");
  await expect(page.locator('[data-testid="pinned-media-scene-title"]').first()).toContainText(/context|scope|quote/i);
});

test("reduced motion still renders pinned media stack", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();

  await page.goto("/studies");

  await expect(page.locator('[data-testid="pinned-media-stack"]')).toBeVisible();
  await expect(page.locator('[data-testid="pinned-media-scene-title"]').first()).toBeVisible();

  await context.close();
});
