import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Seraf",
    description: "Autonomous mobile surveillance towers.",
    start_url: "/sk",
    display: "standalone",
    background_color: "#0a0f14",
    theme_color: "#0a0f14",
    icons: [{ src: "/icon.png", sizes: "any", type: "image/png" }],
  };
}
