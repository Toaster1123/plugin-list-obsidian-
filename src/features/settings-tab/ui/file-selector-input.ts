export class FileSelectorInput {
  inputWrapper: HTMLDivElement;
  input: HTMLInputElement;

  constructor(value: string, onChange: (value: string) => void) {
    this.inputWrapper = document.createElement("div");
    this.inputWrapper.classList.add("file-selector-wrapper");

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.value = value;
    this.input.placeholder = "Select a file...";
    this.input.classList.add("file-selector-input");

    this.input.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      onChange(target.value);
    });

    this.inputWrapper.appendChild(this.input);
  }

  setValue(value: string) {
    this.input.value = value;
  }
}
