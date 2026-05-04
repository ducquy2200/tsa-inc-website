import { CategoryCountsLayout, CategoryStudiesLayout, CategorySurveysLayout } from "@/components/sections/route-families/category-layouts";
import { ContactRouteLayout, CustomProgramLayout } from "@/components/sections/route-families/custom-contact-layouts";
import { DetailCountsLayout, DetailStudiesLayout, DetailSurveysLayout } from "@/components/sections/route-families/detail-layouts";
import { toneVariants } from "@/lib/theme";
import type { ResolvedRouteLayout } from "@/lib/layout-orchestration";
import type { RouteMediaStory } from "@/lib/media-assets";
import type { PageContent } from "@/lib/types";

interface RouteFamilyLayoutsProps {
  page: PageContent;
  layout: ResolvedRouteLayout;
  mediaStory: RouteMediaStory | null;
}

export function RouteFamilyLayouts({ page, layout, mediaStory }: RouteFamilyLayoutsProps) {
  const tone = toneVariants[layout.tone];

  if (layout.family === "category_counts") {
    return <CategoryCountsLayout layout={layout} mediaStory={mediaStory} page={page} tone={tone} />;
  }

  if (layout.family === "category_surveys") {
    return <CategorySurveysLayout layout={layout} mediaStory={mediaStory} page={page} tone={tone} />;
  }

  if (layout.family === "category_studies") {
    return <CategoryStudiesLayout layout={layout} mediaStory={mediaStory} page={page} tone={tone} />;
  }

  if (layout.family === "detail_counts") {
    return <DetailCountsLayout layout={layout} mediaStory={mediaStory} page={page} tone={tone} />;
  }

  if (layout.family === "detail_surveys") {
    return <DetailSurveysLayout layout={layout} mediaStory={mediaStory} page={page} tone={tone} />;
  }

  if (layout.family === "detail_studies") {
    return <DetailStudiesLayout layout={layout} mediaStory={mediaStory} page={page} tone={tone} />;
  }

  if (layout.family === "contact") {
    return <ContactRouteLayout layout={layout} mediaStory={mediaStory} page={page} tone={tone} />;
  }

  return <CustomProgramLayout layout={layout} mediaStory={mediaStory} page={page} tone={tone} />;
}
