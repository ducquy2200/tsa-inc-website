"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import { ExperienceSection, SceneCaption, StaticMediaFallback, useScrollController, useVideoSceneState } from "@/components/sections/media-experiences/shared";
import { motionDuration, motionEasing } from "@/lib/motion";
import type { MediaExperienceProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SurveysDecisionMatrixExperience({
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

  if (reduceMotion) {
    return <StaticMediaFallback compact={compact} heading={heading} story={story} />;
  }

  return (
    <ExperienceSection
      className={compact ? "py-12" : "py-16"}
      kind="surveys_decision_matrix"
      variantId={experienceConfig.variantId}
    >
      <div className="mb-5">
        <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.14em]", tone.accentText)}>{heading}</p>
        <h2 className="mt-2 max-w-3xl font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] text-ink">{story.title}</h2>
      </div>

      <div ref={stageRef} className={cn("grid gap-4 rounded-[1.8rem] border border-line/70 bg-paper p-3 sm:p-4 lg:grid-cols-[0.9fr_1.1fr_0.9fr]", stageHeightClass)}>
        <aside className="rounded-[1.2rem] border border-line bg-sand/80 p-3 sm:p-4" data-testid="decision-matrix-questions">
          <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.13em]", tone.accentText)}>Question cards</p>
          <div className="mt-3 space-y-2">
            {story.scenes.slice(0, experienceConfig.chapterCount).map((scene, index) => (
              <div
                key={scene.id}
                className={cn(
                  "rounded-lg border px-3 py-2 transition",
                  index === activeScene ? cn("bg-paper", tone.accentBorder) : "border-line/80 bg-paper/70",
                )}
              >
                <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.11em] text-ink/55">{chapterConfig.labels[index] ?? `Path ${index + 1}`}</p>
                <p className="mt-1 text-sm leading-6 text-ink/80">{scene.title}</p>
              </div>
            ))}
          </div>
        </aside>

        <div className="relative overflow-hidden rounded-[1.2rem] border border-line/70 bg-ink">
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
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.26),transparent_55%)]"
            animate={{ x: ["-24%", "7%", "-24%"] }}
            transition={{ duration: motionDuration.reveal * 2.2, repeat: Number.POSITIVE_INFINITY, ease: motionEasing.loop }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,14,11,0.82)_10%,rgba(18,14,11,0.28)_54%,transparent_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <SceneCaption
              accentClass={cn("text-paper", tone.accentText)}
              activeSceneData={activeSceneData}
              chapterLabel={chapterConfig.labels[activeScene] ?? "Chapter"}
              metricHint={chapterConfig.metricHints?.[activeScene]}
            />
          </div>
        </div>

        <aside className="rounded-[1.2rem] border border-line bg-sand/80 p-3 sm:p-4" data-testid="decision-matrix-outcomes">
          <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.13em]", tone.accentText)}>Outcome matrix</p>
          <div className="mt-3 space-y-2.5">
            {story.scenes.slice(0, experienceConfig.chapterCount).map((scene, index) => {
              const strength = index < activeScene ? 1 : index === activeScene ? 0.78 + progress * 0.22 : 0.18;

              return (
                <div key={scene.id} className="rounded-lg border border-line/80 bg-paper/80 px-3 py-2">
                  <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.11em] text-ink/55">Signal {String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-1 text-sm text-ink/75">{chapterConfig.metricHints?.[index] ?? "Confidence"}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line/70">
                    <motion.div
                      className={cn("h-full rounded-full", tone.accentDot)}
                      animate={{ width: `${Math.max(8, Math.min(100, strength * 100))}%` }}
                      transition={{ duration: motionDuration.fast, ease: motionEasing.standard }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </ExperienceSection>
  );
}
