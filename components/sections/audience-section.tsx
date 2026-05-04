import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import type { AudienceBlock } from "@/lib/types";

interface AudienceSectionProps {
  audiences: AudienceBlock;
}

export function AudienceSection({ audiences }: AudienceSectionProps) {
  return (
    <section className="bg-ink px-5 py-24 sm:px-8 lg:px-10" id="clients">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow className="mb-6">{audiences.tag}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading as="h2" className="max-w-3xl text-[clamp(2.1rem,4vw,3.4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-paper">
            {audiences.title}
          </Heading>
        </Reveal>

        <div className="mt-12 grid gap-8 border-l border-paper/15 lg:grid-cols-3">
          {audiences.items.map((item, index) => (
            <Reveal key={item.title} delay={0.09 + index * 0.05}>
              <article className="border-r border-paper/15 px-6 py-1">
                <h3 className="font-ui text-base font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-paper/60">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
