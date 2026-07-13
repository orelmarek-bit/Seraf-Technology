"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { Headset, Shield } from "lucide-react";

import { pick } from "@/content/site";
import { cn } from "@/lib/utils";

export interface Act {
  key: string;
  label: string;
  caption: string;
}

export function useActs(): Act[] {
  const _ = pick(useLocale());
  return [
    { key: "deploy", label: _("NASADENIE", "DEPLOY"), caption: _("Veža nasadená a aktívna do 48 hodín.", "Tower deployed & live within 48 hours.") },
    { key: "detect", label: _("DETEKCIA", "DETECT"), caption: _("AI rozpozná hrozbu a odfiltruje zvieratá.", "AI locks on to threats and filters out animals.") },
    { key: "deter", label: _("ODSTRAŠENIE", "DETER"), caption: _("Siréna 121 dB a svetlá odplašia narušiteľa.", "A 121 dB siren and lights scare the intruder off.") },
    { key: "respond", label: _("REAKCIA", "RESPOND"), caption: _("Operátor PCO overí poplach a privolá políciu (158).", "The PCO operator verifies the alarm and alerts the police (158).") },
  ];
}

export function ScrollyCircle() {
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
  return <Pinned acts={acts} />;
}

/* ---------- Desktop: pinned Threat Loop reveal ---------- */

