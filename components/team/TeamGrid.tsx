"use client";

import { Stagger, StaggerItem } from "@/components/Reveal";
import { type TeamMember } from "@/lib/team";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <Stagger
      stagger={0.08}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {members.map((m) => (
        <StaggerItem key={m.name}>
          <div className="group h-full rounded-2xl border border-border/70 bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
            <div
              className="mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-serif font-medium tracking-wide ring-4 ring-primary/10 transition-all duration-300 group-hover:ring-primary/20"
              aria-hidden="true"
            >
              {getInitials(m.name)}
            </div>
            <h3 className="mt-5 font-serif text-lg font-medium tracking-tight">
              {m.name}
            </h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
              {m.role}
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {m.bio}
            </p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
