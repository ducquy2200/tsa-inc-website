"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";

import { motionDuration, motionEasing, scrollSpring } from "@/lib/motion";
import { useMotionPreference } from "@/components/ui/use-motion-preference";
import type { ScrollMediaClip } from "@/lib/media-assets";
import { cn } from "@/lib/utils";

interface ScrollMediaStoryProps {
  title: string;
  intro: string;
  clips: ScrollMediaClip[];
}

export function ScrollMediaStory({ title, intro, clips }: ScrollMediaStoryProps) {
  const noClips = clips.length === 0;
  const { reduceMotion } = useMotionPreference();
  const hasMultipleClips = clips.length > 1;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const durationMap = useRef<number[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollSpan = `${Math.max(165, 122 + clips.length * 54)}svh`;

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const smoothedProgress = useSpring(
    scrollYProgress,
    reduceMotion ? scrollSpring.homeReduced : scrollSpring.homeDefault,
  );

  useMotionValueEvent(smoothedProgress, "change", (latest) => {
    if (noClips) {
      return;
    }

    const bounded = Math.min(0.9999, Math.max(0, latest));
    const raw = bounded * clips.length;
    const nextIndex = Math.min(clips.length - 1, Math.floor(raw));
    const segmentProgress = raw - nextIndex;

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
                  <div className="grid gap-2 rounded-2xl border border-paper/20 bg-ink/35 p-3 sm:p-4">
                    {clips.map((clip, index) => (
                      <div
                        key={clip.id}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-2 transition",
                          index === activeIndex ? "bg-paper/14" : "bg-transparent",
                        )}
                      >
                        <span className={cn("text-sm", index === activeIndex ? "text-paper" : "text-paper/65")}>
                          {clip.title}
                        </span>
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full transition",
                            index === activeIndex ? "bg-clay shadow-[0_0_0_5px_rgba(196,105,58,0.22)]" : "bg-paper/35",
                          )}
                        />
                      </div>
                    ))}
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
