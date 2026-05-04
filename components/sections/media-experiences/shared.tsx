"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, RefObject, SyntheticEvent } from "react";

import { useMotionPreference } from "@/components/ui/use-motion-preference";
import { motionDuration, motionEasing, scrollExperienceMotion } from "@/lib/motion";
import type { RouteMediaStory } from "@/lib/media-assets";
import type { MediaExperienceProps, MediaScene, MotionPreset, RouteMotionConfig } from "@/lib/types";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollControllerArgs {
  stageRef: RefObject<HTMLElement | null>;
  sceneCount: number;
  chapterStyle: MediaExperienceProps["experienceConfig"]["chapterStyle"];
  motionConfig: RouteMotionConfig;
  motionPreset: MotionPreset;
}

export interface ScrollControllerResult {
  activeScene: number;
  progress: number;
  reduceMotion: boolean;
  stageHeightClass: string;
}

export function useScrollController({
  stageRef,
  sceneCount,
  chapterStyle,
  motionConfig,
  motionPreset,
}: ScrollControllerArgs): ScrollControllerResult {
  const { reduceMotion } = useMotionPreference(motionPreset);
  const [activeScene, setActiveScene] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stageElement = stageRef.current;

    if (!stageElement || reduceMotion || sceneCount <= 0) {
      setActiveScene(0);
      setProgress(0);
      return;
    }

    const distancePerChapter =
      motionConfig.interactionStyle === "chapter"
        ? scrollExperienceMotion.pin.chapterDistance
        : motionConfig.interactionStyle === "restrained"
          ? scrollExperienceMotion.pin.restrainedDistance
          : scrollExperienceMotion.pin.compactDistance;

    const endDistance = Math.max(distancePerChapter * sceneCount, distancePerChapter * 2);
    const scrubValue =
      motionConfig.interactionStyle === "chapter"
        ? scrollExperienceMotion.scrub.medium
        : motionConfig.interactionStyle === "restrained"
          ? scrollExperienceMotion.scrub.restrained
          : scrollExperienceMotion.scrub.compact;

    const allowSnap = chapterStyle === "carousel" || chapterStyle === "stacked";

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stageElement,
        start: `top top+=${scrollExperienceMotion.pin.topOffset}`,
        end: `+=${endDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: scrubValue,
        snap:
          allowSnap && sceneCount > 1
            ? {
                snapTo: 1 / (sceneCount - 1),
                duration: scrollExperienceMotion.snap.duration,
                ease: scrollExperienceMotion.snap.ease,
              }
            : undefined,
        onUpdate: (self) => {
          const nextProgress = self.progress;
          const boundedProgress = Math.min(0.9999, Math.max(0, nextProgress));
          const nextScene = Math.min(sceneCount - 1, Math.floor(boundedProgress * sceneCount));

          setProgress(nextProgress);
          setActiveScene(nextScene);
        },
      });
    }, stageElement);

    return () => {
      context.revert();
    };
  }, [chapterStyle, motionConfig.interactionStyle, reduceMotion, sceneCount, stageRef]);

  const stageHeightClass =
    motionConfig.panelHeight === "tall"
      ? "h-[40rem] sm:h-[43rem] lg:h-[78svh]"
      : motionConfig.panelHeight === "short"
        ? "h-[34rem] sm:h-[36rem] lg:h-[54svh]"
        : "h-[38rem] sm:h-[41rem] lg:h-[66svh]";

  return {
    activeScene,
    progress,
    reduceMotion: Boolean(reduceMotion),
    stageHeightClass,
  };
}

interface VideoSceneStateArgs {
  story: RouteMediaStory;
  activeScene: number;
  progress: number;
  scrubStrength: number;
  reduceMotion: boolean;
}

export interface VideoSceneStateResult {
  activeSceneData: MediaScene;
  activeClipIndex: number;
  bindVideoRef: (clipIndex: number) => (node: HTMLVideoElement | null) => void;
  handleMetadataLoad: (clipIndex: number) => (event: SyntheticEvent<HTMLVideoElement>) => void;
  uniqueClipIndexes: number[];
}

export function useVideoSceneState({
  story,
  activeScene,
  progress,
  scrubStrength,
  reduceMotion,
}: VideoSceneStateArgs): VideoSceneStateResult {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const durationMap = useRef<number[]>([]);

  const uniqueClipIndexes = useMemo(
    () => Array.from(new Set(story.scenes.map((scene) => scene.clipIndex).filter((index) => story.clips[index]))),
    [story.clips, story.scenes],
  );

  useEffect(() => {
    if (reduceMotion || story.scenes.length === 0) {
      return;
    }

    const bounded = Math.min(0.9999, Math.max(0, progress));
    const sceneFloat = bounded * story.scenes.length;
    const sceneIndex = Math.min(story.scenes.length - 1, Math.floor(sceneFloat));
    const scene = story.scenes[sceneIndex];
    const sceneProgress = Math.min(1, Math.max(0, (sceneFloat - sceneIndex) * scrubStrength));
    const activeVideo = videoRefs.current[scene.clipIndex];
    const duration = durationMap.current[scene.clipIndex] ?? activeVideo?.duration ?? 0;

    if (!activeVideo || !Number.isFinite(duration) || duration <= 0) {
      return;
    }

    const start = Math.min(Math.max(scene.start, 0), 1);
    const end = Math.min(Math.max(scene.end, start + 0.01), 1);
    const targetTime = duration * (start + (end - start) * sceneProgress);

    if (Math.abs(activeVideo.currentTime - targetTime) > 0.08) {
      activeVideo.currentTime = targetTime;
    }
  }, [progress, reduceMotion, scrubStrength, story.scenes]);

  const activeSceneData = story.scenes[activeScene] ?? story.scenes[0];
  const activeClipIndex = activeSceneData?.clipIndex ?? 0;

  return {
    activeSceneData,
    activeClipIndex,
    uniqueClipIndexes,
    bindVideoRef: (clipIndex) => (node) => {
      videoRefs.current[clipIndex] = node;
    },
    handleMetadataLoad: (clipIndex) => (event) => {
      durationMap.current[clipIndex] = event.currentTarget.duration;
    },
  };
}

export function StaticMediaFallback({
  story,
  heading,
  compact,
}: {
  story: RouteMediaStory;
  heading: string;
  compact?: boolean;
}) {
  const firstClip = story.clips[0];

  if (!firstClip) {
    return null;
  }

  return (
    <section className={cn("px-5 sm:px-8 lg:px-10", compact ? "py-12" : "py-16")} data-testid="media-experience-static">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.6rem] border border-line bg-ink text-paper">
        <div className="relative">
          <video
            aria-hidden="true"
            className={cn("w-full object-cover", compact ? "h-[300px]" : "h-[380px]")}
            muted
            playsInline
            poster={firstClip.posterSrc}
            preload="metadata"
            src={firstClip.videoSrc}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,14,11,0.82)_12%,rgba(18,14,11,0.3)_54%,transparent_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-paper/72">{heading}</p>
            <p className="mt-2 max-w-2xl font-heading text-2xl font-semibold leading-tight sm:text-3xl">{firstClip.title}</p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-paper/80 sm:text-base">{firstClip.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SceneCaption({
  activeSceneData,
  chapterLabel,
  metricHint,
  accentClass,
}: {
  activeSceneData: MediaScene;
  chapterLabel: string;
  metricHint?: string;
  accentClass: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSceneData.id}
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: motionDuration.base, ease: motionEasing.standard }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("rounded-full bg-paper/12 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-paper/80", accentClass)}>
            {chapterLabel}
          </span>
          {metricHint ? (
            <span className="rounded-full border border-paper/20 bg-paper/7 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-[0.11em] text-paper/70">
              {metricHint}
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 max-w-2xl font-heading text-2xl font-semibold leading-tight text-paper sm:text-3xl" data-testid="media-scene-title">
          {activeSceneData.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-paper/82 sm:text-base">{activeSceneData.description}</p>
      </motion.div>
    </AnimatePresence>
  );
}

export function ExperienceSection({
  className,
  children,
  kind,
  variantId,
}: {
  className?: string;
  children: ReactNode;
  kind: string;
  variantId?: string;
}) {
  return (
    <section
      className={cn("relative px-5 py-16 sm:px-8 lg:px-10", className)}
      data-experience-kind={kind}
      data-variant-id={variantId}
      data-testid="media-experience"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
