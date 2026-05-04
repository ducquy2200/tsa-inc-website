import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";

const components: MDXComponents = {
  h2: (props) => (
    <h2 className="font-heading text-3xl leading-tight tracking-tight text-ink" {...props} />
  ),
  h3: (props) => <h3 className="font-heading text-2xl leading-tight text-ink" {...props} />,
  p: (props) => <p className="text-base leading-8 text-ink/80" {...props} />,
  ul: (props) => <ul className="ml-5 list-disc space-y-3 text-ink/80" {...props} />,
  ol: (props) => <ol className="ml-5 list-decimal space-y-3 text-ink/80" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  a: (props) => (
    <a
      className="underline decoration-clay underline-offset-4 transition hover:text-clay"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    />
  ),
};

interface MarkdownProps {
  source: string;
}

export function Markdown({ source }: MarkdownProps) {
  return (
    <article className="prose prose-neutral max-w-none space-y-6">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </article>
  );
}
