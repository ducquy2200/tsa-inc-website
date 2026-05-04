"use client";

import { motion } from "framer-motion";
import { useMemo, useRef } from "react";

import { ExperienceSection, SceneCaption, StaticMediaFallback, useScrollController, useVideoSceneState } from "@/components/sections/media-experiences/shared";
import { motionDuration, motionEasing } from "@/lib/motion";
import type { MediaExperienceProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StudiesEvidenceObservatoryExperience({
  heading,
  compact,
  story,
  tone,
  motionConfig,
  motionPreset,
  experienceConfig,
  chapterConfig,
}: MediaExperienceProps) {
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

  const badgeDeck = useMemo(() => {
    return story.scenes.slice(0, experienceConfig.chapterCount).map((scene, index) => ({
      id: scene.id,
      title: chapterConfig.labels[index] ?? `Evidence ${index + 1}`,
      subtitle: chapterConfig.metricHints?.[index] ?? "Observation",
      offsetX: index % 2 === 0 ? -1 : 1,
    }));
  }, [chapterConfig.labels, chapterConfig.metricHints, experienceConfig.chapterCount, story.scenes]);

  if (reduceMotion) {
    return <StaticMediaFallback compact={compact} heading={heading} story={story} />;
  }

  return (
    <ExperienceSection
      className={compact ? "py-12" : "py-16"}
      kind="studies_evidence_observatory"
      variantId={experienceConfig.variantId}
    >
      <div className="mb-5">
        <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.14em]", tone.accentText)}>{heading}</p>
        <h2 className="mt-2 max-w-3xl font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] text-ink">{story.title}</h2>
      </div>

      <div
        ref={stageRef}
        className={cn("relative overflow-hidden rounded-[1.9rem] border border-line/70 bg-ink", stageHeightClass)}
        data-testid="evidence-observatory-stage"
      >
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

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,234,212,0.25),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(203,213,225,0.18),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,14,11,0.9)_14%,rgba(18,14,11,0.45)_56%,rgba(18,14,11,0.15)_100%)]" />

        {badgeDeck.map((badge, index) => (
          <motion.div
            key={badge.id}
            className={cn(
              "absolute hidden rounded-xl border border-paper/20 bg-paper/10 px-3 py-2 backdrop-blur-[1.5px] lg:block",
              index % 3 === 0 ? "left-[6%] top-[16%]" : index % 3 === 1 ? "left-[70%] top-[24%]" : "left-[42%] top-[9%]",
              index === activeScene ? "border-paper/45" : "opacity-75",
            )}
            animate={{
              y: index === activeScene ? -8 : badge.offsetX * 4,
              x: badge.offsetX * 3,
              opacity: index === activeScene ? 1 : 0.62,
            }}
            transition={{ duration: motionDuration.fast, ease: motionEasing.standard }}
          >
            <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.11em] text-paper/80">{badge.title}</p>
            <p className="mt-1 text-xs text-paper/70">{badge.subtitle}</p>
          </motion.div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <SceneCaption
            accentClass={cn("text-paper", tone.accentText)}
            activeSceneData={activeSceneData}
            chapterLabel={chapterConfig.labels[activeScene] ?? "Chapter"}
            metricHint={chapterConfig.metricHints?.[activeScene]}
          />

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {badgeDeck.slice(0, 3).map((badge, index) => (
              <div key={badge.id} className={cn("rounded-lg border border-paper/20 px-3 py-2", index === activeScene % 3 ? "bg-paper/16" : "bg-paper/8")}>
                <p className="font-ui text-[10px] uppercase tracking-[0.11em] text-paper/68">{badge.title}</p>
                <p className="mt-1 text-xs text-paper/82">{badge.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ExperienceSection>
  );
}
