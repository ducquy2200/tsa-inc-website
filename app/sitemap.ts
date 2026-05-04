import type { MetadataRoute } from "next";

import { getAllRoutes } from "@/lib/content";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getAllRoutes();

  return routes.map((route) => ({
    url: `https://www.tsa-inc.ca${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
