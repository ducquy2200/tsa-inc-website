"use client";

import { motion } from "framer-motion";
import { useMemo, useRef } from "react";

import { ExperienceSection, StaticMediaFallback, useScrollController, useVideoSceneState } from "@/components/sections/media-experiences/shared";
import { motionDuration, motionEasing } from "@/lib/motion";
import type { MediaExperienceProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DetailStudiesLensLabExperience({
  heading,
  compact,
  story,
  tone,
  motionConfig,
  motionPreset,
  experienceConfig,
  chapterConfig,
}: MediaExperienceProps) {
  const variantId = experienceConfig.variantId;
  const variantSeed = Math.max(
    0,
    [
      "detail-studies-ball-bank",
      "detail-studies-cordon",
      "detail-studies-delay",
      "detail-studies-gap",
      "detail-studies-gps",
      "detail-studies-radar",
      "detail-studies-travel-time",
    ].indexOf(variantId),
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const { activeScene, progress, reduceMotion, stageHeightClass } = useScrollController({
    stageRef,
    sceneCount: experienceConfig.chapterCount,
    chapterStyle: experienceConfig.chapterStyle,
    motionConfig,
    motionPreset,
  });

  const { activeSceneData, activeClipIndex, uniqueClipIndexes, bindVideoRef, handleMetadataLoad } = useVideoSceneState({
    story,
    activeScene,
    progress,
    scrubStrength: motionConfig.scrubStrength,
    reduceMotion,
  });

  const aperture = useMemo(() => 22 + variantSeed * 1.4 + progress * (34 + (variantSeed % 3) * 3), [progress, variantSeed]);
  const lensX = useMemo(() => 16 + variantSeed * 5 + progress * (45 + (variantSeed % 2) * 10), [progress, variantSeed]);
  const lensY = useMemo(() => 42 + (variantSeed % 3) * 5, [variantSeed]);
  const lensOverlay = useMemo(
    () =>
      variantId === "detail-studies-cordon"
        ? `linear-gradient(to bottom, rgba(12,10,8,0.82), rgba(12,10,8,0.18) 35%, rgba(12,10,8,0.82)), radial-gradient(circle ${aperture}% at ${lensX}% ${lensY}%, transparent 0%, rgba(12,10,8,0.32) 42%, rgba(12,10,8,0.86) 100%)`
        : variantId === "detail-studies-delay"
          ? `radial-gradient(circle ${aperture}% at ${lensX}% ${lensY}%, rgba(255,255,255,0.04) 0%, rgba(12,10,8,0.26) 45%, rgba(12,10,8,0.9) 100%)`
          : `radial-gradient(circle ${aperture}% at ${lensX}% ${lensY}%, transparent 0%, rgba(12,10,8,0.28) 45%, rgba(12,10,8,0.86) 100%)`,
    [aperture, lensX, lensY, variantId],
  );
  const interpretationPanelClass =
    variantId === "detail-studies-radar"
      ? "bg-paper/10"
      : variantId === "detail-studies-gps"
        ? "bg-paper/5"
        : "bg-paper/7";

  if (reduceMotion) {
    return <StaticMediaFallback compact={compact} heading={heading} story={story} />;
  }

  return (
    <ExperienceSection className={compact ? "py-12" : "py-16"} kind="detail_studies_lens_lab" variantId={variantId}>
      <div className="mb-5">
        <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.14em]", tone.accentText)}>{heading}</p>
        <h2 className="mt-2 max-w-3xl font-heading text-[clamp(1.8rem,3.8vw,2.8rem)] font-semibold leading-[1.03] text-ink">{story.title}</h2>
      </div>

      <div ref={stageRef} className={cn("grid gap-4 rounded-[1.8rem] border border-line/70 bg-ink p-3 sm:p-4 lg:grid-cols-[1.2fr_0.8fr]", stageHeightClass)}>
        <div className="relative overflow-hidden rounded-[1.2rem] border border-paper/18">
          {uniqueClipIndexes.map((clipIndex) => {
            const clip = story.clips[clipIndex];

            return (
              <video
                key={clip.id}
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  clipIndex === activeClipIndex ? "opacity-100" : "opacity-0",
                )}
                muted
                playsInline
                poster={clip.posterSrc}
                preload="metadata"
                ref={bindVideoRef(clipIndex)}
                src={clip.videoSrc}
                onLoadedMetadata={handleMetadataLoad(clipIndex)}
              />
            );
          })}

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            data-testid="lens-mask"
            style={{ background: lensOverlay }}
            transition={{ duration: motionDuration.fast, ease: motionEasing.standard }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_8px)] opacity-45" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <div className="rounded-xl border border-paper/18 bg-paper/12 px-4 py-3 backdrop-blur-[1.5px]">
              <p className="font-ui text-[10px] uppercase tracking-[0.12em] text-paper/72">{chapterConfig.labels[activeScene] ?? "Lens stage"}</p>
              <p className="mt-1 text-lg font-semibold text-paper">{activeSceneData.title}</p>
              <p className="mt-1 text-sm text-paper/82">{activeSceneData.description}</p>
            </div>
          </div>
        </div>

        <aside className={cn("rounded-[1.2rem] border border-paper/18 p-4 sm:p-5", interpretationPanelClass)}>
          <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>Interpretation stack</p>
          <div className="mt-3 space-y-2.5">
            {story.scenes.slice(0, experienceConfig.chapterCount).map((scene, index) => (
              <motion.div
                key={scene.id}
                animate={{ opacity: index <= activeScene ? 1 : 0.5, x: index === activeScene ? 0 : 5 }}
                className={cn(
                  "rounded-xl border px-3 py-2",
                  index === activeScene ? "border-paper/44 bg-paper/16" : "border-paper/18 bg-paper/8",
                )}
                transition={{ duration: motionDuration.fast, ease: motionEasing.standard }}
              >
                <p className="font-ui text-[10px] uppercase tracking-[0.11em] text-paper/72">{chapterConfig.metricHints?.[index] ?? "Evidence"}</p>
                <p className="mt-1 text-sm text-paper/88">{scene.title}</p>
              </motion.div>
            ))}
          </div>
        </aside>
      </div>
    </ExperienceSection>
  );
}
