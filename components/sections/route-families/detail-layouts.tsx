import { CtaStrip } from "@/components/sections/cta-strip";
import { MarkdownSection } from "@/components/sections/markdown-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { SimpleDetailExperience } from "@/components/sections/simple-detail-experience";
import { Heading } from "@/components/ui/heading";
import { surfacePanel } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

import type { RouteFamilyLayoutsPropsWithTone } from "./types";
import { DetailFaqPanels, DetailListPanel, RouteHeader } from "./shared";

export function DetailCountsLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const detail = page.detail;
  const hero = page.hero;
  if (!detail || !hero) {
    return null;
  }

  return (
    <>
      <RouteHeader hero={hero} layout={layout} tone={tone} sideContent={<FieldMethodPanel detail={detail} tone={tone} />} />

      <SimpleDetailExperience detail={detail} route={page.route} tone={tone} />
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading as="h2" className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
              {detail.title}
            </Heading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-4xl text-base leading-8 text-ink/75">{detail.intro}</p>
          </Reveal>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            <Reveal><DetailListPanel title="Core capabilities" items={detail.keyPoints} tone={tone} /></Reveal>
            <Reveal delay={0.04}><DetailListPanel title="Typical use cases" items={detail.whenToUse} tone={tone} /></Reveal>
            <Reveal delay={0.08}><DetailListPanel title="Deliverables" items={detail.deliverables} tone={tone} /></Reveal>
          </div>
        </div>
      </section>

      <DetailFaqPanels detail={detail} tone={tone} />
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom /> : null}
      <CtaStrip
        tag="Count Execution"
        title="Want this count service scoped for your site?"
        subtext="Share your location and window requirements, and we will return a fit-for-purpose collection approach."
      />
    </>
  );
}

export function DetailSurveysLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const detail = page.detail;
  const hero = page.hero;
  if (!detail || !hero) {
    return null;
  }

  return (
    <>
      <RouteHeader hero={hero} layout={layout} tone={tone} />
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className={cn(surfacePanel({ padding: "lg" }), "sm:p-8", tone.accentBorder)}>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>
                Decision checkpoints
              </p>
              <h2 className="mt-3 font-heading text-[clamp(1.9rem,3.2vw,2.7rem)] font-extrabold leading-[1.08] text-ink">
                {detail.title}
              </h2>
              <p className="mt-3 max-w-4xl text-base leading-8 text-ink/75">{detail.intro}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <SimpleDetailExperience detail={detail} route={page.route} tone={tone} />

      <section className="bg-sand px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading as="h3" className="text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Deliverable matrix
            </Heading>
          </Reveal>
          <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-paper/90">
            {detail.deliverables.map((deliverable, index) => (
              <Reveal key={deliverable} delay={index * 0.04}>
                <div className="grid gap-3 px-5 py-4 sm:grid-cols-[120px_1fr] sm:px-6">
                  <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                    Output {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-7 text-ink/75">{deliverable}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DetailFaqPanels detail={detail} tone={tone} />
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom /> : null}
      <CtaStrip
        tag="Survey Delivery"
        title="Need this survey configured for your scope?"
        subtext="We can map your decision objective to method, collection window, and reporting format."
      />
    </>
  );
}

export function DetailStudiesLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const detail = page.detail;
  const hero = page.hero;
  if (!detail || !hero) {
    return null;
  }

  return (
    <>
      <RouteHeader hero={hero} layout={layout} tone={tone} sideContent={<AnalysisRhythmPanel tone={tone} />} />
      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading as="h2" className="text-[clamp(2rem,3.4vw,2.9rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
              {detail.title}
            </Heading>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-4xl text-base leading-8 text-ink/75">{detail.intro}</p>
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <DetailListPanel title="Evidence inputs" items={detail.keyPoints} tone={tone} />
            </Reveal>
            <Reveal delay={0.05}>
              <DetailListPanel title="Interpretation outputs" items={detail.deliverables} tone={tone} />
            </Reveal>
          </div>

          <div className="mt-4">
            <Reveal delay={0.09}>
              <DetailListPanel title="When to apply this study" items={detail.whenToUse} tone={tone} />
            </Reveal>
          </div>
        </div>
      </section>

      <SimpleDetailExperience detail={detail} route={page.route} tone={tone} />

      <DetailFaqPanels detail={detail} tone={tone} />
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks links={page.relatedLinks} compactBottom /> : null}
      <CtaStrip
        tag="Study Planning"
        title="Need this study adapted to your network?"
        subtext="We can tune collection scope, windows, and outputs to your specific operational question."
      />
    </>
  );
}

function FieldMethodPanel({
  detail,
  tone,
}: {
  detail: NonNullable<RouteFamilyLayoutsPropsWithTone["page"]["detail"]>;
  tone: RouteFamilyLayoutsPropsWithTone["tone"];
}) {
  const scopeChecks = detail.faqs.map((faq) => faq.question).slice(0, 3);
  const fallbackChecks = detail.whenToUse.slice(0, 3);
  const checks = scopeChecks.length > 0 ? scopeChecks : fallbackChecks;

  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
      <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.12em]", tone.accentText)}>Scope checks</p>
      <div className="mt-4 space-y-3">
        {checks.map((point) => (
          <p key={point} className="flex items-start gap-3 text-sm leading-6 text-ink/75">
            <span className={cn("mt-[0.5rem] inline-block h-1.5 w-1.5 rounded-full", tone.accentDot)} />
            <span>{point}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function AnalysisRhythmPanel({ tone }: { tone: RouteFamilyLayoutsPropsWithTone["tone"] }) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
      <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>
        Analysis rhythm
      </p>
      <p className="mt-3 text-sm leading-7 text-ink/75">1. Observe behavior</p>
      <p className="text-sm leading-7 text-ink/75">2. Quantify patterns</p>
      <p className="text-sm leading-7 text-ink/75">3. Compare alternatives</p>
      <p className="text-sm leading-7 text-ink/75">4. Recommend action</p>
    </div>
  );
}
