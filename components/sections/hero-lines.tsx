"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { motionDelay, motionDuration, motionEasing } from "@/lib/motion";
import { useMotionPreference } from "@/components/ui/use-motion-preference";
import type { HeroBlock } from "@/lib/types";

function FloatingOrnament({
  className,
  children,
  variant,
}: {
  className: string;
  children: React.ReactNode;
  variant: "a" | "b" | "c" | "d" | "e";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "hero-floater",
        variant === "a" && "hero-float-a",
        variant === "b" && "hero-float-b",
        variant === "c" && "hero-float-c",
        variant === "d" && "hero-float-d",
        variant === "e" && "hero-float-e",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface HeroLinesProps {
  hero: HeroBlock;
}

export function HeroLines({ hero }: HeroLinesProps) {
  const { reduceMotion } = useMotionPreference();

  return (
    <section className="relative flex min-h-[92svh] items-center justify-center overflow-hidden px-5 pb-20 pt-36 text-center sm:px-8 lg:px-10">
      <FloatingOrnament className="absolute right-[5%] top-[12%] max-sm:scale-90" variant="a">
        <svg className="h-36 w-14 text-clay/20" viewBox="0 0 56 144" fill="none">
          <rect x="20" y="1" width="16" height="142" rx="8" fill="currentColor" />
          <circle cx="28" cy="28" r="16" fill="currentColor" className="opacity-70" />
          <circle cx="28" cy="72" r="16" fill="currentColor" className="opacity-45" />
          <circle cx="28" cy="116" r="16" fill="currentColor" className="opacity-30" />
        </svg>
      </FloatingOrnament>

      <FloatingOrnament className="absolute bottom-[16%] left-[4%] max-sm:scale-90" variant="b">
        <svg className="h-14 w-28 text-clay/25" viewBox="0 0 108 18" fill="none">
          <rect x="0" y="7" width="28" height="4" rx="2" fill="currentColor" />
          <rect x="38" y="7" width="28" height="4" rx="2" fill="currentColor" className="opacity-70" />
          <rect x="76" y="7" width="28" height="4" rx="2" fill="currentColor" className="opacity-50" />
        </svg>
      </FloatingOrnament>

      <FloatingOrnament className="absolute left-[4%] top-[22%] hidden md:block" variant="c">
        <svg className="h-20 w-20 text-clay/25" viewBox="0 0 88 88" fill="none">
          <rect x="1" y="1" width="86" height="86" rx="11" stroke="currentColor" strokeWidth="1.5" />
          <line x1="44" y1="10" x2="44" y2="78" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="10" y1="44" x2="78" y2="44" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="44" cy="44" r="8" fill="currentColor" className="opacity-60" />
        </svg>
      </FloatingOrnament>

      <FloatingOrnament className="absolute bottom-[18%] right-[9%] hidden sm:block" variant="d">
        <svg className="h-16 w-16 text-clay/24" viewBox="0 0 68 68" fill="none">
          <polygon points="34,4 64,58 4,58" fill="currentColor" className="opacity-40" />
          <polygon points="34,4 64,58 4,58" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
        </svg>
      </FloatingOrnament>

      <FloatingOrnament className="absolute right-[2%] top-[52%] hidden lg:block" variant="e">
        <svg className="h-14 w-14 text-clay/26" viewBox="0 0 58 58" fill="none">
          <circle cx="29" cy="29" r="27" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
          <path d="M29 8 A21 21 0 0 1 50 29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="opacity-90" />
          <circle cx="50" cy="29" r="4" fill="currentColor" className="opacity-90" />
        </svg>
      </FloatingOrnament>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : motionDuration.heroFade }}
        >
          <Eyebrow className="mb-8">{hero.eyebrow}</Eyebrow>
        </motion.div>

        <h1 className="font-heading text-[clamp(2.7rem,9vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink" data-testid="hero-heading">
          {hero.lines.map((line, index) => {
            const shouldItalic = hero.italicLineIndexes?.includes(index);

            return (
              <span key={line} className="block overflow-hidden py-1" data-testid={`hero-line-${index}`}>
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { y: "115%", opacity: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { y: "0%", opacity: 1 }}
                  transition={{
                    delay: reduceMotion ? 0 : motionDelay.heroLineStart + index * motionDelay.heroLineStep,
                    duration: reduceMotion ? 0 : motionDuration.heroLine,
                    ease: motionEasing.reveal,
                  }}
                >
                  {shouldItalic ? <em className="font-body text-clay not-italic">{line}</em> : line}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-lg leading-8 text-ink/70"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : motionDelay.heroBody, duration: reduceMotion ? 0 : motionDuration.heroBody }}
        >
          {hero.subtext}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : motionDelay.heroActions, duration: reduceMotion ? 0 : motionDuration.heroActions }}
        >
          <Button href={hero.primaryCta.href} external={hero.primaryCta.external} variant="primary" size="lg">
            {hero.primaryCta.label}
          </Button>
          {hero.secondaryCta ? (
            <Button href={hero.secondaryCta.href} external={hero.secondaryCta.external} variant="ghost" size="lg">
              {hero.secondaryCta.label}
            </Button>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
