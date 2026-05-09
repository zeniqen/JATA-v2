import type { Metadata } from "next";
import { Heart } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/forum/ContactForm";
import { Faqs } from "@/components/forum/Faqs";

export const metadata: Metadata = {
  title: "Forum",
  description:
    "Send us a message — anonymously if you'd like. Your message goes directly to our team. We read every single one.",
};

export default function ForumPage() {
  return (
    <>
      <section
        className="relative overflow-hidden"
        aria-labelledby="forum-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-24 -right-12 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 pb-10 sm:pt-24 sm:pb-12">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Forum
            </p>
            <h1
              id="forum-heading"
              className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight"
            >
              Say what&apos;s on your mind.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Anonymously or otherwise. There&apos;s no minimum size of problem
              and no wrong reason to write.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-12" aria-label="Contact form">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6 flex items-start gap-3">
              <Heart className="h-5 w-5 shrink-0 text-primary mt-0.5" />
              <p className="text-sm text-foreground/85 leading-relaxed">
                Your message goes directly to our team. We read every single
                one.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-border/70 bg-card p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="relative pb-24 sm:pb-28"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-12">
          <Reveal>
            <h2
              id="faq-heading"
              className="font-serif text-2xl sm:text-3xl font-medium tracking-tight"
            >
              Common questions
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              The things people ask before they reach out.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 rounded-2xl border border-border/70 bg-card px-6 py-2 sm:px-8">
              <Faqs />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
