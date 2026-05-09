import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { HowWeWork } from "@/components/home/HowWeWork";
import { WhatMakesUsDifferent } from "@/components/home/WhatMakesUsDifferent";
import { JoinTheMovement } from "@/components/home/JoinTheMovement";

export const metadata: Metadata = {
  title: "Just a Text Away — Compassion on standby",
  description:
    "By teens, for teens. A peer support platform offering a safe space, academic help, and protection from harassment. Always just a text away.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <HowWeWork />
      <WhatMakesUsDifferent />
      <JoinTheMovement />
    </>
  );
}
