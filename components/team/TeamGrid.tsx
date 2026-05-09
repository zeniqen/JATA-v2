"use client";

import * as React from "react";

import { Stagger, StaggerItem } from "@/components/Reveal";
import { type TeamMember } from "@/lib/team";
import { TeamCard } from "./TeamCard";
import { TeamModal } from "./TeamModal";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [active, setActive] = React.useState<TeamMember | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  function open(member: TeamMember, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActive(member);
  }

  const close = React.useCallback(() => {
    setActive(null);
    const el = triggerRef.current;
    if (el) {
      window.requestAnimationFrame(() => el.focus());
    }
  }, []);

  return (
    <>
      <Stagger
        stagger={0.08}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {members.map((m) => (
          <StaggerItem key={m.name}>
            <TeamCard member={m} onMore={(el) => open(m, el)} />
          </StaggerItem>
        ))}
      </Stagger>
      <TeamModal member={active} onClose={close} />
    </>
  );
}
