import type {
  LayoutFamily,
  LayoutTone,
  MediaMode,
  MotionPreset,
  PageContent,
  RouteChapterConfig,
  RouteExperienceConfig,
  RouteMotionConfig,
} from "@/lib/types";

export interface ResolvedRouteLayout {
  route: string;
  family: LayoutFamily;
  tone: LayoutTone;
  motionPreset: MotionPreset;
  mediaMode: MediaMode;
  mediaSlot?: string;
  motionConfig: RouteMotionConfig;
  experienceConfig: RouteExperienceConfig;
  chapterConfig: RouteChapterConfig;
}

const toneDefaults: Record<LayoutFamily, LayoutTone> = {
  category_counts: "clay",
  category_surveys: "amber",
  category_studies: "teal",
  detail_counts: "clay",
  detail_surveys: "amber",
  detail_studies: "teal",
  custom_program: "slate",
  contact: "clay",
};

const mediaModeDefaults: Record<LayoutFamily, MediaMode> = {
  category_counts: "hybrid",
  category_surveys: "hybrid",
  category_studies: "hybrid",
  detail_counts: "hybrid",
  detail_surveys: "hybrid",
  detail_studies: "hybrid",
  custom_program: "hybrid",
  contact: "hybrid",
};

const familyMotionDefaults: Record<LayoutFamily, RouteMotionConfig> = {
  category_counts: {
    interactionStyle: "chapter",
    ornamentPreset: "counts_flow",
    assetPlacement: "left",
    panelHeight: "tall",
    scrubStrength: 1,
  },
  category_surveys: {
    interactionStyle: "chapter",
    ornamentPreset: "surveys_matrix",
    assetPlacement: "right",
    panelHeight: "tall",
    scrubStrength: 0.92,
  },
  category_studies: {
    interactionStyle: "chapter",
    ornamentPreset: "studies_signal",
    assetPlacement: "center",
    panelHeight: "tall",
    scrubStrength: 1.05,
  },
  detail_counts: {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.9,
  },
  detail_surveys: {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.85,
  },
  detail_studies: {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.95,
  },
  custom_program: {
    interactionStyle: "program",
    ornamentPreset: "custom_builder",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.92,
  },
  contact: {
    interactionStyle: "restrained",
    ornamentPreset: "contact_timeline",
    assetPlacement: "right",
    panelHeight: "short",
    scrubStrength: 0.78,
  },
};

const familyExperienceDefaults: Record<LayoutFamily, RouteExperienceConfig> = {
  category_counts: {
    experienceKind: "counts_lane_atlas",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "counts-core",
    assetBundleId: "counts-core",
  },
  category_surveys: {
    experienceKind: "surveys_decision_matrix",
    chapterCount: 4,
    chapterStyle: "branched",
    variantId: "surveys-core",
    assetBundleId: "surveys-core",
  },
  category_studies: {
    experienceKind: "studies_evidence_observatory",
    chapterCount: 6,
    chapterStyle: "linear",
    variantId: "studies-core",
    assetBundleId: "studies-core",
  },
  detail_counts: {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "detail-counts-core",
    assetBundleId: "detail-counts-core",
  },
  detail_surveys: {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 5,
    chapterStyle: "carousel",
    variantId: "detail-surveys-core",
    assetBundleId: "detail-surveys-core",
  },
  detail_studies: {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-core",
    assetBundleId: "detail-studies-core",
  },
  custom_program: {
    experienceKind: "custom_program_flow_composer",
    chapterCount: 6,
    chapterStyle: "timeline",
    variantId: "custom-program-core",
    assetBundleId: "custom-program-core",
  },
  contact: {
    experienceKind: "contact_intake_console",
    chapterCount: 3,
    chapterStyle: "timeline",
    variantId: "contact-core",
    assetBundleId: "contact-core",
  },
};

