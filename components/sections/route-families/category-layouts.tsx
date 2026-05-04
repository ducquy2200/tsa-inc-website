import { CtaStrip } from "@/components/sections/cta-strip";
import { MarkdownSection } from "@/components/sections/markdown-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { StatementBlock } from "@/components/sections/statement-block";
import { Heading } from "@/components/ui/heading";
import { surfacePanel } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import type { ToneVariant } from "@/lib/theme";
import { cn } from "@/lib/utils";

import type { RouteFamilyLayoutsPropsWithTone } from "./types";
import { renderMotionMedia, RouteHeader, ServiceGrid } from "./shared";

export function CategoryCountsLayout({ page, layout, tone, mediaStory }: RouteFamilyLayoutsPropsWithTone) {
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

      {renderMotionMedia(layout, tone, mediaStory, "Operational movement chapter")}
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

export function CategorySurveysLayout({ page, layout, tone, mediaStory }: RouteFamilyLayoutsPropsWithTone) {
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

      {renderMotionMedia(layout, tone, mediaStory, "Survey decision chapter")}
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

export function CategoryStudiesLayout({ page, layout, tone, mediaStory }: RouteFamilyLayoutsPropsWithTone) {
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

      {renderMotionMedia(layout, tone, mediaStory, "Study evidence chapter")}
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
        {group.items.map((item, index) => (
          <p key={item.href} className="flex items-start gap-3 text-sm leading-6 text-ink/75">
            <span className={cn("mt-1 inline-block h-2 w-2 rounded-full", tone.accentDot)} />
            <span>
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.08em] text-ink/55">
                {String(index + 1).padStart(2, "0")}
              </span>{" "}
              {item.title}
            </span>
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
