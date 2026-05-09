"use client";

import * as React from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CATEGORIES = [
  "Peer Support",
  "Academic Help",
  "Harassment / Eve-teasing",
  "Other",
] as const;

type Category = (typeof CATEGORIES)[number];

const RECIPIENT = "justatextaway.org@gmail.com";

function buildMailto(values: {
  name: string;
  age: string;
  email: string;
  category: Category;
  message: string;
}) {
  const subject = `[JATA · ${values.category}] ${
    values.name ? `from ${values.name}` : "Anonymous message"
  }`;

  const lines = [
    `Category: ${values.category}`,
    values.name ? `Name: ${values.name}` : "Name: (anonymous)",
    values.age ? `Age: ${values.age}` : null,
    values.email ? `Email: ${values.email}` : null,
    "",
    "Message:",
    values.message,
  ].filter(Boolean) as string[];

  const body = lines.join("\n");
  const params = new URLSearchParams({ subject, body });
  return `mailto:${RECIPIENT}?${params.toString().replace(/\+/g, "%20")}`;
}

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [category, setCategory] = React.useState<Category>("Peer Support");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please add a message before sending.");
      return;
    }
    setSubmitting(true);
    const href = buildMailto({ name, age, email, category, message });
    if (typeof window !== "undefined") {
      window.location.href = href;
    }
    toast.success("Thanks for reaching out.", {
      description:
        "Your email app should open in a moment. We read every single one.",
    });
    setTimeout(() => {
      setSubmitting(false);
      setName("");
      setAge("");
      setEmail("");
      setCategory("Peer Support");
      setMessage("");
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name{" "}
            <span className="text-xs font-normal text-muted-foreground">
              (optional — we prefer anonymity)
            </span>
          </Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Anonymous"
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">
            Age{" "}
            <span className="text-xs font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            inputMode="numeric"
            min={10}
            max={25}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="—"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email{" "}
          <span className="text-xs font-normal text-muted-foreground">
            (optional — only if you want a reply)
          </span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="flex h-10 w-full rounded-md border border-input bg-card/60 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:border-primary/40 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b5a55%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] pr-10"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-xs font-normal text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Take your time. Say as much or as little as you want."
          rows={6}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pt-2">
        <Button type="submit" size="lg" disabled={submitting} className="group">
          {submitting ? "Opening your email…" : "Send message"}
          <Send className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
        <p className="text-xs text-muted-foreground">
          This will open your email app pre-filled. You stay in control.
        </p>
      </div>
    </form>
  );
}
