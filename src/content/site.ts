export const SITE = {
  name: "Seraf Technology",
  phone: "+421944433658",
  phoneLabel: "+421 944 433 658",
  email: "info@seraftechnology.com",
  linkedin: "https://www.linkedin.com/company/seraf-technology",
  domain: "seraftechnology.com",
  url: "https://seraftechnology.com",
  addressLocality: "Slovensko",
} as const;

export type Locale = "sk" | "en";

/** Returns a picker: pick("sk")("ahoj", "hello") -> "ahoj". */
export const pick = (locale: string) => (sk: string, en: string) => (locale === "sk" ? sk : en);
