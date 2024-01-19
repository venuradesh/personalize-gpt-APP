import { Component, Input } from '@angular/core';

@Component({
  selector: 'pgpt-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
})
export class InputFieldComponent {
  @Input() maxLength!: string;
  @Input() type: string = 'text';
  @Input() caption: string = '';
}
