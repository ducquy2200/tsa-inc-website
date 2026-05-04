import type { LayoutTone } from "@/lib/types";

export type ThemeTone = LayoutTone;

export interface ToneVariant {
  accentText: string;
  accentBorder: string;
  accentSoftBg: string;
  accentDot: string;
  accentGradient: string;
}

export const toneVariants: Record<ThemeTone, ToneVariant> = {
  clay: {
    accentText: "text-clay",
    accentBorder: "border-clay/35",
    accentSoftBg: "bg-clay/10",
    accentDot: "bg-clay",
    accentGradient: "from-clay/25 via-clay/10 to-transparent",
  },
  amber: {
    accentText: "text-tone-amber",
    accentBorder: "border-tone-amber/35",
    accentSoftBg: "bg-tone-amber-soft",
    accentDot: "bg-tone-amber-dot",
    accentGradient: "from-tone-amber-glow via-tone-amber-soft to-transparent",
  },
  teal: {
    accentText: "text-tone-teal",
    accentBorder: "border-tone-teal/35",
    accentSoftBg: "bg-tone-teal-soft",
    accentDot: "bg-tone-teal-dot",
    accentGradient: "from-tone-teal-glow via-tone-teal-soft to-transparent",
  },
  slate: {
    accentText: "text-tone-slate",
    accentBorder: "border-tone-slate/35",
    accentSoftBg: "bg-tone-slate-soft",
    accentDot: "bg-tone-slate-dot",
    accentGradient: "from-tone-slate-glow via-tone-slate-soft to-transparent",
  },
};
