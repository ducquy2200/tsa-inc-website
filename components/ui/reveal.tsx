"use client";

import { motion } from "framer-motion";

import { motionDuration, motionEasing, revealViewport } from "@/lib/motion";
import { useMotionPreference } from "@/components/ui/use-motion-preference";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { reduceMotion } = useMotionPreference();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={reduceMotion ? { duration: 0 } : { duration: motionDuration.reveal, ease: motionEasing.reveal, delay }}
    >
      {children}
    </motion.div>
  );
}
