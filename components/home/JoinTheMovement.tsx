"use client";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export function JoinTheMovement() {
  return (
    <section
      id="join-the-movement"
      className="relative scroll-mt-24"
      aria-labelledby="join-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary to-primary/85 px-6 py-16 sm:px-12 sm:py-20 text-center text-primary-foreground shadow-lg">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 100%, rgba(255,255,255,0.3), transparent 45%)",
              }}
            />
            <p className="relative text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
              Join the movement
            </p>
            <h2
              id="join-heading"
              className="relative mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight"
            >
              Be part of something meaningful.
            </h2>
            <p className="relative mt-5 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed opacity-90">
              Whether you want to listen, help, or just be part of something
              meaningful — we&apos;d love to have you.
            </p>
            <div className="relative mt-10 flex justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-background text-primary hover:bg-background/90 shadow-md"
              >
                <a
                  href="https://linktr.ee/justatextaway"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  Get involved
                  <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
