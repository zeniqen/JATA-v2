import Image from "next/image";

import { cn } from "@/lib/utils";
import { type TeamMember } from "@/lib/team";

interface Props {
  member: TeamMember;
  size: "card" | "modal";
}

export function MemberAvatar({ member, size }: Props) {
  const isCard = size === "card";
  const dimensions = isCard ? "h-24 w-24" : "h-28 w-28";
  const fontSize = isCard ? "text-2xl" : "text-3xl";
  const ringRest = isCard ? "ring-4 ring-primary/10" : "ring-4 ring-primary/15";
  const ringHover = isCard ? "group-hover:ring-primary/20" : "";
  const sizesAttr = isCard ? "96px" : "112px";

  if (member.image) {
    return (
      <div
        className={cn(
          "mx-auto relative overflow-hidden rounded-full bg-primary/10 transition-all duration-300",
          dimensions,
          ringRest,
          ringHover
        )}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes={sizesAttr}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mx-auto inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-serif font-medium tracking-wide transition-all duration-300",
        dimensions,
        fontSize,
        ringRest,
        ringHover
      )}
      aria-hidden="true"
    >
      {getInitials(member.name)}
    </div>
  );
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
