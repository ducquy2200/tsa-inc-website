import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { StatementBlock as StatementBlockType } from "@/lib/types";

interface StatementBlockProps {
  statement: StatementBlockType;
}

export function StatementBlock({ statement }: StatementBlockProps) {
  const pieces = statement.text.split(/\*\*(.*?)\*\*/g);

  return (
    <section className="px-5 py-24 text-center sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow className="mb-6">{statement.tag}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="font-heading text-[clamp(2rem,4.8vw,4.1rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
            {pieces.map((piece, index) =>
              index % 2 === 1 ? (
                <em key={`${piece}-${index}`} className="font-body not-italic text-clay">
                  {piece}
                </em>
              ) : (
                <span key={`${piece}-${index}`}>{piece}</span>
              ),
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
