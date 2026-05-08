"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { motionDuration, motionEasing, scrollSpring } from "@/lib/motion";
import { useMotionPreference } from "@/components/ui/use-motion-preference";
import type { ScrollMediaClip } from "@/lib/media-assets";
import { cn } from "@/lib/utils";

interface ScrollMediaStoryProps {
  title: string;
  intro: string;
  clips: ScrollMediaClip[];
}

interface RoadPoint {
  x: number;
  y: number;
}

interface RoadGeometry {
  d: string;
  width: number;
  height: number;
  dotThresholds: number[];
}

const ROAD_SIDE_PADDING = 6;
const ROAD_WIGGLE_MULTIPLIER = 10;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function seededNoise(seed: number) {
  const hashed = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return hashed - Math.floor(hashed);
}

function distance(a: RoadPoint, b: RoadPoint) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function cubicPoint(t: number, p0: RoadPoint, p1: RoadPoint, p2: RoadPoint, p3: RoadPoint): RoadPoint {
  const oneMinusT = 1 - t;
  const oneMinusTSquared = oneMinusT * oneMinusT;
  const tSquared = t * t;

  return {
    x:
      oneMinusT * oneMinusTSquared * p0.x +
      3 * oneMinusTSquared * t * p1.x +
      3 * oneMinusT * tSquared * p2.x +
      tSquared * t * p3.x,
    y:
      oneMinusT * oneMinusTSquared * p0.y +
      3 * oneMinusTSquared * t * p1.y +
      3 * oneMinusT * tSquared * p2.y +
      tSquared * t * p3.y,
  };
}

function cubicLength(p0: RoadPoint, p1: RoadPoint, p2: RoadPoint, p3: RoadPoint) {
  const samples = 18;
  let total = 0;
  let previous = p0;

  for (let sample = 1; sample <= samples; sample += 1) {
    const point = cubicPoint(sample / samples, p0, p1, p2, p3);
    total += distance(previous, point);
    previous = point;
  }

  return total;
}

function buildWiggleRoad(points: RoadPoint[], width: number): { d: string; dotThresholds: number[] } {
  if (points.length === 0) {
    return { d: "", dotThresholds: [] };
  }

  if (points.length === 1) {
    return { d: `M ${round(points[0].x)} ${round(points[0].y)}`, dotThresholds: [0] };
  }

  let d = `M ${round(points[0].x)} ${round(points[0].y)}`;
  const minX = ROAD_SIDE_PADDING;
  const maxX = width - ROAD_SIDE_PADDING;
  const segmentLengths: number[] = [];

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const span = Math.max(18, current.y - previous.y);
    const seedBase =
      index * 97.131 +
      previous.x * 0.173 +
      previous.y * 0.219 +
      current.x * 0.127 +
      current.y * 0.113 +
      width * 0.071;
    const noiseA = seededNoise(seedBase);
    const noiseB = seededNoise(seedBase + 11.17);
    const noiseC = seededNoise(seedBase + 29.53);
    const noiseD = seededNoise(seedBase + 47.91);

    const dirA = noiseB > 0.5 ? 1 : -1;
    const dirB = noiseD > 0.5 ? 1 : -1;
    const amplitudeA = (2.2 + noiseA * 5.8 + (index % 3) * 0.9) * ROAD_WIGGLE_MULTIPLIER;
    const amplitudeB = (2.0 + noiseC * 6.1 + ((index + 1) % 4) * 0.75) * ROAD_WIGGLE_MULTIPLIER;
    const control1x = clamp(previous.x + dirA * amplitudeA, minX, maxX);
    const control2x = clamp(current.x + dirB * amplitudeB, minX, maxX);
    const controlBandMin = previous.y - span * 0.15;
    const controlBandMax = current.y + span * 0.15;
    const control1y = clamp(previous.y + span * (0.14 + noiseB * 0.56), controlBandMin, controlBandMax);
    const control2y = clamp(current.y - span * (0.12 + noiseD * 0.58), controlBandMin, controlBandMax);

    d += ` C ${round(control1x)} ${round(control1y)}, ${round(control2x)} ${round(control2y)}, ${round(current.x)} ${round(current.y)}`;
    segmentLengths.push(
      cubicLength(
        previous,
        { x: control1x, y: control1y },
        { x: control2x, y: control2y },
        current,
      ),
    );
  }

  const totalLength = segmentLengths.reduce((sum, value) => sum + value, 0);
  const dotThresholds: number[] = [0];
  let traversed = 0;

  for (let index = 0; index < segmentLengths.length; index += 1) {
    traversed += segmentLengths[index];
    dotThresholds.push(totalLength > 0 ? traversed / totalLength : 1);
  }

  dotThresholds[dotThresholds.length - 1] = 1;

  return { d, dotThresholds };
}

