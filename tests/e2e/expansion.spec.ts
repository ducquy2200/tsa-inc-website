import { expect, test } from "@playwright/test";

const expansionRoutes = [
  "/methodology",
  "/methodology/atr-counts",
  "/methodology/turning-movement-counts",
  "/methodology/parking-utilization-survey",
  "/methodology/license-plate-survey",
  "/methodology/ball-bank-study",
  "/methodology/travel-time-studies",
  "/methodology/delay-studies",
  "/methodology/radar-speed-study",
  "/methodology/gap-study",
  "/methodology/cordon-counts",
  "/methodology/customized-data-collection",
  "/resources",
  "/resources/service-selection-guide",
  "/resources/scheduling-and-duration-guide",
  "/resources/deliverables-and-report-formats",
] as const;

test("all expansion routes resolve", async ({ page }) => {
  for (const route of expansionRoutes) {
    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator('[data-testid="pinned-media-stack"]')).toHaveCount(0);
  }
});

test("desktop nav shows Methodology and Resources with active state", async ({ page }) => {
  await page.goto("/methodology");
  const desktopNav = page.getByRole("navigation", { name: "Primary" });
  const methodologyLink = desktopNav.getByRole("link", { name: "Methodology" });
  const resourcesLink = desktopNav.getByRole("link", { name: "Resources" });

  await expect(methodologyLink).toBeVisible();
  await expect(resourcesLink).toBeVisible();
  await expect(methodologyLink).toHaveClass(/after:scale-x-100/);

  await page.goto("/resources");
  await expect(resourcesLink).toHaveClass(/after:scale-x-100/);
});

test("mobile nav includes Methodology and Resources", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto("/resources");
  await page.getByLabel("Toggle menu").click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile Primary" });
  const methodologyLink = mobileNav.getByRole("link", { name: "Methodology" });
  const resourcesLink = mobileNav.getByRole("link", { name: "Resources" });

  await expect(methodologyLink).toBeVisible();
  await expect(resourcesLink).toBeVisible();
  await expect(resourcesLink).toHaveClass(/bg-sand/);

  await context.close();
});
