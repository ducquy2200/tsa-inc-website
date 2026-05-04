import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { CtaLink } from "@/lib/types";

interface RelatedLinksProps {
  links: CtaLink[];
  compactBottom?: boolean;
}

export function RelatedLinks({ links, compactBottom = false }: RelatedLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "px-5 pt-12 sm:px-8 lg:px-10",
        compactBottom ? "pb-10 sm:pb-12" : "pb-20",
      )}
    >
      <div className="mx-auto max-w-6xl rounded-2xl border border-line bg-paper px-6 py-8 shadow-[0_10px_24px_rgba(20,14,10,0.04)] sm:px-8">
        <Reveal>
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">Continue Exploring</p>
        </Reveal>
        <div className="mt-4 flex flex-wrap gap-3">
          {links.map((link, index) => (
            <Reveal key={`${link.href}-${index}`} delay={index * 0.05}>
              <Button href={link.href} variant="ghost" size="sm" external={link.external}>
                {link.label}
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
