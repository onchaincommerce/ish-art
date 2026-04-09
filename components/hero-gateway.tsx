import Link from "next/link";

import { brand } from "@/data/store";
import type { ArtworkSpec } from "@/lib/types";

import { ArtworkImage } from "./artwork-image";

const homeArtwork: ArtworkSpec = {
  aspect: "landscape",
  variant: "wash",
  base: "#f7f4ee",
  tone: "#d9d0c4",
  accent: "#221d18",
  mark: "#837a70",
};

export function HeroGateway() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] flex-1 items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <ArtworkImage
          artwork={homeArtwork}
          decorative={false}
          label="Gateway artwork placeholder"
          className="h-full w-full border-0 p-0"
        />
        <div className="absolute inset-0 bg-white/18" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-2xl space-y-8">
          <p className="text-[10px] uppercase tracking-[0.32em] text-black/55">{brand.strapline}</p>
          <div className="space-y-6">
            <p className="font-serif text-5xl tracking-[0.18em] text-black sm:text-7xl">
              {brand.name}
            </p>
            <h1 className="font-serif text-4xl tracking-[0.22em] text-black sm:text-6xl">
              WELCOME
            </h1>
          </div>
          <Link
            href="/catalogues"
            className="inline-flex border border-black px-6 py-3 text-[10px] uppercase tracking-[0.3em] text-black transition-colors hover:bg-black hover:text-white"
          >
            Enter
          </Link>
        </div>
      </div>
    </section>
  );
}
