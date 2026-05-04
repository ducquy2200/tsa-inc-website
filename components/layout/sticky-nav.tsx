"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types";

interface StickyNavProps {
  items: NavItem[];
  currentRoute: string;
}

function routeIsActive(currentRoute: string, href: string) {
  if (href === "/") {
    return currentRoute === "/";
  }

  return currentRoute === href || currentRoute.startsWith(`${href}/`);
}

export function StickyNav({ items, currentRoute }: StickyNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = useMemo(() => items.filter((item) => item.href !== "/contact-us"), [items]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-7" data-testid="sticky-nav-shell">
      <div
        data-testid="sticky-nav-frame"
        className={cn(
          "flex w-full items-center justify-between rounded-full border border-transparent px-4 py-2.5 transition duration-300",
          scrolled && "border-line bg-paper/90 shadow-[0_8px_30px_rgba(28,22,16,0.08)] backdrop-blur",
        )}
      >
        <Link aria-label="Traffic Survey Analysis Inc." className="flex items-center" href="/">
          <SiteLogo className="h-9 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={cn(
                "relative font-ui text-sm font-medium text-ink/65 transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:text-ink active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink/70 after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100",
                routeIsActive(currentRoute, item.href) && "text-ink after:scale-x-100",
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact-us" variant="primary" size="sm">
            Contact Us
          </Button>
        </div>

        <button
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink md:hidden"
          onClick={() => setOpen((state) => !state)}
          type="button"
        >
          <span className="sr-only">Toggle menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 block h-0.5 w-5 bg-current transition",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span className={cn("absolute left-0 top-[6px] block h-0.5 w-5 bg-current transition", open && "opacity-0")} />
            <span
              className={cn(
                "absolute left-0 top-3 block h-0.5 w-5 bg-current transition",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "mt-3 w-full overflow-hidden rounded-2xl border border-line bg-paper transition-all md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0",
        )}
      >
        <nav className="grid gap-1 p-4" aria-label="Mobile Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={cn(
                "rounded-lg px-3 py-2 font-ui text-sm font-medium text-ink/75 transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-sand/75 hover:text-ink active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none",
                routeIsActive(currentRoute, item.href) && "bg-sand text-ink",
              )}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button
            className="mt-1"
            href="/contact-us"
            onClick={() => setOpen(false)}
            size="sm"
            variant="primary"
          >
            Contact Us
          </Button>
        </nav>
      </div>
    </header>
  );
}
