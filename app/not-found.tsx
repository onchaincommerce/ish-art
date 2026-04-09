import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="space-y-6">
        <p className="text-[10px] uppercase tracking-[0.32em] text-black/45">Not Found</p>
        <h1 className="font-serif text-4xl tracking-[0.08em] text-black sm:text-5xl">
          This page has moved out of view.
        </h1>
        <p className="text-sm leading-8 text-black/62">
          Return to the storefront and continue browsing the current selection.
        </p>
        <Link
          href="/"
          className="inline-flex border border-black px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-black transition-colors hover:bg-black hover:text-white"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
