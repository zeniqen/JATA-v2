"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircleHeart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroMascot } from "./HeroMascot";

function smoothScrollTo(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function Hero() {
  const reduce = useReducedMotion();

  const baseTransition = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 -left-24 h-[22rem] w-[22rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(123,28,46,0.05),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...baseTransition, delay: reduce ? 0 : 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary"
            >
              <MessageCircleHeart className="h-3.5 w-3.5" />
              A teen-led peer support platform
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...baseTransition, delay: reduce ? 0 : 0.15 }}
              className="mt-6 font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-foreground leading-[1.05]"
            >
              By teens,
              <br />
              <span className="text-primary italic">for teens.</span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...baseTransition, delay: reduce ? 0 : 0.25 }}
              className="mt-6 max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
            >
              Compassion on standby — always just a text away.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...baseTransition, delay: reduce ? 0 : 0.35 }}
              className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button
                size="lg"
                onClick={() => smoothScrollTo("what-we-do")}
                className="group"
              >
                Learn More
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => smoothScrollTo("join-the-movement")}
              >
                Join Us
              </Button>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: reduce ? 0 : 0.6 }}
              className="mt-16 flex items-center gap-3 text-xs text-muted-foreground"
            >
              <span className="h-px flex-1 max-w-[6rem] bg-border" />
              <span className="uppercase tracking-[0.2em]">
                Safe · Confidential · Peer-Led
              </span>
              <span className="h-px flex-1 max-w-[6rem] bg-border" />
            </motion.div>
          </div>

          <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
            <HeroMascot />
          </div>
        </div>
      </div>
    </section>
  );
}
