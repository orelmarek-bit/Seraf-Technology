import { pick } from "./site";

export interface BlogPost {
  slug: string;
  date: string; // ISO
  category: string;
  title: string;
  excerpt: string;
  body: string; // MDX
}

export const POST_SLUGS = ["tower-placement", "site-security", "theft-vandalism"] as const;

export function getPosts(locale: string): BlogPost[] {
  const _ = pick(locale);
  return [
    {
      slug: "tower-placement",
      date: "2026-06-18",
      category: _("Návod", "Guide"),
      title: _(
        "Kam umiestniť strážnu vežu na stavenisku",
        "Where to place a surveillance tower on a construction site"
      ),
      excerpt: _(
        "Správne umiestnenie veže rozhoduje o kvalite pokrytia. Ukážeme vám, na čo dbať.",
        "Correct placement determines coverage quality. Here's what to watch out for."
      ),
      body: _(
        `## Prečo na umiestnení záleží\n\nStrážna veža so 360° kamerou pokryje veľkú plochu, no jej účinnosť závisí od toho, kde ju postavíte. Cieľom je vidieť vstupy, sklady materiálu a stroje bez prekážok.\n\n## Na čo dbať\n\n- **Prehľad nad vstupmi** — veža by mala vidieť brány a prístupové cesty.\n- **Materiál a stroje** — nasmerujte pokrytie na najhodnotnejšie aktíva.\n- **Bez prekážok** — vyhnite sa umiestneniu za kontajnery či konštrukcie.\n- **Osvetlenie** — zvážte modely s reflektormi pre tmavé zóny.\n\n## Presun podľa postupu prác\n\nStavenisko sa mení. Vežu vieme presunúť do 48 hodín, takže pokrytie ostáva optimálne počas celého projektu.`,
        `## Why placement matters\n\nA tower with a 360° camera covers a large area, but its effectiveness depends on where you place it. The goal is a clear view of entrances, material stores and machinery.\n\n## What to watch for\n\n- **Overview of entrances** — the tower should see gates and access roads.\n- **Materials and machinery** — point coverage at your most valuable assets.\n- **No obstructions** — avoid placing it behind containers or structures.\n- **Lighting** — consider models with floodlights for dark zones.\n\n## Relocate as work progresses\n\nA site changes. We can relocate the tower within 48 hours, so coverage stays optimal throughout the project.`
      ),
    },
    {
      slug: "site-security",
      date: "2026-05-30",
      category: _("Bezpečnosť", "Security"),
      title: _(
        "Ako zvýšiť bezpečnosť stavieb a objektov",
        "How to improve security on builds and sites"
      ),
      excerpt: _(
        "Kombinácia odstrašenia, detekcie a reakcie funguje lepšie než samotné kamery.",
        "A mix of deterrence, detection and response beats cameras alone."
      ),
      body: _(
        `## Odstrašenie je prvá línia\n\nViditeľná veža so sirénou a svetlom odradí väčšinu narušiteľov skôr, než spôsobia škodu. Samotná pasívna kamera bez reakcie nestačí.\n\n## Detekcia s AI\n\nUmelá inteligencia rozpozná skutočnú hrozbu a odfiltruje plané poplachy od zvierat. Výsledkom je menej falošných výjazdov a vyššia dôvera v systém.\n\n## Reakcia napojená na PCO\n\nPoplach smeruje na pult centrálnej ochrany, kde ho vyhodnotí operátor. To zabezpečí skutočnú reakciu, nielen záznam udalosti.`,
        `## Deterrence is the first line\n\nA visible tower with a siren and light deters most intruders before they cause damage. A passive camera without a response isn't enough on its own.\n\n## AI detection\n\nArtificial intelligence recognises a real threat and filters out animal-triggered false alarms. The result is fewer false call-outs and more trust in the system.\n\n## Response connected to PCO\n\nAlarms route to a central protection desk, where an operator evaluates them. That ensures a real response, not just a recording of the event.`
      ),
    },
    {
      slug: "theft-vandalism",
      date: "2026-05-12",
      category: _("Prevencia", "Prevention"),
      title: _(
        "Ochrana pred krádežami a vandalizmom",
        "Protecting against theft and vandalism"
      ),
      excerpt: _(
        "Nestrážené objekty sú terčom. Autonómna veža ich chráni 24/7 bez infraštruktúry.",
        "Unmanned sites are targets. An autonomous tower protects them 24/7 with no infrastructure."
      ),
      body: _(
        `## Kde vzniká riziko\n\nKrádeže a vandalizmus sa najčastejšie dejú v noci a cez víkendy, keď je objekt prázdny. Práve vtedy je dôležité mať aktívnu ochranu.\n\n## Autonómne riešenie\n\nSolárna veža funguje bez pripojenia k elektrine a poskytne ochranu aj tam, kde nie je infraštruktúra. Batéria vydrží aj počas zamračených dní.\n\n## Rýchle nasadenie\n\nVežu nasadíme do 48 hodín. Nemusíte budovať prípojky ani stĺpy — riešenie je mobilné a okamžite funkčné.`,
        `## Where the risk arises\n\nTheft and vandalism most often happen at night and on weekends, when a site is empty. That's exactly when active protection matters.\n\n## An autonomous solution\n\nA solar tower runs without a mains connection and protects sites with no infrastructure. The battery lasts even through overcast days.\n\n## Fast deployment\n\nWe deploy the tower within 48 hours. No need to build connections or poles — the solution is mobile and works immediately.`
      ),
    },
  ];
}

export function getPost(locale: string, slug: string): BlogPost | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}

export function formatDate(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(locale === "sk" ? "sk-SK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
