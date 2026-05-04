"use client";

import { useRef } from "react";

import { ExperienceSection, SceneCaption, StaticMediaFallback, useScrollController, useVideoSceneState } from "@/components/sections/media-experiences/shared";
import type { MediaExperienceProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ContactIntakeConsoleExperience({
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
  const { activeScene, progress, reduceMotion } = useScrollController({
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
      className={compact ? "py-10" : "py-14"}
      kind="contact_intake_console"
      variantId={experienceConfig.variantId}
    >
      <div className="mb-5">
        <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.14em]", tone.accentText)}>{heading}</p>
        <h2 className="mt-2 max-w-3xl font-heading text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-[1.03] text-ink">{story.title}</h2>
      </div>

      <div
        ref={stageRef}
        className={cn(
          "grid min-h-[38rem] gap-4 rounded-[1.6rem] border border-line/70 bg-paper p-3 sm:min-h-[40rem] sm:p-4 lg:h-[54svh] lg:min-h-0 lg:grid-cols-[1.1fr_0.9fr]",
        )}
      >
        <aside className="rounded-[1.1rem] border border-line bg-sand/70 p-4 sm:p-5" data-testid="intake-timeline">
          <p className={cn("font-ui text-[10px] font-semibold uppercase tracking-[0.12em]", tone.accentText)}>Intake timeline</p>

          <div className="relative mt-4">
            <div className="absolute left-[7px] top-1 h-[calc(100%-8px)] w-px bg-line" />
            <div className="absolute left-[7px] top-1 w-px bg-ink" style={{ height: `${Math.max(10, (activeScene + 1) / experienceConfig.chapterCount * 100)}%` }} />

            <div className="space-y-3">
              {story.scenes.slice(0, experienceConfig.chapterCount).map((scene, index) => (
                <div key={scene.id} className="grid grid-cols-[16px_1fr] gap-3">
                  <span className={cn("mt-1.5 h-3 w-3 rounded-full border", index <= activeScene ? "border-ink bg-ink" : "border-line bg-paper")} />
                  <div className={cn("rounded-lg border px-3 py-2", index === activeScene ? "border-ink/30 bg-paper" : "border-line bg-paper/80")}>
                    <p className="font-ui text-[10px] uppercase tracking-[0.1em] text-ink/58">{chapterConfig.labels[index] ?? `Step ${index + 1}`}</p>
                    <p className="mt-1 text-sm text-ink/80">{scene.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="relative min-h-[10.5rem] overflow-hidden rounded-[1.1rem] border border-line bg-ink lg:min-h-0">
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
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,14,11,0.84)_14%,rgba(18,14,11,0.3)_54%,transparent_100%)]" />

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <SceneCaption
              accentClass={cn("text-paper", tone.accentText)}
              activeSceneData={activeSceneData}
              chapterLabel={chapterConfig.labels[activeScene] ?? "Intake"}
              metricHint={chapterConfig.metricHints?.[activeScene]}
            />
          </div>
        </div>
      </div>
    </ExperienceSection>
  );
}
