import { expect, test } from "@playwright/test";

const nonHomeRoutes = [
  "/services",
  "/services/counts",
  "/services/surveys",
  "/services/studies",
  "/services/counts/intersection-turning-movement-counts",
  "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts",
  "/services/counts/pedestrian-counts",
  "/services/surveys/license-plate-survey",
  "/services/surveys/parking-occupancy-survey",
  "/services/surveys/vehicle-occupancy-surveys",
  "/services/studies/ball-bank-study",
  "/services/studies/cordon-counts",
  "/services/studies/delay-studies",
  "/services/studies/gap-study",
  "/services/studies/gps-travel-runs",
  "/services/studies/radar-speed-studies",
  "/services/studies/travel-time-studies",
  "/services/customized-data-collection",
  "/contact-us",
] as const;

const pinnedMediaRoutes = [
  "/services",
  "/contact-us",
] as const;

const simpleRoutes = nonHomeRoutes.filter(
  (route) => !pinnedMediaRoutes.includes(route as (typeof pinnedMediaRoutes)[number]),
);

const detailSimpleRoutes = [
  "/services/counts/intersection-turning-movement-counts",
  "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts",
  "/services/counts/pedestrian-counts",
  "/services/surveys/license-plate-survey",
  "/services/surveys/parking-occupancy-survey",
  "/services/surveys/vehicle-occupancy-surveys",
  "/services/studies/ball-bank-study",
  "/services/studies/cordon-counts",
  "/services/studies/delay-studies",
  "/services/studies/gap-study",
  "/services/studies/gps-travel-runs",
  "/services/studies/radar-speed-studies",
  "/services/studies/travel-time-studies",
] as const;

test("homepage stays isolated from non-home pinned media stack", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('[data-testid="pinned-media-stack"]')).toHaveCount(0);
});

test("only services and contact routes mount pinned media stack", async ({ page }) => {
  for (const route of pinnedMediaRoutes) {
    await page.goto(route);
    await expect(page.locator('[data-testid="pinned-media-stack"]').first()).toBeVisible();
  }
});

test("all other non-home routes do not mount pinned media stack", async ({ page }) => {
  for (const route of simpleRoutes) {
    await page.goto(route);
    await expect(page.locator('[data-testid="pinned-media-stack"]')).toHaveCount(0);
  }
});

test("category family routes keep unique simplified components", async ({ page }) => {
  await page.goto("/services/counts");
  await expect(page.locator('[data-testid="spotlight-counts-board"]')).toBeVisible();

  await page.goto("/services/surveys");
  await expect(page.locator('[data-testid="spotlight-surveys-matrix"]')).toBeVisible();

  await page.goto("/services/studies");
  await expect(page.locator('[data-testid="spotlight-studies-atlas"]')).toBeVisible();

  await page.goto("/services/customized-data-collection");
  await expect(page.locator('[data-testid="spotlight-custom-blueprint"]')).toBeVisible();
});

test("detail family routes render unique simple detail components", async ({ page }) => {
  for (const route of detailSimpleRoutes.slice(0, 3)) {
    await page.goto(route);
    await expect(page.locator('[data-testid="detail-counts-field-planner"]')).toBeVisible();
  }

  for (const route of detailSimpleRoutes.slice(3, 6)) {
    await page.goto(route);
    await expect(page.locator('[data-testid="detail-surveys-tradeoff-workbench"]')).toBeVisible();
  }

  for (const route of detailSimpleRoutes.slice(6)) {
    await page.goto(route);
    await expect(page.locator('[data-testid="detail-studies-question-navigator"]')).toBeVisible();
  }
});

test("counts detail planner remains route-specific", async ({ page }) => {
  const planner = page.locator('[data-testid="detail-counts-field-planner"]');

  await page.goto("/services/counts/intersection-turning-movement-counts");
  await expect(planner).toContainText("Intersection Turning Movement Counts");
  await expect(planner).not.toContainText("ATR Volume, Classification, and Speed Counts");
  await expect(planner).not.toContainText("Pedestrian Counts");
  await expect(planner).not.toContainText("Open related detail");

  await page.goto("/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts");
  await expect(planner).toContainText("ATR Volume, Classification, and Speed Counts");
  await expect(planner).not.toContainText("Intersection Turning Movement Counts");
  await expect(planner).not.toContainText("Pedestrian Counts");
  await expect(planner).not.toContainText("Open related detail");

  await page.goto("/services/counts/pedestrian-counts");
  await expect(planner).toContainText("Pedestrian Counts");
  await expect(planner).not.toContainText("Intersection Turning Movement Counts");
  await expect(planner).not.toContainText("ATR Volume, Classification, and Speed Counts");
  await expect(planner).not.toContainText("Open related detail");
});

