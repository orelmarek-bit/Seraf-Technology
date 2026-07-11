import Link from "next/link";
import { Radar } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="container relative flex flex-col items-center text-center">
        <span className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Radar className="size-7" />
        </span>
        <p className="font-display text-6xl font-semibold text-gradient">404</p>
        <h1 className="mt-4 text-h2 font-semibold text-foreground">Stránka sa nenašla · Page not found</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Ľutujeme, táto stránka neexistuje. · Sorry, this page doesn&apos;t exist.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/sk"
            className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Domov
          </Link>
          <Link
            href="/en"
            className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
