import type { Metadata } from "next";

import { Reveal } from "@/components/Reveal";
import { BlogList } from "@/components/blogs/BlogList";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blogs & Updates",
  description:
    "Honest writing from the Just a Text Away team — on listening, peer support, confidentiality, and the messy parts of being a teen.",
};

export default function BlogsPage() {
  const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <section
        className="relative overflow-hidden"
        aria-labelledby="blogs-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Words from the team
            </p>
            <h1
              id="blogs-heading"
              className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight"
            >
              Blogs &amp; Updates
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Short, honest pieces about why we do this, how we do it, and what
              we&apos;re still figuring out.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="relative pb-24 sm:pb-28"
        aria-label="All blog posts"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BlogList posts={sorted} />
        </div>
      </section>
    </>
  );
}
