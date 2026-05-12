import Link from "next/link";

import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { interactiveSurfaceCard, surfacePanel } from "@/components/ui/patterns";
import type { ToneVariant } from "@/lib/theme";
import type {
  MethodProcessStep,
  ResourceGuideBlock,
  ResourceComparisonRow,
  ResourceDecisionCard,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const SECTION_TITLE_CLASS = "text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em]";
const EYEBROW_CLASS = "font-ui text-xs font-semibold uppercase tracking-[0.13em] text-clay";
const MICRO_LABEL_CLASS = "font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-clay";

interface ToolingGridProps {
  tone: ToneVariant;
  tools: string[];
}

interface ProcessStepsPanelProps {
  tone: ToneVariant;
  steps: MethodProcessStep[];
}

interface StandardsListProps {
  tone: ToneVariant;
  standards: string[];
  durationRules: string[];
}

interface OutputMatrixProps {
  tone: ToneVariant;
  capturedData: string[];
  analysisOutputs: string[];
}

interface DecisionGuideProps {
  tone: ToneVariant;
  guide: ResourceGuideBlock;
}

function BulletList({ items, tone }: { items: string[]; tone: ToneVariant }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-7 text-ink/75">
          <span className={cn("mt-[0.58rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full", tone.accentDot)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ComparisonTable({ rows }: { rows: ResourceComparisonRow[] }) {
  return (
    <>
      <div className="space-y-3 sm:hidden">
        {rows.map((row) => (
          <article key={row.topic} className="rounded-2xl border border-line/85 bg-paper/92 px-4 py-4">
            <p className={MICRO_LABEL_CLASS}>Decision area</p>
            <p className="mt-1.5 text-sm font-semibold text-ink">{row.topic}</p>
            <p className="mt-3 text-sm leading-7 text-ink/75">{row.guidance}</p>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-line/85 bg-paper/92 sm:block">
        <div className="grid grid-cols-[minmax(140px,220px)_1fr] border-b border-line/75 bg-sand/70 px-4 py-3 sm:px-5">
          <p className={MICRO_LABEL_CLASS}>Decision Area</p>
          <p className={MICRO_LABEL_CLASS}>Guidance</p>
        </div>
        <div className="divide-y divide-line/80">
          {rows.map((row) => (
            <div key={row.topic} className="grid grid-cols-[minmax(140px,220px)_1fr] gap-3 px-4 py-3 sm:px-5">
              <p className="text-sm font-semibold text-ink">{row.topic}</p>
              <p className="text-sm leading-7 text-ink/75">{row.guidance}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function DecisionCards({ cards, tone }: { cards: ResourceDecisionCard[]; tone: ToneVariant }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => {
        const shellClass = cn(interactiveSurfaceCard({ density: "compact", lift: "sm" }), tone.accentBorder, "h-full");

        const content = (
          <>
            <p className={MICRO_LABEL_CLASS}>Guide card {String(index + 1).padStart(2, "0")}</p>
            <p className="mt-2 font-heading text-xl font-semibold leading-tight text-ink">{card.title}</p>
            <p className="mt-3 text-sm leading-7 text-ink/72">{card.description}</p>
            {card.href ? <p className="mt-4 text-sm font-semibold text-clay">Open referenced page</p> : null}
          </>
        );

        if (card.href) {
          return (
            <Link key={card.title} className={shellClass} href={card.href}>
              {content}
            </Link>
          );
        }

        return (
          <article key={card.title} className={shellClass}>
            {content}
          </article>
        );
      })}
    </div>
  );
}

export function ToolingGrid({ tone, tools }: ToolingGridProps) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)} data-testid="method-tooling-grid">
      <p className={EYEBROW_CLASS}>Tooling stack</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {tools.map((tool) => (
          <p key={tool} className="rounded-xl border border-line/75 bg-paper/92 px-3 py-2.5 text-sm text-ink/75">
            {tool}
          </p>
        ))}
      </div>
    </div>
  );
}

export function ProcessStepsPanel({ tone, steps }: ProcessStepsPanelProps) {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-10" data-testid="method-process-steps">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Heading as="h2" className={SECTION_TITLE_CLASS}>
            Process sequence
          </Heading>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.04}>
              <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder, "h-full")}>
                <p className={MICRO_LABEL_CLASS}>Step {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink/75">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StandardsList({ tone, standards, durationRules }: StandardsListProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Reveal>
        <article className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
          <p className={EYEBROW_CLASS}>Standards and controls</p>
          <BulletList items={standards} tone={tone} />
        </article>
      </Reveal>
      <Reveal delay={0.05}>
        <article className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
          <p className={EYEBROW_CLASS}>Duration and timing rules</p>
          <BulletList items={durationRules} tone={tone} />
        </article>
      </Reveal>
    </div>
  );
}

export function OutputMatrix({ tone, capturedData, analysisOutputs }: OutputMatrixProps) {
  return (
    <section className="bg-sand px-5 py-16 sm:px-8 lg:px-10" data-testid="method-output-matrix">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Heading as="h2" className={SECTION_TITLE_CLASS}>
            Captured data and outputs
          </Heading>
        </Reveal>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <article className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
              <p className={EYEBROW_CLASS}>Captured data</p>
              <BulletList items={capturedData} tone={tone} />
            </article>
          </Reveal>
          <Reveal delay={0.05}>
            <article className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
              <p className={EYEBROW_CLASS}>Analysis outputs</p>
              <BulletList items={analysisOutputs} tone={tone} />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function DecisionGuide({ tone, guide }: DecisionGuideProps) {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-10" data-testid="resource-decision-guide">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Heading as="h2" className={SECTION_TITLE_CLASS}>
            Decision guide
          </Heading>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-4 max-w-4xl text-base leading-8 text-ink/75">{guide.purpose}</p>
        </Reveal>

        <div className="mt-7">
          <DecisionCards cards={guide.decisionCards} tone={tone} />
        </div>

        <div className="mt-8">
          <ComparisonTable rows={guide.comparisonRows} />
        </div>

        <div className="mt-8">
          <article className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
            <p className={EYEBROW_CLASS}>Next actions</p>
            <BulletList items={guide.nextActions} tone={tone} />
          </article>
        </div>
      </div>
    </section>
  );
}
