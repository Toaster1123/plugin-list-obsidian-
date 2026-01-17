import { Setting, TFile } from "obsidian";
import { FileSelectorInput } from "./file-selector-input";
import { FileSelectorDropdown } from "./file-selector-dropdown";
import { splitFileName } from "../lib";

export class FileSelectorWrapper {
  inputComponent!: FileSelectorInput;

  constructor(
    container: HTMLDivElement,
    initialValue = "",
    files: TFile[],
    onChange: (value: string) => void
  ) {
    const setting = new Setting(container)
      .setName("Log File")
      .setDesc("Select the log file to store the plugin list.");

    const wrapper = setting.controlEl.createDiv({
      cls: "file-selector-wrapper",
    });

    const dropdown = new FileSelectorDropdown(files, (file) => {
      this.inputComponent.setValue(splitFileName(file)); // только имя без расширения
      onChange(file.path); // сохраняем полный путь
      wrapper.classList.remove("is-open");
    });

    this.inputComponent = new FileSelectorInput(
      initialValue ? splitFileName(initialValue) : "",
      (val) => {}
    );

    this.inputComponent.input.addEventListener("focus", () => {
      const value = this.inputComponent.input.value;
      dropdown.filter(value);
      wrapper.classList.add("is-open");
    });

    this.inputComponent.input.addEventListener("input", (e) => {
      const value = (e.target as HTMLInputElement).value;
      dropdown.filter(value);
      wrapper.classList.add("is-open");
    });

    document.addEventListener("pointerdown", (e) => {
      if (!wrapper.contains(e.target as Node)) {
        wrapper.classList.remove("is-open");
      }
    });

    wrapper.appendChild(this.inputComponent.inputWrapper);
    wrapper.appendChild(dropdown.dropdownWrapper);
  }
}
