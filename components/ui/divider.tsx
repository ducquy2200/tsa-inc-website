import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <div className={cn("h-px w-full bg-line", className)} aria-hidden="true" />;
}
