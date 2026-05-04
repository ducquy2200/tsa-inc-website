"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import type { MotionPreset } from "@/lib/types";

export function useMotionPreference(motionPreset?: MotionPreset) {
  const userPrefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHydrated(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const reduceMotion = motionPreset === "reduced" || (hydrated && userPrefersReducedMotion);

  return {
    reduceMotion,
    hydrated,
    userPrefersReducedMotion,
  };
}
