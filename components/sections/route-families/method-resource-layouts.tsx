import Link from "next/link";

import {
  DecisionGuide,
  OutputMatrix,
  ProcessStepsPanel,
  StandardsList,
  ToolingGrid,
} from "@/components/sections/method-resource-sections";
import {
  MethodologyDetailVisual,
  MethodologyHubVisualStrip,
  ResourcesDetailVisual,
  ResourcesHubVisualStrip,
} from "@/components/sections/method-resource-visuals";
import { CtaStrip } from "@/components/sections/cta-strip";
import { MarkdownSection } from "@/components/sections/markdown-section";
import { RelatedLinks } from "@/components/sections/related-links";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { interactiveSurfaceCard, surfacePanel } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

import type { RouteFamilyLayoutsPropsWithTone } from "./types";
import { RouteHeader } from "./shared";

const SECTION_TITLE_CLASS = "text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em]";
const SECTION_BODY_CLASS = "mt-4 max-w-4xl text-base leading-8 text-ink/75";
const EYEBROW_CLASS = "font-ui text-xs font-semibold uppercase tracking-[0.13em] text-clay";
const MICRO_LABEL_CLASS = "font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-clay";

export function MethodologyHubLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const hero = page.hero;
  const groups = page.serviceGroups ?? [];

  if (!hero || groups.length === 0) {
    return null;
  }

  return (
    <>
      <RouteHeader
        align="center"
        eyebrowClassName="text-clay"
        heroAccentClassName="text-clay"
        hero={hero}
        layout={layout}
        tone={tone}
        sideContent={<HubSnapshot tone={tone} />}
      />

      <section className="px-5 py-16 sm:px-8 lg:px-10" data-testid="methodology-hub-layout">
        <div className="mx-auto max-w-6xl space-y-10">
          {groups.map((group, groupIndex) => (
            <div key={group.id}>
              <Reveal delay={groupIndex * 0.03}>
                <p className={EYEBROW_CLASS}>Method family</p>
              </Reveal>
              <Reveal delay={groupIndex * 0.03 + 0.03}>
                <Heading as="h2" className={cn("mt-2", SECTION_TITLE_CLASS)}>
                  {group.label}
                </Heading>
              </Reveal>
              <Reveal delay={groupIndex * 0.03 + 0.06}>
                <p className={SECTION_BODY_CLASS}>{group.description}</p>
              </Reveal>
              {groupIndex === 0 ? (
                <Reveal delay={groupIndex * 0.03 + 0.09}>
                  <div className="mt-6">
                    <MethodologyHubVisualStrip tone={tone} />
                  </div>
                </Reveal>
              ) : null}
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item, itemIndex) => (
                  <Reveal key={item.href} delay={itemIndex * 0.04}>
                    <Link
                      className={cn(
                        interactiveSurfaceCard({ density: "compact", lift: "sm" }),
                        "block h-full border-line bg-paper shadow-[0_10px_24px_rgba(18,14,11,0.04)]",
                      )}
                      href={item.href}
                    >
                      <p className={MICRO_LABEL_CLASS}>Method page {String(itemIndex + 1).padStart(2, "0")}</p>
                      <p className="mt-2 font-heading text-xl font-semibold leading-tight text-ink">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-ink/72">{item.description}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {page.statement ? (
        <section className="bg-sand px-5 py-14 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className={EYEBROW_CLASS}>{page.statement.tag}</p>
            </Reveal>
            <Reveal delay={0.04}>
              <p className={SECTION_BODY_CLASS}>{page.statement.text}</p>
            </Reveal>
          </div>
        </section>
      ) : null}

      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks compactBottom links={page.relatedLinks} /> : null}
      <CtaStrip
        tag="Methodology Support"
        title="Need help selecting the right field method?"
        subtext="Share your objective and timeline. We will align you to the best-fit methodology and service route."
      />
    </>
  );
}

export function MethodologyDetailLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const hero = page.hero;
  const methodProfile = page.methodProfile;

  if (!hero || !methodProfile) {
    return null;
  }

  return (
    <>
      <RouteHeader
        eyebrowClassName="text-clay"
        heroAccentClassName="text-clay"
        hero={hero}
        layout={layout}
        tone={tone}
        sideContent={<ObjectivePanel objective={methodProfile.objective} tone={tone} />}
      />

      <section className="px-5 py-14 sm:px-8 lg:px-10" data-testid="methodology-detail-layout">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
              <p className={EYEBROW_CLASS}>Service counterpart</p>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-ink/75">
                This methodology page documents how collection is executed. If you want service packaging, scope, and deliverable options,
                use the linked service route.
              </p>
              <div className="mt-4">
                <Button href={methodProfile.serviceHref} size="sm" variant="ghost">
                  Open related service page
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <div className="mt-4">
              <MethodologyDetailVisual route={page.route} tone={tone} />
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4">
            <Reveal>
              <ToolingGrid tone={tone} tools={methodProfile.tools} />
            </Reveal>
            <StandardsList durationRules={methodProfile.durationRules} standards={methodProfile.standards} tone={tone} />
          </div>
        </div>
      </section>

      <ProcessStepsPanel steps={methodProfile.processSteps} tone={tone} />
      <OutputMatrix analysisOutputs={methodProfile.analysisOutputs} capturedData={methodProfile.capturedData} tone={tone} />

      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks compactBottom links={page.relatedLinks} /> : null}
      <CtaStrip
        tag="Method Planning"
        title="Ready to apply this methodology to your project?"
        subtext="Share your locations, time windows, and required outputs. We will confirm fit and schedule."
      />
    </>
  );
}

