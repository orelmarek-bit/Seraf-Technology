"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Stats-band cell that counts up when scrolled into view.
 * Server HTML (and reduced-motion) always shows the final value — the count-up
 * only replaces it client-side once the cell is actually visible.
 */
export function StatCounterV2({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 1400;
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <div ref={ref} className="flex flex-col gap-1 bg-background px-6 py-8 text-center">
      <span className="font-display-v2 text-gradient-v2 text-[clamp(2.4rem,5vw,3.4rem)] leading-none">
        {n}
        {suffix}
      </span>
      <span className="font-mono-v2 mt-2 text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  );
}
