import type { ResolvedRouteLayout } from "@/lib/layout-orchestration";
import type { RouteMediaStory } from "@/lib/media-assets";
import type { ToneVariant } from "@/lib/theme";
import type { PageContent } from "@/lib/types";

export interface RouteFamilyLayoutsPropsWithTone {
  page: PageContent;
  layout: ResolvedRouteLayout;
  mediaStory: RouteMediaStory | null;
  tone: ToneVariant;
}
