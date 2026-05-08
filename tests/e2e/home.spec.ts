import { expect, test } from "@playwright/test";

test("home page interactions and motion baseline", async ({ page }) => {
  await page.goto("/");

  const navFrame = page.getByTestId("sticky-nav-frame");
  await expect(navFrame).toBeVisible();
  await expect(page.getByTestId("hero-heading")).toBeVisible();

  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(300);
  await expect(navFrame).toHaveClass(/border-line/);

  const stats = page.getByTestId("stats-row");
  await stats.scrollIntoViewIfNeeded();
  const firstMetric = page.getByTestId("metric-value-0");
  await expect(firstMetric).toContainText("25+");

  await page.getByTestId("service-tab-surveys").click();
  await expect(page.getByTestId("service-tab-panel")).toContainText("License Plate Survey");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.evaluate(() => window.scrollTo(0, 0));
  await stats.scrollIntoViewIfNeeded();
  await expect(firstMetric).toContainText("25+");
});

test("mobile menu and contact form validation", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  await page.goto("/");
  const toggle = page.getByLabel("Toggle menu");
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Mobile Primary" })).toBeVisible();

  await page.goto("/contact-us");
  await expect(page.getByRole("button", { name: "Submit Inquiry" })).toBeDisabled();

  await page.getByLabel(/Full Name/i).fill("QA Tester");
  await page.getByLabel(/Email/i).fill("qa@example.com");
  await page.getByLabel(/Topic/i).selectOption("general");
  await page.getByLabel(/Message/i).fill(
    "Need a quote for a weekday turning movement count at three intersections next month.",
  );

  await page.getByRole("button", { name: "Submit Inquiry" }).click();
  await expect(page.getByText(/Contact endpoint is not configured/i)).toBeVisible();

  await context.close();
});
