interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
}

export function InfoPage({ eyebrow, title, intro, sections }: InfoPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <section className="max-w-3xl space-y-6 border-b border-black/10 pb-10">
        <p className="text-[10px] uppercase tracking-[0.32em] text-black/45">{eyebrow}</p>
        <h1 className="font-serif text-4xl tracking-[0.06em] text-black sm:text-5xl">{title}</h1>
        <p className="text-base leading-8 text-black/68">{intro}</p>
      </section>

      <div className="max-w-3xl space-y-8">
        {sections.map((section) => (
          <section key={section.heading} className="space-y-3 border-b border-black/10 pb-8">
            <h2 className="font-serif text-2xl tracking-[0.04em] text-black">{section.heading}</h2>
            <p className="text-sm leading-8 text-black/66">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
