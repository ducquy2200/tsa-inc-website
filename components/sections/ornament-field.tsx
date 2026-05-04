"use client";

import { motion } from "framer-motion";

import { useMotionPreference } from "@/components/ui/use-motion-preference";
import { motionEasing } from "@/lib/motion";
import type { AssetPlacement, MotionPreset, OrnamentPreset } from "@/lib/types";
import { cn } from "@/lib/utils";

type OrnamentToken = {
  id: string;
  kind: "ring" | "bars" | "nodes" | "arrow";
  top: string;
  left: string;
  sizeClass: string;
  opacityClass: string;
  duration: number;
  delay: number;
  drift: number;
  spin: number;
};

const presetTokens: Record<OrnamentPreset, OrnamentToken[]> = {
  counts_flow: [
    { id: "counts-1", kind: "ring", top: "8%", left: "6%", sizeClass: "h-14 w-14", opacityClass: "text-clay/45", duration: 8.1, delay: 0.1, drift: 20, spin: 5 },
    { id: "counts-2", kind: "bars", top: "22%", left: "80%", sizeClass: "h-5 w-20", opacityClass: "text-clay/40", duration: 6.9, delay: 0.5, drift: 16, spin: -4 },
    { id: "counts-3", kind: "nodes", top: "72%", left: "10%", sizeClass: "h-12 w-12", opacityClass: "text-clay/38", duration: 9.5, delay: 0.3, drift: 22, spin: 4 },
    { id: "counts-4", kind: "arrow", top: "64%", left: "84%", sizeClass: "h-14 w-14", opacityClass: "text-clay/32", duration: 7.8, delay: 0.8, drift: 18, spin: -6 },
  ],
  surveys_matrix: [
    { id: "surv-1", kind: "nodes", top: "10%", left: "12%", sizeClass: "h-14 w-14", opacityClass: "text-tone-amber/45", duration: 8.8, delay: 0.2, drift: 18, spin: -3 },
    { id: "surv-2", kind: "ring", top: "18%", left: "82%", sizeClass: "h-12 w-12", opacityClass: "text-tone-amber/35", duration: 7.1, delay: 0.6, drift: 14, spin: 6 },
    { id: "surv-3", kind: "bars", top: "70%", left: "14%", sizeClass: "h-5 w-24", opacityClass: "text-tone-amber/35", duration: 6.6, delay: 0.15, drift: 15, spin: 2 },
    { id: "surv-4", kind: "arrow", top: "75%", left: "78%", sizeClass: "h-12 w-12", opacityClass: "text-tone-amber/32", duration: 8.4, delay: 0.9, drift: 19, spin: -5 },
  ],
  studies_signal: [
    { id: "stud-1", kind: "ring", top: "6%", left: "16%", sizeClass: "h-14 w-14", opacityClass: "text-tone-teal/40", duration: 8.3, delay: 0.4, drift: 18, spin: 5 },
    { id: "stud-2", kind: "arrow", top: "26%", left: "78%", sizeClass: "h-14 w-14", opacityClass: "text-tone-teal/34", duration: 7.4, delay: 0.2, drift: 14, spin: -5 },
    { id: "stud-3", kind: "nodes", top: "68%", left: "20%", sizeClass: "h-12 w-12", opacityClass: "text-tone-teal/36", duration: 9.1, delay: 0.7, drift: 21, spin: 4 },
    { id: "stud-4", kind: "bars", top: "78%", left: "74%", sizeClass: "h-5 w-24", opacityClass: "text-tone-teal/32", duration: 6.8, delay: 0.5, drift: 16, spin: -2 },
  ],
  detail_counts: [
    { id: "dc-1", kind: "bars", top: "12%", left: "84%", sizeClass: "h-4 w-18", opacityClass: "text-clay/35", duration: 6.7, delay: 0.4, drift: 12, spin: 3 },
    { id: "dc-2", kind: "nodes", top: "68%", left: "12%", sizeClass: "h-10 w-10", opacityClass: "text-clay/32", duration: 8.2, delay: 0.7, drift: 14, spin: -3 },
    { id: "dc-3", kind: "ring", top: "74%", left: "76%", sizeClass: "h-12 w-12", opacityClass: "text-clay/30", duration: 7.4, delay: 0.2, drift: 13, spin: 4 },
  ],
  detail_surveys: [
    { id: "ds-1", kind: "ring", top: "14%", left: "10%", sizeClass: "h-11 w-11", opacityClass: "text-tone-amber/34", duration: 7.7, delay: 0.5, drift: 12, spin: 5 },
    { id: "ds-2", kind: "nodes", top: "26%", left: "82%", sizeClass: "h-10 w-10", opacityClass: "text-tone-amber/34", duration: 8.3, delay: 0.1, drift: 15, spin: -4 },
    { id: "ds-3", kind: "arrow", top: "74%", left: "78%", sizeClass: "h-11 w-11", opacityClass: "text-tone-amber/30", duration: 7.2, delay: 0.8, drift: 13, spin: 4 },
  ],
  detail_studies: [
    { id: "dst-1", kind: "nodes", top: "12%", left: "18%", sizeClass: "h-10 w-10", opacityClass: "text-tone-teal/35", duration: 8.6, delay: 0.5, drift: 14, spin: -3 },
    { id: "dst-2", kind: "bars", top: "20%", left: "78%", sizeClass: "h-4 w-20", opacityClass: "text-tone-teal/30", duration: 6.4, delay: 0.15, drift: 11, spin: 2 },
    { id: "dst-3", kind: "ring", top: "74%", left: "74%", sizeClass: "h-12 w-12", opacityClass: "text-tone-teal/32", duration: 7.9, delay: 0.7, drift: 14, spin: 5 },
  ],
  custom_builder: [
    { id: "cp-1", kind: "nodes", top: "16%", left: "10%", sizeClass: "h-12 w-12", opacityClass: "text-tone-slate/35", duration: 8.5, delay: 0.3, drift: 14, spin: 4 },
    { id: "cp-2", kind: "arrow", top: "22%", left: "80%", sizeClass: "h-13 w-13", opacityClass: "text-tone-slate/33", duration: 7.2, delay: 0.6, drift: 12, spin: -5 },
    { id: "cp-3", kind: "bars", top: "70%", left: "16%", sizeClass: "h-5 w-24", opacityClass: "text-tone-slate/28", duration: 6.8, delay: 0.2, drift: 12, spin: 3 },
    { id: "cp-4", kind: "ring", top: "74%", left: "78%", sizeClass: "h-11 w-11", opacityClass: "text-tone-slate/30", duration: 8.1, delay: 0.9, drift: 14, spin: -4 },
  ],
  contact_timeline: [
    { id: "ct-1", kind: "bars", top: "16%", left: "82%", sizeClass: "h-4 w-18", opacityClass: "text-clay/28", duration: 7.1, delay: 0.4, drift: 8, spin: 2 },
    { id: "ct-2", kind: "ring", top: "70%", left: "16%", sizeClass: "h-10 w-10", opacityClass: "text-clay/30", duration: 8.4, delay: 0.7, drift: 10, spin: -3 },
  ],
};

