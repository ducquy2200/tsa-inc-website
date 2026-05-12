import Link from "next/link";
import type { ReactNode } from "react";

import { OrnamentField } from "@/components/sections/ornament-field";
import { PinnedMediaStack } from "@/components/sections/pinned-media-stack";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { interactiveSurfaceCard, surfacePanel } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import type { ResolvedRouteLayout } from "@/lib/layout-orchestration";
import type { RouteMediaStory } from "@/lib/media-assets";
import type { DetailSectionBlock, HeroBlock, ServiceGroupBlock } from "@/lib/types";
import type { ToneVariant } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function RouteHeader({
  hero,
  tone,
  className,
  align = "left",
  sideContent,
  layout,
  eyebrowClassName,
  heroAccentClassName,
}: {
  hero: HeroBlock;
  tone: ToneVariant;
  className?: string;
  align?: "left" | "center";
  sideContent?: ReactNode;
  layout: ResolvedRouteLayout;
  eyebrowClassName?: string;
  heroAccentClassName?: string;
}) {
  const centered = align === "center";

  return (
    <section className={cn("relative overflow-hidden px-5 pb-14 pt-34 sm:px-8 lg:px-10", className)}>
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", tone.accentGradient)} />
      <div className="pointer-events-none absolute right-0 top-0 h-60 w-60 rounded-full bg-paper/60 blur-3xl" />
      <OrnamentField
        className="opacity-80"
        motionPreset={layout.motionPreset}
        placement={layout.motionConfig.assetPlacement}
        preset={layout.motionConfig.ornamentPreset}
      />
      <div className={cn("relative z-10 mx-auto max-w-6xl", centered ? "text-center" : "")}>
        <div className={cn("grid gap-10", sideContent ? "lg:grid-cols-[1.08fr_0.92fr] lg:items-end" : "")}>
          <div>
            <Reveal>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.16em]", tone.accentText, eyebrowClassName)}>
                {hero.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading
                as="h1"
                className={cn(
                  "mt-4 text-[clamp(2.3rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]",
                  centered ? "mx-auto max-w-4xl" : "max-w-3xl",
                )}
              >
                {hero.lines.map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {hero.italicLineIndexes?.includes(index) ? (
                      <em className={cn("font-body not-italic", tone.accentText, heroAccentClassName)}>{line}</em>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </Heading>
            </Reveal>
            <Reveal delay={0.09}>
              <p className={cn("mt-5 text-base leading-8 text-ink/75", centered ? "mx-auto max-w-2xl" : "max-w-2xl")}>
                {hero.subtext}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div
                className={cn(
                  "mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-[30rem] sm:flex-row sm:items-center sm:gap-3.5",
                  centered ? "mx-auto justify-center" : "justify-start",
                )}
              >
                <Button
                  className="w-full sm:min-w-[12.75rem]"
                  href={hero.primaryCta.href}
                  external={hero.primaryCta.external}
                  size="lg"
                  variant="primary"
                >
                  {hero.primaryCta.label}
                </Button>
                {hero.secondaryCta ? (
                  <Button
                    className="w-full sm:min-w-[11.5rem]"
                    href={hero.secondaryCta.href}
                    external={hero.secondaryCta.external}
                    size="lg"
                    variant="ghost"
                  >
                    {hero.secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </div>

          {sideContent ? <Reveal delay={0.14}>{sideContent}</Reveal> : null}
        </div>
      </div>
    </section>
  );
}

function MediaFallbackAbstract({ tone, layout }: { tone: ToneVariant; layout: ResolvedRouteLayout }) {
  return (
    <section className="relative px-5 py-16 sm:px-8 lg:px-10">
      <OrnamentField
        className="opacity-45"
        motionPreset={layout.motionPreset}
        placement={layout.motionConfig.assetPlacement}
        preset={layout.motionConfig.ornamentPreset}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className={cn("rounded-3xl border p-10", tone.accentBorder, tone.accentSoftBg)}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-16 rounded-xl border border-line/70 bg-paper/70" />
            <div className="h-16 rounded-xl border border-line/70 bg-paper/70" />
            <div className="h-16 rounded-xl border border-line/70 bg-paper/70" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function renderMotionMedia(
  layout: ResolvedRouteLayout,
  tone: ToneVariant,
  mediaStory: RouteMediaStory | null,
  heading: string,
  compact = false,
) {
  if (layout.mediaMode === "abstract") {
    return <MediaFallbackAbstract layout={layout} tone={tone} />;
  }

  if (!mediaStory) {
    return <MediaFallbackAbstract layout={layout} tone={tone} />;
  }

  return (
    <PinnedMediaStack
      className={compact ? "py-12" : undefined}
      config={layout.motionConfig}
      experienceKind={layout.experienceConfig.experienceKind}
      heading={heading}
      motionPreset={layout.motionPreset}
      story={mediaStory}
      tone={tone}
      variantId={layout.experienceConfig.variantId}
    />
  );
}

export function ServiceGrid({
  group,
  tone,
  variant,
}: {
  group: ServiceGroupBlock;
  tone: ToneVariant;
  variant: "counts" | "surveys" | "studies" | "services";
}) {
  if (variant === "studies") {
    return (
      <div className="mt-10 space-y-4">
        {group.items.map((item, index) => (
          <Reveal key={item.href} delay={index * 0.04}>
            <Link
              className={cn(
                interactiveSurfaceCard({ density: "compact", lift: "sm" }),
                "grid gap-3 sm:grid-cols-[90px_1fr]",
                tone.accentBorder,
              )}
              href={item.href}
            >
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>
                Study {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <p className="font-heading text-xl font-semibold text-ink transition group-hover:text-ink/90">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-ink/72">{item.description}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mt-10 grid gap-4",
        variant === "surveys"
          ? "md:grid-cols-3"
          : variant === "services"
            ? "md:grid-cols-2"
            : "md:grid-cols-2 xl:grid-cols-3",
      )}
    >
      {group.items.map((item, index) => (
        <Reveal key={item.href} delay={index * 0.05}>
          <Link
            className={cn(interactiveSurfaceCard({ lift: "md" }), "block h-full", tone.accentBorder)}
            href={item.href}
          >
            <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>
              {variant === "surveys"
                ? "Decision Path"
                : variant === "services"
                  ? "Service"
                  : "Operational Item"}{" "}
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 font-heading text-xl font-semibold leading-snug text-ink">{item.title}</p>
            <p className="mt-3 text-sm leading-7 text-ink/72">{item.description}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function DetailListPanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: ToneVariant;
}) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
      <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.13em]", tone.accentText)}>{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-7 text-ink/75">
            <span className={cn("mt-[0.58rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full", tone.accentDot)} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DetailFaqPanels({ detail, tone }: { detail: DetailSectionBlock; tone: ToneVariant }) {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Heading as="h3" className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
            Frequently asked questions
          </Heading>
        </Reveal>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {detail.faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder, "bg-paper")}>
                <p className="font-ui text-sm font-semibold text-ink">{faq.question}</p>
                <p className="mt-3 text-sm leading-7 text-ink/75">{faq.answer}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
