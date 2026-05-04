"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { Heading } from "@/components/ui/heading";
import { interactiveLinkRow } from "@/components/ui/patterns";
import { motionDuration, motionEasing } from "@/lib/motion";
import { useMotionPreference } from "@/components/ui/use-motion-preference";
import { cn } from "@/lib/utils";
import type { ServiceGroupBlock } from "@/lib/types";

interface ServiceTabsProps {
  title: string;
  groups: ServiceGroupBlock[];
}

export function ServiceTabs({ title, groups }: ServiceTabsProps) {
  const [active, setActive] = useState(groups[0]?.id);
  const { reduceMotion } = useMotionPreference();

  const activeGroup = useMemo(() => groups.find((group) => group.id === active) ?? groups[0], [active, groups]);

  if (!activeGroup) {
    return null;
  }

  return (
    <section className="bg-sand px-5 py-20 sm:px-8 lg:px-10" id="services">
      <div className="mx-auto max-w-6xl">
        <Tabs.Root value={activeGroup.id} onValueChange={setActive}>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <Heading as="h2" className="text-[clamp(2.1rem,4vw,3.25rem)] font-extrabold leading-[1.04] tracking-[-0.03em]">
                {title}
              </Heading>
            </Reveal>
            <Reveal delay={0.08}>
              <Tabs.List className="flex flex-wrap gap-2" aria-label="Service groups">
                {groups.map((group) => (
                  <Tabs.Trigger
                    key={group.id}
                    data-testid={`service-tab-${group.id}`}
                    value={group.id}
                    className={cn(
                      "rounded-full border border-line px-4 py-2 font-ui text-xs font-semibold uppercase tracking-[0.1em] text-ink/65 transition hover:border-ink hover:text-ink",
                      activeGroup.id === group.id && "border-clay bg-clay text-paper",
                    )}
                  >
                    {group.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
            </Reveal>
          </div>

          <div className="mb-5">
            <p className="max-w-3xl text-base leading-8 text-ink/70">{activeGroup.description}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              data-testid="service-tab-panel"
              key={activeGroup.id}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : motionDuration.fast, ease: motionEasing.standard }}
            >
              <Tabs.Content forceMount value={activeGroup.id}>
                <div className="divide-y divide-line border-y border-line">
                  {activeGroup.items.map((item, index) => (
                    <Reveal key={item.title} delay={index * 0.04}>
                      <Link
                        className={cn(interactiveLinkRow({ spacing: "lg" }), "gap-5")}
                        href={item.href}
                        aria-label={`Read more about ${item.title}`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 font-ui text-xs font-semibold uppercase tracking-[0.09em] text-ink/50">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="font-heading text-xl font-semibold leading-snug text-ink transition group-hover:text-clay">{item.title}</p>
                          <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/70">{item.description}</p>
                        </div>
                        <span className="pt-8 text-2xl text-ink/30 transition group-hover:translate-x-1 group-hover:text-clay">→</span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </Tabs.Content>
            </motion.div>
          </AnimatePresence>
        </Tabs.Root>
      </div>
    </section>
  );
}