const familyChapterDefaults: Record<LayoutFamily, RouteChapterConfig> = {
  category_counts: {
    labels: ["Context", "Approach", "Peak Load", "Queue Release", "Output"],
    metricHints: ["Coverage", "Window", "Load", "Dissipation", "Package"],
  },
  category_surveys: {
    labels: ["Framing", "Signal", "Comparison", "Decision"],
    metricHints: ["Objective", "Capture", "Confidence", "Action"],
  },
  category_studies: {
    labels: ["Hypothesis", "Capture", "Pattern", "Friction", "Tradeoff", "Recommendation"],
    metricHints: ["Scope", "Sample", "Evidence", "Constraint", "Delta", "Output"],
  },
  detail_counts: {
    labels: ["Setup", "Capture", "Validation", "Delivery"],
    metricHints: ["Site", "Movement", "QA", "Report"],
  },
  detail_surveys: {
    labels: ["Prompt", "Capture", "Interpret", "Compare", "Report"],
    metricHints: ["Question", "Sample", "Signal", "Difference", "Result"],
  },
  detail_studies: {
    labels: ["Question", "Observe", "Quantify", "Interpret", "Result"],
    metricHints: ["Need", "Field", "Measure", "Meaning", "Action"],
  },
  custom_program: {
    labels: ["Intake", "Compose", "Sequence", "Activate", "Validate", "Deliver"],
    metricHints: ["Inputs", "Modules", "Schedule", "Field", "QA", "Outputs"],
  },
  contact: {
    labels: ["Context", "Alignment", "Response"],
    metricHints: ["Scope", "Fit", "Next Step"],
  },
};

export const routeMotionConfig: Record<string, RouteMotionConfig> = {
  "/counts": {
    interactionStyle: "chapter",
    ornamentPreset: "counts_flow",
    assetPlacement: "left",
    panelHeight: "tall",
    scrubStrength: 1.06,
  },
  "/surveys": {
    interactionStyle: "chapter",
    ornamentPreset: "surveys_matrix",
    assetPlacement: "right",
    panelHeight: "tall",
    scrubStrength: 0.92,
  },
  "/studies": {
    interactionStyle: "chapter",
    ornamentPreset: "studies_signal",
    assetPlacement: "center",
    panelHeight: "tall",
    scrubStrength: 1.1,
  },
  "/counts/intersection-turning-movement-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.95,
  },
  "/counts/atr-volume-classification-loop-detector-and-road-tube-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.9,
  },
  "/counts/pedestrian-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.88,
  },
  "/surveys/license-plate-survey": {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.9,
  },
  "/surveys/parking-occupancy-survey": {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.84,
  },
  "/surveys/vehicle-occupancy-surveys": {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.86,
  },
  "/ball-bank-study": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.9,
  },
  "/cordon-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.94,
  },
  "/delay-studies": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.88,
  },
  "/gap-study": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.92,
  },
  "/gps-travel-runs": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.96,
  },
  "/radar-speed-studies": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.87,
  },
  "/travel-time-studies": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 1,
  },
  "/customized-data-collection": {
    interactionStyle: "program",
    ornamentPreset: "custom_builder",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.94,
  },
  "/contact-us": {
    interactionStyle: "restrained",
    ornamentPreset: "contact_timeline",
    assetPlacement: "right",
    panelHeight: "short",
    scrubStrength: 0.78,
  },
};

export const routeExperienceConfig: Record<string, RouteExperienceConfig> = {
  "/counts": {
    experienceKind: "counts_lane_atlas",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "counts-overview-atlas",
    assetBundleId: "counts-overview",
  },
  "/surveys": {
    experienceKind: "surveys_decision_matrix",
    chapterCount: 4,
    chapterStyle: "branched",
    variantId: "surveys-overview-matrix",
    assetBundleId: "surveys-overview",
  },
  "/studies": {
    experienceKind: "studies_evidence_observatory",
    chapterCount: 6,
    chapterStyle: "linear",
    variantId: "studies-overview-observatory",
    assetBundleId: "studies-overview",
  },
  "/counts/intersection-turning-movement-counts": {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "detail-counts-turning",
    assetBundleId: "detail-counts-turning",
  },
  "/counts/atr-volume-classification-loop-detector-and-road-tube-counts": {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "detail-counts-atr",
    assetBundleId: "detail-counts-atr",
  },
  "/counts/pedestrian-counts": {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "detail-counts-pedestrian",
    assetBundleId: "detail-counts-pedestrian",
  },
  "/surveys/license-plate-survey": {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 5,
    chapterStyle: "carousel",
    variantId: "detail-surveys-license",
    assetBundleId: "detail-surveys-license",
  },
  "/surveys/parking-occupancy-survey": {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 5,
    chapterStyle: "carousel",
    variantId: "detail-surveys-parking",
    assetBundleId: "detail-surveys-parking",
  },
  "/surveys/vehicle-occupancy-surveys": {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 5,
    chapterStyle: "carousel",
    variantId: "detail-surveys-occupancy",
    assetBundleId: "detail-surveys-occupancy",
  },
  "/ball-bank-study": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-ball-bank",
    assetBundleId: "detail-studies-ball-bank",
  },
  "/cordon-counts": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-cordon",
    assetBundleId: "detail-studies-cordon",
  },
  "/delay-studies": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-delay",
    assetBundleId: "detail-studies-delay",
  },
  "/gap-study": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-gap",
    assetBundleId: "detail-studies-gap",
  },
  "/gps-travel-runs": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-gps",
    assetBundleId: "detail-studies-gps",
  },
  "/radar-speed-studies": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-radar",
    assetBundleId: "detail-studies-radar",
  },
  "/travel-time-studies": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-travel-time",
    assetBundleId: "detail-studies-travel-time",
  },
  "/customized-data-collection": {
    experienceKind: "custom_program_flow_composer",
    chapterCount: 6,
    chapterStyle: "timeline",
    variantId: "custom-program-builder",
    assetBundleId: "custom-program-core",
  },
  "/contact-us": {
    experienceKind: "contact_intake_console",
    chapterCount: 3,
    chapterStyle: "timeline",
    variantId: "contact-intake-console",
    assetBundleId: "contact-core",
  },
};

