import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

interface ServiceSectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function ServiceSectionHeader({ title, subtitle, className }: ServiceSectionHeaderProps) {
  return (
    <Reveal>
      <div className={cn("relative pb-4 sm:pb-5", className)}>
        <div className="pointer-events-none absolute -left-2 top-3 h-14 w-14 rounded-full border border-clay/28 sm:h-20 sm:w-20" />
        <div className="pointer-events-none absolute left-12 top-10 h-px w-32 bg-gradient-to-r from-clay/40 to-transparent sm:left-16 sm:top-14 sm:w-48" />
        <div className="relative z-10">
          <Eyebrow className="text-clay">Service Coverage</Eyebrow>
          <Heading as="h2" className="mt-3 max-w-5xl text-[clamp(2.4rem,6.4vw,5.2rem)] font-extrabold leading-[0.94] tracking-[-0.038em] text-ink">
            {title}
          </Heading>
          <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,rgba(196,105,58,0.5)_0%,rgba(18,14,11,0.12)_50%,transparent_100%)]" />
          {subtitle ? <p className="mt-4 max-w-3xl text-base leading-8 text-ink/74 sm:text-lg">{subtitle}</p> : null}
        </div>
      </div>
    </Reveal>
  );
}
