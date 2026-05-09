import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { TeamGrid } from "@/components/team/TeamGrid";
import { TEAM } from "@/lib/team";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Just a Text Away is a fully student-run team. Meet the teens who listen, guide, and keep the lights on.",
};

export default function TeamPage() {
  return (
    <>
      <section
        className="relative overflow-hidden"
        aria-labelledby="team-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-32 -left-16 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              The team
            </p>
            <h1
              id="team-heading"
              className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight"
            >
              Meet the Team
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Just a Text Away is fully student-run. Every person you see here
              juggles classes, deadlines, and life — and still shows up for the
              people who reach out. We&apos;re ordinary teens choosing, again and
              again, to listen.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="relative pb-20 sm:pb-24"
        aria-label="Team members"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TeamGrid members={TEAM} />
        </div>
      </section>

      <section
        className="relative pb-20 sm:pb-24"
        aria-labelledby="join-team-heading"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl border border-border/70 bg-card/80 p-8 sm:p-12 text-center">
              <h2
                id="join-team-heading"
                className="font-serif text-2xl sm:text-3xl font-medium tracking-tight"
              >
                Want to join us?
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
                We&apos;re always looking for thoughtful teens who want to
                listen, write, design, or help out behind the scenes. Tell us
                what you&apos;re into.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="/forum" className="group">
                    Get in touch
                    <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href="https://linktr.ee/justatextaway"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See all our links
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
