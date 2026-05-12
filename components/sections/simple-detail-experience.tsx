"use client";

import Link from "next/link";
import { useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { surfacePanel } from "@/components/ui/patterns";
import type { ToneVariant } from "@/lib/theme";
import type { DetailSectionBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

export type DetailServiceRoute =
  | "/services/counts/intersection-turning-movement-counts"
  | "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts"
  | "/services/counts/pedestrian-counts"
  | "/services/surveys/license-plate-survey"
  | "/services/surveys/parking-occupancy-survey"
  | "/services/surveys/vehicle-occupancy-surveys"
  | "/services/studies/ball-bank-study"
  | "/services/studies/cordon-counts"
  | "/services/studies/delay-studies"
  | "/services/studies/gap-study"
  | "/services/studies/gps-travel-runs"
  | "/services/studies/radar-speed-studies"
  | "/services/studies/travel-time-studies";

type StudiesDetailRoute = Extract<DetailServiceRoute, `/services/studies/${string}`>;

interface DetailExperienceItem {
  id: string;
  title: string;
  href: DetailServiceRoute;
  method: string;
  capturedSignal: string;
  deliveryEmphasis: string;
  bestFor: string;
  question: string;
  categoryId?: string;
}

interface DetailExperienceContent {
  heading: string;
  intro: string;
  items: DetailExperienceItem[];
}

export interface SimpleDetailExperienceProps {
  route: string;
  detail: DetailSectionBlock;
  tone: ToneVariant;
}

const studyDetailHeading = "Study service profile";
const studyDetailIntro =
  "This route profile summarizes the study question, method, captured signal, and delivery emphasis for this study program.";

const studiesDetailItemsByRoute: Record<StudiesDetailRoute, DetailExperienceItem> = {
  "/services/studies/ball-bank-study": {
    id: "study-ball-bank",
    title: "Ball Bank Study",
    href: "/services/studies/ball-bank-study",
    method: "Field tilt-response measurements across controlled speed runs.",
    capturedSignal: "Speed-dependent banking behavior and practical safe-range indicators.",
    deliveryEmphasis: "Interpretation support for advisory speed and curve or ramp safety decisions.",
    bestFor: "Ramp or curve safety review and advisory speed updates.",
    question: "Is roadway bank behavior suitable for current operating speeds?",
  },
  "/services/studies/cordon-counts": {
    id: "study-cordon",
    title: "Cordon Counts",
    href: "/services/studies/cordon-counts",
    method: "Boundary-based count station design across defined entry and exit points.",
    capturedSignal: "Inbound and outbound crossing totals with directional movement distribution.",
    deliveryEmphasis: "Zone-level demand interpretation for planning models and policy scenarios.",
    bestFor: "District access planning and area-wide movement assessment.",
    question: "How does traffic enter, exit, and distribute across the target area?",
  },
  "/services/studies/delay-studies": {
    id: "study-delay",
    title: "Delay Studies",
    href: "/services/studies/delay-studies",
    method: "Queue and delay observation at targeted bottlenecks and intersections.",
    capturedSignal: "Stopped or slow-time behavior and queue progression by period.",
    deliveryEmphasis: "Hotspot ranking and actionable delay summaries for operations review.",
    bestFor: "Signal timing diagnostics and congestion mitigation planning.",
    question: "Where is delay accumulating and how severe is it?",
  },
  "/services/studies/gap-study": {
    id: "study-gap",
    title: "GAP Study",
    href: "/services/studies/gap-study",
    method: "Time-gap measurement by movement and period at selected crossing points.",
    capturedSignal: "Gap distributions and period-based stream behavior variation.",
    deliveryEmphasis: "Safety-oriented interpretation notes for crossing feasibility and access review.",
    bestFor: "Unsignalized crossing design and access management decisions.",
    question: "Do available traffic gaps support safe crossing or turning maneuvers?",
  },
  "/services/studies/gps-travel-runs": {
    id: "study-gps-runs",
    title: "GPS Travel Runs",
    href: "/services/studies/gps-travel-runs",
    method: "GPS-equipped repeat runs for high-resolution route and segment diagnostics.",
    capturedSignal: "Travel-time reliability, variability, and speed profile behavior by period.",
    deliveryEmphasis: "Technical package for model validation and corridor program monitoring.",
    bestFor: "Detailed route diagnostics and network monitoring programs.",
    question: "Which segments create repeated reliability breakdowns?",
  },
  "/services/studies/radar-speed-studies": {
    id: "study-radar-speed",
    title: "Radar Speed Studies",
    href: "/services/studies/radar-speed-studies",
    method: "Calibrated radar capture with directional and period segmentation.",
    capturedSignal: "Speed distributions, percentile outputs, and window-based variation.",
    deliveryEmphasis: "Percentile-focused speed summaries with interpretation for policy and design teams.",
    bestFor: "Speed management, school-area assessments, and corridor safety screening.",
    question: "What are the prevailing and high-end speed behaviors at this location?",
  },
  "/services/studies/travel-time-studies": {
    id: "study-travel-time",
    title: "Travel Time Studies",
    href: "/services/studies/travel-time-studies",
    method: "Route tracking with repeat-run methodology for consistency checks.",
    capturedSignal: "Travel-time by route and segment with peak-period comparison.",
    deliveryEmphasis: "Comparative run analysis with segment delay contribution highlights.",
    bestFor: "Corridor benchmarking and before-after performance studies.",
    question: "How reliably does this corridor perform across key periods?",
  },
};

const detailExperienceContentByRoute: Record<DetailServiceRoute, DetailExperienceContent> = {
  "/services/counts/intersection-turning-movement-counts": {
    heading: "Count service profile",
    intro:
      "This route profile summarizes method, captured signal, and delivery focus for this count program.",
    items: [
      {
        id: "counts-turning",
        title: "Intersection Turning Movement Counts",
        href: "/services/counts/intersection-turning-movement-counts",
        method: "Manual count boards, video capture, or a hybrid workflow by approach.",
        capturedSignal:
          "Direction traveled, turn movement, vehicle class, and optional pedestrian or bicycle movement tags.",
        deliveryEmphasis:
          "Interval movement tables, peak-period summaries, and export-ready files for planning and technical reports.",
        bestFor: "Signal timing, access studies, operational review, and intersection safety planning.",
        question: "Which movements and conflicts are shaping intersection performance?",
      },
    ],
  },
  "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts": {
    heading: "Count service profile",
    intro:
      "This route profile summarizes method, captured signal, and delivery focus for this count program.",
    items: [
      {
        id: "counts-atr",
        title: "ATR Volume, Classification, and Speed Counts",
        href: "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts",
        method: "ATR counters with road tubes, loop detectors, and video where tubing is not suitable.",
        capturedSignal:
          "Continuous volume, class by configured schema, and speed measurements with consistent timestamping.",
        deliveryEmphasis:
          "Hourly and interval summaries, speed percentiles, and QA notes on setup and anomaly handling.",
        bestFor: "Corridor baselines, trend monitoring, and roadway performance programs.",
        question: "What are the recurring demand and speed patterns across this corridor?",
      },
    ],
  },
  "/services/counts/pedestrian-counts": {
    heading: "Count service profile",
    intro:
      "This route profile summarizes method, captured signal, and delivery focus for this count program.",
    items: [
      {
        id: "counts-ped",
        title: "Pedestrian Counts",
        href: "/services/counts/pedestrian-counts",
        method: "Manual observations, video-assisted review, or sensor-supported workflows.",
        capturedSignal:
          "Pedestrian volume, directional distribution, peak periods, and optional route or crossing behavior.",
        deliveryEmphasis:
          "Pedestrian interval tables, peak-window summaries, and context notes for planning and design teams.",
        bestFor: "Active transportation planning, safety audits, and crossing design decisions.",
        question: "Where and when is pedestrian demand concentrated?",
      },
    ],
  },
  "/services/surveys/license-plate-survey": {
    heading: "Survey decision profile",
    intro:
      "This route profile summarizes capture method, decision focus, and output emphasis for this survey.",
    items: [
      {
        id: "survey-license",
        title: "License Plate Survey",
        href: "/services/surveys/license-plate-survey",
        method: "Licensed infrared cameras and recognition software with timestamped capture.",
        capturedSignal: "Plate matches, time pairs, and movement trace points for origin-destination interpretation.",
        deliveryEmphasis:
          "Match-rate summaries, OD matrix development support, and route pattern interpretation notes.",
        bestFor: "Origin-destination analysis, routing behavior, and through-traffic screening.",
        question: "How are vehicles moving between key origins and destinations?",
      },
    ],
  },
  "/services/surveys/parking-occupancy-survey": {
    heading: "Survey decision profile",
    intro:
      "This route profile summarizes capture method, decision focus, and output emphasis for this survey.",
    items: [
      {
        id: "survey-parking",
        title: "Parking Utilization Survey",
        href: "/services/surveys/parking-occupancy-survey",
        method: "Scheduled occupancy observations by block, lot, or zone using manual or video-supported collection.",
        capturedSignal: "Occupancy, turnover, duration indicators, and time-based utilization profiles.",
        deliveryEmphasis:
          "Occupancy heat maps, peak-demand windows, and zone-level utilization interpretation.",
        bestFor: "Parking policy review, curb management, and capacity planning.",
        question: "When and where does parking demand exceed available supply?",
      },
    ],
  },
  "/services/surveys/vehicle-occupancy-surveys": {
    heading: "Survey decision profile",
    intro:
      "This route profile summarizes capture method, decision focus, and output emphasis for this survey.",
    items: [
      {
        id: "survey-occupancy",
        title: "Vehicle Occupancy Surveys",
        href: "/services/surveys/vehicle-occupancy-surveys",
        method: "Manual, video, or sensor-assisted occupancy observation by class and interval.",
        capturedSignal: "Occupants per vehicle with period and directional segmentation.",
        deliveryEmphasis:
          "Occupancy-rate tables, class-level breakdowns, and peak-period interpretation.",
        bestFor: "HOV planning, demand management, and commute efficiency assessments.",
        question: "How efficiently are vehicles carrying people on this route?",
      },
    ],
  },
  "/services/studies/ball-bank-study": {
    heading: studyDetailHeading,
    intro: studyDetailIntro,
    items: [studiesDetailItemsByRoute["/services/studies/ball-bank-study"]],
  },
  "/services/studies/cordon-counts": {
    heading: studyDetailHeading,
    intro: studyDetailIntro,
    items: [studiesDetailItemsByRoute["/services/studies/cordon-counts"]],
  },
  "/services/studies/delay-studies": {
    heading: studyDetailHeading,
    intro: studyDetailIntro,
    items: [studiesDetailItemsByRoute["/services/studies/delay-studies"]],
  },
  "/services/studies/gap-study": {
    heading: studyDetailHeading,
    intro: studyDetailIntro,
    items: [studiesDetailItemsByRoute["/services/studies/gap-study"]],
  },
  "/services/studies/gps-travel-runs": {
    heading: studyDetailHeading,
    intro: studyDetailIntro,
    items: [studiesDetailItemsByRoute["/services/studies/gps-travel-runs"]],
  },
  "/services/studies/radar-speed-studies": {
    heading: studyDetailHeading,
    intro: studyDetailIntro,
    items: [studiesDetailItemsByRoute["/services/studies/radar-speed-studies"]],
  },
  "/services/studies/travel-time-studies": {
    heading: studyDetailHeading,
    intro: studyDetailIntro,
    items: [studiesDetailItemsByRoute["/services/studies/travel-time-studies"]],
  },
};

function isDetailServiceRoute(route: string): route is DetailServiceRoute {
  return route in detailExperienceContentByRoute;
}

export function SimpleDetailExperience({ route, detail, tone }: SimpleDetailExperienceProps) {
  if (!isDetailServiceRoute(route)) {
    return null;
  }

  const content = detailExperienceContentByRoute[route];
  const activeItem = content.items.find((item) => item.href === route) ?? content.items[0];
  if (!activeItem) {
    return null;
  }

  if (route.startsWith("/services/counts/")) {
    return (
      <CountsFieldPlannerLite
        detail={detail}
        heading={content.heading}
        intro={content.intro}
        initialId={activeItem.id}
        items={content.items}
        route={route}
        tone={tone}
      />
    );
  }

  if (route.startsWith("/services/surveys/")) {
    return (
      <SurveysTradeoffWorkbenchLite
        detail={detail}
        heading={content.heading}
        intro={content.intro}
        initialId={activeItem.id}
        items={content.items}
        route={route}
        tone={tone}
      />
    );
  }

  return (
    <StudiesQuestionNavigatorLite
      detail={detail}
      heading={content.heading}
      intro={content.intro}
      initialId={activeItem.id}
      items={content.items}
      route={route}
      tone={tone}
    />
  );
}

function CountsFieldPlannerLite({
  heading,
  intro,
  items,
  tone,
  detail,
  initialId,
  route,
}: {
  heading: string;
  intro: string;
  items: DetailExperienceItem[];
  tone: ToneVariant;
  detail: DetailSectionBlock;
  initialId: string;
  route: DetailServiceRoute;
}) {
  const [activeId, setActiveId] = useState(initialId);
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const hasMultipleOptions = items.length > 1;
  const scopeChecks = detail.faqs.map((faq) => faq.question).slice(0, 3);

  return (
    <section className="px-5 py-12 sm:px-8 lg:px-10" data-testid="detail-counts-field-planner">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h3 className="font-heading text-[clamp(1.75rem,3vw,2.45rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
            {heading}
          </h3>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/75">{intro}</p>
        </Reveal>
        <div className="mt-7 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            {hasMultipleOptions ? (
              <div className={cn(surfacePanel({ padding: "md" }), tone.accentBorder, "space-y-2")}>
                {items.map((item, index) => {
                  const selected = item.id === active.id;

                  return (
                    <button
                      key={item.id}
                      aria-pressed={selected}
                      className={cn(
                        "w-full rounded-xl border px-4 py-3 text-left transition",
                        selected
                          ? cn("bg-paper", tone.accentBorder, "shadow-[0_8px_24px_rgba(18,14,11,0.08)]")
                          : "border-line/80 bg-paper/76 hover:border-line",
                      )}
                      onClick={() => {
                        setActiveId(item.id);
                      }}
                      type="button"
                    >
                      <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                        Site context {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 font-heading text-lg font-semibold text-ink">{item.title}</p>
                      <p className="mt-2 text-xs text-ink/65">{item.question}</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder)}>
                <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                  Project fit checks
                </p>
                <p className="mt-2 text-sm leading-7 text-ink/78">{active.question}</p>
                <div className="mt-4 space-y-2">
                  {scopeChecks.map((check) => (
                    <p key={check} className="flex gap-2 text-sm leading-7 text-ink/74">
                      <span className={cn("mt-2 inline-block h-1.5 w-1.5 rounded-full", tone.accentDot)} />
                      <span>{check}</span>
                    </p>
                  ))}
                </div>
              </article>
            )}
          </Reveal>
          <Reveal delay={0.05}>
            <article className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder, "h-full")}>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                Capture plan
              </p>
              <h4 className="mt-2 font-heading text-2xl font-semibold leading-tight text-ink">{active.title}</h4>
              <dl className="mt-5 grid gap-4">
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Method</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.method}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Captured data</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.capturedSignal}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Delivery emphasis</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.deliveryEmphasis}</dd>
                </div>
              </dl>
              <p className="mt-4 rounded-xl border border-line/80 bg-paper/80 px-4 py-3 text-sm leading-7 text-ink/75">
                <span className="font-semibold text-ink/84">Best for:</span> {active.bestFor}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <Link className={cn("font-semibold transition hover:opacity-85", tone.accentText)} href="/services/counts">
                  All count services {"->"}
                </Link>
                {active.href !== route ? (
                  <Link className={cn("font-semibold transition hover:opacity-85", tone.accentText)} href={active.href}>
                    Open related detail {"->"}
                  </Link>
                ) : null}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SurveysTradeoffWorkbenchLite({
  heading,
  intro,
  items,
  tone,
  detail,
  initialId,
  route,
}: {
  heading: string;
  intro: string;
  items: DetailExperienceItem[];
  tone: ToneVariant;
  detail: DetailSectionBlock;
  initialId: string;
  route: DetailServiceRoute;
}) {
  const [pinnedId, setPinnedId] = useState<string | null>(initialId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = pinnedId ?? hoveredId ?? initialId;
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const hasMultipleOptions = items.length > 1;
  const decisionAnchors = detail.whenToUse.slice(0, 3);

  return (
    <section className="bg-sand px-5 py-12 sm:px-8 lg:px-10" data-testid="detail-surveys-tradeoff-workbench">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h3 className="font-heading text-[clamp(1.75rem,3vw,2.45rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
            {heading}
          </h3>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/75">{intro}</p>
        </Reveal>
        <div className="mt-7 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            {hasMultipleOptions ? (
              <div className={cn(surfacePanel({ padding: "md" }), tone.accentBorder, "divide-y divide-line/85")}>
                <div className="grid grid-cols-[1.05fr_1.05fr_0.9fr] gap-3 px-2 pb-2">
                  <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/55">Survey option</p>
                  <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/55">Signal captured</p>
                  <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/55">Decision fit</p>
                </div>
                {items.map((item) => {
                  const activeRow = active.id === item.id;
                  const pinned = pinnedId === item.id;

                  return (
                    <button
                      key={item.id}
                      aria-pressed={pinned}
                      className={cn(
                        "group grid w-full grid-cols-[1.05fr_1.05fr_0.9fr] gap-3 px-2 py-3 text-left transition",
                        activeRow ? "bg-paper/92" : "bg-transparent hover:bg-paper/78",
                      )}
                      onClick={() => {
                        setPinnedId((current) => (current === item.id ? null : item.id));
                      }}
                      onMouseEnter={() => {
                        setHoveredId(item.id);
                      }}
                      onMouseLeave={() => {
                        setHoveredId(null);
                      }}
                      onFocus={() => {
                        setHoveredId(item.id);
                      }}
                      onBlur={() => {
                        setHoveredId(null);
                      }}
                      type="button"
                    >
                      <div>
                        <p className="font-heading text-base font-semibold text-ink">{item.title}</p>
                        <p className="mt-1 text-xs text-ink/62">{item.question}</p>
                      </div>
                      <p className="text-xs leading-6 text-ink/72">{item.capturedSignal}</p>
                      <div className="flex items-start gap-2">
                        <span
                          className={cn(
                            "mt-2 inline-block h-2 w-2 rounded-full transition",
                            activeRow ? tone.accentDot : "bg-line",
                          )}
                        />
                        <p className="text-xs leading-6 text-ink/72">{item.bestFor}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder)}>
                <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                  Decision anchors
                </p>
                <p className="mt-2 text-sm leading-7 text-ink/78">{active.question}</p>
                <div className="mt-4 space-y-2">
                  {decisionAnchors.map((anchor) => (
                    <p key={anchor} className="flex gap-2 text-sm leading-7 text-ink/74">
                      <span className={cn("mt-2 inline-block h-1.5 w-1.5 rounded-full", tone.accentDot)} />
                      <span>{anchor}</span>
                    </p>
                  ))}
                </div>
              </article>
            )}
          </Reveal>

          <Reveal delay={0.05}>
            <aside className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder, "h-full")}>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                Active decision profile
              </p>
              <h4 className="mt-2 font-heading text-2xl font-semibold leading-tight text-ink">{active.title}</h4>
              <p className="mt-3 text-sm leading-7 text-ink/75">{active.method}</p>
              <p className="mt-3 rounded-xl border border-line/80 bg-paper/80 px-4 py-3 text-sm leading-7 text-ink/75">
                <span className="font-semibold text-ink/84">Output focus:</span> {active.deliveryEmphasis}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <Link className={cn("font-semibold transition hover:opacity-85", tone.accentText)} href="/services/surveys">
                  All survey services {"->"}
                </Link>
                {active.href !== route ? (
                  <Link className={cn("font-semibold transition hover:opacity-85", tone.accentText)} href={active.href}>
                    Open related detail {"->"}
                  </Link>
                ) : null}
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StudiesQuestionNavigatorLite({
  heading,
  intro,
  items,
  tone,
  detail,
  initialId,
  route,
}: {
  heading: string;
  intro: string;
  items: DetailExperienceItem[];
  tone: ToneVariant;
  detail: DetailSectionBlock;
  initialId: string;
  route: DetailServiceRoute;
}) {
  const initialItem = items.find((item) => item.id === initialId) ?? items[0];
  const [activeId, setActiveId] = useState(initialItem.id);
  const active = items.find((item) => item.id === activeId) ?? initialItem;
  const hasMultipleOptions = items.length > 1;
  const routeAnchors = detail.whenToUse.slice(0, 3);

  return (
    <section className="px-5 py-12 sm:px-8 lg:px-10" data-testid="detail-studies-question-navigator">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h3 className="font-heading text-[clamp(1.75rem,3vw,2.45rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
            {heading}
          </h3>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/75">{intro}</p>
        </Reveal>

        <div className={cn("mt-7 rounded-[1.4rem] border p-4 sm:p-5", tone.accentBorder, tone.accentSoftBg)}>
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              {hasMultipleOptions ? (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => {
                    const selected = item.id === active.id;

                    return (
                      <button
                        key={item.id}
                        aria-pressed={selected}
                        className={cn(
                          "rounded-lg border px-3 py-2 text-sm transition",
                          selected
                            ? cn("bg-paper", tone.accentBorder, tone.accentText)
                            : "border-line/80 bg-paper/82 text-ink/72 hover:border-line",
                        )}
                        onClick={() => {
                          setActiveId(item.id);
                        }}
                        type="button"
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder)}>
                  <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                    Study fit snapshot
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ink/78">{active.question}</p>
                  <div className="mt-4 space-y-2">
                    {routeAnchors.map((anchor) => (
                      <p key={anchor} className="flex gap-2 text-sm leading-7 text-ink/74">
                        <span className={cn("mt-2 inline-block h-1.5 w-1.5 rounded-full", tone.accentDot)} />
                        <span>{anchor}</span>
                      </p>
                    ))}
                  </div>
                </article>
              )}
            </div>
            <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder)}>
              <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                Interpretation panel
              </p>
              <h4 className="mt-2 font-heading text-xl font-semibold leading-tight text-ink">{active.title}</h4>
              <p className="mt-2 text-sm leading-7 text-ink/75">{active.question}</p>
              <dl className="mt-4 grid gap-3">
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Method</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.method}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Signal captured</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.capturedSignal}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Use-case fit</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.bestFor}</dd>
                </div>
                <div>
                  <dt className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/58">Delivery emphasis</dt>
                  <dd className="mt-1 text-sm leading-7 text-ink/76">{active.deliveryEmphasis}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <Link className={cn("font-semibold transition hover:opacity-85", tone.accentText)} href="/services/studies">
                  All study services {"->"}
                </Link>
                {active.href !== route ? (
                  <Link className={cn("font-semibold transition hover:opacity-85", tone.accentText)} href={active.href}>
                    Open related detail {"->"}
                  </Link>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
