export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  readingMinutes: number;
  content: string[];
};

export const POSTS: Post[] = [
  {
    slug: "why-we-started",
    title: "Why we started Just a Text Away",
    date: "2025-09-12",
    author: "Aanya Kapoor",
    excerpt:
      "We didn't set out to build a platform. We set out to be the friend we wished we had at 2 a.m.",
    readingMinutes: 4,
    content: [
      "We didn't set out to build a platform. We set out to be the friend we wished we had at 2 a.m. The kind of friend who picks up — not to fix things, but to make sure you don't have to be alone with it.",
      "It started after a conversation that I'll never forget. A close friend told me she'd been carrying something for months, and the only reason she finally said it out loud was because someone asked the right question on the right night. She didn't need a counsellor. She didn't need advice. She needed a person who got it.",
      "Schools have counsellors. Apps have chatbots. But the gap most teens fall through is the in-between — the late-evening, mid-spiral, can't-tell-my-parents space where you just need someone your age to say, 'Yeah. That sucks. Tell me more.'",
      "So we built JATA. It's nothing fancy. It's a small team of teens who said yes when we asked them to listen, and a forum where you can drop a message anonymously and trust that it actually gets read.",
      "We're not therapists. We're not pretending to be. What we are is consistent — and we'd rather be the people who show up imperfectly than the people who promise the world and ghost.",
      "If you're reading this and something inside is asking whether to reach out: please do. There's no minimum size of problem. Compassion is on standby.",
    ],
  },
  {
    slug: "what-listening-actually-looks-like",
    title: "What 'listening' actually looks like",
    date: "2025-10-04",
    author: "Mira D'Souza",
    excerpt:
      "Listening isn't a personality trait. It's a set of small, learnable choices — and it gets harder under pressure.",
    readingMinutes: 5,
    content: [
      "When we tell people we run a peer listening service, the first reaction is usually some version of: 'Aww, that's sweet — you're all such good listeners.' And while we appreciate it, that framing is part of why listening is so hard for most of us in real life.",
      "Listening isn't a personality trait. It's a set of small, learnable choices — and it gets harder under pressure.",
      "Here are three things our team practices, and that anyone can practice today:",
      "1. Don't fix. When someone tells you something painful, the impulse is almost always to make the pain go away — usually by suggesting a solution. Solutions feel productive. They also short-circuit the part where the person feels heard. 'That sounds heavy' beats 'have you tried…' nine times out of ten.",
      "2. Stay with what they said, not what you'd say. It's easy to slide from 'this is what they're going through' to 'this is what I would do in their place.' Those aren't the same thing. The second one is about you.",
      "3. Tolerate the silence. Most people fill silence with reassurance. Reassurance is comfortable for the listener and slightly dismissive for the talker. Try a slow nod and 'tell me more' instead. You'll be amazed at what comes out.",
      "We mess these up all the time. Listening isn't a thing you master — it's a thing you keep choosing, every conversation, especially when you're tired.",
    ],
  },
  {
    slug: "what-confidential-really-means",
    title: "What 'confidential' really means here",
    date: "2025-11-21",
    author: "Vihaan Shah",
    excerpt:
      "Confidentiality is the floor, not the ceiling. Here's exactly what we do — and don't — do with what you share.",
    readingMinutes: 3,
    content: [
      "Confidentiality is the most important promise we make. It's also the one most easily broken in vague, well-meaning ways. So we want to be exact about it.",
      "When you message us, here's what happens: a small group of trained team members reads it. We never share screenshots, never tag your school, never repost stories on Instagram, never sell or pass along any data — full stop. Your name, age, and email are optional fields, and most people leave them blank. That's perfectly fine.",
      "Internally, we sometimes discuss patterns — not people. If five different students are messaging about the same teacher, we'll talk about it as a team so we can respond well, but we don't single you out and we don't take action on your behalf without your say-so.",
      "There is exactly one situation where we'll gently push: if you tell us you're in immediate danger or thinking about hurting yourself, we'll stay with you, share emergency resources, and encourage you to talk to someone trained for that. We won't surprise-call your parents. We'll be honest about our limits.",
      "Confidentiality is the floor, not the ceiling. Trust is what we're trying to build on top of it.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
