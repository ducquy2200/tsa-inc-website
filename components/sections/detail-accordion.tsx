"use client";

import * as Accordion from "@radix-ui/react-accordion";

import { Reveal } from "@/components/ui/reveal";
import { Heading } from "@/components/ui/heading";
import type { DetailSectionBlock } from "@/lib/types";

interface DetailAccordionProps {
  detail: DetailSectionBlock;
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-ink/60">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-7 text-ink/75">
            <span className="mt-[0.58rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DetailAccordion({ detail }: DetailAccordionProps) {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Heading as="h2" className="text-[clamp(2rem,3.6vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {detail.title}
          </Heading>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-5 max-w-4xl text-base leading-8 text-ink/75">{detail.intro}</p>
        </Reveal>

        <div className="mt-11 grid gap-8 lg:grid-cols-3">
          <Reveal>
            <BulletList title="Core Capabilities" items={detail.keyPoints} />
          </Reveal>
          <Reveal delay={0.05}>
            <BulletList title="Typical Use Cases" items={detail.whenToUse} />
          </Reveal>
          <Reveal delay={0.1}>
            <BulletList title="Deliverables" items={detail.deliverables} />
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-12 rounded-2xl border border-line bg-paper/70 p-6 sm:p-8">
            <h3 className="mb-4 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-ink/60">Frequently Asked Questions</h3>
            <Accordion.Root className="divide-y divide-line" collapsible type="single">
              {detail.faqs.map((faq, index) => (
                <Accordion.Item key={faq.question} value={`faq-${index}`}>
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between gap-4 py-4 text-left font-ui text-sm font-semibold text-ink">
                      <span>{faq.question}</span>
                      <span aria-hidden="true" className="text-clay">+</span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="pb-4 pr-6 text-sm leading-7 text-ink/75 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    {faq.answer}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