function OrnamentGlyph({ kind }: { kind: OrnamentToken["kind"] }) {
  if (kind === "ring") {
    return (
      <svg viewBox="0 0 52 52" fill="none" className="h-full w-full">
        <circle cx="26" cy="26" r="20" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="26" cy="26" r="7" fill="currentColor" className="opacity-50" />
      </svg>
    );
  }

  if (kind === "bars") {
    return (
      <svg viewBox="0 0 100 18" fill="none" className="h-full w-full">
        <rect x="0" y="7" width="25" height="4" rx="2" fill="currentColor" />
        <rect x="36" y="7" width="25" height="4" rx="2" fill="currentColor" className="opacity-75" />
        <rect x="72" y="7" width="25" height="4" rx="2" fill="currentColor" className="opacity-50" />
      </svg>
    );
  }

  if (kind === "arrow") {
    return (
      <svg viewBox="0 0 56 56" fill="none" className="h-full w-full">
        <path d="M9 47L47 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 9H47V38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 62 62" fill="none" className="h-full w-full">
      <circle cx="10" cy="31" r="4" fill="currentColor" />
      <circle cx="31" cy="10" r="4" fill="currentColor" className="opacity-80" />
      <circle cx="52" cy="31" r="4" fill="currentColor" className="opacity-65" />
      <circle cx="31" cy="52" r="4" fill="currentColor" className="opacity-55" />
      <path d="M14 31H48M31 14V48" stroke="currentColor" strokeWidth="1.2" className="opacity-45" />
    </svg>
  );
}

interface OrnamentFieldProps {
  preset: OrnamentPreset;
  placement: AssetPlacement;
  motionPreset: MotionPreset;
  className?: string;
}

export function OrnamentField({ preset, placement, motionPreset, className }: OrnamentFieldProps) {
  const { reduceMotion } = useMotionPreference(motionPreset);
  const tokens = presetTokens[preset];

  const placementClass =
    placement === "left"
      ? "[mask-image:linear-gradient(to_right,rgba(0,0,0,1)_40%,rgba(0,0,0,0.15)_75%,transparent)]"
      : placement === "right"
        ? "[mask-image:linear-gradient(to_left,rgba(0,0,0,1)_40%,rgba(0,0,0,0.15)_75%,transparent)]"
        : "[mask-image:radial-gradient(circle_at_50%_45%,rgba(0,0,0,1)_42%,rgba(0,0,0,0.28)_72%,transparent)]";

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", placementClass, className)}
      data-testid="ornament-field"
    >
      {tokens.map((token) => (
        <motion.div
          key={token.id}
          className={cn("absolute", token.sizeClass, token.opacityClass)}
          style={{ top: token.top, left: token.left }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -token.drift, 0],
                  x: [0, token.drift * 0.2, 0],
                  rotate: [0, token.spin, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: token.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: motionEasing.loop,
                  delay: token.delay,
                }
          }
        >
          <OrnamentGlyph kind={token.kind} />
        </motion.div>
      ))}
    </motion.div>
  );
}