function Pinned({ acts }: { acts: Act[] }) {
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
        <Stage reveal={reveal} />
        <div className="pointer-events-none absolute bottom-[4vh] left-1/2 h-8 w-[min(90vw,560px)] -translate-x-1/2 text-center">
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

export const showO = (on: boolean) => ({ opacity: on ? 1 : 0 });
export const showS = (on: boolean) => ({ opacity: on ? 1 : 0, scale: on ? 1 : 0.92 });

function Stage({ reveal }: { reveal: number }) {
  const acts = useActs();
  const _ = pick(useLocale());
  return (
    <div className="relative aspect-square h-[min(74vh,760px)] max-w-[92vw]">
      <Dial reveal={reveal} />

      {/* DEPLOY — annotation on the tower itself: a one-time act, NOT part of the loop */}
      <div className="pointer-events-none absolute left-1/2 top-[3%] z-30 -translate-x-1/2">
        <motion.span
          animate={showO(reveal >= 1)}
          transition={{ duration: 0.45 }}
          className="block text-center font-[family-name:var(--font-space-grotesk)] text-[clamp(1.4rem,2.6vw,2.1rem)] font-bold tracking-tight text-foreground/90"
        >
          {acts[0].label}
        </motion.span>
      </div>

      {/* Loop labels — the 3 recurring acts, OUTSIDE the outer ring at 120° spacing */}
      <LabelOutside pos="right" on={reveal >= 2}>{acts[1].label}</LabelOutside>
      <LabelOutside pos="bottomLeft" on={reveal >= 3}>{acts[2].label}</LabelOutside>
      <LabelOutside pos="topLeft" on={reveal >= 4}>{acts[3].label}</LabelOutside>

      {/* Center: platform + glow + spotlight + lamp + tower */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 size-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(4,8,26,0.92), transparent 78%)" }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 size-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(92,156,255,0.18), transparent 72%)" }}
        />
        {/* Volumetric cone — emanates from the camera reflector at the tower top, shining down */}
        <motion.div
          animate={showO(reveal >= 1)}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute left-1/2 top-[24%] h-[46%] w-[34%] -translate-x-1/2 blur-[3px]"
          style={{
            clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
            background: "linear-gradient(to bottom, rgba(214,230,255,0.34), rgba(92,156,255,0.06) 60%, transparent)",
          }}
        />
        {/* Lamp / camera reflector source */}
        <motion.span
          animate={showO(reveal >= 1)}
          transition={{ duration: 0.5 }}
          className="pointer-events-none absolute left-1/2 top-[24%] size-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_7px_rgba(214,230,255,0.8)]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/hud/tower.png"
          alt="Seraf monitoring tower"
          width={237}
          height={1269}
          className="relative z-10 h-[54%] w-auto object-contain"
          style={{
            filter: `brightness(${reveal >= 1 ? 1.28 : 0.5}) drop-shadow(0 16px 34px rgba(0,0,0,0.55))`,
            transition: "filter 0.7s ease",
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* DEPLOY visual — 24/7 · LIVE, above the lamp */}
      <div className="absolute left-1/2 top-[11%] z-30 -translate-x-1/2">
        <motion.div animate={showS(reveal >= 1)} transition={{ duration: 0.45 }}>
          <span className="font-mono-v2 rounded-full border border-primary/50 bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary shadow-[0_0_20px_-4px_#5c9cff]">
            24/7 · LIVE
          </span>
        </motion.div>
      </div>

      {/* DETECT visual — right quadrant */}
      <div className="absolute right-[9%] top-1/2 z-30 -translate-y-1/2">
        <motion.div animate={showS(reveal >= 2)} transition={{ duration: 0.45 }} className="relative flex flex-col items-center gap-1.5">
          <span className="font-mono-v2 text-xs font-semibold uppercase tracking-widest text-primary">AI lock-on</span>
          <span className="font-mono-v2 text-sm font-semibold text-primary">360°</span>
          <LockOn>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hud/person-walk.png" alt="" className="h-14 w-auto object-contain" />
          </LockOn>
          <div className="mt-1 flex items-center gap-2 rounded-full border border-border bg-card/70 px-2.5 py-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hud/wolf.png" alt="" className="h-6 w-auto object-contain opacity-75" />
            <span className="font-mono-v2 text-[10px] uppercase tracking-wider text-muted-foreground">filtered</span>
          </div>
        </motion.div>
      </div>

      {/* DETER visual — bottom-left sector */}
      <div className="absolute bottom-[9%] left-[30%] z-30 -translate-x-1/2">
        <motion.div animate={showS(reveal >= 3)} transition={{ duration: 0.45 }} className="flex flex-col items-center">
          <span className="font-mono-v2 mb-1 text-xs font-semibold uppercase tracking-widest text-primary">Siren shockwave</span>
          <div className="relative flex h-16 w-64 items-center justify-center">
            <SirenArcs on={reveal >= 3} />
            <span className="relative z-10 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-primary [text-shadow:0_0_16px_#5c9cff]">
              121 dB
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hud/person-run.png" alt="" className="absolute right-2 z-10 h-14 w-auto object-contain" />
          </div>
        </motion.div>
      </div>

      {/* RESPOND visual — top-left sector.
          The alarm comes FROM the tower (to the lower right of this group):
          tower →(alarm)→ PCO operator (headset) ↓ police alerted (158). */}
      <div className="absolute left-[6%] top-[30%] z-30 -translate-y-1/2">
        <motion.div animate={showS(reveal >= 4)} transition={{ duration: 0.45 }} className="flex flex-col items-center gap-1.5">
          {/* 1 — alarm signal arriving from the tower */}
          <span className="font-mono-v2 text-[10px] uppercase tracking-widest text-muted-foreground">
            {_("Poplach z veže", "Alarm from the tower")}
          </span>
          <div className="flex items-center gap-2">
            {/* 2 — PCO operator (headset) is notified */}
            <span className="flex size-10 items-center justify-center rounded-full bg-primary shadow-[0_0_16px_2px_#5c9cff]">
              <Headset className="size-5 text-[#080D2C]" />
            </span>
            <PcoNode />
            {/* bold arrow pointing left INTO the operator — from the tower's direction */}
            <svg viewBox="0 0 46 24" className="h-4 w-8 [filter:drop-shadow(0_0_6px_#5c9cff)]" aria-hidden>
              <path d="M1 12 L19 1 V8 H45 V16 H19 V23 Z" fill="#5c9cff" />
            </svg>
          </div>
          <span className="font-mono-v2 text-[10px] uppercase tracking-widest text-muted-foreground">
            {_("Operátor PCO upozornený", "PCO operator notified")}
          </span>

          {/* 3 — the operator alerts the police */}
          <svg viewBox="0 0 24 46" className="h-7 w-[15px] rotate-180 [filter:drop-shadow(0_0_6px_#5c9cff)]" aria-hidden>
            <path d="M12 1 L23 19 H16 V46 H8 V19 H1 Z" fill="#5c9cff" />
          </svg>
          <div className="flex flex-col items-center gap-0.5">
            <span className="flex size-9 items-center justify-center rounded-full border border-primary/50 bg-primary/10 [filter:drop-shadow(0_0_6px_#5c9cff)]">
              <Shield className="size-4 text-primary" />
            </span>
            <span className="font-mono-v2 text-xs font-semibold text-primary">158</span>
          </div>
          <span className="font-mono-v2 text-[10px] uppercase tracking-widest text-muted-foreground">
            {_("Polícia privolaná", "Police alerted")}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* Big act label, positioned OUTSIDE the outer ring. */
function LabelOutside({
  children,
  pos,
  on,
}: {
  children: React.ReactNode;
  pos: "right" | "bottomLeft" | "topLeft";
  on: boolean;
}) {
  // The 3 loop acts sit at 120° spacing: DETECT right (0°), DETER bottom-left
  // (120°), RESPOND top-left (240°) — anchored just outside the ring.
  const wrap: Record<string, React.CSSProperties> = {
    right: { top: "50%", left: "100%", transform: "translateY(-50%) translateX(8px)" },
    bottomLeft: { left: "21%", top: "100%", transform: "translate(-50%, 6px)" },
    topLeft: { left: "21%", bottom: "100%", transform: "translate(-50%, -6px)" },
  };
  const vertical = pos === "right";
  return (
    <div className="pointer-events-none absolute z-30" style={wrap[pos]}>
      <motion.span
        animate={showO(on)}
        transition={{ duration: 0.45 }}
        className="block font-[family-name:var(--font-space-grotesk)] text-[clamp(1.6rem,3.4vw,3rem)] font-bold tracking-tight text-foreground/90"
        style={vertical ? { writingMode: "vertical-rl" } : undefined}
      >
        {children}
      </motion.span>
    </div>
  );
}

export function LockOn({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative flex h-16 w-16 items-center justify-center">
      {["left-0 top-0", "right-0 top-0 rotate-90", "left-0 bottom-0 -rotate-90", "right-0 bottom-0 rotate-180"].map((p) => (
        <span key={p} className={cn("absolute size-4 border-l-2 border-t-2 border-primary [filter:drop-shadow(0_0_4px_#5c9cff)]", p)} />
      ))}
      {children}
    </span>
  );
}

export function SirenArcs({ on }: { on: boolean }) {
  return (
    <>
      {[0, 0.5, 1, 1.5].map((d) => (
        <motion.span
          key={d}
          className="absolute size-8 rounded-full border-2 border-primary/70 [filter:drop-shadow(0_0_6px_#5c9cff)]"
          animate={on ? { scale: [0.4, 4], opacity: [0.8, 0] } : { opacity: 0 }}
          transition={{ duration: 2, repeat: on ? Infinity : 0, ease: "easeOut", delay: d }}
        />
      ))}
    </>
  );
}

export function PcoNode() {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [50 + 34 * Math.cos(a), 50 + 34 * Math.sin(a)];
  });
  return (
    <svg viewBox="0 0 100 100" className="size-11 [filter:drop-shadow(0_0_6px_#5c9cff)]" aria-hidden>
      {pts.map(([x, y], i) => (
        <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="#5c9cff" strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#5c9cff" fillOpacity="0.85" />
      ))}
      <circle cx="50" cy="50" r="9" fill="#5c9cff" />
    </svg>
  );
}

