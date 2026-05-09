import { Instagram, LinkedIn } from "@/components/icons/Instagram";
import { cn } from "@/lib/utils";
import { type TeamMember } from "@/lib/team";

interface Props {
  member: TeamMember;
  size?: "sm" | "md";
  className?: string;
}

export function MemberSocials({ member, size = "sm", className }: Props) {
  const sizing =
    size === "md"
      ? "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5"
      : "h-9 w-9 [&>svg]:h-4 [&>svg]:w-4";

  if (!member.instagram && !member.linkedin) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {member.instagram && (
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on Instagram`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-border/80 text-foreground/70 transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/5",
            sizing
          )}
        >
          <Instagram />
        </a>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-border/80 text-foreground/70 transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/5",
            sizing
          )}
        >
          <LinkedIn />
        </a>
      )}
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
