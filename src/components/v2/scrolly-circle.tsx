"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { Headset, Shield, Smartphone } from "lucide-react";

import { pick } from "@/content/site";
import { cn } from "@/lib/utils";

interface Act {
  key: string;
  label: string;
  caption: string;
}

function useActs(): Act[] {
  const _ = pick(useLocale());
  return [
    { key: "deploy", label: _("NASADENIE", "DEPLOY"), caption: _("Veža nasadená a aktívna do 48 hodín.", "Tower deployed & live within 48 hours.") },
    { key: "detect", label: _("DETEKCIA", "DETECT"), caption: _("AI rozpozná hrozbu a odfiltruje zvieratá.", "AI locks on to threats and filters out animals.") },
    { key: "deter", label: _("ODSTRAŠENIE", "DETER"), caption: _("Siréna 121 dB a svetlá odplašia narušiteľa.", "A 121 dB siren and lights scare the intruder off.") },
    { key: "respond", label: _("REAKCIA", "RESPOND"), caption: _("Poplach ide na PCO aj do vášho telefónu — operátor privolá políciu (158).", "The alarm reaches the PCO and your phone — the operator calls the police (158).") },
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
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="text-sm text-muted-foreground"
          >
            {reveal === 0 ? _("Skrolujte a sledujte, ako to funguje", "Scroll to see how it works") : acts[active].caption}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

const showO = (on: boolean) => ({ opacity: on ? 1 : 0 });
const showS = (on: boolean) => ({ opacity: on ? 1 : 0, scale: on ? 1 : 0.92 });

// Strong ease-out for entering elements — responsive at the moment attention lands.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const revealT = { duration: 0.45, ease: EASE_OUT };

function Stage({ reveal }: { reveal: number }) {
  const acts = useActs();
  const _ = pick(useLocale());
  return (
    <div className="relative aspect-square h-[min(74vh,760px)] max-w-[92vw]">
      <Dial reveal={reveal} />

      {/* Labels — OUTSIDE the outer ring */}
      <LabelOutside pos="top" on={reveal >= 1}>{acts[0].label}</LabelOutside>
      <LabelOutside pos="right" on={reveal >= 2}>{acts[1].label}</LabelOutside>
      <LabelOutside pos="bottom" on={reveal >= 3}>{acts[2].label}</LabelOutside>
      <LabelOutside pos="left" on={reveal >= 4}>{acts[3].label}</LabelOutside>

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
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="pointer-events-none absolute left-1/2 top-[24%] h-[46%] w-[34%] -translate-x-1/2 blur-[3px]"
          style={{
            clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
            background: "linear-gradient(to bottom, rgba(214,230,255,0.34), rgba(92,156,255,0.06) 60%, transparent)",
          }}
        />
        {/* Lamp / camera reflector source */}
        <motion.span
          animate={showO(reveal >= 1)}
          transition={{ duration: 0.5, ease: EASE_OUT }}
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
        <motion.div animate={showS(reveal >= 1)} transition={revealT}>
          <span className="font-mono-v2 rounded-full border border-primary/50 bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary shadow-[0_0_20px_-4px_#5c9cff]">
            24/7 · LIVE
          </span>
        </motion.div>
      </div>

      {/* DETECT visual — right quadrant */}
      <div className="absolute right-[9%] top-1/2 z-30 -translate-y-1/2">
        <motion.div animate={showS(reveal >= 2)} transition={revealT} className="relative flex flex-col items-center gap-1.5">
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

      {/* DETER visual — bottom quadrant */}
      <div className="absolute bottom-[12%] left-1/2 z-30 -translate-x-1/2">
        <motion.div animate={showS(reveal >= 3)} transition={revealT} className="flex flex-col items-center">
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

      {/* RESPOND visual — left quadrant, read RIGHT → LEFT (the alarm arrives from the tower
          on the right). It forks: up to the PCO operator, who escalates to the police (158);
          down to the owner's phone — both notified at the same moment. Kept clear of the ring. */}
      {/* Anchored by its RIGHT edge so it stays tucked against the tower at every stage size
          (the stage scales with viewport height; this group is fixed-width). */}
      <div className="absolute right-[64%] top-1/2 z-30 -translate-y-1/2 [@media(max-height:700px)]:right-[59%] [@media(max-height:700px)]:scale-[0.8]">
        <motion.div animate={showS(reveal >= 4)} transition={revealT} className="flex items-stretch gap-3">
          {/* The two branches */}
          <div className="flex h-[126px] flex-col justify-between">
            {/* Branch A — the PCO operator escalates to the police */}
            <div className="flex items-center gap-1">
              <RespondNode label="158">
                <span className="flex size-9 items-center justify-center rounded-full border border-primary/50 bg-primary/10 [filter:drop-shadow(0_0_6px_#5c9cff)]">
                  <Shield className="size-4 text-primary" />
                </span>
              </RespondNode>
              {/* bold arrow, pointing left → the operator calls the police */}
              <svg viewBox="0 0 46 24" className="h-4 w-6 shrink-0 [filter:drop-shadow(0_0_6px_#5c9cff)]" aria-hidden>
                <path d="M1 12 L19 1 V8 H45 V16 H19 V23 Z" fill="#5c9cff" />
              </svg>
              <RespondNode label="PCO">
                <AlertNode>
                  <Headset className="size-5 text-[#080D2C]" />
                </AlertNode>
              </RespondNode>
            </div>

            {/* Branch B — the owner, notified at the same instant. Sits directly under the
                PCO node (justify-end aligns it to the same right edge). */}
            <div className="flex items-center justify-end">
              <RespondNode label={_("Majiteľ", "Owner")}>
                <AlertNode>
                  <Smartphone className="size-5 text-[#080D2C]" />
                </AlertNode>
              </RespondNode>
            </div>
          </div>

          {/* The fork, nearest the tower — one alarm in from the right, two branches out left.
              ALARM label is absolute so it costs no width. */}
          <div className="relative w-7 shrink-0">
            <svg
              viewBox="0 0 28 126"
              className="h-[126px] w-7 [filter:drop-shadow(0_0_6px_#5c9cff)]"
              fill="none"
              aria-hidden
            >
              <defs>
                <marker id="v2fork" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                  <path d="M0 0 L5 2.5 L0 5 Z" fill="#5c9cff" />
                </marker>
              </defs>
              <path d="M28 63 H19" stroke="#5c9cff" strokeWidth="3" strokeLinecap="round" />
              <path d="M19 63 C12 63, 11 30, 3 24" stroke="#5c9cff" strokeWidth="3" strokeLinecap="round" markerEnd="url(#v2fork)" />
              <path d="M19 63 C12 63, 11 96, 3 102" stroke="#5c9cff" strokeWidth="3" strokeLinecap="round" markerEnd="url(#v2fork)" />
            </svg>
            <span className="font-mono-v2 absolute -top-2 left-0 whitespace-nowrap text-[9px] uppercase tracking-widest text-muted-foreground">
              {_("Poplach", "Alarm")}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* Big act label, positioned OUTSIDE the outer ring. */
function LabelOutside({ children, pos, on }: { children: React.ReactNode; pos: "top" | "right" | "bottom" | "left"; on: boolean }) {
  // Anchor each label just outside its stage edge, centred on the perpendicular
  // axis — keeps all four symmetric and in line with the ring.
  const wrap: Record<string, React.CSSProperties> = {
    top: { left: "50%", bottom: "100%", transform: "translateX(-50%) translateY(-8px)" },
    bottom: { left: "50%", top: "100%", transform: "translateX(-50%) translateY(8px)" },
    right: { top: "50%", left: "100%", transform: "translateY(-50%) translateX(8px)" },
    left: { top: "50%", right: "100%", transform: "translateY(-50%) translateX(-8px)" },
  };
  const vertical = pos === "right" || pos === "left";
  return (
    <div className="pointer-events-none absolute z-30" style={wrap[pos]}>
      <motion.span
        animate={showO(on)}
        transition={revealT}
        className="block font-[family-name:var(--font-space-grotesk)] text-[clamp(1.6rem,3.4vw,3rem)] font-bold tracking-tight text-foreground/90"
        style={vertical ? { writingMode: "vertical-rl", transform: pos === "left" ? "rotate(180deg)" : undefined } : undefined}
      >
        {children}
      </motion.span>
    </div>
  );
}

/** A node in the RESPOND chain with its short mono label underneath. */
function RespondNode({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="flex w-11 shrink-0 flex-col items-center gap-1">
      {children}
      <span className="font-mono-v2 text-center text-[9px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </span>
  );
}

/** A notified recipient: lit node with a small pulsing red alert dot, top-left. */
function AlertNode({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative flex size-10 items-center justify-center rounded-full bg-primary shadow-[0_0_16px_2px_#5c9cff]">
      {children}
      <span className="absolute left-1.5 top-1.5 flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff4d4f] opacity-80" />
        <span className="relative inline-flex size-1.5 rounded-full bg-[#ff4d4f] shadow-[0_0_5px_1.5px_rgba(255,77,79,0.95)]" />
      </span>
    </span>
  );
}

function LockOn({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative flex h-16 w-16 items-center justify-center">
      {["left-0 top-0", "right-0 top-0 rotate-90", "left-0 bottom-0 -rotate-90", "right-0 bottom-0 rotate-180"].map((p) => (
        <span key={p} className={cn("absolute size-4 border-l-2 border-t-2 border-primary [filter:drop-shadow(0_0_4px_#5c9cff)]", p)} />
      ))}
      {children}
    </span>
  );
}

function SirenArcs({ on }: { on: boolean }) {
  // CSS keyframe (transform + opacity) rather than a Framer Motion `scale`
  // shorthand: it runs on the compositor, off the main thread, so the four
  // infinite ripples stay smooth while the pinned section is being scrolled.
  return (
    <>
      {[0, 0.5, 1, 1.5].map((d) => (
        <span
          key={d}
          className="absolute size-8 rounded-full border-2 border-primary/70 opacity-0 [filter:drop-shadow(0_0_6px_#5c9cff)]"
          style={on ? { animation: `v2-siren 2s ${d}s ease-out infinite` } : undefined}
        />
      ))}
    </>
  );
}

function Dial({ reveal }: { reveal: number }) {
  const ticks = Array.from({ length: 72 });
  const wedges = [45, 135, 225, 315];
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

      {/* DETECT radar fan — fills the right wedge */}
      <path
        d="M64.9 36.6 L84.9 18.6 A47 47 0 0 1 84.9 81.4 L64.9 63.4 A20 20 0 0 0 64.9 36.6 Z"
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
              values="M55.9 44.6 A8 8 0 0 1 55.9 55.4; M84.9 18.6 A47 47 0 0 1 84.9 81.4"
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

      {/* wedge dividers between the four quadrants */}
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

      {/* clockwise arrows — outer loop OUTSIDE the ring, gaps at the cardinal labels */}
      {[
        { d: "M66.7 -1.4 A54 54 0 0 1 101.4 33.3", at: 2 },
        { d: "M101.4 66.7 A54 54 0 0 1 66.7 101.4", at: 3 },
        { d: "M33.3 101.4 A54 54 0 0 1 -1.4 66.7", at: 4 },
        { d: "M-1.4 33.3 A54 54 0 0 1 33.3 -1.4", at: 1 },
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

function StaticList({ acts }: { acts: Act[] }) {
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
