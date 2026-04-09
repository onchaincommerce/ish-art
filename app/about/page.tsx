import type { Metadata } from "next";
import Link from "next/link";

import { ArtworkImage } from "@/components/artwork-image";
import { aboutPage } from "@/data/store";

export const metadata: Metadata = {
  title: aboutPage.title,
  description:
    "Read the artist biography and studio statement for the placeholder storefront.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <section className="grid gap-10 border-b border-black/10 pb-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
        <div className="max-w-sm">
          <ArtworkImage
            artwork={aboutPage.portrait}
            decorative={false}
            label="Portrait placeholder artwork"
          />
        </div>

        <div className="max-w-xl space-y-6">
          <h1 className="font-serif text-4xl tracking-[0.06em] text-black sm:text-5xl">
            {aboutPage.title}
          </h1>
          <p className="text-base leading-8 text-black/68">{aboutPage.biography}</p>
          <div className="border-t border-black/10 pt-4">
            <Link
              href={aboutPage.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-[0.3em] text-black/65 transition-opacity hover:opacity-60"
            >
              Instagram / {aboutPage.instagramLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
