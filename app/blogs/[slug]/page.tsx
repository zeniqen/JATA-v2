import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { POSTS, formatPostDate, getAllSlugs, getPost } from "@/lib/posts";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const idx = POSTS.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? POSTS[idx - 1] : undefined;
  const next = idx < POSTS.length - 1 ? POSTS[idx + 1] : undefined;

  return (
    <article className="relative">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24">
        <Reveal>
          <Button asChild variant="ghost" size="sm" className="-ml-3 mb-8">
            <Link href="/blogs" className="group">
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back to all posts
            </Link>
          </Button>
        </Reveal>

        <Reveal delay={0.05}>
          <header>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {post.readingMinutes} min read
              </span>
              <span aria-hidden="true">·</span>
              <span>By {post.author}</span>
            </div>
            <h1 className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.15]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 h-px bg-border/70" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 space-y-6 text-base sm:text-lg leading-[1.75] text-foreground/90">
            {post.content.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <p className="text-sm text-foreground/80 leading-relaxed">
              If reading this stirred something up — that&apos;s okay. You can
              reach us anytime through the{" "}
              <Link
                href="/forum"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                forum
              </Link>
              . Compassion is on standby.
            </p>
          </div>
        </Reveal>

        {(prev || next) && (
          <nav
            className="mt-14 grid gap-4 sm:grid-cols-2"
            aria-label="More posts"
          >
            {prev ? (
              <Link
                href={`/blogs/${prev.slug}`}
                className="group rounded-xl border border-border/70 bg-card p-5 transition-all hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </p>
                <p className="mt-2 font-serif text-base font-medium tracking-tight group-hover:text-primary transition-colors">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                href={`/blogs/${next.slug}`}
                className="group rounded-xl border border-border/70 bg-card p-5 sm:text-right transition-all hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5 sm:flex-row-reverse">
                  Next
                </p>
                <p className="mt-2 font-serif text-base font-medium tracking-tight group-hover:text-primary transition-colors">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
