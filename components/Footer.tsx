import Link from "next/link";
import { Mail } from "lucide-react";

import { Instagram, Linktree, LinkedIn } from "@/components/icons/Instagram";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/blogs", label: "Blogs & Updates" },
  { href: "/forum", label: "Forum" },
] as const;

const SOCIALS = [
  {
    href: "https://www.instagram.com/justatextaway_/",
    label: "Instagram",
    icon: Instagram,
    external: true,
  },
  {
    href: "mailto:justatextaway.org@gmail.com",
    label: "Email",
    icon: Mail,
    external: false,
  },
  {
    href: "https://linkedin.com/company/just-a-text-away",
    label: "LinkedIn",
    icon: LinkedIn,
    external: true,
  },
  {
    href: "https://linktr.ee/justatextaway",
    label: "Linktree",
    icon: Linktree,
    external: true,
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-base font-semibold tracking-tight"
            >
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold"
                aria-hidden="true"
              >
                J
              </span>
              Just a Text Away
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Compassion on standby — always just a text away.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Explore
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Reach us
            </h3>
            <ul className="flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.external ? "_blank" : undefined}
                      rel={s.external ? "noopener noreferrer" : undefined}
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-foreground/70 transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/5"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              <a
                href="mailto:justatextaway.org@gmail.com"
                className="transition-colors hover:text-primary"
              >
                justatextaway.org@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2025 Just a Text Away • By teens, for teens.
          </p>
          <p className="text-xs text-muted-foreground/80">
            Made with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
