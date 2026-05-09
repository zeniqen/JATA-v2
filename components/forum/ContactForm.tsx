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

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [category, setCategory] = React.useState<Category>("Peer Support");
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  function reset() {
    setName("");
    setAge("");
    setEmail("");
    setCategory("Peer Support");
    setMessage("");
    setHoneypot("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please add a message before sending.");
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          age,
          email,
          category,
          message,
          honeypot,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        toast.error(
          data.error ??
            "Something went wrong sending your message. Please try again."
        );
        return;
      }

      toast.success("Thanks for reaching out.", {
        description: "Your message has been delivered. We read every single one.",
      });
      reset();
    } catch {
      toast.error(
        "We couldn't reach the server. Check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Leave this field empty</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

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
            maxLength={80}
            disabled={submitting}
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
            disabled={submitting}
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
          maxLength={120}
          disabled={submitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          disabled={submitting}
          className="flex h-10 w-full rounded-md border border-input bg-card/60 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b5a55%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.75rem_center] pr-10"
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
          maxLength={5000}
          disabled={submitting}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg" disabled={submitting} className="group">
          {submitting ? "Sending…" : "Send message"}
          <Send className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </form>
  );
}
