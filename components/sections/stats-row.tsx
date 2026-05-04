"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { useMotionPreference } from "@/components/ui/use-motion-preference";
import { cn } from "@/lib/utils";
import type { MetricItem } from "@/lib/types";

interface StatsRowProps {
  metrics: MetricItem[];
}

function useCounter(target: number, durationMs: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / durationMs, 1);
      setValue(Math.round(progress * target));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [durationMs, start, target]);

  return value;
}

function StatCard({ metric, start, index }: { metric: MetricItem; start: boolean; index: number }) {
  const count = useCounter(metric.value, metric.durationMs ?? 1000, start);
  const valueLabel = metric.displayText ?? String(count);
  const isTextMetric = Boolean(metric.displayText);

  return (
    <div className="text-center">
      <p
        className={cn(
          "font-heading font-extrabold tracking-tight text-ink",
          isTextMetric
            ? "text-[1.95rem] leading-tight text-ink/70 sm:text-[2.1rem]"
            : "text-[2.85rem] leading-none sm:text-[3rem]",
        )}
        data-testid={`metric-value-${index}`}
      >
        <span>{valueLabel}</span>
        {!metric.displayText && metric.suffix ? <span className="text-clay">{metric.suffix}</span> : null}
      </p>
      <p className="mt-1.5 font-ui text-[11.5px] font-semibold uppercase tracking-[0.13em] text-ink/60">{metric.label}</p>
    </div>
  );
}

export function StatsRow({ metrics }: StatsRowProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { reduceMotion } = useMotionPreference();

  const normalizedMetrics = useMemo(
    () => metrics.map((metric, index) => ({ ...metric, durationMs: metric.durationMs ?? 900 + index * 150 })),
    [metrics],
  );

  return (
    <div className="border-y border-line bg-paper px-5 py-9 sm:px-8 lg:px-10" data-testid="stats-row" ref={ref}>
      <div className="mx-auto flex w-full max-w-[1000px] flex-wrap items-center justify-around gap-6">
        {normalizedMetrics.map((metric, index) => (
          <div key={`${metric.label}-${index}`} className="flex items-center gap-6 md:gap-7">
            <div className="min-w-[150px] text-center">
              <StatCard index={index} metric={metric} start={reduceMotion ? true : inView} />
            </div>
            {index < normalizedMetrics.length - 1 ? <div className="hidden h-[58px] w-px bg-line md:block" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