function getRoadProgressFromStep(
  activeStep: number,
  stepProgress: number,
  clipCount: number,
  dotThresholds: number[],
) {
  if (clipCount <= 1) {
    return clipCount === 1 ? 1 : 0;
  }

  const boundedActiveStep = clamp(activeStep, 0, clipCount - 1);
  const boundedStepProgress = clamp(stepProgress, 0, 1);
  const fallbackCurrent = boundedActiveStep / (clipCount - 1);
  const fallbackNext = Math.min(1, (boundedActiveStep + 1) / (clipCount - 1));

  const current =
    dotThresholds.length === clipCount ? dotThresholds[boundedActiveStep] ?? fallbackCurrent : fallbackCurrent;
  const next =
    dotThresholds.length === clipCount
      ? dotThresholds[Math.min(clipCount - 1, boundedActiveStep + 1)] ?? fallbackNext
      : fallbackNext;

  return current + (next - current) * boundedStepProgress;
}

export function ScrollMediaStory({ title, intro, clips }: ScrollMediaStoryProps) {
  const noClips = clips.length === 0;
  const { reduceMotion } = useMotionPreference();
  const hasMultipleClips = clips.length > 1;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const durationMap = useRef<number[]>([]);
  const activeIndexRef = useRef(0);
  const stepListRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [roadGeometry, setRoadGeometry] = useState<RoadGeometry | null>(null);
  const roadPathProgress = useMotionValue(0);
  const scrollSpan = `${Math.max(165, 122 + clips.length * 54)}svh`;

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const smoothedProgress = useSpring(
    scrollYProgress,
    reduceMotion ? scrollSpring.homeReduced : scrollSpring.homeDefault,
  );
  const roadStrokeWidth = 2 + (Math.max(0, activeIndex) / Math.max(1, clips.length - 1)) * 2.8;

  const syncRoadGeometry = useCallback(() => {
    if (!hasMultipleClips) {
      setRoadGeometry(null);
      return;
    }

    const stepListElement = stepListRef.current;
    if (!stepListElement) {
      return;
    }

    const stepListRect = stepListElement.getBoundingClientRect();
    if (stepListRect.height <= 0 || stepListRect.width <= 0) {
      return;
    }

    const points = dotRefs.current
      .slice(0, clips.length)
      .map((dot) => {
        if (!dot) {
          return null;
        }

        const dotRect = dot.getBoundingClientRect();
        const x = dotRect.left + dotRect.width / 2 - stepListRect.left;
        const y = dotRect.top + dotRect.height / 2 - stepListRect.top;
        return {
          x: clamp(x, ROAD_SIDE_PADDING, stepListRect.width - ROAD_SIDE_PADDING),
          y: clamp(y, 0, stepListRect.height),
        };
      })
      .filter((point): point is RoadPoint => point !== null);

    if (points.length === 0) {
      setRoadGeometry(null);
      return;
    }

    const { d, dotThresholds } = buildWiggleRoad(points, stepListRect.width);
    setRoadGeometry({
      d,
      width: Math.max(1, Math.round(stepListRect.width)),
      height: Math.max(1, Math.round(stepListRect.height)),
      dotThresholds,
    });
  }, [clips.length, hasMultipleClips]);

  useEffect(() => {
    if (!hasMultipleClips) {
      return;
    }

    let frameId = window.requestAnimationFrame(syncRoadGeometry);
    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncRoadGeometry);
    });

    if (stepListRef.current) {
      observer.observe(stepListRef.current);
    }

    dotRefs.current.slice(0, clips.length).forEach((dot) => {
      if (dot) {
        observer.observe(dot);
      }
    });

    const handleWindowResize = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncRoadGeometry);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [clips.length, hasMultipleClips, syncRoadGeometry]);

  useMotionValueEvent(smoothedProgress, "change", (latest) => {
    if (noClips) {
      return;
    }

    const bounded = Math.min(0.9999, Math.max(0, latest));
    const raw = bounded * clips.length;
    const nextIndex = Math.min(clips.length - 1, Math.floor(raw));
    const segmentProgress = raw - nextIndex;
    const mappedRoadProgress = getRoadProgressFromStep(
      nextIndex,
      segmentProgress,
      clips.length,
      roadGeometry?.dotThresholds ?? [],
    );
    roadPathProgress.set(mappedRoadProgress);

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    }

    if (reduceMotion) {
      return;
    }

    const activeVideo = videoRefs.current[nextIndex];
    const duration = durationMap.current[nextIndex] ?? activeVideo?.duration ?? 0;

    if (!activeVideo || !Number.isFinite(duration) || duration <= 0) {
      return;
    }

    const targetTime = Math.min(Math.max(duration - 0.04, 0), segmentProgress * duration);

    if (Math.abs(activeVideo.currentTime - targetTime) > 0.08) {
      activeVideo.currentTime = targetTime;
    }
  });

  useEffect(() => {
    const currentProgress = smoothedProgress.get();
    const bounded = Math.min(0.9999, Math.max(0, currentProgress));
    const raw = bounded * clips.length;
    const seededStep = Math.min(clips.length - 1, Math.floor(raw));
    const seededStepProgress = raw - seededStep;
    const seededRoadProgress = getRoadProgressFromStep(
      seededStep,
      seededStepProgress,
      clips.length,
      roadGeometry?.dotThresholds ?? [],
    );
    roadPathProgress.set(seededRoadProgress);
  }, [clips.length, roadGeometry?.dotThresholds, roadPathProgress, smoothedProgress]);

  if (noClips) {
    return null;
  }

  return (
    <section className="relative bg-ink px-5 py-24 text-paper sm:px-8 lg:px-10" id="traffic-visuals">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-paper/70 sm:text-lg">{intro}</p>
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        <div className="relative" ref={scrollContainerRef} style={{ height: scrollSpan }}>
          <div className="sticky top-24 h-[74svh] overflow-hidden rounded-[2rem] border border-paper/20 bg-paper/5 shadow-[0_24px_65px_rgba(0,0,0,0.34)]">
            <motion.div className="absolute left-0 right-0 top-0 z-30 h-1.5 origin-left bg-clay" style={{ scaleX: smoothedProgress }} />

            <div className="absolute inset-0">
              {clips.map((clip, index) => (
                <video
                  key={clip.id}
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                    index === activeIndex ? "opacity-100" : "opacity-0",
                  )}
                  muted
                  playsInline
                  poster={clip.posterSrc}
                  preload="metadata"
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  src={clip.videoSrc}
                  onLoadedMetadata={(event) => {
                    durationMap.current[index] = event.currentTarget.duration;
                  }}
                />
              ))}

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,14,11,0.86)_8%,rgba(18,14,11,0.38)_34%,rgba(18,14,11,0.12)_70%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(196,105,58,0.21),transparent_48%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_28%,rgba(255,255,255,0.12)_28.5%,transparent_29.5%,transparent_61%,rgba(255,255,255,0.1)_61.5%,transparent_62.5%,transparent_100%)]" />
            </div>

            <div className="pointer-events-none absolute -right-9 top-12 hidden lg:block hero-float-c">
              <svg className="h-20 w-20 text-paper/25" viewBox="0 0 88 88" fill="none">
                <rect x="1" y="1" width="86" height="86" rx="11" stroke="currentColor" strokeWidth="1.5" />
                <line x1="44" y1="10" x2="44" y2="78" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="10" y1="44" x2="78" y2="44" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="44" cy="44" r="8" fill="currentColor" className="opacity-60" />
              </svg>
            </div>

            <div className="pointer-events-none absolute -left-6 bottom-16 hidden md:block hero-float-b">
              <svg className="h-14 w-28 text-paper/30" viewBox="0 0 108 18" fill="none">
                <rect x="0" y="7" width="28" height="4" rx="2" fill="currentColor" />
                <rect x="38" y="7" width="28" height="4" rx="2" fill="currentColor" className="opacity-70" />
                <rect x="76" y="7" width="28" height="4" rx="2" fill="currentColor" className="opacity-50" />
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-9">
              <div className={cn("grid gap-8 lg:items-end", hasMultipleClips && "lg:grid-cols-[1.05fr_0.95fr]")}>
                <div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={clips[activeIndex]?.id}
                      initial={reduceMotion ? false : { y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduceMotion ? {} : { y: -14, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : motionDuration.base, ease: motionEasing.standard }}
                    >
                      <h3 className="mt-2 max-w-xl font-heading text-2xl font-semibold leading-tight sm:text-3xl">
                        {clips[activeIndex]?.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-paper/78 sm:text-base">
                        {clips[activeIndex]?.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {hasMultipleClips ? (
                  <div className="relative rounded-2xl border border-paper/20 bg-ink/35 p-3 sm:p-4">
                    <div className="relative z-10 grid gap-2 pr-10" ref={stepListRef}>
                      {roadGeometry ? (
                        <svg
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 z-0"
                          viewBox={`0 0 ${roadGeometry.width} ${roadGeometry.height}`}
                        >
                          <path
                            d={roadGeometry.d}
                            fill="none"
                            stroke="rgba(255,255,255,0.22)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.35}
                          />
                          <motion.path
                            d={roadGeometry.d}
                            fill="none"
                            initial={{ pathLength: 0, strokeWidth: 1.65 }}
                            animate={{ strokeWidth: roadStrokeWidth }}
                            stroke="rgba(196,105,58,0.96)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ pathLength: roadPathProgress }}
                            transition={{ duration: reduceMotion ? 0 : motionDuration.fast, ease: motionEasing.standard }}
                          />
                        </svg>
                      ) : null}

                      {clips.map((clip, index) => {
                        const isPassed = index <= activeIndex;
                        const isLatestPassed = index === activeIndex;

                        return (
                        <div
                          key={clip.id}
                          className={cn(
                            "relative z-10 grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl px-3 py-2 transition",
                            index === activeIndex ? "bg-paper/14" : "bg-transparent",
                          )}
                        >
                          <span className={cn("text-sm", isPassed ? "text-paper" : "text-paper/65")}>
                            {clip.title}
                          </span>
                          <span className="flex w-5 justify-center">
                            <span
                              className={cn(
                                "h-2.5 w-2.5 rounded-full transition",
                                isPassed
                                  ? isLatestPassed
                                    ? "bg-clay shadow-[0_0_0_5px_rgba(196,105,58,0.22)]"
                                    : "bg-clay/80"
                                  : "bg-paper/35",
                              )}
                              ref={(node) => {
                                dotRefs.current[index] = node;
                              }}
                            />
                          </span>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
