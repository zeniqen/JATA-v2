"use client";

import { Sparkles, Users, Clock, Lock, type LucideIcon } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

const POINTS: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Sparkles,
    title: "Discipline",
    description:
      "Consistent, follow-through support — not just inspirational quotes once a month.",
  },
  {
    icon: Users,
    title: "Teen-Led Team",
    description:
      "Run by teens who actually understand the texture of school, friendships, and pressure.",
  },
  {
    icon: Clock,
    title: "Here Anytime",
    description:
      "Reach out when you need it. Late-night spirals don't follow office hours.",
  },
  {
    icon: Lock,
    title: "Safe & Confidential",
    description:
      "What you share stays with us. Anonymity is the default, not an upgrade.",
  },
];

export function WhatMakesUsDifferent() {
  return (
    <section
      id="what-makes-us-different"
      className="relative scroll-mt-24"
      aria-labelledby="what-makes-us-different-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why us
          </p>
          <h2
            id="what-makes-us-different-heading"
            className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight"
          >
            What makes us different.
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title}>
                <div className="group h-full rounded-xl border border-border/70 bg-card/60 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-sm">
                  <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mt-4 font-serif text-lg font-medium tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
