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
 * HUD variant B — "Scene on a ground line".
 * The tower stands on a site strip (DEPLOY above it) and the acts play out
 * around it like a scene: the spotlight beam locks on the intruder (DETECT),
 * the siren pushes him away (DETER), and the alarm line runs from the tower
 * to the PCO operator → police (RESPOND).
 */
export function ScrollyScene() {
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
  return <PinnedScene />;
}

function PinnedScene() {
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
        {/* Fixed-aspect stage so SVG coordinates map 1:1 onto percentages */}
        <div className="relative aspect-[16/10] h-[min(76vh,700px)] max-w-[94vw]">
          {/* SVG overlay: ground line + spotlight beam + alarm signal line */}
          <svg viewBox="0 0 160 100" className="absolute inset-0 z-0 h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="sceneBeam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d6e6ff" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#5c9cff" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#5c9cff" stopOpacity="0.03" />
              </linearGradient>
              <marker id="sceneSig" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                <path d="M0 0 L5 2.5 L0 5 Z" fill="#5c9cff" />
              </marker>
            </defs>

            {/* ground */}
            <line x1="6" y1="80" x2="154" y2="80" stroke="#5c9cff" strokeOpacity="0.3" strokeWidth="0.3" />
            {Array.from({ length: 37 }).map((_, i) => (
              <line
                key={i}
                x1={6 + i * 4}
                y1="80"
                x2={6 + i * 4}
                y2="82"
                stroke="#5c9cff"
                strokeOpacity="0.22"
                strokeWidth="0.25"
              />
            ))}
            {/* soft pool of light under the tower */}
            <ellipse
              cx="80"
              cy="80"
              rx="16"
              ry="2.6"
              fill="#5c9cff"
              fillOpacity={reveal >= 1 ? 0.16 : 0.05}
              style={{ transition: "fill-opacity 0.6s ease" }}
            />

            {/* DETECT — spotlight beam from the lamp onto the intruder */}
            <polygon
              points="79.2,27 80.8,27 122,80 98,80"
              fill="url(#sceneBeam)"
              style={{ opacity: reveal >= 2 ? 1 : 0, transition: "opacity 0.5s ease" }}
            />

            {/* RESPOND — alarm signal from the tower head to the PCO operator */}
            <path
              d="M78 26 L36 20"
              stroke="#5c9cff"
              strokeWidth="0.6"
              strokeDasharray="2 2"
              markerEnd="url(#sceneSig)"
              style={{
                opacity: reveal >= 4 ? 0.9 : 0,
                filter: "drop-shadow(0 0 2px #5c9cff)",
                transition: "opacity 0.5s ease",
              }}
            />
          </svg>

          {/* DEPLOY — above the tower */}
          <div className="absolute left-1/2 top-[8%] z-20 flex -translate-x-1/2 flex-col items-center gap-1.5">
            <motion.span
              animate={showO(reveal >= 1)}
              transition={{ duration: 0.45 }}
              className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-tight text-foreground/90"
            >
              {acts[0].label}
            </motion.span>
            <motion.span
              animate={showO(reveal >= 1)}
              transition={{ duration: 0.45 }}
              className="font-mono-v2 rounded-full border border-primary/50 bg-primary/15 px-3 py-0.5 text-[11px] font-medium text-primary shadow-[0_0_18px_-4px_#5c9cff]"
            >
              24/7 · LIVE
            </motion.span>
          </div>

          {/* Tower standing on the ground */}
          <motion.span
            animate={showO(reveal >= 1)}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute left-1/2 top-[26%] z-20 size-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_16px_6px_rgba(214,230,255,0.8)]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hud/tower.png"
            alt="Seraf monitoring tower"
            width={237}
            height={1269}
            className="absolute bottom-[20%] left-1/2 z-10 h-[54%] w-auto -translate-x-1/2 object-contain"
            style={{
              filter: `brightness(${reveal >= 1 ? 1.28 : 0.5}) drop-shadow(0 10px 24px rgba(0,0,0,0.55))`,
              transition: "filter 0.7s ease",
            }}
          />
          {/* Siren arcs from the tower head (DETER) */}
          <div className="absolute left-1/2 top-[26%] z-10 -translate-x-1/2">
            <div className="relative flex size-8 items-center justify-center">
              <SirenArcs on={reveal >= 3} />
            </div>
          </div>

          {/* DETECT — intruder caught in the beam */}
          <motion.div
            animate={showS(reveal >= 2)}
            transition={{ duration: 0.45 }}
            className="absolute bottom-[20%] left-[68%] z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
          >
            <span className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.2rem,2vw,1.7rem)] font-bold tracking-tight text-foreground/90">
              {acts[1].label}
            </span>
            <span className="font-mono-v2 text-[10px] font-semibold uppercase tracking-widest text-primary">
              AI lock-on · 360°
            </span>
            <div className="flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-2 py-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hud/wolf.png" alt="" className="h-5 w-auto object-contain opacity-75" />
              <span className="font-mono-v2 text-[9px] uppercase tracking-wider text-muted-foreground">filtered</span>
            </div>
            <LockOn>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hud/person-walk.png" alt="" className="h-14 w-auto object-contain" />
            </LockOn>
          </motion.div>

          {/* DETER — intruder running off the site */}
          <motion.div
            animate={showS(reveal >= 3)}
            transition={{ duration: 0.45 }}
            className="absolute bottom-[20%] left-[88%] z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
          >
            <span className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.2rem,2vw,1.7rem)] font-bold tracking-tight text-foreground/90">
              {acts[2].label}
            </span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-primary [text-shadow:0_0_14px_#5c9cff]">
              121 dB
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hud/person-run.png" alt="" className="h-14 w-auto object-contain" />
          </motion.div>

          {/* RESPOND — PCO operator receiving the alarm, alerting the police */}
          <motion.div
            animate={showS(reveal >= 4)}
            transition={{ duration: 0.45 }}
            className="absolute left-[16%] top-[6%] z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
          >
            <span className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.2rem,2vw,1.7rem)] font-bold tracking-tight text-foreground/90">
              {acts[3].label}
            </span>
            <div className="flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary shadow-[0_0_16px_2px_#5c9cff]">
                <Headset className="size-5 text-[#080D2C]" />
              </span>
              <PcoNode />
            </div>
            <span className="font-mono-v2 text-[10px] uppercase tracking-widest text-muted-foreground">
              {_("Operátor PCO upozornený", "PCO operator notified")}
            </span>
            <svg viewBox="0 0 24 46" className="h-6 w-[13px] rotate-180 [filter:drop-shadow(0_0_6px_#5c9cff)]" aria-hidden>
              <path d="M12 1 L23 19 H16 V46 H8 V19 H1 Z" fill="#5c9cff" />
            </svg>
            <div className="flex items-center gap-1.5">
              <span className="flex size-8 items-center justify-center rounded-full border border-primary/50 bg-primary/10 [filter:drop-shadow(0_0_6px_#5c9cff)]">
                <Shield className="size-4 text-primary" />
              </span>
              <span className="font-mono-v2 text-xs font-semibold text-primary">158</span>
            </div>
            <span className="font-mono-v2 text-[10px] uppercase tracking-widest text-muted-foreground">
              {_("Polícia privolaná", "Police alerted")}
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
