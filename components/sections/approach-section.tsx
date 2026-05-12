import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import type { ApproachBlock } from "@/lib/types";

interface ApproachSectionProps {
  approach: ApproachBlock;
}

export function ApproachSection({ approach }: ApproachSectionProps) {
  return (
    <section className="px-5 py-24 sm:px-8 lg:px-10" id="about">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.02fr_1fr]">
        <div>
          <Reveal>
            <Eyebrow className="mb-6">{approach.tag}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading as="h2" className="text-[clamp(2.1rem,4vw,3.3rem)] font-extrabold leading-[1.04] tracking-[-0.03em]">
              {approach.title}
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 border-l-4 border-clay pl-5 font-body text-2xl italic leading-10 text-ink/90">{approach.quote}</p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {approach.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.14 + index * 0.05}>
                <p className="text-base leading-8 text-ink/75">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {approach.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={0.06 + index * 0.04}>
              <article className="flex items-start gap-4 py-5">
                <span className="mt-[0.52rem] inline-block h-2 w-2 rounded-full bg-clay" aria-hidden="true" />
                <div>
                  <h3 className="font-ui text-base font-semibold text-ink">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-ink/70">{pillar.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
