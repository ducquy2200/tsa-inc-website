import { Markdown } from "@/components/mdx/markdown";
import { Reveal } from "@/components/ui/reveal";

interface MarkdownSectionProps {
  source: string;
}

export function MarkdownSection({ source }: MarkdownSectionProps) {
  return (
    <section className="px-5 pb-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-line bg-paper p-6 sm:p-10">
        <Reveal>
          <Markdown source={source} />
        </Reveal>
      </div>
    </section>
  );
}
