import { cn } from "@/lib/utils";

interface PillProps {
  className?: string;
  children: React.ReactNode;
}

export function Pill({ className, children }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-paper/80 px-4 py-1.5 font-ui text-xs uppercase tracking-[0.14em] text-ink/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
