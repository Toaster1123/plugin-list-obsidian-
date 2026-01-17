import { TFile } from "obsidian";

export const splitFileName = (file?: TFile | string) => {
  if (!file) return "";

  const name = typeof file === "string" ? file : file.name || file.path;

  const parts = name.split(".");
  if (parts.length > 1) parts.pop();
  return parts.join(".");
};
