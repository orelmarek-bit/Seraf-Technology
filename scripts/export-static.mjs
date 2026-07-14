/**
 * Static HTML export → `out/`.
 *
 *   npm run export:static
 *
 * Several App Router files cannot be statically exported (middleware, the OG image
 * generator, manifest/sitemap/robots route handlers, and the catch-all route). This
 * script moves them aside, builds with BUILD_STATIC=true, then ALWAYS restores them —
 * even if the build fails — so a broken build can never leave the source tree gutted.
 *
 * The output uses absolute asset paths (/_next/...), so it must be SERVED over HTTP.
 * Opening out/index.html from the filesystem will not work.
 *   npx serve out     (or)     python -m http.server 8788 --directory out
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const aside = join(root, ".static-aside");

/** Files/dirs that block `output: "export"`, relative to the repo root. */
const BLOCKERS = [
  "src/middleware.ts",
  "src/app/[locale]/opengraph-image.tsx",
  "src/app/manifest.ts",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/[locale]/[...rest]",
];

const moved = [];

function moveAside() {
  for (const rel of BLOCKERS) {
    const from = join(root, rel);
    if (!existsSync(from)) continue;
    const to = join(aside, rel);
    mkdirSync(dirname(to), { recursive: true });
    renameSync(from, to);
    moved.push(rel);
  }
  console.log(`→ moved aside ${moved.length} export-incompatible path(s)`);
}

function restore() {
  for (const rel of moved.reverse()) {
    const from = join(aside, rel);
    const to = join(root, rel);
    if (!existsSync(from)) continue;
    mkdirSync(dirname(to), { recursive: true });
    renameSync(from, to);
  }
  rmSync(aside, { recursive: true, force: true });
  console.log(`← restored ${moved.length} path(s)`);
}

/** Root landing page: the export has no `/` route once the locale prefix is always on. */
function writeIndex() {
  writeFileSync(
    join(root, "out", "index.html"),
    `<!doctype html>
<html lang="sk">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=./sk/v2/" />
    <title>Seraf Technology</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="./sk/v2/" />
  </head>
  <body style="background:#080d2c;color:#8b9dc6;font-family:system-ui,sans-serif">
    <p style="padding:2rem">
      Presmerovanie… <a href="./sk/v2/" style="color:#5c9cff">Slovensky</a> ·
      <a href="./en/v2/" style="color:#5c9cff">English</a>
    </p>
  </body>
</html>
`,
    "utf8",
  );
  console.log("→ wrote out/index.html");
}

try {
  rmSync(join(root, ".next"), { recursive: true, force: true });
  moveAside();
  execSync("npx next build", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, BUILD_STATIC: "true" },
  });
} finally {
  // Runs even if the build throws — the source tree must never be left displaced.
  restore();
}

writeIndex();
console.log("\n✓ Static export ready in out/ — SERVE it (absolute asset paths):");
console.log("    npx serve out\n");
