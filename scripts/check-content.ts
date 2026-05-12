import { getAllRoutes, loadAllPages } from "../lib/content";
import { resolveRouteLayout, routeMotionConfig } from "../lib/layout-orchestration";
import { getRouteMediaStory } from "../lib/media-assets";

const requiredRoutes = [
  "/",
  "/services",
  "/services/counts",
  "/services/surveys",
  "/services/studies",
  "/services/customized-data-collection",
  "/contact-us",
  "/services/counts/intersection-turning-movement-counts",
  "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts",
  "/services/counts/pedestrian-counts",
  "/services/surveys/license-plate-survey",
  "/services/surveys/parking-occupancy-survey",
  "/services/surveys/vehicle-occupancy-surveys",
  "/services/studies/ball-bank-study",
  "/services/studies/travel-time-studies",
  "/services/studies/delay-studies",
  "/services/studies/radar-speed-studies",
  "/services/studies/cordon-counts",
  "/services/studies/gap-study",
  "/services/studies/gps-travel-runs",
];

function isInternalLink(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function normalizeRoute(href: string) {
  return href.split("#")[0] || "/";
}

async function main() {
  const pages = await loadAllPages();
  const routes = await getAllRoutes();
  const routeSet = new Set(routes);

  const errors: string[] = [];

  for (const route of requiredRoutes) {
    if (!routeSet.has(route)) {
      errors.push(`Missing required route: ${route}`);
    }
  }

  for (const page of pages) {
    const layout = resolveRouteLayout(page);

    if (page.route !== "/") {
      if (!layout) {
        errors.push(`Missing layout resolution for non-home route: ${page.route}`);
      } else {
        if (!routeMotionConfig[page.route]) {
          errors.push(`Missing explicit routeMotionConfig entry: ${page.route}`);
        }

        if (layout.mediaMode !== "abstract") {
          const mediaStory = getRouteMediaStory(page.route, layout.mediaSlot, layout.experienceConfig.assetBundleId);
          if (!mediaStory) {
            errors.push(`Missing media story for route: ${page.route}`);
          } else if (mediaStory.scenes.length < 2) {
            errors.push(`Expected at least 2 media scenes on route: ${page.route}`);
          }
        }
      }
    }

    if (page.serviceGroups) {
      for (const group of page.serviceGroups) {
        for (const item of group.items) {
          if (isInternalLink(item.href) && !routeSet.has(normalizeRoute(item.href))) {
            errors.push(`Orphan service link on ${page.route}: ${item.href}`);
          }
        }
      }
    }

    if (page.relatedLinks) {
      for (const link of page.relatedLinks) {
        if (isInternalLink(link.href) && !routeSet.has(normalizeRoute(link.href))) {
          errors.push(`Orphan related link on ${page.route}: ${link.href}`);
        }
      }
    }

    if (page.hero) {
      const heroLinks = [page.hero.primaryCta.href, page.hero.secondaryCta?.href].filter(
        (href): href is string => Boolean(href),
      );

      for (const href of heroLinks) {
        if (isInternalLink(href) && !routeSet.has(normalizeRoute(href))) {
          errors.push(`Orphan hero CTA link on ${page.route}: ${href}`);
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error("Content integrity check failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Content integrity check passed for ${pages.length} pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
