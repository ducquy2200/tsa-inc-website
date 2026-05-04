export type PageTemplate = "home" | "category" | "detail" | "contact" | "custom";
export type LayoutFamily =
  | "category_counts"
  | "category_surveys"
  | "category_studies"
  | "detail_counts"
  | "detail_surveys"
  | "detail_studies"
  | "custom_program"
  | "contact";
export type LayoutTone = "clay" | "amber" | "teal" | "slate";
export type MotionPreset = "bold" | "medium" | "reduced";
export type MediaMode = "footage" | "abstract" | "hybrid";
export type MediaExperienceKind =
  | "legacy_home_story"
  | "counts_lane_atlas"
  | "surveys_decision_matrix"
  | "studies_evidence_observatory"
  | "detail_counts_stackdeck"
  | "detail_surveys_ribbon_track"
  | "detail_studies_lens_lab"
  | "custom_program_flow_composer"
  | "contact_intake_console";
export type ChapterStyle = "linear" | "branched" | "stacked" | "carousel" | "timeline";
export type RouteInteractionStyle = "chapter" | "compact" | "restrained" | "program";
export type OrnamentPreset =
  | "counts_flow"
  | "surveys_matrix"
  | "studies_signal"
  | "detail_counts"
  | "detail_surveys"
  | "detail_studies"
  | "custom_builder"
  | "contact_timeline";
export type AssetPlacement = "left" | "right" | "center";
export type PanelHeight = "short" | "medium" | "tall";

export interface RouteMotionConfig {
  interactionStyle: RouteInteractionStyle;
  ornamentPreset: OrnamentPreset;
  assetPlacement: AssetPlacement;
  panelHeight: PanelHeight;
  scrubStrength: number;
}

export interface RouteExperienceConfig {
  experienceKind: MediaExperienceKind;
  chapterCount: number;
  chapterStyle: ChapterStyle;
  variantId: string;
  assetBundleId: string;
}

export interface RouteChapterConfig {
  labels: string[];
  metricHints?: string[];
}

export interface MediaScene {
  id: string;
  title: string;
  description: string;
  clipIndex: number;
  start: number;
  end: number;
  ornamentState: "origin" | "merge" | "distribute";
  chapterLabel?: string;
  impactMetric?: string;
  metricHint?: string;
  focusTag?: string;
  overlayPreset?: "lanes" | "matrix" | "signal" | "stack" | "ribbon" | "lens" | "composer" | "console";
  variantHint?: string;
}

export interface ScrollMediaClipContract {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
}

export interface RouteMediaStoryContract {
  title: string;
  intro: string;
  clips: ScrollMediaClipContract[];
  scenes: MediaScene[];
}

export interface ToneVariantContract {
  accentText: string;
  accentBorder: string;
  accentSoftBg: string;
  accentDot: string;
  accentGradient: string;
}

export interface MediaExperienceProps {
  route: string;
  heading: string;
  compact?: boolean;
  story: RouteMediaStoryContract;
  tone: ToneVariantContract;
  motionPreset: MotionPreset;
  motionConfig: RouteMotionConfig;
  experienceConfig: RouteExperienceConfig;
  chapterConfig: RouteChapterConfig;
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  navLabel?: string;
  template: PageTemplate;
}

export interface CtaLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeroBlock {
  eyebrow: string;
  lines: string[];
  italicLineIndexes?: number[];
  subtext: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

export interface StatementBlock {
  tag: string;
  text: string;
}

export interface MetricItem {
  label: string;
  value: number;
  suffix?: string;
  durationMs?: number;
  displayText?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  href: string;
}

export interface ServiceGroupBlock {
  id: string;
  label: string;
  description: string;
  items: ServiceItem[];
}

export interface PillarItem {
  title: string;
  description: string;
}

export interface ApproachBlock {
  tag: string;
  title: string;
  quote: string;
  paragraphs: string[];
  pillars: PillarItem[];
}

export interface AudienceItem {
  title: string;
  description: string;
}

export interface AudienceBlock {
  tag: string;
  title: string;
  items: AudienceItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DetailSectionBlock {
  title: string;
  intro: string;
  keyPoints: string[];
  whenToUse: string[];
  deliverables: string[];
  faqs: FAQItem[];
}

export interface ContactTopic {
  label: string;
  value: string;
}

export interface ContactInfoItem {
  label: string;
  value: string;
  href?: string;
}

export interface CTAFormBlock {
  title: string;
  subtitle: string;
  submitLabel: string;
  endpointEnvVar: string;
  topics: ContactTopic[];
  contactInfo: ContactInfoItem[];
}

export interface PageContent {
  route: string;
  meta: PageMeta;
  layoutFamily?: LayoutFamily;
  layoutTone?: LayoutTone;
  motionPreset?: MotionPreset;
  mediaMode?: MediaMode;
  mediaSlot?: string;
  hero?: HeroBlock;
  statement?: StatementBlock;
  metrics?: MetricItem[];
  serviceGroups?: ServiceGroupBlock[];
  approach?: ApproachBlock;
  audiences?: AudienceBlock;
  detail?: DetailSectionBlock;
  contact?: CTAFormBlock;
  relatedLinks?: CtaLink[];
  body?: string;
}

export interface NavItem {
  href: string;
  label: string;
}
