import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECIPIENT = "justatextaway.org@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT}`;

const ALLOWED_CATEGORIES = [
  "Peer Support",
  "Academic Help",
  "Harassment / Eve-teasing",
  "Other",
] as const;

type Category = (typeof ALLOWED_CATEGORIES)[number];

type ContactPayload = {
  name?: string;
  age?: string;
  email?: string;
  category?: string;
  message?: string;
  honeypot?: string;
};

function sanitize(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  if (typeof body.honeypot === "string" && body.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = sanitize(body.name, 80);
  const age = sanitize(body.age, 4);
  const email = sanitize(body.email, 120);
  const categoryRaw = sanitize(body.category, 60);
  const message = sanitize(body.message, 5000);

  if (!message) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const category: Category = (ALLOWED_CATEGORIES as readonly string[]).includes(
    categoryRaw
  )
    ? (categoryRaw as Category)
    : "Other";

  const subject = `[JATA · ${category}] ${
    name ? `from ${name}` : "Anonymous message"
  }`;

  const payload = {
    _subject: subject,
    _template: "table",
    _captcha: "false",
    Category: category,
    Name: name || "(anonymous)",
    Age: age || "(not given)",
    "Reply-to email": email || "(not given)",
    Message: message,
  };

  try {
    const upstream = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        {
          error:
            "We couldn't deliver your message right now. Please try again in a moment, or email us directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error:
          "We couldn't reach our mail service. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}
