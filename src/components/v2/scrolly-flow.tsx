"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { Headset, Shield } from "lucide-react";

import { pick } from "@/content/site";
import {
  useActs,
  showO,
  showS,
  LockOn,
  SirenArcs,
  PcoNode,
  StaticList,
} from "./scrolly-circle";

/**
 * HUD variant A — "Horizontal flow".
 * The tower stands at the top (DEPLOY above it), its spotlight covering the
 * process. Beneath: DETECT → DETER → RESPOND as a left-to-right flow with
 * glowing arrows; a subtle return arrow hints the cycle repeats.
 */
export function ScrollyFlow() {
  const acts = useActs();
  const reduce = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnhanced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  if (!enhanced) return <StaticList acts={acts} />;
  return <PinnedFlow />;
}

function PinnedFlow() {
  const acts = useActs();
  const _ = pick(useLocale());
  const ref = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const r = Math.max(0, Math.min(4, Math.floor(v * 5 + 0.0001)));
    setReveal(r);
    setActive(Math.max(0, r - 1));
  });

  return (
    <div ref={ref} className="relative" style={{ height: "420vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="relative flex w-full max-w-[1160px] flex-col items-center px-6">
          {/* DEPLOY — annotation above the tower */}
          <motion.span
            animate={showO(reveal >= 1)}
            transition={{ duration: 0.45 }}
            className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.5rem,2.8vw,2.4rem)] font-bold tracking-tight text-foreground/90"
          >
            {acts[0].label}
          </motion.span>
          <motion.span
            animate={showO(reveal >= 1)}
            transition={{ duration: 0.45 }}
            className="font-mono-v2 mt-2 rounded-full border border-primary/50 bg-primary/15 px-3.5 py-1 text-xs font-medium text-primary shadow-[0_0_20px_-4px_#5c9cff]"
          >
            24/7 · LIVE
          </motion.span>

          {/* Tower + lamp + spotlight cone over the whole flow */}
          <div className="relative mt-3 flex flex-col items-center">
            <motion.span
              animate={showO(reveal >= 1)}
              transition={{ duration: 0.5 }}
              className="pointer-events-none absolute left-1/2 top-[2%] z-20 size-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_6px_rgba(214,230,255,0.8)]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hud/tower.png"
              alt="Seraf monitoring tower"
              width={237}
              height={1269}
              className="relative z-10 h-[min(30vh,300px)] w-auto object-contain"
              style={{
                filter: `brightness(${reveal >= 1 ? 1.28 : 0.5}) drop-shadow(0 14px 30px rgba(0,0,0,0.55))`,
                transition: "filter 0.7s ease",
              }}
            />
          </div>

          {/* Spotlight cone — from the lamp down across the three acts */}
          <motion.div
            animate={showO(reveal >= 1)}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute left-1/2 top-[13%] z-0 h-[74%] w-[86%] -translate-x-1/2 blur-[3px]"
            style={{
              clipPath: "polygon(48.5% 0, 51.5% 0, 100% 100%, 0 100%)",
              background:
                "linear-gradient(to bottom, rgba(214,230,255,0.30), rgba(92,156,255,0.05) 62%, transparent)",
            }}
          />

          {/* The recurring cycle: DETECT → DETER → RESPOND */}
          <div className="relative z-10 mt-9 grid w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-3">
            <FlowPanel label={acts[1].label} on={reveal >= 2}>
              <span className="font-mono-v2 text-xs font-semibold uppercase tracking-widest text-primary">
                AI lock-on · 360°
              </span>
              <LockOn>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hud/person-walk.png" alt="" className="h-14 w-auto object-contain" />
              </LockOn>
              <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-2.5 py-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hud/wolf.png" alt="" className="h-6 w-auto object-contain opacity-75" />
                <span className="font-mono-v2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  filtered
                </span>
              </div>
            </FlowPanel>

            <FlowArrow on={reveal >= 3} />

            <FlowPanel label={acts[2].label} on={reveal >= 3}>
              <span className="font-mono-v2 text-xs font-semibold uppercase tracking-widest text-primary">
                Siren shockwave
              </span>
              <div className="relative flex h-16 w-56 items-center justify-center">
                <SirenArcs on={reveal >= 3} />
                <span className="relative z-10 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-primary [text-shadow:0_0_16px_#5c9cff]">
                  121 dB
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hud/person-run.png" alt="" className="absolute right-0 z-10 h-14 w-auto object-contain" />
              </div>
            </FlowPanel>

            <FlowArrow on={reveal >= 4} />

            <FlowPanel label={acts[3].label} on={reveal >= 4}>
              <span className="font-mono-v2 text-[10px] uppercase tracking-widest text-muted-foreground">
                {_("Poplach z veže", "Alarm from the tower")}
              </span>
              <svg viewBox="0 0 24 46" className="h-6 w-[13px] rotate-180 [filter:drop-shadow(0_0_6px_#5c9cff)]" aria-hidden>
                <path d="M12 1 L23 19 H16 V46 H8 V19 H1 Z" fill="#5c9cff" />
              </svg>
              <div className="flex items-center gap-2">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary shadow-[0_0_16px_2px_#5c9cff]">
                  <Headset className="size-5 text-[#080D2C]" />
                </span>
                <PcoNode />
              </div>
              <span className="font-mono-v2 text-[10px] uppercase tracking-widest text-muted-foreground">
                {_("Operátor PCO → polícia", "PCO operator → police")}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="flex size-8 items-center justify-center rounded-full border border-primary/50 bg-primary/10 [filter:drop-shadow(0_0_6px_#5c9cff)]">
                  <Shield className="size-4 text-primary" />
                </span>
                <span className="font-mono-v2 text-xs font-semibold text-primary">158</span>
              </div>
            </FlowPanel>
          </div>

          {/* Return arrow — the cycle repeats */}
          <motion.div
            animate={showO(reveal >= 4)}
            transition={{ duration: 0.5 }}
            className="relative z-10 mt-4 flex w-full max-w-[880px] flex-col items-center"
          >
            <svg viewBox="0 0 800 46" className="h-9 w-full" fill="none" aria-hidden>
              <defs>
                <marker id="flowback" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
                  <path d="M0 0 L7 3.5 L0 7 Z" fill="#5c9cff" fillOpacity="0.6" />
                </marker>
              </defs>
              <path
                d="M760 4 C 760 34, 40 34, 40 8"
                stroke="#5c9cff"
                strokeOpacity="0.45"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                markerEnd="url(#flowback)"
              />
            </svg>
            <span className="font-mono-v2 -mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              {_("Cyklus sa opakuje — veža stráži ďalej", "The cycle repeats — the tower keeps watching")}
            </span>
          </motion.div>
        </div>

        {/* Caption */}
        <div className="pointer-events-none absolute bottom-[3vh] left-1/2 h-8 w-[min(90vw,560px)] -translate-x-1/2 text-center">
          <motion.p
            key={reveal}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: reveal === 0 ? 0.6 : 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-muted-foreground"
          >
            {reveal === 0 ? _("Skrolujte a sledujte, ako to funguje", "Scroll to see how it works") : acts[active].caption}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function FlowPanel({ label, on, children }: { label: string; on: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      animate={showS(on)}
      transition={{ duration: 0.45 }}
      className="flex flex-col items-center gap-2.5 rounded-lg border border-border/60 bg-card/30 px-4 py-5"
    >
      <span className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.2rem,2vw,1.7rem)] font-bold tracking-tight text-foreground/90">
        {label}
      </span>
      {children}
    </motion.div>
  );
}

function FlowArrow({ on }: { on: boolean }) {
  return (
    <motion.svg
      animate={showO(on)}
      transition={{ duration: 0.45 }}
      viewBox="0 0 46 24"
      className="mt-16 h-5 w-10 self-start justify-self-center [filter:drop-shadow(0_0_6px_#5c9cff)]"
      aria-hidden
    >
      <path d="M45 12 L27 1 V8 H1 V16 H27 V23 Z" fill="#5c9cff" />
    </motion.svg>
  );
}
