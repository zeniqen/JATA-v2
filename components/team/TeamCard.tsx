"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

import { type TeamMember } from "@/lib/team";
import { MemberSocials, getInitials } from "./MemberSocials";

interface Props {
  member: TeamMember;
  onMore: (trigger: HTMLButtonElement) => void;
}

export function TeamCard({ member, onMore }: Props) {
  const moreRef = React.useRef<HTMLButtonElement | null>(null);

  function handleMore() {
    if (moreRef.current) onMore(moreRef.current);
  }

  return (
    <div className="group relative h-full flex flex-col rounded-2xl border border-border/70 bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <div
        className="mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-serif font-medium tracking-wide ring-4 ring-primary/10 transition-all duration-300 group-hover:ring-primary/20"
        aria-hidden="true"
      >
        {getInitials(member.name)}
      </div>
      <h3 className="mt-5 font-serif text-lg font-medium tracking-tight">
        {member.name}
      </h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
        {member.role}
      </p>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
        {member.bio}
      </p>

      <div className="mt-5 pt-5 border-t border-border/60 flex items-center justify-between gap-3">
        <MemberSocials member={member} />
        <button
          ref={moreRef}
          type="button"
          onClick={handleMore}
          aria-label={`Read more about ${member.name}`}
          aria-haspopup="dialog"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all duration-200 hover:gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-md px-1 py-0.5"
        >
          ...more
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
