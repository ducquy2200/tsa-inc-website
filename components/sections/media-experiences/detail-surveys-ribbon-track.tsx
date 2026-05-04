"use client";

import { motion } from "framer-motion";
import { useMemo, useRef } from "react";

import { ExperienceSection, SceneCaption, StaticMediaFallback, useScrollController, useVideoSceneState } from "@/components/sections/media-experiences/shared";
import { motionDuration, motionEasing } from "@/lib/motion";
import type { MediaExperienceProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DetailSurveysRibbonTrackExperience({
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
  const ribbonPanelClass =
    variantId === "detail-surveys-license"
      ? "bg-paper/10"
      : variantId === "detail-surveys-parking"
        ? "bg-paper/16"
        : "bg-paper/8";
  const chipBaseClass =
    variantId === "detail-surveys-license"
      ? "rounded-md"
      : variantId === "detail-surveys-parking"
        ? "rounded-full"
        : "rounded-[0.7rem]";
  const desktopRibbonFrameTopClass =
    variantId === "detail-surveys-license"
      ? "top-[15rem]"
      : variantId === "detail-surveys-parking"
        ? "top-[14.5rem]"
        : "top-[15.5rem]";

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

  const slideCount = Math.max(1, Math.min(experienceConfig.chapterCount, story.scenes.length));
  const translatePercent = useMemo(() => {
    if (slideCount <= 1) {
      return 0;
    }

    return -progress * (slideCount - 1) * 100;
  }, [progress, slideCount]);

  if (reduceMotion) {
    return <StaticMediaFallback compact={compact} heading={heading} story={story} />;
  }

  return (
    <ExperienceSection className={compact ? "py-12" : "py-16"} kind="detail_surveys_ribbon_track" variantId={variantId}>
      <div className="mb-5">
        <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.14em]", tone.accentText)}>{heading}</p>
        <h2 className="mt-2 max-w-3xl font-heading text-[clamp(1.8rem,3.8vw,2.8rem)] font-semibold leading-[1.03] text-ink">{story.title}</h2>
      </div>

      <div ref={stageRef} className={cn("relative overflow-hidden rounded-[1.8rem] border border-line/70 bg-ink", stageHeightClass)}>
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

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,14,11,0.88)_14%,rgba(18,14,11,0.42)_50%,rgba(18,14,11,0.2)_100%)]" />

        <div className="absolute left-0 right-0 top-0 z-20 flex gap-2 overflow-hidden px-4 pb-3 pt-4 sm:px-5">
          {chapterConfig.labels.slice(0, slideCount).map((label, index) => (
            <div
              key={label}
              className={cn(
                "border px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-[0.11em]",
                chipBaseClass,
                index === activeScene ? "border-paper/45 bg-paper/20 text-paper" : "border-paper/18 bg-paper/8 text-paper/72",
              )}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="absolute left-5 right-5 top-16 z-20 hidden md:block">
          <SceneCaption
            accentClass={cn("text-paper", tone.accentText)}
            activeSceneData={activeSceneData}
            chapterLabel={chapterConfig.labels[activeScene] ?? "Checkpoint"}
            metricHint={chapterConfig.metricHints?.[activeScene]}
          />
        </div>

        <div className="absolute inset-x-3 bottom-3 top-16 z-20 overflow-y-auto md:hidden">
          <div className="space-y-2.5">
            {story.scenes.slice(0, slideCount).map((scene, index) => (
              <article
                key={scene.id}
                className={cn(
                  "rounded-xl border border-paper/20 p-3.5 backdrop-blur-[1.2px]",
                  ribbonPanelClass,
                  index === activeScene ? "bg-paper/18" : "bg-paper/10",
                )}
              >
                <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.11em]", tone.accentText)}>
                  {chapterConfig.labels[index] ?? `Checkpoint ${index + 1}`}
                </p>
                <p className="mt-1 text-lg font-semibold leading-tight text-paper">{scene.title}</p>
                <p className="mt-1.5 text-sm leading-7 text-paper/85">{scene.description}</p>
              </article>
            ))}
          </div>
        </div>

        <motion.div
          className={cn("absolute bottom-5 left-5 right-5 z-20 hidden gap-4 md:flex", desktopRibbonFrameTopClass)}
          data-testid="ribbon-track"
          animate={{ x: `${translatePercent}%` }}
          transition={{ duration: motionDuration.fast, ease: motionEasing.standard }}
        >
          {story.scenes.slice(0, slideCount).map((scene, index) => (
            <article
              key={scene.id}
              className={cn(
                "min-w-full rounded-[1.2rem] border border-paper/20 p-4 backdrop-blur-[1.2px] sm:p-5",
                ribbonPanelClass,
              )}
            >
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.12em]", tone.accentText)}>
                {chapterConfig.metricHints?.[index] ?? "Checkpoint"}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-paper sm:text-2xl">{scene.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-paper/82">{scene.description}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-paper/20 bg-paper/8 p-3">
                  <p className="font-ui text-[10px] uppercase tracking-[0.11em] text-paper/70">Prompt</p>
                  <p className="mt-1 text-sm text-paper/86">Route question for this survey stage.</p>
                </div>
                <div className="rounded-xl border border-paper/20 bg-paper/8 p-3">
                  <p className="font-ui text-[10px] uppercase tracking-[0.11em] text-paper/70">Result lens</p>
                  <p className="mt-1 text-sm text-paper/86">Decision signal this checkpoint contributes.</p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </ExperienceSection>
  );
}
