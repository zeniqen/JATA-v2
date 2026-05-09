"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/Reveal";
import { formatPostDate, type Post } from "@/lib/posts";

export function BlogList({ posts }: { posts: Post[] }) {
  return (
    <Stagger
      stagger={0.1}
      className="grid gap-6 md:grid-cols-2"
    >
      {posts.map((p) => (
        <StaggerItem key={p.slug}>
          <article className="group h-full flex flex-col rounded-2xl border border-border/70 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <time dateTime={p.date}>{formatPostDate(p.date)}</time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {p.readingMinutes} min read
              </span>
            </div>
            <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight leading-snug">
              <Link
                href={`/blogs/${p.slug}`}
                className="transition-colors hover:text-primary"
              >
                {p.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
              {p.excerpt}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">By {p.author}</p>
              <Link
                href={`/blogs/${p.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors group-hover:gap-2"
              >
                Read More
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
