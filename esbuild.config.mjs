import * as esbuild from "esbuild";

esbuild
  .context({
    entryPoints: ["main.ts"],
    bundle: true,
    external: ["obsidian"],
    format: "cjs",
    target: "es2018",
    outfile: "main.js",
    sourcemap: true,
  })
  .then((ctx) => {
    ctx.watch().then(() => {
      console.log("⚡ Watching for changes...");
    });
  })
  .catch(() => process.exit(1));
