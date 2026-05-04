"use client";

import { useMemo, useRef } from "react";

import { ExperienceSection, SceneCaption, StaticMediaFallback, useScrollController, useVideoSceneState } from "@/components/sections/media-experiences/shared";
import type { MediaExperienceProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CustomProgramFlowComposerExperience({
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

  const nodeState = useMemo(() => {
    return {
      counts: activeScene >= 1,
      surveys: activeScene >= 2,
      studies: activeScene >= 3,
      output: activeScene >= 4,
      qa: activeScene >= 5,
    };
  }, [activeScene]);

  if (reduceMotion) {
    return <StaticMediaFallback compact={compact} heading={heading} story={story} />;
  }

  return (
    <ExperienceSection
      className={compact ? "py-12" : "py-16"}
      kind="custom_program_flow_composer"
      variantId={experienceConfig.variantId}
    >
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
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,14,11,0.88)_18%,rgba(18,14,11,0.42)_56%,rgba(18,14,11,0.18)_100%)]" />

        <div className="absolute inset-5 rounded-[1.2rem] border border-paper/22 bg-paper/8 p-4 sm:p-5" data-testid="flow-composer-board">
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            <line x1="18" y1="26" x2="44" y2="26" stroke={nodeState.counts ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)"} strokeDasharray="3 2" strokeWidth="1.2" />
            <line x1="44" y1="26" x2="66" y2="46" stroke={nodeState.surveys ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)"} strokeDasharray="3 2" strokeWidth="1.2" />
            <line x1="18" y1="70" x2="44" y2="46" stroke={nodeState.studies ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)"} strokeDasharray="3 2" strokeWidth="1.2" />
            <line x1="66" y1="46" x2="84" y2="46" stroke={nodeState.output ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)"} strokeDasharray="3 2" strokeWidth="1.2" />
            <line x1="84" y1="46" x2="84" y2="74" stroke={nodeState.qa ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)"} strokeDasharray="3 2" strokeWidth="1.2" />
          </svg>

          <FlowNode active={nodeState.counts} label="Counts" xClass="left-[6%]" yClass="top-[16%]" />
          <FlowNode active={nodeState.surveys} label="Surveys" xClass="left-[41%]" yClass="top-[16%]" />
          <FlowNode active={nodeState.studies} label="Studies" xClass="left-[6%]" yClass="top-[58%]" />
          <FlowNode active={nodeState.output} label="Output" xClass="left-[72%]" yClass="top-[38%]" />
          <FlowNode active={nodeState.qa} label="QA" xClass="left-[72%]" yClass="top-[70%]" />

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <SceneCaption
              accentClass={cn("text-paper", tone.accentText)}
              activeSceneData={activeSceneData}
              chapterLabel={chapterConfig.labels[activeScene] ?? "Program step"}
              metricHint={chapterConfig.metricHints?.[activeScene]}
            />
          </div>
        </div>
      </div>
    </ExperienceSection>
  );
}

function FlowNode({
  label,
  active,
  xClass,
  yClass,
}: {
  label: string;
  active: boolean;
  xClass: string;
  yClass: string;
}) {
  return (
    <div
      className={cn(
        "absolute rounded-full border px-3 py-1.5 font-ui text-[10px] font-semibold uppercase tracking-[0.11em] transition",
        xClass,
        yClass,
        active ? "border-paper/50 bg-paper/18 text-paper" : "border-paper/20 bg-paper/6 text-paper/70",
      )}
    >
      {label}
    </div>
  );
}
