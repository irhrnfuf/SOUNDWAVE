import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOUNDWAVE 2026 — Living Archive",
  description: "Interactive Living Archive · 03 People Gallery powered by GSAP Flip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=Jersey+15&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
