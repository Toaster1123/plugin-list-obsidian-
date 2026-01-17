require("esbuild")
  .build({
    entryPoints: ["main.ts"],
    bundle: true,
    outfile: "main.js",
    platform: "browser",
    format: "cjs", // ← не iife!
    external: ["obsidian"],
    target: "es2020",
  })
  .catch(() => process.exit(1));
