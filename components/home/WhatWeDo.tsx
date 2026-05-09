"use client";

import { HandHeart, BookOpen, ShieldCheck, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

const ITEMS: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: HandHeart,
    title: "Peer Supported Safe Space",
    description:
      "A judgment-free place to talk. Trained teen volunteers listen without rushing, fixing, or telling you what you should feel.",
  },
  {
    icon: BookOpen,
    title: "Academic & Extracurricular Assistance",
    description:
      "Stuck on a paper, exam stress, or picking a club? Get peer guidance from students who've been exactly where you are.",
  },
  {
    icon: ShieldCheck,
    title: "Protection from Eve-teasing & Harassment",
    description:
      "Quiet, confidential support if someone is making you uncomfortable. We help you understand options and feel less alone.",
  },
];

export function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="relative scroll-mt-24"
      aria-labelledby="what-we-do-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            What we do
          </p>
          <h2
            id="what-we-do-heading"
            className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight"
          >
            Three ways we show up for you.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Whatever you&apos;re carrying right now, you don&apos;t have to
            carry it alone.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <Card className="group h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-primary/40">
                  <CardContent className="p-7">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-medium tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
