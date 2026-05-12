import { SiteFooter } from "@/components/layout/site-footer";
import { StickyNav } from "@/components/layout/sticky-nav";
import Link from "next/link";

const fallbackNav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact-us", label: "Contact" },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-paper">
      <StickyNav currentRoute="" items={fallbackNav} />
      <main className="px-5 pb-24 pt-44 text-center sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-clay">404</p>
          <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-ink">Page not found</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-ink/70">
            The page you requested does not exist in this static build.
          </p>
          <Link className="mt-8 inline-flex rounded-md bg-clay px-6 py-3 font-ui text-sm font-semibold text-paper" href="/">
            Back to Home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
