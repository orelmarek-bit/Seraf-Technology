import { pick } from "./site";

export const LEGAL_DOCS = ["privacy", "cookies", "terms"] as const;
export type LegalDoc = (typeof LEGAL_DOCS)[number];

export interface LegalSection {
  heading: string;
  body: string;
}
export interface LegalContent {
  title: string;
  notice: string;
  sections: LegalSection[];
}

export function getLegalDoc(locale: string, doc: string): LegalContent | undefined {
  const _ = pick(locale);
  if (!LEGAL_DOCS.includes(doc as LegalDoc)) return undefined;

  const notice = _(
    "Toto je vzorový (placeholder) text. Pred spustením webu ho musí schváliť právnik a doplniť konkrétne údaje spoločnosti.",
    "This is placeholder text. It must be reviewed by a lawyer and completed with the company's specific details before launch."
  );

  const map: Record<LegalDoc, LegalContent> = {
    privacy: {
      title: _("Ochrana súkromia", "Privacy Policy"),
      notice,
      sections: [
        {
          heading: _("Správca údajov", "Data controller"),
          body: _(
            "Seraf Technology spracúva osobné údaje, ktoré nám poskytnete prostredníctvom kontaktného formulára (meno, e-mail, telefón, údaje o objekte).",
            "Seraf Technology processes the personal data you provide through the contact form (name, email, phone, site details)."
          ),
        },
        {
          heading: _("Účel spracovania", "Purpose of processing"),
          body: _(
            "Vaše údaje používame výlučne na spracovanie dopytu a prípravu cenovej ponuky. Neposkytujeme ich tretím stranám na marketingové účely.",
            "We use your data solely to process your enquiry and prepare a quote. We do not share it with third parties for marketing."
          ),
        },
        {
          heading: _("Vaše práva", "Your rights"),
          body: _(
            "Máte právo na prístup k údajom, ich opravu, vymazanie a namietanie voči spracovaniu v súlade s GDPR.",
            "You have the right to access, rectify, erase and object to the processing of your data in accordance with GDPR."
          ),
        },
      ],
    },
    cookies: {
      title: _("Zásady používania cookies", "Cookies Policy"),
      notice,
      sections: [
        {
          heading: _("Aké cookies používame", "Which cookies we use"),
          body: _(
            "Web používa nevyhnutné technické cookies a analytiku bez cookies (napr. Plausible), preto nezobrazujeme rušivý cookie banner.",
            "The site uses essential technical cookies and cookieless analytics (e.g. Plausible), so we don't show an intrusive cookie banner."
          ),
        },
        {
          heading: _("Správa nastavení", "Managing preferences"),
          body: _(
            "Ukladanie cookies môžete kedykoľvek spravovať v nastaveniach svojho prehliadača.",
            "You can manage cookie storage at any time in your browser settings."
          ),
        },
      ],
    },
    terms: {
      title: _("Obchodné podmienky", "Terms & Conditions"),
      notice,
      sections: [
        {
          heading: _("Poskytovanie služby", "Service provision"),
          body: _(
            "Seraf Technology poskytuje službu monitoringu prostredníctvom mobilných strážnych veží formou prenájmu na základe individuálnej zmluvy.",
            "Seraf Technology provides a monitoring service via mobile surveillance towers on a rental basis under an individual contract."
          ),
        },
        {
          heading: _("Cenové ponuky", "Quotes"),
          body: _(
            "Cenové ponuky sú nezáväzné a platné po dobu uvedenú v konkrétnej ponuke.",
            "Quotes are non-binding and valid for the period stated in each individual quote."
          ),
        },
        {
          heading: _("Zodpovednosť", "Liability"),
          body: _(
            "Rozsah zodpovednosti a podmienky poskytovania služby sú upravené v zmluve medzi Seraf Technology a klientom.",
            "The scope of liability and service conditions are governed by the contract between Seraf Technology and the client."
          ),
        },
      ],
    },
  };

  return map[doc as LegalDoc];
}
