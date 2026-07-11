import {
  Building2,
  SunMedium,
  CalendarDays,
  ParkingCircle,
  Home,
  Factory,
  type LucideIcon,
} from "lucide-react";
import { pick } from "./site";

export interface Solution {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  summary: string;
  challenges: string[];
  outcomes: string[];
}

export const SOLUTION_SLUGS = [
  "construction",
  "renewables",
  "events",
  "parking",
  "property",
  "industry",
] as const;

export function getSolutions(locale: string): Solution[] {
  const _ = pick(locale);
  return [
    {
      slug: "construction",
      icon: Building2,
      title: _("Stavby a staveniská", "Construction sites"),
      short: _("Ochrana materiálu, strojov a náradia na staveniskách.", "Protect materials, machinery and tools on site."),
      summary: _(
        "Staveniská sú častým terčom krádeží materiálu a vandalizmu, najmä počas nocí a víkendov. Mobilná veža zabezpečí celý areál bez potreby budovania infraštruktúry.",
        "Construction sites are frequent targets for material theft and vandalism, especially at night and on weekends. A mobile tower secures the whole area with no infrastructure to build."
      ),
      challenges: [
        _("Krádeže materiálu a strojov", "Theft of materials and machinery"),
        _("Meniaci sa layout stavby", "Constantly changing site layout"),
        _("Chýbajúce napájanie", "No available power"),
      ],
      outcomes: [
        _("Nasadenie do 48 hodín", "Deployed within 48 hours"),
        _("Presun veže podľa postupu prác", "Relocate the tower as work progresses"),
        _("Odstrašenie sirénou a svetlom", "Deterrence via siren and light"),
      ],
    },
    {
      slug: "renewables",
      icon: SunMedium,
      title: _("Solárne a veterné parky", "Solar & wind farms"),
      short: _("Monitoring rozľahlých energetických plôch.", "Monitor large energy sites end to end."),
      summary: _(
        "Fotovoltické a veterné parky sú rozľahlé a ťažko strážiteľné klasickou ochrankou. Veže s AI detekciou pokryjú veľké plochy a upozornia na neoprávnený vstup.",
        "Solar and wind farms are vast and hard to guard conventionally. AI-detection towers cover large areas and flag unauthorised entry instantly."
      ),
      challenges: [
        _("Veľké, odľahlé plochy", "Large, remote areas"),
        _("Krádeže káblov a panelov", "Cable and panel theft"),
        _("Vysoké náklady na fyzickú ochranku", "High cost of physical guards"),
      ],
      outcomes: [
        _("Pokrytie veľkých plôch", "Coverage of large areas"),
        _("AI filtrovanie planých poplachov", "AI filtering of false alarms"),
        _("Napojenie na PCO", "Connection to the monitoring desk (PCO)"),
      ],
    },
    {
      slug: "events",
      icon: CalendarDays,
      title: _("Podujatia a festivaly", "Events & festivals"),
      short: _("Dočasné zabezpečenie akcií na kľúč.", "Temporary, turnkey event security."),
      summary: _(
        "Podujatia potrebujú rýchle a dočasné riešenie bezpečnosti. Veže nasadíme pred akciou a po jej skončení ich odvezieme — bez zdĺhavej inštalácie.",
        "Events need fast, temporary security. We deploy towers before the event and remove them afterwards — with no lengthy installation."
      ),
      challenges: [
        _("Krátkodobá potreba ochrany", "Short-term protection needs"),
        _("Veľký pohyb ľudí", "High footfall"),
        _("Meniace sa miesta konania", "Changing venues"),
      ],
      outcomes: [
        _("Rýchle nasadenie a demontáž", "Rapid setup and teardown"),
        _("Prehľad o dianí v reálnom čase", "Real-time situational overview"),
        _("Flexibilné rozmiestnenie", "Flexible placement"),
      ],
    },
    {
      slug: "parking",
      icon: ParkingCircle,
      title: _("Parkoviská a logistika", "Parking & logistics"),
      short: _("Dohľad nad vozidlami a tovarom.", "Oversight of vehicles and goods."),
      summary: _(
        "Odstavné plochy, depá a logistické areály vyžadujú neustály dohľad. Veže sledujú pohyb vozidiel a chránia tovar 24/7.",
        "Yards, depots and logistics areas require constant oversight. Towers track vehicle movement and protect goods 24/7."
      ),
      challenges: [
        _("Rozľahlé odstavné plochy", "Large open yards"),
        _("Pohyb vozidiel a tovaru", "Movement of vehicles and goods"),
        _("Riziko krádeže a poškodenia", "Risk of theft and damage"),
      ],
      outcomes: [
        _("Nepretržitý dohľad", "Continuous monitoring"),
        _("Záznam pohybu vozidiel", "Vehicle movement records"),
        _("Rýchla reakcia na incident", "Fast incident response"),
      ],
    },
    {
      slug: "property",
      icon: Home,
      title: _("Nehnuteľnosti a pozemky", "Real estate & land"),
      short: _("Ochrana objektov a nezastavaných plôch.", "Protect buildings and undeveloped land."),
      summary: _(
        "Prázdne budovy a pozemky sú zraniteľné voči neoprávnenému vstupu. Veža poskytne viditeľnú a účinnú ochranu bez trvalej inštalácie.",
        "Empty buildings and land are vulnerable to trespassing. A tower provides visible, effective protection without permanent installation."
      ),
      challenges: [
        _("Neoprávnený vstup", "Trespassing"),
        _("Vandalizmus", "Vandalism"),
        _("Absencia stálej ochranky", "No permanent guard presence"),
      ],
      outcomes: [
        _("Viditeľné odstrašenie", "Visible deterrence"),
        _("Bez trvalej inštalácie", "No permanent installation"),
        _("Okamžité upozornenia", "Instant alerts"),
      ],
    },
    {
      slug: "industry",
      icon: Factory,
      title: _("Priemyselné areály", "Industrial sites"),
      short: _("Zabezpečenie výrobných a skladových areálov.", "Secure production and storage areas."),
      summary: _(
        "Výrobné a skladové areály obsahujú hodnotné zariadenia a zásoby. Veže doplnia existujúce zabezpečenie a pokryjú kritické miesta.",
        "Production and storage areas hold valuable equipment and stock. Towers complement existing security and cover critical points."
      ),
      challenges: [
        _("Hodnotné zariadenia a zásoby", "Valuable equipment and stock"),
        _("Rozsiahle perimetre", "Extensive perimeters"),
        _("Prevádzka mimo pracovného času", "After-hours exposure"),
      ],
      outcomes: [
        _("Doplnenie existujúcej ochrany", "Complements existing security"),
        _("Pokrytie kritických bodov", "Coverage of critical points"),
        _("Zníženie planých poplachov", "Fewer false alarms"),
      ],
    },
  ];
}

export function getSolution(locale: string, slug: string): Solution | undefined {
  return getSolutions(locale).find((s) => s.slug === slug);
}
