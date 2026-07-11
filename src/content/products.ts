import { Sun, Cpu, ScanEye, type LucideIcon } from "lucide-react";
import { pick } from "./site";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  icon: LucideIcon;
  highlighted: boolean;
  name: string;
  tagline: string;
  summary: string;
  features: string[];
  specs: ProductSpec[];
}

export const PRODUCT_SLUGS = ["basic-solar", "basic", "pro-lights"] as const;

export function getProducts(locale: string): Product[] {
  const _ = pick(locale);
  return [
    {
      slug: "basic-solar",
      icon: Sun,
      highlighted: true,
      name: "BASIC SOLAR",
      tagline: _("Solárne · plne autonómne", "Solar · fully autonomous"),
      summary: _(
        "Úplne autonómna veža so solárnym napájaním a 10-dňovou zálohou batérie. Ideálna pre lokality bez prístupu k elektrine.",
        "A fully autonomous, solar-powered tower with a 10-day battery reserve. Ideal for sites with no access to mains power."
      ),
      features: [
        _("Solárne napájanie bez potreby elektriny", "Solar powered — no mains required"),
        _("AI 4-senzorová 360° kamera", "AI 4-sensor 360° camera"),
        _("10-dňová záloha batérie", "10-day battery backup"),
        _("Siréna a maják 121 dB", "121 dB siren & strobe"),
        _("Ovládanie cez mobilnú aplikáciu", "Mobile app control"),
      ],
      specs: [
        { label: _("Napájanie", "Power"), value: _("Solárne + batéria", "Solar + battery") },
        { label: _("Záloha batérie", "Battery backup"), value: _("10 dní", "10 days") },
        { label: _("Kamera", "Camera"), value: _("AI, 4 senzory, 360°", "AI, 4-sensor, 360°") },
        { label: _("Siréna", "Siren"), value: "121 dB" },
        { label: _("Konektivita", "Connectivity"), value: _("LTE 4G", "LTE 4G") },
      ],
    },
    {
      slug: "basic",
      icon: Cpu,
      highlighted: false,
      name: "BASIC",
      tagline: _("Napájanie zo siete", "Mains powered"),
      summary: _(
        "Spoľahlivá veža napájaná zo siete s 5-dňovou zálohou batérie a vstavaným LTE modemom — pre objekty s dostupnou elektrinou.",
        "A reliable mains-powered tower with a 5-day battery reserve and a built-in LTE modem — for sites with available power."
      ),
      features: [
        _("Napájanie zo siete", "Mains powered"),
        _("4-senzorová 360° kamera", "4-sensor 360° camera"),
        _("Vstavaný LTE 4G modem", "Built-in LTE 4G modem"),
        _("5-dňová záloha batérie", "5-day battery backup"),
        _("Maják so zeleným svetlom", "Strobe with green light"),
      ],
      specs: [
        { label: _("Napájanie", "Power"), value: _("Sieť + batéria", "Mains + battery") },
        { label: _("Záloha batérie", "Battery backup"), value: _("5 dní", "5 days") },
        { label: _("Kamera", "Camera"), value: _("4 senzory, 360°", "4-sensor, 360°") },
        { label: _("Siréna", "Siren"), value: _("Maják + siréna", "Strobe + siren") },
        { label: _("Konektivita", "Connectivity"), value: _("LTE 4G", "LTE 4G") },
      ],
    },
    {
      slug: "pro-lights",
      icon: ScanEye,
      highlighted: false,
      name: "PRO Lights",
      tagline: _("Maximálny dosah a zoom", "Maximum range & zoom"),
      summary: _(
        "Výkonná veža s 31× optickým zoomom a reflektormi 520 Nm pre rozľahlé objekty, ktoré vyžadujú detailný dohľad na diaľku.",
        "A high-performance tower with 31× optical zoom and 520 Nm floodlights for large sites that need detailed long-range surveillance."
      ),
      features: [
        _("31× optický zoom", "31× optical zoom"),
        _("AI 4-senzorová kamera", "AI 4-sensor camera"),
        _("Reflektory 520 Nm", "520 Nm floodlights"),
        _("32-hodinová výdrž batérie", "32-hour battery life"),
        _("Siréna 121 dB", "121 dB siren"),
      ],
      specs: [
        { label: _("Napájanie", "Power"), value: _("Batéria", "Battery") },
        { label: _("Záloha batérie", "Battery backup"), value: _("32 hodín", "32 hours") },
        { label: _("Zoom", "Zoom"), value: _("31× optický", "31× optical") },
        { label: _("Osvetlenie", "Lighting"), value: "520 Nm" },
        { label: _("Siréna", "Siren"), value: "121 dB" },
      ],
    },
  ];
}

export function getProduct(locale: string, slug: string): Product | undefined {
  return getProducts(locale).find((p) => p.slug === slug);
}
