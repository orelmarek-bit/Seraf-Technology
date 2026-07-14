"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SEEN_KEY = "seraf-intro-seen";
const HOLD_MS = 800; // logo held closed before parting
const SLIDE_MS = 2000; // door slide duration (higher = slower)
const SKIP_SLIDE_MS = 650; // accelerated slide when the visitor interacts
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)"; // doors: in-out, they're being moved
const WORD_EASE = "cubic-bezier(0.16, 1, 0.3, 1)"; // wordmark: ease-out, it's leaving

/**
 * The wordmark is NOT split by the doors. "SERAF" (5 glyphs) is half the width of
 * "TECHNOLOGY" (10), so the string's centre — where the seam falls — lands mid-word,
 * slicing the C. Instead it lives on an overlay ABOVE the doors and exits on its own
 * terms: each letter pushes outward from the centre and fades, so the type stays whole
 * and the motion echoes the doors parting. Per-letter transforms (not letter-spacing)
 * keep it on the GPU.
 */
const WORDMARK = [..."SERAF TECHNOLOGY"];
const MID = (WORDMARK.length - 1) / 2;

/**
 * Auto-play "elevator doors" intro overlay.
 * On the first visit (per session, desktop, motion allowed) the original logo +
 * split wordmark ("SERAF" / "TECHNOLOGY") cover the screen as two halves, then
 * the halves slide apart on their own to reveal the hero, then the overlay
 * removes itself. Return visits / mobile / reduced-motion skip it entirely.
 */
export function IntroDoors() {
  const [phase, setPhase] = useState<"closed" | "open" | "done">("closed");
  const [slideMs, setSlideMs] = useState(SLIDE_MS);

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

    let openT: ReturnType<typeof setTimeout>;
    let doneT: ReturnType<typeof setTimeout>;
    let skipped = false;

    const removeListeners = () => {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    const finish = () => {
      setPhase("done");
      sessionStorage.setItem(SEEN_KEY, "1");
      document.body.style.overflow = "";
      removeListeners();
    };
    const open = (ms: number) => {
      setSlideMs(ms);
      setPhase("open");
      window.dispatchEvent(new Event("seraf-intro-open"));
      clearTimeout(doneT);
      doneT = setTimeout(finish, ms + 60);
    };
    // Any interaction skips ahead: the doors part quickly instead of holding the visitor.
    function skip() {
      if (skipped) return;
      skipped = true;
      clearTimeout(openT);
      open(SKIP_SLIDE_MS);
    }

    openT = setTimeout(() => open(SLIDE_MS), HOLD_MS);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      clearTimeout(openT);
      clearTimeout(doneT);
      removeListeners();
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
  const trans = `transform ${slideMs}ms ${EASE}`;

  // The wordmark leaves faster than the doors travel, so it's clear of the hero
  // before they finish opening.
  const wordExitMs = Math.round(slideMs * 0.6);

  return (
    <div className="fixed inset-0 z-[70]" aria-hidden>
      {/* Doors — only the logo is clipped and split by the seam. */}
      <div
        className={cn(doorBase, "left-0")}
        style={{ transition: trans, transform: opened ? "translateX(-110%)" : "translateX(0)" }}
      >
        <div className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2">{logo}</div>
      </div>
      <div
        className={cn(doorBase, "left-1/2")}
        style={{ transition: trans, transform: opened ? "translateX(110%)" : "translateX(0)" }}
      >
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">{logo}</div>
      </div>

      {/* Wordmark — above the doors, never clipped. Letters push out from the centre. */}
      <div
        className="pointer-events-none absolute inset-x-0 z-10 flex justify-center"
        style={{ top: "calc(50% - 25vh)" }}
      >
        <span
          className="flex -translate-y-full whitespace-nowrap"
          style={{
            fontFamily: "var(--font-hanken), sans-serif",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: "clamp(1.3rem, 3vw, 2.9rem)",
            color: "#eaf1f8",
            textShadow: "0 0 28px rgba(92,156,255,0.45)",
          }}
        >
          {WORDMARK.map((ch, i) => {
            const offset = (i - MID) / MID; // -1 (far left) … 1 (far right)
            // Centre letters lead, outer letters follow: the spread travels out
            // from the seam, the same way the doors do.
            const delay = Math.round(Math.abs(offset) * 90);
            return (
              <span
                key={`${ch}-${i}`}
                style={{
                  display: "inline-block",
                  willChange: "transform, opacity",
                  transition: `transform ${wordExitMs}ms ${WORD_EASE} ${delay}ms, opacity ${wordExitMs}ms ease-out ${delay}ms`,
                  transform: opened
                    ? `translate(calc(${offset} * 5vw), -0.3em)`
                    : "translate(0, 0)",
                  opacity: opened ? 0 : 1,
                }}
              >
                {ch === " " ? " " : ch}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
}
