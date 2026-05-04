"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import { ExperienceSection, StaticMediaFallback, useScrollController, useVideoSceneState } from "@/components/sections/media-experiences/shared";
import { motionDuration, motionEasing } from "@/lib/motion";
import type { MediaExperienceProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DetailCountsStackdeckExperience({
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
  const topVideoHeightClass =
    variantId === "detail-counts-turning"
      ? "h-44"
      : variantId === "detail-counts-atr"
        ? "h-36"
        : "h-40";
  const stackStartTopClass =
    variantId === "detail-counts-turning"
      ? "top-[6.5rem]"
      : variantId === "detail-counts-atr"
        ? "top-[5.5rem]"
        : "top-[6rem]";
  const mobileStackStartTopClass =
    variantId === "detail-counts-turning"
      ? "top-[11.2rem]"
      : variantId === "detail-counts-atr"
        ? "top-[9.2rem]"
        : "top-[10.2rem]";
  const videoTintClass =
    variantId === "detail-counts-turning"
      ? "bg-[linear-gradient(to_bottom,rgba(18,14,11,0.2),rgba(18,14,11,0.76))]"
      : variantId === "detail-counts-atr"
        ? "bg-[linear-gradient(to_bottom,rgba(18,14,11,0.18),rgba(18,14,11,0.86))]"
        : "bg-[linear-gradient(to_bottom,rgba(28,20,15,0.24),rgba(18,14,11,0.8))]";

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

  if (reduceMotion) {
    return <StaticMediaFallback compact={compact} heading={heading} story={story} />;
  }

  return (
    <ExperienceSection className={compact ? "py-12" : "py-16"} kind="detail_counts_stackdeck" variantId={variantId}>
      <div className="mb-5">
        <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.14em]", tone.accentText)}>{heading}</p>
        <h2 className="mt-2 max-w-3xl font-heading text-[clamp(1.8rem,3.8vw,2.8rem)] font-semibold leading-[1.03] text-ink">{story.title}</h2>
      </div>

      <div ref={stageRef} className={cn("relative overflow-hidden rounded-[1.8rem] border border-line/70 bg-ink p-3 sm:p-4", stageHeightClass)}>
        {uniqueClipIndexes.map((clipIndex) => {
          const clip = story.clips[clipIndex];

          return (
            <video
              key={clip.id}
              aria-hidden="true"
              className={cn(
                "absolute left-0 right-0 top-0 w-full object-cover transition-opacity duration-500",
                topVideoHeightClass,
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
        <div
          className={cn(
            "pointer-events-none absolute left-0 right-0 top-0",
            topVideoHeightClass,
            videoTintClass,
          )}
        />

        <div className={cn("absolute inset-x-3 bottom-3 overflow-y-auto pr-1 md:hidden", mobileStackStartTopClass)}>
          <div className="space-y-2.5">
            {story.scenes.slice(0, experienceConfig.chapterCount).map((scene, index) => (
              <article
                key={scene.id}
                className={cn(
                  "rounded-xl border bg-paper/95 px-3 py-2.5",
                  index === activeScene ? "border-paper/40 shadow-[0_10px_24px_rgba(0,0,0,0.18)]" : "border-paper/20",
                )}
              >
                <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.11em]", tone.accentText)}>
                  {chapterConfig.labels[index] ?? `Step ${index + 1}`}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-ink">{scene.title}</p>
                <p className="mt-1 text-xs leading-6 text-ink/74">{scene.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div
          className={cn("absolute inset-x-3 bottom-3 hidden sm:inset-x-4 md:block", stackStartTopClass)}
          data-testid="stackdeck-cards"
        >
          {story.scenes.slice(0, experienceConfig.chapterCount).map((scene, index) => {
            const relativeIndex = index - activeScene;
            const topOffset = index * 46;
            const isActive = index === activeScene;

            return (
              <motion.article
                key={scene.id}
                animate={{
                  y: topOffset + relativeIndex * 3,
                  scale: isActive ? 1 : 0.94,
                  opacity: index < activeScene ? 0.2 : 1,
                }}
                className={cn(
                  "absolute left-0 right-0 rounded-2xl border border-paper/18 bg-paper/95 px-4 py-3 shadow-[0_16px_28px_rgba(0,0,0,0.24)]",
                  isActive ? "z-30" : "z-20",
                )}
                transition={{ duration: motionDuration.fast, ease: motionEasing.standard }}
              >
                <div className="grid gap-3 sm:grid-cols-[86px_1fr]">
                  <div>
                    <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.11em]", tone.accentText)}>{chapterConfig.labels[index] ?? `Step ${index + 1}`}</p>
                    <p className="mt-1 text-xs text-ink/58">{chapterConfig.metricHints?.[index] ?? "Method"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{scene.title}</p>
                    <p className="mt-1 text-xs leading-6 text-ink/72">{scene.description}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="absolute left-4 top-4 rounded-full border border-paper/22 bg-paper/12 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-[0.11em] text-paper/85">
          {chapterConfig.labels[activeScene] ?? "Step"}
        </div>
        <p className="absolute left-4 right-4 top-12 hidden text-sm text-paper/80 md:block">{activeSceneData.title}</p>
      </div>
    </ExperienceSection>
  );
}
