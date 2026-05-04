import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";

interface CtaStripProps {
  tag: string;
  title: string;
  subtext: string;
}

export function CtaStrip({ tag, title, subtext }: CtaStripProps) {
  return (
    <section className="px-5 pb-24 pt-20 text-center sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Eyebrow>{tag}</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading as="h2" className="mt-6 text-[clamp(2.4rem,5.2vw,5rem)] font-extrabold leading-[0.96] tracking-[-0.03em]">
            {title}
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink/70">{subtext}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-8 flex justify-center">
            <Button href="/contact-us" size="lg" variant="primary">
              Contact Us Today
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
