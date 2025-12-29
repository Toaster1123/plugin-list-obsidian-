import { App, PluginSettingTab, Setting } from "obsidian";

interface PluginListAutoInterface {
  settings: { logFile: string };
  saveSettings(): Promise<void>;
  updatePluginList(): Promise<void>;
}

export class SettingsTab extends PluginSettingTab {
  private plugin: PluginListAutoInterface;

  private filePathState = {
    logFile: "",
  };
  private previewEl?: HTMLElement;

  constructor(app: App, plugin: any) {
    super(app, plugin);
    this.plugin = plugin;
    this.filePathState.logFile = plugin.settings.logFile ?? "";
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Settings plugin Auto Plugin List" });

    const files = this.app.vault.getFiles().map((f) => f.path);
    // files.forEach((file) => {
    //   console.log("file path", file.split("/"));
    // });
    // console.log(this.app.vault.getFiles());

    new Setting(containerEl)
      .setName("Plugin List File")
      .setDesc("The file where the list of plugins will be saved.")
      .addText((text) =>
        text
          .setPlaceholder("Enter file path")
          .setValue(this.plugin.settings.logFile || "")
          .onChange(async (value) => {
            this.filePathState.logFile = value;
            this.updatePreview();
            this.plugin.settings.logFile = value;
            await this.plugin.saveSettings();
            await this.plugin.updatePluginList();
          })
      )
      .addDropdown((dropdown) => {
        files.forEach((file) => {
          dropdown.addOption(file, file);
          dropdown.onChange(async (value) => {
            this.filePathState.logFile = value;
            this.updatePreview();
            this.plugin.settings.logFile = value;
            await this.plugin.saveSettings();
            await this.plugin.updatePluginList();
          });
        });
      });
    this.previewEl = containerEl.createEl("p", {
      cls: "setting-item-description",
    });

    this.updatePreview();
  }
  private updatePreview() {
    if (!this.previewEl) return;
    console.log(this.filePathState.logFile);

    this.previewEl.setText(
      this.filePathState.logFile
        ? `✔ Current file: ${this.filePathState.logFile}`
        : "⚠ File not selected. Plugin will not create anything."
    );
  }
}