export function ResourcesHubLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const hero = page.hero;
  const group = page.serviceGroups?.[0];

  if (!hero || !group) {
    return null;
  }

  return (
    <>
      <RouteHeader align="center" eyebrowClassName="text-clay" heroAccentClassName="text-clay" hero={hero} layout={layout} tone={tone} />

      <section className="bg-sand px-5 py-16 sm:px-8 lg:px-10" data-testid="resources-hub-layout">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading as="h2" className={SECTION_TITLE_CLASS}>
              Practical guides for scoping and delivery
            </Heading>
          </Reveal>
          <Reveal delay={0.04}>
            <p className={SECTION_BODY_CLASS}>{group.description}</p>
          </Reveal>
          <Reveal delay={0.07}>
            <div className="mt-6">
              <ResourcesHubVisualStrip tone={tone} />
            </div>
          </Reveal>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {group.items.map((item, index) => (
              <Reveal key={item.href} delay={index * 0.05}>
                <Link
                  className={cn(
                    interactiveSurfaceCard({ density: "compact", lift: "sm" }),
                    tone.accentBorder,
                    "block h-full",
                  )}
                  href={item.href}
                >
                  <p className={MICRO_LABEL_CLASS}>Resource {String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-heading text-xl font-semibold leading-tight text-ink">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-ink/72">{item.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks compactBottom links={page.relatedLinks} /> : null}
      <CtaStrip
        tag="Need a custom guide?"
        title="Tell us what decision you need to make next."
        subtext="We can recommend the right combination of service family, methodology, and deliverable format."
      />
    </>
  );
}

export function ResourcesDetailLayout({ page, layout, tone }: RouteFamilyLayoutsPropsWithTone) {
  const hero = page.hero;
  const resourceGuide = page.resourceGuide;

  if (!hero || !resourceGuide) {
    return null;
  }

  return (
    <>
      <RouteHeader eyebrowClassName="text-clay" heroAccentClassName="text-clay" hero={hero} layout={layout} tone={tone} sideContent={<ResourceSidePanel tone={tone} />} />
      <section className="px-5 pb-2 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <ResourcesDetailVisual route={page.route} tone={tone} />
          </Reveal>
        </div>
      </section>
      <DecisionGuide guide={resourceGuide} tone={tone} />
      {page.body ? <MarkdownSection source={page.body} /> : null}
      {page.relatedLinks?.length ? <RelatedLinks compactBottom links={page.relatedLinks} /> : null}
      <CtaStrip
        tag="Project Intake"
        title="Need help turning this guide into an execution plan?"
        subtext="Share your constraints and target outputs. We will map a practical scope and timeline."
      />
    </>
  );
}

function HubSnapshot({ tone }: { tone: RouteFamilyLayoutsPropsWithTone["tone"] }) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
      <p className={EYEBROW_CLASS}>Methodology map</p>
      <div className="mt-3 space-y-2 text-sm leading-7 text-ink/75">
        <p>Counts workflows and timing windows</p>
        <p>Survey capture and matching logic</p>
        <p>Study diagnostics for network decisions</p>
        <p>Customized multi-method programs</p>
      </div>
    </div>
  );
}

function ObjectivePanel({ objective, tone }: { objective: string; tone: RouteFamilyLayoutsPropsWithTone["tone"] }) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
      <p className={EYEBROW_CLASS}>Method objective</p>
      <p className="mt-3 text-sm leading-7 text-ink/75">{objective}</p>
    </div>
  );
}

function ResourceSidePanel({ tone }: { tone: RouteFamilyLayoutsPropsWithTone["tone"] }) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
      <p className={EYEBROW_CLASS}>Guide structure</p>
      <div className="mt-3 space-y-2 text-sm leading-7 text-ink/75">
        <p>Purpose framing</p>
        <p>Decision cards</p>
        <p>Comparison table</p>
        <p>Action checklist</p>
      </div>
    </div>
  );
}
