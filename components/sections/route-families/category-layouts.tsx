import { CtaStrip } from "@/components/sections/cta-strip";
import { MarkdownSection } from "@/components/sections/markdown-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { SimpleFamilySpotlight } from "@/components/sections/simple-family-spotlight";
import { StatementBlock } from "@/components/sections/statement-block";
import { Heading } from "@/components/ui/heading";
import { surfacePanel } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import { toneVariants, type ToneVariant } from "@/lib/theme";
import { cn } from "@/lib/utils";

import type { RouteFamilyLayoutsPropsWithTone } from "./types";
import { renderMotionMedia, RouteHeader, ServiceGrid } from "./shared";

export function ServicesHubLayout({ page, layout, tone, mediaStory }: RouteFamilyLayoutsPropsWithTone) {
  const group = page.serviceGroups?.[0];
  const hero = page.hero;
  if (!hero || !group) {
    return null;
  }
  const legacyForegroundTone: ToneVariant = {
    ...tone,
    accentText: toneVariants.clay.accentText,
    accentDot: toneVariants.clay.accentDot,
  };

  return (
    <>
      <RouteHeader align="center" hero={hero} layout={layout} tone={legacyForegroundTone} />

      <section className={cn("relative overflow-hidden border-y px-5 py-10 sm:px-8 lg:px-10", tone.accentBorder, tone.accentSoftBg)}>
        <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70", tone.accentGradient)} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className={cn(surfacePanel({ padding: "lg" }), "sm:p-8", legacyForegroundTone.accentBorder, "bg-paper/90")}>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", legacyForegroundTone.accentText)}>
                Service alignment
              </p>
              <p className="mt-2 text-sm leading-7 text-ink/75">
                Start by matching your project objective, field conditions, and required output format. Then open the
                service family below that best fits that scope.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <p className="rounded-xl border border-line/80 bg-paper/85 px-4 py-3 text-sm text-ink/75">Objective and decision timeline</p>
                <p className="rounded-xl border border-line/80 bg-paper/85 px-4 py-3 text-sm text-ink/75">Field context and observation constraints</p>
                <p className="rounded-xl border border-line/80 bg-paper/85 px-4 py-3 text-sm text-ink/75">Reporting format and delivery depth</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {renderMotionMedia(layout, legacyForegroundTone, mediaStory, "Service decision chapter")}
      <section className={cn("relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 lg:px-10", tone.accentSoftBg)}>
        <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-tr opacity-50", tone.accentGradient)} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.12em]", legacyForegroundTone.accentText)}>
                Services overview
              </p>
              <Heading
                as="h2"
                className="mt-2 text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink"
              >
                Choose a service family
              </Heading>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="mt-4 max-w-3xl text-base leading-8 text-ink/75">{group.description}</p>
          </Reveal>
          <div className={cn("mt-8 rounded-[1.5rem] border p-4 sm:p-6", legacyForegroundTone.accentBorder, "bg-paper/88")}>
            <ServiceGrid group={group} tone={legacyForegroundTone} variant="services" />
          </div>
        </div>
      </section>

      {page.statement ? <StatementBlock statement={page.statement} /> : null}
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom /> : null}
      <CtaStrip
        tag="Need help choosing?"
        title="Tell us your objective and we will route you to the right method."
        subtext="Share your scope and timeline, and we will recommend the best-fit service path with a no obligation quote."
      />
    </>
  );
}

export function CategoryCountsLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const group = page.serviceGroups?.[0];
  const hero = page.hero;
  if (!hero || !group) {
    return null;
  }

  return (
    <>
      <RouteHeader
        hero={hero}
        layout={layout}
        tone={tone}
        sideContent={<OperationalSnapshot group={group} tone={tone} />}
      />

      <SimpleFamilySpotlight group={group} route="/services/counts" tone={tone} />
      <section className="bg-sand px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading as="h2" className="text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
              Operational grid for count programs
            </Heading>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="mt-4 max-w-3xl text-base leading-8 text-ink/75">{group.description}</p>
          </Reveal>
          <ServiceGrid group={group} tone={tone} variant="counts" />
        </div>
      </section>

      {page.statement ? <StatementBlock statement={page.statement} /> : null}
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom /> : null}
      <CtaStrip
        tag="Start Your Count Program"
        title="Need a defensible count scope for your corridor?"
        subtext="Share your location, target windows, and required outputs. We will return a practical collection plan."
      />
    </>
  );
}

export function CategorySurveysLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const group = page.serviceGroups?.[0];
  const hero = page.hero;
  if (!hero || !group) {
    return null;
  }

  return (
    <>
      <RouteHeader align="center" hero={hero} layout={layout} tone={tone} />

      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className={cn(surfacePanel({ padding: "lg" }), "sm:px-8", tone.accentBorder, tone.accentSoftBg)}>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                Decision framing
              </p>
              <p className="mt-2 text-sm leading-7 text-ink/78">
                Choose the survey path that resolves your planning question fastest. Each option below is structured for a
                different decision context.
              </p>
            </div>
          </Reveal>
          <ServiceGrid group={group} tone={tone} variant="surveys" />
        </div>
      </section>

      <SimpleFamilySpotlight group={group} route="/services/surveys" tone={tone} />
      {page.statement ? <StatementBlock statement={page.statement} /> : null}
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom /> : null}
      <CtaStrip
        tag="Survey Planning"
        title="Need a survey design matched to your decision?"
        subtext="We can map objectives to method, field setup, and output format before work starts."
      />
    </>
  );
}

export function CategoryStudiesLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const group = page.serviceGroups?.[0];
  const hero = page.hero;
  if (!hero || !group) {
    return null;
  }

  return (
    <>
      <RouteHeader
        hero={hero}
        layout={layout}
        tone={tone}
        sideContent={<EvidenceFlowPanel tone={tone} />}
      />

      <section className="px-5 py-18 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading as="h2" className="text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
              Diagnostic study tracks
            </Heading>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="mt-4 max-w-3xl text-base leading-8 text-ink/75">{group.description}</p>
          </Reveal>
          <ServiceGrid group={group} tone={tone} variant="studies" />
        </div>
      </section>

      <SimpleFamilySpotlight group={group} route="/services/studies" tone={tone} />
      {page.statement ? <StatementBlock statement={page.statement} /> : null}
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom /> : null}
      <CtaStrip
        tag="Study Scope"
        title="Need deeper analysis beyond standard counts?"
        subtext="Tell us the question you need to answer and we will shape a focused field-study package."
      />
    </>
  );
}

function OperationalSnapshot({
  group,
  tone,
}: {
  group: NonNullable<RouteFamilyLayoutsPropsWithTone["page"]["serviceGroups"]>[number];
  tone: ToneVariant;
}) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
      <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.12em]", tone.accentText)}>Operational Snapshot</p>
      <div className="mt-4 space-y-3">
        {group.items.map((item) => (
          <p key={item.href} className="flex items-center gap-3 text-sm leading-6 text-ink/75">
            <span className={cn("inline-block h-2 w-2 shrink-0 rounded-full", tone.accentDot)} />
            <span>{item.title}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function EvidenceFlowPanel({ tone }: { tone: ToneVariant }) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), "space-y-3", tone.accentBorder)}>
      <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.12em]", tone.accentText)}>Evidence flow</p>
      <p className="text-sm text-ink/78">Hypothesis</p>
      <p className="text-sm text-ink/78">Field capture</p>
      <p className="text-sm text-ink/78">Comparative interpretation</p>
      <p className="text-sm text-ink/78">Actionable recommendation</p>
    </div>
  );
}
