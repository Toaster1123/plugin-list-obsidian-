import { Plugin } from "obsidian";
import {
  DEFAULT_SETTINGS,
  generateContent,
  PluginSettings,
  SettingsTab,
} from "./features";

export default class PluginListAuto extends Plugin {
  settings: PluginSettings = DEFAULT_SETTINGS;

  async onload() {
    console.log("Plugin List Auto loaded");
    if (this.settings.logFile) {
      await this.updatePluginList();
    }
    this.addSettingTab(new SettingsTab(this.app, this));
  }
  async loadSettings() {
    this.settings = Object.assign({}, "plugins.md", await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }

  async updatePluginList() {
    try {
      if (!this.settings.logFile) {
        console.log("No log file selected, skipping update");
        return;
      }
      const content = await generateContent(this.app);

      const fileExists = await this.app.vault.adapter.exists(
        this.settings.logFile
      );

      if (fileExists) {
        await this.app.vault.adapter.write(this.settings.logFile, content);
      } else {
        await this.app.vault.create(this.settings.logFile, content);
      }

      console.log("Plugin list updated!");
    } catch (e) {
      console.error("Failed to update plugin list", e);
    }
  }
}
