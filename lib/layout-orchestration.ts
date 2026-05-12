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
  services_hub: "indigo",
  category_counts: "clay",
  category_surveys: "amber",
  category_studies: "teal",
  detail_counts: "clay",
  detail_surveys: "amber",
  detail_studies: "teal",
  methodology_hub: "slate",
  methodology_detail: "slate",
  resources_hub: "indigo",
  resources_detail: "indigo",
  custom_program: "slate",
  contact: "clay",
};

const mediaModeDefaults: Record<LayoutFamily, MediaMode> = {
  services_hub: "hybrid",
  category_counts: "hybrid",
  category_surveys: "hybrid",
  category_studies: "hybrid",
  detail_counts: "hybrid",
  detail_surveys: "hybrid",
  detail_studies: "hybrid",
  methodology_hub: "abstract",
  methodology_detail: "abstract",
  resources_hub: "abstract",
  resources_detail: "abstract",
  custom_program: "hybrid",
  contact: "hybrid",
};

const familyMotionDefaults: Record<LayoutFamily, RouteMotionConfig> = {
  services_hub: {
    interactionStyle: "chapter",
    ornamentPreset: "services_hub",
    assetPlacement: "right",
    panelHeight: "tall",
    scrubStrength: 0.94,
  },
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
  methodology_hub: {
    interactionStyle: "chapter",
    ornamentPreset: "services_hub",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.82,
  },
  methodology_detail: {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.72,
  },
  resources_hub: {
    interactionStyle: "chapter",
    ornamentPreset: "surveys_matrix",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.74,
  },
  resources_detail: {
    interactionStyle: "restrained",
    ornamentPreset: "detail_surveys",
    assetPlacement: "right",
    panelHeight: "short",
    scrubStrength: 0.64,
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
  services_hub: {
    experienceKind: "surveys_decision_matrix",
    chapterCount: 4,
    chapterStyle: "branched",
    variantId: "services-hub-matrix",
    assetBundleId: "services-hub",
  },
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
  methodology_hub: {
    experienceKind: "surveys_decision_matrix",
    chapterCount: 4,
    chapterStyle: "branched",
    variantId: "methodology-hub",
    assetBundleId: "methodology-hub",
  },
  methodology_detail: {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "methodology-detail",
    assetBundleId: "methodology-detail",
  },
  resources_hub: {
    experienceKind: "studies_evidence_observatory",
    chapterCount: 4,
    chapterStyle: "timeline",
    variantId: "resources-hub",
    assetBundleId: "resources-hub",
  },
  resources_detail: {
    experienceKind: "contact_intake_console",
    chapterCount: 3,
    chapterStyle: "timeline",
    variantId: "resources-detail",
    assetBundleId: "resources-detail",
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
  services_hub: {
    labels: ["Counts", "Surveys", "Studies", "Custom"],
    metricHints: ["Volumes", "Behavior", "Diagnostics", "Program"],
  },
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
  methodology_hub: {
    labels: ["Counts", "Surveys", "Studies", "Custom"],
    metricHints: ["Objective", "Method", "Analysis", "Delivery"],
  },
  methodology_detail: {
    labels: ["Objective", "Tools", "Process", "Outputs"],
    metricHints: ["Scope", "Capture", "Quality", "Package"],
  },
  resources_hub: {
    labels: ["Guide", "Scope", "Schedule", "Deliverables"],
    metricHints: ["Selection", "Windows", "Durations", "Formats"],
  },
  resources_detail: {
    labels: ["Purpose", "Compare", "Act"],
    metricHints: ["Context", "Decision", "Next"],
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
  "/services": {
    interactionStyle: "chapter",
    ornamentPreset: "services_hub",
    assetPlacement: "right",
    panelHeight: "tall",
    scrubStrength: 0.94,
  },
  "/services/counts": {
    interactionStyle: "chapter",
    ornamentPreset: "counts_flow",
    assetPlacement: "left",
    panelHeight: "tall",
    scrubStrength: 1.06,
  },
  "/services/surveys": {
    interactionStyle: "chapter",
    ornamentPreset: "surveys_matrix",
    assetPlacement: "right",
    panelHeight: "tall",
    scrubStrength: 0.92,
  },
  "/services/studies": {
    interactionStyle: "chapter",
    ornamentPreset: "studies_signal",
    assetPlacement: "center",
    panelHeight: "tall",
    scrubStrength: 1.1,
  },
  "/services/counts/intersection-turning-movement-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.95,
  },
  "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.9,
  },
  "/services/counts/pedestrian-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.88,
  },
  "/services/surveys/license-plate-survey": {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.9,
  },
  "/services/surveys/parking-occupancy-survey": {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.84,
  },
  "/services/surveys/vehicle-occupancy-surveys": {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.86,
  },
  "/services/studies/ball-bank-study": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.9,
  },
  "/services/studies/cordon-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.94,
  },
  "/services/studies/delay-studies": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.88,
  },
  "/services/studies/gap-study": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.92,
  },
  "/services/studies/gps-travel-runs": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.96,
  },
  "/services/studies/radar-speed-studies": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.87,
  },
  "/services/studies/travel-time-studies": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 1,
  },
  "/services/customized-data-collection": {
    interactionStyle: "program",
    ornamentPreset: "custom_builder",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.94,
  },
  "/methodology": {
    interactionStyle: "chapter",
    ornamentPreset: "services_hub",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.82,
  },
  "/methodology/atr-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.72,
  },
  "/methodology/turning-movement-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.74,
  },
  "/methodology/pedestrian-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_counts",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.73,
  },
  "/methodology/parking-utilization-survey": {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.71,
  },
  "/methodology/license-plate-survey": {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.73,
  },
  "/methodology/vehicle-occupancy-surveys": {
    interactionStyle: "compact",
    ornamentPreset: "detail_surveys",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.72,
  },
  "/methodology/ball-bank-study": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.74,
  },
  "/methodology/travel-time-studies": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.72,
  },
  "/methodology/gps-travel-runs": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.73,
  },
  "/methodology/delay-studies": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.7,
  },
  "/methodology/radar-speed-study": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.72,
  },
  "/methodology/gap-study": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.69,
  },
  "/methodology/cordon-counts": {
    interactionStyle: "compact",
    ornamentPreset: "detail_studies",
    assetPlacement: "left",
    panelHeight: "medium",
    scrubStrength: 0.71,
  },
  "/methodology/customized-data-collection": {
    interactionStyle: "program",
    ornamentPreset: "custom_builder",
    assetPlacement: "right",
    panelHeight: "medium",
    scrubStrength: 0.76,
  },
  "/resources": {
    interactionStyle: "chapter",
    ornamentPreset: "surveys_matrix",
    assetPlacement: "center",
    panelHeight: "medium",
    scrubStrength: 0.74,
  },
  "/resources/service-selection-guide": {
    interactionStyle: "restrained",
    ornamentPreset: "detail_surveys",
    assetPlacement: "left",
    panelHeight: "short",
    scrubStrength: 0.64,
  },
  "/resources/scheduling-and-duration-guide": {
    interactionStyle: "restrained",
    ornamentPreset: "detail_counts",
    assetPlacement: "right",
    panelHeight: "short",
    scrubStrength: 0.62,
  },
  "/resources/deliverables-and-report-formats": {
    interactionStyle: "restrained",
    ornamentPreset: "detail_studies",
    assetPlacement: "center",
    panelHeight: "short",
    scrubStrength: 0.61,
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
  "/services": {
    experienceKind: "surveys_decision_matrix",
    chapterCount: 4,
    chapterStyle: "branched",
    variantId: "services-hub-matrix",
    assetBundleId: "services-hub",
  },
  "/services/counts": {
    experienceKind: "counts_lane_atlas",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "counts-overview-atlas",
    assetBundleId: "counts-overview",
  },
  "/services/surveys": {
    experienceKind: "surveys_decision_matrix",
    chapterCount: 4,
    chapterStyle: "branched",
    variantId: "surveys-overview-matrix",
    assetBundleId: "surveys-overview",
  },
  "/services/studies": {
    experienceKind: "studies_evidence_observatory",
    chapterCount: 6,
    chapterStyle: "linear",
    variantId: "studies-overview-observatory",
    assetBundleId: "studies-overview",
  },
  "/services/counts/intersection-turning-movement-counts": {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "detail-counts-turning",
    assetBundleId: "detail-counts-turning",
  },
  "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts": {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "detail-counts-atr",
    assetBundleId: "detail-counts-atr",
  },
  "/services/counts/pedestrian-counts": {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "detail-counts-pedestrian",
    assetBundleId: "detail-counts-pedestrian",
  },
  "/services/surveys/license-plate-survey": {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 5,
    chapterStyle: "carousel",
    variantId: "detail-surveys-license",
    assetBundleId: "detail-surveys-license",
  },
  "/services/surveys/parking-occupancy-survey": {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 5,
    chapterStyle: "carousel",
    variantId: "detail-surveys-parking",
    assetBundleId: "detail-surveys-parking",
  },
  "/services/surveys/vehicle-occupancy-surveys": {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 5,
    chapterStyle: "carousel",
    variantId: "detail-surveys-occupancy",
    assetBundleId: "detail-surveys-occupancy",
  },
  "/services/studies/ball-bank-study": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-ball-bank",
    assetBundleId: "detail-studies-ball-bank",
  },
  "/services/studies/cordon-counts": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-cordon",
    assetBundleId: "detail-studies-cordon",
  },
  "/services/studies/delay-studies": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-delay",
    assetBundleId: "detail-studies-delay",
  },
  "/services/studies/gap-study": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-gap",
    assetBundleId: "detail-studies-gap",
  },
  "/services/studies/gps-travel-runs": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-gps",
    assetBundleId: "detail-studies-gps",
  },
  "/services/studies/radar-speed-studies": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-radar",
    assetBundleId: "detail-studies-radar",
  },
  "/services/studies/travel-time-studies": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "detail-studies-travel-time",
    assetBundleId: "detail-studies-travel-time",
  },
  "/services/customized-data-collection": {
    experienceKind: "custom_program_flow_composer",
    chapterCount: 6,
    chapterStyle: "timeline",
    variantId: "custom-program-builder",
    assetBundleId: "custom-program-core",
  },
  "/methodology": {
    experienceKind: "surveys_decision_matrix",
    chapterCount: 4,
    chapterStyle: "branched",
    variantId: "methodology-hub-overview",
    assetBundleId: "methodology-hub-overview",
  },
  "/methodology/atr-counts": {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "method-atr-counts",
    assetBundleId: "method-atr-counts",
  },
  "/methodology/turning-movement-counts": {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "method-turning-counts",
    assetBundleId: "method-turning-counts",
  },
  "/methodology/pedestrian-counts": {
    experienceKind: "detail_counts_stackdeck",
    chapterCount: 4,
    chapterStyle: "stacked",
    variantId: "method-pedestrian-counts",
    assetBundleId: "method-pedestrian-counts",
  },
  "/methodology/parking-utilization-survey": {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 4,
    chapterStyle: "carousel",
    variantId: "method-parking-survey",
    assetBundleId: "method-parking-survey",
  },
  "/methodology/license-plate-survey": {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 4,
    chapterStyle: "carousel",
    variantId: "method-license-plate",
    assetBundleId: "method-license-plate",
  },
  "/methodology/vehicle-occupancy-surveys": {
    experienceKind: "detail_surveys_ribbon_track",
    chapterCount: 4,
    chapterStyle: "carousel",
    variantId: "method-vehicle-occupancy",
    assetBundleId: "method-vehicle-occupancy",
  },
  "/methodology/ball-bank-study": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "method-ball-bank",
    assetBundleId: "method-ball-bank",
  },
  "/methodology/travel-time-studies": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "method-travel-time",
    assetBundleId: "method-travel-time",
  },
  "/methodology/gps-travel-runs": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "method-gps-travel-runs",
    assetBundleId: "method-gps-travel-runs",
  },
  "/methodology/delay-studies": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "method-delay-studies",
    assetBundleId: "method-delay-studies",
  },
  "/methodology/radar-speed-study": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "method-radar-speed",
    assetBundleId: "method-radar-speed",
  },
  "/methodology/gap-study": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "method-gap-study",
    assetBundleId: "method-gap-study",
  },
  "/methodology/cordon-counts": {
    experienceKind: "detail_studies_lens_lab",
    chapterCount: 5,
    chapterStyle: "linear",
    variantId: "method-cordon-counts",
    assetBundleId: "method-cordon-counts",
  },
  "/methodology/customized-data-collection": {
    experienceKind: "custom_program_flow_composer",
    chapterCount: 4,
    chapterStyle: "timeline",
    variantId: "method-customized-program",
    assetBundleId: "method-customized-program",
  },
  "/resources": {
    experienceKind: "studies_evidence_observatory",
    chapterCount: 4,
    chapterStyle: "timeline",
    variantId: "resources-hub-overview",
    assetBundleId: "resources-hub-overview",
  },
  "/resources/service-selection-guide": {
    experienceKind: "contact_intake_console",
    chapterCount: 3,
    chapterStyle: "timeline",
    variantId: "resource-selection-guide",
    assetBundleId: "resource-selection-guide",
  },
  "/resources/scheduling-and-duration-guide": {
    experienceKind: "contact_intake_console",
    chapterCount: 3,
    chapterStyle: "timeline",
    variantId: "resource-scheduling-guide",
    assetBundleId: "resource-scheduling-guide",
  },
  "/resources/deliverables-and-report-formats": {
    experienceKind: "contact_intake_console",
    chapterCount: 3,
    chapterStyle: "timeline",
    variantId: "resource-deliverables-guide",
    assetBundleId: "resource-deliverables-guide",
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
  "/services/counts/intersection-turning-movement-counts": {
    labels: ["Lane Setup", "Turn Capture", "Peak Filter", "TM Report"],
    metricHints: ["Approach", "Movement", "Interval", "Package"],
  },
  "/services/counts/atr-volume-classification-loop-detector-and-road-tube-counts": {
    labels: ["Sensor Setup", "Stream Capture", "Class QA", "Trend Output"],
    metricHints: ["Station", "Duration", "Class", "Delivery"],
  },
  "/services/counts/pedestrian-counts": {
    labels: ["Crossing Scope", "Walk Capture", "Peak Signal", "Ped Output"],
    metricHints: ["Point", "Volume", "Window", "Report"],
  },
  "/services/surveys/license-plate-survey": {
    labels: ["Checkpoint", "Match Set", "OD Build", "Pattern", "Output"],
    metricHints: ["Stations", "Pair Rate", "Matrix", "Insight", "Delivery"],
  },
  "/services/surveys/parking-occupancy-survey": {
    labels: ["Zone Scope", "Occupancy", "Turnover", "Pressure", "Output"],
    metricHints: ["Inventory", "Load", "Cycle", "Stress", "Report"],
  },
  "/services/surveys/vehicle-occupancy-surveys": {
    labels: ["Rules", "Sample", "Person-Rate", "Delta", "Output"],
    metricHints: ["Method", "Window", "Occupancy", "Compare", "Package"],
  },
};

function inferLayoutFamily(page: PageContent): LayoutFamily {
  if (page.layoutFamily) {
    return page.layoutFamily;
  }

  if (page.route === "/services") {
    return "services_hub";
  }

  if (page.route === "/methodology") {
    return "methodology_hub";
  }

  if (page.route.startsWith("/methodology/")) {
    return "methodology_detail";
  }

  if (page.route === "/resources") {
    return "resources_hub";
  }

  if (page.route.startsWith("/resources/")) {
    return "resources_detail";
  }

  if (page.meta.template === "category") {
    if (page.route === "/services/counts") {
      return "category_counts";
    }
    if (page.route === "/services/surveys") {
      return "category_surveys";
    }
    return "category_studies";
  }

  if (page.meta.template === "detail") {
    if (page.route.startsWith("/services/counts/")) {
      return "detail_counts";
    }
    if (page.route.startsWith("/services/surveys/")) {
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
