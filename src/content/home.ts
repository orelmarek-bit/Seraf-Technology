import {
  Rocket,
  ScanEye,
  Siren,
  PhoneCall,
  Sun,
  Cpu,
  ShieldCheck,
  Move,
  Radar,
  BellRing,
  type LucideIcon,
} from "lucide-react";
import { pick } from "./site";

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}
export interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}
export interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}
export interface Faq {
  question: string;
  answer: string;
}

export function getStats(locale: string): Stat[] {
  const _ = pick(locale);
  return [
    { value: 15, suffix: "+", label: _("rokov skúseností", "years of experience") },
    { value: 360, suffix: "°", label: _("pokrytie bez slepých miest", "coverage, no blind spots") },
    { value: 48, suffix: "h", label: _("nasadenie na mieste", "to deploy on site") },
    { value: 24, suffix: "/7", label: _("nepretržitý monitoring", "continuous monitoring") },
  ];
}

export function getSteps(locale: string): Step[] {
  const _ = pick(locale);
  return [
    {
      icon: Rocket,
      title: _("Nasadenie", "Deploy"),
      description: _(
        "Vežu doručíme a sprevádzkujeme priamo u vás do 48 hodín.",
        "We deliver and commission the tower on your site within 48 hours."
      ),
    },
    {
      icon: ScanEye,
      title: _("Detekcia", "Detect"),
      description: _(
        "AI kamera rozpozná pohyb a spoľahlivo odfiltruje zvieratá.",
        "The AI camera detects movement and reliably filters out animals."
      ),
    },
    {
      icon: Siren,
      title: _("Odstrašenie", "Deter"),
      description: _(
        "Siréna 121 dB a výstražné svetlá okamžite odplašia narušiteľa.",
        "A 121 dB siren and warning lights immediately scare off intruders."
      ),
    },
    {
      icon: PhoneCall,
      title: _("Reakcia", "Respond"),
      description: _(
        "Poplach smeruje na pult centrálnej ochrany (PCO) a k vám.",
        "The alarm is routed to the central protection desk (PCO) and to you."
      ),
    },
  ];
}

export function getPillars(locale: string): Pillar[] {
  const _ = pick(locale);
  return [
    {
      icon: Sun,
      title: _("Solárna autonómia", "Solar autonomy"),
      description: _(
        "Prevádzka bez pripojenia k elektrine — až 10 dní zálohy batérie.",
        "Runs without a mains connection — up to a 10-day battery reserve."
      ),
    },
    {
      icon: Cpu,
      title: _("AI detekcia", "AI detection"),
      description: _(
        "Rozpozná skutočné hrozby a odfiltruje plané poplachy od zvierat.",
        "Recognises real threats and filters out animal-triggered false alarms."
      ),
    },
    {
      icon: Move,
      title: _("Presun do 48 hodín", "Relocate in 48 hours"),
      description: _(
        "Vežu presunieme podľa toho, ako sa mení váš objekt.",
        "We relocate the tower as your site changes."
      ),
    },
    {
      icon: Radar,
      title: _("360° pokrytie", "360° coverage"),
      description: _(
        "Kamera so 4 senzormi sleduje celý perimeter bez slepých miest.",
        "A 4-sensor camera watches the entire perimeter with no blind spots."
      ),
    },
    {
      icon: BellRing,
      title: _("Napojenie na PCO", "Connected to PCO"),
      description: _(
        "Poplach smeruje na pult centrálnej ochrany s reálnou reakciou.",
        "Alarms route to a central protection desk with a real response."
      ),
    },
    {
      icon: ShieldCheck,
      title: _("Licencovaná služba", "Licensed service"),
      description: _(
        "Držíme oficiálnu licenciu na technickú službu ochrany.",
        "We hold an official licence for technical security services."
      ),
    },
  ];
}

export function getFaqs(locale: string): Faq[] {
  const _ = pick(locale);
  return [
    {
      question: _("Aký uhol dokáže veža pokryť?", "What angle does the tower cover?"),
      answer: _(
        "Kamera so 4 senzormi poskytuje 360° pokrytie bez slepých miest.",
        "The 4-sensor camera provides full 360° coverage with no blind spots."
      ),
    },
    {
      question: _("Ako funguje monitoring v noci?", "How does night monitoring work?"),
      answer: _(
        "Veže snímajú aj v noci a poplachy dohliada operátor na pulte centrálnej ochrany.",
        "Towers monitor at night too, and alarms are overseen by an operator at the central protection desk."
      ),
    },
    {
      question: _("Dá sa veža premiestniť?", "Can the tower be relocated?"),
      answer: _(
        "Áno. Presun veže na nové miesto zabezpečíme na požiadanie do 48 hodín.",
        "Yes. On request, we relocate the tower to a new site within 48 hours."
      ),
    },
    {
      question: _("Čo sa stane pri výpadku prúdu?", "What happens during a power outage?"),
      answer: _(
        "Solárny model je plne autonómny a ostatné majú zálohu batérie na niekoľko dní.",
        "The solar model is fully autonomous, and the others carry a multi-day battery backup."
      ),
    },
    {
      question: _("Nespôsobia plané poplachy zvieratá?", "Won't animals cause false alarms?"),
      answer: _(
        "AI vyhodnocuje pohyb a spoľahlivo odlíši človeka od zvierat, čím obmedzuje plané poplachy.",
        "The AI evaluates movement and reliably distinguishes people from animals, minimising false alarms."
      ),
    },
    {
      question: _("Ako rýchlo viete vežu nasadiť?", "How quickly can you deploy a tower?"),
      answer: _(
        "Štandardne do 48 hodín od potvrdenia objednávky.",
        "Typically within 48 hours of order confirmation."
      ),
    },
    {
      question: _("Čo viem robiť cez mobilnú aplikáciu?", "What can I do from the mobile app?"),
      answer: _(
        "Pri detekcii hrozby vám príde okamžité upozornenie — súčasne s operátorom PCO. V aplikácii máte živý prenos 24/7, kameru zapnete či vypnete a cez vstavaný mikrofón môžete hovoriť priamo na mieste.",
        "You get an instant alert the moment a threat is detected — at the same time as the PCO operator. The app also gives you a 24/7 live view, lets you turn the camera on or off, and lets you speak to the site through the built-in microphone."
      ),
    },
  ];
}
