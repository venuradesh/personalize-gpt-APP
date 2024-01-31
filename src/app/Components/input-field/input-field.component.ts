import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "pgpt-input-field",
  standalone: true,
  imports: [],
  templateUrl: "./input-field.component.html",
  styleUrl: "./input-field.component.css",
})
export class InputFieldComponent {
  @Input() maxLength!: string;
  @Input() type: string = "text";
  @Input() caption: string = "";
  @Output() inputValue = new EventEmitter<string>();

  handleInputChange(event: any): void {
    this.inputValue.emit(event.target.value);
  }
}
