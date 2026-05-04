import { cn } from "@/lib/utils";

interface EyebrowProps {
  className?: string;
  children: React.ReactNode;
}

export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.16em] text-clay", className)}>
      {children}
    </p>
  );
}
