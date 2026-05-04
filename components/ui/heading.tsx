import { cn } from "@/lib/utils";

interface HeadingProps {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}

export function Heading({ as = "h2", className, children }: HeadingProps) {
  const Tag = as;
  return <Tag className={cn("font-heading text-balance tracking-tight text-ink", className)}>{children}</Tag>;
}
