"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { interactiveLinkRow } from "@/components/ui/patterns";
import { motionDuration, motionEasing } from "@/lib/motion";
import { useMotionPreference } from "@/components/ui/use-motion-preference";
import { cn } from "@/lib/utils";
import type { ServiceGroupBlock } from "@/lib/types";
import { ServiceSectionHeader } from "@/components/sections/service-section-header";

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
    <section
      className="relative overflow-hidden border-y border-line bg-sand px-5 py-24 sm:px-8 lg:px-10"
      id="services"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(196,105,58,0.14)_0%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,rgba(26,20,16,0.06)_0%,transparent_100%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Tabs.Root value={activeGroup.id} onValueChange={setActive}>
          <div className="mb-5">
            <ServiceSectionHeader
              subtitle="Explore by category to view methods, deliverables, and route-specific expertise."
              title={title}
            />
          </div>

          <div className="mb-8 grid gap-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
            <Reveal className="lg:self-center" delay={0.08}>
              <div>
                <Tabs.List
                  className="flex items-end gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Service groups"
                >
                  {groups.map((group) => (
                    <Tabs.Trigger
                      key={group.id}
                      data-testid={`service-tab-${group.id}`}
                      value={group.id}
                      className={cn(
                        "relative shrink-0 border-0 bg-transparent px-0 py-2.5 font-ui text-xs font-semibold uppercase tracking-[0.13em] text-ink/58 transition-colors duration-200 hover:text-ink after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-clay after:transition-transform after:duration-200 after:ease-out",
                        activeGroup.id === group.id && "text-ink after:scale-x-100",
                      )}
                    >
                      {group.label}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="max-w-4xl text-lg leading-9 text-ink/74 lg:justify-self-end">{activeGroup.description}</p>
            </Reveal>
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
                <div className="border-y-2 border-line bg-paper/54">
                  {activeGroup.items.map((item, index) => (
                    <Reveal key={item.title} delay={index * 0.04}>
                      <Link
                        className={cn(
                          interactiveLinkRow({ spacing: "lg" }),
                          "gap-5 border-b border-line px-2 py-7 sm:px-4 lg:px-6 last:border-b-0 hover:bg-paper/74",
                        )}
                        href={item.href}
                        aria-label={`Read more about ${item.title}`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="mb-1.5 font-ui text-xs font-semibold uppercase tracking-[0.12em] text-clay">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="font-heading text-2xl font-semibold leading-snug text-ink transition group-hover:text-clay">{item.title}</p>
                          <p className="mt-2.5 max-w-3xl text-base leading-8 text-ink/74">{item.description}</p>
                        </div>
                        <span className="pt-8 text-2xl text-ink/32 transition group-hover:translate-x-1 group-hover:text-clay">→</span>
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
