import { ContactPanel } from "@/components/sections/contact-panel";
import { CtaStrip } from "@/components/sections/cta-strip";
import { MarkdownSection } from "@/components/sections/markdown-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { SimpleFamilySpotlight } from "@/components/sections/simple-family-spotlight";
import { Heading } from "@/components/ui/heading";
import { surfacePanel } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

import type { RouteFamilyLayoutsPropsWithTone } from "./types";
import { DetailFaqPanels, DetailListPanel, renderMotionMedia, RouteHeader } from "./shared";

export function CustomProgramLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const detail = page.detail;
  const hero = page.hero;
  if (!detail || !hero) {
    return null;
  }

  return (
    <>
      <RouteHeader hero={hero} layout={layout} tone={tone} sideContent={<ProgramBuilderPanel tone={tone} />} />

      <SimpleFamilySpotlight detail={detail} route="/services/customized-data-collection" tone={tone} />
      <section className="bg-sand px-5 py-18 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading as="h2" className="text-[clamp(2rem,3.4vw,2.9rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
              Modular scope composition
            </Heading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-3xl text-base leading-8 text-ink/75">{detail.intro}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Reveal><DetailListPanel title="Method modules" items={detail.keyPoints} tone={tone} /></Reveal>
            <Reveal delay={0.05}><DetailListPanel title="Deployment triggers" items={detail.whenToUse} tone={tone} /></Reveal>
            <Reveal delay={0.1}><DetailListPanel title="Output package" items={detail.deliverables} tone={tone} /></Reveal>
          </div>
        </div>
      </section>

      <DetailFaqPanels detail={detail} tone={tone} />
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom /> : null}
      <CtaStrip
        tag="Custom Scope"
        title="Need a program that mixes methods?"
        subtext="Send project constraints and target outputs. We will package the right combination of services."
      />
    </>
  );
}

export function ContactRouteLayout({ page, layout, tone, mediaStory }: RouteFamilyLayoutsPropsWithTone) {
  const hero = page.hero;
  if (!hero || !page.contact) {
    return null;
  }

  return (
    <>
      <RouteHeader hero={hero} layout={layout} tone={tone} sideContent={<ResponseFlowPanel tone={tone} />} />
      {renderMotionMedia(layout, tone, mediaStory, "Inquiry context", true)}
      <ContactPanel contact={page.contact} />
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom={false} /> : null}
    </>
  );
}

function ProgramBuilderPanel({ tone }: { tone: RouteFamilyLayoutsPropsWithTone["tone"] }) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), "bg-paper/88", tone.accentBorder)}>
      <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>Program builder</p>
      <p className="mt-3 text-sm leading-7 text-ink/75">Methods are combined based on access, timing, and output requirements.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]", tone.accentSoftBg, tone.accentText)}>
          Counts
        </span>
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]", tone.accentSoftBg, tone.accentText)}>
          Surveys
        </span>
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]", tone.accentSoftBg, tone.accentText)}>
          Studies
        </span>
      </div>
    </div>
  );
}

function ResponseFlowPanel({ tone }: { tone: RouteFamilyLayoutsPropsWithTone["tone"] }) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), "bg-paper/88", tone.accentBorder)}>
      <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>Response flow</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-ink/75">
        <p>1. Share your scope and constraints</p>
        <p>2. We review methods and schedule fit</p>
        <p>3. You receive a practical quote and plan</p>
      </div>
    </div>
  );
}
