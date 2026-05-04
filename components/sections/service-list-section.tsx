import Link from "next/link";

import { Heading } from "@/components/ui/heading";
import { interactiveLinkRow } from "@/components/ui/patterns";
import { Reveal } from "@/components/ui/reveal";
import type { ServiceGroupBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ServiceListSectionProps {
  title: string;
  groups: ServiceGroupBlock[];
}

export function ServiceListSection({ title, groups }: ServiceListSectionProps) {
  return (
    <section className="bg-sand px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Heading as="h2" className="text-[clamp(2rem,3.8vw,3.1rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {title}
          </Heading>
        </Reveal>

        <div className="mt-10 space-y-12">
          {groups.map((group, groupIndex) => (
            <div key={group.id}>
              <Reveal delay={groupIndex * 0.05}>
                <h3 className="font-ui text-xs font-semibold uppercase tracking-[0.12em] text-clay">{group.label}</h3>
              </Reveal>
              <Reveal delay={groupIndex * 0.05 + 0.03}>
                <p className="mt-3 max-w-4xl text-base leading-8 text-ink/75">{group.description}</p>
              </Reveal>

              <div className="mt-6 divide-y divide-line border-y border-line">
                {group.items.map((item, itemIndex) => (
                  <Reveal key={item.href} delay={groupIndex * 0.05 + 0.05 + itemIndex * 0.04}>
                    <Link href={item.href} className={interactiveLinkRow()} aria-label={`Read ${item.title}`}>
                      <div>
                        <p className="font-heading text-xl font-semibold text-ink transition group-hover:text-clay">{item.title}</p>
                        <p className="mt-2 text-sm leading-7 text-ink/70">{item.description}</p>
                      </div>
                      <span className={cn("pt-3 text-xl text-ink/30 transition", "group-hover:translate-x-1 group-hover:text-clay")}>→</span>
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
