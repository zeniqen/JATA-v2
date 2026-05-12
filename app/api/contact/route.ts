import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
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

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.error(
      "Contact form: GMAIL_USER or GMAIL_APP_PASSWORD env var is missing."
    );
    return NextResponse.json(
      {
        error:
          "We couldn't deliver your message right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }

  const subject = `[JATA · ${category}] ${
    name ? `from ${name}` : "Anonymous message"
  }`;

  const text = [
    `Category: ${category}`,
    `Name: ${name || "(anonymous)"}`,
    `Age: ${age || "(not given)"}`,
    `Reply-to email: ${email || "(not given)"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#2a1a1f;line-height:1.55;font-size:14px;">
  <div style="background:#fbf7f1;border:1px solid #e3d6c1;border-radius:12px;padding:20px 24px;max-width:560px;">
    <p style="margin:0 0 8px;color:#7b1c2e;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;">
      New forum message
    </p>
    <h2 style="margin:0 0 16px;font-size:18px;">${escapeHtml(category)}</h2>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <tr>
        <td style="padding:4px 0;color:#6b5a55;width:120px;">Name</td>
        <td style="padding:4px 0;">${escapeHtml(name || "(anonymous)")}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#6b5a55;">Age</td>
        <td style="padding:4px 0;">${escapeHtml(age || "(not given)")}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#6b5a55;">Reply-to</td>
        <td style="padding:4px 0;">${
          email
            ? `<a href="mailto:${escapeHtml(email)}" style="color:#7b1c2e;">${escapeHtml(email)}</a>`
            : "(not given)"
        }</td>
      </tr>
    </table>
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e3d6c1;">
      <p style="margin:0 0 8px;color:#6b5a55;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Message</p>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  </div>
</div>`.trim();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Just a Text Away — Forum" <${user}>`,
      to: user,
      replyTo: email || undefined,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return NextResponse.json(
      {
        error:
          "We couldn't deliver your message right now. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}
