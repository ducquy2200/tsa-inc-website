import Image from "next/image";

import { surfacePanel } from "@/components/ui/patterns";
import type { ToneVariant } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface VisualItem {
  src: string;
  alt: string;
  label: string;
  caption: string;
  loading?: "eager" | "lazy";
}

const methodologyHubVisuals: VisualItem[] = [
  {
    src: "/media/method-resource/pex-022-aerial-road-traffic.jpg",
    alt: "Aerial roadway context for scope planning",
    label: "Field setup",
    caption: "Site geometry and capture positioning.",
  },
  {
    src: "/media/method-resource/pex-023-aerial-roads-dallas.jpg",
    alt: "Urban traffic capture activity",
    label: "Capture",
    caption: "Structured observations across target windows.",
  },
  {
    src: "/media/method-resource/pex-024-city-traffic-train.jpg",
    alt: "Network-level traffic view for output review",
    label: "Outputs",
    caption: "Validated datasets for planning and design teams.",
  },
];

const resourcesHubVisuals: VisualItem[] = [
  {
    src: "/media/method-resource/pex-035-aerial-buildings-roads.jpg",
    alt: "Multi-lane traffic stream for service selection context",
    label: "Scope guides",
    caption: "Choose method, schedule, and outputs with clarity.",
    loading: "eager",
  },
  {
    src: "/media/method-resource/pex-033-urban-traffic-scene.jpg",
    alt: "Roundabout traffic pattern for scheduling context",
    label: "Decision support",
    caption: "Practical references for project framing.",
  },
];

const methodologyDetailFallback: VisualItem = {
  src: "/media/method-resource/pex-034-drone-cars-intersection.jpg",
  alt: "Methodology fallback traffic context",
  label: "Method context",
  caption: "Execution snapshots for setup, capture, and QA.",
};

const resourcesDetailFallback: VisualItem = {
  src: "/media/method-resource/pex-031-cars-intersection-mountains.jpg",
  alt: "Resources fallback traffic context",
  label: "Guide context",
  caption: "Reference visuals for selection, scheduling, and reporting.",
};

const methodologyDetailVisualByRoute: Record<string, VisualItem> = {
  "/methodology/atr-counts": {
    src: "/media/method-resource/pex-015-cars-highway-blue-sky.jpg",
    alt: "ATR counts field context",
    label: "ATR counts",
    caption: "Automated counter setup, capture windows, and QA flow.",
  },
  "/methodology/turning-movement-counts": {
    src: "/media/method-resource/pex-010-chicago-intersection.jpg",
    alt: "Turning movement counts at an intersection",
    label: "Turning counts",
    caption: "Approach-level movement capture through peak windows.",
  },
  "/methodology/pedestrian-counts": {
    src: "/media/method-resource/pex-013-city-street-traffic.jpg",
    alt: "Pedestrian count corridor context",
    label: "Pedestrian counts",
    caption: "Pedestrian route and crossing volume collection logic.",
  },
  "/methodology/parking-utilization-survey": {
    src: "/media/method-resource/pex-019-busy-urban-street.jpg",
    alt: "Parking occupancy observation context",
    label: "Parking occupancy",
    caption: "Occupancy, duration, and turnover by interval and zone.",
  },
  "/methodology/license-plate-survey": {
    src: "/media/method-resource/pex-011-city-traffic.jpg",
    alt: "License plate survey corridor context",
    label: "LPRS survey",
    caption: "Camera placement and timestamp match processing flow.",
  },
  "/methodology/vehicle-occupancy-surveys": {
    src: "/media/method-resource/pex-014-cars-on-highway-sign.jpg",
    alt: "Vehicle occupancy survey traffic context",
    label: "Vehicle occupancy",
    caption: "In-vehicle occupancy capture for demand efficiency reviews.",
  },
  "/methodology/ball-bank-study": {
    src: "/media/method-resource/pex-029-aerial-shot-road.jpg",
    alt: "Curve alignment context for ball bank study",
    label: "Ball bank",
    caption: "Curve banking evaluation and superelevation review.",
  },
  "/methodology/travel-time-studies": {
    src: "/media/method-resource/pex-020-cars-driving-highway.jpg",
    alt: "Travel time study route context",
    label: "Travel time",
    caption: "Route run timings and reliability comparisons by period.",
  },
  "/methodology/gps-travel-runs": {
    src: "/media/method-resource/pex-018-wide-aerial-highway.jpg",
    alt: "GPS travel run vehicle perspective",
    label: "GPS runs",
    caption: "Directional GPS route traces and variability interpretation.",
  },
  "/methodology/delay-studies": {
    src: "/media/method-resource/pex-021-busy-highway-city.jpg",
    alt: "Delay study queueing context",
    label: "Delay study",
    caption: "Queue and stoppage behavior across selected windows.",
  },
  "/methodology/radar-speed-study": {
    src: "/media/method-resource/pex-032-cars-road-crossing.jpg",
    alt: "Radar speed study corridor context",
    label: "Radar speed",
    caption: "Speed distribution capture and percentile reporting.",
  },
  "/methodology/gap-study": {
    src: "/media/method-resource/pex-027-cars-street-intersection.jpg",
    alt: "Gap study traffic interval context",
    label: "Gap study",
    caption: "Vehicle interval analysis for crossing feasibility decisions.",
  },
  "/methodology/cordon-counts": {
    src: "/media/method-resource/pex-028-vehicles-on-the-road.jpg",
    alt: "Cordon count boundary traffic context",
    label: "Cordon counts",
    caption: "Boundary crossing volumes aggregated by direction.",
  },
  "/methodology/customized-data-collection": {
    src: "/media/method-resource/pex-016-vehicles-highway-landscape.jpg",
    alt: "Customized data collection mixed-network context",
    label: "Custom program",
    caption: "Multi-method composition aligned to constraints and outputs.",
  },
};

