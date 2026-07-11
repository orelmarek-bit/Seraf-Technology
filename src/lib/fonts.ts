import { Inter, Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono, Hanken_Grotesk } from "next/font/google";

// latin-ext covers Slovak diacritics (č, š, ž, ľ, ô, ...)
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

// --- Fonts for the /v2 (Lucien-style) variant ---
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plex-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

// Free light grotesk standing in for GT Planar (display role)
export const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["300", "400", "500"],
});
