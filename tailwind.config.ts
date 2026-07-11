import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        // Fluid type scale (min → max via clamp)
        "display-lg": ["clamp(2.75rem, 1.6rem + 5.2vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display": ["clamp(2.25rem, 1.5rem + 3.4vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "h1": ["clamp(2rem, 1.4rem + 2.6vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "h2": ["clamp(1.6rem, 1.2rem + 1.8vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "h3": ["clamp(1.3rem, 1.1rem + 0.9vw, 1.6rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(2, 8, 20, 0.06), 0 8px 24px -12px rgba(2, 8, 20, 0.12)",
        lift: "0 4px 12px rgba(2, 8, 20, 0.08), 0 24px 48px -24px rgba(2, 8, 20, 0.24)",
        glow: "0 0 0 1px hsl(var(--primary) / 0.25), 0 0 40px -8px hsl(var(--primary) / 0.45)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "radar-sweep": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "radar-sweep": "radar-sweep 4s linear infinite",
        "pulse-ring": "pulse-ring 2.6s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
