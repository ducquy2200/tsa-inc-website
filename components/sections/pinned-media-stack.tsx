"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useMemo, useRef, useState } from "react";

import { OrnamentField } from "@/components/sections/ornament-field";
import { motionDuration, motionEasing, scrollSpring } from "@/lib/motion";
import type { RouteMediaStory } from "@/lib/media-assets";
import type { ToneVariant } from "@/lib/theme";
import type { MotionPreset, RouteMotionConfig } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/components/ui/use-motion-preference";

interface PinnedMediaStackProps {
  story: RouteMediaStory;
  config: RouteMotionConfig;
  motionPreset: MotionPreset;
  tone: ToneVariant;
  heading: string;
  experienceKind?: string;
  variantId?: string;
  className?: string;
}

function panelHeightClass(panelHeight: RouteMotionConfig["panelHeight"]) {
  if (panelHeight === "tall") {
    return "h-[76svh]";
  }

  if (panelHeight === "short") {
    return "h-[56svh]";
  }

  return "h-[66svh]";
}

function chapterHeight(sceneCount: number, style: RouteMotionConfig["interactionStyle"]) {
  if (style === "chapter") {
    return `${Math.max(170, 126 + sceneCount * 62)}svh`;
  }

  if (style === "program") {
    return `${Math.max(150, 116 + sceneCount * 50)}svh`;
  }

  if (style === "restrained") {
    return `${Math.max(128, 98 + sceneCount * 36)}svh`;
  }

  return `${Math.max(142, 110 + sceneCount * 44)}svh`;
}

export function PinnedMediaStack({
  story,
  config,
  motionPreset,
  tone,
  heading,
  experienceKind,
  variantId,
  className,
}: PinnedMediaStackProps) {
  const hasSceneData = story.clips.length > 0 && story.scenes.length > 0;
  const { reduceMotion } = useMotionPreference(motionPreset);
  const stackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const durationMap = useRef<number[]>([]);
  const activeSceneRef = useRef(0);
  const [activeScene, setActiveScene] = useState(0);

  const uniqueClipIndexes = useMemo(() => {
    if (!hasSceneData) {
      return [] as number[];
    }

    return Array.from(new Set(story.scenes.map((scene) => scene.clipIndex).filter((index) => story.clips[index])));
  }, [hasSceneData, story]);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    ...(reduceMotion ? scrollSpring.reduced : scrollSpring.default),
  });

  useMotionValueEvent(smoothedProgress, "change", (latest) => {
    if (!hasSceneData) {
      return;
    }

    if (reduceMotion) {
      return;
    }

    const bounded = Math.min(0.9999, Math.max(0, latest));
    const sceneFloat = bounded * story.scenes.length;
    const nextSceneIndex = Math.min(story.scenes.length - 1, Math.floor(sceneFloat));

    if (nextSceneIndex !== activeSceneRef.current) {
      activeSceneRef.current = nextSceneIndex;
      setActiveScene(nextSceneIndex);
    }

    const scene = story.scenes[nextSceneIndex];
    const clipIndex = scene.clipIndex;
    const sceneProgress = Math.min(1, Math.max(0, (sceneFloat - nextSceneIndex) * config.scrubStrength));
    const activeVideo = videoRefs.current[clipIndex];
    const duration = durationMap.current[clipIndex] ?? activeVideo?.duration ?? 0;

    if (!activeVideo || !Number.isFinite(duration) || duration <= 0) {
      return;
    }

    const start = Math.min(Math.max(scene.start, 0), 1);
    const end = Math.min(Math.max(scene.end, start + 0.01), 1);
    const targetTime = duration * (start + (end - start) * sceneProgress);

    if (Math.abs(activeVideo.currentTime - targetTime) > 0.08) {
      activeVideo.currentTime = targetTime;
    }
  });

  if (!hasSceneData) {
    return null;
  }

  const activeSceneData = story.scenes[activeScene];
  const activeClipIndex = activeSceneData.clipIndex;
  const scrollSpan = chapterHeight(story.scenes.length, config.interactionStyle);

  const ornamentTintOpacityClass =
    activeSceneData.ornamentState === "origin"
      ? "opacity-55"
      : activeSceneData.ornamentState === "merge"
        ? "opacity-80"
        : "opacity-60";

  return (
    <section
      className={cn("relative bg-ink px-5 py-20 text-paper sm:px-8 lg:px-10", className)}
      data-active-scene={activeScene}
      data-experience-kind={experienceKind}
      data-variant-id={variantId}
      data-testid="pinned-media-stack"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-paper/65">{heading}</p>
        <h2 className="mt-3 max-w-3xl font-heading text-[clamp(2.1rem,4.8vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          {story.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-paper/72">{story.intro}</p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl">
        <div className="relative" ref={stackRef} style={{ height: scrollSpan }}>
          <div className={cn("sticky top-24 overflow-hidden rounded-[2rem] border border-paper/20 bg-paper/4 shadow-[0_24px_72px_rgba(0,0,0,0.36)]", panelHeightClass(config.panelHeight))}>
            <motion.div
              className={cn("absolute left-0 right-0 top-0 z-30 h-1.5 origin-left", tone.accentDot)}
              style={{ scaleX: reduceMotion ? 0 : smoothedProgress }}
            />

            <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", tone.accentGradient, ornamentTintOpacityClass)} />
            <OrnamentField className="opacity-90" motionPreset={motionPreset} placement={config.assetPlacement} preset={config.ornamentPreset} />

            <div className="absolute inset-0">
              {uniqueClipIndexes.map((clipIndex) => {
                const clip = story.clips[clipIndex];

                return (
                  <video
                    key={clip.id}
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                      clipIndex === activeClipIndex || reduceMotion ? "opacity-100" : "opacity-0",
                    )}
                    muted
                    playsInline
                    poster={clip.posterSrc}
                    preload="metadata"
                    ref={(node) => {
                      videoRefs.current[clipIndex] = node;
                    }}
                    src={clip.videoSrc}
                    onLoadedMetadata={(event) => {
                      durationMap.current[clipIndex] = event.currentTarget.duration;
                    }}
                  />
                );
              })}

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,14,11,0.84)_9%,rgba(18,14,11,0.34)_42%,rgba(18,14,11,0.12)_100%)]" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSceneData.id}
                  initial={reduceMotion ? false : { y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduceMotion ? undefined : { y: -12, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : motionDuration.base, ease: motionEasing.standard }}
                >
                  <h3 className="max-w-2xl font-heading text-2xl font-semibold leading-tight text-paper sm:text-3xl" data-testid="pinned-media-scene-title">
                    {activeSceneData.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-paper/78 sm:text-base">{activeSceneData.description}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {story.scenes.map((scene, index) => (
                  <div
                    key={scene.id}
                    className={cn(
                      "rounded-lg border border-paper/20 bg-ink/40 px-3 py-2 transition",
                      index === activeScene ? "border-paper/40 bg-paper/12" : "opacity-78",
                    )}
                  >
                    <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-paper/72">
                      Phase {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-xs text-paper/88">{scene.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
