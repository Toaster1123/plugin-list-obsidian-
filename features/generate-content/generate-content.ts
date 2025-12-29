import { App } from "obsidian";

export async function generateContent(app: App): Promise<string> {
  const pm = (app as any).plugins;
  const plugins = Object.keys(pm.plugins);

  const content =
    "# 🔌 Установленные плагины\n\n" + plugins.map((p) => `- ${p}`).join("\n");

  return content;
}
