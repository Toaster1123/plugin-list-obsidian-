import { App, TFile } from "obsidian";

export class LogWriter {
  constructor(private app: App) {}

  async writeData(path?: string) {
    if (!path) return;
    console.log("file by path ", this.app.vault.getFileByPath(path));
    console.log("files ", this.app.vault.getFolderByPath(path));
    const file = this.app.vault.getAbstractFileByPath(path);
    this.app.vault.getFiles().forEach((f) => console.log(f.path));

    if (!(file instanceof TFile)) {
      console.warn("Log file not found or not a file:", path);
      return;
    }

    await this.app.vault.append(file, "привет\n");
  }
}
