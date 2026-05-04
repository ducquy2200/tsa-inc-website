import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("px-5 py-20 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
