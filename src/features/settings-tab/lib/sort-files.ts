import { TFile } from "obsidian";

function sortByName(files: TFile[]): TFile[] {
  return files.sort((a, b) =>
    a.path.localeCompare(b.path, undefined, { sensitivity: "base" })
  );
}

export const sortFiles = (files: TFile[]): TFile[] => {
  const rootFiles: TFile[] = [];
  const nestedFiles: TFile[] = [];

  files.forEach((file) => {
    if (file.extension !== "md" && file.extension !== "txt") return;
    if (!file.path.includes("/")) {
      rootFiles.push(file);
    } else {
      nestedFiles.push(file);
    }
  });

  return [...sortByName(rootFiles), ...sortByName(nestedFiles)];
};