const resourcesDetailVisualByRoute: Record<string, VisualItem> = {
  "/resources/service-selection-guide": {
    src: "/media/method-resource/pex-017-urban-highway-overcast.jpg",
    alt: "Service selection traffic context",
    label: "Service selection",
    caption: "Map project objectives to the best-fit service family.",
  },
  "/resources/scheduling-and-duration-guide": {
    src: "/media/method-resource/pex-026-vehicles-intersection.jpg",
    alt: "Scheduling and duration traffic context",
    label: "Scheduling",
    caption: "Set realistic windows and duration for field collection.",
  },
  "/resources/deliverables-and-report-formats": {
    src: "/media/method-resource/pex-036-cars-driving-city-intersection.jpg",
    alt: "Deliverables and reporting context image",
    label: "Deliverables",
    caption: "Define report structure and output depth up front.",
  },
};

function normalizeRoute(route: string) {
  return route.endsWith("/") ? route.slice(0, -1) : route;
}

function visualForMethodRoute(route: string): VisualItem {
  return methodologyDetailVisualByRoute[normalizeRoute(route)] ?? methodologyDetailFallback;
}

function visualForResourceRoute(route: string): VisualItem {
  return resourcesDetailVisualByRoute[normalizeRoute(route)] ?? resourcesDetailFallback;
}

function VisualCard({
  item,
  tone,
  heightClass,
}: {
  item: VisualItem;
  tone: ToneVariant;
  heightClass: string;
}) {
  return (
    <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder, "h-full")}>
      <div className={cn("relative overflow-hidden rounded-xl border border-line/75 bg-sand/55", heightClass)}>
        <Image
          alt={item.alt}
          className="object-cover"
          fill
          loading={item.loading}
          sizes="(min-width: 1024px) 33vw, 100vw"
          src={item.src}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full border border-paper/35 bg-ink/35 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-paper/88">
          {item.label}
        </div>
      </div>
      <p className="mt-3 text-sm leading-7 text-ink/75">{item.caption}</p>
    </article>
  );
}

export function MethodologyHubVisualStrip({ tone }: { tone: ToneVariant }) {
  return (
    <div className="grid gap-4 md:grid-cols-3" data-testid="methodology-visual-strip">
      {methodologyHubVisuals.map((item) => (
        <VisualCard key={item.src} heightClass="h-44" item={item} tone={tone} />
      ))}
    </div>
  );
}

export function MethodologyDetailVisual({ route, tone }: { route: string; tone: ToneVariant }) {
  return (
    <div data-testid="methodology-detail-visual">
      <VisualCard heightClass="h-52 sm:h-56" item={visualForMethodRoute(route) ?? methodologyDetailFallback} tone={tone} />
    </div>
  );
}

export function ResourcesHubVisualStrip({ tone }: { tone: ToneVariant }) {
  return (
    <div className="grid gap-4 md:grid-cols-2" data-testid="resources-visual-strip">
      {resourcesHubVisuals.map((item) => (
        <VisualCard key={item.src} heightClass="h-48" item={item} tone={tone} />
      ))}
    </div>
  );
}

export function ResourcesDetailVisual({ route, tone }: { route: string; tone: ToneVariant }) {
  return (
    <div data-testid="resources-detail-visual">
      <VisualCard heightClass="h-52 sm:h-56" item={visualForResourceRoute(route)} tone={tone} />
    </div>
  );
}