export const routeChapterConfig: Record<string, RouteChapterConfig> = {
  "/counts/intersection-turning-movement-counts": {
    labels: ["Lane Setup", "Turn Capture", "Peak Filter", "TM Report"],
    metricHints: ["Approach", "Movement", "Interval", "Package"],
  },
  "/counts/atr-volume-classification-loop-detector-and-road-tube-counts": {
    labels: ["Sensor Setup", "Stream Capture", "Class QA", "Trend Output"],
    metricHints: ["Station", "Duration", "Class", "Delivery"],
  },
  "/counts/pedestrian-counts": {
    labels: ["Crossing Scope", "Walk Capture", "Peak Signal", "Ped Output"],
    metricHints: ["Point", "Volume", "Window", "Report"],
  },
  "/surveys/license-plate-survey": {
    labels: ["Checkpoint", "Match Set", "OD Build", "Pattern", "Output"],
    metricHints: ["Stations", "Pair Rate", "Matrix", "Insight", "Delivery"],
  },
  "/surveys/parking-occupancy-survey": {
    labels: ["Zone Scope", "Occupancy", "Turnover", "Pressure", "Output"],
    metricHints: ["Inventory", "Load", "Cycle", "Stress", "Report"],
  },
  "/surveys/vehicle-occupancy-surveys": {
    labels: ["Rules", "Sample", "Person-Rate", "Delta", "Output"],
    metricHints: ["Method", "Window", "Occupancy", "Compare", "Package"],
  },
};

function inferLayoutFamily(page: PageContent): LayoutFamily {
  if (page.layoutFamily) {
    return page.layoutFamily;
  }

  if (page.meta.template === "category") {
    if (page.route === "/counts") {
      return "category_counts";
    }
    if (page.route === "/surveys") {
      return "category_surveys";
    }
    return "category_studies";
  }

  if (page.meta.template === "detail") {
    if (page.route.startsWith("/counts/")) {
      return "detail_counts";
    }
    if (page.route.startsWith("/surveys/")) {
      return "detail_surveys";
    }
    return "detail_studies";
  }

  if (page.meta.template === "contact") {
    return "contact";
  }

  return "custom_program";
}

export function resolveRouteLayout(page: PageContent): ResolvedRouteLayout | null {
  if (page.route === "/") {
    return null;
  }

  const family = inferLayoutFamily(page);
  const routeConfig = routeMotionConfig[page.route] ?? familyMotionDefaults[family];
  const experienceConfig = routeExperienceConfig[page.route] ?? familyExperienceDefaults[family];
  const chapterConfig = routeChapterConfig[page.route] ?? familyChapterDefaults[family];

  return {
    route: page.route,
    family,
    tone: page.layoutTone ?? toneDefaults[family],
    motionPreset: page.motionPreset ?? "medium",
    mediaMode: page.mediaMode ?? mediaModeDefaults[family],
    mediaSlot: page.mediaSlot,
    motionConfig: routeConfig,
    experienceConfig,
    chapterConfig,
  };
}
