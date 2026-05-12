"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { surfacePanel } from "@/components/ui/patterns";
import type { ToneVariant } from "@/lib/theme";
import type { DetailSectionBlock, ServiceGroupBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

type SimpleFamilyRoute =
  | "/services/counts"
  | "/services/surveys"
  | "/services/studies"
  | "/services/customized-data-collection";

export interface FamilySpotlightItem {
  id: string;
  title: string;
  href: string;
  summary: string;
  method: string;
  capturedData: string;
  typicalUse: string;
  decisionOutcome?: string;
  categoryId?: string;
}

interface FamilySpotlightCategory {
  id: string;
  label: string;
}

interface CustomRequirement {
  id: string;
  label: string;
  signal: string;
  recommendedMix: string;
  outputs: string;
}

interface FamilySpotlightConfig {
  heading: string;
  intro: string;
  items: FamilySpotlightItem[];
  categories?: FamilySpotlightCategory[];
  requirements?: CustomRequirement[];
}

export interface SimpleFamilySpotlightProps {
  route: SimpleFamilyRoute;
  tone: ToneVariant;
  group?: ServiceGroupBlock;
  detail?: DetailSectionBlock;
}

export const familySpotlightContentByRoute: Record<SimpleFamilyRoute, FamilySpotlightConfig> = {
  "/services/counts": {
    heading: "Collection methods, simplified",
    intro:
      "Each count method is mapped to how data is captured and where it is most useful, based on TSA's core counts capabilities.",
    items: [
      {
        id: "counts-turning",
        title: "Intersection Turning Movement Counts",
        href: "/services/counts/intersection-turning-movement-counts",
        summary: "Captures turning behavior at intersections, parking lots, and neighborhood entry or exit points.",
        method: "Manual count boards or video camera technology.",
        capturedData: "Direction of travel, turning movements, vehicle classification and size, plus occupancy tags.",
        typicalUse: "Transportation planning, infrastructure development, and traffic management strategy.",
      },
      {
        id: "counts-atr",
        title: "ATR Volume, Classification, and Speed Counts",
        href: "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts",
        summary: "Automated roadway capture for continuous and high-volume traffic monitoring.",
        method: "ATR counters, pneumatic road tubes, loop detectors, and video where tubes are not suitable.",
        capturedData: "Total volume, vehicle class by type and size, and speed measurements.",
        typicalUse: "Corridor baselines, trend monitoring, and operational performance comparisons.",
      },
      {
        id: "counts-ped",
        title: "Pedestrian Counts",
        href: "/services/counts/pedestrian-counts",
        summary: "Focuses on pedestrian movement and activity patterns in specific areas.",
        method: "Manual counts, video-based surveys, or advanced sensors.",
        capturedData: "Pedestrian volume, peak periods, route patterns, and movement distribution.",
        typicalUse: "Urban planning, pedestrian safety reviews, and active transportation design.",
      },
    ],
  },
  "/services/surveys": {
    heading: "Survey options and decision outcomes",
    intro:
      "Survey paths are organized by what they observe and what decisions they support, aligned to TSA's published survey methods.",
    items: [
      {
        id: "surveys-license",
        title: "License Plate Survey",
        href: "/services/surveys/license-plate-survey",
        summary: "LPRS workflow for movement-pattern and origin-destination analysis.",
        method: "Licensed infrared cameras with plate-recognition software.",
        capturedData: "License plates and timestamps across weather and lighting conditions (95%+ accuracy in source claims).",
        typicalUse: "Route-choice analysis, OD pattern studies, and movement correlation.",
        decisionOutcome: "Clarifies origin-destination behavior and route distribution trends.",
      },
      {
        id: "surveys-parking",
        title: "Parking Utilization Survey",
        href: "/services/surveys/parking-occupancy-survey",
        summary: "Measures parking demand and occupancy by zone and period.",
        method: "Manual count boards or advanced video capture at scheduled intervals.",
        capturedData: "Total spots, occupancy demand, parking duration, and classification segments.",
        typicalUse: "Parking management, capacity planning, and utilization optimization.",
        decisionOutcome: "Identifies peak pressure windows and zone-level parking imbalances.",
      },
      {
        id: "surveys-occupancy",
        title: "Vehicle Occupancy Surveys",
        href: "/services/surveys/vehicle-occupancy-surveys",
        summary: "Evaluates occupants per vehicle at target locations and roadways.",
        method: "Manual observation, video recording, or sensor-assisted capture.",
        capturedData: "Occupants per vehicle and occupancy trends by location and period.",
        typicalUse: "Transportation efficiency, demand planning, and policy evaluation.",
        decisionOutcome: "Supports person-throughput and carpool effectiveness decisions.",
      },
    ],
  },
  "/services/studies": {
    heading: "Study families by decision type",
    intro:
      "Study methods are grouped by the technical question they answer, while preserving TSA's seven published study families.",
    categories: [
      { id: "safety-speed", label: "Safety and speed" },
      { id: "flow-reliability", label: "Flow and reliability" },
      { id: "network-patterns", label: "Network patterns" },
    ],
    items: [
      {
        id: "studies-ball-bank",
        title: "Ball Bank Study",
        href: "/services/studies/ball-bank-study",
        summary: "Determines ramp or bank incline behavior at different speeds.",
        method: "Ball-tilt measurement across multiple operating speeds.",
        capturedData: "Incline response and practical maximum safe-speed indicators.",
        typicalUse: "Advisory speed setting and inclined-road safety review.",
        categoryId: "safety-speed",
      },
      {
        id: "studies-radar-speed",
        title: "Radar Speed Studies",
        href: "/services/studies/radar-speed-studies",
        summary: "Measures and analyzes speed behavior in a target area.",
        method: "Radar devices and speed-gun workflows at strategic points.",
        capturedData: "Average speed, maximum speed, and time-based speed distribution.",
        typicalUse: "Speed management strategy and roadway safety intervention planning.",
        categoryId: "safety-speed",
      },
      {
        id: "studies-gap",
        title: "GAP Study",
        href: "/services/studies/gap-study",
        summary: "Analyzes time gaps between vehicles in traffic streams.",
        method: "Observation points with time-gap measurement methodology.",
        capturedData: "Gap intervals and stream behavior relevant to crossing feasibility.",
        typicalUse: "Pedestrian crossing planning and intersection control design.",
        categoryId: "safety-speed",
      },
      {
        id: "studies-travel-time",
        title: "Travel Time Studies",
        href: "/services/studies/travel-time-studies",
        summary: "Quantifies route performance between origin and destination points.",
        method: "Tracked runs across multi-site routes during survey windows.",
        capturedData: "Route completion times, congestion trends, and travel pattern signals.",
        typicalUse: "Bottleneck analysis and route-optimization planning.",
        categoryId: "flow-reliability",
      },
      {
        id: "studies-delay",
        title: "Delay Studies",
        href: "/services/studies/delay-studies",
        summary: "Measures stopped or slow-moving time at congested locations.",
        method: "Targeted intersection or corridor delay capture and analysis.",
        capturedData: "Delay duration, affected vehicle volume, and congestion hotspots.",
        typicalUse: "Signal-timing evaluation and congestion-mitigation prioritization.",
        categoryId: "flow-reliability",
      },
      {
        id: "studies-gps",
        title: "GPS Travel Runs",
        href: "/services/studies/gps-travel-runs",
        summary: "Uses GPS-equipped runs to evaluate bidirectional route travel time.",
        method: "Repeated A<->B runs with in-flow GPS tracking.",
        capturedData: "Travel-time series, average duration, and reliability variation.",
        typicalUse: "Route-performance baselining and travel-efficiency analysis.",
        categoryId: "flow-reliability",
      },
      {
        id: "studies-cordon",
        title: "Cordon Counts",
        href: "/services/studies/cordon-counts",
        summary: "Assesses movement into and out of a defined area boundary.",
        method: "Count stations at key entry and exit points around a cordon.",
        capturedData: "Volume, movement patterns, travel-time traces, and OD flow indicators.",
        typicalUse: "Area mobility planning and zone-level traffic distribution analysis.",
        categoryId: "network-patterns",
      },
    ],
  },
  "/services/customized-data-collection": {
    heading: "Custom scope blueprint",
    intro:
      "Customized programs are structured around your project constraints, then matched to the method mix and reporting outputs that fit your objective and budget.",
    items: [
      {
        id: "custom-inputs",
        title: "Inputs",
        href: "/services/customized-data-collection",
        summary: "Project objectives, constraints, locations, and required data parameters.",
        method: "Scope intake focused on survey requirements, budget, and delivery timeline.",
        capturedData: "Target corridors or sites, specific variables, and acceptance criteria.",
        typicalUse: "Frames the program design before field execution begins.",
      },
      {
        id: "custom-method-mix",
        title: "Method mix",
        href: "/services/customized-data-collection",
        summary: "Combines methods that best fit the requirement profile.",
        method: "Manual counts, automated counters, video-based surveys, and GPS tracking.",
        capturedData: "Multi-source observations stitched into a unified dataset.",
        typicalUse: "Handles mixed-method, multi-location, or non-standard collection scopes.",
      },
      {
        id: "custom-outputs",
        title: "Outputs",
        href: "/services/customized-data-collection",
        summary: "Delivers report-ready data tailored to stakeholder needs.",
        method: "Quality-controlled packaging with agreed reporting structure.",
        capturedData: "Tabulations, assumptions, and scope-aligned analysis outputs.",
        typicalUse: "Supports planning, design, and review workflows with usable deliverables.",
      },
    ],
    requirements: [
      {
        id: "req-specialized",
        label: "Specialized parameters",
        signal: "You need non-standard fields beyond a typical count package.",
        recommendedMix: "Combine manual validation with automated capture for precision and scale.",
        outputs: "Expanded field dictionary, custom tabulations, and method notes.",
      },
      {
        id: "req-multisite",
        label: "Multi-site or phased program",
        signal: "Collection spans many locations or staged deployment windows.",
        recommendedMix: "Phased sequencing across counts, surveys, and study modules.",
        outputs: "Stage-based datasets with cross-site comparability and QA checkpoints.",
      },
      {
        id: "req-budget",
        label: "Budget-driven design",
        signal: "Scope must be optimized to budget while protecting data value.",
        recommendedMix: "Priority sampling with the most cost-effective capture mix per site.",
        outputs: "Lean core deliverables with optional add-on analysis blocks.",
      },
      {
        id: "req-reporting",
        label: "Custom reporting format",
        signal: "You need outputs tailored for specific stakeholder workflows.",
        recommendedMix: "Method selection tied directly to required reporting structure.",
        outputs: "Format-aligned tables and interpretation-ready summary sections.",
      },
    ],
  },
};

function withGroupLinks(items: FamilySpotlightItem[], group?: ServiceGroupBlock) {
  if (!group) {
    return items;
  }

  return items.map((item) => {
    const matchingService = group.items.find((groupItem) => groupItem.title.toLowerCase() === item.title.toLowerCase());
    if (!matchingService) {
      return item;
    }

    return { ...item, href: matchingService.href };
  });
}

export function SimpleFamilySpotlight({ route, tone, group, detail }: SimpleFamilySpotlightProps) {
  const config = familySpotlightContentByRoute[route];
  const mappedItems = useMemo(() => withGroupLinks(config.items, group), [config.items, group]);

  if (route === "/services/counts") {
    return <CountsMethodBoard heading={config.heading} intro={config.intro} items={mappedItems} tone={tone} />;
  }

  if (route === "/services/surveys") {
    return <SurveysDecisionMatrixLite heading={config.heading} intro={config.intro} items={mappedItems} tone={tone} />;
  }

  if (route === "/services/studies") {
    return (
      <StudiesCapabilityAtlasLite
        categories={config.categories ?? []}
        heading={config.heading}
        intro={config.intro}
        items={mappedItems}
        tone={tone}
      />
    );
  }

  return (
    <CustomScopeBlueprintLite
      detail={detail}
      heading={config.heading}
      intro={config.intro}
      items={mappedItems}
      requirements={config.requirements ?? []}
      tone={tone}
    />
  );
}

function CountsMethodBoard({
  heading,
  intro,
  items,
  tone,
}: {
  heading: string;
  intro: string;
  items: FamilySpotlightItem[];
  tone: ToneVariant;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];

  return (
    <section className="px-5 pb-18 pt-8 sm:px-8 lg:px-10" data-testid="spotlight-counts-board">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-[clamp(1.9rem,3.3vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 max-w-3xl text-base leading-8 text-ink/75">{intro}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className={cn(surfacePanel({ padding: "md" }), tone.accentBorder, "space-y-2")}>
              {items.map((item, index) => (
                <button
                  key={item.id}
                  aria-pressed={index === activeIndex}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left transition",
                    index === activeIndex
                      ? cn("bg-paper shadow-[0_8px_22px_rgba(18,14,11,0.08)]", tone.accentBorder)
                      : "border-line/80 bg-paper/75 hover:border-line",
                  )}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  type="button"
                >
                  <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                    Count Method {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-heading text-lg font-semibold text-ink">{item.title}</p>
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <article className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder, "h-full")}>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>
                Captured profile
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-ink">{active.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/75">{active.summary}</p>
              <dl className="mt-5 grid gap-4">
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Method</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.method}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Captured data</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.capturedData}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Typical use</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.typicalUse}</dd>
                </div>
              </dl>
              <Link className={cn("mt-5 inline-flex text-sm font-semibold transition hover:opacity-85", tone.accentText)} href={active.href}>
                Open service detail {"->"}
              </Link>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SurveysDecisionMatrixLite({
  heading,
  intro,
  items,
  tone,
}: {
  heading: string;
  intro: string;
  items: FamilySpotlightItem[];
  tone: ToneVariant;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];

  return (
    <section className="bg-sand px-5 py-16 sm:px-8 lg:px-10" data-testid="spotlight-surveys-matrix">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-[clamp(1.9rem,3.3vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 max-w-3xl text-base leading-8 text-ink/75">{intro}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal>
            <div className={cn(surfacePanel({ padding: "md" }), tone.accentBorder, "divide-y divide-line/90")}>
              {items.map((item, index) => (
                <button
                  key={item.id}
                  aria-pressed={index === activeIndex}
                  className={cn(
                    "group grid w-full gap-2 px-2 py-4 text-left transition sm:grid-cols-[0.92fr_1.08fr]",
                    index === activeIndex ? "bg-paper/92" : "bg-transparent hover:bg-paper/76",
                  )}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  type="button"
                >
                  <div>
                    <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                      Survey {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 font-heading text-lg font-semibold text-ink">{item.title}</p>
                  </div>
                  <div className="text-sm leading-6 text-ink/72">
                    <p>{item.capturedData}</p>
                  </div>
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <aside className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder, "h-full")}>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>
                Decision outcome
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-ink">{active.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/75">{active.summary}</p>
              <dl className="mt-5 grid gap-4">
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Method</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.method}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Typical use</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.typicalUse}</dd>
                </div>
              </dl>
              <p className="mt-5 rounded-xl border border-line/80 bg-paper/80 px-4 py-3 text-sm leading-7 text-ink/75">
                {active.decisionOutcome}
              </p>
              <Link className={cn("mt-5 inline-flex text-sm font-semibold transition hover:opacity-85", tone.accentText)} href={active.href}>
                Open service detail {"->"}
              </Link>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StudiesCapabilityAtlasLite({
  heading,
  intro,
  categories,
  items,
  tone,
}: {
  heading: string;
  intro: string;
  categories: FamilySpotlightCategory[];
  items: FamilySpotlightItem[];
  tone: ToneVariant;
}) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "");
  const filteredItems = useMemo(() => items.filter((item) => item.categoryId === activeCategoryId), [activeCategoryId, items]);
  const [activeItemId, setActiveItemId] = useState("");

  const activeItem = useMemo(() => {
    const fromFiltered = filteredItems.find((item) => item.id === activeItemId);
    if (fromFiltered) {
      return fromFiltered;
    }

    return filteredItems[0] ?? items[0];
  }, [activeItemId, filteredItems, items]);

  return (
    <section className="px-5 py-16 sm:px-8 lg:px-10" data-testid="spotlight-studies-atlas">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-[clamp(1.9rem,3.3vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 max-w-3xl text-base leading-8 text-ink/75">{intro}</p>
        </Reveal>
        <div className={cn("mt-8 rounded-[1.4rem] border p-5 sm:p-6", tone.accentBorder, tone.accentSoftBg)}>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                aria-pressed={category.id === activeCategoryId}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.11em] transition",
                  category.id === activeCategoryId
                    ? cn("bg-paper shadow-[0_8px_22px_rgba(18,14,11,0.06)]", tone.accentBorder, tone.accentText)
                    : "border-line/80 bg-paper/76 text-ink/70 hover:border-line",
                )}
                onClick={() => {
                  setActiveCategoryId(category.id);
                  setActiveItemId("");
                }}
                type="button"
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-wrap gap-2">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  aria-pressed={item.id === activeItem.id}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm transition",
                    item.id === activeItem.id ? cn("bg-paper", tone.accentBorder, tone.accentText) : "border-line/85 bg-paper/82 text-ink/72 hover:border-line",
                  )}
                  onClick={() => {
                    setActiveItemId(item.id);
                  }}
                  type="button"
                >
                  {item.title}
                </button>
              ))}
            </div>
            <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder)}>
              <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                Selected study
              </p>
              <h3 className="mt-2 font-heading text-xl font-semibold leading-tight text-ink">{activeItem.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink/75">{activeItem.summary}</p>
              <dl className="mt-4 grid gap-3">
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Method</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{activeItem.method}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Captured data</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{activeItem.capturedData}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Typical use</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{activeItem.typicalUse}</dd>
                </div>
              </dl>
              <Link className={cn("mt-4 inline-flex text-sm font-semibold transition hover:opacity-85", tone.accentText)} href={activeItem.href}>
                Open service detail {"->"}
              </Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function CustomScopeBlueprintLite({
  heading,
  intro,
  items,
  requirements,
  tone,
  detail,
}: {
  heading: string;
  intro: string;
  items: FamilySpotlightItem[];
  requirements: CustomRequirement[];
  tone: ToneVariant;
  detail?: DetailSectionBlock;
}) {
  const [activeRequirementId, setActiveRequirementId] = useState(requirements[0]?.id ?? "");
  const activeRequirement = requirements.find((requirement) => requirement.id === activeRequirementId) ?? requirements[0];

  return (
    <section className="bg-sand px-5 py-16 sm:px-8 lg:px-10" data-testid="spotlight-custom-blueprint">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-heading text-[clamp(1.9rem,3.3vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 max-w-3xl text-base leading-8 text-ink/75">{intro}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
          <Reveal>
            <div className={cn("space-y-3 rounded-[1.4rem] border p-4 sm:p-5", tone.accentBorder, "bg-paper/88")}>
              {items.map((item, index) => (
                <article
                  key={item.id}
                  className={cn("rounded-xl border border-line/85 bg-paper/86 p-4", index === 1 ? tone.accentBorder : "")}
                >
                  <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                    Stage {String(index + 1).padStart(2, "0")} - {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink/76">{item.summary}</p>
                  <p className="mt-2 text-sm leading-7 text-ink/70">
                    <span className="font-semibold text-ink/78">Method:</span> {item.method}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder, "h-full")}>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>
                Requirement selector
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {requirements.map((requirement) => (
                  <button
                    key={requirement.id}
                    aria-pressed={requirement.id === activeRequirement?.id}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition",
                      requirement.id === activeRequirement?.id
                        ? cn("bg-paper", tone.accentBorder, tone.accentText)
                        : "border-line/85 bg-paper/82 text-ink/70 hover:border-line",
                    )}
                    onClick={() => {
                      setActiveRequirementId(requirement.id);
                    }}
                    type="button"
                  >
                    {requirement.label}
                  </button>
                ))}
              </div>
              {activeRequirement ? (
                <div className="mt-4 grid gap-3">
                  <p className="rounded-xl border border-line/80 bg-paper/76 px-4 py-3 text-sm leading-7 text-ink/75">
                    <span className="font-semibold text-ink/78">Signal:</span> {activeRequirement.signal}
                  </p>
                  <p className="rounded-xl border border-line/80 bg-paper/76 px-4 py-3 text-sm leading-7 text-ink/75">
                    <span className="font-semibold text-ink/78">Recommended method mix:</span> {activeRequirement.recommendedMix}
                  </p>
                  <p className="rounded-xl border border-line/80 bg-paper/76 px-4 py-3 text-sm leading-7 text-ink/75">
                    <span className="font-semibold text-ink/78">Expected outputs:</span> {activeRequirement.outputs}
                  </p>
                </div>
              ) : null}
              {detail ? (
                <p className="mt-4 text-sm leading-7 text-ink/72">
                  {detail.keyPoints[0] ? `${detail.keyPoints[0]} ` : ""}
                  {detail.deliverables[0] ? `${detail.deliverables[0]}.` : ""}
                </p>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