function Dial({ reveal }: { reveal: number }) {
  const ticks = Array.from({ length: 72 });
  // 3 loop sectors (DETECT right, DETER bottom-left, RESPOND top-left) → dividers at 60/180/300°.
  const wedges = [60, 180, 300];
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 z-0 h-full w-full overflow-visible" aria-hidden>
      <defs>
        <marker id="v2arrow" markerWidth="4.5" markerHeight="4.5" refX="2.2" refY="2.2" orient="auto">
          <path d="M0 0 L4.5 2.2 L0 4.5 Z" fill="#5c9cff" />
        </marker>
        <radialGradient id="detectFan" gradientUnits="userSpaceOnUse" cx="50" cy="50" r="47">
          <stop offset="18%" stopColor="#5c9cff" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#5c9cff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* DETECT radar fan — fills the right sector (±60°) */}
      <path
        d="M60 32.7 L73.5 9.3 A47 47 0 0 1 73.5 90.7 L60 67.3 A20 20 0 0 0 60 32.7 Z"
        fill="url(#detectFan)"
        style={{ opacity: reveal >= 2 ? 1 : 0, transition: "opacity 0.5s ease" }}
      />
      {/* motion-detector waves — thin arcs radiating from centre through the wedge */}
      <g style={{ opacity: reveal >= 2 ? 1 : 0, transition: "opacity 0.5s ease" }}>
        {[0, 0.9, 1.8].map((delay) => (
          <path key={delay} fill="none" stroke="#5c9cff" strokeWidth="0.4" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 1.5px #5c9cff)" }}>
            <animate
              attributeName="d"
              dur="2.7s"
              begin={`${delay}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.25 0.1 0.3 1"
              values="M54 43.1 A8 8 0 0 1 54 56.9; M73.5 9.3 A47 47 0 0 1 73.5 90.7"
            />
            <animate attributeName="opacity" dur="2.7s" begin={`${delay}s`} repeatCount="indefinite" values="0.75;0.75;0" keyTimes="0;0.15;1" />
          </path>
        ))}
      </g>

      {/* outer ring + ticks */}
      <circle cx="50" cy="50" r="49.5" fill="none" stroke="#5c9cff" strokeOpacity="0.22" strokeWidth="0.4" />
      {ticks.map((_, i) => {
        const a = (i / ticks.length) * Math.PI * 2;
        const r1 = 47;
        const r2 = i % 6 === 0 ? 43.5 : 45.4;
        return (
          <line
            key={i}
            x1={50 + r1 * Math.cos(a)}
            y1={50 + r1 * Math.sin(a)}
            x2={50 + r2 * Math.cos(a)}
            y2={50 + r2 * Math.sin(a)}
            stroke="#5c9cff"
            strokeOpacity="0.3"
            strokeWidth="0.35"
          />
        );
      })}

      {/* single fainter inner ring closer to centre */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="#5c9cff" strokeOpacity="0.12" strokeWidth="0.3" />

      {/* wedge dividers between the three loop sectors */}
      {wedges.map((deg) => {
        const a = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={50 + 20 * Math.cos(a)}
            y1={50 + 20 * Math.sin(a)}
            x2={50 + 47 * Math.cos(a)}
            y2={50 + 47 * Math.sin(a)}
            stroke="#5c9cff"
            strokeOpacity="0.22"
            strokeWidth="0.4"
            style={{ filter: "drop-shadow(0 0 1.5px #5c9cff)" }}
          />
        );
      })}

      {/* clockwise cycle arrows — the recurring 3-act loop, OUTSIDE the ring,
          gaps at the labels. The loop closes (RESPOND → DETECT): the tower keeps watching. */}
      {[
        { d: "M103.2 59.4 A54 54 0 0 1 31.5 100.8", at: 3 }, // DETECT → DETER
        { d: "M15.3 91.4 A54 54 0 0 1 15.3 8.6", at: 4 }, // DETER → RESPOND
        { d: "M31.5 -0.8 A54 54 0 0 1 103.2 40.6", at: 4 }, // RESPOND → DETECT (repeats)
      ].map((arc, i) => (
        <path
          key={i}
          d={arc.d}
          fill="none"
          stroke="#5c9cff"
          strokeWidth="0.7"
          strokeLinecap="round"
          markerEnd="url(#v2arrow)"
          style={{
            opacity: reveal >= arc.at ? 0.95 : 0,
            filter: "drop-shadow(0 0 2.5px #5c9cff)",
            transition: "opacity 0.5s ease",
          }}
        />
      ))}
    </svg>
  );
}

/* ---------- Mobile / reduced-motion fallback ---------- */

export function StaticList({ acts }: { acts: Act[] }) {
  return (
    <ol className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
      {acts.map((a, i) => (
        <li key={a.key} className="rounded-lg border border-border bg-card p-6">
          <div className="font-mono-v2 mb-3 text-xs text-primary">0{i + 1}</div>
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-foreground">{a.label}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{a.caption}</p>
        </li>
      ))}
    </ol>
  );
}
