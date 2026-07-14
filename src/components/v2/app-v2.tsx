import { BellRing, Video, Power, Mic, type LucideIcon } from "lucide-react";

import { pick } from "@/content/site";
import { SectionIntro } from "./section-intro";

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * The Seraf mobile app: what the owner gets once the tower is live.
 * The device is drawn in markup (no screenshot exists yet) — live view,
 * an incoming alert, and the two real controls: camera on/off and talk.
 */
export function AppV2({ locale }: { locale: string }) {
  const _ = pick(locale);

  const capabilities: Capability[] = [
    {
      icon: BellRing,
      title: _("Okamžité upozornenie", "Instant alert"),
      description: _(
        "Pri detekcii hrozby dostanete upozornenie do telefónu — súčasne s operátorom PCO.",
        "The moment a threat is detected you get a push notification — at the same time as the PCO operator.",
      ),
    },
    {
      icon: Video,
      title: _("Živý prenos 24/7", "Live view, 24/7"),
      description: _(
        "Pozrite sa na svoj objekt kedykoľvek — cez deň aj v noci, priamo z telefónu.",
        "Look at your site whenever you want — day or night, straight from your phone.",
      ),
    },
    {
      icon: Power,
      title: _("Zapnutie a vypnutie kamery", "Arm or disarm the camera"),
      description: _(
        "Kameru zapnete alebo vypnete jedným ťuknutím — bez volania technika.",
        "Turn the camera on or off with a single tap — no call-out required.",
      ),
    },
    {
      icon: Mic,
      title: _("Hovorte priamo cez vežu", "Speak through the tower"),
      description: _(
        "Vstavaný mikrofón vám umožní osloviť kohokoľvek priamo na mieste.",
        "The built-in microphone lets you address anyone standing on site.",
      ),
    },
  ];

  return (
    <section id="app" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionIntro
          eyebrow={_("Mobilná aplikácia", "Mobile app")}
          title={_("Váš objekt vo vrecku", "Your site in your pocket")}
          subtitle={_(
            "Veža nechráni len sama — dáva vám kontrolu. Upozornenie pri hrozbe, živý obraz a hlas priamo na mieste.",
            "The tower doesn't just protect on its own — it hands you the controls. An alert when it matters, a live picture, and your voice on site.",
          )}
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <PhoneMock locale={locale} />

          {/* Capabilities — a typographic list, not another card grid */}
          <ul className="divide-y divide-border border-y border-border">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.title} className="flex gap-5 py-6">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/[0.08]">
                    <Icon className="size-[18px] text-primary" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{c.title}</h3>
                    <p className="mt-1.5 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** The phone, drawn in markup: an alert banner over a live feed, with the two real controls. */
function PhoneMock({ locale }: { locale: string }) {
  const _ = pick(locale);

  return (
    <div className="relative mx-auto w-[268px] max-w-full">
      {/* atmosphere behind the device */}
      <div className="aurora-v2 pointer-events-none absolute -inset-10 opacity-50" aria-hidden />

      <div className="relative rounded-[2.4rem] border border-border bg-[#04081a] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        {/* screen */}
        <div className="relative flex aspect-[9/18.5] flex-col overflow-hidden rounded-[1.9rem] bg-[#080D2C]">
          {/* notch */}
          <span
            className="absolute left-1/2 top-2 z-30 h-[5px] w-16 -translate-x-1/2 rounded-full bg-[#04081a]"
            aria-hidden
          />

          {/* ── Live feed ───────────────────────────────── */}
          <div className="relative flex-1 overflow-hidden">
            {/* night scene: faint grid + horizon */}
            <div
              className="absolute inset-0 opacity-[0.16]"
              aria-hidden
              style={{
                backgroundImage:
                  "linear-gradient(to right, #5c9cff 1px, transparent 1px), linear-gradient(to bottom, #5c9cff 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3"
              aria-hidden
              style={{ background: "linear-gradient(to top, rgba(92,156,255,0.16), transparent)" }}
            />

            {/* the tower, watching */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hud/tower.png"
              alt=""
              className="absolute bottom-6 right-5 h-[62%] w-auto object-contain opacity-90 [filter:drop-shadow(0_0_16px_rgba(92,156,255,0.45))]"
            />

            {/* the intruder, locked on */}
            <span className="absolute bottom-8 left-7 flex size-14 items-center justify-center">
              {["left-0 top-0", "right-0 top-0 rotate-90", "left-0 bottom-0 -rotate-90", "right-0 bottom-0 rotate-180"].map(
                (p) => (
                  <span
                    key={p}
                    className={`absolute size-3 border-l-2 border-t-2 border-primary [filter:drop-shadow(0_0_4px_#5c9cff)] ${p}`}
                  />
                ),
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hud/person-walk.png" alt="" className="h-10 w-auto object-contain" />
            </span>

            {/* LIVE badge */}
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#04081a]/80 px-2 py-1">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff4d4f] opacity-80" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#ff4d4f]" />
              </span>
              <span className="font-mono-v2 text-[9px] font-medium uppercase tracking-[0.14em] text-foreground">
                {_("Naživo", "Live")}
              </span>
            </span>
            <span className="font-mono-v2 absolute bottom-3 right-3 text-[9px] tracking-wider text-muted-foreground">
              02:41
            </span>

            {/* incoming push — the alert, arriving */}
            <div className="absolute inset-x-2.5 top-6 z-20 rounded-xl border border-primary/30 bg-[#0f1533]/95 p-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex size-1.5 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff4d4f] opacity-80" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[#ff4d4f]" />
                </span>
                <span className="font-mono-v2 text-[9px] uppercase tracking-[0.12em] text-primary">
                  {_("Seraf · teraz", "Seraf · now")}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-medium leading-snug text-foreground">
                {_("Zaznamenaný pohyb na objekte", "Motion detected on site")}
              </p>
              <p className="font-mono-v2 mt-0.5 text-[9px] text-muted-foreground">BASIC SOLAR · 02:41</p>
            </div>
          </div>

          {/* ── Controls ────────────────────────────────── */}
          <div className="flex items-start justify-center gap-9 border-t border-border bg-[#04081a] px-4 py-4">
            <PhoneControl icon={Power} label={_("Kamera", "Camera")} />
            <PhoneControl icon={Mic} label={_("Hovoriť", "Talk")} active />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneControl({
  icon: Icon,
  label,
  active = false,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <span className="flex w-14 flex-col items-center gap-1.5">
      <span
        className={
          active
            ? "flex size-10 items-center justify-center rounded-full bg-primary text-[#080D2C] shadow-[0_0_18px_-2px_#5c9cff]"
            : "flex size-10 items-center justify-center rounded-full border border-border bg-[#0f1533] text-foreground/80"
        }
      >
        <Icon className="size-[18px]" aria-hidden />
      </span>
      <span className="font-mono-v2 text-center text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
    </span>
  );
}
