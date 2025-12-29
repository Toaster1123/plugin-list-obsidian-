require("esbuild")
  .build({
    entryPoints: ["main.ts"],
    bundle: true,
    outfile: "main.js",
    platform: "node",
    format: "cjs",
    external: ["obsidian"],
  })
  .catch(() => process.exit(1));
