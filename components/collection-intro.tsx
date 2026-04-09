import type { ProductSpec } from "@/lib/types";

interface CollectionIntroProps {
  title: string;
  intro: string;
  notes?: ProductSpec[];
}

export function CollectionIntro({ title, intro, notes }: CollectionIntroProps) {
  return (
    <section className="space-y-8 border-b border-black/10 pb-10 sm:space-y-10 sm:pb-12">
      <div className="space-y-5">
        <h1 className="max-w-4xl font-serif text-4xl tracking-[0.08em] text-black sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-8 text-black/65 sm:text-base">{intro}</p>
      </div>

      {notes && notes.length > 0 ? (
        <dl className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {notes.map((item) => (
            <div key={item.label} className="space-y-2 border-t border-black/10 pt-3">
              <dt className="text-[10px] uppercase tracking-[0.28em] text-black/45">
                {item.label}
              </dt>
              <dd className="text-sm leading-7 text-black/68">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
