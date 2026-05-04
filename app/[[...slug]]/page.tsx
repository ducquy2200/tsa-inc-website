import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { StickyNav } from "@/components/layout/sticky-nav";
import { PageRenderer } from "@/components/sections/page-renderer";
import { getAllRoutes, getNavItems, getPageByRoute } from "@/lib/content";
import { routeToSegments, toRoute } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const routes = await getAllRoutes();
  return routes.map((route) => ({ slug: routeToSegments(route) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const route = toRoute(resolvedParams.slug);
  const page = await getPageByRoute(route);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: {
      canonical: page.meta.canonical,
    },
    openGraph: {
      title: page.meta.title,
      description: page.meta.description,
      url: page.meta.canonical,
      siteName: "TSA Inc.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.description,
    },
  };
}

export default async function RoutePage({ params }: PageProps) {
  const resolvedParams = await params;
  const route = toRoute(resolvedParams.slug);
  const [page, navItems] = await Promise.all([getPageByRoute(route), getNavItems()]);

  if (!page) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-paper">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-paper focus:px-3 focus:py-2"
        href="#main-content"
      >
        Skip to main content
      </a>

      <StickyNav currentRoute={route} items={navItems} />
      <main id="main-content">
        <PageRenderer page={page} />
      </main>
      <SiteFooter />
    </div>
  );
}
