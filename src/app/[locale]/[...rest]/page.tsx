import { notFound } from "next/navigation";

// Catch-all for unmatched paths under a locale so the localized, styled
// not-found.tsx renders inside the layout (with navbar + footer).
export default function CatchAll() {
  notFound();
}
