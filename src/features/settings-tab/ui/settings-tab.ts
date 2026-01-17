import { App, PluginSettingTab } from "obsidian";
import { PluginListAutoSettings } from "../../../entities";
import { FileSelectorWrapper } from "./file-selector-wrapper";
import { sortFiles } from "../lib";

interface SettingsTabPlugin {
  settings: PluginListAutoSettings;
  saveSettings(): Promise<void>;
}

export class SettingsTab extends PluginSettingTab {
  private plugin: SettingsTabPlugin;

  constructor(app: App, plugin: SettingsTabPlugin) {
    super(app, plugin as any);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Auto Plugin List" });
    const root = this.app.vault.getFiles();
    new FileSelectorWrapper(
      containerEl.createDiv(),
      this.plugin.settings.logFile,
      root,
      async (value) => {
        this.plugin.settings.logFile = value;
        await this.plugin.saveSettings();
      }
    );
  }
}
