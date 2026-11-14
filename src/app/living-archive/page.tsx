"use client";

import GsapFlipCard, { type GsapFlipCardItem } from "@/components/effects/gsap-flip-card";

const livingArchivePeopleItems: GsapFlipCardItem[] = [
  {
    id: "photo-crowd-dusk",
    image: "/assets/archive/photos/photo-crowd-dusk.jpg",
    title: "Memories Inside Horizon",
    meta: "Horizon Arena / DEC 19 · 19:42 / 01",
    description:
      "Main Stage Spectacle — confetti bursts and massive LED screens rising over thousands of hands in the Biscayne Bay night sky.",
    alt: "Horizon Arena crowd under confetti bursts and LED screens",
    caption: "Captured on 35mm stock at Horizon Arena. SoundWave Living Archive.",
  },
  {
    id: "photo-stage-silhouettes",
    image: "/assets/archive/photos/photo-stage-silhouettes.jpg",
    title: "Deep Cuts with Deep Souls",
    meta: "Analog Dome / DEC 19 · 23:15 / 02",
    description:
      "Warehouse and balcony rave energy inside the geodesic dome, with sharp neon light beams cutting through late-night haze.",
    alt: "Analog Dome crowd with neon light beams cutting through haze",
    caption: "Balcony sightline during the Friday midnight lock-in.",
  },
  {
    id: "photo-confetti",
    image: "/assets/archive/photos/photo-confetti.jpg",
    title: "Confetti Storm",
    meta: "Horizon Arena / DEC 20 · 00:00 / 03",
    description:
      "Midnight finale across the waterfront amphitheater as gold and magenta confetti rains over the front-wave pit.",
    alt: "Midnight confetti storm over the festival crowd",
    caption: "Zero-second countdown at the Horizon closing set.",
  },
  {
    id: "photo-golden-lawn",
    image: "/assets/archive/photos/photo-golden-lawn.jpg",
    title: "Vinyl Lawn",
    meta: "Vinyl Lawn / DEC 18 · 17:30 / 04",
    description:
      "Fiery sunset clouds drifting above the botanical hillside as groups gather on blankets beside the live LP lacquer booth.",
    alt: "Fiery sunset sky over the Vinyl Lawn crowd",
    caption: "Golden hour acoustic session on the Biscayne slope.",
  },
  {
    id: "photo-light-installation",
    image: "/assets/archive/photos/photo-light-installation.jpg",
    title: "Liberation with Will",
    meta: "Waterfront Lawn / DEC 19 · 21:05 / 05",
    description:
      "Open-air red flare lighting up the nocturnal crowd atop the sound stage as the collective frequency peaks.",
    alt: "Open air red flare celebration atop the sound stage",
    caption: "03. People — The people make the frequency.",
  },
];

export default function LivingArchivePeoplePage() {
  return (
    <main className="min-h-svh w-full bg-[#0b0c10] text-white">
      <div className="fixed top-4 right-6 z-[70] flex items-center gap-3 text-xs font-mono tracking-wider uppercase">
        <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-zinc-300 backdrop-blur-md">
          03 · The People
        </span>
        <a
          href="/welcome.html#scene-people"
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-white transition hover:bg-white hover:text-black"
        >
          Back to Archive &nearr;
        </a>
      </div>

      <GsapFlipCard
        items={livingArchivePeopleItems}
        backgroundColor="#0b0c10"
        textColor="#ffffff"
        mutedColor="#a1a1aa"
      />
    </main>
  );
}
