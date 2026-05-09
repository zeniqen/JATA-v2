"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function HeroMascot({ className }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "relative text-primary w-full max-w-[420px] mx-auto",
        className
      )}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={
        reduce
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              y: [0, -8, 0],
            }
      }
      transition={
        reduce
          ? { duration: 0.5 }
          : {
              opacity: { duration: 0.7, delay: 0.3 },
              y: {
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1,
              },
            }
      }
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 360 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_18px_30px_rgba(123,28,46,0.12)]"
        role="img"
        aria-label="A friendly doodle dinosaur mascot, smiling"
      >
        <g
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Soft glow behind dino */}
          <ellipse
            cx="185"
            cy="180"
            rx="155"
            ry="125"
            fill="var(--color-primary)"
            fillOpacity="0.05"
            stroke="none"
          />

          {/* Tail curling left-down */}
          <path
            d="M 95 215 C 60 215, 28 222, 22 246 C 18 266, 42 274, 62 268 C 78 263, 84 248, 84 235"
            fill="var(--color-card)"
          />

          {/* Body */}
          <path
            d="M 230 142 C 250 148, 262 170, 260 200 C 258 232, 222 252, 175 254 C 128 256, 92 238, 88 200 C 84 162, 110 138, 148 134 C 178 132, 208 135, 230 142 Z"
            fill="var(--color-card)"
          />

          {/* Neck + head as one continuous shape */}
          <path
            d="M 232 142 C 245 110, 268 78, 302 66 C 332 58, 350 75, 348 96 C 347 110, 332 116, 322 114 C 308 112, 298 102, 287 100 C 274 100, 258 110, 250 132 C 246 140, 240 144, 232 142 Z"
            fill="var(--color-card)"
          />

          {/* Belly inner curve */}
          <path
            d="M 100 220 C 142 248, 218 250, 252 220"
            strokeOpacity="0.4"
            strokeWidth="2"
          />

          {/* Spikes along the back */}
          <path d="M 132 138 l 4 -10 l 4 10" />
          <path d="M 158 132 l 4 -10 l 4 10" />
          <path d="M 184 130 l 4 -10 l 4 10" />
          <path d="M 210 134 l 4 -10 l 4 10" />

          {/* Tiny spike on top of head */}
          <path d="M 305 50 l 3 -8 l 3 8" />

          {/* Eye */}
          <circle
            cx="324"
            cy="84"
            r="4.5"
            fill="currentColor"
            stroke="none"
          />
          <circle
            cx="325.5"
            cy="82.5"
            r="1.3"
            fill="var(--color-card)"
            stroke="none"
          />

          {/* Smile */}
          <path
            d="M 332 99 C 337 103, 342 102, 344 98"
            strokeWidth="2.4"
          />

          {/* Nostril */}
          <circle
            cx="346"
            cy="88"
            r="1.2"
            fill="currentColor"
            stroke="none"
          />

          {/* Cheek blush */}
          <ellipse
            cx="322"
            cy="104"
            rx="5"
            ry="3"
            fill="var(--color-primary)"
            fillOpacity="0.22"
            stroke="none"
          />

          {/* Back legs */}
          <path
            d="M 120 250 L 120 282 C 120 287, 138 287, 138 282 L 138 250"
            fill="var(--color-card)"
            fillOpacity="0.85"
          />
          <path
            d="M 152 252 L 152 282 C 152 287, 170 287, 170 282 L 170 252"
            fill="var(--color-card)"
            fillOpacity="0.85"
          />

          {/* Front legs */}
          <path
            d="M 198 252 L 198 282 C 198 287, 216 287, 216 282 L 216 252"
            fill="var(--color-card)"
          />
          <path
            d="M 226 250 L 226 282 C 226 287, 244 287, 244 282 L 244 250"
            fill="var(--color-card)"
          />

          {/* Toes */}
          <path d="M 122 287 v 3 M 129 287 v 3 M 136 287 v 3" />
          <path d="M 154 287 v 3 M 161 287 v 3 M 168 287 v 3" />
          <path d="M 200 287 v 3 M 207 287 v 3 M 214 287 v 3" />
          <path d="M 228 287 v 3 M 235 287 v 3 M 242 287 v 3" />

          {/* Floating heart near the tail (warmth) */}
          <g transform="translate(40, 175)">
            <path
              d="M 0 4 C -2 -1, -8 -1, -8 5 C -8 11, 0 16, 0 16 C 0 16, 8 11, 8 5 C 8 -1, 2 -1, 0 4 Z"
              fill="currentColor"
              strokeWidth="1.5"
            />
          </g>

          {/* Tiny sparkle near head (a friendly twinkle) */}
          <g
            transform="translate(280, 35)"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M 0 -6 L 0 6" />
            <path d="M -6 0 L 6 0" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
