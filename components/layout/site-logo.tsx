import Image from "next/image";

import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  priority?: boolean;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const logoSrc = `${basePath}/brand/tsa-logo.png`;

export function SiteLogo({ className, priority = false }: SiteLogoProps) {
  return (
    <Image
      alt="Traffic Survey Analysis Inc."
      className={cn("h-9 w-auto", className)}
      height={146}
      priority={priority}
      src={logoSrc}
      width={409}
    />
  );
}