test("surveys detail workbench remains route-specific", async ({ page }) => {
  const workbench = page.locator('[data-testid="detail-surveys-tradeoff-workbench"]');

  await page.goto("/services/surveys/license-plate-survey");
  await expect(workbench).toContainText("License Plate Survey");
  await expect(workbench).not.toContainText("Parking Utilization Survey");
  await expect(workbench).not.toContainText("Vehicle Occupancy Surveys");
  await expect(workbench).not.toContainText("Open related detail");

  await page.goto("/services/surveys/parking-occupancy-survey");
  await expect(workbench).toContainText("Parking Utilization Survey");
  await expect(workbench).not.toContainText("License Plate Survey");
  await expect(workbench).not.toContainText("Vehicle Occupancy Surveys");
  await expect(workbench).not.toContainText("Open related detail");

  await page.goto("/services/surveys/vehicle-occupancy-surveys");
  await expect(workbench).toContainText("Vehicle Occupancy Surveys");
  await expect(workbench).not.toContainText("License Plate Survey");
  await expect(workbench).not.toContainText("Parking Utilization Survey");
  await expect(workbench).not.toContainText("Open related detail");
});

test("studies detail navigator remains route-specific", async ({ page }) => {
  const navigator = page.locator('[data-testid="detail-studies-question-navigator"]');
  const cases = [
    {
      route: "/services/studies/ball-bank-study",
      title: "Ball Bank Study",
      hidden: ["Cordon Counts", "Delay Studies", "GAP Study", "GPS Travel Runs", "Radar Speed Studies", "Travel Time Studies"],
    },
    {
      route: "/services/studies/cordon-counts",
      title: "Cordon Counts",
      hidden: ["Ball Bank Study", "Delay Studies", "GAP Study", "GPS Travel Runs", "Radar Speed Studies", "Travel Time Studies"],
    },
    {
      route: "/services/studies/delay-studies",
      title: "Delay Studies",
      hidden: ["Ball Bank Study", "Cordon Counts", "GAP Study", "GPS Travel Runs", "Radar Speed Studies", "Travel Time Studies"],
    },
    {
      route: "/services/studies/gap-study",
      title: "GAP Study",
      hidden: ["Ball Bank Study", "Cordon Counts", "Delay Studies", "GPS Travel Runs", "Radar Speed Studies", "Travel Time Studies"],
    },
    {
      route: "/services/studies/gps-travel-runs",
      title: "GPS Travel Runs",
      hidden: ["Ball Bank Study", "Cordon Counts", "Delay Studies", "GAP Study", "Radar Speed Studies", "Travel Time Studies"],
    },
    {
      route: "/services/studies/radar-speed-studies",
      title: "Radar Speed Studies",
      hidden: ["Ball Bank Study", "Cordon Counts", "Delay Studies", "GAP Study", "GPS Travel Runs", "Travel Time Studies"],
    },
    {
      route: "/services/studies/travel-time-studies",
      title: "Travel Time Studies",
      hidden: ["Ball Bank Study", "Cordon Counts", "Delay Studies", "GAP Study", "GPS Travel Runs", "Radar Speed Studies"],
    },
  ] as const;

  for (const entry of cases) {
    await page.goto(entry.route);
    await expect(navigator).toContainText(entry.title);
    for (const hiddenTitle of entry.hidden) {
      await expect(navigator).not.toContainText(hiddenTitle);
    }
    await expect(navigator).not.toContainText("Open related detail");
  }
});

test("services and contact preserve route-specific pinned experience", async ({ page }) => {
  await page.goto("/services");
  await expect(page.locator('[data-testid="pinned-media-stack"]').first()).toHaveAttribute("data-experience-kind", "surveys_decision_matrix");
  await expect(page.locator('[data-testid="pinned-media-scene-title"]').first()).toBeVisible();

  await page.goto("/contact-us");
  await expect(page.locator('[data-testid="pinned-media-stack"]').first()).toHaveAttribute("data-experience-kind", "contact_intake_console");
  await expect(page.locator('[data-testid="pinned-media-scene-title"]').first()).toContainText(/context|scope|quote/i);
});

test("reduced motion still renders pinned media stack", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();

  await page.goto("/contact-us");

  await expect(page.locator('[data-testid="pinned-media-stack"]')).toBeVisible();
  await expect(page.locator('[data-testid="pinned-media-scene-title"]').first()).toBeVisible();

  await context.close();
});
