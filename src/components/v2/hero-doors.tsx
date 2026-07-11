"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SEEN_KEY = "seraf-intro-seen";
const HOLD_MS = 800; // logo held closed before parting
const SLIDE_MS = 3600; // door slide duration (higher = slower)
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

/**
 * Auto-play "elevator doors" intro overlay.
 * On the first visit (per session, desktop, motion allowed) the original logo +
 * split wordmark ("SERAF" / "TECHNOLOGY") cover the screen as two halves, then
 * the halves slide apart on their own to reveal the hero, then the overlay
 * removes itself. Return visits / mobile / reduced-motion skip it entirely.
 */
export function IntroDoors() {
  const [phase, setPhase] = useState<"closed" | "open" | "done">("closed");

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SEEN_KEY);

    if (!desktop || reduce || seen) {
      setPhase("done");
      return;
    }

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      setPhase("open");
      window.dispatchEvent(new Event("seraf-intro-open"));
    }, HOLD_MS);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem(SEEN_KEY, "1");
      document.body.style.overflow = "";
    }, HOLD_MS + SLIDE_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  const logo = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/hud/logo-vector.svg"
      alt="Seraf Technology"
      className="h-[46vh] w-auto max-w-[88vw] [filter:drop-shadow(0_0_70px_rgba(92,156,255,0.35))]"
    />
  );
  const opened = phase === "open";
  const doorBase = "absolute inset-y-0 w-1/2 overflow-hidden bg-[#080D2C]";
  const trans = `transform ${SLIDE_MS}ms ${EASE}`;

  const wordStyle: React.CSSProperties = {
    position: "absolute",
    top: "calc(50% - 25vh)",
    transform: "translateY(-100%)",
    fontFamily: "var(--font-hanken), sans-serif",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    fontSize: "clamp(1.3rem, 3vw, 2.9rem)",
    color: "#eaf1f8",
    textShadow: "0 0 28px rgba(92,156,255,0.45)",
    whiteSpace: "nowrap",
  };

  return (
    <div className="fixed inset-0 z-[70]" aria-hidden>
      <div
        className={cn(doorBase, "left-0")}
        style={{ transition: trans, transform: opened ? "translateX(-110%)" : "translateX(0)" }}
      >
        <span style={{ ...wordStyle, right: "2.2vw" }}>SERAF</span>
        <div className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2">{logo}</div>
      </div>
      <div
        className={cn(doorBase, "left-1/2")}
        style={{ transition: trans, transform: opened ? "translateX(110%)" : "translateX(0)" }}
      >
        <span style={{ ...wordStyle, left: "2.2vw" }}>TECHNOLOGY</span>
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">{logo}</div>
      </div>
    </div>
  );
}
