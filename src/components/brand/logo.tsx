import { cn } from "@/lib/utils";

/**
 * Seraf Technology logo — the client's official mark, background removed
 * (transparent public/logo.png) so it sits cleanly on the dark surfaces
 * with no visible box.
 */
export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="Seraf Technology">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Seraf Technology"
        width={254}
        height={166}
        className="h-8 w-auto"
      />
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Seraf<span className="text-primary">.</span>
        </span>
      )}
    </span>
  );
}
