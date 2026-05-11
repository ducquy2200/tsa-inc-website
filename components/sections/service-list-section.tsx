import Link from "next/link";

import { interactiveLinkRow } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import type { ServiceGroupBlock } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ServiceSectionHeader } from "@/components/sections/service-section-header";

interface ServiceListSectionProps {
  title: string;
  groups: ServiceGroupBlock[];
}

export function ServiceListSection({ title, groups }: ServiceListSectionProps) {
  return (
    <section
      className="relative overflow-hidden border-y border-line bg-sand px-5 py-24 sm:px-8 lg:px-10"
      id="services"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(196,105,58,0.14)_0%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(0deg,rgba(26,20,16,0.06)_0%,transparent_100%)]" />
      <div className="relative mx-auto max-w-6xl">
        <ServiceSectionHeader
          subtitle="Browse every service family with focused route-level pages."
          title={title}
        />

        <div className="mt-10 space-y-12">
          {groups.map((group, groupIndex) => (
            <div key={group.id}>
              <Reveal delay={groupIndex * 0.05}>
                <h3 className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-clay">{group.label}</h3>
              </Reveal>
              <Reveal delay={groupIndex * 0.05 + 0.03}>
                <p className="mt-3 max-w-4xl text-lg leading-9 text-ink/74">{group.description}</p>
              </Reveal>

              <div className="mt-6 border-y-2 border-line bg-paper/54">
                {group.items.map((item, itemIndex) => (
                  <Reveal key={item.href} delay={groupIndex * 0.05 + 0.05 + itemIndex * 0.04}>
                    <Link
                      href={item.href}
                      className={cn(
                        interactiveLinkRow({ spacing: "lg" }),
                        "border-b border-line px-2 py-7 sm:px-4 lg:px-6 last:border-b-0 hover:bg-paper/74",
                      )}
                      aria-label={`Read ${item.title}`}
                    >
                      <div>
                        <p className="font-heading text-2xl font-semibold text-ink transition group-hover:text-clay">{item.title}</p>
                        <p className="mt-2.5 text-base leading-8 text-ink/74">{item.description}</p>
                      </div>
                      <span className={cn("pt-5 text-2xl text-ink/32 transition", "group-hover:translate-x-1 group-hover:text-clay")}>→</span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
