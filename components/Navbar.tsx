"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/blogs", label: "Blogs & Updates" },
  { href: "/forum", label: "Forum" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/70 shadow-[0_1px_8px_-4px_rgba(123,28,46,0.15)]"
          : "bg-background/60 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          >
            J
          </span>
          <span className="text-foreground">Just a Text Away</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-primary transition-all duration-300",
                      active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-secondary transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="md:hidden fixed inset-0 top-16 z-40 bg-foreground/55 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              initial={reduce ? { x: 0 } : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduce ? { x: 0 } : { x: "100%" }}
              transition={{
                duration: reduce ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:hidden fixed top-16 right-0 bottom-0 z-50 w-[78%] max-w-sm bg-card border-l-2 border-primary/25 shadow-2xl shadow-foreground/25"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="p-4">
                <ul className="flex flex-col gap-1 rounded-xl border border-border/60 bg-secondary/50 p-2 shadow-sm">
                  {NAV_LINKS.map((link, i) => {
                    const active = isActive(pathname, link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={reduce ? false : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: reduce ? 0 : 0.08 + i * 0.05,
                        }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "block rounded-md px-4 py-3 text-base font-medium transition-colors",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-secondary"
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
              <div className="px-4 mt-2">
                <div className="rounded-xl border border-border/60 bg-secondary/50 px-4 py-3 shadow-sm">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Compassion on standby — always just a text away.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
