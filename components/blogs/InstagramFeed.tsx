"use client";

import * as React from "react";
import Script from "next/script";

import { Stagger, StaggerItem } from "@/components/Reveal";
import {
  INSTAGRAM_POSTS,
  type InstagramPost,
} from "@/lib/instagram-posts";

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

function processEmbeds() {
  if (typeof window !== "undefined" && window.instgrm) {
    window.instgrm.Embeds.process();
  }
}

function InstagramEmbed({ post }: { post: InstagramPost }) {
  const permalink = post.url.endsWith("/") ? post.url : `${post.url}/`;
  const dataPermalink = `${permalink}?utm_source=ig_embed&utm_campaign=loading`;

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink={dataPermalink}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: 12,
        boxShadow:
          "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 12px 0 rgba(123,28,46,0.08)",
        margin: 0,
        maxWidth: 540,
        minWidth: 280,
        padding: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "18px 16px",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 13,
          color: "#6b5a55",
        }}
      >
        Loading post from{" "}
        <a
          href={permalink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#7b1c2e", textDecoration: "none" }}
        >
          Instagram
        </a>
        …
      </div>
    </blockquote>
  );
}

interface Props {
  posts?: InstagramPost[];
}

export function InstagramFeed({ posts = INSTAGRAM_POSTS }: Props) {
  React.useEffect(() => {
    processEmbeds();
  }, [posts]);

  return (
    <>
      <Stagger stagger={0.1} className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <StaggerItem key={post.url} className="flex justify-center">
            <InstagramEmbed post={post} />
          </StaggerItem>
        ))}
      </Stagger>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processEmbeds}
      />
    </>
  );
}
