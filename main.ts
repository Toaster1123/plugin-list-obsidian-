import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, PluginListAutoSettings } from "./src/entities";
import { LogWriter, SettingsTab } from "./src/features/";

export default class PluginListAuto extends Plugin {
  settings!: PluginListAutoSettings;
  logWriter!: LogWriter;

  async onload() {
    await this.loadSettings();
    this.logWriter = new LogWriter(this.app);
    this.addSettingTab(new SettingsTab(this.app, this));
    await this.logWriter.writeData(this.settings.logFile);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    console.log("Succes load " + this.settings.logFile);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
  onunload() {
    console.log("Succes unload");
  }
}
