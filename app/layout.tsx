import type { Metadata, Viewport } from "next";
import { Geist, Fraunces } from "next/font/google";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://justatextaway.org"),
  title: {
    default: "Just a Text Away — Compassion on standby",
    template: "%s • Just a Text Away",
  },
  description:
    "A teen-led peer support platform. Compassion on standby — always just a text away.",
  applicationName: "Just a Text Away",
  authors: [{ name: "Just a Text Away" }],
  keywords: [
    "peer support",
    "teen mental health",
    "anonymous help",
    "student wellness",
    "academic help",
    "anti-harassment",
  ],
  openGraph: {
    title: "Just a Text Away — Compassion on standby",
    description:
      "A teen-led peer support platform. Compassion on standby — always just a text away.",
    type: "website",
    siteName: "Just a Text Away",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just a Text Away",
    description:
      "A teen-led peer support platform. Compassion on standby — always just a text away.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f0e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
