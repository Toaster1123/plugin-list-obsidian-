import { TFile } from "obsidian";
import { splitFileName } from "../lib";

export class FileSelectorDropdown {
  dropdownWrapper: HTMLDivElement;
  private items: TFile[];
  private onChange: (file: TFile) => void;

  constructor(items: TFile[], onChange: (file: TFile) => void) {
    this.items = items;
    this.onChange = onChange;

    this.dropdownWrapper = document.createElement("div");
    this.dropdownWrapper.classList.add("file-selector-dropdown");

    this.render(items);
  }

  render(files: TFile[]) {
    this.dropdownWrapper.empty();

    const sorted = [...files].sort((a, b) =>
      splitFileName(a).localeCompare(splitFileName(b), undefined, {
        sensitivity: "base",
      })
    );

    for (const file of sorted) {
      const el = document.createElement("div");
      el.classList.add("dropdown-item");
      el.textContent = splitFileName(file);
      el.onclick = () => this.onChange(file);
      this.dropdownWrapper.appendChild(el);
    }
  }

  filter(query: string) {
    const q = query.toLowerCase();
    const filtered = this.items.filter((f) =>
      splitFileName(f).toLowerCase().includes(q)
    );
    this.render(filtered);
  }
}
