"use client";

import { MessageCircle, HeartHandshake, Compass, UserCheck, type LucideIcon } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

const STEPS: {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    step: "01",
    title: "Reach Out",
    description: "Send us a message via email or Instagram DM. No forms, no fuss.",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "We Listen",
    description: "A peer responds — not to judge, just to hear what's actually going on.",
    icon: HeartHandshake,
  },
  {
    step: "03",
    title: "We Guide",
    description: "We share perspective, options, and resources where helpful — never advice you didn't ask for.",
    icon: Compass,
  },
  {
    step: "04",
    title: "You Choose",
    description: "What happens next is yours. We're here whenever you want to come back.",
    icon: UserCheck,
  },
];

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="relative scroll-mt-24 bg-card/50 border-y border-border/60"
      aria-labelledby="how-we-work-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>
          <h2
            id="how-we-work-heading"
            className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight"
          >
            Four simple steps.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            No paperwork. No waiting rooms. Just a real conversation.
          </p>
        </Reveal>

        <div className="mt-14">
          {/* Desktop: horizontal stepper */}
          <Stagger
            stagger={0.15}
            className="hidden lg:grid lg:grid-cols-4 gap-6 relative"
          >
            <div
              aria-hidden="true"
              className="absolute top-7 left-[12.5%] right-[12.5%] h-px bg-border"
            />
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.step} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-background border-2 border-primary/30 text-primary shadow-sm transition-all duration-300 hover:border-primary hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-xs font-mono font-semibold tracking-widest text-primary/70">
                      STEP {s.step}
                    </p>
                    <h3 className="mt-2 font-serif text-lg font-medium tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[16rem]">
                      {s.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Mobile / tablet: vertical stepper */}
          <Stagger stagger={0.12} className="lg:hidden space-y-1">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.step}>
                  <div className="relative flex gap-5 pb-8 last:pb-0">
                    {i < STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[1.625rem] top-14 bottom-0 w-px bg-border"
                      />
                    )}
                    <div className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-background border-2 border-primary/30 text-primary shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="pt-1">
                      <p className="text-xs font-mono font-semibold tracking-widest text-primary/70">
                        STEP {s.step}
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-medium tracking-tight">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
