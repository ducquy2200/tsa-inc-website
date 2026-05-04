"use client";

import { useRef } from "react";

import { ExperienceSection, SceneCaption, StaticMediaFallback, useScrollController, useVideoSceneState } from "@/components/sections/media-experiences/shared";
import type { MediaExperienceProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CountsLaneAtlasExperience({
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

  const chapterLabel = chapterConfig.labels[activeScene] ?? chapterConfig.labels[0] ?? "Chapter";
  const metricHint = chapterConfig.metricHints?.[activeScene];

  return (
    <ExperienceSection
      className={compact ? "py-12" : "py-16"}
      kind="counts_lane_atlas"
      variantId={experienceConfig.variantId}
    >
      <div className="mb-5">
        <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.14em]", tone.accentText)}>{heading}</p>
        <h2 className="mt-2 max-w-3xl font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] text-ink">{story.title}</h2>
      </div>

      <div ref={stageRef} className={cn("grid gap-5 rounded-[1.8rem] border border-line/70 bg-ink/95 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr]", stageHeightClass)}>
        <div className="relative overflow-hidden rounded-[1.3rem] border border-paper/15">
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

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,14,11,0.85)_10%,rgba(18,14,11,0.35)_45%,transparent_100%)]" />

          <svg aria-hidden="true" className="pointer-events-none absolute inset-4 hidden lg:block" viewBox="0 0 640 420">
            <path d="M24 380 C 130 250, 180 250, 280 190 S 470 120, 616 62" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="3" />
            <path d="M24 370 C 118 248, 178 245, 286 186 S 482 118, 616 54" fill="none" stroke="rgba(255,255,255,0.62)" strokeDasharray="460" strokeDashoffset={460 - progress * 460} strokeWidth="3.5" />
            <path d="M60 335 C 160 280, 232 230, 356 146 S 516 88, 590 58" fill="none" stroke="rgba(196,105,58,0.65)" strokeDasharray="390" strokeDashoffset={390 - progress * 390} strokeWidth="2" />
          </svg>

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <SceneCaption accentClass="text-paper" activeSceneData={activeSceneData} chapterLabel={chapterLabel} metricHint={metricHint} />
          </div>
        </div>

        <aside className="rounded-[1.3rem] border border-paper/16 bg-paper/6 p-4 sm:p-5" data-testid="lane-atlas-rail">
          <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.13em] text-paper/70">Operational rail</p>
          <div className="mt-3 space-y-2.5">
            {story.scenes.slice(0, experienceConfig.chapterCount).map((scene, index) => (
              <div
                key={scene.id}
                className={cn(
                  "rounded-xl border px-3 py-2.5 transition",
                  index === activeScene ? "border-paper/45 bg-paper/16" : "border-paper/16 bg-paper/6",
                )}
              >
                <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-paper/70">{chapterConfig.labels[index] ?? `Step ${index + 1}`}</p>
                <p className="mt-1 text-sm leading-6 text-paper/88">{scene.title}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </ExperienceSection>
  );
}
