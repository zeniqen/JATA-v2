"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Is this confidential?",
    a: "Yes. Only a small trained group of teen volunteers reads what you send. We don't share screenshots, we don't tag your school, and we don't post your story on social media. Name, age, and email are all optional — most people leave them blank, and that's fine. The only time we'll gently push is if you tell us you're in immediate danger, in which case we'll share emergency resources and stay with you while you reach out for trained help.",
  },
  {
    q: "Are you trained therapists or counsellors?",
    a: "No, and we don't pretend to be. We're a peer support group — teens who've been trained to listen well, hold space, and point you toward better-equipped resources when something is beyond what we can help with. Think of us as the friend with good listening skills, not a licensed professional.",
  },
  {
    q: "How fast will I hear back?",
    a: "Usually within 24 hours, often much sooner. We're students too, so we can't promise a specific time, but a real human reads every message and we don't leave anyone hanging. If you need urgent crisis support, please contact a local helpline — we'll always tell you when something is bigger than us.",
  },
];

export function Faqs() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQS.map((f, i) => (
        <AccordionItem key={f.q} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
